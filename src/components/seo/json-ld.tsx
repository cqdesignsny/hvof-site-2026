import { SITE } from "@/lib/site";

/**
 * JSON-LD schema components. server components, render <script type="application/ld+json">.
 * Mirrors the WP mu-plugin v2.0 graph: Organization + LocalBusiness/FurnitureStore + WebSite, all linked via @id.
 */

const ORG_ID = `${SITE.url}/#organization`;
const PLACE_ID = `${SITE.url}/#localbusiness`;
const SITE_ID = `${SITE.url}/#website`;

function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}${SITE.logo}`,
    foundingDate: SITE.founded,
    description: SITE.description,
    sameAs: Object.values(SITE.social),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.contact.phoneE164,
      contactType: "sales",
      areaServed: "US-NY",
      availableLanguage: "English",
    },
  };
  return <JsonLd data={data} />;
}

export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FurnitureStore"],
    "@id": PLACE_ID,
    name: SITE.name,
    image: `${SITE.url}${SITE.ogImage}`,
    url: SITE.url,
    telephone: SITE.contact.phoneE164,
    priceRange: "$$-$$$$",
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHoursSpecification: SITE.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
    areaServed: SITE.citiesServed.map((c) => ({
      "@type": "City",
      name: `${c.name}, ${c.state}`,
    })),
  };
  return <JsonLd data={data} />;
}

export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
  return <JsonLd data={data} />;
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${SITE.url}${item.href}`,
    })),
  };
  return <JsonLd data={data} />;
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
  return <JsonLd data={data} />;
}

interface ServiceProps {
  name: string;
  description: string;
  serviceType?: string;
  areaServed?: string;
}

export function ServiceSchema({ name, description, serviceType = "Office Furniture", areaServed }: ServiceProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    provider: { "@id": ORG_ID },
    ...(areaServed && {
      areaServed: { "@type": "City", name: areaServed },
    }),
  };
  return <JsonLd data={data} />;
}
