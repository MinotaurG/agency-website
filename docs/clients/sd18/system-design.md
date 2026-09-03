# SD18 Sports — System Design Document

> Architecture, infrastructure, data flow, failure handling, and deployment for SD18's e-commerce platform.
> Companion to [learning-guide.md](./learning-guide.md) which explains the underlying concepts.

---

## 1. System Overview

### 1.1 What We're Building

A full e-commerce platform for SD18 Sports (cricket equipment and sportswear brand, Asansol, West Bengal). The system handles:

- Product catalog with complex variants (bat sizes, polo colours × sizes)
- Cart and checkout with Indian payment methods (UPI, cards, COD)
- Shipping with multiple courier partners via a provider-agnostic interface
- Order lifecycle management (placed → shipped → delivered)
- Inventory tracking with reservation and locking
- Customer accounts (phone OTP + email)
- Admin dashboard for SD18 team to manage daily operations
- SEO-driven blog content

### 1.2 Architecture Diagram

```
                          ┌──────────────────────────────┐
                          │        INTERNET               │
                          └──────┬───────────────┬───────┘
                                 │               │
                    ┌────────────▼────┐  ┌───────▼──────────────┐
                    │     Vercel      │  │   Cloudflare DNS     │
                    │                 │  │   (sd18sports.com)   │
                    │ ┌─────────────┐ │  └───────┬──────────────┘
                    │ │  Next.js 16 │ │          │
                    │ │  Storefront │ │          │ api.sd18sports.com
                    │ │             │ │          │
                    │ │ • Product   │ │          │
                    │ │   pages     │ │          │
                    │ │ • Cart      │ │          │
                    │ │ • Checkout  │ │          │
                    │ │ • Account   │ │          │
                    │ │ • Blog      │ │          │
                    │ └──────┬──────┘ │          │
                    └────────┼────────┘          │
                             │ API calls         │
                             │                   │
                    ┌────────▼───────────────────▼──────────────────┐
                    │                                                │
                    │        Oracle Cloud — Mumbai (ap-mumbai-1)     │
                    │        VM.Standard.A1.Flex (ARM)               │
                    │        2 OCPU / 12 GB RAM / 50 GB disk        │
                    │        Always Free (PAYG upgrade)              │
                    │                                                │
                    │  ┌────────────────────────────────────────┐   │
                    │  │         Medusa v2 Server                │   │
                    │  │         (Node.js 20, port 9000)        │   │
                    │  │                                         │   │
                    │  │  ┌──────────┐ ┌──────────┐ ┌────────┐ │   │
                    │  │  │ Product  │ │  Order   │ │Payment │ │   │
                    │  │  │ Module   │ │  Module  │ │Module  │ │   │
                    │  │  └──────────┘ └──────────┘ └────────┘ │   │
                    │  │  ┌──────────┐ ┌──────────┐ ┌────────┐ │   │
                    │  │  │Inventory │ │Shipping  │ │Customer│ │   │
                    │  │  │ Module   │ │Provider  │ │ Auth   │ │   │
                    │  │  └──────────┘ └──────────┘ └────────┘ │   │
                    │  │  ┌──────────────────────────────────┐  │   │
                    │  │  │  Workflow Engine (Sagas)          │  │   │
                    │  │  └──────────────────────────────────┘  │   │
                    │  └────────────────────────────────────────┘   │
                    │                                                │
                    │  ┌────────────────┐  ┌─────────────────────┐  │
                    │  │  PostgreSQL 16 │  │  Redis 7            │  │
                    │  │  port 5432     │  │  port 6379          │  │
                    │  │  (localhost)   │  │  (localhost)         │  │
                    │  └────────────────┘  └─────────────────────┘  │
                    │                                                │
                    └────────────────────────────────────────────────┘

External Services:
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────┐ ┌────────┐
│  Razorpay    │ │  Shiprocket  │ │  Cloudinary  │ │  Resend  │ │ MSG91  │
│  (payments)  │ │  (shipping)  │ │  (images)    │ │  (email) │ │ (OTP)  │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────┘ └────────┘

Blog CMS:
┌──────────────┐
│  Sanity.io   │
│  (blog only) │
└──────────────┘
```

### 1.3 Request Latency Budget

All API calls (cart, checkout, product data) hit Medusa on Oracle Mumbai.

| Hop | Latency |
|-----|---------|
| Customer (India) → Oracle Mumbai | 10-30ms |
| Medusa → PostgreSQL (localhost) | <1ms |
| Medusa → Redis (localhost) | <1ms |
| Medusa → Razorpay API | 50-100ms |
| Medusa → Shiprocket API | 50-150ms |
| **Total (typical API response)** | **30-80ms** |
| **Checkout (payment + shipping)** | **200-400ms** |

