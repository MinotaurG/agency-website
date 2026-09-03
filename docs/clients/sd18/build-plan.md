# SD18 Sports — Build Plan

> This document is the bridge from design to code.
> Read system-design.md first. This tells you what to build, in what order, and how.

---

## Engineering Principles (Non-negotiable)

Before any code is written, these rules govern everything:

1. **Structure first.** Every phase starts with folder structure and types — no components before the shape of the data is defined.
2. **Types are the contract.** `src/types/index.ts` is the single source of truth. All modules derive from it. Never invent a type inline.
3. **One thing at a time.** Every Claude Code prompt is scoped to a single file or a single function. No "build the whole cart."
4. **Review every diff.** Treat generated code like a junior dev's PR. Read it before accepting.
5. **Env vars from commit one.** Nothing is hardcoded. `.env` is in `.gitignore` before the first push.
6. **CLAUDE.md is always up to date.** Both the Medusa backend and the Next.js storefront get their own `CLAUDE.md` with stack, conventions, and what NOT to do.
7. **Tests on critical paths.** Auth, checkout, payment, shipping rate calculation — each gets at least one integration test alongside implementation.
8. **Git after every logical unit.** One task = one commit. Meaningful messages. Never "Claude update."

---

## Repository Structure

```
sd18-store/                         (monorepo root)
├── apps/
│   ├── backend/                    (Medusa v2 server)
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── razorpay/       (payment provider)
│   │   │   │   ├── cod/            (cash on delivery provider)
│   │   │   │   ├── shipping/       (provider-agnostic shipping)
│   │   │   │   │   └── providers/
│   │   │   │   │       ├── shiprocket.ts
│   │   │   │   │       └── manual.ts
│   │   │   │   └── phone-auth/     (MSG91 OTP)
│   │   │   ├── subscribers/
│   │   │   │   ├── order-placed.ts
│   │   │   │   ├── order-shipped.ts
│   │   │   │   └── shipment-delivered.ts
│   │   │   ├── workflows/
│   │   │   │   ├── cancel-order.ts
│   │   │   │   └── process-rto.ts
│   │   │   └── api/
│   │   │       ├── store/
│   │   │       │   └── shipping-rates/
│   │   │       └── webhooks/
│   │   │           ├── razorpay/
│   │   │           └── shiprocket/
│   │   ├── medusa-config.ts
│   │   ├── CLAUDE.md               (backend conventions)
│   │   └── .env.example
│   │
│   └── storefront/                 (Next.js 16)
│       ├── src/
│       │   ├── app/
│       │   │   ├── (store)/
│       │   │   │   ├── page.tsx
│       │   │   │   ├── shop/
│       │   │   │   ├── cart/
│       │   │   │   ├── checkout/
│       │   │   │   └── account/
│       │   │   └── (blog)/
│       │   ├── components/
│       │   │   ├── product/
│       │   │   ├── cart/
│       │   │   ├── checkout/
│       │   │   └── ui/             (shadcn primitives)
│       │   ├── hooks/
│       │   ├── lib/
│       │   │   ├── medusa.ts       (SDK client)
│       │   │   └── sanity.ts
│       │   └── types/
│       │       └── index.ts        (THE type source of truth)
│       ├── CLAUDE.md               (storefront conventions)
│       └── .env.example
│
├── docs/                           (system-design.md, build-plan.md, etc.)
├── scripts/                        (seed, migration, import scripts)
└── package.json                    (workspace root)
```

---

## Phase 0: Foundation (Before Any Code)

**Goal:** Everything is set up, nothing is guessed. Every dev session starts from a known state.

**Time estimate: 1 day**

### 0.1 Oracle Cloud Instance

```
Steps:
1. Create Oracle Cloud account (ap-mumbai-1 as home region)
2. Upgrade to PAYG (credit card hold, not a charge)
3. Provision VM.Standard.A1.Flex: 2 OCPU, 12 GB RAM, 50 GB boot
4. Configure security list: ports 22, 80, 443 open. 5432/6379 localhost only.
5. Install: Ubuntu 24.04 ARM, Node.js 20 (ARM build), pnpm, PostgreSQL 16, Redis 7, Caddy
6. Create postgres user + database: medusa_sd18
7. Verify: node --version, psql -U medusa, redis-cli ping
8. Set up GitHub Actions deploy key (SSH key pair)
```

