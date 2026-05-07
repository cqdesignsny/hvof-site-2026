import type { Metadata } from "next";
import { CategoryTemplate } from "@/components/sections/category-template";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Office Seating",
  description:
    "Task chairs, executive seating, ergonomic chairs, and conference seating from Steelcase, Herman Miller, Knoll, and HON. Sit in the chair before you spec.",
};

export default function SeatingPage() {
  return (
    <CategoryTemplate
      eyebrow="Furniture · Seating"
      title="Seating that earns its eight hours."
      intro="Task, executive, ergonomic, conference, lounge. Steelcase, Herman Miller, Knoll, HON, Humanscale, and a dozen specialty brands. Sit in the chair before you spec."
      heroImage={IMG.marshallSterling.angle14}
      heroAlt="HVOF office seating installation"
      breadcrumb="Seating"
      href="/furniture/seating"
      subCategories={[
        {
          name: "Task seating",
          description: "Daily-use ergonomic chairs for individual workstations. Mesh, fabric, leather. Adjustable arms, lumbar, depth.",
          startingPrice: "From $249",
        },
        {
          name: "Executive seating",
          description: "High-back leather and fabric chairs for private offices. Conference-grade fit and finish.",
          startingPrice: "From $599",
        },
        {
          name: "Ergonomic specialty",
          description: "BIFMA-certified ergonomic chairs for healthcare, dispatch, and 24/7 use environments.",
          startingPrice: "From $799",
        },
        {
          name: "Conference seating",
          description: "Boardroom and meeting-room chairs in matched suites of 6, 8, 12, or more.",
          startingPrice: "From $349",
        },
        {
          name: "Lounge & soft seating",
          description: "Modular lobby and breakroom seating. Single chairs, sofas, ottomans, and cluster pods.",
          startingPrice: "From $499",
        },
        {
          name: "Stools & drafting",
          description: "Counter-height and drafting stools for labs, reception, and standing-desk pairings.",
          startingPrice: "From $189",
        },
        {
          name: "Pre-owned task",
          description: "Inspected, cleaned, and warrantied. Tier-A brands at a third of new pricing.",
          startingPrice: "From $99",
        },
        {
          name: "Healthcare seating",
          description: "Antimicrobial, vinyl-wrapped, bariatric, and patient-room chairs that meet clinical standards.",
        },
      ]}
      features={[
        "Free in-showroom trials — sit in any chair for as long as you want.",
        "Custom upholstery and finish matching to your brand or existing palette.",
        "BIFMA-certified construction and warranty registration handled by us.",
        "Installation crew adjusts every chair to its end-user on delivery day.",
        "Pre-owned options inspected, cleaned, and warranted in-house.",
        "Bulk pricing on orders of 12+ matched chairs. Volume discounts on 50+.",
      ]}
      faqs={[
        {
          question: "Can I try a chair before buying?",
          answer:
            "Always. Every chair we sell is in the showroom and available for hands-on testing. We also offer 7-day office trials on select task chairs over $600.",
        },
        {
          question: "What's the warranty on task seating?",
          answer:
            "New chairs from major brands carry 10–12 year manufacturer warranties on frames and 5–7 years on upholstery and mechanisms. Pre-owned chairs come with our in-house 1-year warranty.",
        },
        {
          question: "Do you handle warranty service?",
          answer:
            "Yes. We register every chair with the manufacturer at delivery, and our team handles warranty claims so you don&apos;t spend an hour on hold with a 1-800 number.",
        },
        {
          question: "Can I order custom upholstery?",
          answer:
            "Yes. All major brands offer custom fabric and leather options. We carry sample books in the showroom and can match to brand colors, existing palettes, or commercial-grade requirements.",
        },
        {
          question: "Lead times for custom seating?",
          answer:
            "In-stock task chairs ship in 1–2 weeks. Custom-upholstered orders typically run 6–10 weeks depending on the brand. We give a hard date with the quote.",
        },
      ]}
    />
  );
}