Compare: Railway (US) would add 200ms per hop. Oracle Mumbai gives us a sub-100ms API for most operations.

---

## 2. Infrastructure

### 2.1 Oracle Cloud Instance

| Spec | Value |
|------|-------|
| Shape | VM.Standard.A1.Flex (ARM Ampere) |
| Region | ap-mumbai-1 |
| OCPU | 2 |
| RAM | 12 GB |
| Boot Volume | 50 GB (gp3 equivalent) |
| OS | Ubuntu 24.04 LTS (ARM) |
| Network | 1 Gbps per OCPU |
| Cost | $0 (Always Free, PAYG account) |

**RAM Allocation:**

```
Total:           12,288 MB
─────────────────────────
Medusa (Node.js):  2,048 MB  (NODE_OPTIONS=--max-old-space-size=2048)
PostgreSQL:        2,048 MB  (shared_buffers=512MB, effective_cache=1.5GB)
Redis:               256 MB  (maxmemory 256mb)
OS + buffer:       7,936 MB  (available for spikes, file cache, pg cache)
```

This is extremely comfortable. Medusa under load peaks at ~400-800MB. Postgres with SD18's data volume (<100MB of actual data) needs far less than 2GB. The remaining 8GB acts as filesystem cache, making disk reads effectively free.

### 2.2 Networking & Security

```
Oracle VCN (Virtual Cloud Network)
├── Public Subnet (10.0.0.0/24)
│   └── Instance (public IP, static)
│
├── Security List (Ingress):
│   ├── TCP 443  from 0.0.0.0/0    (HTTPS — Medusa API + Admin)
│   ├── TCP 80   from 0.0.0.0/0    (HTTP → redirect to HTTPS)
│   ├── TCP 22   from YOUR_IP/32   (SSH — restricted to your IP)
│   └── DENY all other
│
├── Security List (Egress):
│   └── ALL to 0.0.0.0/0           (outbound: Razorpay, Shiprocket, etc.)
│
└── No access to PostgreSQL or Redis from internet (localhost only)
```

**SSL/TLS:** Let's Encrypt via Caddy (reverse proxy) or certbot + nginx. Auto-renewing.

**Firewall on instance (iptables/nftables):**
- Only ports 22, 80, 443 open
- PostgreSQL (5432) and Redis (6379) bound to 127.0.0.1 only

### 2.3 Backup Strategy

```
┌─────────────────────────────────────────────────────────────┐
│  Automated Backups (cron, every 6 hours)                     │
│                                                              │
│  1. pg_dump medusa_sd18 | gzip                              │
│     → upload to Cloudflare R2 (free 10 GB)                  │
│     → retain last 14 days (56 backups)                      │
│     → total size: ~50-200 MB (SD18's data is small)         │
│                                                              │
│  2. Redis RDB snapshot                                       │
│     → upload alongside pg dump                              │
│     → mostly for workflow state (nice to have, not critical) │
│                                                              │
│  3. Oracle boot volume backup (weekly)                       │
│     → uses 1 of 5 free backup slots                         │
│     → full disk snapshot (OS + app + data)                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Recovery scenarios:
├── "I broke the app code"        → git revert + redeploy (2 min)
├── "Database is corrupted"       → restore latest pg_dump (15 min)
├── "Instance is unresponsive"    → reboot from Oracle console (2 min)
├── "Oracle terminated my account"→ Lightsail failover (see §2.4)
└── "I need to undo yesterday"   → restore pg_dump from 24h ago (15 min)
```

### 2.4 Failover Plan

```
Normal operation:
  sd18sports.com      → Vercel (storefront)
  api.sd18sports.com  → Oracle Mumbai (Medusa)

If Oracle dies:
  1. UptimeRobot detects API down (checks every 5 min)
  2. Alert sent to your phone (push + WhatsApp)
  3. You execute failover:
     a. Start pre-configured Lightsail instance ($7/mo Mumbai)
     b. Pull latest code from GitHub
     c. Restore latest pg_dump from R2
     d. Start Medusa + Redis
     e. Update Cloudflare DNS: api.sd18sports.com → Lightsail IP
     f. DNS propagates in <60s (TTL set to 60)
  4. Store is back online. Total downtime: 15-30 minutes.

After Oracle recovery:
  1. Sync any orders placed during failover back to Oracle
  2. Point DNS back to Oracle
  3. Stop Lightsail (back to dormant, $0 if stopped)
```

