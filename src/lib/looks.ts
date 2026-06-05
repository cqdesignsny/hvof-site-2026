import { getProductsByCategory, type Product, type ProductCategory } from "@/lib/products";

/**
 * "Shop the look" groupings (May 29, 2026 direction).
 *
 * Each category is browsed by a few image-first "looks" that correlate to
 * budget WITHOUT labeling a tier ("basic/low") or jargon ("industrial").
 * The price range under each look is the budget signal. Internal low/mid/high
 * mapping is backend-only; the customer just picks the look they want.
 *
 * Tile images are AI-generated placeholders (Higgsfield) until Dan supplies the
 * real grouped product photography. Swap the `image` paths when those land.
 *
 * Products are mapped to a look by `subCategories` (matched against
 * product.subCategory). When Mark supplies tier pricing, set explicit ranges.
 */
export interface Look {
  category: ProductCategory;
  slug: string;
  /** Customer-facing caption (also the page title). */
  name: string;
  blurb: string;
  /** Tile image. AI placeholder for now. */
  image: string;
  /** product.subCategory values that belong to this look. */
  subCategories: string[];
}

export const LOOKS: Look[] = [
  // Seating
  {
    category: "seating",
    slug: "basic-tasking-and-ergonomic",
    name: "Basic Tasking and Ergonomic",
    blurb: "Task and ergonomic seating built for everyday work.",
    image: "/looks/seating-clean-and-everyday.png",
    subCategories: ["Task", "Ergonomic"],
  },
  {
    category: "seating",
    slug: "conference-and-executive",
    name: "Conference and Executive",
    blurb: "Boardroom and executive seating for meetings, training rooms, and leadership offices.",
    image: "/looks/seating-conference-and-guests.png",
    subCategories: ["Conference", "Executive"],
  },
  {
    category: "seating",
    slug: "lounge-and-guest",
    name: "Lounge and Guest",
    blurb: "Soft lounge seating and guest chairs for waiting areas, reception, and breakout spaces.",
    image: "/looks/seating-executive-and-lounge.png",
    subCategories: ["Lounge", "Guest"],
  },
  // Desks
  {
    category: "desks",
    slug: "simple-and-clean",
    name: "Simple and clean",
    blurb: "Clean laminate desks and open-plan workstations.",
    image: "/looks/desks-simple-and-clean.png",
    subCategories: ["Open Plan", "Sit-Stand", "Benching"],
  },
  {
    category: "desks",
    slug: "modern-with-detail",
    name: "Modern with detail",
    blurb: "Contemporary desks with warm finishes and detail.",
    image: "/looks/desks-modern-with-detail.png",
    subCategories: ["Private Office", "Collaborative"],
  },
  {
    category: "desks",
    slug: "executive-and-traditional",
    name: "Executive and traditional",
    blurb: "Executive suites in rich wood with hutches and storage.",
    image: "/looks/desks-executive-and-traditional.png",
    subCategories: ["Executive"],
  },
];

export function getLooksByCategory(category: ProductCategory): Look[] {
  return LOOKS.filter((l) => l.category === category);
}

export function getLook(category: string, slug: string): Look | undefined {
  return LOOKS.find((l) => l.category === category && l.slug === slug);
}

export function getLookProducts(look: Look): Product[] {
  const products = getProductsByCategory(look.category);
  const set = new Set(look.subCategories);
  // Only the products curated into this look. An empty look renders a
  // "coming together" state on the look page, not the whole category.
  return products.filter((p) => p.subCategory && set.has(p.subCategory));
}

export function lookPriceFrom(look: Look): number | undefined {
  const prices = getLookProducts(look)
    .map((p) => p.price)
    .filter((n): n is number => typeof n === "number");
  return prices.length ? Math.min(...prices) : undefined;
}
