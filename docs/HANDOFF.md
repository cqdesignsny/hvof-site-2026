# HVOF Project Handoff

This document is for picking up the project on a new machine, in a new session, or with a new contributor. It does not contain credentials. For credentialed access (SSH, admin password, etc.) the project owner has a separate private file.

Last updated: 2026-05-08

---

## What this project is

A full Next.js 16 marketing + lead-generation site for **Hudson Valley Office Furniture** that will replace the legacy WordPress site at thewowguys.com after sign-off and DNS cutover.

The legacy WordPress site is still live and unchanged. The new Next.js site is at https://hvof-site-2026.vercel.app. Both run in parallel during the rebuild.

The pivot from "WordPress optimization" to "full Next.js rebuild" happened on 2026-05-07.

---

## Architecture at a glance

```
Legacy traffic ─────► thewowguys.com (Hostinger / Divi / WooCommerce)
                              │
                              └─ media + product images shared via WP CDN

New build (active)
─────► hvof-site-2026.vercel.app  ◄───  GitHub: cqdesignsny/hvof-site-2026
              │                          (auto-deploys on push to main)
              ├─ Next.js 16.2 App Router (Turbopack)
              ├─ Tailwind v4
              ├─ shadcn/ui (Radix base)
              ├─ motion/react (animations)
              ├─ Zustand (quote cart state)
              ├─ Neon Postgres (HVOF-DB) for lead pipeline
              └─ Floorplan admin at /admin (password-gated)
```

After approval, DNS for thewowguys.com points at Vercel and the WP stack is decommissioned.

---

## Resume instructions

```bash
cd "/Users/cqstudio/Library/CloudStorage/Dropbox/HVOF/HVOF Site 2026/hvof-site-2026"
pnpm install
pnpm dev          # http://localhost:3000
```

Pull latest env from Vercel (Marketplace integrations, admin password, etc.):

```bash
vercel env pull .env.local --environment=production --yes
```

Node 22+, pnpm 10+. After clone, mark `node_modules` and `.next` Dropbox-ignored:

```bash
xattr -w com.dropbox.ignored 1 node_modules
xattr -w com.dropbox.ignored 1 .next
```

To deploy: push to `main`. Or force a deploy with `vercel deploy --prod --yes`.

---

## Brand tokens (LOCKED)

In `src/app/globals.css`. **Never introduce other yellows or alternate fonts.**

| Token | Value | Use |
|---|---|---|
| `--brand-yellow` | `#E7C81F` | All accents, eyebrows, CTAs, active states |
| `--brand-yellow-hover` | `#d4b71c` | Slight darken for some yellow surfaces |
| `--brand-ink` | `#000000` | Pure black, headlines, header, foreground |
| `--brand-paper` | `#ffffff` | White |
| `--brand-cream` | `#f5f5f5` | Trusted-By bar (was graphite, lightened 2026-05-08) |

Fonts (via `next/font/google`):
- Display: **Inter Tight** (h1/h2/h3, all `font-semibold`, never `font-light`)
- Body: **Inter**
- Mono: **JetBrains Mono** (eyebrows, prices, technical labels)

Base font-size 18px (18.5px at xl+).

---

## Design rules (non-negotiable)

These were called out by the owner across multiple feedback rounds. Do not violate.

1. **No em-dashes anywhere.** Replace with periods or commas.
2. **No emojis.** Custom **webp icons** in `/public/icons/` (chair, desk, classroom, cubicle, doctors-room, round-table). Inline brand SVGs (Facebook, Instagram, LinkedIn) in `src/components/site/social-icons.tsx`.
3. **No "AI-slop" signals:** no numbered prefixes on cards, no slide counters, no fake bios.
4. **One yellow only:** `#E7C81F`.
5. **Header is solid black.** Logo always full-color (`/public/logo.svg`), now 26% larger than the original spec.
6. **Big-headline closer CTAs use `<ScrollText />`.** Snap-pinned. Use it for any new big-text closer.
7. **Card hover:** brand-yellow border at rest, dramatic ring + lift on hover. Use the `.card-interactive` utility.
8. **Get a Quote button hover**: white background, BLACK text. Do not let it go dark on the black header.
9. **Product card images**: square aspect ratio + object-contain on white background, no zoom on hover, padded with breathing room.
10. **Trusted-By bar**: cream background, grayscale logos, tighter spacing.

