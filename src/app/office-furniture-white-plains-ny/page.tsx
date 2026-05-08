import type { Metadata } from "next";
import { LocalLandingTemplate } from "@/components/sections/local-landing-template";
import { cityFaqs } from "@/lib/local-faqs";

const CITY = "White Plains";
const SLUG = "/office-furniture-white-plains-ny";

export const metadata: Metadata = {
  title: `Office Furniture in ${CITY}, NY`,
  description: `Office furniture for ${CITY} corporate tenants and Westchester County businesses. Executive suites, conference rooms, full-floor installs from our Wappingers Falls showroom.`,
  alternates: { canonical: SLUG },
};

export default function WhitePlainsPage() {
  return (
    <LocalLandingTemplate
      city={CITY}
      driveTime="1 hour"
      intro={`Hudson Valley Office Furniture covers ${CITY} and the Westchester corporate corridor. Executive suites, multi-tenant office buildings, professional services firms, and full-floor reconfigurations. NYS contract pricing for state-affiliated tenants.`}
      faqs={cityFaqs(CITY)}
      href={SLUG}
    />
  );
}
