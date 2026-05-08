import type { Metadata } from "next";
import { CategoryTemplate } from "@/components/sections/category-template";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Pre-Owned Office Furniture",
  description:
    "Inspected, refurbished, warrantied pre-owned office furniture. Tier-A brands at a fraction of new pricing. Save 50 to 70 percent without compromising quality.",
};

export default function PreOwnedPage() {
  return (
    <CategoryTemplate
      category="preowned"
      eyebrow="Furniture, Pre-Owned"
      title="Tier-A brands. Half the price. Same warranty discipline."
      intro="We inspect, clean, and warranty every pre-owned piece in our showroom. For startups, expansions, or anyone watching the budget, pre-owned is often the smarter buy."
      heroImage={IMG.marshallSterling.angle20}
      heroAlt="HVOF pre-owned showroom"
      breadcrumb="Pre-Owned"
      href="/furniture/preowned"
      subCategories={[
        { name: "Pre-owned task seating", description: "Inspected Herman Miller Aeron, Steelcase Leap, Knoll, and HON task chairs.", startingPrice: "From $99" },
        { name: "Pre-owned executive", description: "Refurbished executive chairs and desks in walnut, oak, and laminate.", startingPrice: "From $399" },
        { name: "Pre-owned systems", description: "Reconfigured workstations and panel systems sized to your floor plate.", startingPrice: "Quoted by config" },
        { name: "Pre-owned conference", description: "Boardroom and training-room tables in stocked and custom sizes.", startingPrice: "From $599" },
        { name: "Pre-owned filing", description: "2-, 3-, 4-, and 5-drawer file cabinets, lockable storage, lateral files.", startingPrice: "From $149" },
        { name: "Pre-owned reception", description: "Reception desks, lobby seating, and waiting-area soft-seating.", startingPrice: "From $499" },
      ]}
      features={[
        "Every chair inspected, mechanism-tested, cleaned, and warrantied for 1 year in-house.",
        "Tier-A brands only. We do not stock unknown imports.",
        "Refurbishment includes new fabric or leather where required, replacement gas cylinders, and missing-part backfill.",
        "Pre-owned and new can ship on the same delivery to keep timelines tight.",
      ]}
      faqs={[
        {
          question: "How much can I save buying pre-owned?",
          answer: "Typically 50 to 70 percent off new pricing for the same brand and same model. Some specialty configurations save more.",
        },
        {
          question: "What is the warranty on pre-owned?",
          answer: "Every pre-owned piece comes with our 1-year in-house warranty covering mechanisms, frame, and any refurbishment work we performed.",
        },
        {
          question: "Can I buy pre-owned and new together?",
          answer: "Yes, we mix new and pre-owned in the same quote all the time. The goal is the best room for the budget you have.",
        },
        {
          question: "How big is the pre-owned inventory?",
          answer: "We typically have several hundred pieces in stock at any given time, with new arrivals weekly. The showroom is the best way to see what is available.",
        },
      ]}
    />
  );
}