**Pre-configuration:** The Lightsail instance is created once, configured with Node.js + Postgres + Redis, then stopped. It costs $0 while stopped (you only pay for the 20GB disk snapshot if any, which is pennies). It's a "break glass in emergency" server.

---

## 3. Application Architecture

### 3.1 Medusa Module Map

```
src/
├── modules/
│   ├── razorpay/               Custom payment provider
│   │   ├── service.ts          Implements AbstractPaymentProvider
│   │   └── index.ts            Module definition
│   │
│   ├── cod/                    Cash on Delivery provider
│   │   ├── service.ts          Auto-authorize, manual capture
│   │   └── index.ts
│   │
│   ├── shipping/               Provider-agnostic shipping
│   │   ├── providers/
│   │   │   ├── shiprocket.ts   Shiprocket implementation
│   │   │   ├── manual.ts       Local pickup / self-delivery
│   │   │   └── interface.ts    ShippingProvider interface
│   │   ├── service.ts          Orchestrates multiple providers
│   │   └── index.ts
│   │
│   └── phone-auth/             Phone OTP authentication
│       ├── service.ts          MSG91 OTP send/verify
│       └── index.ts
│
├── subscribers/
│   ├── order-placed.ts         → WhatsApp notify SD18 + email customer
│   ├── order-shipped.ts        → Email customer tracking link
│   ├── shipment-delivered.ts   → Auto-capture COD payment
│   └── shipment-rto.ts        → Cancel order, release inventory
│
├── workflows/
│   ├── cancel-order.ts         Release inventory + refund + notify
│   └── process-rto.ts         Handle return-to-origin
│
├── api/
│   ├── store/
│   │   ├── shipping-rates/     GET: rates by pincode
│   │   └── phone-auth/         POST: send OTP, verify OTP
│   └── webhooks/
│       ├── razorpay/           Payment confirmations
│       └── shiprocket/         Shipment status updates
│
└── medusa-config.ts            Module registration, env vars
```

### 3.2 Shipping Provider Interface

```typescript
// src/modules/shipping/providers/interface.ts

export interface ShippingProvider {
  identifier: string

  calculateRates(input: {
    origin_pincode: string
    destination_pincode: string
    weight_grams: number
    dimensions?: { length_cm: number; width_cm: number; height_cm: number }
    is_cod: boolean
    order_value_paise: number
  }): Promise<ShippingRate[]>

  createShipment(input: {
    order_id: string
    order_number: string
    items: ShipmentItem[]
    customer: { name: string; phone: string; email?: string }
    address: ShipmentAddress
    weight_grams: number
    dimensions?: { length_cm: number; width_cm: number; height_cm: number }
    payment_method: "prepaid" | "cod"
    cod_amount_paise?: number
  }): Promise<ShipmentCreated>

  cancelShipment(shipment_id: string): Promise<{ success: boolean; message?: string }>

  getTrackingInfo(awb: string): Promise<TrackingEvent[]>

  handleWebhook(payload: unknown, headers: Record<string, string>): Promise<WebhookResult>
}

export interface ShippingRate {
  provider_id: string
  courier_name: string
  service_type: "economy" | "standard" | "express" | "pickup"
  rate_paise: number
  cod_charges_paise: number
  estimated_days: { min: number; max: number }
  is_surface: boolean
}

export interface ShipmentCreated {
  provider_id: string
  shipment_id: string
  awb: string
  courier_name: string
  label_url?: string
  estimated_delivery?: Date
}

export interface TrackingEvent {
  status: "manifested" | "picked_up" | "in_transit" | "out_for_delivery" | "delivered" | "rto_initiated" | "rto_delivered" | "cancelled"
  timestamp: Date
  location?: string
  description: string
}

export interface WebhookResult {
  awb: string
  status: TrackingEvent["status"]
  timestamp: Date
  location?: string
  raw_status?: string
}
```

