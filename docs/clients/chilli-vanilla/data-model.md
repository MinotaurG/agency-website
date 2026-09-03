# Data Model Design

## Learning Guide + Implementation Reference

This document covers:
1. **Concepts** - Why we make certain design decisions (from DDD, production systems)
2. **Patterns from Real Systems** - What Enatega, CoopCycle, Uber Eats, DoorDash do
3. **Our Design** - What we'll build, with reasoning

---

## Part 1: Core Concepts

### 1.1 Domain-Driven Design (DDD) Basics

DDD says: **start with the business language, not the database tables.** Before writing any schema, identify the "domains" (bounded contexts) in your system.

**What's a Bounded Context?**
A self-contained area of business logic with its own language. "Order" means different things to the kitchen (items to prepare), the customer (something I'm waiting for), and the delivery rider (a pickup-and-drop task). Each perspective is a bounded context.

**Our Bounded Contexts:**

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Menu/Catalog   │     │    Ordering     │     │    Payment      │
│                 │     │                 │     │                 │
│ "What can you   │────>│ "I want this"   │────>│ "Pay for this"  │
│  order?"        │     │                 │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                    OrderPlaced event fires
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Fulfillment   │     │    Delivery     │     │  Notifications  │
│                 │     │                 │     │                 │
│ "Kitchen, make  │     │ "Someone take   │     │ "Tell everyone  │
│  this order"    │     │  this to X"     │     │  what happened" │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

**Why this matters:** Each context can evolve independently. If we later add a "Catering" context for the banquet, it doesn't touch the delivery system.

---

### 1.2 Entity vs. Value Object

| Concept | Entity | Value Object |
|---------|--------|--------------|
| **Has identity?** | Yes (tracked by ID) | No (defined by its values) |
| **Mutable?** | Yes (changes over time) | No (replace, don't update) |
| **Example** | Customer, Order | Address, Money, Price |
| **In DB** | Has a primary key | Embedded (JSONB) or normalized |

**Why it matters:** If two addresses have the same street/city/pin, they ARE the same thing (value object). But two customers with the same name are NOT the same person (entity).

**In our system:**
- **Entities:** Restaurant, Customer, Order, MenuItem, DeliveryStaff
- **Value Objects:** Address, Money (price + currency), MenuItemSnapshot (in an order), OperatingHours

---

### 1.3 Aggregate Root

An aggregate is a cluster of entities that are treated as a single unit for data changes. The "root" is the entry point.

**Order is an aggregate root:**
- You never modify an OrderItem directly. You modify it through the Order.
- You never fetch an OrderItem without its Order.
- Deleting an Order deletes all its OrderItems.
- All business rules (minimum order amount, valid status transitions) are enforced through the Order.

**Why this matters for our API:**
```
GOOD: POST /orders/{id}/cancel    (goes through the Order aggregate)
BAD:  PUT /order-items/{id}       (modifies a child directly, bypassing rules)
```

---

### 1.4 Price Snapshotting (Critical Pattern)

**The Problem:** A customer orders Paneer Butter Masala at Rs 240. Tomorrow, the restaurant changes the price to Rs 260. What does the order show?

**The Answer:** Rs 240. Always. The order captures a snapshot of the price at the moment it was placed.

**How Enatega does it:**
```graphql
# Their order items store the full variation data inline:
items {
  title              # snapshotted name
  quantity
  variation {
    title            # "Full" or "Half"
    price            # snapshotted price
    discounted       # snapshotted discount price
  }
  addons {
    title
    options { title, price }  # all snapshotted
  }
}
```

**How we'll do it:**
```sql
order_items (
  item_name VARCHAR      -- "Paneer Butter Masala" (snapshot)
  unit_price DECIMAL     -- 240.00 (snapshot)
  variant_name VARCHAR   -- "Full" (snapshot)
  addons JSONB           -- [{name: "Extra Cheese", price: 30}] (snapshot)
)
```

**Rule:** Never JOIN to `menu_items` to calculate an order total. The order is a self-contained financial document.

---

### 1.5 Soft Deletes

**The Problem:** Restaurant removes "Dragon Paneer Chilli" from the menu. But 50 past orders reference it.

**Bad solution:** Hard delete. Past orders now have orphaned references (FK violations or NULL joins).

**Good solution:** Soft delete with a `deleted_at` timestamp.

```sql
menu_items (
  ...
  is_available BOOLEAN DEFAULT TRUE,  -- for daily on/off ("out of stock")
  deleted_at TIMESTAMPTZ,             -- for permanent removal
)
```

- `is_available = false` = temporarily unavailable (shows as "out of stock")
- `deleted_at IS NOT NULL` = permanently removed (hidden everywhere, but data intact)

**What gets soft-deleted:** Menu items, categories, customers (GDPR)
**What NEVER gets deleted:** Orders, order events (financial/legal records)

---

### 1.6 Multi-Tenancy

Since we're building this to reuse for multiple restaurant clients:

**Three approaches:**

| Pattern | How | Best for |
|---------|-----|----------|
| Shared schema + tenant_id | All restaurants in same tables, filtered by `restaurant_id` | < 1000 restaurants (us) |
| Schema per tenant | Each restaurant gets its own Postgres schema | Compliance requirements |
| Database per tenant | Each restaurant gets its own DB | Enterprise SaaS |

**We'll use: Shared schema + restaurant_id + Row-Level Security (RLS)**

```sql
-- Every table has restaurant_id
CREATE TABLE menu_items (
  id UUID PRIMARY KEY,
  restaurant_id UUID NOT NULL,  -- tenant discriminator
  ...
);

-- Supabase RLS policy ensures tenant isolation
CREATE POLICY "restaurant_isolation" ON menu_items
  USING (restaurant_id = auth.jwt()->>'restaurant_id');
```

This means:
- Kitchen dashboard for Chilli Vanilla can ONLY see Chilli Vanilla's data
- Even if our code has a bug, RLS prevents data leaks
- Adding a new restaurant = insert a row in `restaurants` table (no infrastructure changes)

---

## Part 2: How Production Systems Do It

### 2.1 Enatega's Data Model (from their GraphQL API)

**Menu Structure: Restaurant > Categories > Foods > Variations > Addons**

```
Restaurant
├── categories[]
│   ├── _id, title
│   └── foods[]
│       ├── _id, title, image, description, isOutOfStock
│       └── variations[]
│           ├── _id, title, price, discounted
│           └── addons[] (references addon groups)
│
└── addons[] (defined at restaurant level)
    ├── _id, title, description
    ├── quantityMinimum, quantityMaximum
    └── options[]
        └── _id, title, description, price
```

**Key Design Decisions in Enatega:**
1. **Variations are mandatory** - every food item has at least one variation (even if it's just "Regular"). This unifies pricing: the price lives on the variation, not the food item.
2. **Addons are restaurant-level, not item-level** - a "Extra Cheese" addon is defined once and linked to multiple items. Avoids duplication.
3. **No item-level pricing** - price always lives on the variation. This elegantly handles "Half/Full" sizing.

**What we'll borrow:**
- Variations as the price carrier (brilliant for Indian menus: Half/Full, Small/Medium/Large)
- Restaurant-level addon groups (reuse "Extra Cheese" across pizzas, dosas, etc.)

**What we'll change:**
- Use Postgres instead of MongoDB (relational > document for analytics, joins, consistency)
- Cleaner separation (Enatega exposes passwords in their GraphQL, which is a security disaster)

---

### 2.2 CoopCycle's Data Model (Symfony/Doctrine ORM)

CoopCycle models delivery as a **Task-based system:**

```
Order (Sylius OrderInterface)
├── OrderItem[] (line items with snapshotted prices)
├── Payment (payment state machine)
└── Delivery
    ├── Task: Pickup (at restaurant)
    │   ├── address, after, before (time window)
    │   └── status: todo → doing → done/failed
    └── Task: Dropoff (at customer)
        ├── address, after, before (time window)
        └── status: todo → doing → done/failed
```

**Key insight:** CoopCycle separates "Order" from "Delivery". An order can exist without a delivery (pickup orders). A delivery is two tasks: pick up from restaurant + drop off at customer.

**What we'll borrow:**
- Task-based delivery model (even though we start simple, this scales to multi-stop)
- Separate order and delivery state machines (they can be in different states independently)

---

### 2.3 Uber Eats / DoorDash Patterns (from engineering blogs)

**Separate Order State from Delivery State:**
```
Order:    placed → confirmed → preparing → ready → completed
Delivery: unassigned → assigned → picking_up → delivering → delivered
```

These are independent. An order can be "ready" while delivery is still "picking_up". This prevents coupling.

**DoorDash's "Dispatch" pattern:**
- A separate service matches orders to drivers
- The order doesn't know about the specific driver until assignment
- This allows re-assignment if a driver cancels

**What we'll borrow:**
- Independent state machines for order and delivery
- Nullable `delivery_staff_id` on orders (assignment happens separately from order placement)

---

## Part 3: Order State Machine

### 3.1 Our Order Lifecycle

```
┌──────────┐
│  PLACED  │ (customer submitted, payment pending/COD)
└────┬─────┘
     │ kitchen accepts (or auto-accept)
     ▼
┌──────────┐
│CONFIRMED │ (kitchen acknowledged, prep time set)
└────┬─────┘
     │ kitchen starts cooking
     ▼
┌──────────┐
│PREPARING │ (being made)
└────┬─────┘
     │ food ready
     ▼
┌──────────┐
│  READY   │ (waiting for rider to pick up)
└────┬─────┘
     │ rider picks up
     ▼
┌──────────┐
│PICKED_UP │ (rider has the food, en route)
└────┬─────┘
     │ rider delivers
     ▼
┌──────────┐
│DELIVERED │ (terminal state)
└──────────┘

     ┌──────────┐
     │CANCELLED │ (terminal state, can happen from any non-terminal state)
     └──────────┘
```

### 3.2 State Transition Rules

```typescript
const ORDER_TRANSITIONS = {
  placed:     ['confirmed', 'cancelled'],
  confirmed:  ['preparing', 'cancelled'],
  preparing:  ['ready', 'cancelled'],
  ready:      ['picked_up', 'cancelled'],
  picked_up:  ['delivered', 'cancelled'],
  delivered:  [],  // terminal
  cancelled:  [],  // terminal
};
```

### 3.3 Who Can Trigger Each Transition?

| Transition | Triggered By | Side Effects |
|-----------|--------------|--------------|
| → placed | Customer (via app/WhatsApp) | Notify kitchen, start accept timer |
| → confirmed | Kitchen staff | Set prep time, notify customer ETA |
| → preparing | Kitchen staff (or auto on confirm) | Update customer: "Being prepared" |
| → ready | Kitchen staff | Notify delivery staff, notify customer |
| → picked_up | Delivery staff | Start delivery tracking |
| → delivered | Delivery staff | Close order, award loyalty points |
| → cancelled | Customer (before confirmed), Kitchen, Owner | Trigger refund if paid online |

### 3.4 Cancellation Rules

| Current State | Who Can Cancel | Refund? |
|--------------|----------------|---------|
| placed | Customer | Full (or no charge if COD) |
| confirmed | Customer (with fee?), Kitchen | Full |
| preparing | Kitchen only (food issue) | Full |
| ready | Owner/Kitchen only | Full + apology |
| picked_up | Owner only (rare) | Full |
| delivered | N/A (dispute flow) | Support handles |

---

## Part 4: Our Data Model (Final Schema)

### 4.1 Design Principles Applied

| Principle | How We Apply It |
|-----------|----------------|
| Price Snapshotting | Order items store name, price, variant, addons at time of order |
| Soft Deletes | Menu items have `deleted_at`, orders are never deleted |
| Multi-Tenancy | All tables have `restaurant_id`, Supabase RLS enforces isolation |
| Event Log | `order_events` table tracks every status change with actor + timestamp |
| Aggregate Root | Orders own their items, all changes go through the order |
| Temporal Awareness | Timestamps per state on orders enable analytics |
| Human-Readable IDs | Orders get sequential `order_number` in addition to UUID |

### 4.2 Entity-Relationship Diagram

```
restaurants ─────────────┬──────────────────────────────────────────┐
    │                    │                                          │
    │ 1:N               │ 1:N                                     │ 1:N
    ▼                    ▼                                          ▼
menu_categories    delivery_staff                               offers
    │                    │
    │ 1:N               │ 0..1 (assigned)
    ▼                    │
menu_items              │
    │                    │
    │ (referenced)      │
    ▼                    ▼
order_items ◄──── orders ────► customers
                    │                │
                    │ 1:N            │ 1:N (historical)
                    ▼                │
              order_events           │
                                     ▼
                              loyalty_transactions
```

### 4.3 Full Schema

#### restaurants

```sql
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,

  -- Location
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  pin VARCHAR(10),
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),

  -- Contact
  phone VARCHAR(20),
  email VARCHAR(255),
  whatsapp_number VARCHAR(20),

  -- Branding
  logo_url TEXT,
  cover_image_url TEXT,
  primary_color VARCHAR(7),  -- hex color for app theming

  -- Operations
  is_active BOOLEAN DEFAULT TRUE,
  is_accepting_orders BOOLEAN DEFAULT TRUE,
  delivery_radius_km DECIMAL(4, 1) DEFAULT 5.0,
  min_order_amount DECIMAL(10, 2) DEFAULT 0,
  delivery_fee DECIMAL(10, 2) DEFAULT 0,
  avg_prep_time_minutes INTEGER DEFAULT 30,
  operating_hours JSONB NOT NULL DEFAULT '[]',
  -- Format: [{day: 0, open: "09:30", close: "00:00"}] (0=Sunday)

  -- Business
  fssai_license VARCHAR(50),
  gst_number VARCHAR(20),
  commission_rate DECIMAL(4, 2) DEFAULT 0,  -- for our platform fee if any

  -- Settings
  settings JSONB DEFAULT '{}',
  -- auto_accept_orders, require_online_payment, etc.

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### menu_categories

```sql
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_menu_categories_restaurant
  ON menu_categories(restaurant_id, sort_order)
  WHERE is_active = TRUE;
```

#### menu_items (the core menu)

```sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  category_id UUID NOT NULL REFERENCES menu_categories(id),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  image_url TEXT,

  -- Pricing: base price for default variant
  -- If item has variants (Half/Full), set base_price to lowest variant
  base_price DECIMAL(10, 2) NOT NULL,

  -- Variants: [{name: "Half", price: 150}, {name: "Full", price: 250}]
  -- If no variants, this is empty/null and base_price is THE price
  variants JSONB DEFAULT '[]',

  -- Addon groups this item supports (references addon_groups.id)
  addon_group_ids UUID[] DEFAULT '{}',

  -- Classification
  is_veg BOOLEAN DEFAULT TRUE,  -- CV is pure veg, but keep for platform reuse
  is_bestseller BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',  -- "spicy", "new", "cv-special", "jain"

  -- Availability
  is_available BOOLEAN DEFAULT TRUE,  -- daily toggle
  available_from TIME,  -- null = all day
  available_until TIME,

  -- Metadata
  preparation_time_minutes INTEGER,
  sort_order INTEGER DEFAULT 0,

  -- Soft delete
  deleted_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_menu_items_category
  ON menu_items(category_id, sort_order)
  WHERE deleted_at IS NULL AND is_available = TRUE;

CREATE INDEX idx_menu_items_restaurant
  ON menu_items(restaurant_id)
  WHERE deleted_at IS NULL;

CREATE INDEX idx_menu_items_search
  ON menu_items USING GIN (to_tsvector('english', name || ' ' || COALESCE(description, '')));
```

#### addon_groups (restaurant-level, shared across items)

```sql
-- An addon group is like "Extra Toppings" or "Choose Bread Type"
CREATE TABLE addon_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  name VARCHAR(100) NOT NULL,        -- "Extra Toppings", "Choice of Bread"
  description TEXT,

  -- Selection rules
  min_selections INTEGER DEFAULT 0,  -- 0 = optional
  max_selections INTEGER DEFAULT 1,  -- 1 = radio, >1 = checkboxes

  -- Options within this group
  -- [{id: uuid, name: "Extra Cheese", price: 30}, {id: uuid, name: "Mushroom", price: 40}]
  options JSONB NOT NULL DEFAULT '[]',

  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Why addon_groups are separate from menu_items (Enatega pattern):**
- "Extra Cheese" addon (Rs 30) is used by pizzas, dosas, sandwiches, burgers
- Define it once, link to many items via `addon_group_ids` on menu_items
- Change the price in one place, updates everywhere

#### customers

```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Auth: phone is primary identifier (OTP-based login)
  phone VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(200),
  email VARCHAR(255),

  -- Addresses (value objects, stored as JSONB array)
  addresses JSONB DEFAULT '[]',
  -- Format: [{id: uuid, label: "Home", address: "...", lat: x, lng: y, is_default: true}]

  -- Loyalty
  loyalty_points INTEGER DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(12, 2) DEFAULT 0,

  -- Preferences
  default_payment_method VARCHAR(20),  -- 'cod', 'online'
  notification_preferences JSONB DEFAULT '{"whatsapp": true, "push": true}',

  -- Referral
  referral_code VARCHAR(20) UNIQUE,
  referred_by UUID REFERENCES customers(id),

  -- Metadata
  first_order_at TIMESTAMPTZ,
  last_order_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customers_phone ON customers(phone);
```

**Why addresses are JSONB (not a separate table):**
- Addresses are value objects (no independent lifecycle)
- A customer has 1-5 addresses max
- Querying "all addresses for customer X" is always in context of that customer
- Simpler API: one call fetches customer + their addresses
- CoopCycle uses a separate Address entity, but they do multi-modal logistics. We don't need that.

#### orders (Aggregate Root)

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  delivery_staff_id UUID REFERENCES delivery_staff(id),  -- nullable until assigned

  -- Human-readable order number (sequential per restaurant per day)
  order_number VARCHAR(20) NOT NULL,  -- "CV-0611-042" (restaurant-date-sequence)

  -- Status (state machine enforced in application layer)
  status VARCHAR(20) NOT NULL DEFAULT 'placed',
  -- Values: placed, confirmed, preparing, ready, picked_up, delivered, cancelled

  -- Order source
  source VARCHAR(20) NOT NULL DEFAULT 'app',  -- 'app', 'whatsapp', 'phone'

  -- Delivery info (snapshotted at order time)
  order_type VARCHAR(20) NOT NULL DEFAULT 'delivery',  -- 'delivery', 'pickup', 'dine_in'
  delivery_address JSONB,  -- snapshotted {address, lat, lng, label, landmark}
  -- null for pickup/dine-in orders

  -- Scheduling
  is_scheduled BOOLEAN DEFAULT FALSE,
  scheduled_for TIMESTAMPTZ,  -- null = ASAP

  -- Price breakdown (ALL snapshotted at order time)
  subtotal DECIMAL(10, 2) NOT NULL,
  tax_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  delivery_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
  packaging_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
  discount_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,

  -- Payment
  payment_method VARCHAR(20) NOT NULL,  -- 'cod', 'online', 'upi'
  payment_status VARCHAR(20) NOT NULL DEFAULT 'pending',
  -- Values: pending, authorized, captured, refunded, failed
  payment_id VARCHAR(100),  -- Razorpay payment ID

  -- Applied offer (snapshotted)
  offer_id UUID REFERENCES offers(id),
  offer_code VARCHAR(50),
  offer_description TEXT,

  -- Customer instructions
  special_instructions TEXT,
  cancellation_reason TEXT,

  -- Prep time (set by kitchen on confirm)
  estimated_prep_minutes INTEGER,
  estimated_delivery_minutes INTEGER,

  -- Timestamps per state (enables analytics without querying events)
  placed_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  preparing_at TIMESTAMPTZ,
  ready_at TIMESTAMPTZ,
  picked_up_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Most critical index: kitchen dashboard shows non-terminal orders for this restaurant
CREATE INDEX idx_orders_kitchen
  ON orders(restaurant_id, status, placed_at DESC)
  WHERE status NOT IN ('delivered', 'cancelled');

-- Customer order history
CREATE INDEX idx_orders_customer
  ON orders(customer_id, placed_at DESC);

-- Delivery staff active orders
CREATE INDEX idx_orders_delivery
  ON orders(delivery_staff_id, status)
  WHERE delivery_staff_id IS NOT NULL
  AND status NOT IN ('delivered', 'cancelled');
```

#### order_items (snapshotted line items)

```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES menu_items(id),

  -- ALL SNAPSHOTTED at order time (never join to menu_items for display/calculation)
  item_name VARCHAR(200) NOT NULL,
  variant_name VARCHAR(100),  -- "Half", "Full", null if no variants
  unit_price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),

  -- Snapshotted addons
  addons JSONB DEFAULT '[]',
  -- Format: [{name: "Extra Cheese", price: 30}, {name: "Mushroom Topping", price: 40}]

  -- Calculated: unit_price * quantity + sum(addon prices) * quantity
  subtotal DECIMAL(10, 2) NOT NULL,

  -- Item-level notes
  special_instructions TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
```

#### order_events (audit log / lightweight event sourcing)

```sql
-- Every status change is recorded here. Gives us:
-- 1. Full audit trail for customer support
-- 2. Analytics (avg time in each state)
-- 3. Ability to "replay" order history
CREATE TABLE order_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),

  event_type VARCHAR(50) NOT NULL,
  -- 'status_changed', 'assigned_to_rider', 'payment_captured', 'note_added'

  previous_status VARCHAR(20),
  new_status VARCHAR(20),

  -- Who did this?
  actor_type VARCHAR(20) NOT NULL,  -- 'customer', 'kitchen', 'rider', 'system', 'owner'
  actor_id UUID,

  -- Extra context
  metadata JSONB DEFAULT '{}',
  -- Examples: {reason: "out of stock"}, {prep_time: 25}, {payment_id: "pay_xyz"}

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_events_order ON order_events(order_id, created_at);
```

**Why both timestamps on orders AND an events table?**
- Timestamps on orders: fast queries ("what's the average prep time?", "show me orders confirmed in last hour")
- Events table: full history ("show me everything that happened to order #42", "who cancelled this?")
- This is the hybrid approach: simpler than full event sourcing, richer than just a status field.

#### delivery_staff

```sql
CREATE TABLE delivery_staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),

  -- Auth
  phone VARCHAR(20) NOT NULL,
  name VARCHAR(200) NOT NULL,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,    -- employed (can be deactivated)
  is_available BOOLEAN DEFAULT TRUE, -- currently on shift
  is_on_delivery BOOLEAN DEFAULT FALSE,  -- currently delivering an order

  -- Stats
  total_deliveries INTEGER DEFAULT 0,
  avg_delivery_time_minutes DECIMAL(5, 1),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_delivery_staff_available
  ON delivery_staff(restaurant_id)
  WHERE is_active = TRUE AND is_available = TRUE AND is_on_delivery = FALSE;