---

## Routes inventory

About 44 unique pages plus 30+ generated product detail pages, plus a 6-page admin.

### Public

All public routes live under `/app/(public)/` route group as of 2026-05-08, so admin and API don't inherit the public Header/Footer chrome.

| Path | Notes |
|---|---|
| `/` | Hero, From Concept, Trusted By (cream), Categories grid (9 cards w/ webp icons), Interactive Gallery, Featured Seating + Desks, Featured Clients, Why HVOF, **Service Areas (8 county tiles)**, Virtual Tour CTA, Testimonial, Showroom invite, FAQ, Newsletter, ScrollText closer |
| `/about` | Numbers, story, install-photo team panels, HVOF-30 video |
| `/nys-contracts` | All 41 manufacturer outbound links |
| `/contact` | **Simple traditional contact form** (name, email, phone, subject, message). Pointer to /quote-request below. |
| `/quote-request` | **Multi-step Quote Request form**, yellow theme, numbered round indicators. Steps: audience → branch → hear+notes → contact → submit. Reads `?product=<sku>` to prefill notes. |
| `/quote` | RFQ cart submit (separate from /quote-request) |
| `/giveaway` | Q2 2026 anniversary giveaway. Hero is the actual desk photo. Currently links Typeform; pending native form. |
| `/furniture` + 9 categories | Includes **/furniture/pods (renamed "Panel Systems and Pods")** |
| `/furniture/[category]/[sku]` | Dynamic product detail. 30+ SKUs. |
| `/gallery` | Masonry + lightbox |
| `/e-catalog`, `/showroom`, `/virtual-tour`, `/privacy` | |
| `/office-furniture-{city}-ny` | 12 cities |
| `/office-furniture-{county}-county-ny` | 8 counties. Cities link to city pages where one exists (`CITIES_WITH_PAGES` map). |
| `/office-furniture-hudson-valley-ny` | Region |

### Admin (Floorplan)

| Path | Notes |
|---|---|
| `/admin/login` | Public, password gate |
| `/admin` | Dashboard: stat tiles, recent leads, quick links, storage status |
| `/admin/leads` | Pipeline table, filterable by formType |
| `/admin/knowledge-base`, `/admin/agents`, `/admin/plan`, `/admin/reports` | Placeholders + live data where applicable |

### API

| Path | Notes |
|---|---|
| `/api/lead` | POST. Records to Neon, emails via Resend, routes by formType. |
| `/api/quote` | POST. Cart submission. |
| `/api/admin/login`, `/api/admin/logout` | Floorplan auth |

Permanent redirects: `/work` → `/gallery`, `/furniture/nys-contracts` → `/nys-contracts`. `/admin` and `/api` disallowed in robots.txt.

---

## Navigation

Primary nav: Furniture (mega-menu, 8 sub-categories + Giveaway), NYS Contracts, Gallery, E-Catalog, Showroom, About, Contact.

Plus social icons (Facebook + Instagram + LinkedIn) on lg+, phone, and the **Get a Quote** button (yellow → white on hover, links to /quote-request).

Footer Furniture column lists all 8 furniture categories + Giveaway. Footer legal row has a small **Admin** link to /admin.

---

## Quote cart vs Quote Request

These are separate:

- **/quote-request** = the multi-step lead form. Step order: audience → branch (business or individual) → hear+notes → contact LAST → submit. Yellow theme, numbered indicators. Posts to `/api/lead` with `formType: "main-lead"`.
- **/quote** = the product cart. Add chairs and showcase items here, submit when ready. Zustand store at `src/lib/quote-cart.ts`, localStorage key `hvof-quote-cart`. `<QuoteCartIndicator />` floats bottom-right (mobile) / top-right (desktop).
- **/contact** = simple traditional contact form for general inquiries.