### 3.3 Payment Flow (Razorpay Embedded)

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Customer       │     │   Storefront     │     │   Medusa         │
│   (Browser)      │     │   (Next.js)      │     │   (Backend)      │
└────────┬─────────┘     └────────┬─────────┘     └────────┬─────────┘
         │                        │                         │
         │  1. Click "Pay Now"    │                         │
         │───────────────────────>│                         │
         │                        │  2. POST /store/carts/{id}/payment-sessions
         │                        │────────────────────────>│
         │                        │                         │──┐
         │                        │                         │  │ 3. razorpay.initiatePayment()
         │                        │                         │  │    → Creates Razorpay Order
         │                        │                         │  │    → Returns order_id + key_id
         │                        │                         │<─┘
         │                        │  4. Return payment session data
         │                        │<────────────────────────│
         │  5. Open Razorpay modal│                         │
         │  (checkout.js with     │                         │
         │   order_id + key)      │                         │
         │<───────────────────────│                         │
         │                        │                         │
         │  6. Customer pays      │                         │
         │  (UPI / card / wallet) │                         │
         │                        │                         │
         │  7. Modal returns:     │                         │
         │  payment_id + signature│                         │
         │───────────────────────>│                         │
         │                        │  8. POST /store/carts/{id}/complete
         │                        │     body: { payment_id, signature }
         │                        │────────────────────────>│
         │                        │                         │──┐
         │                        │                         │  │ 9. completeCartWorkflow:
         │                        │                         │  │    → Lock cart
         │                        │                         │  │    → Validate items
         │                        │                         │  │    → Create order
         │                        │                         │  │    → Reserve inventory
         │                        │                         │  │    → Verify Razorpay signature
         │                        │                         │  │    → Record transaction
         │                        │                         │  │    → Release lock
         │                        │                         │<─┘
         │                        │  10. Return { order_id }│
         │                        │<────────────────────────│
         │  11. Redirect to       │                         │
         │  /order-confirmation   │                         │
         │<───────────────────────│                         │
         │                        │                         │
         │                        │     (async) 12. Emit order.placed event
         │                        │                         │──→ Send confirmation email
         │                        │                         │──→ WhatsApp notify SD18 team
```

### 3.4 COD Flow

```
Customer selects "Cash on Delivery" at checkout:

1. COD module: authorizePayment() → returns status: "authorized" (no money moves)
2. Checkout saga continues normally (create order, reserve inventory)
3. Order status: COMPLETED (ready to fulfill)
4. SD18 ships order via Shiprocket
5. Courier delivers. Customer pays cash.
6. Shiprocket webhook fires: status = "delivered"
7. Our subscriber: shipment-delivered.ts
   → Checks payment_method: if "cod" → capturePayment()
   → Marks payment as captured
   → Records transaction on order
8. If customer REFUSES delivery:
   → Shiprocket webhook: status = "rto_initiated"
   → Our subscriber: shipment-rto.ts
     → Cancel order
     → Release inventory
     → No refund needed (no money was collected)

COD Rules (enforced at checkout validation):
├── Order total must be ≤ ₹1,500
├── +₹50 COD fee added to order total
├── Customer must be phone-verified (OTP)
└── Max 2 pending COD orders per customer (anti-abuse)
```

### 3.5 Customer Authentication

```
┌─────────────────────────────────────────────────┐
│           Authentication Paths                    │
├─────────────────────────────────────────────────┤
│                                                  │
│  Path A: Phone OTP (Primary for India)           │
│  ─────────────────────────────────────           │
│  1. Customer enters: +91 9876543210              │
│  2. Backend → MSG91 API: send OTP               │
│  3. Customer enters 6-digit code                 │
│  4. Backend → MSG91 API: verify OTP             │
│  5. If new: create customer (phone as identifier)│
│  6. If existing: fetch customer                  │
│  7. Return JWT (session token)                   │
│                                                  │
│  Path B: Email + Password (Secondary)            │
│  ─────────────────────────────────────           │
│  1. Customer enters email + password             │
│  2. Medusa's built-in email auth handles it      │
│  3. Return JWT                                   │
│                                                  │
│  Path C: Guest Checkout (No Login)               │
│  ──────────────────────────────────              │
│  1. Customer provides: name, phone, email, addr  │
│  2. Order created without customer account       │
│  3. Post-purchase: "Create account?" → OTP       │
│  4. Links order to new account                   │
│                                                  │
│  Account Linking:                                 │
│  ────────────────                                │
│  Same phone OR same email → same customer record │
│  If conflict: prompt to merge ("Is this you?")   │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

## 4. Data Flow Diagrams

### 4.1 Product Browsing (Read Path)

```
Customer visits sd18sports.com/shop/bats

1. Vercel serves cached page (ISR, revalidates every 60s)
   └── If cache fresh: return immediately (0ms API call)
   └── If stale: background revalidation triggers:

2. Next.js server component calls Medusa:
   GET api.sd18sports.com/store/products?category_id=cat_bats&limit=20

3. Medusa queries PostgreSQL:
   SELECT * FROM products
   JOIN variants ON variants.product_id = products.id
   WHERE category_id = 'cat_bats' AND status = 'published'
   ORDER BY created_at DESC LIMIT 20

4. Returns product list with variants, prices, images (Cloudinary URLs)

5. Next.js renders page, Vercel caches for next visitor
```

