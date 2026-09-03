# SD18 Sports — E-Commerce Platform (Medusa v2)

**Client:** SD18 Sports, Asansol, West Bengal
**Status:** Architecture & Learning Phase
**Date:** 2026-06-11

## Document Index

| Doc | What It Covers | Level |
|-----|---------------|-------|
| [Learning Guide](./learning-guide.md) | Medusa from zero to production, with SD18 examples (Levels 0-8) | Beginner → Advanced |
| [System Design](./system-design.md) | Full architecture, infrastructure, data flows, failure handling, deployment | All levels |
| [Build Plan](./build-plan.md) | 7-phase timeline with exact prompts, checklists, and engineering principles | Implementation |
| [Starter Audit](./starter-audit.md) | What the Medusa v2 starter gives us free, what we change, what we add | Implementation |
| Razorpay Module | Payment provider implementation | (coming) |
| Shipping Module | Provider-agnostic fulfillment (Shiprocket first, Delhivery later) | (coming) |

## The Stack

```
Next.js 16 (Storefront)  →  Medusa v2 (Backend)  →  PostgreSQL (Data)
     Vercel                     Railway                  Railway
```

## Why Medusa

- Open source (MIT), full control over code
- Saga-based checkout with automatic compensation on failure
- Inventory locking prevents double-sells
- Payment provider abstraction (we plug in Razorpay)
- Fulfillment provider abstraction (we plug in Shiprocket)
- Built-in admin dashboard for SD18 to manage daily operations
- Price snapshotting ensures order integrity