**Done when:** `ssh oracle "echo ok"` works, Node/PG/Redis all respond.

### 0.2 Monorepo Scaffold

```
Steps:
1. Create GitHub repo: sd18-store (private)
2. pnpm init workspace
3. Create apps/backend and apps/storefront directories
4. Add root .gitignore (node_modules, .env, build/, .DS_Store)
5. Write BOTH CLAUDE.md files (see §0.3)
6. Define src/types/index.ts in storefront (see §0.4)
7. First commit: "chore: project scaffold — empty monorepo structure"
```

**Done when:** Repo exists, structure is in place, no node_modules committed.

### 0.3 CLAUDE.md Files (Write These First)

**apps/backend/CLAUDE.md:**
```
Stack: Medusa v2, Node.js 20, TypeScript, PostgreSQL 16, Redis 7
ORM: Medusa's DML (not raw SQL, not Prisma)
Payment: Razorpay (custom provider in src/modules/razorpay/)
Shipping: Provider interface in src/modules/shipping/providers/interface.ts
Auth: Phone OTP via MSG91 + Medusa's built-in email auth
Env vars: Always use process.env.VARNAME — never hardcode values

CONVENTIONS:
- Every module has: service.ts + index.ts only
- Subscribers go in src/subscribers/, named {event}-{action}.ts
- Workflows go in src/workflows/, one workflow per file
- Webhook handlers verify signatures before processing — no exceptions
- All money values in paise (integer). ₹100 = 10000. Never floats.
- Prices stored as integers in smallest currency unit

DO NOT:
- Use any ORM other than Medusa's DML for module models
- Bypass Medusa's workflow engine for multi-step operations
- Store secrets in code or commit .env
- Use console.log in production code (use Medusa's logger)
```

**apps/storefront/CLAUDE.md:**
```
Stack: Next.js 16 (App Router), TypeScript, Tailwind v4, shadcn/ui (New York)
State: React Server Components for data, Zustand for cart/UI state
Medusa SDK: import medusa from '@/lib/medusa'
Types: All types come from src/types/index.ts — never define inline types

CONVENTIONS:
- (store)/ layout wraps all customer-facing pages (navbar + footer)
- Server Components fetch data. Client Components handle interactivity.
- Components in src/components/{domain}/ — product/, cart/, checkout/, ui/
- Hooks in src/hooks/ — business logic only, no JSX
- API calls go through SDK client in lib/medusa.ts — never fetch() Medusa directly
- All images via next/image with Cloudinary URLs
- All money formatted via lib/format.ts formatPrice() — never format inline
- Error handling: every async operation has try/catch with user-facing fallback

DO NOT:
- Fetch data in Client Components (use RSC or hooks)
- Define new types outside src/types/index.ts
- Hardcode any URLs, API keys, or config values
- Use inline styles
- Use <div onClick> instead of <button>
- Import from Medusa server packages in storefront (SDK only)
```

### 0.4 Core Types (Define Before Anything Else)

`apps/storefront/src/types/index.ts` — this file is written once, referenced everywhere:

