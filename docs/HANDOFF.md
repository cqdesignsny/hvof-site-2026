# HVOF Project Handoff

This document is for picking up the project on a new machine, in a new session, or with a new contributor. It does not contain credentials. For credentialed access (SSH, admin password, etc.) the project owner has a separate private file.

Last updated: 2026-06-05

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
              ├─ Floorplan admin at /admin (password-gated)
              └─ Floorplan /admin/reports ◄── CQ Signal REST (separate Next.js app)
                                              owns all data connectors,
                                              HVOF only reads
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

Base font-size is **fluid/responsive**: root `font-size: clamp(14px, 0.7rem + 0.32vw, 20px)` in `globals.css`. The whole site is rem-based, so all text (nav, headings, body, hero clamps) scales from this one value: ~14px on phones, ~16px on laptops, up to 20px on large screens/TVs. It is the single lever to resize all site text.

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
11. **No "AV"** in copy → "technology-integrated". **No "cubicles"** → "panel systems" (replace the word, keep the concept). **No "same-day" / "24-hour" promises** → "promptly". (All locked 2026-05-29.)
12. **Do not advertise unauthorized manufacturer names** (Steelcase, Herman Miller, Knoll, Humanscale, HON) as if HVOF is a dealer; they are carried pre-owned only. Pre-owned copy may say "top brands" generically.
13. **Founded 1986** (not 1985), family-owned, three generations.
14. **Typography is fluid** (one root clamp). Don't add fixed px font-sizes that fight it.
15. **"Shop the look"**: image-first look tiles per category; the price range is the budget signal, never a "basic/low" tier label or style jargon ("industrial").
16. **All prices are "starting at ~$X" (approximate).** Every displayed price carries a `~` prefix; nothing is a fixed/final price. Cart + purchase-order email read "Starting at ~$X each" / "Estimated starting total." Only the T-series *products* (T-01..T-20) are locked, not their prices; every price is placeholder/subject to change. (2026-06-05.)
17. **Team follow-up is "as soon as possible"**, never a fixed time window ("4 business hours", "24 hours"). (2026-06-05.)
18. **Quote contact prompt is "Who can we contact about your quote?"** (not "Where should we send your quote?"). (2026-06-05.)
19. **"Shop the Look" CTA is a brand-yellow pill** (label + small arrow). The three seating looks: Basic Tasking and Ergonomic / Conference and Executive / Lounge and Guest. (2026-06-05.)
20. **Mobile product listings use `<ProductDeck>`** (a swipeable stacked deck: center card front, neighbors peeking, native scroll-snap); desktop stays the grid. (2026-06-05.)

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
| `/furniture/[category]/style/[look]` | **"Shop the look" detail.** Curated products for a look + "starting at" + lead CTA. Live for seating + desks. Driven by `lib/looks.ts`. |
| `/gallery` | Masonry + lightbox |
| `/e-catalog`, `/showroom`, `/virtual-tour`, `/privacy` | |
| `/faq` | Full generic FAQ list, footer-linked. Category pages show a 3-4 question preview + "See more FAQs". Content in `lib/faqs.ts`. |
| `/office-furniture-{city}-ny` | 12 cities |
| `/office-furniture-{county}-county-ny` | 8 counties. Cities link to city pages where one exists (`CITIES_WITH_PAGES` map). |
| `/office-furniture-hudson-valley-ny` | Region |

### Admin (Floorplan)

| Path | Notes |
|---|---|
| `/admin/login` | Public, password gate |
| `/admin` | Dashboard: stat tiles, recent leads, quick links, storage status |
| `/admin/leads` | Pipeline table, filterable by formType |
| `/admin/training` | Agent Training questionnaire. 13 sections, ~67 questions, localStorage autosave, on send writes to Neon and emails the markdown packet via Resend. |
| `/admin/reports` | **Full report surface**. Range tabs (7d / 30d / 90d / 1y), hero traffic card, KPI tiles, channels in detail, top sources + landings, native lead pipeline, Signal recommendations, brief markdown. Renders the last payload CQ Signal pushed (stored locally; no live pull). "Waiting for first push" state before any push; HVOF mock only with no DB configured. |
| `/admin/knowledge-base`, `/admin/agents`, `/admin/plan` | Placeholders + live data where applicable |

