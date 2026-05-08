import type { Metadata } from "next";
import { CategoryTemplate } from "@/components/sections/category-template";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Reception + Lobby Furniture",
  description:
    "Reception desks, lobby soft-seating, signage walls, and the first impression that sets the tone. Custom sizes, ADA transaction tops, integrated power-data.",
};

export default function ReceptionPage() {
  return (
    <CategoryTemplate
      category="reception"
      eyebrow="Furniture, Reception"
      title="The first thing every visitor sees."
      intro="Reception desks, lobby seating, and the front-door environment that tells visitors what kind of company you are. Stock and custom builds, finished to match your brand."
      heroImage={IMG.marist.four}
      heroAlt="HVOF reception installation"
      breadcrumb="Reception"
      href="/furniture/reception"
      subCategories={[
        { name: "Reception desks", description: "L-shape, U-shape, and curved reception desks. Transaction-height ADA counters available.", startingPrice: "From $2,499" },
        { name: "Lobby soft-seating", description: "Lounge sofas, club chairs, and modular soft-seating clusters.", startingPrice: "From $899" },
        { name: "Side + accent tables", description: "Stocked and custom side tables, coffee tables, and consoles.", startingPrice: "From $349" },
        { name: "Signage + brand walls", description: "Backlit logos, dimensional letters, and finish-matched feature walls.", startingPrice: "Quoted" },
        { name: "Visitor seating", description: "Welcome chairs, branded benches, and waiting-area seating.", startingPrice: "From $399" },
      ]}
      features={[
        "Custom transaction-top heights, ADA-compliant lower counters integrated.",
        "Power, data, and intercom routed through the desk.",
        "Custom finish matching to brand palette or building palette.",
        "Coordinated with signage, lighting, and any millwork your contractor needs to deliver.",
      ]}
      faqs={[
        {
          question: "Can you build a custom reception desk to match our brand?",
          answer: "Yes. We quote field-built and factory-built custom reception desks in any finish, with logos, signage cuts, and integrated lighting.",
        },
        {
          question: "Do you handle ADA compliance?",
          answer: "Every reception desk we sell is available with an ADA-height transaction top. We verify reach ranges and approach clearances during the field measurement.",
        },
        {
          question: "How long does a custom reception take?",
          answer: "Custom reception desks typically run 8 to 12 weeks from approval to delivery. Stock units ship in 2 to 4 weeks.",
        },
      ]}
    />
  );
}