```

#### offers

```sql
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),

  -- Display
  title VARCHAR(200) NOT NULL,       -- "20% Off on First Order"
  description TEXT,
  image_url TEXT,

  -- Type & Value
  type VARCHAR(20) NOT NULL,         -- 'percentage', 'flat', 'free_delivery', 'bogo'
  value DECIMAL(10, 2) NOT NULL,     -- 20 (for 20%) or 50 (for Rs 50 off)

  -- Rules
  min_order_amount DECIMAL(10, 2) DEFAULT 0,
  max_discount DECIMAL(10, 2),       -- cap for percentage discounts
  code VARCHAR(50),                  -- null = auto-apply, non-null = coupon code required

  -- Targeting
  is_first_order_only BOOLEAN DEFAULT FALSE,
  applicable_categories UUID[],      -- null = all categories
  applicable_items UUID[],           -- null = all items

  -- Validity
  valid_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  valid_until TIMESTAMPTZ,           -- null = no expiry
  usage_limit INTEGER,               -- null = unlimited
  usage_per_customer INTEGER DEFAULT 1,
  used_count INTEGER DEFAULT 0,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  auto_apply BOOLEAN DEFAULT FALSE,  -- show in "available offers" without code

  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### loyalty_transactions

```sql
CREATE TABLE loyalty_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  order_id UUID REFERENCES orders(id),

  -- Positive = earned, Negative = redeemed
  points INTEGER NOT NULL,
  type VARCHAR(20) NOT NULL,  -- 'earned', 'redeemed', 'expired', 'bonus'
  description TEXT,           -- "Order #CV-0611-042", "Welcome bonus"

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_loyalty_customer
  ON loyalty_transactions(customer_id, created_at DESC);
```

