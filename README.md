# HVOF Site 2026

Modern marketing + lead-gen site for **Hudson Valley Office Furniture**. Next.js 16 rebuild that will replace the legacy WordPress site at [thewowguys.com](https://thewowguys.com) after sign-off.

**Live preview:** https://hvof-site-2026.vercel.app
**Admin (Floorplan):** https://hvof-site-2026.vercel.app/admin/login

## Pickup-from-anywhere

If you are a contributor (or AI agent) opening this repo for the first time, read **[`docs/HANDOFF.md`](./docs/HANDOFF.md)** before writing code. It has the full project state, design rules, and pending work.

If you have credentialed access (the Cesar/CQ Marketing flow), there is a private `CLAUDE.md` in the parent Dropbox folder that holds SSH credentials, the admin password, and other secrets. It is not in this repo on purpose.

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm start
```

Pull latest env from Vercel (Marketplace integrations included):

```bash
vercel env pull .env.local --environment=production --yes
```

Node 22+, pnpm 10+. Repository auto-deploys to Vercel on push to `main`.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2 App Router (Turbopack) |
| UI | shadcn/ui (Radix base) + Tailwind CSS v4 |
| Animation | `motion/react` |
| State (cart) | Zustand + localStorage persist |
| Type | Inter Tight (display) / Inter (body) / JetBrains Mono via `next/font/google` |
| Forms | Native React, posts to `/api/lead` and `/api/quote`, Resend transactional email |
| Lead store | Neon Postgres (HVOF-DB) via `@neondatabase/serverless`. In-memory fallback for local dev. |
| Admin | `/admin` (Floorplan), HMAC cookie auth, light/dark theme |
| Analytics | GA4 + Meta Pixel via `@next/third-parties` (env-gated) |
| Reporting data plane | **CQ Signal** (separate Next.js app) via REST. Floorplan reads `/api/v1/businesses/hudson-valley-office-furniture/{snapshot,brief,recommendations}` and renders in HVOF tokens. Mock fallback while the Signal contract is being shipped. |
| Hosting | Vercel (Fluid Compute) |
| Image CDN | thewowguys.com WP CDN + AIS Inc image library + local `/public/products/` |

## Environment variables

Copy `.env.example` to `.env.local`, fill what you need locally, manage in production with `vercel env add` (use `printf "value"` not `echo` to avoid trailing newlines):

```
NEXT_PUBLIC_GA_ID         GA4 measurement ID
NEXT_PUBLIC_FB_PIXEL_ID   Pixel ID (pending)
RESEND_API_KEY            Transactional email
LEAD_EMAIL_TO             cesar@creativequalitymarketing.com
LEAD_EMAIL_FROM           "HVOF Site <noreply@thewowguys.com>"

ADMIN_PASSWORD            Floorplan admin gate
ADMIN_SESSION_SECRET      Long random string for HMAC

# Auto-managed by the Neon Marketplace integration
DATABASE_URL              Pooled, primary
DATABASE_URL_UNPOOLED     Direct
POSTGRES_*, PG*, NEON_PROJECT_ID

# CQ Signal data plane (set both, or leave both unset for mock mode)
SIGNAL_API_BASE           e.g. https://cq-signal-app.vercel.app
SIGNAL_API_KEY            sigk_live_... issued from Signal Settings → Agents & AI
```

## Routes

### Public (under `/app/(public)/`)

| Path | What it is |
|---|---|
| `/` | Hero slider, From Concept, Trusted By (cream), Categories grid (9 webp icons), Interactive Gallery, Featured Seating + Desks, Featured Clients, Why HVOF, **Service Areas (8 county tiles)**, Virtual Tour CTA, Testimonial, Showroom invite, FAQ, Newsletter, ScrollText closer |
| `/about` | Numbers, story, install-photo team panels, HVOF-30 video |
| `/nys-contracts` | All 41 manufacturer outbound links |
| `/contact` | **Simple traditional contact form** (name, email, phone, subject, message). Pointer to /quote-request below. |
| `/quote-request` | **Multi-step Quote Request form**, yellow theme, numbered round indicators. Steps: audience → branch → hear+notes → contact LAST → submit. Reads `?product=<sku>` to prefill notes. |
| `/quote` | RFQ cart submit |
| `/giveaway` | Q2 2026 anniversary giveaway. Hero is the actual desk photo. |
| `/furniture` + 9 categories | seating (20 T-series "Basic Tasking and Ergonomic" chairs + 4 placeholders), desks, conference, **panel-systems-and-pods (renamed from "pods")**, healthcare, education, reception, preowned, systems |
| `/furniture/[category]/[sku]` | Dynamic product detail. 30+ SKUs. |
| `/furniture/[category]/style/[look]` | **"Shop the look" detail** (seating + desks). Curated picks + "starting at" + lead CTA. Driven by `lib/looks.ts`. |
| `/gallery` | Masonry + lightbox |
| `/e-catalog`, `/showroom`, `/virtual-tour`, `/privacy` | |
| `/faq` | Generic FAQ list, footer-linked. Category pages show a preview + "See more FAQs" (`lib/faqs.ts`). |
| `/office-furniture-{city}-ny` | 12 cities |
| `/office-furniture-{county}-county-ny` | 8 counties (cities link to city pages where one exists) |
| `/office-furniture-hudson-valley-ny` | Region |

### Admin (Floorplan)

| Path | What it is |
|---|---|
| `/admin/login` | Public, password gate |
| `/admin` | Dashboard: stat tiles, recent leads, quick links, storage status |
| `/admin/leads` | Pipeline table, filterable by formType (All / Quote Request / Sell-to-Us / Giveaway) |
| `/admin/training` | Agent Training questionnaire. 13 sections, ~67 questions, autosaves to localStorage, on send writes to Neon and emails the markdown packet via Resend. |
| `/admin/reports` | **Full report surface**. Range tabs (7d / 30d / 90d / 1y), hero traffic card, KPI tiles, channel breakdown, top sources + landings, native lead pipeline, Signal recommendations, brief markdown. Pulls from CQ Signal when `SIGNAL_API_BASE` is set, otherwise renders a realistic HVOF mock. |
| `/admin/knowledge-base`, `/admin/agents`, `/admin/plan` | Stubs + live data where applicable |

### API

`/api/lead`, `/api/quote`, `/api/admin/login`, `/api/admin/logout`. Permanent redirects: `/work` → `/gallery`, `/furniture/nys-contracts` → `/nys-contracts`. `/admin` and `/api` disallowed in robots.txt.

## Project structure

```
src/
├── app/
│   ├── layout.tsx                     html/body/fonts/schema/analytics only
│   ├── globals.css                    Brand tokens
│   ├── opengraph-image.png            1200x630 share card (logo on black)
│   ├── icon.png, apple-icon.png       Branded favicons (logo on black)
│   ├── favicon.ico
│   ├── (public)/                      All public routes (route group, no URL prefix)
│   │   ├── layout.tsx                 Header + Footer + QuoteCartIndicator
│   │   ├── page.tsx                   Home
│   │   ├── about/, nys-contracts/, gallery/, e-catalog/, showroom/, virtual-tour/, privacy/, giveaway/
│   │   ├── contact/                   Simple form
│   │   ├── quote-request/             Multi-step lead form
│   │   ├── quote/                     RFQ cart submit
│   │   ├── furniture/                 Catalog overview + 9 categories + dynamic [sku]
│   │   ├── office-furniture-{city}-ny/ 12 cities
│   │   ├── office-furniture-{county}-county-ny/ 8 counties
│   │   └── office-furniture-hudson-valley-ny/
│   ├── admin/
│   │   ├── login/                     Public login + form
│   │   └── (app)/                     Protected route group (auth check in layout)
│   │       ├── layout.tsx             requireAdmin() + sidebar + topbar
│   │       ├── page.tsx               Dashboard
│   │       ├── leads/page.tsx
│   │       ├── knowledge-base/page.tsx
│   │       ├── agents/page.tsx
│   │       ├── plan/page.tsx
│   │       └── reports/page.tsx
│   ├── api/
│   │   ├── lead/route.ts
│   │   ├── quote/route.ts
│   │   └── admin/{login,logout}/route.ts
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── admin/                         Sidebar, topbar, theme toggle, theme init script
│   ├── analytics/                     GA4 + Meta Pixel
│   ├── forms/                         QuoteRequestForm, SimpleContactForm
│   ├── motion/                        FadeIn, Stagger, ScrollText (snap-pinned)
│   ├── seo/json-ld.tsx                Schema components
│   ├── sections/                      Hero, FAQ, CategoryTemplate, ShopTheLook, SampleNotice, LocalLandingTemplate, CountyLandingTemplate, TrustedBy, NewsletterSignup, VirtualTourCTA, ...
│   ├── quote/                         AddToQuoteButton, ProductCard, ProductDeck (mobile swipe deck), QuoteCart, QuoteCartIndicator
│   ├── site/                          Header, Footer, Logo, social-icons, FurnitureMegaMenu
│   └── ui/                            shadcn primitives (Radix base)
└── lib/
    ├── site.ts                        Brand + nav + manufacturers + cities + counties + CITIES_WITH_PAGES
    ├── images.ts                      Centralized image refs (mostly WP CDN URLs)
    ├── products.ts                    Product catalog (50+ SKUs)
    ├── faqs.ts                        Generic site-wide What's-Included + FAQ content
    ├── looks.ts                       "Shop the look" data (3 looks per category)
    ├── quote-cart.ts                  Zustand cart store
    ├── leads-store.ts                 Neon Postgres + in-memory fallback
    ├── admin-auth.ts                  HMAC cookie auth helpers
    ├── local-faqs.ts                  City FAQ generator
    ├── training-questions.ts          /admin/training schema
    ├── training-store.ts              Neon training_submissions table
    ├── signal/                        CQ Signal data plane consumer
    │   ├── types.ts                   Contract types (snapshot, brief, recommendations)
    │   ├── mock.ts                    Realistic HVOF mock for 7d / 30d / 90d / 1y
    │   ├── client.ts                  fetchSnapshot/Brief/Recommendations, env-gated mock fallback
    │   └── lead-ingest.ts             Fire-and-forget POST to Signal's /api/v1/leads/ingest
    └── utils.ts                       cn() helper
```

`src/components/admin/report/` holds the report UI primitives (DeltaPill, TrendChart, ChannelDonut, MetricTile, SectionCard, RangeTabs, StatusPill, RecommendationsList, BriefMarkdown, MockBanner). All hand-rolled SVG, no chart library, in HVOF tokens.

## Brand tokens

In `src/app/globals.css`. **Do not introduce other yellows or fonts.**

- `--brand-yellow` `#E7C81F` (locked)
- `--brand-yellow-hover` `#d4b71c`
- `--brand-ink` `#000000`, `--brand-paper` `#fff`, `--brand-cream` `#f5f5f5` (Trusted-By bar)
- Display Inter Tight, Body Inter, Mono JetBrains Mono
- Base font-size is **fluid**: root `clamp(14px, 0.7rem + 0.32vw, 20px)`. Everything is rem-based, so all text scales from it (~14px phone, ~16px laptop, up to 20px on large screens/TVs)
- All h1/h2/h3 use `font-semibold` everywhere

## Design rules (non-negotiable)

1. **No em-dashes anywhere.** Replace with periods or commas.
2. **No emojis.** Use the webp icons in `/public/icons/` and SVG brand icons in `components/site/social-icons.tsx`.
3. **No numbered prefixes on cards** (no `01`, `02`, etc.). No slide counters. No fake bios on team cards.
4. **One yellow only:** `#E7C81F`.
5. **Header is solid black** with a full-color logo always (now 26% larger).
6. **Big-headline closer CTAs use `<ScrollText />`** with the snap-to-center pin.
7. **Card hover:** brand-yellow border at rest, ring + lift on hover (`.card-interactive` utility).
8. **Get a Quote button hover**: white background, BLACK text. Do not let it go dark on the black header.
9. **Product card images**: square + object-contain on white, padded, no zoom on hover.
10. **Trusted-By bar**: cream background, grayscale logos.
11. **No "AV"** → "technology-integrated". **No "cubicles"** → "panel systems". **No "same-day"/"24-hour" promises** → "promptly". **No unauthorized brand names** (Steelcase/Herman Miller/Knoll/Humanscale/HON) in non-preowned copy. Founded **1986**.
12. **Typography is fluid** (one root clamp); don't add fixed px font-sizes that fight it.
13. **"Shop the look"**: image-first look tiles per category; the price range is the budget signal, not a tier label.
14. **All prices are "starting at ~$X" (approximate).** Every displayed price carries a `~` prefix; nothing is a fixed/final price. Cart + purchase-order email read "Starting at ~$X each" / "Estimated starting total." Only the T-series *products* are locked, not their prices.
15. **Team follow-up is "as soon as possible"** (never a fixed time window like "4 business hours").
16. **Quote contact prompt is "Who can we contact about your quote?"**
17. **"Shop the Look" CTA is a brand-yellow pill.** The three seating looks: Basic Tasking and Ergonomic / Conference and Executive / Lounge and Guest.
18. **Mobile product listings use `<ProductDeck>`** (a swipeable stacked deck: centered card front, neighbors peeking, native scroll-snap); desktop stays the grid.

## Quote cart vs Quote Request

- **`/quote-request`** is the multi-step lead form (yellow theme, numbered indicators, project info first → contact LAST). Replaces Typeform JLIMOo51. Posts to `/api/lead` with `formType: "main-lead"`.
- **`/quote`** is the product cart. Add chairs and showcase items via `<AddToQuoteButton />`. Zustand store at `src/lib/quote-cart.ts`, localStorage key `hvof-quote-cart`. Floating yellow indicator. Submits to `/api/quote`.
- **`/contact`** is a simple traditional contact form for general inquiries.
- Showcase products (no price) link to `/quote-request?product=<sku>` via the **Inquire** button on their card.

No Stripe, no checkout. Payment offline after the quote is finalized.

## Lead persistence (Neon Postgres)

Provisioned via Vercel Marketplace as **HVOF-DB**. `src/lib/leads-store.ts` reads/writes Postgres via `DATABASE_URL` when set, falls back to a globalThis-pinned in-memory store otherwise. Schema (single `leads` table with id/received_at/form_type + jsonb payload) is created lazily on first call.

`/api/lead` calls `recordLead()` after the Resend email. Floorplan dashboard reads from the same store.

The Neon integration is currently attached to Production + Preview only. Local `pnpm dev` falls back to in-memory until you also attach to Development from the Vercel Storage tab.

## Floorplan admin

The HVOF backend.

- Brand: "Floorplan" (mirrors TZ Electric's "Switchboard").
- Auth: HMAC-signed cookie via `lib/admin-auth.ts`. Single shared `ADMIN_PASSWORD` env var. 7-day session.
- Theme: light/dark toggle, `localStorage` persist, inline init script prevents flash.
- Pages: Dashboard, Leads, Knowledge Base, Agents, Plan, Reports.

To rotate the admin password:

```bash
vercel env update ADMIN_PASSWORD <env> --yes
# paste new value (use printf, not echo, to avoid trailing newline)
vercel deploy --prod --yes
```

## Deployment

```bash
# Pushing to main auto-deploys to Vercel
git push

# Force a deploy from local
vercel deploy --prod --yes
```

The Vercel project is on the `cq-marketings-projects` scope. Future plan: transfer to a dedicated HVOF team via the Vercel dashboard once the `hvofmarketing@gmail.com` account is set up.

## Important Next.js 16 notes

This is **not the Next.js you know.** Read `node_modules/next/dist/docs/01-app/` before writing routing or data-fetching code. The `AGENTS.md` at the repo root enforces this for AI agents.

Key changes from 15:
- `params` is a `Promise` in dynamic routes: `const { sku } = await params`.
- Public routes live under `/app/(public)/` route group (refactored 2026-05-08 so admin gets its own clean shell).
- shadcn defaults to Base UI now; this repo was re-init'd to Radix base. Don't switch back.
- `async headers()` in `next.config.ts` is correct for response-header config. The Vercel plugin's validator complains; that's a false positive.

## What's done, what's pending

See [`docs/HANDOFF.md`](./docs/HANDOFF.md) for the full state.

Highlights:

- ✓ **Basic Tasking and Ergonomic** seating look fully built: 20 real curated task chairs (HVOF T-01..T-20) with real "starting at" prices ($229–$859); seating looks regrouped to three (Basic Tasking and Ergonomic / Conference and Executive / Lounge and Guest)
- ✓ **"Starting at ~$X" approximate pricing sitewide** + cart / purchase-order framing ("Estimated starting total", "as soon as possible" follow-up, "Who can we contact about your quote?")
- ✓ **Mobile swipeable stacked product deck** (`<ProductDeck>`, native scroll-snap) — desktop stays the grid
- ✓ **"These aren't your only options" notice** (`SampleNotice`) across category / look / product pages + furniture overview
- ✓ Cart findability: fixed floating pill + header cart link + footer link; full-width header; mega-menu hover fix; sleek shop-the-look pill CTA
- ✓ **"Shop the look"** image-first category navigation (mockup) on Seating + Desks: look tiles, look detail pages, budget shown as a price range, AI-placeholder imagery
- ✓ **Furniture mega menu** (centered, wide: categories + featured looks + CTA card)
- ✓ **Responsive fluid typography** (one root clamp scales all text phone→TV)
- ✓ Site-wide copy pass + locked voice rules (AV→technology-integrated, cubicles→panel systems, no "same-day"→"promptly")
- ✓ Generic, site-wide What's-Included + FAQ with a dedicated `/faq` page
- ✓ ~44 unique public routes deployed (12 city pages, 8 county pages, Hudson Valley region, all 9 furniture categories, dynamic product details, gallery, e-catalog, showroom, virtual tour, contact, quote, giveaway, NYS contracts, quote-request)
- ✓ 50+ products across the catalog (13 priced chairs + 36+ showcase items)
- ✓ All 41 NYS Contract manufacturers wired with outbound links
- ✓ Multi-step Quote Request form replacing Typeform JLIMOo51
- ✓ Floorplan admin with login, dashboard, leads pipeline, KB/agents/plan/reports stubs, light/dark toggle
- ✓ Neon Postgres lead pipeline (HVOF-DB, durable in production)
- ✓ Service-areas section on home, county pages link to city pages
- ✓ Giveaway page in nav + footer with the actual Q2 2026 desk photo
- ✓ OG share card + branded favicon + Apple icon (logo on black)
- ✓ Trusted By marquee with 11 partner logos (cream + grayscale + larger)
- ✓ Mobile horizontal overflow fixed
- ✓ Get a Quote button hover legibility fixed (white bg, black text)
- ✓ Agent Training questionnaire (`/admin/training`, 13 sections, markdown email packet)
- ✓ CQ Signal data-plane consumer wired: types, mock, fetch client, `/admin/reports` page in HVOF tokens, env-gated lead-ingest webhook from `/api/lead`. Mock until `SIGNAL_API_BASE` is set.

Pending (priority order):

- Swap the AI placeholder "shop the look" tiles for Dan's real grouped photos; extend shop-the-look to the rest of the categories; wire Mark's tier "starting at" prices; replace misleading exact prices with ranges
- E-catalog "quick-ship + 75 vendors" disclaimer / rebrand (COE e-commerce platform under evaluation)
- Live Signal credentials: paste `SIGNAL_API_BASE` and `SIGNAL_API_KEY` once the Signal-side session ships v1 REST (see `SIGNAL-HANDOFF.md` in the Dropbox project root)
- Sell Your Furniture form + own /sell-your-furniture page (Typeform JAHzhOUt)
- Native giveaway entry form on /giveaway (Typeform e5SrmqW1)
- Weekly leads digest via Vercel Cron + Resend (now feasible with persistence)
- Knowledge base content authoring + display
- Concierge web-chat agent
- More product photos pulled into Desks / Conference / Healthcare categories
- Service pages (/services/space-planning, /installation, /delivery)
- Real WooCommerce-style descriptions for chairs
- Marshall + Sterling case study at /gallery/marshall-sterling
- DNS cutover, Google Business Profile, Search Console sitemap
- Meta Pixel ID
- GA Analytics MCP unblock (org policy issue documented in private CLAUDE.md)
- Rotate ADMIN_PASSWORD off the dev placeholder

## Decisions

| Date | Decision | Why |
|---|---|---|
| 2026-05-07 | Pivot from WP optimization to full Next.js rebuild | App-like feel, faster pages, lead-gen optimized |
| 2026-05-07 | shadcn re-init from Base UI to Radix base | Familiar API, AI Elements compatibility |
| 2026-05-07 | IBM Plex → Inter Tight + Inter | More modern, better readability |
| 2026-05-07 | Brand yellow locked to `#E7C81F` | Eliminate drift |
| 2026-05-07 | Vercel project moved to `cq-marketings-projects` | TZ Electric was an unrelated client team |
| 2026-05-08 | NYS Contracts moved to root `/nys-contracts` | Mirrors live site primary nav |
| 2026-05-08 | `/work` redirects to `/gallery` | Gallery already covers work showcase |
| 2026-05-08 | Team panels show install photos | Better fits the message |
| 2026-05-08 | All h1/h2/h3 sweepingly bolded | Consistency |
| 2026-05-08 | Em-dashes globally removed | Reads more human |
| 2026-05-08 | Native multi-step Quote Request replaces Typeform JLIMOo51 | Conversion-optimized, branded, no third-party load |
| 2026-05-08 | /contact swapped to simple form, /quote-request gets the multi-step | Clearer separation: contact = inquiry, quote-request = project intake |
| 2026-05-08 | Pods category renamed "Panel Systems and Pods" | Better describes the contents |
| 2026-05-08 | Floorplan brand for the admin | Office-furniture industry term, distinct from TZ's "Switchboard" |
| 2026-05-08 | Public routes moved into `/app/(public)/` | Keeps public chrome out of admin |
| 2026-05-08 | Neon Postgres for lead pipeline | Durable, serverless-friendly via @neondatabase/serverless |
| 2026-05-08 | Trusted-By bar lightened to cream | Logos read better on light bg |
| 2026-05-11 | Agent Training questionnaire built into Floorplan | Bootstrap the HVOF agent from team knowledge before any code |
| 2026-05-18 | CQ Signal as the reporting data plane (not per-client wiring) | Build connectors once; every client admin pulls via REST. HVOF Floorplan is the first consumer. See `SIGNAL-HANDOFF.md`. |
| 2026-05-29 | Category nav reframed as "shop the look" (image-first; budget via price range) | Matches how buyers shop; no tier labels or jargon |
| 2026-05-29 | Generic site-wide What's-Included + FAQ; warranty questions removed | Old per-product placeholders were untrue / a liability |
| 2026-05-29 | Voice rules: AV→technology-integrated, cubicles→panel systems, no "same-day"→"promptly", no unauthorized brand names | Accuracy + legal |
| 2026-05-30 | Fluid typography (one root clamp); Furniture mega menu | Responsive text phone→TV; higher-end nav |
| 2026-06-05 | First seating look "Basic Tasking and Ergonomic" built with 20 real T-series chairs + real "starting at" prices; seating looks regrouped to 3 | Perfecting the catalog one subcategory at a time |
| 2026-06-05 | All prices shown "starting at ~$X" (approximate); nothing fixed | Customers need room to add options; final price is set with a rep |
| 2026-06-05 | Mobile product listings = swipeable stacked `<ProductDeck>` | Native, interactive phone browsing; desktop stays the grid |
| 2026-06-05 | Ship straight to the live link (no local preview) | Owner reviews on production; faster iteration |

## Notes

- The Dropbox folder marks `node_modules/` and `.next/` as ignored via `xattr com.dropbox.ignored 1` so they don't churn through sync. Re-apply after a fresh clone.
- See `AGENTS.md` for AI-agent instructions.
- For credentials and the full handoff including SSH password and admin credentials, see the parent Dropbox folder's `CLAUDE.md` (not in git).
