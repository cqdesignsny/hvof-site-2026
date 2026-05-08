import type { Metadata } from "next";
import { LocalLandingTemplate } from "@/components/sections/local-landing-template";
import { cityFaqs } from "@/lib/local-faqs";

const CITY = "Beacon";
const SLUG = "/office-furniture-beacon-ny";

export const metadata: Metadata = {
  title: `Office Furniture in ${CITY}, NY`,
  description: `Office furniture for ${CITY}'s growing arts district, creative studios, and downtown professional offices. New, pre-owned, custom, delivered from Wappingers Falls.`,
  alternates: { canonical: SLUG },
};

export default function BeaconPage() {
  return (
    <LocalLandingTemplate
      city={CITY}
      driveTime="12 minutes"
      intro={`Hudson Valley Office Furniture is just up Route 9 from ${CITY}. Single chairs to full studio buildouts. Task seating, height-adjustable desks, conference furniture, and reception environments for offices, galleries, and creative studios.`}
      faqs={cityFaqs(CITY)}
      href={SLUG}
    />
  );
}
