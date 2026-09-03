# SD18 Starter Audit — What We Keep, Change, Add

> Full audit of the existing Medusa v2 Next.js starter at sd18-store/.
> Companion to build-plan.md. Read this before touching any code.

---

## What the Starter Gives Us (Free)

### Routing (100% keep)
```
[countryCode]/
├── / (Home)
├── /store (Product listing with sort/filter/pagination)
├── /products/[handle] (Product detail with image gallery, variants, add to cart)
├── /collections/[handle] (Collection pages)
├── /categories/[...category] (Nested category browsing)
├── /cart (Cart with quantity management)
├── /checkout (Full multi-step: address → shipping → payment → review)
├── /account (Parallel routes: dashboard if logged in, login form if not)
│   ├── /profile, /addresses, /orders, /orders/details/[id]
└── /order/[id]/confirmed (Order confirmation)
```

The `[countryCode]` prefix is baked deep — don't fight it. For SD18 (India only), we set `NEXT_PUBLIC_DEFAULT_REGION=in` and never show the switcher UI. Users always see `/in/...` in the URL.

### Data Layer (100% keep, configure only)
All functions in `src/lib/data/` are solid:
- `cart.ts` — create/retrieve/update cart, add/remove items, set shipping, place order
- `products.ts` — list with pagination/sort, fetch by handle, static params
- `orders.ts` — retrieve, list, transfers
- `customer.ts` — auth, signup, login, addresses
- `regions.ts` — region detection and caching
- `fulfillment.ts` — list and calculate shipping options
- `payment.ts` — list payment methods for region
- `cookies.ts` — JWT auth, cart ID, cache tags

