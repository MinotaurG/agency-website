# Requirements & Discovery

## Client Profile

| Field | Details |
|-------|---------|
| Restaurant | Chilli Vanilla |
| Location | Ranchi Patna Road, Opp District Court, Nagarpalika, Hazaribagh |
| Owner | [TODO: Get name] |
| Phone | +91 9560787874 |
| Current platforms | Zomato only (NOT on Swiggy). Paying ~35% commission |
| Zomato Rating | 4.2/5 (9,151 ratings) |
| Cuisine | North Indian, Chinese, South Indian, Italian |
| Hours | 9:30 AM to 12 Midnight |
| Online presence | Google Maps, Instagram, Zomato |
| WhatsApp Business | [TODO: Confirm] |
| Additional business | Banquet hall (hosts events regularly around the city) |
| Menu size | 450+ items across 22 categories (confirmed from Zomato) |
| Veg/Non-veg | Pure Vegetarian |
| Daily order volume | Estimated 50-80/day (based on 9k+ ratings) [TODO: Confirm with client] |
| FSSAI License | 11122012000068 |

## Discovery Answers

### 1. Menu & Items
- **Size:** 450+ items across 22 categories (confirmed)
- **Type:** Pure Vegetarian, Multi-cuisine
- **Categories (22):** Our Selection Of Appetizers, South Indian (75!), Fries, Sandwiches & Burgers, Small Plates, Pizza & Pasta, Steaks, Appetizers/Soups, Rolls, Maharastrian, Punjab Se, Maggie, Momos, Noodles & Chowmein, Chilli & Snacks, Kabab & Tikkas, Bagiche Se (Main Course, 104 items!), Accompaniments, Indian Breads, Paratha, Khayali Pulao (Rice/Biryani), Desserts & Beverages, Thalis
- **Signature items:** "CV Special" variants (Cigar Rolls, French Fries, Lasagna, Kulcha, Momos, Burger)
- **Daily specials?** [TODO: Ask if thali/specials change daily]
- **Design implication:** Menu is HUGE. Need excellent search, category nav, favorites, and "reorder" to avoid overwhelming users

### 2. Order Volume (Estimated)
- 9,151 Zomato ratings suggests this is THE top restaurant in Hazaribagh
- Restaurants typically get 1 rating per 5-10 orders
- **Conservative estimate: 50-80 orders/day on Zomato alone**
- Dine-in likely adds another 100-200 covers/day given their size
- [TODO: Get actual numbers from client]

### 3. Delivery Staff
- **Count:** 5-20 riders (client unsure, likely starts at 5-8)
- **Assignment model:** Manual dispatch by owner/manager initially
- **Design implication:** Build for manual assignment now, auto-dispatch as a future toggle
- Rider app needed: assigned orders, navigation, status updates, call masking

### 4. Customer Communication
- **WhatsApp ordering:** Yes (see whatsapp-ordering.md)
- **App ordering:** Yes (primary channel)
- **Notifications:** WhatsApp-first (higher open rate in tier-3), push notifications secondary

### 5. Order Scheduling
- **Live orders:** Yes (primary)
- **Pre-orders/scheduling:** Yes, as a backend option (e.g., "deliver at 1 PM")
- **Design note:** Build scheduling into the order model from day 1, even if UI is minimal initially. This makes the platform reusable for other clients (bakeries, tiffin services).

### 6. Loyalty & Offers
- **Day 1 feature** (critical for Zomato-to-app migration)
- Ideas:
  - Points per order (redeem for discounts)
  - "Order 5 times, get 1 free delivery"
  - First-order discount (acquisition)
  - Referral bonus (friend gets Rs 50 off)
  - Birthday/anniversary offers (ties into banquet cross-sell)

### 7. Multi-branch
- **Current:** Single outlet
- **Future:** Possible expansion
- **Design implication:** Keep data models tenant-aware (restaurant_id on all tables) but don't build multi-branch UI now

### 8. Budget & Timeline
- ~1 month build time
- One-time payment model (on proposal acceptance)
- [TODO: Quote amount after scoping]

### 9. Operations
- Owner/staff will manage dashboard after training
- UI must be simple, minimal text, visual-heavy (consider Hindi language option)
- [TODO: Ask if they need Hindi UI or English is fine]

### 10. Existing Presence & Adoption Strategy
- **Google Maps:** Listed (existing reviews drive trust)
- **Instagram:** Active (use for app launch promotion)
- **Banquet events:** QR codes on tables, tent cards, event menus via app
- **Adoption hooks:**
  - QR code on every table and takeaway bag
  - "Order direct, save 10%" messaging
  - First-order discount via app
  - WhatsApp broadcast to existing customer base

## Banquet Integration Opportunity

The client has a banquet hall with regular events. This opens up:
- Event menu pre-ordering through the app
- Catering inquiry form
- Photo gallery of past events
- Booking inquiry (simple form, not full booking system)
- Cross-promotion: app users get banquet discounts and vice versa

## Platform Reusability Requirements

Since this platform will be used for other restaurant clients:
- Tenant/restaurant isolation at data layer
- Configurable branding (logo, colors, name)
- Menu structure should be generic (categories > subcategories > items > variants)
- Payment gateway should be pluggable (Razorpay now, others later)
- Delivery radius configurable per restaurant
- Offer/loyalty engine should be rule-based and configurable
