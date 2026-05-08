# HVOF Project Handoff

This document is for picking up the project on a new machine, in a new session, or with a new contributor. It does not contain credentials. For credentialed access (SSH, etc.) the project owner has a separate private file.

Last updated: 2026-05-08

---

## What this project is

A full Next.js 16 marketing + lead-generation site for **Hudson Valley Office Furniture** that will replace the legacy WordPress site at thewowguys.com after sign-off and DNS cutover.

The legacy WordPress site is still live and unchanged. The new Next.js site is at https://hvof-site-2026.vercel.app. Both are running in parallel during the rebuild.

The pivot from "WordPress optimization" to "full Next.js rebuild" happened on 2026-05-07.

---

## Architecture at a glance

```
Legacy traffic ─────► thewowguys.com (Hostinger / Divi / WooCommerce)
                              │
                              └─ media + product images shared via WP CDN

New build (in progress)
─────► hvof-site-2026.vercel.app  ◄───  GitHub: cqdesignsny/hvof-site-2026
              │                          (auto-deploys on push to main)
              ├─ Next.js 16.2 App Router (Turbopack)
              ├─ Tailwind v4
              ├─ shadcn/ui (Radix base)
              ├─ motion/react (animations)
              └─ Zustand (quote cart state)
```

After approval, DNS for thewowguys.com points at Vercel and the WP stack is decommissioned.

---

## Resume instructions

```bash
cd "/Users/cqstudio/Library/CloudStorage/Dropbox/HVOF/HVOF Site 2026/hvof-site-2026"
pnpm install
pnpm dev          # http://localhost:3000
```

Node 22+, pnpm 10+. After clone, mark `node_modules` and `.next` Dropbox-ignored:

```bash
xattr -w com.dropbox.ignored 1 node_modules
xattr -w com.dropbox.ignored 1 .next
```

To deploy: push to `main`. Or force a deploy with `vercel deploy --yes --prod`.

---

## Brand tokens (LOCKED)

In `src/app/globals.css`. **Never introduce other yellows or alternate fonts.**

| Token | Value | Use |
|---|---|---|
| `--brand-yellow` | `#E7C81F` | All accents, eyebrows, CTAs, active states |
| `--brand-yellow-hover` | `#d4b71c` | Hover state of yellow buttons |
| `--brand-ink` | `#000000` | Pure black, foreground / headlines |
| `--brand-paper` | `#ffffff` | White |
| `--brand-cream` | `#f5f5f5` | Light surface backgrounds |
| `--brand-graphite` | `#1a1a1a` | Trusted-By bar background only |

Fonts (via `next/font/google`):
- Display: **Inter Tight** (h1/h2/h3, all `font-semibold`, never `font-light`)
- Body: **Inter**
- Mono: **JetBrains Mono** (eyebrows, prices, technical labels)

Base font-size 18px (18.5px at xl+) for ~12% larger reading than browser default.

---

## Design rules (non-negotiable)

These were called out by the owner across multiple feedback rounds. Do not violate.

1. **No em-dashes anywhere.** Replace with periods or commas. A global sed sweep was done; verify on any new copy.
2. **No emojis.** Custom SVG icons in `/public/icons/`. Inline brand SVGs (Facebook, Instagram, LinkedIn) in `src/components/site/social-icons.tsx`.
3. **No "AI-slop" signals:**
   - No numbered prefixes on cards (no `01`, `02`, etc.)
   - No slide counters (`01 / 05` style)
   - No fake bios on team cards
4. **One yellow only:** `#E7C81F`.
5. **Header is solid black.** No backdrop-blur transparency picking up the hero.
6. **Logo is always full-color.** `/public/logo.svg` (yellow + gray). Never the inverted/monochrome version.
7. **Big-headline closer CTAs use `<ScrollText />`.** It pins the text centered in a read window (40% to 65% of scroll progress) before exiting. Already on home, About, NYS Contracts, every category page via `CategoryTemplate`. Use the same component for any new big-text closer.
8. **Card hover:** brand-yellow border at rest, dramatic ring + lift on hover. Use the `.card-interactive` utility.

---

## Routes inventory

22 unique pages plus 17 generated product detail pages.