```typescript
// SD18 domain types — all components, hooks, and API calls derive from these

export type Money = {
  amount: number        // in paise — ₹100 = 10000
  currency_code: 'inr'
}

export type ProductStatus = 'draft' | 'published' | 'rejected'

export type ProductOption = {
  id: string
  title: string         // "Size", "Colour"
  values: string[]
}

export type ProductVariant = {
  id: string
  sku: string           // SD18-BAT-KASHMIR-SH
  title: string         // "SH" / "M" / "Blue"
  options: Record<string, string>   // { Size: "SH" }
  prices: Money[]
  inventory_quantity: number
  allow_backorder: boolean
}

export type Product = {
  id: string
  title: string
  handle: string        // URL slug: kashmir-willow-bat
  description: string
  thumbnail: string     // Cloudinary URL
  images: { url: string }[]
  options: ProductOption[]
  variants: ProductVariant[]
  categories: { id: string; name: string; handle: string }[]
  metadata?: Record<string, unknown>
}

export type CartItem = {
  id: string
  variant_id: string
  product_title: string
  variant_title: string
  thumbnail: string
  unit_price: number    // paise
  quantity: number
  subtotal: number      // paise
}

export type Cart = {
  id: string
  items: CartItem[]
  subtotal: number
  discount_total: number
  shipping_total: number
  tax_total: number
  total: number
  shipping_address?: Address
  payment_session?: PaymentSession
  shipping_methods?: ShippingMethod[]
}

export type Address = {
  first_name: string
  last_name: string
  phone: string
  address_1: string
  address_2?: string
  city: string
  province: string      // state
  postal_code: string
  country_code: 'in'
}

export type ShippingRate = {
  provider_id: string
  courier_name: string
  service_type: 'economy' | 'standard' | 'express' | 'pickup'
  rate_paise: number
  estimated_days: { min: number; max: number }
}

export type ShippingMethod = {
  id: string
  name: string
  price: number
}

export type PaymentSession = {
  id: string
  provider_id: 'razorpay' | 'cod'
  status: 'pending' | 'authorized' | 'captured' | 'canceled' | 'error'
  data: Record<string, unknown>
}

export type Order = {
  id: string
  display_id: number
  status: 'pending' | 'completed' | 'canceled' | 'archived'
  items: CartItem[]
  shipping_address: Address
  total: number
  payment_method: 'razorpay' | 'cod'
  fulfillment_status: 'not_fulfilled' | 'fulfilled' | 'shipped' | 'delivered'
  tracking?: { awb: string; link: string; status: string }
  created_at: string
}

export type Customer = {
  id: string
  email?: string
  phone?: string
  first_name: string
  last_name: string
  has_account: boolean
  orders?: Order[]
}
```

---

## Phase 1: Medusa Backend (Week 1)

**Goal:** Medusa is running on Oracle with products, payment, and shipping configured. No storefront yet. Test everything via API.

**Time estimate: 5-6 days**

### 1.1 Medusa Installation & Base Config

```
Steps:
1. cd apps/backend && npx create-medusa-app@latest . --no-browser
2. Configure medusa-config.ts:
   - DATABASE_URL: postgres on localhost
   - REDIS_URL: redis on localhost
   - Store CORS: https://sd18sports.com (+ localhost:8000 for dev)
   - Admin CORS: https://api.sd18sports.com
3. Run migrations: pnpm medusa db:migrate
4. Verify: pnpm medusa develop → GET /health returns 200
5. Commit: "feat: medusa base installation and config"
```

### 1.2 Stock Location & Admin Seed

```
Steps:
1. Create stock location: "SD18 Warehouse, Asansol" via Admin API
2. Seed: one region (India, INR)
3. Seed: shipping profiles (default + apparel)
4. Verify via Medusa Admin dashboard (localhost:9000/app)
5. Commit: "chore: seed india region and stock location"
```

### 1.3 Razorpay Payment Module

Single file. Implements Medusa's `AbstractPaymentProvider`.

```
Prompt to Claude Code:
"Create src/modules/razorpay/service.ts implementing AbstractPaymentProvider.
Methods: initiatePayment (create Razorpay order), authorizePayment (verify 
HMAC-SHA256 signature using RAZORPAY_KEY_SECRET), capturePayment, 
refundPayment, cancelPayment, getWebhookActionAndData.
Use process.env.RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.
Money values are in paise — divide by 100 when calling Razorpay API (which uses paise too).
Add src/modules/razorpay/index.ts registering the module.
Write one unit test in __tests__/razorpay.test.ts covering signature verification."
```

**Test:** POST to `/store/payment-sessions` with razorpay provider, verify Razorpay order is created.