Showcase products (those without prices) link to `/quote-request?product=<sku>` via the **Inquire** button on their card; the multi-step form prefills notes with the product name.

---

## Lead persistence (Neon Postgres)

Provisioned via Vercel Marketplace as **HVOF-DB**.

`src/lib/leads-store.ts` reads/writes Postgres via `DATABASE_URL` when set, falls back to a globalThis-pinned in-memory store otherwise. Schema is created lazily on first call.

```
leads
  id text PRIMARY KEY                  (timestamp-prefixed random)
  received_at timestamptz
  form_type text                       'main-lead' | 'sell-furniture' | 'giveaway'
  first_name, last_name, email, phone, company text
  payload jsonb                         catches every form field
  -- indexes: (received_at DESC), (form_type)
```

`/api/lead` calls `recordLead()` after the Resend email. Floorplan dashboard reads `listLeads()` and `getLeadCount()`. The "Storage status" indicator on /admin shows green ("Neon Postgres") in production, yellow ("Set DATABASE_URL") on environments without the integration.

**Caveat**: the Neon integration is currently attached to Production + Preview only. Local `pnpm dev` falls back to in-memory until you also attach to Development from the Vercel Storage tab.

---

## Floorplan admin

The HVOF backend.

- **Brand**: "Floorplan" (chosen 2026-05-08, mirrors TZ Electric's "Switchboard").
- **Auth**: HMAC-signed cookie. Single shared `ADMIN_PASSWORD` env var. 7-day session.
- **Theme**: light/dark toggle, persists in `localStorage` (`hvof-floorplan-theme`). Inline init script prevents flash-of-wrong-theme.
- **Pages**: Dashboard, Leads (filterable), Knowledge Base, Agents, Plan, Reports.

Files:

```
src/app/admin/login/                      login page + form
src/app/admin/(app)/                      protected route group
  layout.tsx                              requireAdmin() + sidebar + topbar
  page.tsx                                dashboard
  leads/page.tsx
  knowledge-base/page.tsx
  agents/page.tsx
  plan/page.tsx
  reports/page.tsx
src/lib/admin-auth.ts                     sign / verify / requireAdmin
src/lib/leads-store.ts                    Neon + in-memory fallback
src/components/admin/                     sidebar, topbar, theme toggle
src/app/api/admin/login/route.ts
src/app/api/admin/logout/route.ts
```

To rotate the admin password: `vercel env update ADMIN_PASSWORD <env> --yes` then `printf "newpass" | ` (use `printf` not `echo` to avoid trailing newline). Then `vercel deploy --prod --yes` to refresh runtime.

---

## Environment variables (live on Vercel)

```
NEXT_PUBLIC_GA_ID         GA4 measurement ID
NEXT_PUBLIC_FB_PIXEL_ID   Pending. Pixel ID Cesar to provide.
RESEND_API_KEY            Transactional email
LEAD_EMAIL_TO             cesar@creativequalitymarketing.com
LEAD_EMAIL_FROM           "HVOF Site <noreply@thewowguys.com>"

ADMIN_PASSWORD            Floorplan admin gate
ADMIN_SESSION_SECRET      Long random string for HMAC

# Neon Marketplace integration (auto-managed, populated for Production + Preview)
DATABASE_URL              Pooled, primary
DATABASE_URL_UNPOOLED     Direct
POSTGRES_*, PG*, NEON_PROJECT_ID
```

CLI gotcha: when adding env vars via `echo "value" | vercel env add ...`, the trailing newline gets captured. Use `printf "value"` instead.

---

## Asset inventory

### `/public`
- `logo.svg`, `logo-light.svg`
- `icons/{chair,desk,classroom,cubicle,doctors-room,round-table}.webp` (Categories grid icons) + legacy SVGs (chair, desk, conference, reception)
- `team/` (currently NOT shown on site, kept in case)
- `partners/marshall-sterling-white.webp`
- `product-placeholder.svg`
- `products/*.{jpg,png}` — chair photos, desks, conference table
- `products/panels/*.jpg` — 9 AIS Divi panel photos (local copies)
- `giveaway/desk-2026-q2.jpg` — current giveaway desk hero

### Brand metadata
- `src/app/opengraph-image.png` — 1200x630 share card (logo on black)
- `src/app/icon.png` (512x512), `apple-icon.png` (180x180), `favicon.ico` — all logo on black

### Remote (whitelisted in `next.config.ts`)
- `thewowguys.com` WP CDN
- `imagelibrary.ais-inc.com` (used on /furniture/systems with `unoptimized` for the Referer requirement)
- `i.ytimg.com`

---

## Important conventions for Next.js 16

This is not the Next.js you know. Read `node_modules/next/dist/docs/01-app/` before writing routing or data-fetching code. The `AGENTS.md` at the repo root enforces this for AI agents.

Key gotchas:
- **`params` is a Promise** in dynamic routes: `const { sku } = await params`.
- **Public routes live under `/app/(public)/` route group**. Admin and API are siblings at /app root. Root layout renders only html/body/fonts/schema/analytics.
- **shadcn defaults to Base UI now.** This repo was re-init'd to Radix base. Don't switch back.
- **`async headers()` in `next.config.ts` is correct** for response-header config. The Vercel plugin's validator complains; it's a false positive.
- **Inline brand icons:** `lucide-react` doesn't ship Facebook / Instagram / LinkedIn icons. They live in `src/components/site/social-icons.tsx`.

---

## What's done

Major milestones (rolling list, latest at top):

**2026-05-08 afternoon**
- Floorplan admin shipped: login + dashboard + leads pipeline + KB/agents/plan/reports placeholders + theme toggle + Footer link.
- Neon Postgres (HVOF-DB) wired via Vercel Marketplace. `lib/leads-store.ts` Postgres-backed with in-memory fallback. Schema lazy-created.
- Public route group refactor: all public routes moved into `/app/(public)/`.
- Multi-step Quote Request form at /quote-request (yellow, numbered round indicators, project info first → contact LAST). /contact swapped to a simple traditional contact form.
- Catalog expansion: 36+ showcase products across desks, conference, healthcare, education, reception, panel-systems-and-pods, preowned. **Pods category renamed "Panel Systems and Pods"**, 9 AIS Divi panel photos copied locally.
- Service-areas section on home (8 county tiles). County pages link cities to dedicated city pages.
- Giveaway page: in nav, in footer, hero swapped to actual Q2 2026 desk photo.
- Branding polish: OG card (logo on black 1200x630), favicon, Apple icon. Mobile horizontal overflow fix. Trusted-By cream + bigger grayscale logos. Nav logo +26%. Get a Quote button hover legible.

**2026-05-07/08 (foundation)**
- Next.js 16 scaffold, shadcn re-init to Radix base.
- Type stack swap from IBM Plex to Inter Tight + Inter + JetBrains Mono.
- Brand yellow locked to `#E7C81F`. All h1/h2/h3 sweepingly bolded. Em-dashes and numbered prefixes removed sitewide.
- Vercel project moved from `tz-electric` to `cq-marketings-projects`.
- 12 city + 8 county + Hudson Valley region landing pages.
- 13 priced chair SKUs with real photos.
- Resend, GA4, LinkedIn URL, env vars, etc.

---

## What's pending (priority order)

**In flight, picking up next session**

1. **Sell Your Furniture form + /sell-your-furniture page.** Recreates Typeform `JAHzhOUt`. Cesar to provide field list.
2. **Native giveaway entry form on /giveaway.** Recreates Typeform `e5SrmqW1`.
3. **Wire Neon to Development env** in Vercel Storage tab so local dev writes to the same DB.

**Lead pipeline / agents**

4. **Weekly leads digest** via Vercel Cron + Resend (lead pipeline now persists, this is unblocked).
5. **Knowledge base content** authoring in Floorplan KB.
6. **Concierge web-chat agent** on customer-facing pages.

**Catalog + content**

7. **More product photos** from WP `Webpage-Product-Gallery-*`.
8. **Service pages**: /services/space-planning, /services/installation, /services/delivery (footer links exist, no pages).
9. **Real WooCommerce-style descriptions** for the 13 chair SKUs.
10. **Marshall + Sterling case study** at /gallery/marshall-sterling.

**Ops / launch**

11. **DNS cutover** when approved. Update `SITE.url` in `lib/site.ts`.
12. **Google Business Profile** claim/verify.
13. **GSC sitemap** submission.
14. **Meta Pixel ID** still pending.
15. **GA Analytics MCP unblock** (org policy issue, see private CLAUDE.md).
16. **Rotate ADMIN_PASSWORD** off the dev placeholder.

---

## Where to look when

- **Brand color or font change** → `src/app/globals.css`
- **Add a city** → copy `src/app/(public)/office-furniture-fishkill-ny/page.tsx`, change `CITY` const, add to `SITE.citiesServed` AND `CITIES_WITH_PAGES` in `lib/site.ts`.
- **Add a product** → append to `PRODUCTS` array in `src/lib/products.ts`. Detail page generates automatically.
- **Add a manufacturer** → `SITE.manufacturers` array in `lib/site.ts`. Renders on `/nys-contracts`.
- **New big-CTA closer** → use `<ScrollText lines={["...", "..."]} ... />` from `components/motion/scroll-text.tsx`.
- **New product image** → drop in `/public/products/{sku}.jpg`, reference from `lib/products.ts`. For panels, use `/public/products/panels/`.
- **New city or category in nav** → `NAV.primary` or `NAV.furniture` in `lib/site.ts`.
- **Hero image for a new page** → check `/lib/images.ts` for the manifest. Heroes are deduped per page; don't reuse one already in service.
- **Admin password change** → `vercel env update ADMIN_PASSWORD <env> --yes` then `printf "newpass" | ` (NOT `echo`). Then `vercel deploy --prod --yes`.

---

## File map

```
hvof-site-2026/
├── README.md                         Public technical readme
├── docs/HANDOFF.md                   ← this file
├── AGENTS.md / CLAUDE.md             AI-agent instructions
├── next.config.ts                    Image hosts + redirects + headers
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── components.json                   shadcn config (Radix base)
├── eslint.config.mjs
├── postcss.config.mjs
├── public/
│   ├── logo.svg, logo-light.svg
│   ├── icons/                        Custom HVOF icons (webp + svg)
│   ├── team/                         Staff portraits (currently unused on site)
│   ├── partners/                     Partner logos
│   ├── products/                     Local product photos (chairs + desks + panels/)
│   ├── giveaway/desk-2026-q2.jpg     Current giveaway desk hero
│   └── product-placeholder.svg
└── src/
    ├── app/
    │   ├── (public)/                 All public routes (home, furniture, contact, etc.)
    │   ├── admin/                    Floorplan: login + (app) protected route group
    │   ├── api/                      Lead, quote, admin login/logout
    │   ├── opengraph-image.png       Share card
    │   ├── icon.png, apple-icon.png, favicon.ico
    │   ├── layout.tsx                html/body/fonts/schema/analytics only
    │   ├── globals.css               Brand tokens
    │   ├── robots.ts, sitemap.ts
    │   └── ...
    ├── components/
    │   ├── admin/                    Sidebar, topbar, theme toggle
    │   ├── analytics/                GA4 + Meta Pixel
    │   ├── forms/                    QuoteRequestForm, SimpleContactForm
    │   ├── motion/                   FadeIn, Stagger, ScrollText
    │   ├── seo/json-ld.tsx           Schema components
    │   ├── sections/                 Page sections
    │   ├── quote/                    Cart components
    │   ├── site/                     Header, Footer, Logo, social-icons
    │   └── ui/                       shadcn primitives
    └── lib/
        ├── site.ts                   Brand + nav + manufacturers + cities + counties + CITIES_WITH_PAGES
        ├── images.ts                 Centralized image refs
        ├── products.ts               Product catalog (50+ SKUs)
        ├── quote-cart.ts             Zustand cart store
        ├── leads-store.ts            Neon Postgres + in-memory fallback
        ├── admin-auth.ts             HMAC cookie auth helpers
        ├── local-faqs.ts             City FAQ generator
        └── utils.ts                  cn() helper
```

---

## Decisions and pivots

| Date | Decision | Rationale |
|---|---|---|
| 2026-03-06 | (Legacy) Build on existing WP/Divi stack | Original direction, preserved in `DESIGN-PLAYBOOK.md` |
| 2026-05-07 | Pivot to full Next.js rebuild | App-like feel, faster pages, lead-gen optimized, easier to maintain |
| 2026-05-07 | shadcn re-init from Base UI default to Radix base | Familiar API, AI Elements compatibility |
| 2026-05-07 | Type stack switch from IBM Plex to Inter Tight + Inter | More modern, better readability |
| 2026-05-07 | Brand yellow locked to exactly `#E7C81F` | Match brand spec, eliminate drift |
| 2026-05-07 | Light-mode default with dark hero blocks | Editorial / portfolio aesthetic |
| 2026-05-07 | Preserve existing local-page URL pattern | SEO continuity from legacy WP site |
| 2026-05-07 | Vercel project moved from `tz-electric` to `cq-marketings-projects` | TZ Electric was an unrelated client team |
| 2026-05-08 | NYS Contracts moved to root `/nys-contracts` | Mirrors live site's primary-nav status |
| 2026-05-08 | `/work` pages dropped, redirected to `/gallery` | Gallery already covers work showcase |
| 2026-05-08 | Team panels show install photos, not portraits | Fits the "real people working real jobs" message |
| 2026-05-08 | All h1/h2/h3 sweepingly bolded `font-semibold` | Consistency across pages |
| 2026-05-08 | Em-dashes globally removed | Reads more human, less AI-pattern |
| 2026-05-08 | Native multi-step Quote Request form replaces Typeform JLIMOo51 | Conversion-optimized, branded, no third-party load |
| 2026-05-08 | /contact swapped to simple form, /quote-request gets the multi-step | Clearer separation: contact = inquiry, quote-request = project intake |
| 2026-05-08 | Pods category renamed "Panel Systems and Pods" | Better describes the content (cubicles, panels, ROOM pods) |
| 2026-05-08 | Floorplan brand for the admin | Matches HVOF industry, distinct from TZ's "Switchboard" |
| 2026-05-08 | Public routes refactored into `/app/(public)/` | Keeps public chrome out of the admin |
| 2026-05-08 | Neon Postgres (HVOF-DB) for lead pipeline | Durable, serverless-friendly via @neondatabase/serverless |
| 2026-05-08 | Trusted-By bar lightened to cream | Logos read better; user feedback called the dark version too heavy |

---

## For AI agents

If you're an AI agent picking this up:

1. Read `AGENTS.md` at the repo root. Read the relevant sections in `node_modules/next/dist/docs/` before writing code. Your training data is older than this version of Next.js.
2. The Vercel plugin in this environment will auto-suggest skills and validate edits. Most are correct. The known false positive: it complains that `async headers()` in `next.config.ts` should be awaited. It is wrong.
3. Do not introduce em-dashes or numbered prefixes on cards. The owner has called these out repeatedly.
4. Brand yellow is `#E7C81F`. Period. No alternates.
5. The `<ScrollText />` component is the convention for big-headline closer CTAs. Use it.
6. The quote cart is the conversion mechanism for chairs. The Quote Request form is the conversion mechanism for everything else.
7. When adding env vars via Vercel CLI, use `printf "value"` not `echo "value"` to avoid trailing newlines in the stored value.
