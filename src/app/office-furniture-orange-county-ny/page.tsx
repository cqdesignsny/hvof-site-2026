import type { Metadata } from "next";
import { CountyLandingTemplate } from "@/components/sections/county-landing-template";
import { COUNTIES } from "@/lib/site";

const COUNTY = COUNTIES.find((c) => c.slug === "orange")!;
const SLUG = "/office-furniture-orange-county-ny";

export const metadata: Metadata = {
  title: `Office Furniture in Orange County, NY`,
  description:
    `Office furniture for Orange County, NY businesses, government, education, and healthcare. New, pre-owned, NYS contract pricing. Delivered from our 37,000 sqft Wappingers Falls showroom.`,
  alternates: { canonical: SLUG },
};

export default function OrangeCountyPage() {
  return (
    <CountyLandingTemplate
      county={COUNTY.name}
      slug={COUNTY.slug}
      driveTime={COUNTY.driveTime}
      cities={COUNTY.cities}
      sectorAngle={COUNTY.sectorAngle}
      notableClients={COUNTY.notableClients}
    />
  );
}