### 1.4 COD Payment Module

```
Prompt to Claude Code:
"Create src/modules/cod/service.ts implementing AbstractPaymentProvider.
COD rules: max order value 150000 paise (₹1,500). Add ₹5000 paise (₹50) COD fee.
initiatePayment: validate order total ≤ 150000, return authorized status immediately.
authorizePayment: return status 'authorized' (no API call, money not captured).
capturePayment: manually triggered when delivery confirmed.
cancelPayment: always succeeds (no money moved).
No external API calls needed."
```

### 1.5 Shipping Provider Interface + Shiprocket

```
Prompt 1 (interface):
"Create src/modules/shipping/providers/interface.ts with the ShippingProvider 
interface from our system design. Export: ShippingRate, ShipmentCreated, 
TrackingEvent, WebhookResult types."

Prompt 2 (Shiprocket):
"Create src/modules/shipping/providers/shiprocket.ts implementing ShippingProvider.
Methods: calculateRates (POST /courier/serviceability), createShipment 
(POST /orders/create/adhoc), cancelShipment, getTrackingInfo, handleWebhook.
Auth: token-based (login once, cache token in Redis with 24hr TTL).
Use process.env.SHIPROCKET_EMAIL and SHIPROCKET_PASSWORD.
Origin pincode: process.env.WAREHOUSE_PINCODE (713301 for SD18)."

Prompt 3 (manual/pickup provider):
"Create src/modules/shipping/providers/manual.ts implementing ShippingProvider.
calculateRates: if customer pincode within 10km of 713301, return free pickup option.
createShipment: no-op, return placeholder shipment_id.
handleWebhook: no-op."
```

### 1.6 Phone OTP Auth Module (MSG91)

```
Prompt to Claude Code:
"Create src/modules/phone-auth/service.ts with two methods:
sendOTP(phone: string): calls MSG91 API to send 6-digit OTP.
verifyOTP(phone: string, otp: string): calls MSG91 verify endpoint.
Use process.env.MSG91_AUTH_KEY and MSG91_TEMPLATE_ID.
Add store API route: POST /store/phone-auth/send and POST /store/phone-auth/verify.
Verify endpoint: if valid OTP → create or retrieve customer by phone → return JWT."
```

### 1.7 Event Subscribers

```
Prompt 1:
"Create src/subscribers/order-placed.ts subscribing to order.placed event.
On fire: send WhatsApp message to process.env.SD18_WHATSAPP_NUMBER via
WhatsApp Business API with order summary (order number, customer name, 
items, total, address).
Also send order confirmation email via Resend to customer's email if present."

Prompt 2:
"Create src/subscribers/shipment-delivered.ts subscribing to shipment.delivered event.
On fire: if order payment_method is 'cod', call capturePayment on the order's payment.
Also send delivery confirmation email to customer."
```

### 1.8 Backend CLAUDE.md + Deploy Script

```
Steps:
1. Finalize apps/backend/CLAUDE.md with all module locations documented
2. Write GitHub Actions workflow: .github/workflows/deploy-backend.yml
   - Trigger: push to main
   - Steps: SSH to Oracle → git pull → pnpm install → pnpm medusa db:migrate → pm2 restart medusa
3. Write Caddyfile for api.sd18sports.com → localhost:9000
4. Set up pm2: pm2 start medusa --name medusa --max-memory-restart 2500M
5. Commit: "chore: deploy pipeline and process management"
```

**Phase 1 done when:**
- `curl https://api.sd18sports.com/health` returns 200
- Admin dashboard loads at `https://api.sd18sports.com/app`
- Can create a test product in admin and retrieve it via API
- Razorpay payment session creates a real Razorpay order
- Shiprocket returns rates for pincode 713301 → 110001

---

## Phase 2: Product Catalog Migration (Week 1-2, parallel with Phase 1)

**Goal:** All 58 SD18 products are in Medusa with correct variants, prices, images, and inventory. Migration is scripted, not manual.

**Time estimate: 3-4 days**

### 2.1 Cloudinary Setup