**Key point:** Most product browsing never hits Medusa directly. Vercel's ISR cache serves stale-while-revalidate pages. Only cart/checkout/account operations require real-time API calls.

### 4.2 Order Lifecycle (Complete Flow)

```
┌─────────────┐   ┌─────────────┐   ┌─────────────────┐   ┌───────────────┐
│  Customer   │   │  Storefront │   │    Medusa       │   │  External     │
│             │   │  (Next.js)  │   │    (Backend)    │   │  Services     │
└──────┬──────┘   └──────┬──────┘   └────────┬────────┘   └───────┬───────┘
       │                  │                    │                     │
       │ Browse + Add     │                    │                     │
       │ to cart          │                    │                     │
       │─────────────────>│  POST /cart/items  │                     │
       │                  │───────────────────>│ Add line item       │
       │                  │<───────────────────│ Return updated cart │
       │                  │                    │                     │
       │ Enter pincode    │                    │                     │
       │─────────────────>│ GET /shipping-rates│                     │
       │                  │───────────────────>│                     │
       │                  │                    │── calculateRates ──>│ Shiprocket
       │                  │                    │<── rates[] ─────────│
       │                  │<───────────────────│                     │
       │ Select shipping  │                    │                     │
       │                  │                    │                     │
       │ Pay (Razorpay)   │                    │                     │
       │─────────────────>│ complete cart      │                     │
       │                  │───────────────────>│                     │
       │                  │                    │── verify signature─>│ Razorpay
       │                  │                    │<── valid ───────────│
       │                  │                    │                     │
       │                  │                    │ CREATE ORDER        │
       │                  │                    │ RESERVE INVENTORY   │
       │                  │                    │ RECORD PAYMENT      │
       │                  │                    │                     │
       │                  │                    │── order.placed ────>│ Resend (email)
       │                  │                    │── order.placed ────>│ WhatsApp (SD18)
       │                  │<───────────────────│                     │
       │ Order confirmed  │                    │                     │
       │<─────────────────│                    │                     │
       │                  │                    │                     │
       │ ─── ASYNC (SD18 admin action) ───     │                     │
       │                  │                    │                     │
       │                  │  SD18: "Create     │                     │
       │                  │   Fulfillment"     │                     │
       │                  │───────────────────>│                     │
       │                  │                    │── createShipment ──>│ Shiprocket
       │                  │                    │<── AWB + label ─────│
       │                  │                    │                     │
       │                  │                    │── order.shipped ───>│ Resend (email)
       │                  │                    │                     │
       │ ─── ASYNC (Shiprocket webhooks) ───   │                     │
       │                  │                    │                     │
       │                  │                    │<── webhook: delivered│ Shiprocket
       │                  │                    │                     │
       │                  │                    │ If COD: capture     │
       │                  │                    │ Mark fulfilled      │
       │                  │                    │                     │
       │ Delivery         │                    │── delivered email ─>│ Resend
       │ notification     │                    │                     │
       │<─────────────────│                    │                     │
```

---

## 5. Shipping System (Full Depth)

### 5.1 Multi-Provider Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                  Shipping Service                                │
│                                                                  │
│  Input: { origin_pin, dest_pin, weight, cod, value }            │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  for each activeProvider:                                 │   │
│  │    rates.push(...await provider.calculateRates(input))    │   │
│  │  return rates.sort(by: price)                             │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Active Providers:                                               │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │   Shiprocket     │  │   Manual         │                    │
│  │                  │  │                  │                    │
│  │ • 15+ couriers   │  │ • Local pickup   │                    │
│  │ • Rate API       │  │ • Self-delivery  │                    │
│  │ • Auto AWB       │  │ • ₹0 shipping    │                    │
│  │ • Tracking       │  │ • Manual status  │                    │
│  │ • NDR handling   │  │ • No tracking    │                    │
│  │ • Returns/RTO    │  │                  │                    │
│  └──────────────────┘  └──────────────────┘                    │
│                                                                  │
│  Future:                                                         │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │  Delhivery       │  │  iThink          │                    │
│  │  (Direct API)    │  │  Logistics       │                    │
│  └──────────────────┘  └──────────────────┘                    │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

### 5.2 Shiprocket Integration (Full)

