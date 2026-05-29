import type { Metadata } from "next";
import { LocalLandingTemplate } from "@/components/sections/local-landing-template";
import { cityFaqs } from "@/lib/local-faqs";

const CITY = "New Paltz";
const SLUG = "/office-furniture-new-paltz-ny";

export const metadata: Metadata = {
  title: `Office Furniture in ${CITY}, NY`,
  description: `Office furniture for ${CITY} businesses, SUNY New Paltz, and town offices. NYS contract pricing for institutional buyers, delivered from Wappingers Falls.`,
  alternates: { canonical: SLUG },
};

export default function NewPaltzPage() {
  return (
    <LocalLandingTemplate
      city={CITY}
      driveTime="30 minutes"
      intro={`Hudson Valley Office Furniture serves ${CITY}, SUNY New Paltz, and Ulster County. Education, government, and small-business furniture with NYS contract pricing where eligible. Prompt quotes, in-house install crews.`}
      faqs={cityFaqs(CITY)}
      href={SLUG}
    />
  );
}
