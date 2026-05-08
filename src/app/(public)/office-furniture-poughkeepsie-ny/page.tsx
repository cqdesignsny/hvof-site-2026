import type { Metadata } from "next";
import { LocalLandingTemplate } from "@/components/sections/local-landing-template";
import { cityFaqs } from "@/lib/local-faqs";

const CITY = "Poughkeepsie";
const SLUG = "/office-furniture-poughkeepsie-ny";

export const metadata: Metadata = {
  title: `Office Furniture in ${CITY}, NY`,
  description: `Office furniture delivery and installation for ${CITY} businesses. New, pre-owned, custom. from our 37,000 sqft Wappingers Falls showroom, 15 minutes north of ${CITY}.`,
  alternates: { canonical: SLUG },
};

export default function PoughkeepsiePage() {
  return (
    <LocalLandingTemplate
      city={CITY}
      driveTime="15 minutes"
      intro={`Hudson Valley Office Furniture has installed for ${CITY}'s largest insurance brokers, hospitals, colleges, and law firms. Task seating, full-floor systems, healthcare suites, conference rooms. quoted same-day, installed by our crew.`}
      faqs={cityFaqs(CITY)}
      href={SLUG}
    />
  );
}
