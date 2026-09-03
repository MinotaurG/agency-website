# Build Plan & Timeline

## Target: 4 Weeks (1 Month)

### Week 1: Foundation + Kitchen Dashboard

**Backend (Supabase)**
- [ ] Set up Supabase project
- [ ] Design and create database tables (migrations)
- [ ] Set up Row Level Security policies
- [ ] Configure auth (phone OTP)
- [ ] Set up realtime subscriptions

**Kitchen/Admin Dashboard (Next.js web app)**
- [ ] Project scaffold (Next.js + Tailwind + shadcn)
- [ ] Auth flow (owner login)
- [ ] Menu management CRUD (categories, items, variants, addons)
- [ ] Order queue view (incoming, preparing, ready)
- [ ] Accept/reject order with prep time
- [ ] Sound notification for new orders
- [ ] Basic dashboard (today's orders, revenue)

### Week 2: Customer App

**Customer App (React Native Expo or PWA)**
- [ ] Project scaffold
- [ ] Phone OTP login
- [ ] Menu browsing (categories, search, veg filter)
- [ ] Cart management (add, remove, quantity, variants)
- [ ] Address management (save multiple addresses)
- [ ] Delivery radius check
- [ ] Order placement flow
- [ ] Payment integration (Razorpay: COD + UPI + cards)
- [ ] Order tracking (realtime status)
- [ ] Order history + reorder

### Week 3: Delivery App + Offers

**Delivery Staff App (React Native Expo)**
- [ ] Phone login (staff accounts created by admin)
- [ ] Active order view (items, address, map link)
- [ ] Status updates (picked up, delivered)
- [ ] Call customer (masked number or direct)
- [ ] Order history for the day

**Offers & Loyalty**
- [ ] Offer engine (admin creates offers with rules)
- [ ] Auto-apply and coupon code support
- [ ] Loyalty points: earn on order, redeem at checkout
- [ ] First-order discount (new user detection)
- [ ] Referral system (share code, both get reward)

**Delivery Management (Admin)**
- [ ] Staff list management
- [ ] Manual order assignment to delivery staff
- [ ] Staff availability toggle
- [ ] Delivery status tracking from admin view

### Week 4: WhatsApp + Polish + Deploy

**WhatsApp Integration**
- [ ] WATI/Gupshup account setup
- [ ] Chatbot flow: greeting > menu > order > confirm > track
- [ ] Webhook: WhatsApp orders pushed to same backend
- [ ] Status update messages via WhatsApp

**Pre-order/Scheduling**
- [ ] Schedule order for future time slot
- [ ] Kitchen sees scheduled orders separately
- [ ] Auto-notify kitchen when prep time approaches

**Polish & Deploy**
- [ ] Customer app: UI polish, loading states, error handling
- [ ] Admin dashboard: responsive (tablet-first)
- [ ] App store submission (if native) or PWA install prompt
- [ ] Custom domain setup
- [ ] Owner training session (recorded)
- [ ] Soft launch with QR codes in-restaurant

---

## Post-Launch (Ongoing)

- [ ] Analytics dashboard (popular items, peak hours, revenue trends)
- [ ] Push notification campaigns (admin sends to all customers)
- [ ] Multi-branch support (when needed)
- [ ] Ratings and reviews
- [ ] Banquet integration (event menu, booking inquiry)
- [ ] Customer segmentation (new, regular, dormant)
- [ ] Auto-dispatch for delivery staff (when team grows)

---

## Deliverables to Client

1. Customer ordering app (Android + iOS or PWA)
2. Delivery staff mobile app
3. Kitchen/Admin dashboard (web)
4. WhatsApp ordering channel
5. Training video + in-person session
6. QR code designs for tables/packaging
7. 30-day post-launch support

## Tech Decision: PWA vs Native App

| Factor | PWA | Native (Expo) |
|--------|-----|---------------|
| Install friction | Lower (no app store) | Higher (download from store) |
| Push notifications | Supported on Android, limited iOS | Full support |
| Background location (rider) | Limited | Full support |
| Perceived quality | "Website" feel | "Real app" feel |
| Build time | Faster | Slightly more |
| Updates | Instant | App store review (or OTA via Expo) |
| Offline support | Service worker | Built-in |

**Recommendation:**
- Customer app: Start as PWA, go native if traction demands it
- Delivery app: Native (Expo) from day 1 (needs background location, reliable push)
- Admin dashboard: Web app (PWA optional)
