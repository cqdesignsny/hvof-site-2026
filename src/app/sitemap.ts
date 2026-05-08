import type { MetadataRoute } from "next";
import { SITE, NAV, COUNTIES } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url.replace(/\/$/, "");

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/showroom", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/virtual-tour", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/quote", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/gallery", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/e-catalog", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/nys-contracts", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/giveaway", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/office-furniture-hudson-valley-ny", priority: 0.9, changeFrequency: "monthly" as const },
  ];

  const furnitureRoutes = NAV.furniture.map((f) => ({
    path: f.href,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const cityRoutes = SITE.citiesServed.map((c) => ({
    path: `/office-furniture-${c.slug}-ny`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const countyRoutes = COUNTIES.map((c) => ({
    path: `/office-furniture-${c.slug}-county-ny`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...furnitureRoutes, ...cityRoutes, ...countyRoutes].map(
    ({ path, priority, changeFrequency }) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }),
  );
}