### API

| Path | Notes |
|---|---|
| `/api/lead` | POST. Records to Neon, emails via Resend, fires fire-and-forget POST to Signal's `/api/v1/leads/ingest` when `SIGNAL_API_BASE` and `SIGNAL_API_KEY` are set. |
| `/api/quote` | POST. Cart submission. |
| `/api/training` | POST. Persists `/admin/training` submissions to `training_submissions` and emails the markdown packet via Resend. |
| `/api/admin/login`, `/api/admin/logout` | Floorplan auth |

Permanent redirects: `/work` → `/gallery`, `/furniture/nys-contracts` → `/nys-contracts`. `/admin` and `/api` disallowed in robots.txt.

---

## Navigation

Primary nav: Furniture (**centered mega menu** — shop-by-category 2×4 grid with webp icons, a "Shop the look" strip of featured looks, and a black CTA card; `src/components/site/furniture-mega-menu.tsx`), NYS Contracts, Gallery, E-Catalog, Showroom, About, Contact.

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

# CQ Signal report push (receiver). Reports now arrive via push, not pull.
SIGNAL_PUSH_SECRET        HMAC secret; must equal Signal's FLOORPLAN_PUSH_SECRET (set in prod 2026-06-11)

# CQ Signal lead ingest + general API (Floorplan -> Signal direction; still used by /api/lead)
SIGNAL_API_BASE           e.g. https://cq-signal-app.vercel.app
SIGNAL_API_KEY            sigk_live_... issued from Signal Settings → Agents & AI
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

**2026-06-05**
- **Basic Tasking and Ergonomic** seating look fully built: renamed from "Clean and everyday" (slug `basic-tasking-and-ergonomic`); **20 real curated task chairs HVOF T-01..T-20** (`/public/products/hvof-t-0X.jpg`) with real "starting at" prices ($229–$859, in `lib/products.ts`). The 9 old task/ergonomic placeholder SKUs removed (kept the 4 Conference/Executive placeholders). New `Product.startingAt` flag. The T-series *products* are locked; their prices and every other price are approximate/placeholder.
- **Seating looks regrouped to three:** Basic Tasking and Ergonomic / **Conference and Executive** (slug `conference-and-executive`, shows the 4 kept placeholders) / **Lounge and Guest** (slug `lounge-and-guest`, no products yet → a "coming together" empty state). `getLookProducts` no longer falls back to the full category.
- **"Starting at ~$X" approximate pricing sitewide:** a `~` (approximate) prefix on every displayed price (product cards, product detail, the category "From ~$X" subcategory labels, the quote cart). The quote cart + the purchase-order email are framed as starting prices with a prominent "Estimated starting total" block ("Starting point, not final" pill) and a "final number set with a rep" note.
- **"These aren't your only options" notice** (`components/sections/sample-notice.tsx`): a prominent yellow-bordered banner ("hundreds more {chairs/desks}", Tell-us + Visit-showroom CTAs) on category pages (top + bottom), look pages, product detail pages, and the furniture overview.
- **Quote / cart copy:** every "within 4 business hours" → "as soon as possible"; the quote contact heading → "Who can we contact about your quote?"; the shop-the-look card CTA → a sleek brand-yellow pill ("Shop the Look" + arrow).
- **Cart findability:** fixed the floating cart indicator (it read `window.location` once on mount and got stuck hidden after visiting /quote; now `usePathname()` + a spring "pop" entrance, label "View quote"). Added a header cart link (icon + live count, appears once items are added) and a footer "Your quote cart" link.
- **Full-width header** (was `container-editorial`, capped + heavy padding, cramping/wrapping the nav on laptops) with `whitespace-nowrap` nav links. Mobile/hamburger unchanged.
- **Mega-menu hover fix:** the full-width fixed panel held the hover handlers so its invisible side band kept the menu stuck open; now `pointer-events-none` on the container and the hover handlers on the visible card.
- **Mobile swipeable stacked product deck** (`components/quote/product-deck.tsx`, `<ProductDeck>`): on phones (< `sm`) products render as a snapping, peeking stacked deck (center card front + full-size, neighbors scaled back), built on native CSS scroll-snap with no new dependency. Desktop stays the grid. Swapped into every product grid (home featured, category pages, shop-the-look pages, seating catalog, related products).
- **Working rule:** ship straight to the live link, no local dev server / preview; commit + push to `main` + verify on the production URL.