---

## Part 5: Key Design Decisions Explained

### 5.1 Why JSONB for variants instead of a separate table?

**Option A: Separate variants table**
```sql
menu_item_variants (id, menu_item_id, name, price, is_available)
```

**Option B: JSONB on menu_items (our choice)**
```sql
menu_items.variants = [{"name": "Half", "price": 150}, {"name": "Full", "price": 250}]
```

**We chose B because:**
1. Variants are always fetched WITH their item (never independently)
2. A typical item has 1-4 variants (tiny arrays)
3. Avoids a JOIN on every menu fetch (150+ items * variants = many JOINs)
4. Menu editing is simpler (update one row, not coordinated multi-row updates)
5. Supabase returns this cleanly in the API response

**When to use a separate table instead:** If variants had their own relationships (e.g., variant-specific images, variant-specific addons). Ours don't.

### 5.2 Why separate addon_groups from menu_items?

Chilli Vanilla has items across categories that share addons:
- "Extra Cheese" applies to: dosas, pizzas, burgers, sandwiches, rolls
- "Choice of Sauce" applies to: momos, rolls, noodles

If addons were on each menu_item, we'd duplicate "Extra Cheese: Rs 30" across 50+ items. One price change = 50 updates.

With addon_groups at restaurant level:
- Define once: addon_group "Cheese Options" with option "Extra Cheese: Rs 30"
- Link to items: `menu_items.addon_group_ids = [uuid_of_cheese_options]`
- Change price once, all items reflect it

