import type { Metadata } from "next";
import { LocalLandingTemplate } from "@/components/sections/local-landing-template";
import { cityFaqs } from "@/lib/local-faqs";

const CITY = "Kingston";
const SLUG = "/office-furniture-kingston-ny";

export const metadata: Metadata = {
  title: `Office Furniture in ${CITY}, NY`,
  description: `Office furniture for ${CITY} businesses, Ulster County government, and HealthAlliance facilities. Pre-owned and new from our Wappingers Falls showroom.`,
  alternates: { canonical: SLUG },
};

export default function KingstonPage() {
  return (
    <LocalLandingTemplate
      city={CITY}
      driveTime="35 minutes"
      intro={`Hudson Valley Office Furniture serves ${CITY} and Ulster County. Task seating, sit-stand desks, conference rooms, healthcare suites, and full-floor reconfigurations. Same-day quotes, in-house install crews.`}
      faqs={cityFaqs(CITY)}
      href={SLUG}
    />
  );
}
