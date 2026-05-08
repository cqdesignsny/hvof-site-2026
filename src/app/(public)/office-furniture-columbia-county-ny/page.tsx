import type { Metadata } from "next";
import { CountyLandingTemplate } from "@/components/sections/county-landing-template";
import { COUNTIES } from "@/lib/site";

const COUNTY = COUNTIES.find((c) => c.slug === "columbia")!;
const SLUG = "/office-furniture-columbia-county-ny";

export const metadata: Metadata = {
  title: `Office Furniture in Columbia County, NY`,
  description:
    `Office furniture for Columbia County, NY businesses, government, education, and healthcare. New, pre-owned, NYS contract pricing. Delivered from our 37,000 sqft Wappingers Falls showroom.`,
  alternates: { canonical: SLUG },
};

export default function ColumbiaCountyPage() {
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