### 5.3 Why order_number is separate from id?

- `id` (UUID): for machines (API references, foreign keys, URLs)
- `order_number` (CV-0611-042): for humans (phone calls, receipts, kitchen display)

Format: `{restaurant_prefix}-{MMDD}-{daily_sequence}`
- "CV-0611-042" = Chilli Vanilla, June 11, 42nd order of the day
- Easy to read aloud, easy to find, resets daily

### 5.4 Why timestamps per state on the order?

```sql
placed_at, confirmed_at, preparing_at, ready_at, picked_up_at, delivered_at
```

This gives us instant analytics without querying the events table:
- **Average acceptance time:** `confirmed_at - placed_at`
- **Average prep time:** `ready_at - preparing_at`
- **Average delivery time:** `delivered_at - picked_up_at`
- **Total order time:** `delivered_at - placed_at`

DoorDash and Uber Eats both use this pattern. The events table is for the detailed story; the timestamps are for the dashboard charts.

### 5.5 Why payment_status is separate from order status?

An order can be:
- `status: delivered` + `payment_status: pending` (COD, customer hasn't paid yet)
- `status: cancelled` + `payment_status: refunded` (was paid online, now refunded)
- `status: placed` + `payment_status: authorized` (payment reserved but not captured)

These are independent state machines. Coupling them creates bugs.

---

## Part 6: Patterns We're NOT Using (and why)

| Pattern | Why We Skip It |
|---------|---------------|
| **Full Event Sourcing / CQRS** | Massive complexity. We use a hybrid (status field + event log). We're not at 10K orders/day |
| **Microservices** | We'll use a modular monolith (Next.js API routes). One deploy, clear module boundaries |
| **Separate Cart table** | Cart is client-side state (Enatega does this too). Cart becomes an Order on submission |
| **Real-time GPS tracking** | Delivery staff updates status manually (picked up, delivered). GPS tracking is a Phase 2 feature |
| **Complex pricing engine** | Simple: item price + addon prices + delivery fee - discount. No dynamic pricing |
| **Kafka/event streaming** | Supabase Realtime (WebSocket over Postgres changes) is sufficient |
| **Schema-per-tenant** | Shared schema + RLS. We'll have < 10 restaurants in year 1 |

---

## Part 7: Indexes & Performance

### Critical Queries and Their Indexes

| Query | Used By | Index |
|-------|---------|-------|
| Active orders for restaurant | Kitchen dashboard | `(restaurant_id, status, placed_at)` partial |
| Customer order history | Customer app | `(customer_id, placed_at DESC)` |
| Available menu items | Customer browse | `(category_id, sort_order)` partial |
| Available delivery staff | Manual assignment | `(restaurant_id)` partial on available |
| Menu text search | Customer search | GIN index on `to_tsvector` |

### Why Partial Indexes?

```sql
-- This index ONLY includes non-terminal orders
CREATE INDEX idx_orders_kitchen
  ON orders(restaurant_id, status, placed_at DESC)
  WHERE status NOT IN ('delivered', 'cancelled');
```

Over time, 95%+ of orders are delivered/cancelled. A partial index keeps only the ~5% active orders in the index, making it tiny and fast. The kitchen dashboard (which queries this constantly) gets sub-millisecond responses.

---

## Next Steps

1. **Validate** - Review this model against every screen/flow in the app
2. **Migration files** - Convert to Supabase SQL migrations
3. **RLS Policies** - Define row-level security for each table
4. **API Design** - Define the endpoints that operate on this model
5. **Seed Data** - Import Chilli Vanilla's 450+ menu items
