/**
 * Product catalog. Real SKUs and pricing pulled from the live thewowguys.com site.
 * For tonight's demo: chairs are real, other categories are placeholders for the same shape.
 *
 * In production this should come from the e-commerce backend / WooCommerce export.
 */

export type ProductCategory =
  | "seating"
  | "desks"
  | "conference"
  | "pods"
  | "healthcare"
  | "education"
  | "preowned";

export interface Product {
  sku: string;
  name: string;
  category: ProductCategory;
  subCategory?: string;
  price: number;
  originalPrice?: number;
  description: string;
  image?: string;
  /** Internal note: e.g. "Ergonomic mesh task chair" */
  type?: string;
}

const FALLBACK_IMAGE = "/product-placeholder.svg";

export const PRODUCTS: Product[] = [
  // SEATING — real SKUs from live site
  {
    sku: "HVOF-11730B",
    name: "HVOF 11730B Task Chair",
    category: "seating",
    subCategory: "Task",
    price: 369,
    originalPrice: 638,
    description: "Mid-back ergonomic task chair with adjustable arms, lumbar, and seat depth.",
    image: FALLBACK_IMAGE,
    type: "Task seating",
  },
  {
    sku: "HVOF-4003",
    name: "HVOF 4003 Mesh Task",
    category: "seating",
    subCategory: "Task",
    price: 339,
    originalPrice: 570,
    description: "Mesh-back task chair, ideal for daily 8-hour use. BIFMA-certified.",
    image: FALLBACK_IMAGE,
    type: "Task seating",
  },
  {
    sku: "HVOF-7621",
    name: "HVOF 7621 Conference Chair",
    category: "seating",
    subCategory: "Conference",
    price: 239,
    originalPrice: 654,
    description: "Mid-back conference seating in matched suites of 6, 8, or 12.",
    image: FALLBACK_IMAGE,
    type: "Conference",
  },
  {
    sku: "HVOF-7754",
    name: "HVOF 7754 Executive",
    category: "seating",
    subCategory: "Executive",
    price: 379,
    originalPrice: 973,
    description: "High-back executive chair in fabric or leather. Boardroom-grade fit and finish.",
    image: FALLBACK_IMAGE,
    type: "Executive",
  },
  {
    sku: "HVOF-B8-Engage",
    name: "HVOF B8 Engage",
    category: "seating",
    subCategory: "Task",
    price: 399,
    originalPrice: 715,
    description: "Engage-series task chair with adjustable seat depth and 4D arms.",
    image: FALLBACK_IMAGE,
    type: "Task seating",
  },
  {
    sku: "HVOF-BM-9000",
    name: "HVOF BM 9000",
    category: "seating",
    subCategory: "Task",
    price: 499,
    originalPrice: 888,
    description: "Heavy-duty task seating rated for 24/7 use. Healthcare and dispatch approved.",
    image: FALLBACK_IMAGE,
    type: "Heavy-duty task",
  },
  {
    sku: "HVOF-LE521",
    name: "HVOF LE521 Executive",
    category: "seating",
    subCategory: "Executive",
    price: 449,
    originalPrice: 701,
    description: "Leather-wrapped executive chair with polished aluminum base.",
    image: FALLBACK_IMAGE,
    type: "Executive",
  },
  {
    sku: "HVOF-ME7ERG",
    name: "HVOF ME7ERG Gen-2 Ergonomic",
    category: "seating",
    subCategory: "Ergonomic",
    price: 849,
    originalPrice: 1800,
    description: "Top-tier ergonomic chair. Mesh back, headrest, lumbar, multi-position lock.",
    image: FALLBACK_IMAGE,
    type: "Ergonomic specialty",
  },
  {
    sku: "HVOF-OM-TRULY",
    name: "HVOF OM Truly",
    category: "seating",
    subCategory: "Ergonomic",
    price: 849,
    originalPrice: 1800,
    description: "OM Seating Truly — premium ergonomic with full-height back support.",
    image: FALLBACK_IMAGE,
    type: "Ergonomic specialty",
  },
  {
    sku: "HVOF-OSTW8001",
    name: "HVOF OSTW8001",
    category: "seating",
    subCategory: "Task",
    price: 249,
    originalPrice: 561,
    description: "Entry-tier task chair. Adjustable height, swivel base, contour seat.",
    image: FALLBACK_IMAGE,
    type: "Task seating",
  },
  {
    sku: "HVOF-Vion-6321",
    name: "HVOF Vion 6321-8",
    category: "seating",
    subCategory: "Executive",
    price: 649,
    originalPrice: 1096,
    description: "Vion 6321 high-back executive with synchro-tilt and integrated lumbar.",
    image: FALLBACK_IMAGE,
    type: "Executive",
  },
  {
    sku: "HVOF-YS78",
    name: "HVOF YS78 Mesh Pro",
    category: "seating",
    subCategory: "Task",
    price: 549,
    description: "Mesh-back task with auto-adjusting lumbar. Available in 2 colorways.",
    image: FALLBACK_IMAGE,
    type: "Task seating",
  },
  {
    sku: "HVOF-YS79",
    name: "HVOF YS79 Mesh Plus",
    category: "seating",
    subCategory: "Task",
    price: 624,
    description: "Upgraded mesh task with headrest. Available in 2 colorways.",
    image: FALLBACK_IMAGE,
    type: "Task seating",
  },

  // DESKS — placeholder shape until real catalog
  {
    sku: "HVOF-DESK-SS72",
    name: "Sit-Stand Desk 72\"",
    category: "desks",
    subCategory: "Sit-Stand",
    price: 1149,
    description: "Electric height-adjustable sit-stand desk, 72\" laminate top, 3-stage column.",
    image: FALLBACK_IMAGE,
  },
  {
    sku: "HVOF-DESK-EXEC",
    name: "Executive L-Desk",
    category: "desks",
    subCategory: "Executive",
    price: 2899,
    description: "Walnut veneer L-shaped executive desk with integrated cable management.",
    image: FALLBACK_IMAGE,
  },
  {
    sku: "HVOF-DESK-BENCH",
    name: "Benching Workstation",
    category: "desks",
    subCategory: "Benching",
    price: 1849,
    description: "Open-plan benching system. Modular, expandable, available in 4-, 6-, 8-seat configurations.",
    image: FALLBACK_IMAGE,
  },

  // CONFERENCE
  {
    sku: "HVOF-CONF-12FT",
    name: "12 ft Conference Table",
    category: "conference",
    subCategory: "Boardroom",
    price: 4299,
    description: "Boat-shape conference table on slab base. Walnut, oak, and cypress finishes available.",
    image: FALLBACK_IMAGE,
  },
];

export function getProductsByCategory(category: ProductCategory) {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductBySku(sku: string) {
  return PRODUCTS.find((p) => p.sku === sku);
}

export function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US")}`;
}