| Path | Source | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | Hero slider, From Concept (Dan photo), Trusted By, Categories, Interactive Gallery, Featured Seating + Desks, Featured Clients, Why HVOF, Virtual Tour CTA, Testimonial, Showroom invite, FAQ, Newsletter, ScrollText closer |
| `/about` | `src/app/about/page.tsx` | Numbers, Story, Trusted By, Team panels (install photos), Values, HVOF-30 Video with play overlay, ScrollText closer |
| `/nys-contracts` | `src/app/nys-contracts/page.tsx` | Direct-answer paragraph, eligibility, 4-step process, **41 manufacturer cards** all linking out, FAQs, ScrollText closer |
| `/furniture` | `src/app/furniture/page.tsx` | Category overview grid |
| `/furniture/seating` | `src/app/furniture/seating/page.tsx` | 13 SKU product grid, sub-category sections |
| `/furniture/{desks, conference, healthcare, pods, education, preowned, reception}` | `CategoryTemplate` | Each has subcategories + features + FAQs |
| `/furniture/systems` | `src/app/furniture/systems/page.tsx` | Custom layout with AIS Inc image library |
| `/furniture/[category]/[sku]` | `src/app/furniture/[category]/[sku]/page.tsx` | Dynamic, 17 SKUs statically generated |
| `/gallery` | `src/app/gallery/page.tsx` | CSS-columns masonry + lightbox with arrow nav |
| `/e-catalog` | `src/app/e-catalog/page.tsx` | FlipHTML5 inline embed |
| `/showroom` | `src/app/showroom/page.tsx` | Visit info, Matterport iframe inline, Google Maps pinned to HVOF |
| `/virtual-tour` | `src/app/virtual-tour/page.tsx` | Standalone Matterport iframe |
| `/contact` | `src/app/contact/page.tsx` | Form + map |
| `/quote` | `src/app/quote/page.tsx` | RFQ cart submit |
| `/privacy` | `src/app/privacy/page.tsx` | Stub |
| `/office-furniture-{fishkill,poughkeepsie}-ny` | LocalLandingTemplate | Local landings |
| `/api/lead` | `src/app/api/lead/route.ts` | POST handler. Logs + optional Resend |
| `/api/quote` | `src/app/api/quote/route.ts` | POST handler. Logs + optional Resend |
| `/sitemap.xml`, `/robots.txt` | Auto-generated | AI bot allowlist active |

Permanent redirects: `/work` → `/gallery`, `/furniture/nys-contracts` → `/nys-contracts`.

---

## Navigation

Primary nav (desktop and mobile sheet):
1. Furniture (mega-menu, 8 sub-categories)
2. NYS Contracts
3. Gallery
4. E-Catalog
5. Showroom
6. About
7. Contact

Plus social icons (Facebook + Instagram + LinkedIn) on lg+ screens, phone number on lg+, "Get a quote" CTA button.

Mobile sheet has the same nav stacked, address + hours, phone, and the social row at the bottom.

---

## Quote cart (RFQ system)

The conversion mechanism. Worth understanding before changing anything in `/lib/quote-cart.ts` or `/components/quote/`.

- Every `<ProductCard />` shows an `<AddToQuoteButton />` calling `useQuoteCart().add(product, 1)`.
- Cart state lives in `src/lib/quote-cart.ts` (Zustand + persist middleware, localStorage key `hvof-quote-cart`).
- `<QuoteCartIndicator />` floats bottom-right (mobile) or top-right (desktop) when the cart has items. Hidden on `/quote` itself.
- `/quote` page reviews items with qty controls, shows a list-price subtotal labeled as estimate, has a contact form with timeline picker.
- Submit posts to `/api/quote`. The handler logs to console and emails via Resend if `RESEND_API_KEY` + `LEAD_EMAIL_TO` are set in Vercel env.
- No Stripe. No checkout. Payment offline by PO/check/ACH after the quote is finalized.

---

## Environment variables

Set in Vercel dashboard, Settings, Environment Variables:

```
NEXT_PUBLIC_GA_ID         = G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID   = 000000000000000
RESEND_API_KEY            = re_xxx
LEAD_EMAIL_TO             = cesar@creativequalitymarketing.com
LEAD_EMAIL_FROM           = "HVOF Site <noreply@thewowguys.com>"
```

Without these the site still works. Analytics components are gated on the env vars and silently no-op if not set. Form submits log to function logs only.

---

## Asset inventory

### `/public`
- `logo.svg`, `logo-light.svg`
- `icons/{chair,desk,conference,reception}.svg` (custom HVOF brand-ish)
- `team/{dan-1,dan-2,john-1,mark-1,mark-2}.png` (currently NOT shown on site since team panels were swapped to install photos; kept in case)
- `partners/marshall-sterling-white.webp`
- `product-placeholder.svg`

### Remote (whitelisted in `next.config.ts`)
- `thewowguys.com` WP CDN
- `imagelibrary.ais-inc.com` (used on /furniture/systems)
- `i.ytimg.com` (placeholder for video gallery)