```
Steps:
1. Create Cloudinary account (free tier)
2. Create folder structure: sd18-sports/products/{sku}/
3. Configure Medusa's file module to use Cloudinary
4. Test: upload one product image, get back URL
```

### 2.2 Image Upload Script

```
Prompt to Claude Code:
"Write scripts/upload-images.ts that:
1. Reads the directory structure from clients/sd18/amazon/products/
2. For each image file, derives the product SKU from the folder path
3. Uploads to Cloudinary at sd18-sports/products/{sku}/{filename}
4. Returns a mapping: { original_path: cloudinary_url }
5. Saves mapping to scripts/output/image-map.json
Use cloudinary SDK. Read CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, 
CLOUDINARY_API_SECRET from env."
```

### 2.3 Product Migration Script

```
Prompt to Claude Code:
"Write scripts/migrate-products.ts that:
1. Reads the MySQL dump at current-site-backup/sd18_dump.sql
2. Parses the products, categories, product_variants, product_stocks, 
   product_gallery tables
3. Maps old category IDs to new category handles (Bat, Ball, Gloves, etc.)
4. For each product, calls Medusa Admin API to:
   a. Create product with title, description, handle (slug), category
   b. Create variants with SKU (using SD18-CATEGORY-NAME-VARIANT format), 
      prices (in paise), options
   c. Set inventory quantities from product_stocks table
   d. Assign images from scripts/output/image-map.json
5. Logs success/failure per product
6. Is idempotent — safe to run multiple times (check if product exists first)"
```

**Done when:** All 58 products are visible in Medusa Admin with images, variants, correct prices, and inventory counts.

---

## Phase 3: Storefront Core (Week 2-3)

**Goal:** A working Next.js storefront. Customers can browse, add to cart, and view products. No checkout yet.

**Time estimate: 5-6 days**

### 3.1 Next.js Project + Base Config

```
Steps:
1. cd apps/storefront && npx create-next-app@latest . (App Router, TypeScript, Tailwind)
2. Install: shadcn/ui, @medusajs/js-sdk, zustand, @sanity/client
3. Copy src/types/index.ts (already defined in Phase 0)
4. Create lib/medusa.ts (SDK client pointing to api.sd18sports.com)
5. Create lib/format.ts with formatPrice(paise: number): string → "₹1,999"
6. Configure Tailwind v4 in globals.css (SD18 brand colours)
7. Commit: "chore: storefront scaffold with types and SDK client"
```

SD18 brand theme:
```css
/* globals.css */
@theme {
  --color-brand: #1a1f2e;      /* dark navy */
  --color-accent: #22c55e;     /* green */
  --color-muted: #64748b;
  --font-heading: 'Inter', sans-serif;
}
```

### 3.2 Layout + Navigation

```
Prompt to Claude Code:
"Create app/(store)/layout.tsx with Navbar and Footer components.
Navbar: SD18 logo left, navigation links (Shop, About, Blog, Contact) center,
cart icon with item count right. Cart count from Zustand cart store.
Footer: contact info, social links, legal page links.
Navbar is sticky on scroll. Mobile: hamburger menu.
All links use Next.js <Link>. No hardcoded URLs — use route constants from lib/routes.ts."
```

### 3.3 Cart State (Zustand)

```
Prompt to Claude Code:
"Create src/store/cart.ts using Zustand.
State: cartId (string | null), items (CartItem[]), total (number), isLoading (boolean).
Actions: 
  initCart() — create or retrieve cart from localStorage cartId via Medusa SDK
  addItem(variantId, quantity) — POST /store/carts/{id}/line-items
  removeItem(itemId) — DELETE /store/carts/{id}/line-items/{itemId}
  updateQuantity(itemId, quantity) — POST /store/carts/{id}/line-items/{itemId}
  clearCart() — reset state after successful order
Persist cartId in localStorage. Types from src/types/index.ts."
```

### 3.4 Product Pages