**2026-05-29/30**
- Site-wide copy pass (Dina's PDF + a full team review): hero "rooms→spaces", "expert team", all 8 home category-card descriptions rewritten and reused as each landing page's intro, healthcare hero "Furniture for the spaces where people care", desks drops "actually", two Why-HVOF differentiators (In-House. End-to-End. / Northeast Corridor and Beyond), newsletter drops "Hudson Valley".
- Voice rules locked + swept site-wide: AV→"technology-integrated", cubicles→"panel systems", no "same-day"/"24-hour"→"promptly", unauthorized brand names removed from non-preowned copy.
- Generic, site-wide What's-Included + FAQ content (`src/lib/faqs.ts`): a 3-4 question preview on every category page + a new `/faq` page (footer-linked). Warranty questions removed pending official language.
- **"Shop the look"** image-first category navigation (mockup) on Seating + Desks: `src/lib/looks.ts`, `src/components/sections/shop-the-look.tsx`, route `/furniture/[category]/style/[look]`. Look tiles correlate to budget via a price range, never a tier label. Tile imagery is AI-generated placeholder (`/public/looks/`) until real grouped photos arrive.
- **Furniture mega menu** (`src/components/site/furniture-mega-menu.tsx`) replaces the simple dropdown: centered wide panel, category grid + look strip + CTA card, hover/keyboard, motion.
- **Responsive fluid typography**: root `font-size: clamp(14px, 0.7rem + 0.32vw, 20px)`.
- Product grids → rows of 4. HVOF-4003 chair photo wired (`/public/products/hvof-4003.jpg`).

**2026-06-11**
- **Switched to the CQ Signal push model.** Floorplan no longer pulls Signal for reports. Signal POSTs a signed payload (all four ranges + recommendations + brief) to `POST /api/signal/inbound`; we verify the HMAC (`src/lib/signal/push-verify.ts`) and store the latest per business (`src/lib/signal/received-report-store.ts`, `signal_reports` table, lazy-created). `/admin/reports` renders the stored copy via `src/lib/signal/report-source.ts` (`getRangeReport`) — instant, all ranges already in hand, no live calls. Shows a "waiting for first push" state before any push arrives. The live-pull `src/lib/signal/client.ts` is retired; `client.ts`'s 11-block contract types live on in `types.ts`.
- `SIGNAL_PUSH_SECRET` set in production (equals Signal's `FLOORPLAN_PUSH_SECRET`). First push received, stored, and rendered 2026-06-11.
- The 2026-06-10 range-switch loading feedback (`000bca9`) is moot now that range switching is instant (every range ships in one payload).

**2026-06-10**
- CQ Signal data-plane consumer is live in production. HVOF now reads Signal's 11-block v1 contract (`ga4`, `search_console`, `typeform`, `google_ads`, `meta_ads`, `facebook`, `instagram`, `linkedin`, `omnisend`, `core_web_vitals`, `leads_native`) from `https://cq-signal-app.vercel.app`.
- Production Vercel has `SIGNAL_API_BASE` plus the current HVOF-pinned `SIGNAL_API_KEY` prefix `sigk_live_c9df2f…`. The old lost key prefix `sigk_live_c5a846…` was revoked in Signal on 2026-06-10.
- Native lead ingest was smoke-tested against Signal production from the current Floorplan env. `POST /api/v1/leads/ingest` returned 200 for `source: hvof-floorplan`; the smoke row was deleted immediately afterward.
- `/admin/reports` range tabs now show pending feedback while live Signal requests are in flight. The clicked range shows a spinner, an aria-live status line announces loading/ready, and the current report stays visible until the next range finishes.
- Remaining report UX/perf work: live range switches can still take 15-30s because the page awaits snapshot + recommendations + brief together. (Superseded 2026-06-11 by the push model — switching is now instant; see the 2026-06-11 entry above.)

**2026-05-18**
- CQ Signal data-plane consumer wired into Floorplan. Signal owns all reporting connectors (GA4, Typeform, Meta, etc.); HVOF only reads.
- New `/admin/reports` page: range tabs (7d / 30d / 90d / 1y), hero traffic card (sessions + delta + sparkline + channel donut), 4-up KPI tiles, channels in detail with bars, top sources + landings side by side, native lead pipeline, Signal recommendations, brief markdown, footer attribution. All in HVOF tokens (`#E7C81F` yellow, Inter Tight, JetBrains Mono numbers).
- `src/lib/signal/` package: contract types, realistic HVOF mock for all four ranges, server-only fetch client with env-gated mock fallback, fire-and-forget lead-ingest helper.
- `src/components/admin/report/` primitives: DeltaPill, TrendChart (SVG), ChannelDonut (SVG), MetricTile, SectionCard, RangeTabs, StatusPill, RecommendationsList, BriefMarkdown, MockBanner. No chart library added.
- `/api/lead` now POSTs a fire-and-forget webhook to Signal's `/api/v1/leads/ingest` after each local Neon write. Inert until both `SIGNAL_API_BASE` and `SIGNAL_API_KEY` are set.
- `.env.example` updated with the new vars. Local `.env.local` filled with the Neon `DATABASE_URL` so `pnpm dev` writes to the real HVOF-DB.

**2026-05-11**
- Floorplan Agent Training surface at `/admin/training`. 13 sections, ~67 questions. localStorage autosave so the team can come back later. On send, `POST /api/training` builds a clean markdown packet, persists to a new `training_submissions` Neon table, and emails it to `LEAD_EMAIL_TO` via Resend with the markdown both inline and as a `.md` attachment.

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

**Report + Signal maintenance**

1. **Reports refresh on push, not pull.** `/admin/reports` shows the last payload Signal pushed. Signal Phase 2 (per-company cron) will keep it current automatically; until then it updates whenever Signal sends one (the "Send to admin" button or `pnpm signal:push:hvof` on the Signal side). If the page shows "waiting for the first report," no push has arrived — confirm `SIGNAL_PUSH_SECRET` here equals Signal's `FLOORPLAN_PUSH_SECRET`.
2. **Keep native lead ingest verified after form changes.** `/api/lead` sends a fire-and-forget POST to Signal after local Neon writes (still a pull-direction call, unaffected by the push model). If Sell Your Furniture or Giveaway moves native, smoke-test Signal ingest again and delete the smoke row.
3. **Keep the push contract aligned with Signal.** If Signal changes the snapshot/payload shape, update `src/lib/signal/types.ts`, `report-source.ts`, and the renderer together. `src/lib/signal/push-verify.ts` must stay byte-identical to Signal's `src/lib/push/signature.ts`.

**Shop the look + content (from the 2026-05-29 team meeting)**

- Swap the AI placeholder look tiles (`/public/looks/`) for Dan's real grouped product photos; extend "shop the look" to the remaining categories.
- Wire Mark's tier "starting at" prices; replace the misleading exact prices (a $2,899 desk, a ~$25k executive setup) with starting-at / ranges. Keep exact prices only where confirmed correct (in-stock quick-ship items).
- E-catalog: rebrand as a "quick-ship catalog of most popular items" with a "75+ other vendors" disclaimer. (COE's new e-commerce platform is being evaluated for integration.)
- John to supply official warranty language + final What's-Included wording.
- Cesar decisions pending: ship strategy (go live with/without the product section), hide-or-keep the home service-areas section, nav restructure.

**Forms + content**

2. **Sell Your Furniture form + /sell-your-furniture page.** Recreates Typeform `JAHzhOUt`. Cesar to provide field list.
3. **Native giveaway entry form on /giveaway.** Recreates Typeform `e5SrmqW1`.

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
    │   ├── site/                     Header, Footer, Logo, social-icons, furniture-mega-menu
    │   ├── sections/                 Page sections (incl. category-template, shop-the-look)
    │   └── ui/                       shadcn primitives
    └── lib/
        ├── site.ts                   Brand + nav + manufacturers + cities + counties + CITIES_WITH_PAGES
        ├── images.ts                 Centralized image refs
        ├── products.ts               Product catalog (50+ SKUs)
        ├── faqs.ts                   Generic site-wide What's-Included + FAQ content
        ├── looks.ts                  "Shop the look" data (3 looks per category)
        ├── quote-cart.ts             Zustand cart store
        ├── leads-store.ts            Neon Postgres + in-memory fallback
        ├── admin-auth.ts             HMAC cookie auth helpers
        ├── local-faqs.ts             City FAQ generator
        ├── training-questions.ts     /admin/training schema
        ├── training-store.ts         Neon training_submissions table
        ├── signal/                   CQ Signal data plane consumer
        │   ├── types.ts              Contract types
        │   ├── mock.ts               HVOF mock for 7d / 30d / 90d / 1y
        │   ├── client.ts             fetchSnapshot/Brief/Recommendations, env-gated mock fallback
        │   └── lead-ingest.ts        Fire-and-forget POST to Signal's /api/v1/leads/ingest
        └── utils.ts                  cn() helper

src/components/admin/report/          Report UI primitives, all in HVOF tokens
  delta-pill, trend-chart (SVG), channel-donut (SVG), metric-tile,
  section-card, range-tabs, status-pill, recommendations-list,
  brief-markdown, markdown.ts (minimal MD renderer), mock-banner
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
| 2026-05-11 | Agent Training questionnaire surface | Bootstrap the HVOF agent from team-supplied knowledge before any code |
| 2026-05-18 | CQ Signal becomes the reporting data plane; client admins are presentation-only consumers | Build connectors once; HVOF Floorplan and every future client admin (TZ Switchboard, etc.) pull via a versioned REST contract. No GA4 / Meta / Typeform SDKs in HVOF. Full contract documented in `SIGNAL-HANDOFF.md` at the Dropbox project root. |
| 2026-05-29 | Category navigation reframed as "shop the look" (image-first look tiles; budget shown as a price range, no tier labels) | Matches how buyers shop; educates on price without overwhelming. Internal low/mid/high mapping stays backend-only. |
| 2026-05-29 | What's-Included + FAQ made generic and site-wide; warranty questions removed | Old per-product placeholders were untrue / a liability; service-driven generic content reads better and is reusable. |
| 2026-05-29 | Voice rules: AV→technology-integrated, cubicles→panel systems, no "same-day"/"24hr"→"promptly", no unauthorized brand names | Accuracy + legal; only authorized lines advertised, others carried pre-owned only. |
| 2026-05-30 | Typography made fluid via one root clamp (responsive, ~25% smaller than the over-bump) | One lever; scales phone→laptop→TV; fixes "too big even on a laptop". |
| 2026-05-30 | Furniture nav upgraded to a centered mega menu | Higher-end feel; showcases categories + looks + a clear quote path. |

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
8. **`/admin/reports` reads from CQ Signal**, not from local connectors. Do not add GA4 / Meta / Typeform SDKs to this repo. Signal owns the data plane; HVOF only consumes it via REST. The contract is documented in `SIGNAL-HANDOFF.md` at the Dropbox project root. The mock at `src/lib/signal/mock.ts` defines the shape; if the live Signal payload diverges, update the mock and the renderer in lockstep.
