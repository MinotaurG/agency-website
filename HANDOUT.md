# Agency Website — Project Context for AI Chat Continuity

## How To Use This Document
Paste this at the start of a new AI chat, followed by the output of:
\`\`\`bash
ctx share --compact
\`\`\`
This gives the new chat everything it needs — project context from this doc, plus live code state from ctx.

---

## Project Overview

- **What:** Full-service digital agency website
- **Services:** Web Development, SEO, Social Media, Business Development, Finance Consultancy
- **Live URL:** https://agency-website-kohl-two.vercel.app/
- **Repo:** git@github.com:MinotaurG/agency-website.git
- **GitHub:** https://github.com/MinotaurG/agency-website
- **Sanity Studio:** https://agency-website-kohl-two.vercel.app/studio
- **Sanity Project ID:** 3bcszab7
- **Sanity Dataset:** production
- **Status:** MVP deployed and live. All core pages built. Zero cost.

---

## Tech Stack

| Layer | Tool | Version | Notes |
|-------|------|---------|-------|
| Framework | Next.js | 16.1.6 | App Router + Turbopack |
| Language | TypeScript | 5.9.x | Strict mode |
| Styling | Tailwind CSS | v4 | NEW SYNTAX — uses @import "tailwindcss", @theme inline, @utility. NO tailwind.config.ts |
| UI Components | Shadcn/UI | Latest | New York style, Slate base color |
| Animations | Framer Motion | 12.x | Scroll reveals, stagger, counters |
| CMS | Sanity | v4 | Blog only for now. Studio at /studio |
| Validation | Zod | v4 | DIFFERENT API from v3 — no required_error on z.enum |
| Forms | React Hook Form | 7.x | With @hookform/resolvers for Zod |
| Email | Resend | - | Not connected yet (dev fallback logs to console) |
| Database | Supabase | - | Not connected yet (dev fallback logs to console) |
| Rate Limiting | Upstash Redis | - | Not connected yet (dev fallback allows all) |
| Images | Cloudinary | - | Not connected yet |
| Hosting | Vercel | Hobby (free) | Auto-deploys from main branch |
| Package Manager | pnpm | 10.x | NOT npm or yarn |

### Critical Version Notes
- **Tailwind v4:** No @tailwind directives. No tailwind.config.ts. Config lives in CSS via @theme inline and @utility.
- **Zod v4:** z.enum() does not support { required_error }. Use .catch() for defaults.
- **Next.js 16:** params in dynamic routes are Promise<{ slug: string }> — must be awaited.
- **Sanity v4:** Using next-sanity 11.x (not 12.x due to peer dep mismatch).

---

## Project Structure

\`\`\`
agency-website/
├── src/
│   ├── app/
│   │   ├── (marketing)/          # Route group — all public pages
│   │   │   ├── layout.tsx        # Wraps with Navbar + Footer
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── services/
│   │   │   │   ├── page.tsx      # Services overview
│   │   │   │   └── [slug]/page.tsx # Service detail (static from config)
│   │   │   ├── work/
│   │   │   │   ├── page.tsx      # Portfolio overview
│   │   │   │   └── [slug]/page.tsx # Case study detail (static from config)
│   │   │   ├── about/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx      # Blog listing (fetches from Sanity)
│   │   │   │   ├── [slug]/page.tsx # Blog detail (fetches from Sanity)
│   │   │   │   └── loading.tsx   # Skeleton loader
│   │   │   └── contact/page.tsx
│   │   ├── api/
│   │   │   ├── contact/route.ts  # Lead capture API
│   │   │   └── newsletter/route.ts # Newsletter signup API
│   │   ├── studio/[[...tool]]/page.tsx # Embedded Sanity Studio
│   │   ├── layout.tsx            # Root layout (fonts, metadata)
│   │   ├── globals.css           # Tailwind v4 config + theme
│   │   ├── not-found.tsx         # Custom 404
│   │   ├── error.tsx             # Custom error page
│   │   ├── robots.ts             # Dynamic robots.txt
│   │   └── sitemap.ts            # Dynamic sitemap.xml
│   ├── components/
│   │   ├── ui/                   # Shadcn primitives (button, card, input, etc.)
│   │   ├── layout/
│   │   │   ├── navbar.tsx        # Sticky navbar with dropdown + mobile
│   │   │   └── footer.tsx        # Footer with newsletter form
│   │   ├── sections/             # Homepage sections
│   │   │   ├── hero.tsx
│   │   │   ├── services-grid.tsx
│   │   │   ├── stats-counter.tsx # Animated counters
│   │   │   ├── process-steps.tsx
│   │   │   └── cta-section.tsx
│   │   ├── forms/
│   │   │   ├── contact-form.tsx  # Full form with Zod + honeypot
│   │   │   └── newsletter-form.tsx # Email-only, dark/light variants
│   │   └── shared/
│   │       ├── section-header.tsx
│   │       ├── scroll-reveal.tsx
│   │       ├── stagger-children.tsx
│   │       ├── animated-counter.tsx
│   │       ├── portable-text.tsx  # Sanity rich text renderer
│   │       └── json-ld.tsx        # Structured data components
│   ├── config/
│   │   ├── site.ts               # Site metadata, contact, social links
│   │   ├── navigation.ts         # Nav links + footer nav
│   │   ├── services.ts           # 5 services with full detail content
│   │   └── case-studies.ts       # 5 case studies with results/testimonials
│   ├── lib/
│   │   ├── utils.ts              # cn(), formatDate(), absoluteUrl()
│   │   ├── rate-limit.ts         # Upstash wrapper with dev fallback
│   │   ├── email.ts              # Resend wrapper with dev fallback
│   │   └── supabase/
│   │       ├── client.ts         # Browser client
│   │       └── server.ts         # Admin client (API routes only)
│   ├── sanity/                   # Generated by sanity init
│   │   ├── env.ts
│   │   ├── structure.ts
│   │   ├── lib/
│   │   │   ├── client.ts
│   │   │   ├── image.ts          # urlFor() helper
│   │   │   ├── live.ts
│   │   │   └── queries.ts        # GROQ queries
│   │   └── schemaTypes/
│   │       ├── index.ts
│   │       ├── postType.ts       # Extended with excerpt + SEO
│   │       ├── authorType.ts
│   │       ├── categoryType.ts
│   │       └── blockContentType.ts
│   ├── hooks/                    # Empty — for future custom hooks
│   └── types/
│       └── index.ts              # Shared TypeScript interfaces
├── sanity.config.ts              # Sanity Studio config
├── sanity.cli.ts
├── next.config.ts                # Image domains (cdn.sanity.io)
├── components.json               # Shadcn config
├── .env.local                    # Local env vars (not in git)
├── .env.example                  # Template for env vars
└── HANDOUT.md                    # This file
\`\`\`

---

## Data Architecture

### Static Data (in config files — will move to CMS later)
- **Services:** src/config/services.ts — 5 services with title, slug, description, longDescription, icon, color, features, detailedFeatures, process, faqs, stats
- **Case Studies:** src/config/case-studies.ts — 5 case studies with client, industry, services, challenge, solution, results, testimonials

### CMS Data (Sanity)
- **Blog Posts:** title, slug, author (ref), mainImage, categories (ref[]), excerpt, publishedAt, body (blockContent), seo
- **Authors:** name, slug, image, bio
- **Categories:** title, slug, description

### Database (Supabase — not connected yet)
- **leads** table: name, email, company, service, budget_range, message, source, status
- **newsletter_subscribers** table: email, subscribed_at

---

## Environment Variables

\`\`\`bash
# .env.local — current state
NEXT_PUBLIC_SANITY_PROJECT_ID=3bcszab7      # ✅ Connected
NEXT_PUBLIC_SANITY_DATASET=production        # ✅ Connected
SANITY_API_TOKEN=                            # ❌ Not set yet

NEXT_PUBLIC_SUPABASE_URL=                    # ❌ Not connected
NEXT_PUBLIC_SUPABASE_ANON_KEY=               # ❌ Not connected
SUPABASE_SERVICE_ROLE_KEY=                   # ❌ Not connected

RESEND_API_KEY=                              # ❌ Not connected
UPSTASH_REDIS_REST_URL=                      # ❌ Not connected
UPSTASH_REDIS_REST_TOKEN=                    # ❌ Not connected
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=           # ❌ Not connected

NEXT_PUBLIC_SITE_URL=http://localhost:3000   # Local only — Vercel has its own
\`\`\`

All services have graceful dev fallbacks — app works fully without any external service configured. They just log to console instead.

---

## Vercel Environment Variables

\`\`\`
NEXT_PUBLIC_SANITY_PROJECT_ID = 3bcszab7
NEXT_PUBLIC_SANITY_DATASET = production
NEXT_PUBLIC_SITE_URL = https://agency-website-kohl-two.vercel.app
\`\`\`

---

## Git Workflow

\`\`\`
main (production — auto-deploys to Vercel)
└── develop (integration branch)
     └── feat/feature-name (feature branches)
     └── fix/bug-name (fix branches)

Flow:
1. git checkout develop
2. git checkout -b feat/new-feature
3. Build, test, commit
4. git checkout develop && git merge feat/new-feature
5. git branch -d feat/new-feature
6. When ready to deploy: git checkout main && git merge develop && git push
\`\`\`

---

## Completed Work

\`\`\`
✅ Homepage with hero, services grid, animated stats, process, CTA
✅ Services overview page (/services)
✅ 5 service detail pages with features, process, FAQ, stats, cross-links, JSON-LD
✅ Work/portfolio overview (/work)
✅ 5 case study detail pages with results, challenge/solution, testimonials
✅ About page with story, values, timeline, team
✅ Contact page with validated form + API route
✅ Blog listing from Sanity CMS (/blog)
✅ Blog detail page with portable text rendering
✅ Sanity Studio embedded at /studio
✅ Newsletter signup in footer + API route
✅ Custom 404 and error pages
✅ Dynamic sitemap.xml and robots.txt
✅ JSON-LD structured data (Organization, Service, FAQ)
✅ Scroll reveal + stagger + animated counter animations
✅ Blog loading skeleton
✅ SEO metadata on every page
✅ Mobile responsive throughout
✅ Deployed to Vercel at $0/month
✅ 1 test blog post published
\`\`\`

---

## Roadmap — What's Next

### Priority 1: Content (no code needed)
\`\`\`
□ Add 3-5 more blog posts via /studio
□ Replace placeholder team members with real data
□ Replace placeholder client logos
□ Add real OG image and favicon
□ Update siteConfig with real contact info
\`\`\`

### Priority 2: Connect Free Services
\`\`\`
□ Supabase — create tables, add env vars → leads save to DB
□ Upstash Redis — add env vars → rate limiting goes live
□ Resend — verify domain, add env vars → emails send
□ Cloudinary — add env vars → image optimization
□ Google Analytics + Search Console
\`\`\`

### Priority 3: Custom Domain
\`\`\`
□ Buy domain (~$10-15/year)
□ Add to Vercel → Settings → Domains
□ Update DNS, env vars, Sanity CORS
\`\`\`

### Priority 4: CMS Migration
\`\`\`
□ Move case studies from config to Sanity
□ Move team members to Sanity
□ Add testimonials collection to Sanity
□ Add FAQ collection to Sanity
\`\`\`

### Priority 5: Advanced Features
\`\`\`
□ Cal.com booking integration
□ Client portal with auth
□ Lead magnet / free guide download
□ A/B testing on CTAs
□ Email automation sequences
\`\`\`

---

## My Working Style (for AI)

1. **Step by step** — one thing at a time, test before moving on
2. **Use cat/echo** — create files from command line, not manual editing
3. **Use ctx** — track progress with ctx log, ctx todo add/done, ctx bug add, ctx decision add
4. **Git branches** — always create feature branch off develop, merge back, then to main for deploy
5. **Free tools only** — no paid services until the agency has paying clients
6. **Explain why** — I want to learn, not just copy-paste
7. **Fix issues immediately** — don't skip errors, resolve before moving on
8. **OS:** Arch Linux on WSL2 (Windows)
9. **Browser:** Windows Firefox (via \$BROWSER env var for WSL)
10. **Editor:** VS Code
11. **Shell:** zsh
12. **Package manager:** pnpm (NOT npm or yarn)
13. **GitHub username:** MinotaurG
14. **GitHub auth:** SSH (git@github.com:...)
15. **GitHub CLI:** gh (installed and authenticated)

---

## Known Gotchas

1. **Tailwind v4 syntax** — no @tailwind, no @apply with unknown classes, use @theme inline and @utility
2. **Zod v4** — z.enum() has different API, no required_error option
3. **Next.js 16 params** — dynamic route params are Promise, must await
4. **Sanity init can delete files** — always commit before running sanity init
5. **WSL browser** — use \$BROWSER variable pointing to Windows Firefox/Edge
6. **src/app/page.tsx** — if this exists, it overrides (marketing) route group for /
7. **Shadcn init** — may not create components on first run, install individually with pnpm dlx shadcn@latest add <component>

---

## How to Resume

\`\`\`bash
cd ~/projects/work/agency-website
ctx share --compact    # Copy this output
\`\`\`

Paste this HANDOUT.md first, then the ctx share output, then tell the AI what you want to work on next.
