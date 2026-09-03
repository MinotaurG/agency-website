# Medusa v2 + SD18: Learning Guide

> From zero to production. Every concept explained, then mapped to SD18's real use case.
> This is a living document. Updated as we build.

---

## Table of Contents

1. [Level 0: What Problem Does Medusa Solve?](#level-0-what-problem-does-medusa-solve)
2. [Level 1: Core Concepts](#level-1-core-concepts)
3. [Level 2: Architecture](#level-2-architecture)
4. [Level 3: Data Model](#level-3-data-model)
5. [Level 4: The Order Engine (Workflows & Sagas)](#level-4-the-order-engine)
6. [Level 5: Custom Modules (Razorpay, Shiprocket, COD)](#level-5-custom-modules)
7. [Level 6: The Storefront (Next.js)](#level-6-the-storefront)
8. [Level 7: Deployment & Operations](#level-7-deployment-and-operations)
9. [Level 8: Failure Modes & Recovery](#level-8-failure-modes)

---

## Level 0: What Problem Does Medusa Solve?

### The Problem (Without Medusa)

You want to sell cricket bats online. Sounds simple. But:

1. Customer adds a bat to cart. Another customer adds the same bat. Only 1 in stock. Who gets it?
2. Customer pays via UPI. Payment succeeds. Your server crashes before creating the order. Customer charged, no order. Now what?
3. Customer orders a bat at ₹1,999. You change the price to ₹2,499 next week. Their order history now shows the wrong price.
4. Two people hit "Place Order" at the exact same millisecond. Both get order confirmations. You only have one bat.

These aren't edge cases. They happen daily on any store with real traffic. Solving them correctly requires:

- **Distributed transactions** (multi-step operations that either ALL succeed or ALL roll back)
- **Inventory locking** (prevent two processes from selling the same item)
- **Price snapshotting** (freeze financial data at time of order)
- **Idempotency** (same request twice = same result, not duplicate orders)

Medusa solves all of these. It's an **e-commerce backend framework** that handles the hard distributed systems problems so you focus on the storefront and business logic.

### What Medusa Is (and Isn't)

| Medusa IS | Medusa IS NOT |
|-----------|---------------|
| A backend server (Node.js) with REST API | A frontend/storefront (you build that separately) |
| A product catalog + order engine + admin dashboard | A website template or theme |
| A framework you extend with custom modules | A hosted service you pay monthly for |
| Open source (MIT license, full code access) | A black box SaaS like Shopify |

### SD18 Translation

```
┌─────────────────────────────────────────────────────┐
│  What SD18 Customers See     (Next.js storefront)   │
│  - Browse bats, gloves, polos                       │
│  - Add to cart, checkout                            │
│  - Pay with UPI/card/COD                            │
│  - Track their order                                │
└───────────────────────┬─────────────────────────────┘
                        │ API calls
                        ▼
┌─────────────────────────────────────────────────────┐
│  What Medusa Handles         (Backend server)       │
│  - Product data, variants, pricing                  │
│  - Cart logic, inventory reservation                │
│  - Checkout workflow (saga with compensation)        │
│  - Payment orchestration (Razorpay)                 │
│  - Fulfillment (Shiprocket shipping labels)         │
│  - Order lifecycle (placed → shipped → delivered)   │
│  - Admin dashboard for SD18 team                    │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│  PostgreSQL Database                                 │
│  - Products, variants, prices                       │
│  - Orders, line items, transactions                 │
│  - Customers, addresses                             │
│  - Inventory levels                                 │
└─────────────────────────────────────────────────────┘
```

---

## Level 1: Core Concepts

### 1.1 Products, Variants, and Options

In e-commerce, a "product" is not a single thing. It's a family of things.

**Example: SD18 Premium Polo Shirt**

The product is "SD18 Premium Polo." But you can't just add it to cart. You need to specify:
- Which **size**? (S, M, L, XL, XXL)
- Which **colour**? (Royal Blue, Navy, Black)

Each combination (L + Royal Blue, XL + Navy, etc.) is a **variant**. Each variant:
- Has its own stock count (5 units of L/Blue, 0 units of XXL/Black)
- Could have its own price (usually same, but XXL might cost more)
- Has its own SKU (stock keeping unit, a unique identifier)

**Medusa's model:**

```
Product: "SD18 Premium Polo"
├── Options: [Size, Colour]
│   ├── Size values: [S, M, L, XL, XXL]
│   └── Colour values: [Royal Blue, Navy, Black]
│
└── Variants (one per combination that exists):
    ├── SD18-POLO-RB-S  → Size: S, Colour: Royal Blue, Price: ₹999, Stock: 10
    ├── SD18-POLO-RB-M  → Size: M, Colour: Royal Blue, Price: ₹999, Stock: 15
    ├── SD18-POLO-RB-L  → Size: L, Colour: Royal Blue, Price: ₹999, Stock: 8
    ├── SD18-POLO-NV-M  → Size: M, Colour: Navy, Price: ₹999, Stock: 12
    ├── SD18-POLO-NV-L  → Size: L, Colour: Navy, Price: ₹999, Stock: 6
    └── ... (not every combination needs to exist)
```

**SD18's full product catalog mapped:**

| Product | Options | Variant Count (approx) |
|---------|---------|----------------------|
| Kashmir Willow Bat | Size (SH, 6, 5, 4, 3) | 5 |
| English Willow Bat | Size (SH, 6, 5) | 3 |
| Batting Gloves "Matchlite" | Size (Men, Youth), Hand (RH, LH) | 4 |
| Leg Guard "Pro" | Size (Men, Youth), Hand (RH, LH) | 4 |
| Premium Polo | Size (S-XXL), Colour (3 colours) | ~15 |
| Track Pants | Size (S-XXL), Colour (5 colours) | ~25 |
| Cricket Bag "Pro" | Colour (Blue, Red, Black) | 3 |
| Cap | Colour (3 colours) | 3 |
| Cricket Ball (Leather) | Type (Match, Practice) | 2 |

**Why this matters:** Medusa handles the entire Options × Variants matrix for you, including inventory per variant, images per variant, and the storefront UI for selecting options.

---

### 1.2 Collections and Categories

**Categories** = how customers navigate (hierarchical).
**Collections** = marketing groupings (flat, overlapping).

```
Categories (tree):
├── Cricket Equipment
│   ├── Bats
│   ├── Gloves
│   ├── Pads & Guards
│   ├── Balls
│   └── Bags
├── Apparel
│   ├── Polos
│   ├── Track Pants
│   └── Caps
└── Accessories

Collections (flat):
├── "New Arrivals" (latest 10 products)
├── "Best Sellers" (manual curation)
├── "IPL Season" (seasonal promotion)
├── "Under ₹500" (price-based)
└── "Complete Kit" (bundled recommendation)
```

A product can be in one category but multiple collections. The Kashmir Willow Bat is in category "Bats" but also in collections "Best Sellers" and "Under ₹2000."

---

### 1.3 The Cart

A cart is a temporary holding area. It exists before the customer is committed.

**Key rules:**
- A cart belongs to one customer (or is "anonymous" for guest checkout)
- Cart holds items with quantities, selected variants, and current prices
- Cart calculates totals (subtotal + shipping + tax - discounts)
- Cart is NOT an order. It becomes an order only when checkout completes.
- **Cart is server-side in Medusa** (not just browser localStorage). This means:
  - Cart survives browser refresh, device switch
  - Prices update if you change them (until checkout completes)
  - Inventory is NOT reserved in the cart (only at checkout)

**SD18 example flow:**

```
Customer browses → adds "Kashmir Willow Bat (SH)" to cart
                 → adds "Batting Gloves (Men, RH)" to cart
                 → enters pincode 713301 for delivery
                 → Medusa calculates Shiprocket shipping rate
                 → applies coupon "FIRST10" (10% off first order)
                 → cart shows:
                     Bat:     ₹1,999
                     Gloves:  ₹899
                     Subtotal: ₹2,898
                     Discount: -₹290
                     Shipping: ₹99
                     Total:    ₹2,707
```

---

### 1.4 The Order Lifecycle

Once checkout completes, the cart becomes an **order**. The order has a lifecycle:

```
                    ┌──────────────────┐
                    │     PENDING      │  ← Order just created
                    └────────┬─────────┘
                             │ Payment captured / COD confirmed
                             ▼
                    ┌──────────────────┐
                    │   COMPLETED      │  ← Ready to fulfill
                    └────────┬─────────┘
                             │ Shipped via Shiprocket
                             ▼
                    ┌──────────────────┐
                    │   (Fulfilled)    │  ← Tracking number assigned
                    └────────┬─────────┘
                             │ Delivered
                             ▼
                    ┌──────────────────┐
                    │   (Delivered)    │  ← Terminal state
                    └──────────────────┘

  At any point before shipping:
                    ┌──────────────────┐
                    │    CANCELED      │  ← Refund issued if paid
                    └──────────────────┘
```

**Medusa's actual order statuses:**
- `PENDING` — order created, awaiting payment confirmation
- `COMPLETED` — payment received, ready for fulfillment
- `DRAFT` — admin-created order (not yet confirmed)
- `CANCELED` — cancelled (with optional refund)
- `ARCHIVED` — historical, no longer active
- `REQUIRES_ACTION` — something needs manual intervention

**Fulfillment** is tracked separately from order status. An order can be `COMPLETED` (paid) but not yet shipped. This separation is important because:
- An order with 3 items might ship 2 today and 1 next week (partial fulfillment)
- Shipping status comes from Shiprocket, not from Medusa's order status

---

### 1.5 Payments

Medusa separates the **payment lifecycle** from the **order lifecycle**. They're independent state machines.

**Payment states:**
```
initiated → authorized → captured → (partially) refunded
                │
                └→ canceled (voided before capture)
```

**What each state means:**

| State | What Happened | Money Moved? |
|-------|--------------|--------------|
| `initiated` | Customer selected payment method, Razorpay order created | No |
| `authorized` | Customer completed UPI/card payment, Razorpay confirmed | Reserved (not in your account yet) |
| `captured` | You (or auto-capture) pulled the money into your account | Yes, you have it |
| `refunded` | You returned the money to customer | Yes, returned |
| `canceled` | Authorization voided before capture | No money moved |

**For SD18:**
- **Online payments (UPI/card):** `initiated → authorized → captured` (auto-capture on authorization)
- **COD:** `initiated → authorized` at checkout (no money moves). `captured` when delivery boy confirms cash received.

---

### 1.6 Fulfillment

Fulfillment = getting the product to the customer.

**Medusa's fulfillment abstraction:**

```
Order (COMPLETED, paid)
  └── Fulfillment
      ├── Items: [Bat, Gloves]
      ├── Provider: "shiprocket"
      ├── Tracking number: "SR123456789"
      ├── Tracking link: "https://shiprocket.co/tracking/..."
      └── Status: shipped → delivered
```

**SD18's fulfillment flow:**
1. Order paid → appears in Medusa admin "Orders to fulfill"
2. SD18 team clicks "Create Shipment"
3. Our Shiprocket module: creates order in Shiprocket, gets AWB number
4. Shiprocket assigns courier (Delhivery, BlueDart, etc.), generates label
5. SD18 prints label, packs product, hands to courier
6. Shiprocket webhook updates: picked up → in transit → delivered
7. Customer sees tracking updates

---

## Level 2: Architecture

### 2.1 The Three Layers

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PRESENTATION LAYER                           │
│                                                                      │
│  ┌──────────────────────┐    ┌──────────────────────────────────┐   │
│  │  Next.js Storefront  │    │  Medusa Admin Dashboard          │   │
│  │  (sd18sports.com)    │    │  (admin.sd18sports.com)          │   │
│  │                      │    │                                   │   │
│  │  • Product pages     │    │  • Manage products & inventory   │   │
│  │  • Cart & checkout   │    │  • Process orders                │   │
│  │  • Customer account  │    │  • View analytics                │   │
│  │  • Blog (Sanity)     │    │  • Configure shipping & payments │   │
│  │                      │    │  • Manage discounts              │   │
│  └──────────┬───────────┘    └──────────────────┬───────────────┘   │
│             │                                    │                    │
└─────────────┼────────────────────────────────────┼───────────────────┘
              │  REST API                           │  REST API
              ▼                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         APPLICATION LAYER                            │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                    Medusa Server (Node.js)                      │ │
│  │                                                                 │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │ │
│  │  │ Product  │ │  Cart &  │ │ Payment  │ │  Fulfillment     │  │ │
│  │  │ Module   │ │  Order   │ │ Module   │ │  Module          │  │ │
│  │  │          │ │  Module  │ │          │ │                   │  │ │
│  │  │ catalog, │ │ checkout,│ │ Razorpay │ │  Shiprocket      │  │ │
│  │  │ variants,│ │ sagas,   │ │ COD      │ │  tracking        │  │ │
│  │  │ pricing  │ │ locking  │ │ refunds  │ │  labels          │  │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘  │ │
│  │                                                                 │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │ │
│  │  │ Customer │ │ Discount │ │Inventory │ │  Notification    │  │ │
│  │  │ Module   │ │ Module   │ │ Module   │ │  Module          │  │ │
│  │  │          │ │          │ │          │ │                   │  │ │
│  │  │ accounts,│ │ coupons, │ │ stock,   │ │  email (Resend)  │  │ │
│  │  │ auth,    │ │ rules,   │ │ reserve, │ │  WhatsApp        │  │ │
│  │  │ groups   │ │ auto     │ │ locking  │ │  SMS             │  │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘  │ │
│  │                                                                 │ │
│  │  ┌─────────────────────────────────────────────────────────┐   │ │
│  │  │              Workflow Engine (Saga Orchestrator)          │   │ │
│  │  │  • Checkout workflow (15-step saga)                      │   │ │
│  │  │  • Compensation on failure (automatic rollback)          │   │ │
│  │  │  • Durable execution (survives crashes via Redis)        │   │ │
│  │  │  • Per-step retry, timeout, async support                │   │ │
│  │  └─────────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
└──────────────────────────────────┬───────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                                    │
│                                                                      │
│  ┌──────────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   PostgreSQL     │  │    Redis     │  │  File Storage        │  │
│  │                  │  │              │  │  (Cloudinary)        │  │
│  │  • Products      │  │  • Session   │  │                      │  │
│  │  • Orders        │  │  • Cart cache│  │  • Product images    │  │
│  │  • Customers     │  │  • Locks     │  │  • Category banners  │  │
│  │  • Inventory     │  │  • Workflow  │  │                      │  │
│  │  • Transactions  │  │    state     │  │                      │  │
│  └──────────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 How a Request Flows

**Example: Customer adds Kashmir Willow Bat to cart**

```
1. Browser (Next.js): POST /store/carts/{cart_id}/line-items
   Body: { variant_id: "variant_bat_kw_sh", quantity: 1 }

2. Vercel edge → forwards to Medusa server (Railway)

3. Medusa API route receives request
   → validates: does this variant exist? is it published? is quantity > 0?
   → checks: is there stock available? (informational, not reserved yet)
   → adds line item to cart in PostgreSQL
   → recalculates cart totals (subtotal, tax, shipping estimate)
   → returns updated cart object

4. Next.js storefront updates UI with new cart state
```

**Example: Customer completes checkout (the hard one)**

```
1. Browser: POST /store/carts/{cart_id}/complete

2. Medusa receives → triggers completeCartWorkflow (the 15-step saga):

   Step 1:  LOCK cart (prevent duplicate submissions)
   Step 2:  Fetch full cart data
   Step 3:  Check idempotency (was this already completed?)
   Step 4:  Validate items still exist and are purchasable
   Step 5:  Validate payment session is ready
   Step 6:  Register compensation safety net for payment
   Step 7:  Fire "validate" hook (custom validation logic)
   Step 8:  Fetch shipping options for the address
   Step 9:  Validate shipping method is still valid
   Step 10: Transform cart data → order data
   Step 11: CREATE ORDER in database
   Step 12: [Parallel] Reserve inventory + link cart to order + emit events
   Step 13: AUTHORIZE PAYMENT (money moves here)
   Step 14: Record payment transaction on order
   Step 15: RELEASE LOCK

   If step 13 FAILS (payment declined):
   → Step 12 compensation: release inventory reservation
   → Step 11 compensation: delete the order
   → Step 6 compensation: refund if money was captured
   → Customer sees: "Payment failed, please try again"
   → No orphan orders. No lost inventory. No phantom charges.

3. Returns order ID to storefront
4. Next.js redirects to /order-confirmation/{order_id}
```

### 2.3 Module Architecture

Medusa is built as a **modular monolith**. Each module owns its domain and exposes a service interface. Modules communicate through the **Medusa container** (dependency injection) and **events** (pub/sub).

```
┌─────────────────────────────────────────────────────┐
│                 Medusa Container (DI)                 │
│                                                      │
│  resolve("product")     → ProductModuleService       │
│  resolve("order")       → OrderModuleService         │
│  resolve("payment")     → PaymentModuleService       │
│  resolve("inventory")   → InventoryModuleService     │
│  resolve("fulfillment") → FulfillmentModuleService   │
│  resolve("customer")    → CustomerModuleService      │
│  resolve("pricing")     → PricingModuleService       │
│  resolve("promotion")   → PromotionModuleService     │
│  resolve("locking")     → LockingModuleService       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Why modules matter:** You can replace any module. Don't like Medusa's pricing logic? Write your own module that implements the same interface. The rest of the system doesn't care.

For SD18, we replace:
- Default payment provider → our **Razorpay module**
- Default fulfillment provider → our **Shiprocket module**
- Add a new notification provider → our **WhatsApp module**

---

### 2.4 Events and Subscribers

When something happens (order placed, payment captured, item shipped), Medusa emits an **event**. Subscribers listen and react.

```
Event: "order.placed"
  │
  ├── Subscriber: SendOrderConfirmationEmail
  │   → Sends email via Resend
  │
  ├── Subscriber: NotifyWhatsApp
  │   → Sends "Order received!" to SD18 team via WhatsApp
  │
  └── Subscriber: UpdateAnalytics
      → Increments daily order count

Event: "fulfillment.created"
  │
  ├── Subscriber: SendShippingNotification
  │   → Emails customer tracking link
  │
  └── Subscriber: NotifyWhatsApp
      → "Your order has been shipped! Track: ..."
```

**For SD18:** We subscribe to events to:
1. Notify SD18 team on WhatsApp when a new order comes in
2. Send shipping confirmation with Shiprocket tracking link
3. Update customer via email at each status change

---

## Level 3: Data Model

### 3.1 Entity Relationship (Simplified for SD18)

```
┌──────────────┐         ┌────────────────┐
│   Product    │ 1 ── N  │    Variant     │
│              │         │                │
│ id           │         │ id             │
│ title        │         │ product_id     │
│ description  │         │ sku            │
│ handle (slug)│         │ title          │
│ status       │         │ prices[]       │
│ images[]     │         │ options{}      │
│ options[]    │         │ inventory_qty  │
│ categories[] │         │ manage_inv     │
└──────────────┘         └────────────────┘

┌──────────────┐         ┌────────────────┐
│   Customer   │ 1 ── N  │    Order       │
│              │         │                │
│ id           │         │ id             │
│ email        │         │ display_id     │
│ phone        │         │ customer_id    │
│ name         │         │ status         │
│ addresses[]  │         │ currency_code  │
│ orders[]     │         │ total          │
│              │         │ items[]        │
│              │         │ shipping_addr  │
│              │         │ billing_addr   │
│              │         │ payments[]     │
│              │         │ fulfillments[] │
└──────────────┘         └────────────────┘

┌──────────────────────────────────────────┐
│            Order Line Item               │
│                                          │
│ id                                       │
│ order_id                                 │
│ variant_id (reference only)              │
│ ──── SNAPSHOTTED DATA (frozen) ────      │
│ product_title: "Kashmir Willow Bat"      │
│ variant_title: "Size SH"                │
│ variant_sku: "SD18-BAT-KW-SH"          │
│ unit_price: 1999.00                      │
│ quantity: 1                              │
│ subtotal: 1999.00                        │
│ ──── END SNAPSHOT ────                   │
│ tax_lines[]                              │
│ adjustments[] (discounts applied)        │
└──────────────────────────────────────────┘
```

### 3.2 Price Snapshotting (Critical Concept)

**The problem:** SD18 sells a bat for ₹1,999. Customer buys it Monday. Tuesday, SD18 raises the price to ₹2,499.

**Wrong approach:** Order line item stores `variant_id` and you JOIN to variants table to get the price. Now every past order shows ₹2,499. Customer support nightmare.

**Correct approach (what Medusa does):** The order line item **copies** the price at the moment of purchase. It's a snapshot. The order is a self-contained financial document.

```sql
-- Line item stores everything needed to display and calculate
-- WITHOUT joining to any other table:
order_line_items:
  unit_price = 1999.00          -- frozen at time of order
  product_title = "Kashmir Willow Bat"  -- even if product is renamed later
  variant_title = "Size SH"     -- even if variant options change
  variant_sku = "SD18-BAT-KW-SH"
  quantity = 1
  subtotal = 1999.00
```

**Rule:** Never JOIN to the products table to display or calculate an order. The order is immutable.

### 3.3 SD18 Products in Medusa's Schema

**Product: SD18 Kashmir Willow Cricket Bat**

```json
{
  "id": "prod_bat_kw",
  "title": "SD18 Kashmir Willow Cricket Bat",
  "handle": "sd18-kashmir-willow-bat",
  "description": "Premium 4-piece Kashmir Willow bat. Hand-selected grain...",
  "status": "published",
  "categories": [{ "id": "cat_bats", "name": "Bats" }],
  "collections": [{ "id": "col_bestsellers", "name": "Best Sellers" }],
  "options": [
    { "id": "opt_size", "title": "Size", "values": ["SH", "6", "5", "4", "3"] }
  ],
  "variants": [
    {
      "id": "variant_bat_kw_sh",
      "title": "SH",
      "sku": "SD18-BAT-KW-SH",
      "prices": [{ "amount": 199900, "currency_code": "inr" }],
      "options": { "Size": "SH" },
      "inventory_quantity": 25,
      "manage_inventory": true
    },
    {
      "id": "variant_bat_kw_6",
      "title": "Size 6",
      "sku": "SD18-BAT-KW-6",
      "prices": [{ "amount": 189900, "currency_code": "inr" }],
      "options": { "Size": "6" },
      "inventory_quantity": 15,
      "manage_inventory": true
    }
  ],
  "images": [
    { "url": "https://res.cloudinary.com/.../bat-kw-front.jpg" },
    { "url": "https://res.cloudinary.com/.../bat-kw-back.jpg" },
    { "url": "https://res.cloudinary.com/.../bat-kw-edge.jpg" }
  ],
  "metadata": {
    "willow_type": "Kashmir",
    "weight_range": "1100-1250g",
    "sweet_spot": "Mid-Low",
    "handle_type": "Round"
  }
}
```

> **Note:** Prices in Medusa are stored in the smallest currency unit. ₹1,999 = 199900 paise. This avoids floating point issues.

### 3.4 Inventory Model

```
┌───────────────────┐     ┌────────────────────┐
│  Inventory Item   │     │  Inventory Level   │
│                   │     │                    │
│  id               │ 1─N │  id                │
│  sku              │────>│  inventory_item_id │
│  (linked to       │     │  location_id       │
│   variant)        │     │  stocked_quantity  │
│                   │     │  reserved_quantity │
│                   │     │  available = stocked│
│                   │     │              - reserved│
└───────────────────┘     └────────────────────┘

┌───────────────────┐
│  Stock Location   │
│                   │
│  id               │
│  name: "SD18 Warehouse, Asansol"
│  address          │
└───────────────────┘
```

**For SD18:**
- One stock location: "SD18 Warehouse, Asansol"
- Each variant has one inventory item
- `stocked_quantity` = total units in warehouse
- `reserved_quantity` = units held for orders in checkout
- `available` = stocked - reserved (what customers can buy)

**What happens during checkout:**
```
Before checkout: stocked=25, reserved=0, available=25
During checkout: stocked=25, reserved=1, available=24  ← reserved for this order
After payment:   stocked=24, reserved=0, available=24  ← decremented, reservation released
If payment fails: stocked=25, reserved=0, available=25 ← reservation released
```

---

## Level 4: The Order Engine (Workflows & Sagas)

### 4.1 What's a Saga?

A saga is a sequence of steps where each step has a **compensation** (undo action). If any step fails, all previous steps are undone in reverse order.

**Real-world analogy:** Booking a trip.

```
Step 1: Book flight         → Compensation: Cancel flight
Step 2: Book hotel          → Compensation: Cancel hotel
Step 3: Book rental car     → Compensation: Cancel car
Step 4: Charge credit card  → Compensation: Refund card

If Step 3 fails:
→ Run Step 2 compensation (cancel hotel)
→ Run Step 1 compensation (cancel flight)
→ Customer sees: "Booking failed, nothing was charged"
```

**In Medusa's checkout:**

```
Step 1:  Lock cart           → Compensation: Release lock
Step 2:  Create order        → Compensation: Delete order
Step 3:  Reserve inventory   → Compensation: Release reservation
Step 4:  Authorize payment   → Compensation: Refund/void payment

If Step 4 fails (card declined):
→ Step 3 compensation: release inventory (bat is available again)
→ Step 2 compensation: delete the order (no orphan record)
→ Step 1 compensation: release lock (cart can be retried)
→ Customer sees: "Payment failed, please try again"
→ System state: exactly as if checkout was never attempted
```

### 4.2 The TransactionOrchestrator

This is Medusa's saga engine. Key behaviors:

**1. Step tracking:**
Each step has an independent state: `NOT_STARTED → INVOKING → DONE` (or `→ FAILED`)

**2. Compensation ordering:**
Steps are compensated in reverse depth order. Deepest (latest) steps undo first.

**3. Persistence:**
Transaction state is saved to Redis. If the Node.js process crashes mid-checkout:
- On restart, the orchestrator reads the last checkpoint
- Determines which steps completed, which were in-progress
- Either retries the in-progress step or begins compensation

**4. Concurrency:**
Steps marked for parallel execution run simultaneously. In checkout, step 12 runs 4 things in parallel (reserve inventory + link cart + update cart + emit events). All 4 must succeed before step 13 (payment) executes.

### 4.3 Writing a Custom Workflow (Example)

Here's what a custom workflow looks like. Suppose we want a "cancel order" workflow for SD18:

```typescript
// src/workflows/cancel-order.ts

import { createWorkflow, createStep, StepResponse } from "@medusajs/workflows-sdk"

// Step 1: Validate cancellation is allowed
const validateCancellation = createStep(
  "validate-cancellation",
  async ({ order_id }, { container }) => {
    const orderService = container.resolve("order")
    const order = await orderService.retrieveOrder(order_id)
    
    if (order.fulfillment_status === "shipped") {
      throw new Error("Cannot cancel: order already shipped")
    }
    
    return new StepResponse(order)
  }
  // No compensation needed: validation doesn't change state
)

// Step 2: Release inventory
const releaseInventory = createStep(
  "release-inventory",
  async ({ order }, { container }) => {
    const inventoryService = container.resolve("inventory")
    // Release reserved stock for each line item
    const released = await inventoryService.releaseReservations(order.id)
    return new StepResponse(released, { order_id: order.id })
  },
  // Compensation: re-reserve if we need to un-cancel
  async ({ order_id }, { container }) => {
    // In practice, cancellation is usually final, but the pattern is here
  }
)

// Step 3: Refund payment
const refundPayment = createStep(
  "refund-payment",
  async ({ order }, { container }) => {
    const paymentService = container.resolve("payment")
    const refund = await paymentService.refundPayment(order.payment_id)
    return new StepResponse(refund, { payment_id: order.payment_id })
  },
  // Compensation: capture again (if refund needs to be undone)
  async ({ payment_id }, { container }) => {
    // Refund compensation is complex, usually not needed for cancel flow
  }
)

// Step 4: Update order status
const updateOrderStatus = createStep(
  "update-order-status",
  async ({ order }, { container }) => {
    const orderService = container.resolve("order")
    await orderService.updateOrders(order.id, { status: "canceled" })
    return new StepResponse({ order_id: order.id })
  }
)

// Compose the workflow
export const cancelOrderWorkflow = createWorkflow(
  "cancel-order",
  (input) => {
    const order = validateCancellation(input)
    releaseInventory({ order })
    refundPayment({ order })
    updateOrderStatus({ order })
  }
)
```

### 4.4 Workflow Visualization

```
cancelOrderWorkflow
│
├── Step 1: validateCancellation
│   ├── Invoke: Check order status, throw if shipped
│   └── Compensate: (none)
│
├── Step 2: releaseInventory
│   ├── Invoke: Release reserved stock
│   └── Compensate: Re-reserve stock
│
├── Step 3: refundPayment
│   ├── Invoke: Call Razorpay refund API
│   └── Compensate: (none, refunds are final)
│
└── Step 4: updateOrderStatus
    ├── Invoke: Set order.status = "canceled"
    └── Compensate: Set order.status back to previous

If Step 3 fails (Razorpay API timeout):
→ Step 3 retries (maxRetries: 3, retryInterval: 5s)
→ If still fails after retries:
  → Step 2 compensated: stock re-reserved
  → Order remains in current status
  → Error surfaced to admin: "Refund failed, please retry manually"
```

---

## Level 5: Custom Modules (SD18-Specific)

### 5.1 Razorpay Payment Module

**What it does:** Handles all payment operations via Razorpay's API.

**Lifecycle mapping:**

| Medusa calls | Our module does | Razorpay API |
|---|---|---|
| `initiatePayment` | Create a Razorpay Order | `POST /orders` |
| `authorizePayment` | Verify payment signature | Signature verification (HMAC) |
| `capturePayment` | Capture authorized payment | `POST /payments/{id}/capture` |
| `refundPayment` | Process refund | `POST /payments/{id}/refund` |
| `cancelPayment` | Cancel payment link | (void, no Razorpay call needed) |
| `getWebhookActionAndData` | Parse Razorpay webhook | Verify webhook signature |

**Customer experience:**
```
1. Customer clicks "Pay Now" on checkout
2. Our module creates a Razorpay order (amount: ₹2,707)
3. Storefront opens Razorpay checkout modal (UPI, card, net banking options)
4. Customer pays via UPI
5. Razorpay redirects back with payment_id + signature
6. Our module verifies signature (HMAC-SHA256)
7. Returns status: "authorized" (or "captured" if auto-capture enabled)
8. Medusa continues checkout saga → creates order → reserves inventory
```

**COD variant:**
```
1. Customer selects "Cash on Delivery"
2. Our COD module returns status: "authorized" immediately (no money moves)
3. Checkout saga continues normally
4. On delivery: SD18 marks payment as "captured" in admin
5. If customer refuses delivery: SD18 marks order as "canceled"
```

### 5.2 Shiprocket Fulfillment Module

**What it does:** Creates shipments, fetches rates, provides tracking.

**Key operations:**

| Medusa calls | Our module does | Shiprocket API |
|---|---|---|
| `getFulfillmentOptions` | Return available shipping methods | — |
| `calculatePrice` | Get shipping rate for pincode | `POST /courier/serviceability` |
| `createFulfillment` | Create order + get AWB | `POST /orders/create/adhoc` |
| `cancelFulfillment` | Cancel shipment | `POST /orders/cancel` |
| Webhook handler | Update tracking status | Incoming webhook |

**Shipping rate calculation (at checkout):**
```
Customer enters pincode: 713301 (Asansol)
  │
  ▼
Our module calls Shiprocket:
  POST /courier/serviceability
  Body: {
    pickup_postcode: "713301",    // SD18 warehouse
    delivery_postcode: "110001",  // Customer (Delhi)
    weight: 1.2,                  // kg (bat weight)
    cod: false                    // prepaid
  }
  │
  ▼
Shiprocket returns available couriers:
  [
    { courier: "Delhivery", rate: ₹89, etd: "4-5 days" },
    { courier: "BlueDart", rate: ₹129, etd: "2-3 days" },
    { courier: "DTDC", rate: ₹79, etd: "5-7 days" }
  ]
  │
  ▼
We show customer: "Standard (₹79, 5-7 days)" and "Express (₹129, 2-3 days)"
```

### 5.3 WhatsApp Notification Subscriber

**Not a module, but a subscriber.** It listens to events and sends WhatsApp messages.

```typescript
// src/subscribers/whatsapp-notify.ts

import { SubscriberArgs } from "@medusajs/framework"

export default async function whatsappNotify({ 
  event, 
  container 
}: SubscriberArgs) {
  const order = event.data
  
  // Notify SD18 team
  await sendWhatsApp("+917004000329", `
    🛒 New Order #${order.display_id}
    Customer: ${order.customer.name}
    Total: ₹${order.total / 100}
    Items: ${order.items.map(i => i.product_title).join(", ")}
  `)
}

// Subscribe to the event
export const config = {
  event: "order.placed"
}
```

---

## Level 6: The Storefront (Next.js)

### 6.1 Pages We Build

| Page | Route | Data Source |
|------|-------|-------------|
| Homepage | `/` | Collections + featured products from Medusa |
| Product listing | `/shop` | All products, with filters |
| Category page | `/shop/bats` | Products by category |
| Product detail | `/shop/bats/kashmir-willow` | Single product + variants |
| Cart | `/cart` | Cart from Medusa API |
| Checkout | `/checkout` | Cart + addresses + payment |
| Order confirmation | `/order/[id]` | Order from Medusa API |
| Account | `/account` | Customer + order history |
| Blog | `/blog/[slug]` | Sanity CMS |
| About / Contact | `/about`, `/contact` | Static + form |

### 6.2 How the Storefront Talks to Medusa

```typescript
// Using Medusa's JS SDK in Next.js

import Medusa from "@medusajs/js-sdk"

const medusa = new Medusa({
  baseUrl: "https://api.sd18sports.com",  // Medusa server on Railway
  publishableKey: "pk_..."
})

// Fetch products for listing page
const { products } = await medusa.store.product.list({
  category_id: "cat_bats",
  limit: 20
})

// Add to cart
await medusa.store.cart.createLineItem(cartId, {
  variant_id: "variant_bat_kw_sh",
  quantity: 1
})

// Complete checkout
const { order } = await medusa.store.cart.complete(cartId)
```

### 6.3 Storefront Architecture

```
src/
├── app/                        (Next.js App Router)
│   ├── (store)/                (marketing/store layout)
│   │   ├── page.tsx            (homepage)
│   │   ├── shop/
│   │   │   ├── page.tsx        (all products)
│   │   │   └── [handle]/
│   │   │       └── page.tsx    (product detail page)
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   └── account/
│   │       ├── page.tsx
│   │       └── orders/
│   │           └── [id]/page.tsx
│   └── (blog)/
│       └── blog/
│           └── [slug]/page.tsx
├── components/
│   ├── product/               (ProductCard, VariantSelector, ImageGallery)
│   ├── cart/                  (CartItem, CartSummary, CartDrawer)
│   ├── checkout/              (AddressForm, ShippingSelect, PaymentForm)
│   └── ui/                    (shadcn primitives)
├── lib/
│   ├── medusa.ts              (SDK client instance)
│   └── sanity.ts              (Sanity client for blog)
└── config/
    └── site.ts                (brand config, nav links)
```

---

## Level 7: Deployment & Operations

### 7.1 Infrastructure Map

```
┌─────────────────────────────────────────────────────────────┐
│                        INTERNET                              │
└───────────────┬─────────────────────────────┬───────────────┘
                │                             │
    ┌───────────▼──────────┐      ┌──────────▼──────────────┐
    │   Vercel             │      │   Railway                │
    │                      │      │                          │
    │ ┌──────────────────┐ │      │ ┌──────────────────────┐ │
    │ │ Next.js Store    │ │ API  │ │ Medusa Server        │ │
    │ │ sd18sports.com   │─┼──────┼→│ api.sd18sports.com   │ │
    │ │                  │ │      │ │ (Node.js)            │ │
    │ └──────────────────┘ │      │ └──────────┬───────────┘ │
    │                      │      │            │             │
    │ ┌──────────────────┐ │      │ ┌──────────▼───────────┐ │
    │ │ Medusa Admin     │ │      │ │ PostgreSQL           │ │
    │ │ admin.sd18.com   │─┼──────┼→│ (managed)            │ │
    │ │ (or same Vercel) │ │      │ └──────────────────────┘ │
    │ └──────────────────┘ │      │                          │
    └──────────────────────┘      │ ┌──────────────────────┐ │
                                  │ │ Redis                │ │
                                  │ │ (sessions + locks +  │ │
                                  │ │  workflow state)     │ │
                                  │ └──────────────────────┘ │
                                  └──────────────────────────┘

External Services:
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────┐
│  Razorpay    │ │  Shiprocket  │ │  Cloudinary  │ │  Resend  │
│  (payments)  │ │  (shipping)  │ │  (images)    │ │  (email) │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────┘
```

### 7.2 SD18 Daily Operations (Using Medusa Admin)

**Morning routine:**
1. Open admin dashboard
2. Check "New Orders" tab — see overnight orders
3. For each order: review items, print packing slip
4. Click "Create Fulfillment" → Shiprocket module creates shipment
5. Print shipping label, pack products
6. Hand to courier when they arrive

**Inventory management:**
1. New stock arrives from manufacturer
2. Open admin → Products → [Product] → Variants
3. Update "Inventory quantity" for each variant
4. (Or bulk import via CSV)

**Price changes:**
1. Open admin → Products → [Product] → Variants → Edit prices
2. Save. Storefront reflects immediately.
3. Past orders unaffected (snapshotted).

---

## Level 8: Failure Modes & Recovery

### 8.1 What Can Go Wrong

| Failure | Impact | How Medusa Handles It | What We Add |
|---------|--------|----------------------|-------------|
| Medusa server crashes mid-checkout | Customer sees error | Saga resumes from Redis checkpoint OR compensates | Health check + auto-restart on Railway |
| Razorpay timeout during authorization | Payment unclear | Webhook reconciliation. Razorpay sends event later, we process it. | Idempotency check: if order already exists for this cart, don't create another |
| Shiprocket API down when creating shipment | Can't generate label | Order stays in "ready to ship" state. SD18 retries later from admin. | Alert SD18 via WhatsApp: "Shipping service down, orders queued" |
| Customer refreshes during checkout | Duplicate request | `acquireLockStep` prevents concurrent completions. Second request waits for lock, then sees order already exists (idempotency). | Nothing extra needed |
| Railway PostgreSQL goes down | All operations fail | Store shows static cached pages. Cart/checkout unavailable. | Vercel ISR caches product pages. Customer can browse, not buy. Alert us immediately. |
| Double-click "Place Order" | Potential duplicate order | Lock + idempotency. First request creates order. Second request finds existing order, returns it. | Nothing extra needed |
| Payment captured but order creation fails | Money taken, no order | Compensation refunds the payment automatically. | Monitor for "compensation triggered" events. Alert if this happens frequently. |
| Customer's last item gets reserved by another checkout simultaneously | Oversell risk | Per-inventory-item lock. Second checkout waits, then sees no stock. Returns "out of stock" error. | Nothing extra needed |

### 8.2 Graceful Degradation Strategy

```
Full system healthy:
  ✓ Browse products
  ✓ Add to cart
  ✓ Checkout and pay
  ✓ Order tracking
  ✓ Account management

Medusa down, Vercel up (cached pages):
  ✓ Browse products (ISR cache, up to 60s stale)
  ✗ Add to cart
  ✗ Checkout
  ✗ Account
  → Show: "Store temporarily unavailable. Please try again in a few minutes."

Razorpay down:
  ✓ Everything works EXCEPT online payment
  → Show: "Online payment unavailable. Please choose Cash on Delivery."
  → COD orders proceed normally

Shiprocket down:
  ✓ Everything works. Customers can order.
  ✗ Shipping rate calculation uses fallback flat rates
  ✗ Label generation queued for when Shiprocket recovers
  → SD18 sees: "Shipping labels pending. Service will auto-retry."

Redis down:
  ✗ Sessions lost (customers logged out)
  ✗ Checkout may fail (no locking)
  → Medusa falls back to in-memory locking (single-instance safe)
  → Customers re-login and retry
```

### 8.3 Monitoring (What We Watch)

| Metric | Alert If | Action |
|--------|----------|--------|
| Medusa server response time | > 2s average | Check Railway memory/CPU |
| Checkout success rate | < 90% | Check Razorpay status, error logs |
| Payment webhooks missed | Any missed | Manually reconcile via Razorpay dashboard |
| Inventory drift | Reserved > stocked for any item | Data corruption, investigate immediately |
| Order stuck in "pending" > 1 hour | Any | Payment auth may have failed silently |
| Shiprocket label creation failures | > 3 consecutive | API down, switch to manual label |

---

## What's Next

This document continues to grow as we build. Upcoming sections:

- [ ] Level 9: Testing Strategy (unit, integration, e2e with real Razorpay sandbox)
- [ ] Level 10: Performance (caching strategy, CDN, image optimization)
- [ ] Level 11: SEO (dynamic meta, structured data, sitemaps)
- [ ] Level 12: Analytics & Reporting (what SD18 needs to see daily/weekly/monthly)
- [ ] Appendix A: Medusa CLI Commands Reference
- [ ] Appendix B: Environment Variables Map
- [ ] Appendix C: SD18 Product Catalog Import Script

---

*Last updated: 2026-06-11*
*Status: Levels 0-8 complete. Implementation begins next.*
