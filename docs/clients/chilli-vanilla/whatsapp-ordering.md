# WhatsApp Ordering Flow

## Why WhatsApp?

- 95%+ smartphone users in Hazaribagh have WhatsApp
- No app download friction for first-time users
- Familiar interface, zero learning curve
- Can serve as gateway to app adoption ("Order faster next time, download our app")

## How It Works

### Option A: WhatsApp Catalog + Bot (Recommended)

**Customer experience:**
1. Customer messages the restaurant's WhatsApp Business number
2. Bot replies with a greeting and menu link (WhatsApp Catalog or web menu link)
3. Customer browses menu, adds items via catalog or by typing
4. Bot confirms order: items, total, delivery address
5. Customer confirms and chooses payment (COD or UPI link)
6. Order pushed to kitchen dashboard (same system as app orders)
7. Customer gets status updates via WhatsApp: "Preparing" > "Out for delivery" > "Delivered"

**Tech stack:**
- WhatsApp Business API (via provider: Twilio, Gupshup, or WATI)
- Chatbot flow engine (keyword-based + button-based)
- Shared backend with the main app (one order system)

### Option B: Simple WhatsApp Link (MVP)

- Customer clicks a pre-filled WhatsApp link with menu PDF
- Types their order manually
- Staff enters it into dashboard manually
- Less automated but zero build cost

### Recommended: Start with Option A (Gupshup/WATI)

WATI pricing: ~Rs 2,500/month for small business tier (unlimited agents, 1000 conversations/month included). Gupshup is usage-based, cheaper at low volume.

## Flow Diagram

```
Customer                    WhatsApp Bot                  Backend
   |                            |                           |
   |-- "Hi" ------------------>|                           |
   |<-- Welcome + Menu --------|                           |
   |-- Selects items --------->|                           |
   |<-- Order summary ---------|                           |
   |-- "Confirm" ------------->|                           |
   |                           |-- Create order ---------->|
   |                           |<-- Order ID + ETA --------|
   |<-- "Order #123, 30 min" --|                           |
   |                           |                           |
   |   ... (kitchen prepares) ...                          |
   |                           |                           |
   |<-- "Out for delivery" ----|<-- Status webhook --------|
   |<-- "Delivered!" ----------|<-- Status webhook --------|
```

## WhatsApp vs App: When to Use Each

| Scenario | Channel |
|----------|---------|
| First-time or infrequent customer | WhatsApp |
| Repeat customer (3+ orders) | Nudge to app |
| Complex order (customizations) | App |
| Quick reorder | App (one-tap reorder) |
| Older demographic | WhatsApp |
| Pre-order/scheduled | App |

## Integration Points

- Both WhatsApp and App orders land in the SAME kitchen dashboard
- Same delivery staff assignment system
- Same order tracking (customer gets WhatsApp updates regardless of order source)
- Loyalty points accrue for WhatsApp orders too (linked by phone number)
