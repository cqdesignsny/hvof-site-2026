import type { Metadata } from "next";
import { LocalLandingTemplate } from "@/components/sections/local-landing-template";
import { cityFaqs } from "@/lib/local-faqs";

const CITY = "Newburgh";
const SLUG = "/office-furniture-newburgh-ny";

export const metadata: Metadata = {
  title: `Office Furniture in ${CITY}, NY`,
  description: `Office furniture delivery and installation for ${CITY} businesses along the I-84 corridor. New, pre-owned, custom, from our 37,000 sqft Wappingers Falls showroom.`,
  alternates: { canonical: SLUG },
};

export default function NewburghPage() {
  return (
    <LocalLandingTemplate
      city={CITY}
      driveTime="25 minutes"
      intro={`Hudson Valley Office Furniture serves ${CITY} and the I-84 corridor with task seating, sit-stand desks, conference rooms, and full-floor installations. Healthcare, finance, education, and government buyers welcome.`}
      faqs={cityFaqs(CITY)}
      href={SLUG}
    />
  );
}
