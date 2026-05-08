import type { Metadata } from "next";
import { LocalLandingTemplate } from "@/components/sections/local-landing-template";
import { cityFaqs } from "@/lib/local-faqs";

const CITY = "Hyde Park";
const SLUG = "/office-furniture-hyde-park-ny";

export const metadata: Metadata = {
  title: `Office Furniture in ${CITY}, NY`,
  description: `Office furniture for ${CITY} businesses, the Culinary Institute of America, and surrounding professional offices. Delivered and installed from Wappingers Falls.`,
  alternates: { canonical: SLUG },
};

export default function HydeParkPage() {
  return (
    <LocalLandingTemplate
      city={CITY}
      driveTime="20 minutes"
      intro={`Hudson Valley Office Furniture serves ${CITY} and the Route 9 corridor heading north. Healthcare, hospitality, education, and small-business furniture with same-day quotes and in-house install.`}
      faqs={cityFaqs(CITY)}
      href={SLUG}
    />
  );
}
