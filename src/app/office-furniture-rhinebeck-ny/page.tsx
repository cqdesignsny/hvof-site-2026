import type { Metadata } from "next";
import { LocalLandingTemplate } from "@/components/sections/local-landing-template";
import { cityFaqs } from "@/lib/local-faqs";

const CITY = "Rhinebeck";
const SLUG = "/office-furniture-rhinebeck-ny";

export const metadata: Metadata = {
  title: `Office Furniture in ${CITY}, NY`,
  description: `Office furniture for ${CITY} professional offices, Northern Dutchess Hospital, and Bard College. Delivered from our 37,000 sqft Wappingers Falls showroom.`,
  alternates: { canonical: SLUG },
};

export default function RhinebeckPage() {
  return (
    <LocalLandingTemplate
      city={CITY}
      driveTime="30 minutes"
      intro={`Hudson Valley Office Furniture serves ${CITY}, Bard College, and northern Dutchess County. Healthcare, education, town offices, and small-business furniture with NYS contract pricing for institutional buyers.`}
      faqs={cityFaqs(CITY)}
      href={SLUG}
    />
  );
}