| Capability | API Used | When |
|-----------|----------|------|
| Rate calculation | `POST /courier/serviceability` | Checkout: customer enters pincode |
| Create shipment | `POST /orders/create/adhoc` | Admin clicks "Create Fulfillment" |
| Generate label | `POST /courier/generate/label` | After shipment created |
| Cancel shipment | `POST /orders/cancel` | Before pickup |
| Track shipment | `GET /courier/track/awb/{awb}` | Order detail page |
| Webhook: status update | Incoming POST to our endpoint | Continuous |
| Return/RTO | `POST /orders/create/return` | When customer requests return |
| NDR action | `POST /ndr/action` | When delivery attempt fails |

### 5.3 NDR (Non-Delivery Report) Handling

```
Courier attempts delivery → fails → Shiprocket webhook: "ndr"
  │
  ▼
Our webhook handler:
  1. Parse NDR reason:
     ├── "customer_unavailable" → retry next day (auto-action via Shiprocket)
     ├── "address_incorrect"   → notify customer: "please update address"
     ├── "customer_refused"    → initiate RTO
     └── "phone_unreachable"   → retry + notify via WhatsApp
  
  2. Notify SD18 admin via WhatsApp:
     "⚠️ Delivery failed for Order #SD18-0612-003
      Reason: Customer unavailable
      Action: Auto-retry scheduled for tomorrow"

  3. If 3 consecutive failures → auto-RTO:
     → Cancel order
     → Release inventory (when RTO arrives back)
     → If prepaid: initiate refund
     → If COD: no refund needed
```

### 5.4 Local Pickup / Self-Delivery (Manual Provider)

```
When customer pincode is within 10km of SD18 (713301):
  │
  ├── Show "Free Store Pickup (Same Day)" option
  │   → Rate: ₹0
  │   → No shipment creation
  │   → Admin marks "Ready for Pickup"
  │   → Customer collects from shop
  │   → Admin marks "Delivered" manually
  │
  └── Show "Local Delivery (₹30, Next Day)" option
      → Rate: ₹30 (SD18's own delivery person)
      → No courier API
      → Admin assigns to their delivery person
      → Admin marks "Delivered" when confirmed
```

---

## 6. Domain & DNS

### 6.1 DNS Configuration (Cloudflare)

```
sd18sports.com          A       → Vercel (76.76.21.21)
www.sd18sports.com      CNAME   → sd18sports.com
api.sd18sports.com      A       → Oracle Mumbai IP (static)
                        TTL: 60s (fast failover)
```