```
Prompt 1 — Product listing page:
"Create app/(store)/shop/page.tsx as a React Server Component.
Fetch products from Medusa SDK: await medusa.store.product.list({ limit: 20 }).
Display as a responsive grid (2 cols mobile, 3 cols tablet, 4 cols desktop).
Each product shows: thumbnail (next/image with Cloudinary URL), title, price.
Filter sidebar: category filter (Bats, Balls, Gloves, etc.). No client-side JS for filters — use URL search params."

Prompt 2 — Category pages:
"Create app/(store)/shop/[category]/page.tsx.
generateStaticParams: fetch all categories from Medusa.
Page fetches products filtered by category_id.
Revalidate: 60 seconds (ISR)."

Prompt 3 — Product detail page:
"Create app/(store)/shop/[category]/[handle]/page.tsx.
Fetch single product by handle from Medusa SDK.
Display: image gallery (main + thumbnails, zoom on hover), title, price (MRP strikethrough + selling price), option selectors (size/colour), Add to Cart button, description tabs (Description, Specs), related products carousel.
Option selection updates displayed variant price and inventory status.
Add to Cart calls cart store addItem(selectedVariantId, quantity).
generateStaticParams for all products. ISR: 60s."
```

### 3.5 Cart Page + Drawer

```
Prompt to Claude Code:
"Create app/(store)/cart/page.tsx and components/cart/CartDrawer.tsx.
Cart page: list of CartItems (image, name, variant, quantity stepper, price, remove button).
Subtotal, shipping estimate ('calculated at checkout'), total.
'Continue Shopping' button and 'Proceed to Checkout' button.
CartDrawer: slides in from right when item added. Shows last added item + cart total.
Both use cart Zustand store. Loading skeleton during API calls."
```

**Phase 3 done when:**
- Homepage shows featured products
- Shop page shows all products with category filter
- Product page shows images, options, correct price per variant
- Add to Cart works, cart count updates in navbar
- Cart page shows all items, quantities editable

---

## Phase 4: Checkout (Week 3)

**Goal:** Complete checkout flow — address, shipping rates, payment, order confirmation. The hardest phase.

**Time estimate: 5-6 days**

### 4.1 Checkout Layout + Steps

```
Prompt to Claude Code:
"Create app/(store)/checkout/page.tsx as a multi-step checkout.
Steps: 1. Shipping Address → 2. Shipping Method → 3. Payment → 4. Review & Place Order
Step state managed in React useState (not URL-based — checkout is one page).
Progress indicator at top showing current step.
Order summary sidebar visible on all steps (desktop) or collapsible (mobile)."
```

### 4.2 Shipping Address Step

```
Prompt to Claude Code:
"Create components/checkout/AddressForm.tsx.
Fields: First name, Last name, Phone (required for COD OTP), Address line 1, 
Address line 2 (optional), City, State (dropdown from Indian states), Pincode.
Validation: pincode is 6 digits. Phone is 10 digits. All required fields present.
On submit: PATCH /store/carts/{id} with shipping_address.
For logged-in customers: show saved addresses to select from before the form.
Use react-hook-form + Zod for validation."
```

### 4.3 Shipping Method Step

```
Prompt to Claude Code:
"Create components/checkout/ShippingSelect.tsx.
On mount: GET /store/shipping-rates?pincode={customerPincode}&cart_id={cartId}
Display rate options returned by our Shiprocket module:
  - Economy (₹X, 4-6 days)
  - Standard (₹X, 3-5 days)  
  - Express (₹X, 2-3 days)
  - Free Pickup (₹0, same day) — only if pincode within 10km of 713301
Loading skeleton while rates load.
On select: POST /store/carts/{id}/shipping-methods with selected method ID.
Show delivery estimate on selected option."
```

### 4.4 Payment Step