### Pending
A bulk rsync of `wp-content/uploads/` from the WP server to the SSD is planned. Once that lands at `/Volumes/CQ-PRO-4TB/CQ Marketing/HVOF/wp-uploads-mirror/`, the team can index everything and replace `/product-placeholder.svg` with real product photos in `/public/products/{sku}.jpg`.

---

## Important conventions for Next.js 16

This is not the Next.js you know. Read `node_modules/next/dist/docs/01-app/` before writing routing or data-fetching code. The `AGENTS.md` at the repo root enforces this for AI agents.

Key gotchas:
- **`params` is a Promise** in dynamic routes: `const { sku } = await params`. See `/furniture/[category]/[sku]/page.tsx` for the pattern.
- **shadcn defaults to Base UI now.** This repo was re-init'd to Radix base. Don't switch it back: components written against Base UI's `render` prop pattern would break with the existing Button + Accordion API we use.
- **`async headers()` in `next.config.ts` is correct** for response-header config. The Vercel plugin's validator sometimes complains that it should be awaited. False positive (verified against bundled docs).
- **`@base-ui` brand icons:** `lucide-react` doesn't ship Facebook / Instagram / LinkedIn icons. They live as inline SVGs in `src/components/site/social-icons.tsx`.

---

## What's done

Major milestones, in rough order:

