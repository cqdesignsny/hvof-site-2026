import type { Metadata } from "next";
import { LocalLandingTemplate } from "@/components/sections/local-landing-template";
import { cityFaqs } from "@/lib/local-faqs";

const CITY = "Peekskill";
const SLUG = "/office-furniture-peekskill-ny";

export const metadata: Metadata = {
  title: `Office Furniture in ${CITY}, NY`,
  description: `Office furniture for ${CITY} businesses, NewYork-Presbyterian Hudson Valley Hospital, and downtown professional offices. Delivered from Wappingers Falls.`,
  alternates: { canonical: SLUG },
};

export default function PeekskillPage() {
  return (
    <LocalLandingTemplate
      city={CITY}
      driveTime="40 minutes"
      intro={`Hudson Valley Office Furniture covers ${CITY} and the lower Westchester corridor. Healthcare seating, executive offices, conference rooms, and small-business furniture with prompt quotes.`}
      faqs={cityFaqs(CITY)}
      href={SLUG}
    />
  );
}