**Why Cloudflare (free tier):**
- DNS propagation is instant (they're the nameserver)
- DDoS protection on the API endpoint
- SSL termination (orange cloud proxy) if needed
- Analytics on DNS queries
- Easy TTL control for failover

### 6.2 SSL Certificates

| Domain | SSL Provider | How |
|--------|-------------|-----|
| sd18sports.com | Vercel (auto) | Managed by Vercel, zero config |
| api.sd18sports.com | Let's Encrypt via Caddy | Auto-renewing, HTTPS termination on Oracle |

**Caddy config on Oracle instance:**

```
api.sd18sports.com {
    reverse_proxy localhost:9000
}
```

That's it. Caddy auto-provisions and renews Let's Encrypt certificates.

---

## 7. Monitoring & Alerting

### 7.1 Health Checks

| What | Tool | Frequency | Alert |
|------|------|-----------|-------|
| API responding | UptimeRobot | Every 5 min | WhatsApp + email |
| API response time > 2s | UptimeRobot | Every 5 min | Email |
| SSL certificate expiry < 7 days | UptimeRobot | Daily | Email |
| Disk usage > 80% | Cron script | Every 6 hours | WhatsApp |
| PostgreSQL connection count > 80 | Cron script | Every hour | Log |
| Medusa process crashed | pm2 | Continuous | Auto-restart + log |

### 7.2 Application Monitoring

```
pm2 (process manager)
├── Medusa server: auto-restart on crash, log rotation
├── Memory limit: restart if > 2.5 GB (leak protection)
└── Logs: /var/log/medusa/app.log (last 7 days retained)

PostgreSQL:
├── pg_stat_statements: slow query tracking
├── Log queries > 1000ms
└── Connection pool: max 20 (Medusa's default)

Alerts we care about (early stage):
├── ANY 500 error on checkout endpoint → investigate immediately
├── Payment webhook failure → manual reconciliation needed
├── Inventory negative → data corruption, freeze sales on that item
└── Order stuck in "pending" > 1 hour → payment may have failed silently
```

---

## 8. Security

### 8.1 Access Control Matrix

| Actor | Access | Authentication |
|-------|--------|---------------|
| Customer (browse) | Products, collections, blog | None (public) |
| Customer (buy) | Cart, checkout, order history | JWT (phone OTP or email) |
| Guest (buy) | Cart, checkout | Session cookie (no account) |
| SD18 Admin | All Medusa admin operations | Email + password (Medusa auth) |
| Razorpay webhook | Payment confirmation endpoint | HMAC signature verification |
| Shiprocket webhook | Shipment status endpoint | Token-based auth header |
| Developer (us) | SSH, database, full access | SSH key (restricted IP) |

### 8.2 API Security

```
Storefront → Medusa:
├── Publishable API key (identifies the storefront, not secret)
├── JWT bearer token (for authenticated customer operations)
├── Rate limiting: 100 requests/minute per IP (cart/checkout)
└── CORS: only sd18sports.com allowed

Webhooks → Medusa:
├── Razorpay: HMAC-SHA256 signature verification (webhook secret)
├── Shiprocket: Bearer token in Authorization header
└── Both: IP allowlist if provider publishes their webhook IPs

Admin dashboard:
├── Email + password authentication
├── Session-based with httpOnly cookies
└── Optional: restrict admin access to SD18's office IP range
```

### 8.3 Secrets Management

All secrets stored as environment variables on the Oracle instance:

```bash
# /etc/medusa/.env (chmod 600, owned by medusa user)

# Database
DATABASE_URL=postgresql://medusa:***@localhost:5432/medusa_sd18

# Redis  
REDIS_URL=redis://localhost:6379

# Razorpay
RAZORPAY_KEY_ID=rzp_live_***
RAZORPAY_KEY_SECRET=***
RAZORPAY_WEBHOOK_SECRET=***

# Shiprocket
SHIPROCKET_EMAIL=sd18@elevatestrategy.co.in
SHIPROCKET_PASSWORD=***
SHIPROCKET_WEBHOOK_TOKEN=***

# MSG91
MSG91_AUTH_KEY=***
MSG91_TEMPLATE_ID=***

# Resend (email)
RESEND_API_KEY=re_***

# Medusa
MEDUSA_ADMIN_CORS=https://api.sd18sports.com
STORE_CORS=https://sd18sports.com
JWT_SECRET=***
COOKIE_SECRET=***
```

---

## 9. Performance Strategy

### 9.1 Caching Layers

```
Layer 1: Vercel Edge (CDN)
├── Product pages: ISR with 60s revalidation
├── Category pages: ISR with 60s revalidation
├── Blog pages: ISR with 3600s (1 hour)
├── Static assets: immutable cache
└── Result: most browsing traffic never hits Medusa

Layer 2: Redis (on Medusa server)
├── Session data: customer JWT sessions
├── Cart data: frequently accessed during checkout
├── Workflow state: saga checkpoints
└── Locks: inventory and cart locks (short-lived)

Layer 3: PostgreSQL (query-level)
├── effective_cache_size = 1.5 GB (OS page cache)
├── shared_buffers = 512 MB
├── Indexes on hot paths:
│   ├── products(status, category_id, created_at)
│   ├── variants(product_id, inventory_quantity)
│   ├── orders(customer_id, created_at DESC)
│   └── orders(status) WHERE status NOT IN ('delivered','cancelled')
└── Connection pool: 20 connections (pgBouncer if needed later)

Layer 4: Cloudinary (image CDN)
├── Product images served from Cloudinary edge
├── Auto WebP/AVIF format conversion
├── Responsive transforms: w_400, w_800, w_1200
└── Cache: immutable (versioned URLs)
```

### 9.2 Checkout Optimization

Checkout is the most latency-sensitive flow. Optimizations:

| Step | Optimization |
|------|-------------|
| Shipping rate lookup | Cache rates by (origin_pin, dest_pin, weight_bracket) for 15 minutes. Same pincode = same rates. |
| Payment session creation | Pre-create Razorpay order when customer enters payment step (before they click "Pay"). Removes one round-trip from the critical path. |
| Inventory check | Hot path query uses partial index on available items only. Sub-1ms. |
| Order creation | Single transaction: create order + line items + link cart in one DB round-trip. |

---

## 10. Deployment Pipeline

### 10.1 Deploy Flow

```
Developer pushes to main branch (GitHub)
  │
  ▼
GitHub Actions workflow triggers:
  │
  ├── Job 1: Deploy Storefront (Vercel)
  │   └── Automatic (Vercel's GitHub integration)
  │       Build + deploy in ~60s
  │
  └── Job 2: Deploy Medusa (Oracle)
      ├── SSH into Oracle instance
      ├── cd /app/medusa && git pull origin main
      ├── pnpm install (if lockfile changed)
      ├── pnpm medusa db:migrate (if migrations exist)
      ├── pm2 restart medusa
      └── Health check: curl https://api.sd18sports.com/health
          ├── If 200: deploy success
          └── If fail: pm2 restart medusa --previous (rollback)
```

### 10.2 Local Development

```bash
# Clone and setup
git clone git@github.com:elevatestrategy/sd18-store.git
cd sd18-store

# Start backend (Docker Compose)
docker compose up -d postgres redis
pnpm install
pnpm medusa db:migrate
pnpm medusa seed     # loads sample products
pnpm medusa develop  # starts server on :9000

# Start storefront (separate terminal)
cd storefront
pnpm install
pnpm dev             # starts Next.js on :8000
```

**Docker Compose for local dev:**

```yaml
services:
  postgres:
    image: postgres:16
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: medusa_sd18
      POSTGRES_USER: medusa
      POSTGRES_PASSWORD: medusa
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

volumes:
  pgdata:
```

---

## 11. Cost Summary

### 11.1 Monthly Operating Cost

| Service | Cost | Notes |
|---------|------|-------|
| Oracle Cloud (compute) | $0 | Always Free, PAYG account |
| Oracle Block Storage (50 GB) | $0 | Included in free tier |
| Vercel (storefront) | $0 | Free tier (100 GB bandwidth) |
| Cloudflare (DNS) | $0 | Free tier |
| Cloudinary (images) | $0 | Free tier (25 GB) |
| Sanity (blog CMS) | $0 | Free tier (100K API calls) |
| Resend (email) | $0 | Free tier (100 emails/day) |
| MSG91 (OTP) | $0 | Free tier (1,000 SMS/month) |
| UptimeRobot (monitoring) | $0 | Free tier (50 monitors) |
| Cloudflare R2 (backups) | $0 | Free tier (10 GB) |
| Razorpay | 2% per transaction | No monthly fee |
| Shiprocket | Per-shipment | Depends on courier rates |
| **Total fixed cost** | **$0/month** | |
| **Variable cost** | **~2% of revenue + shipping** | |

### 11.2 When Costs Appear

| Trigger | Service | Cost |
|---------|---------|------|
| >100 emails/day | Resend | $20/month |
| >1,000 OTPs/month | MSG91 | ₹0.20/SMS |
| >100 GB image bandwidth | Cloudinary | $89/month (unlikely) |
| Oracle reclaimed (failover) | Lightsail | $7/month (temporary) |
| >100 GB storefront bandwidth | Vercel | $20/month |

**Realistic scenario:** SD18 doing 20 orders/day (₹4 lakh/month revenue) would cost:
- Razorpay: ~₹8,000/month (2% of revenue)
- MSG91: ~₹100/month (500 OTPs)
- Everything else: $0
- **Total platform cost: ₹8,100/month (~$97)**
- **As % of revenue: 2%** (just payment processing, effectively)

---

## 12. Future Considerations

### 12.1 Multi-Channel Inventory (Amazon + Flipkart + Website)

```
Phase 1 (Now): Manual allocation
├── 20 bats allocated to Amazon
├── 10 bats allocated to website
└── SD18 manages this manually

Phase 2 (Later): Medusa as master
├── All inventory tracked in Medusa
├── Subscriber: on inventory change → push to Amazon SP-API
├── Subscriber: on inventory change → push to Flipkart Seller API
├── Webhook: Amazon sale → decrement in Medusa
└── Single source of truth, real-time sync
```

### 12.2 Scaling Beyond Free Tier

If SD18 grows to 100+ orders/day and the Oracle free instance feels tight:

```
Option A: Vertical scale on Oracle
  → Use full 4 OCPU / 24 GB (still free)
  → Separate Postgres to its own Oracle instance (use second micro)

Option B: Move to Lightsail
  → $12/month (2 GB) for Medusa
  → $15/month for managed Postgres
  → Total: $27/month for production-grade managed infra

Option C: Stay free, add caching layer
  → Vercel ISR handles 90% of reads
  → Redis caches product catalog (refreshes every 60s)
  → Medusa only hit for writes (cart, checkout, account)
  → Free tier handles 1000+ daily visitors easily
```

---

*Document version: 1.0*
*Created: 2026-06-12*
*Last updated: 2026-06-12*
