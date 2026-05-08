# HVOF Site 2026

Modern marketing + lead-gen site for **Hudson Valley Office Furniture**. Next.js 16 rebuild that will replace the legacy WordPress site at [thewowguys.com](https://thewowguys.com) after sign-off.

**Live preview:** https://hvof-site-2026.vercel.app

## Pickup-from-anywhere

If you are a contributor (or AI agent) opening this repo for the first time, read **[`docs/HANDOFF.md`](./docs/HANDOFF.md)** before writing code. It has the full project state, design rules, and pending work.

If you have credentialed access (the Cesar/CQ Marketing flow), there is a private CLAUDE.md in the parent Dropbox folder that holds SSH credentials and other secrets. It is not in this repo on purpose.

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm start
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
| Forms | Native form posting to `/api/lead` and `/api/quote`, optional Resend |
| Analytics | GA4 + Meta Pixel via `@next/third-parties` (env-gated) |
| Hosting | Vercel (Fluid Compute) |
| Image CDN | Existing thewowguys.com WP CDN + AIS Inc image library + `/public` |

## Environment variables

Copy `.env.example` to `.env.local`, fill what you need locally, manage in production with `vercel env add`:

```
NEXT_PUBLIC_GA_ID         = G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID   = 000000000000000
RESEND_API_KEY            = re_xxx
LEAD_EMAIL_TO             = cesar@creativequalitymarketing.com
LEAD_EMAIL_FROM           = "HVOF Site <noreply@thewowguys.com>"
```

## Routes

| Path | What it is |
|---|---|
| `/` | Hero slider, From Concept (with Dan photo), Trusted By marquee, categories, interactive gallery, featured seating + desks, featured clients, why HVOF, virtual tour CTA, testimonial, showroom invite, FAQ, newsletter, snap-pinned closer |
| `/about` | Story, numbers, trusted-by, team panels (install photos), values grid, HVOF-30 video with play overlay, snap-pinned closer |
| `/nys-contracts` | All 41 manufacturer cards with outbound links, eligibility, 4-step process, FAQs |
| `/furniture` | Category overview |
| `/furniture/seating` | Real product grid (13 SKUs, sub-category sections, Add-to-Quote) |
| `/furniture/desks` | Sub-categories + FAQs |
| `/furniture/conference`, `/healthcare`, `/pods`, `/education`, `/preowned`, `/reception` | CategoryTemplate pages |
| `/furniture/systems` | Custom layout with AIS Inc imagery |
| `/furniture/[category]/[sku]` | Dynamic product detail (17 SKUs statically generated) |
| `/gallery` | CSS-columns masonry + lightbox |
| `/e-catalog` | FlipHTML5 inline embed |
| `/showroom` | Visit info + Matterport tour + Google Maps pinned to HVOF |
| `/virtual-tour` | Standalone Matterport iframe |
| `/contact` | Form + contact info + map |
| `/quote` | RFQ cart submit |
| `/privacy` | Stub |
| `/office-furniture-fishkill-ny`, `/office-furniture-poughkeepsie-ny` | Local landing pages |
| `/api/lead`, `/api/quote` | Form intake handlers |
| `/sitemap.xml`, `/robots.txt` | Auto-generated |

Permanent redirects: `/work` → `/gallery`, `/furniture/nys-contracts` → `/nys-contracts`.

## Project structure

```
src/
├── app/                            All routes (App Router)
│   ├── layout.tsx                  Root layout, fonts, header, footer, schema, analytics, cart indicator
│   ├── page.tsx                    Home
│   ├── about/page.tsx
│   ├── nys-contracts/page.tsx
│   ├── furniture/...               Category overview + 8 categories + dynamic [sku]
│   ├── gallery/page.tsx
│   ├── e-catalog/page.tsx
│   ├── showroom/page.tsx
│   ├── virtual-tour/page.tsx
│   ├── contact/page.tsx
│   ├── quote/page.tsx
│   ├── privacy/page.tsx
│   ├── office-furniture-{city}-ny/ Local landing pages
│   ├── api/lead/route.ts
│   ├── api/quote/route.ts
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── analytics/                  GA4 + Meta Pixel
│   ├── motion/                     FadeIn, Stagger, ScrollText (snap-pinned)
│   ├── seo/json-ld.tsx             Org, LocalBusiness, FAQ, Breadcrumb, Service schemas
│   ├── sections/                   Hero, HeroSlider, FAQ, ContactForm, CategoryTemplate, LocalLandingTemplate, InteractiveGallery, MasonryGallery (lightbox), TrustedBy, NewsletterSignup, VirtualTourCTA, VideoWithPoster, TeamSection
│   ├── quote/                      AddToQuoteButton, ProductCard, QuoteCart, QuoteCartIndicator
│   ├── site/                       Header, Footer, Logo, social-icons (inline brand SVG)
│   └── ui/                         shadcn primitives (Radix base)
└── lib/
    ├── site.ts                     Brand + nav + manufacturers + cities + featured clients + social URLs
    ├── images.ts                   Centralized image references (mostly WP CDN URLs)
    ├── products.ts                 Product catalog (real SKUs from live site)
    ├── quote-cart.ts               Zustand cart store
    ├── local-faqs.ts               City FAQ generator
    └── utils.ts                    cn() helper
```

## Brand tokens

In `src/app/globals.css`. **Do not introduce other yellows or fonts.**

- `--brand-yellow` `#E7C81F` (locked)
- `--brand-yellow-hover` `#d4b71c`
- `--brand-ink` `#000000`, `--brand-paper` `#fff`, `--brand-cream` `#f5f5f5`, `--brand-graphite` `#1a1a1a`
- Display Inter Tight, Body Inter, Mono JetBrains Mono
- Base font-size 18px, 18.5px at xl+
- All h1/h2/h3 use `font-semibold` everywhere

## Design rules (non-negotiable)

1. **No em-dashes anywhere.** Replace with periods or commas.
2. **No emojis.** Use the SVGs in `/public/icons/` and `components/site/social-icons.tsx`.
3. **No numbered prefixes on cards** (no `01`, `02`, etc.). No slide counters. No fake bios on team cards.
4. **One yellow only:** `#E7C81F`.
5. **Header is solid black** with a full-color logo always.
6. **Big-headline closer CTAs use `<ScrollText />`** with the snap-to-center pin (defaults already correct).
7. **Card hover:** brand-yellow border at rest, ring + lift on hover (`.card-interactive` utility).

## RFQ / quote-cart system

- Every product page has `<AddToQuoteButton />` calling `useQuoteCart().add(product, 1)`.
- Cart state in `src/lib/quote-cart.ts` (Zustand + persist, key `hvof-quote-cart`).
- Floating yellow indicator pinned bottom-right (mobile) / top-right (desktop) when cart has items.
- `/quote` page reviews cart, submits to `/api/quote`.
- No Stripe, no checkout. Payment offline after the quote is finalized.

## Deployment

```bash
# Pushing to main auto-deploys to Vercel
git push

# Force a deploy from local
vercel deploy --yes --prod
```

The Vercel project is on the `cq-marketings-projects` scope. Future plan: transfer to a dedicated HVOF team via the Vercel dashboard once the `hvofmarketing@gmail.com` account is set up.

## Important Next.js 16 notes

This is **not the Next.js you know.** Read `node_modules/next/dist/docs/01-app/` before writing routing or data-fetching code. The `AGENTS.md` at the repo root enforces this for AI agents.

Key changes from 15:
- `params` is a `Promise` in dynamic routes: `const { sku } = await params`
- shadcn defaults to Base UI now; this repo was re-init'd to Radix base. Don't switch back.
- `async headers()` in `next.config.ts` is correct (verified against bundled docs). The Vercel plugin's validator complains that it should be awaited; that's a false positive (it's confusing the request-time `next/headers` API with the config's response-headers function).

## What's done, what's pending

See [`docs/HANDOFF.md`](./docs/HANDOFF.md) for the full state.

Highlights:

- ✓ All major routes built and deployed
- ✓ Real product catalog with 13 chair SKUs from the live site
- ✓ All 41 NYS Contract manufacturers wired with outbound links
- ✓ Snap-pinned ScrollText closer on every big-headline CTA
- ✓ Quote cart system end-to-end
- ✓ All hero images deduped, captions cleaned

Pending:

- WP media bulk transfer (rsync waiting on the SSH password being entered)
- GA4 + Meta Pixel IDs
- LinkedIn URL confirmation (placeholder set)
- 10 remaining city pages (5-min each, copy Fishkill template)
- Resend env vars in Vercel
- Real WooCommerce product photos (waiting on bulk transfer)
- DNS cutover
- Google Business Profile + Search Console sitemap

## Decisions

| Date | Decision | Why |
|---|---|---|
| 2026-05-07 | Pivot from WP optimization to full Next.js rebuild | App-like feel, faster pages, lead-gen optimized, easier to maintain at scale |
| 2026-05-07 | shadcn/ui re-init from Base UI default to Radix base | Familiar API, AI Elements compatible if needed later |
| 2026-05-07 | Switched type stack from IBM Plex to Inter Tight + Inter | More modern, better readability, lower visual weight |
| 2026-05-07 | Brand yellow locked to exactly `#E7C81F` | Match the brand spec, eliminate drift |
| 2026-05-07 | Light-mode default with dark hero blocks | Editorial / portfolio aesthetic |
| 2026-05-07 | Preserve existing local-page URL structure (`/office-furniture-{city}-ny/`) | SEO continuity from WP site |
| 2026-05-08 | NYS Contracts moved from `/furniture/nys-contracts` to `/nys-contracts` (root nav) | Mirrors live site, confirms primary-page status |
| 2026-05-08 | `/work` pages dropped, redirected to `/gallery` | Gallery already covers work showcase, simpler IA |
| 2026-05-08 | Team panels show install photos, not Dan/John/Mark portraits | Less awkward, more "the working business" |
| 2026-05-08 | All h1/h2/h3 sweepingly bolded (`font-semibold`) | Consistency across pages |

## Notes

- The Dropbox folder marks `node_modules/` and `.next/` as ignored via `xattr com.dropbox.ignored 1` so they don't churn through sync. Re-apply after a fresh clone.
- See `AGENTS.md` for AI-agent instructions.
- For credentials and the full handoff including SSH password, see the parent Dropbox folder's `CLAUDE.md` (not in git).
