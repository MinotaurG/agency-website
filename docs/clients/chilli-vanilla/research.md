# Competitive & Market Research

## Chilli Vanilla Profile (from Zomato)

| Field | Details |
|-------|---------|
| **Name** | Chilli Vanilla |
| **Address** | Ranchi Patna Road, Opposite District Court Campus, Nagarpalika, Hazaribagh Locality, Hazaribagh |
| **Phone** | +91 9560787874 |
| **Cuisine** | North Indian, Chinese, South Indian, Italian |
| **Rating (Zomato)** | 4.2 / 5 |
| **Total Ratings** | 9,151 |
| **Opening Hours** | 9:30 AM to 12 Midnight |
| **Delivery Time** | 33 min |
| **Dining Type** | Casual Dining, Fine Dining |
| **Swiggy** | Not listed |
| **Coordinates** | 23.9964, 85.3649 |
| **FSSAI License** | 11122012000068 |

### Key Observations
- 9,151 ratings is extremely high for a tier-3 city. This is clearly the most popular restaurant in Hazaribagh.
- Delivery via Zomato's "Own Fleet" model (DeliveryModeOwnFleet in structured data)
- Multi-cuisine with a massive menu (450+ items across 22 categories)
- Not on Swiggy, so Zomato is their only delivery platform partner
- Already has strong digital presence (9k+ reviews = established customer base)

---

## Full Menu Breakdown (22 Categories, 450+ items)

### Category Summary
| Category | Item Count | Type |
|----------|-----------|------|
| Our Selection Of Appetizers | 12 | Starters (fusion) |
| South Indian | 75 | Dosa, Idli, Uthpam variants |
| Fries | 8 | Snacks |
| Sandwiches And Burgers | 20 | Fast food |
| Small Plates | 1 | Mini pizzas |
| Pizza And Pasta | 42 | Italian |
| Steaks | 2 | Grilled paneer |
| Appetizers (Soups) | 12 | Soups |
| Rolls | 21 | Wraps |
| Maharastrian | 3 | Pav Bhaji etc |
| Punjab Se | 3 | Chole Bhature |
| Maggie | 8 | Instant noodles |
| Momos | 9 | Dumplings |
| Noodles And Chowmein | 12 | Chinese noodles |
| Chilli And Snacks | 47 | Indo-Chinese |
| Kabab And Tikkas | 20 | Tandoor items |
| Bagiche Se (Main Course) | 104 | North Indian gravies |
| Accompaniments | 13 | Salad, Raita, Papad |
| Indian Breads | 20 | Naan, Roti, Kulcha |
| Paratha | 7 | Stuffed breads |
| Khayali Pulao (Rice/Biryani) | 28 | Rice dishes |
| Desserts And Beverages | 9 | Sweets, ice cream, juice |
| Thalis | 7 | Combo meals |

**Total: ~450+ items**

### Top Items by Category (Likely Best-Sellers)

**Starters/Appetizers:**
- Cheese Balls, Chilly Cheese Toast, Baked Nachos, Loaded Nachos
- Peri Peri Cheese Mushroom, Peri Peri Cottage Cheese

**South Indian (Massive, 75 items):**
- Masala Dosa, Paneer Masala Dosa, Mysore Masala Dosa
- Double Cheese variants (big differentiator)
- Paper Dosa, various Uthpams

**Indo-Chinese (47 items):**
- Paneer Chilli, Veg Manchurian, Mushroom Chilli
- Dragon Paneer, American Chopsuey
- Various 65s (Paneer 65, Mushroom 65, Veg 65)

**Main Course / Bagiche Se (104 items):**
- Paneer Butter Masala, Paneer Kadhai, Dal Makhani
- Malai Kofta, Palak Paneer, Shahi Paneer
- Mushroom variants, Soya Chaap variants

**Pizza & Pasta (42 items):**
- 7-inch and 12-inch pizzas
- Multiple pasta types (Alfredo, Arrabbiata, Pink Sauce)
- CV Special Lasagna

**Rice/Biryani (28 items):**
- Veg Dum Biryani, Paneer Biryani, Hyderabadi variants
- Matka Biryani (specialty)
- Fried Rice, Pulao, Schezwan Rice

**Thalis:**
- Deluxe Thali, Supreme Thali, Chinese Combo Thali
- Employee Thali, Saver Thali, Jain Supreme Thali

### Menu Analysis for App Design

1. **Menu is huge (450+ items)** - Need robust search, filters, and category navigation
2. **Veg-only restaurant** (no non-veg items found) - Simplifies veg/non-veg filter (not needed)
3. **Heavy on customization** - Dosa section alone has 75 variants (cheese, double cheese, Mysore, rawa, paper, etc.)
4. **Price points not visible** on the saved page (Zomato hides prices in JS-rendered content)
5. **Signature items** - "CV Special" appears multiple times (Cigar Rolls, French Fries, Lasagna, Kulcha, Momos, Burger)

