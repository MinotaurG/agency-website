# System Design

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENTS                             │
├──────────────┬──────────────┬───────────────────────────┤
│ Customer App │ Delivery App │ Kitchen/Admin Dashboard    │
│ (PWA/Native) │ (Mobile)     │ (Web - Tablet/Desktop)    │
└──────┬───────┴──────┬───────┴────────────┬──────────────┘
       │              │                    │
       └──────────────┼────────────────────┘
                      │
              ┌───────▼────────┐
              │   API Layer    │
              │  (Next.js API  │
              │   Routes)      │
              └───────┬────────┘
                      │
       ┌──────────────┼──────────────────┐
       │              │                  │
┌──────▼──────┐ ┌────▼─────┐  ┌────────▼────────┐
│  Supabase   │ │ WhatsApp │  │  Payment        │
│  (DB + Auth │ │ API      │  │  (Razorpay)     │
│  + Realtime │ │ (WATI/   │  │                 │
│  + Storage) │ │ Gupshup) │  │                 │
└─────────────┘ └──────────┘  └─────────────────┘
```

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Customer App | React Native (Expo) OR PWA (Next.js) | Cross-platform, fast iteration |
| Delivery App | React Native (Expo) | Needs background location, push notifications |
| Admin Dashboard | Next.js (web) | Tablet-friendly, no app store needed |
| API | Next.js API Routes / tRPC | Type-safe, co-located with dashboard |
| Database | Supabase (Postgres) | Auth, realtime subscriptions, row-level security |
| Realtime | Supabase Realtime | Order status updates, kitchen notifications |
| Payments | Razorpay | UPI, cards, wallets. Best for India |
| WhatsApp | WATI or Gupshup | Business API, chatbot flows |
| Push Notifications | Firebase Cloud Messaging | Free, reliable |
| Maps/Routing | Google Maps API | Delivery tracking, address autocomplete |
| Hosting | Vercel (web) + Supabase (backend) | Free/cheap at this scale |
| File Storage | Supabase Storage or Cloudinary | Menu images, banquet photos |

## Data Models (Core)

### Restaurant
```
restaurants
├── id (uuid)
├── name
├── slug
├── address, city, state, pin
├── phone
├── logo_url
├── cover_image_url
├── delivery_radius_km
├── min_order_amount
├── is_open (boolean)
├── opening_hours (jsonb)
├── settings (jsonb) - colors, features enabled
└── created_at
```

### Menu
```
menu_categories
├── id
├── restaurant_id (FK)
├── name
├── sort_order
└── is_active

menu_items
├── id
├── category_id (FK)
├── restaurant_id (FK)
├── name
├── description
├── price
├── image_url
├── is_veg (boolean)
├── is_available (boolean)
├── variants (jsonb) - [{name: "Half", price: 120}, {name: "Full", price: 200}]
├── addons (jsonb) - [{name: "Extra Cheese", price: 30}]
└── sort_order
```

### Orders
```
orders
├── id
├── restaurant_id (FK)
├── customer_id (FK)
├── delivery_staff_id (FK, nullable)
├── order_number (sequential per restaurant)
├── status (enum: placed, confirmed, preparing, ready, picked_up, delivered, cancelled)
├── items (jsonb) - snapshot of ordered items with prices
├── subtotal
├── delivery_fee
├── discount
├── total
├── payment_method (cod, online)
├── payment_status (pending, paid, refunded)
├── delivery_address (jsonb)
├── scheduled_for (timestamp, nullable)
├── notes
├── source (app, whatsapp)
├── placed_at
├── confirmed_at
├── prepared_at
├── delivered_at
└── cancelled_at, cancel_reason
```

### Customers
```
customers
├── id
├── phone (unique, primary identifier)
├── name
├── email (optional)
├── addresses (jsonb array)
├── loyalty_points
├── total_orders
├── total_spent
└── created_at
```

### Delivery Staff
```
delivery_staff
├── id
├── restaurant_id (FK)
├── name
├── phone
├── is_active (boolean)
├── is_available (boolean)
├── current_order_id (FK, nullable)
└── created_at
```

### Offers & Loyalty
```
offers
├── id
├── restaurant_id (FK)
├── title
├── type (percentage, flat, freebie, free_delivery)
├── value
├── min_order_amount
├── max_discount
├── code (nullable, for coupon-based)
├── auto_apply (boolean)
├── valid_from
├── valid_until
├── usage_limit
├── used_count
└── is_active

loyalty_transactions
├── id
├── customer_id (FK)
├── order_id (FK)
├── points (positive = earned, negative = redeemed)
├── description
└── created_at
```

## Key Flows

### 1. Order Placement (Customer App)
1. Customer browses menu, adds items to cart
2. Applies offer/coupon if available
3. Selects delivery address (saved or new)
4. Chooses payment: COD or Pay Online
5. Places order -> POST /api/orders
6. Backend validates, creates order (status: placed)
7. Supabase Realtime pushes to kitchen dashboard
8. Kitchen sees new order notification (sound alert)

### 2. Order Fulfillment (Kitchen)
1. Kitchen dashboard shows new order card
2. Staff accepts order (status: confirmed, sets prep time)
3. Customer notified: "Order confirmed, ready in 25 min"
4. Kitchen marks ready (status: ready)
5. Owner/manager assigns delivery staff
6. Delivery staff app shows new assignment

### 3. Delivery Flow
1. Delivery staff sees order: items, address, map
2. Taps "Picked up" (status: picked_up)
3. Customer sees live: "Out for delivery"
4. Staff reaches, taps "Delivered" (status: delivered)
5. If COD: marks payment collected
6. Customer can rate the order

### 4. WhatsApp Order
1. Same backend flow, but order created via WhatsApp bot webhook
2. Status updates sent as WhatsApp messages instead of push notifications
3. Customer linked by phone number (same loyalty, same history)

## Realtime Architecture

Using Supabase Realtime subscriptions:

- **Kitchen Dashboard** subscribes to: new orders, order status changes
- **Customer App** subscribes to: their order's status changes
- **Delivery App** subscribes to: assignments for their staff_id

This means:
- No polling
- Instant notifications
- Status changes propagate to all clients in <1 second

## Security Considerations

- Phone OTP auth (no passwords) via Supabase Auth
- Row-level security: customers see only their orders, staff see only their restaurant
- Rate limiting on order placement
- Address validation (within delivery radius)
- Payment verification webhook from Razorpay before confirming online orders

## Scalability Notes (for multi-client reuse)

- All queries filtered by restaurant_id
- Supabase RLS policies enforce tenant isolation
- Each client gets their own subdomain or custom domain
- Shared infrastructure, isolated data
- Admin super-dashboard (for us) to manage all restaurants
