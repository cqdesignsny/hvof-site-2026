import type { Metadata } from "next";
import { LocalLandingTemplate } from "@/components/sections/local-landing-template";
import { cityFaqs } from "@/lib/local-faqs";

const CITY = "Fishkill";
const SLUG = "/office-furniture-fishkill-ny";

export const metadata: Metadata = {
  title: `Office Furniture in ${CITY}, NY`,
  description: `Office furniture delivery and installation for businesses in ${CITY}, NY. New, pre-owned, custom — direct from our 37,000 sqft Wappingers Falls showroom, 8 minutes from ${CITY}.`,
  alternates: { canonical: SLUG },
};

export default function FishkillPage() {
  return (
    <LocalLandingTemplate
      city={CITY}
      driveTime="8 minutes"
      intro={`Hudson Valley Office Furniture serves ${CITY} and the Route 9 corridor with task seating, desks, conference rooms, and full-floor installations. New, pre-owned, custom — quoted same-day, delivered fast, installed by our own crew.`}
      faqs={cityFaqs(CITY)}
      href={SLUG}
    />
  );
}
