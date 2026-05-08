import type { Metadata } from "next";
import { CategoryTemplate } from "@/components/sections/category-template";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Office Desks",
  description:
    "Sit-stand, executive, benching, and height-adjustable desks. Steelcase, OFS, Knoll, HON. Single units to floor-wide installs, delivered and installed by our crews.",
};

export default function DesksPage() {
  return (
    <CategoryTemplate
      eyebrow="Furniture, Desks"
      title="Desks built around the way you actually work."
      intro="Single sit-stand for the home office. Bench-seating systems for thirty engineers. Walnut executive suites. We spec the right top, the right column, and the right cable management for every floor."
      heroImage={IMG.marist.three}
      heroAlt="HVOF desk installation"
      breadcrumb="Desks"
      href="/furniture/desks"
      subCategories={[
        { name: "Sit-stand desks", description: "Electric height-adjustable, 3-stage column, programmable presets. Available in laminate, veneer, and solid wood tops.", startingPrice: "From $849" },
        { name: "Executive desks", description: "L-shape and U-shape executive workstations with integrated cable management and credenzas.", startingPrice: "From $1,899" },
        { name: "Benching systems", description: "Open-plan benches, modular and expandable. 4, 6, 8, or 10-seat configurations with shared power.", startingPrice: "From $1,649 per seat" },
        { name: "Private office desks", description: "Single-user height-adjustable and fixed-height desks for private offices.", startingPrice: "From $549" },
        { name: "Reception desks", description: "Custom and stocked reception desks. Transaction tops, ADA counters, modesty panels.", startingPrice: "From $2,199" },
        { name: "Conference + training tables", description: "Boardroom and training-room tables. Boat-shape, racetrack, rectangular, and custom.", startingPrice: "From $1,449" },
      ]}
      features={[
        "Electric and pneumatic adjustment options on every sit-stand model.",
        "Wire trays, grommets, and integrated power available on every desk.",
        "Custom finishes available on most lines, including walnut, oak, white, and laminate.",
        "BIFMA-certified construction with 10 to 12 year manufacturer warranties.",
        "Bulk pricing on orders of 6+ matched desks. Volume discounts on 25+.",
      ]}
      faqs={[
        {
          question: "What is the lead time on a sit-stand desk?",
          answer: "In-stock laminate models typically ship in 1 to 2 weeks. Custom-veneer or specialty-finish orders run 4 to 8 weeks depending on the manufacturer.",
        },
        {
          question: "Do you handle the install and the cable management?",
          answer: "Yes. Our crews assemble, level, and route cabling on every desk we install. We bring the gear and we test the lift on every unit before we leave.",
        },
        {
          question: "Can you match an existing finish?",
          answer: "Most of the time. We carry sample books, can pull custom laminates and veneers, and have factory color-matching available on a number of our lines.",
        },
        {
          question: "Do you sell pre-owned desks?",
          answer: "Yes. We always have an inventory of inspected pre-owned executive and sit-stand desks at a fraction of new pricing.",
        },
      ]}
    />
  );
}