```
Prompt to Claude Code:
"Create components/checkout/PaymentStep.tsx.
Two options: 'Pay Online' (Razorpay) and 'Cash on Delivery'.
COD shows: ₹50 extra charge, only available for orders under ₹1,500.
For Razorpay: on 'Pay Now' click:
  1. POST /store/carts/{id}/payment-sessions to initiate Razorpay session
  2. Load Razorpay Checkout.js (checkout.razorpay.com/v1/checkout.js)
  3. Open Razorpay modal with order_id from session data
  4. On modal success: receive { payment_id, signature, order_id }
  5. Store in component state for final order placement
For COD: on 'Confirm COD' click: verify customer phone via OTP (MSG91) before proceeding.
Use process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID for the modal."
```

### 4.5 Order Placement + Confirmation

```
Prompt to Claude Code:
"Create components/checkout/OrderReview.tsx and app/(store)/order/[id]/page.tsx.
Review page: final summary of items, address, shipping method, payment.
'Place Order' button: POST /store/carts/{id}/complete
  - For Razorpay: include payment_id and signature in request body
  - For COD: no extra data needed
On success: clear cart state, redirect to /order/{order_id}
Order confirmation page: order number, items, estimated delivery, tracking info placeholder.
On failure: show specific error (payment failed, out of stock, etc.) and allow retry."
```

**Phase 4 done when:**
- Full checkout flow completes end-to-end
- A real Razorpay UPI payment creates a real order in Medusa
- COD order requires phone OTP and creates order
- Order confirmation page shows correct details
- Medusa admin shows the new order

---

## Phase 5: Customer Accounts + Blog (Week 4)

**Goal:** Customer login (OTP + email), order history, Sanity blog.

**Time estimate: 3-4 days**

### 5.1 Authentication

```
Prompt 1:
"Create app/(store)/account/login/page.tsx with two tabs:
Tab 1 — Phone OTP:
  Enter phone → 'Send OTP' button → 6-digit OTP input → verify → logged in
  Uses our /store/phone-auth/send and /store/phone-auth/verify endpoints
Tab 2 — Email/Password:
  Standard email + password form → POST /store/customers/me/auth
  Forgot password link → /account/reset-password

On successful auth: store JWT in httpOnly cookie via middleware.
Redirect to /account after login."

Prompt 2:
"Create src/middleware.ts for route protection.
Protected routes: /account/*, /checkout
If no JWT cookie → redirect to /account/login?redirect={current_path}
JWT refresh: if expired, attempt refresh before redirecting."
```

### 5.2 Account Pages

```
Prompt:
"Create app/(store)/account/ pages:
/account — dashboard (name, email, recent orders)
/account/orders — paginated order history (order number, date, status, total)
/account/orders/[id] — order detail with tracking link
/account/addresses — saved addresses (add, edit, delete)
/account/profile — edit name, email, phone
All pages: Server Components fetching via Medusa SDK with customer JWT.
Protect with middleware from 5.1."
```

### 5.3 Sanity Blog

```
Prompt:
"Create app/(blog)/blog/page.tsx and app/(blog)/blog/[slug]/page.tsx.
Fetch posts from Sanity using @sanity/client.
Blog index: grid of post cards (title, date, category, excerpt, thumbnail).
Blog post: full article with rich text (Portable Text renderer).
ISR: revalidate 3600 seconds.
Add blog link to main navigation."
```

---

## Phase 6: SEO, Performance, Polish (Week 4-5)

**Goal:** The site is fast, findable, and production-ready.

**Time estimate: 3-4 days**

### 6.1 SEO

```
Prompt to Claude Code:
"Add generateMetadata() to every page:
- Product pages: title = '{Product} - SD18 Sports', description from product description
- Category pages: 'Buy {Category} Online - SD18 Sports'
- Blog posts: post title + excerpt
Also:
- Add JSON-LD Product schema to product pages (name, price, availability, brand, image)
- Add JSON-LD BreadcrumbList to all pages
- Create app/sitemap.ts generating URLs for all products, categories, blog posts
- Create app/robots.ts allowing crawlers, blocking /admin and /api"
```

### 6.2 Performance Audit

