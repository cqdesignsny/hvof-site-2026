import type { Metadata } from "next";
import { LocalLandingTemplate } from "@/components/sections/local-landing-template";
import { cityFaqs } from "@/lib/local-faqs";

const CITY = "Wappingers Falls";
const SLUG = "/office-furniture-wappingers-falls-ny";

export const metadata: Metadata = {
  title: `Office Furniture in ${CITY}, NY`,
  description: `Office furniture in ${CITY} from Hudson Valley Office Furniture, the largest showroom between New York City and Albany. Walk-ins welcome on Route 9.`,
  alternates: { canonical: SLUG },
};

export default function WappingersFallsPage() {
  return (
    <LocalLandingTemplate
      city={CITY}
      driveTime="0 minutes, you are here"
      intro={`Our 37,000 sqft showroom is at 1404 US-9 in ${CITY}. Walk in any weekday and sit in every chair, try every desk, and walk through every workstation pod we stock. The largest office furniture showroom between New York City and Albany.`}
      faqs={cityFaqs(CITY)}
      href={SLUG}
    />
  );
}
