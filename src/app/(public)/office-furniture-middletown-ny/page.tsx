import type { Metadata } from "next";
import { LocalLandingTemplate } from "@/components/sections/local-landing-template";
import { cityFaqs } from "@/lib/local-faqs";

const CITY = "Middletown";
const SLUG = "/office-furniture-middletown-ny";

export const metadata: Metadata = {
  title: `Office Furniture in ${CITY}, NY`,
  description: `Office furniture for ${CITY} businesses, healthcare facilities, and Orange County government. New, pre-owned, NYS contract pricing, delivered from Wappingers Falls.`,
  alternates: { canonical: SLUG },
};

export default function MiddletownPage() {
  return (
    <LocalLandingTemplate
      city={CITY}
      driveTime="45 minutes"
      intro={`Hudson Valley Office Furniture covers ${CITY} and Orange County with task seating, executive suites, conference rooms, and healthcare environments. NYS contract pricing for OGS, BOCES, and municipal buyers.`}
      faqs={cityFaqs(CITY)}
      href={SLUG}
    />
  );
}