```
Checklist:
- [ ] All product images use next/image with width/height
- [ ] Cloudinary URLs use auto format + quality (f_auto,q_auto)
- [ ] No layout shift (CLS) on product images (aspect ratio set)
- [ ] Cart drawer is lazy-loaded
- [ ] Checkout.js (Razorpay) loaded only on payment step, not globally
- [ ] No unused shadcn components imported
- [ ] Run: next build → check bundle sizes
- [ ] Run: Lighthouse on product page → target score >90
```

### 6.3 Error + Empty States

```
Prompt to Claude Code:
"Add error.tsx and not-found.tsx to the (store) route group.
error.tsx: generic error UI with 'Try again' button, reports to Sentry (optional).
not-found.tsx: 404 page with search bar and popular categories.
Add loading.tsx to product listing and product detail pages (skeleton UI).
Add empty cart state to cart page (with CTA to browse)."
```

### 6.4 Legal Pages

```
Steps:
1. Create app/(store)/policies/ directory
2. privacy-policy/page.tsx, refund-policy/page.tsx, 
   terms/page.tsx, shipping-policy/page.tsx
3. Content: drafted by Adam (our legal partner)
4. Add to footer navigation
5. These are static, no ISR needed
```

---

## Phase 7: Deploy & DNS Cutover (Week 5)

**Goal:** sd18sports.com points to the new site. Old site is archived.

**Time estimate: 1 day**

### 7.1 Pre-Launch Checklist

```
- [ ] All products live in Medusa admin
- [ ] Test order with real Razorpay payment (sandbox first, then live)
- [ ] Test COD order with phone OTP
- [ ] Test shipping rates for 3 different pincodes
- [ ] Test order cancellation from admin
- [ ] Check all product images load (no 404s)
- [ ] Check all category pages render
- [ ] Lighthouse score ≥ 90 on mobile
- [ ] Google Search Console verified
- [ ] Backup of old site confirmed (SQL dump in Drive)
- [ ] Razorpay live keys in Oracle .env (not test keys)
- [ ] MSG91 live keys configured
- [ ] Shiprocket account set up and API keys in .env
```

### 7.2 DNS Cutover

```
In Cloudflare DNS:
1. Add api.sd18sports.com → Oracle IP (A record, TTL 60)
2. Change sd18sports.com → Vercel (A record)
3. Change www.sd18sports.com → Vercel (CNAME)
Monitor for 15 minutes: curl sd18sports.com, curl api.sd18sports.com/health
If something breaks: revert DNS to old GoDaddy IP (takes <60s with TTL 60)
```

### 7.3 Post-Launch

```
First 48 hours:
- Monitor Medusa logs: pm2 logs medusa
- Monitor UptimeRobot dashboard
- Check Google Search Console for crawl errors
- Place a real test order and verify Shiprocket label generates
- Brief SD18 on admin dashboard: how to view orders, print labels, update stock
```

---

## Summary Timeline

| Phase | What | Days |
|-------|------|------|
| **0** | Foundation: Oracle, scaffold, CLAUDE.md, types | 1 |
| **1** | Medusa backend: payment, shipping, auth modules | 5-6 |
| **2** | Product migration: images + data to Medusa | 3-4 |
| **3** | Storefront core: browse, product pages, cart | 5-6 |
| **4** | Checkout: address, shipping, payment, confirmation | 5-6 |
| **5** | Accounts + blog | 3-4 |
| **6** | SEO, performance, polish | 3-4 |
| **7** | Deploy + DNS cutover | 1 |
| **Total** | | **26-32 working days** |

---

## What We Don't Build (Yet)

These are deferred to Phase 2 of the engagement, after the site is live and generating revenue:

| Feature | Why Deferred |
|---|---|
| Flipkart integration | Amazon first, stabilise, then Flipkart |
| WhatsApp ordering | Nice-to-have, not core |
| Email marketing (Klaviyo) | Need customer base first |
| Loyalty/rewards program | Need order history first |
| Multi-channel inventory sync | Manual split works at current volume |
| Returns portal | Handle manually for first 3 months |
| Google/Facebook Ads tracking | Launch first, add pixels after |

---

*Document version: 1.0*
*Created: 2026-06-25*
