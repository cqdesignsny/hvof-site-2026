# HVOF Site 2026

Modern marketing site for **Hudson Valley Office Furniture** ([thewowguys.com](https://thewowguys.com)). A Next.js 16 rebuild of the existing WordPress site, designed to convert high-net-worth buyers and facilities directors into installations.

> **Status:** Demo build. The legacy WordPress site stays live at thewowguys.com. This Next.js site deploys to a Vercel preview URL and replaces production after sign-off.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| UI | shadcn/ui (Radix primitives) + Tailwind CSS v4 |
| Animation | Motion (`motion/react`) |
| Type | IBM Plex Sans / Sans Condensed / Mono via `next/font/google` |
| Forms | Native `<form>` posting to `/api/lead` (Resend optional) |
| Analytics | GA4 via `@next/third-parties` + Meta Pixel |
| Hosting | Vercel |
| Images | next/image with the existing thewowguys.com WP CDN as remote source |

## Getting started

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # production build (turbopack)
pnpm start          # serve the prod build
```

> Node 22+ and pnpm 10+ recommended.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=000000000000000
RESEND_API_KEY=re_xxx
LEAD_EMAIL_TO=cesar@creativequalitymarketing.com
```

In production, manage these with `vercel env add`.

## Routes

| Path | Status |
|---|---|
| `/` | Home — hero, featured installs, services, why HVOF, testimonial, showroom invite, FAQ, closer |
| `/about` | Story, numbers, four pillars, showroom photos |
| `/work` | Selected work gallery |
| `/showroom` | Visit info, hours, parking, what to expect, map |
| `/contact` | Contact info + form, map |
| `/furniture/seating` | Sample category page (template) |
| `/office-furniture-fishkill-ny` | Sample local landing page (template) |
| `/office-furniture-poughkeepsie-ny` | Sample local landing page |
| `/privacy` | Privacy policy stub |
| `/api/lead` | Lead intake endpoint |
| `/sitemap.xml` | Auto-generated from `app/sitemap.ts` |
| `/robots.txt` | Auto-generated from `app/robots.ts` (AI bots allowlist) |

## Project structure

```
src/
├── app/
│   ├── layout.tsx                          Root layout, fonts, header, footer, schema, analytics
│   ├── page.tsx                            Home page
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── work/page.tsx
│   ├── showroom/page.tsx
│   ├── privacy/page.tsx
│   ├── furniture/seating/page.tsx
│   ├── office-furniture-fishkill-ny/page.tsx
│   ├── office-furniture-poughkeepsie-ny/page.tsx
│   ├── api/lead/route.ts                   POST endpoint for the contact form
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── analytics/                          GA4 + Meta Pixel
│   ├── motion/                             FadeIn, Stagger primitives
│   ├── seo/json-ld.tsx                     Org, LocalBiz, FAQ, Breadcrumb, Service schemas
│   ├── sections/                           Hero, FAQ, ContactForm, CategoryTemplate, LocalLandingTemplate
│   ├── site/                               Header, Footer, Logo
│   └── ui/                                 shadcn primitives
└── lib/
    ├── site.ts                             Brand + nav constants
    ├── images.ts                           CDN image references
    ├── local-faqs.ts                       City FAQ generator
    └── utils.ts                            cn()
```

## Brand tokens

Defined in `src/app/globals.css` under `@theme inline` and `:root`:

- **Yellow** `#e7c920` (hover `#d4b71c`) — accents, eyebrows, CTAs
- **Ink** `#000000` — dark sections, body text on light
- **Cream** `#f5f5f5` — soft section backgrounds
- **Display font** IBM Plex Sans Condensed
- **Body font** IBM Plex Sans
- **Mono font** IBM Plex Mono — eyebrows, prices, technical labels

## Image assets

Currently all hero / case-study / install photos load from the existing WordPress CDN at `thewowguys.com/wp-content/uploads/`. See `src/lib/images.ts` for the manifest.

When migration is complete, move source files into `public/images/` and update `IMG` references.

## Deployment

```bash
# First-time link
vercel link

# Preview deploy (creates a unique URL per push)
vercel deploy

# Production
vercel deploy --prod
```

Or push to `main` after connecting the GitHub repo in the Vercel dashboard.

## What was migrated from the WordPress site

- Brand identity (colors, fonts, tone)
- Approved imagery (Marshall + Sterling, Marist installs)
- All content from the 12 local landing pages (compressed into reusable template + 2 demo cities)
- Schema markup (Organization, LocalBusiness/FurnitureStore, FAQPage, BreadcrumbList, Service)
- Address, hours, social links, areas served
- FAQ content (consolidated)

## What still needs to ship before cutover

- Remaining 10 city pages (Newburgh, Middletown, Kingston, Beacon, Wappingers Falls, White Plains, New Paltz, Hyde Park, Peekskill, Rhinebeck) — copy the Fishkill page and edit
- Furniture categories: Desks, Conference, Systems, Healthcare, Pods, Education, Pre-Owned, NYS Contracts (8 more)
- Full Marshall + Sterling and Marist case study pages
- Blog (if keeping)
- WooCommerce — confirm whether the new site sells direct or just routes to inquiries
- Real lead form integration (Resend, Typeform, or Vercel Form)
- Real GA4 + Meta Pixel IDs in Vercel env
- DNS cutover plan (currently thewowguys.com points to WP/Hostinger)

## Decisions

| Date | Decision | Why |
|---|---|---|
| 2026-05-07 | Build new site on Next.js 16 + Vercel rather than continue iterating on WordPress | App-like feel, faster pages, lead-gen optimized, easier to maintain at scale |
| 2026-05-07 | Use shadcn/ui with Radix base | Familiar API, AI Elements compatible if needed later |
| 2026-05-07 | Keep IBM Plex font stack | On-brand, technical/editorial feel matches portfolio aesthetic |
| 2026-05-07 | Light-mode default with dark hero blocks | Editorial/portfolio aesthetic, content-first |
| 2026-05-07 | Preserve existing local-page URL structure (`/office-furniture-{city}-ny/`) | SEO continuity from WP site |

## Notes

- The Dropbox folder marks `node_modules/` and `.next/` as ignored via `xattr com.dropbox.ignored 1` so they don't churn through sync.
- See `AGENTS.md` for AI agent instructions specific to Next.js 16 (read bundled docs, not training data).