- Next.js 16 scaffold, shadcn re-init to Radix base
- Inter Tight + Inter + JetBrains Mono swap from IBM Plex
- Brand yellow locked to `#E7C81F`
- Header solid black, full-color logo always
- Hero slider on home (5-image cross-fade)
- Trusted By marquee with **real partner logos** (11 brands from WP CDN, soft grayscale)
- From Concept to Completion editorial split with Dan photo
- Interactive home gallery (8 hand-picked variety shots, click-to-swap thumbnails)
- Featured Seating + Desks product cards on home
- Why HVOF differentiators
- Virtual Tour CTA + Matterport iframe on /virtual-tour AND /showroom
- Testimonial pulled from live site copy verbatim
- ScrollText with snap-to-center pin (home, About, NYS, all category pages)
- Product detail pages dynamic at `/furniture/[category]/[sku]`, statically generated for 17 SKUs
- All 8 furniture category pages (seating with full product grid; others CategoryTemplate)
- /furniture/systems with AIS Inc imagery
- /nys-contracts at root with all 41 manufacturer outbound links
- /e-catalog with FlipHTML5 inline embed
- /gallery: CSS-columns masonry + lightbox
- About page with HVOF-30 video (yellow play overlay), team panels using install photos
- Contact form + /api/lead
- Quote cart system end-to-end (Zustand + localStorage + /api/quote)
- 2 local landing pages (Fishkill, Poughkeepsie)
- JSON-LD: Organization + LocalBusiness/FurnitureStore + WebSite + per-page Breadcrumb + FAQPage + Service
- sitemap.ts + robots.ts (AI bot allowlist)
- Map pins land on HVOF (was BJ's)
- Vercel project moved off `tz-electric` scope onto `cq-marketings-projects`
- Social icons (Facebook, Instagram, LinkedIn) wired into Header + mobile sheet + Footer
- Hero images deduped so no two pages share the same hero
- All h1/h2/h3 sweepingly bolded `font-semibold`
- All em-dashes removed sitewide
- All numbered "01 02 03" prefixes removed
- Permanent redirects: /work → /gallery, /furniture/nys-contracts → /nys-contracts

---

## What's pending

Roughly priority order:

1. **Bulk WP media transfer.** Run rsync (or Hostinger File Manager zip) so we have product images locally at `/Volumes/CQ-PRO-4TB/CQ Marketing/HVOF/wp-uploads-mirror/`. After that, index every chair/desk SKU to its real photo and replace `product-placeholder.svg`.
2. **GA4 + Meta Pixel IDs** in Vercel env (waiting on real IDs).
3. **LinkedIn URL.** Placeholder set to `linkedin.com/company/hudson-valley-office-furniture/`. Confirm or replace.
4. **10 remaining city pages** (Newburgh, Middletown, Kingston, Beacon, Wappingers Falls, White Plains, New Paltz, Hyde Park, Peekskill, Rhinebeck). Copy `office-furniture-fishkill-ny/page.tsx`, swap `CITY` constant + `driveTime`, add to `SITE.citiesServed` in `lib/site.ts`. ~30 seconds each.
5. **Resend integration**: paste `RESEND_API_KEY` + `LEAD_EMAIL_TO` into Vercel env so /api/lead and /api/quote actually email leads. Code is already wired.
6. **Real WooCommerce content** for the 13 chairs (descriptions + photos). Replace `lib/products.ts` placeholders.
7. **Marshall + Sterling case study page** was deleted in the /work consolidation. If a dedicated case-study is wanted back, build at `/gallery/marshall-sterling` and link from the home Featured Clients block.
8. **Blog migration** if keeping (currently no blog on the new site).
9. **Google Business Profile** still not claimed/verified per legacy project notes.
10. **Google Search Console** sitemap not yet submitted.
11. **DNS cutover** when approved. Update `SITE.url` in `lib/site.ts`. Coordinate with Hostinger DNS.

---

## Where to look when

- **Brand color or font change** → `src/app/globals.css` (only place these should ever change)
- **Add a city** → copy `src/app/office-furniture-fishkill-ny/page.tsx`, change `CITY` const, add to `SITE.citiesServed` in `lib/site.ts`
- **Add a product** → append to `PRODUCTS` array in `src/lib/products.ts`. Detail page generates automatically.
- **Add a manufacturer** → `SITE.manufacturers` array in `lib/site.ts`. Renders on `/nys-contracts` automatically.
- **New big-CTA closer** → use `<ScrollText lines={["...", "..."]} ... />` from `components/motion/scroll-text.tsx`.
- **New product image** → drop in `/public/products/{sku}.jpg`, reference from `lib/products.ts`. Until then, products use `/product-placeholder.svg`.
- **New city or category in nav** → `NAV.primary` or `NAV.furniture` in `lib/site.ts`.
- **Hero image for a new page** → check `/lib/images.ts` for the manifest. Heroes are deduped per page; don't reuse one already in service.

---

## File map

```
hvof-site-2026/
├── README.md                       Public technical readme
├── docs/HANDOFF.md                 ← this file
├── AGENTS.md / CLAUDE.md           AI-agent instructions
├── next.config.ts                  Image hosts + redirects + headers
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── components.json                 shadcn config (Radix base)
├── eslint.config.mjs
├── postcss.config.mjs
├── public/
│   ├── logo.svg, logo-light.svg
│   ├── icons/                      Custom HVOF SVG icons
│   ├── team/                       Staff portraits (currently unused on site)
│   ├── partners/                   Partner logos
│   └── product-placeholder.svg
└── src/
    ├── app/                        All routes (App Router)
    ├── components/
    │   ├── analytics/              GA4 + Meta Pixel
    │   ├── motion/                 FadeIn, Stagger, ScrollText (snap-pinned)
    │   ├── seo/json-ld.tsx         Schema components
    │   ├── sections/               Page sections (Hero, FAQ, Newsletter, etc.)
    │   ├── quote/                  Cart components
    │   ├── site/                   Header, Footer, Logo, social-icons
    │   └── ui/                     shadcn primitives
    └── lib/
        ├── site.ts                 Brand + nav + manufacturers + cities + featured clients
        ├── images.ts               Centralized image refs
        ├── products.ts             Product catalog
        ├── quote-cart.ts           Zustand cart store
        ├── local-faqs.ts           City FAQ generator
        └── utils.ts                cn() helper
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
| 2026-05-07 | Vercel project moved from `tz-electric` to `cq-marketings-projects` scope | TZ Electric was an unrelated client team |
| 2026-05-08 | NYS Contracts moved to root `/nys-contracts` | Mirrors live site's primary-nav status |
| 2026-05-08 | `/work` pages dropped, redirected to `/gallery` | Gallery already covers work showcase |
| 2026-05-08 | Team panels show install photos, not Dan/John/Mark portraits | Fits the "real people working real jobs" message better |
| 2026-05-08 | All h1/h2/h3 sweepingly bolded `font-semibold` | Consistency across pages, called out in feedback |
| 2026-05-08 | Em-dashes globally removed | Reads more human, less AI-pattern |

---

## For AI agents

If you're an AI agent picking this up:

1. Read `AGENTS.md` at the repo root. Read the relevant sections in `node_modules/next/dist/docs/` before writing code. Your training data is older than this version of Next.js.
2. The Vercel plugin in this environment will auto-suggest skills and validate edits. Most are correct. The known false positive: it complains that `async headers()` in `next.config.ts` should be awaited. It is wrong. The function is the response-header config (returns a Promise of the array), not the request-time `next/headers` API.
3. Do not introduce em-dashes or numbered prefixes on cards. The owner has called these out repeatedly.
4. Brand yellow is `#E7C81F`. Period. No alternates.
5. The `<ScrollText />` component is the convention for big-headline closer CTAs. Use it.
6. The quote cart is the conversion mechanism. Don't break it.