### Pricing (TODO)
Prices were not extracted from the HTML (rendered dynamically). Based on similar restaurants in tier-3 cities:
- Dosa: Rs 80-200
- Pizza (7"): Rs 120-250
- Main Course: Rs 150-300
- Thali: Rs 150-350
- Biryani: Rs 150-250
- Momos: Rs 80-150
- Rolls: Rs 80-150
- Burgers: Rs 100-200

[TODO: Get actual prices from client or screenshot of menu with prices]

---

## Market Context

### Hazaribagh Food Delivery Market
- Tier-3 city, Jharkhand, population ~150,000 (urban)
- Zomato operates here (Swiggy may have limited or no presence)
- Typical delivery radius: 5-7 km (compact city)
- Average order value (tier-3 estimate): Rs 250-400
- Popular cuisines: North Indian, Chinese, Fast Food, Biryani, South Indian

### Commission Structure (Zomato)
- Standard commission: 18-25% (varies by contract)
- Client reports: ~35% (likely includes GST on commission + payment gateway charges)
- Breakdown estimate:
  - Platform commission: 22-25%
  - GST on commission: 18% of 25% = ~4.5%
  - Payment gateway: 2%
  - Packaging charges sometimes absorbed
  - Effective take: restaurant keeps only 60-65% of order value

### Direct Ordering Economics
- If customer pays Rs 300:
  - Via Zomato: Restaurant gets ~Rs 195 (after 35% cut)
  - Via own app: Restaurant gets ~Rs 288 (only payment gateway 2% + hosting)
  - **Savings per order: ~Rs 93**
  - At 40 orders/day: Rs 3,720/day saved = Rs 1,11,600/month
  - At 60 orders/day (likely for 9k+ rated restaurant): Rs 5,580/day = Rs 1,67,400/month

### Chilli Vanilla Specific Economics
With 9,151 ratings, this is almost certainly doing 50-80+ delivery orders/day on Zomato alone (restaurants typically get 1 rating per 5-10 orders). Conservative estimate:
- **Daily orders (Zomato):** 50-80
- **Average order value:** Rs 300-400 (multi-cuisine, thalis available)
- **Monthly Zomato revenue:** Rs 4.5L-9.6L
- **Monthly commission to Zomato (35%):** Rs 1.57L-3.36L
- **This is the money we're helping them keep.**

---

## Competitive Landscape (Hazaribagh)

### Positioning
Chilli Vanilla is clearly the dominant restaurant in Hazaribagh based on:
- 9,151 ratings (extremely high for a tier-3 city)
- 4.2 rating (good for a high-volume restaurant)
- Multi-cuisine (covers every craving)
- Casual + Fine Dining positioning
- Banquet services (events, parties)
- Long operating hours (9:30 AM to midnight)

### Why This Makes the App More Viable
1. **Brand recognition already exists** - People search "Chilli Vanilla Hazaribagh" specifically
2. **High repeat customer base** - 9k ratings means thousands of regular customers
3. **No Swiggy competition** - Only on Zomato, so customers have limited alternatives
4. **Delivery infrastructure exists** - They already deliver (Zomato's own fleet model suggests restaurant may have own riders too)

[TODO: Research top 3-5 competitor restaurants in Hazaribagh for comparison]

---

## Open Source Platform Research

### Enatega (Primary Candidate)
- **Repo:** https://github.com/Jeenesh/enatega-multivendor (community)
- **Stack:** React Native (customer + rider app), React (admin dashboard), Node.js/Express + MongoDB
- **Features:**
  - Multi-vendor capable (overkill for single restaurant, but means multi-tenant is built in)
  - Real-time order tracking
  - Rider app with navigation
  - Admin panel with analytics
  - Push notifications
  - Multiple payment gateways
- **Concerns:**
  - Heavy, may need significant stripping down
  - React Native means app store deployment needed
  - MongoDB (consider if Postgres is better for our needs)

### Alternatives Evaluated

| Platform | Stack | Pros | Cons |
|----------|-------|------|------|
| **Enatega** | RN + Node + MongoDB | Most complete, multi-vendor | Heavy, needs trimming |
| **Food Delivery App (Next.js)** | Next.js + Prisma | Modern stack, SSR | Less mature |
| **CoopCycle** | Symfony + React | Great logistics/routing | Cooperative-focused, EU-centric |
| **Medusa.js** | Node + Next.js | Headless commerce, very modular | Not food-specific, need to build food ordering UX |
| **Custom on Supabase** | Next.js + Supabase + RN | Full control, our existing stack | More build effort |

### Recommended Stack Decision

**Custom build on our existing stack** (Next.js + Supabase + React Native/Expo for mobile)

Reasons:
- We already know the stack (Next.js is our bread and butter)
- Supabase gives us auth, DB, realtime, storage out of the box
- 450+ item menu needs a well-designed data model, not a generic one
- Lighter than forking Enatega and stripping it down
- More control over reusability for future clients
- Can build PWA first, native app later
- WhatsApp integration is custom regardless of platform choice

---

## Remaining Research TODOs

- [ ] Get actual menu prices (ask client or take screenshot)
- [ ] Google Maps rating and review count
- [ ] Top 3-5 competitor restaurants in Hazaribagh
- [ ] Current offers running on Zomato
- [ ] Confirm if restaurant has own delivery staff already
- [ ] Banquet details (capacity, event types, pricing approach)
- [ ] Instagram handle and follower count