### UI Modules (Mostly keep, SD18 styling only)
All functional logic in `src/modules/` works correctly:
- **account/** — login, register, profile, addresses, order history ✅
- **cart/** — cart items, totals, empty state ✅
- **checkout/** — addresses, shipping, review, submit ✅ (payment needs Razorpay swap)
- **products/** — image gallery, variant selection, add to cart, pricing, tabs ✅
- **store/** — pagination, sorting, filtering ✅
- **order/** — order confirmation, order details, shipping info, payment details ✅
- **common/** — input, radio, checkbox, modal, cart totals ✅
- **skeletons/** — all loading states ✅

### Infrastructure (100% keep)
- Turborepo monorepo setup
- TypeScript, Tailwind, Prettier
- Cookie-based auth and cart persistence
- Cache revalidation strategy (cache tags)
- Server/Client component split
- ISR for product pages

---

## What We Change

### 1. Stripe → Razorpay + COD

**Files to modify:**

| File | Change |
|------|--------|
| `src/lib/constants.tsx` | Add `pp_razorpay_razorpay` and `pp_cod_cod` to `paymentInfoMap`. Remove Stripe detection helpers or repurpose them. |
| `src/modules/checkout/components/payment-wrapper/index.tsx` | Load Razorpay Checkout.js instead of Stripe.js. Conditional on `pp_razorpay_` prefix. |
| `src/modules/checkout/components/payment-container/index.tsx` | Replace `CardElement` with "Pay Now" button that opens Razorpay modal. Add COD option with ₹50 surcharge UI. |
| `apps/backend/medusa-config.ts` | Register Razorpay and COD modules |
| `apps/backend/src/modules/` | Add `razorpay/` and `cod/` provider modules |

**Remove:**
- `@stripe/react-stripe-js` and `@stripe/stripe-js` from storefront package.json
- `stripe-wrapper.tsx`
- All Stripe env var references

### 2. Seed Data — Europe → India

**File:** `apps/backend/src/migration-scripts/initial-data-seed.ts`

Replace European defaults with SD18's setup:
- Region: "India" (currency: INR)
- Country: "in" (India)
- Default country code: "in" (not "dk")
- Stock location: "SD18 Warehouse, Asansol (713301)"
- Payment providers: razorpay + cod (not pp_system_default)
- Shipping options: placeholder (Shiprocket will calculate dynamically)
- Categories: Bat, Ball, Gloves, Leg Guard, Thigh Pad, Elbow Guard, Bag, Cap, Polo, Pant (not Shirts/Sweatshirts/Pants/Merch)
- Products: don't seed demo products (import from MySQL dump instead)

### 3. Country/Region Routing — Simplify for India

**File:** `src/middleware.ts`

Change:
- `NEXT_PUBLIC_DEFAULT_REGION` → `"in"`
- Remove Cloudflare/Vercel geo-detection (SD18 is India-only)
- Simplify to: always redirect to `/in/` if no country code in URL

**File:** `src/modules/layout/components/country-select/`
- Hide this component entirely (SD18 doesn't need region switching)

**File:** `src/modules/layout/components/language-select/`
- Hide this component (English only for now)

### 4. Navbar + Footer — SD18 Branding

**File:** `src/modules/layout/templates/nav/index.tsx`
- Replace Medusa logo with SD18 logo
- Navigation: Shop (dropdown by category), About, Blog, Contact
- Cart icon with count (already there)
- Mobile menu (already there)

**File:** `src/modules/layout/templates/footer/index.tsx`
- SD18 contact details (address, phone, email)
- Social links (YouTube, Instagram, Facebook)
- Legal pages (Privacy, Refund, Terms, Shipping)
- Remove "Powered by Medusa" CTA

### 5. Home Page — SD18 Content

**File:** `src/modules/home/components/hero/index.tsx`
- Replace demo hero with SD18 hero image
- "Fly Towards Your Dream" tagline
- Shop Now CTA

**File:** `src/modules/home/components/featured-products/`
- Configure to show actual SD18 collections (Best Sellers, New Arrivals)

### 6. Styling — SD18 Brand Theme

**File:** `src/styles/globals.css`
- Add SD18 brand colours (dark navy `#1a1f2e`, green `#22c55e`)
- SD18 typography (Inter font)
- Remove Medusa default colours

**File:** `tailwind.config.js`
- Add SD18 colour tokens

### 7. Next.js Config — Image Domains

**File:** `next.config.js`
- Change `images.unoptimized: false` (we WANT Next.js image optimization)
- Add Cloudinary to `remotePatterns`: `res.cloudinary.com`
- Remove unused S3 patterns

### 8. Types — Extend with SD18 Domain Types

**File:** `src/types/global.ts`
- Add SD18-specific types (ShippingRate, TrackingEvent, etc.)
- Keep existing Medusa types (VariantPrice, FeaturedProduct, StoreFreeShippingPrice)
- These extend Medusa SDK types, not replace them

---

## What We Add (New Code)

### Backend Modules (New)

| Module | Location | What It Does |
|--------|----------|-------------|
| Razorpay | `apps/backend/src/modules/razorpay/` | Payment provider: create order, verify signature, capture, refund |
| COD | `apps/backend/src/modules/cod/` | COD provider: auto-authorize, manual capture, ₹1500 limit |
| Shipping | `apps/backend/src/modules/shipping/` | Provider interface + Shiprocket + Manual/Pickup |
| Phone Auth | `apps/backend/src/modules/phone-auth/` | MSG91 OTP: send + verify |

### Backend Subscribers (New)

| Subscriber | Trigger | Action |
|-----------|---------|--------|
| `order-placed.ts` | `order.placed` | WhatsApp notify SD18 + email customer |
| `order-shipped.ts` | `fulfillment.created` | Email customer with tracking link |
| `shipment-delivered.ts` | Shiprocket webhook | Auto-capture COD payment |
| `shipment-rto.ts` | Shiprocket webhook (RTO) | Cancel order, release inventory |

### Backend API Routes (New)

| Route | Method | Purpose |
|-------|--------|---------|
| `/store/shipping-rates` | GET | Return Shiprocket rates for cart + pincode |
| `/store/phone-auth/send` | POST | Send OTP via MSG91 |
| `/store/phone-auth/verify` | POST | Verify OTP, return JWT |
| `/webhooks/razorpay` | POST | Handle Razorpay payment events |
| `/webhooks/shiprocket` | POST | Handle shipment status updates |

### Storefront Components (New)

| Component | Location | What It Does |
|-----------|----------|-------------|
| `RazorpayWrapper` | `modules/checkout/components/payment-wrapper/` | Opens Razorpay modal, handles success/failure |
| `CodOption` | `modules/checkout/components/payment-container/` | COD selection with ₹50 fee callout and OTP verify |
| `OtpInput` | `modules/common/components/otp-input/` | 6-digit OTP input field |
| `PhoneLoginForm` | `modules/account/components/phone-login/` | Phone OTP login tab |
| `TrackingCard` | `modules/order/components/tracking/` | Shows AWB, courier, status timeline |
| `PincodeChecker` | `modules/checkout/components/pincode-checker/` | Check deliverability before address |
| `InventoryBadge` | `modules/products/components/inventory-badge/` | "Only 3 left" / "In Stock" |

### Scripts (New)

| Script | Location | What It Does |
|--------|----------|-------------|
| `upload-images.ts` | `scripts/` | Uploads 1,161 product images to Cloudinary |
| `migrate-products.ts` | `scripts/` | Migrates 58 products from MySQL dump to Medusa |
| `backup.sh` | `scripts/` | pg_dump to Cloudflare R2 (runs as cron on Oracle) |

---

## What We Remove

| What | Where | Why |
|------|-------|-----|
| Stripe dependencies | `apps/storefront/package.json` | Replacing with Razorpay |
| `stripe-wrapper.tsx` | `modules/checkout/` | Stripe-specific |
| `MedusaCTA` component | `modules/layout/` | "Powered by Medusa" badge — not needed on client site |
| Country/language selectors | `modules/layout/` | SD18 is India-only, English-only |
| Order transfer flow | `app/[countryCode]/order/[id]/transfer/` | Not needed for SD18's use case |
| European seed data | `migration-scripts/` | Replace with India seed |
| `pg` dependency | `apps/storefront/package.json` | Direct DB access from storefront is wrong — Medusa API only |
| `@types/pg` | `apps/storefront/package.json` | Same |

---

## Environment Variables (Full Map)

### Backend (.env)
```bash
# Medusa Core
DATABASE_URL=postgresql://medusa:***@localhost:5432/medusa_sd18
REDIS_URL=redis://localhost:6379
JWT_SECRET=***
COOKIE_SECRET=***
STORE_CORS=https://sd18sports.com,http://localhost:8000
ADMIN_CORS=https://api.sd18sports.com,http://localhost:9000
AUTH_CORS=https://sd18sports.com,http://localhost:8000

# Razorpay
RAZORPAY_KEY_ID=rzp_live_Rr7SYwQvzg0AMS
RAZORPAY_KEY_SECRET=***
RAZORPAY_WEBHOOK_SECRET=***

# Shiprocket
SHIPROCKET_EMAIL=***
SHIPROCKET_PASSWORD=***
SHIPROCKET_WEBHOOK_TOKEN=***
WAREHOUSE_PINCODE=713301

# MSG91 (Phone OTP)
MSG91_AUTH_KEY=***
MSG91_TEMPLATE_ID=***

# WhatsApp Notification
SD18_WHATSAPP_NUMBER=917004000329

# Resend (Email)
RESEND_API_KEY=***
RESEND_FROM=orders@sd18sports.com

# Cloudinary (for migration script)
CLOUDINARY_CLOUD_NAME=***
CLOUDINARY_API_KEY=***
CLOUDINARY_API_SECRET=***
```

### Storefront (.env.local)
```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.sd18sports.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=***
NEXT_PUBLIC_DEFAULT_REGION=in
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_Rr7SYwQvzg0AMS
NEXT_PUBLIC_BASE_URL=https://sd18sports.com

# Sanity (Blog)
NEXT_PUBLIC_SANITY_PROJECT_ID=***
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## Key Patterns to Follow (from Starter)

Before writing any new code, understand these patterns the starter uses:

### 1. Server Actions for Mutations
All cart/auth mutations use Next.js Server Actions (not client-side fetch):
```typescript
// In lib/data/cart.ts
"use server"
export async function addToCart({ variantId, quantity, countryCode }) {
  // Server-side, has access to cookies
}
```

### 2. Cache Tags for Revalidation
Every data fetch uses cache tags for targeted revalidation:
```typescript
const cartId = await getCartId()
const { cart } = await sdk.store.cart.retrieve(cartId, {
  ...await getCacheOptions("carts")  // tags: ["carts-{cacheId}"]
})
// After mutation:
revalidateTag(await getCacheTag("carts"))
```

### 3. Country Code in Every Function
All data functions take `countryCode` to find the right region:
```typescript
export async function getOrSetCart(countryCode: string): Promise<StoreCart>
```

### 4. LocalizedClientLink
All internal links must use `LocalizedClientLink` to preserve country code:
```typescript
import LocalizedClientLink from "@modules/common/components/localized-client-link"
<LocalizedClientLink href="/cart">View Cart</LocalizedClientLink>
// Renders as: <a href="/in/cart">
```

### 5. Module Structure
Each feature module follows: `index.tsx` for the main export, `components/` for sub-components:
```
modules/
  checkout/
    index.tsx           (template — page-level component)
    components/
      addresses/
      shipping/
      payment/
      review/
```

---

*Last updated: 2026-06-26*
