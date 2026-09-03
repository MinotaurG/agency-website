# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Elevate Strategy — a digital agency website for sports and lifestyle brand consulting. Deployed on Vercel (free tier) with auto-deploys from `main`.

Live: https://agency-website-kohl-two.vercel.app/

## Commands

```bash
pnpm dev          # Start dev server (Turbopack) — localhost:3000
pnpm build        # Production build
pnpm lint         # ESLint
```

Package manager is **pnpm** (not npm or yarn). Use `pnpm dlx shadcn@latest add <component>` for new shadcn components.

## Architecture

**Next.js 16 App Router** with a `(marketing)` route group that wraps all public pages in Navbar + Footer. Sanity Studio is embedded at `/studio` outside the marketing layout.

### Data flow

- **Static data** — Services and case studies live in `src/config/services.ts` and `src/config/case-studies.ts` (planned migration to Sanity CMS later).
- **CMS data** — Blog posts fetched from Sanity via GROQ queries in `src/sanity/lib/queries.ts`.
- **API routes** — `/api/contact` and `/api/newsletter` handle form submissions with Zod validation, honeypot spam protection, and Upstash rate limiting. Leads are stored in Supabase and notifications sent via Resend.
- **Dev fallbacks** — All external services (Supabase, Resend, Upstash, Cloudinary) have graceful fallbacks that log to console when env vars are missing. The app runs fully without them.

### Key conventions

- UI primitives in `src/components/ui/` (shadcn New York style, Slate base)
- Animations use Framer Motion (`scroll-reveal.tsx`, `stagger-children.tsx`, `animated-counter.tsx`)
- Site-wide config in `src/config/site.ts` — change brand name, contact, social links here
- Path alias: `@/` maps to `src/`

## Version-Specific Gotchas

- **Tailwind v4** — No `tailwind.config.ts`. Config lives in `src/app/globals.css` via `@theme inline` and `@utility`. No `@tailwind` directives, no `@apply` with custom classes.
- **Zod v4** — `z.enum()` does not accept `{ required_error }`. Use `.catch()` for defaults.
- **Next.js 16 dynamic routes** — `params` is `Promise<{ slug: string }>` and must be awaited.
- **Sanity v4** — Using `next-sanity` 11.x (not 12.x) due to peer dep constraints.

## Git Workflow

```
main → auto-deploys to Vercel
└── develop → integration branch
     └── feat/... or fix/... → feature branches
```

Merge feature branches into `develop`, then `develop` into `main` when ready to deploy.

## Writing Style Rules

- **Never use em dashes** in any output documents (proposals, pitches, client-facing content). Use commas, periods, or restructure the sentence instead.
