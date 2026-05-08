/**
 * Single source of truth for HVOF brand identity, location, and meta.
 * All copy that mentions name, address, phone, hours, social, etc. should pull from here.
 */

export const SITE = {
  name: "Hudson Valley Office Furniture",
  shortName: "HVOF",
  legalName: "Hudson Valley Office Furniture, Inc.",
  tagline: "The Hudson Valley's modern office furniture company",
  description:
    "New, pre-owned, and custom office furniture for businesses across the Hudson Valley. The largest showroom between New York City and Albany at 37,000 square feet. Space planning, delivery, and installation by our own team.",
  shortDescription:
    "New, pre-owned, and custom office furniture across the Hudson Valley.",

  url: "https://hvof-site-2026.vercel.app",
  legacyUrl: "https://thewowguys.com",
  logo: "/logo.svg",
  ogImage: "/og.jpg",

  founded: "1985",
  showroomSqft: "37,000",
  largestClaim: "Largest showroom between New York City and Albany",

  address: {
    street: "1404 US-9",
    streetLong: "1404 US Route 9",
    suite: "Alpine Commons",
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
    phone: "(845) 471-7910",
    phoneE164: "+18454717910",
    email: "info@thewowguys.com",
    leadEmail: "cesar@creativequalitymarketing.com",
    typeformUrl: "https://zm2gfgtiy1t.typeform.com/to/JLIMOo51?typeform-source=thewowguys.com",
  },

  hours: [
    { day: "Monday", open: "08:30", close: "17:00" },
    { day: "Tuesday", open: "08:30", close: "17:00" },
    { day: "Wednesday", open: "08:30", close: "17:00" },
    { day: "Thursday", open: "08:30", close: "17:00" },
    { day: "Friday", open: "08:30", close: "17:00" },
  ],
  hoursDisplay: "Mon–Fri · 8:30am–5pm",
  hoursClosed: "Saturday & Sunday closed",

  social: {
    facebook: "https://www.facebook.com/HVOfficeFurniture/",
    instagram: "https://www.instagram.com/hv_office_furniture/",
  },

  /** Used on home + city pages for the trusted-by row */
  trustedBy: [
    "Marshall + Sterling",
    "Marist College",
    "Vassar Brothers Medical",
    "Bard College",
    "Mount Saint Mary",
    "Dutchess Community College",
    "Hudson Valley Federal Credit Union",
    "BCW",
  ],

  /** Manufacturer roster pulled from NYS contracts page (40+) */
  manufacturers: [
    "Steelcase",
    "Herman Miller",
    "Knoll",
    "Humanscale",
    "HON",
    "Global",
    "OFS",
    "KI",
    "Safco",
    "Nightingale",
    "Trinity",
    "Boss",
    "OM Seating",
    "ErgoHuman",
    "Enwork",
    "COE Distributing",
  ],

  // Areas served
  citiesServed: [
    { name: "Poughkeepsie", slug: "poughkeepsie", state: "NY", driveTime: "15 minutes" },
    { name: "Newburgh", slug: "newburgh", state: "NY", driveTime: "25 minutes" },
    { name: "Middletown", slug: "middletown", state: "NY", driveTime: "45 minutes" },
    { name: "Kingston", slug: "kingston", state: "NY", driveTime: "35 minutes" },
    { name: "Beacon", slug: "beacon", state: "NY", driveTime: "12 minutes" },
    { name: "Fishkill", slug: "fishkill", state: "NY", driveTime: "8 minutes" },
    { name: "Wappingers Falls", slug: "wappingers-falls", state: "NY", driveTime: "0 minutes" },
    { name: "White Plains", slug: "white-plains", state: "NY", driveTime: "1 hour" },
    { name: "New Paltz", slug: "new-paltz", state: "NY", driveTime: "30 minutes" },
    { name: "Hyde Park", slug: "hyde-park", state: "NY", driveTime: "20 minutes" },
    { name: "Peekskill", slug: "peekskill", state: "NY", driveTime: "40 minutes" },
    { name: "Rhinebeck", slug: "rhinebeck", state: "NY", driveTime: "30 minutes" },
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
    { label: "Seating", href: "/furniture/seating", description: "Task, executive, ergonomic, conference." },
    { label: "Desks", href: "/furniture/desks", description: "Sit-stand, executive, benching." },
    { label: "Conference", href: "/furniture/conference", description: "Boardrooms and meeting rooms." },
    { label: "Pods & Phonebooths", href: "/furniture/pods", description: "Acoustic privacy spaces." },
    { label: "Healthcare", href: "/furniture/healthcare", description: "Patient and clinical seating." },
    { label: "Education", href: "/furniture/education", description: "Classroom and lecture seating." },
    { label: "Pre-Owned", href: "/furniture/preowned", description: "Inspected, refurbished, save up to 70%." },
    { label: "NYS Contracts", href: "/furniture/nys-contracts", description: "Government and education pricing." },
  ],
  footer: {
    company: [
      { label: "About", href: "/about" },
      { label: "Showroom", href: "/showroom" },
      { label: "Virtual Tour", href: "/virtual-tour" },
      { label: "Case Studies", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
    services: [
      { label: "Space Planning", href: "/services/space-planning" },
      { label: "Delivery & Install", href: "/services/installation" },
      { label: "NYS Contracts", href: "/furniture/nys-contracts" },
      { label: "Request a Quote", href: "/quote" },
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
