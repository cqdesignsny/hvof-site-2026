/**
 * Single source of truth for HVOF brand identity, location, and meta.
 * All copy that mentions name, address, phone, hours, social, etc. should pull from here.
 */

export const SITE = {
  name: "Hudson Valley Office Furniture",
  shortName: "HVOF",
  legalName: "Hudson Valley Office Furniture, Inc.",
  tagline: "Hudson Valley's office furniture authority since 1985",
  description:
    "New, pre-owned, and custom office furniture for businesses across the Hudson Valley and Greater New York. 37,000 sqft showroom in Wappingers Falls. Full installations, space planning, and on-time delivery since 1985.",
  shortDescription:
    "New, pre-owned, and custom office furniture across the Hudson Valley.",

  url: "https://hvof-site-2026.vercel.app", // updated post-deploy
  legacyUrl: "https://thewowguys.com",
  logo: "/logo.svg",
  ogImage: "/og.jpg",

  founded: "1985",
  showroomSqft: "37,000",

  address: {
    street: "1404 US Route 9",
    city: "Wappingers Falls",
    region: "NY",
    state: "New York",
    postalCode: "12590",
    country: "US",
  },

  geo: {
    latitude: 41.6087,
    longitude: -73.8851,
  },

  contact: {
    phone: "(845) 297-8800",
    phoneE164: "+18452978800",
    email: "info@thewowguys.com",
    leadEmail: "cesar@creativequalitymarketing.com",
  },

  hours: [
    { day: "Monday", open: "08:30", close: "17:00" },
    { day: "Tuesday", open: "08:30", close: "17:00" },
    { day: "Wednesday", open: "08:30", close: "17:00" },
    { day: "Thursday", open: "08:30", close: "17:00" },
    { day: "Friday", open: "08:30", close: "17:00" },
    { day: "Saturday", open: "10:00", close: "15:00" },
  ],
  hoursDisplay: "Mon–Fri 8:30am–5pm · Sat 10am–3pm",

  social: {
    facebook: "https://www.facebook.com/hvofurniture",
    instagram: "https://www.instagram.com/hudsonvalleyofficefurniture",
    linkedin: "https://www.linkedin.com/company/hudson-valley-office-furniture",
    youtube: "https://www.youtube.com/@hudsonvalleyofficefurniture",
  },

  // Areas served — used for LocalBusiness areaServed schema and city page generation
  citiesServed: [
    { name: "Poughkeepsie", slug: "poughkeepsie", state: "NY" },
    { name: "Newburgh", slug: "newburgh", state: "NY" },
    { name: "Middletown", slug: "middletown", state: "NY" },
    { name: "Kingston", slug: "kingston", state: "NY" },
    { name: "Beacon", slug: "beacon", state: "NY" },
    { name: "Fishkill", slug: "fishkill", state: "NY" },
    { name: "Wappingers Falls", slug: "wappingers-falls", state: "NY" },
    { name: "White Plains", slug: "white-plains", state: "NY" },
    { name: "New Paltz", slug: "new-paltz", state: "NY" },
    { name: "Hyde Park", slug: "hyde-park", state: "NY" },
    { name: "Peekskill", slug: "peekskill", state: "NY" },
    { name: "Rhinebeck", slug: "rhinebeck", state: "NY" },
  ],
} as const;

export const NAV = {
  primary: [
    { label: "Work", href: "/work" },
    { label: "Furniture", href: "/furniture" },
    { label: "Showroom", href: "/showroom" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  furniture: [
    { label: "Seating", href: "/furniture/seating", description: "Task, executive, ergonomic." },
    { label: "Desks", href: "/furniture/desks", description: "Sit-stand, executive, benching." },
    { label: "Conference", href: "/furniture/conference", description: "Boardrooms and meeting rooms." },
    { label: "Systems", href: "/furniture/systems", description: "Workstations and panels." },
    { label: "Healthcare", href: "/furniture/healthcare", description: "Patient and clinical seating." },
    { label: "Pods & Phonebooths", href: "/furniture/pods", description: "Acoustic privacy spaces." },
    { label: "Education", href: "/furniture/education", description: "Classroom and lecture seating." },
    { label: "Pre-Owned", href: "/furniture/preowned", description: "Inspected, refurbished inventory." },
    { label: "NYS Contracts", href: "/furniture/nys-contracts", description: "OGS pricing and procurement." },
  ],
  footer: {
    company: [
      { label: "About", href: "/about" },
      { label: "Showroom", href: "/showroom" },
      { label: "Case Studies", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
    services: [
      { label: "Space Planning", href: "/services/space-planning" },
      { label: "Installation", href: "/services/installation" },
      { label: "Delivery", href: "/services/delivery" },
      { label: "NYS Contracts", href: "/furniture/nys-contracts" },
    ],
  },
} as const;

export type CityServed = (typeof SITE.citiesServed)[number];

/** Hudson Valley counties used in copy and SEO tags */
export const COUNTIES_SERVED = [
  "Dutchess",
  "Orange",
  "Ulster",
  "Putnam",
  "Westchester",
  "Rockland",
  "Sullivan",
  "Columbia",
] as const;
