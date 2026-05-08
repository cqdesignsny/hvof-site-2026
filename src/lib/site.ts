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
    // Placeholder. Confirm or update the company URL.
    linkedin: "https://www.linkedin.com/company/hudson-valley-office-furniture/",
  },

  /** Trusted-by partner logos. Sourced from the live thewowguys.com CDN. */
  trustedBy: [
    { name: "Partner 1", logoUrl: "https://thewowguys.com/wp-content/uploads/2026/02/1.png" },
    { name: "Partner 2", logoUrl: "https://thewowguys.com/wp-content/uploads/2026/02/2.png" },
    { name: "Partner 3", logoUrl: "https://thewowguys.com/wp-content/uploads/2026/02/3.png" },
    { name: "Partner 4", logoUrl: "https://thewowguys.com/wp-content/uploads/2026/02/4.png" },
    { name: "Partner 5", logoUrl: "https://thewowguys.com/wp-content/uploads/2026/02/5.png" },
    { name: "Partner 6", logoUrl: "https://thewowguys.com/wp-content/uploads/2026/02/6.png" },
    { name: "Partner 7", logoUrl: "https://thewowguys.com/wp-content/uploads/2026/02/7.png" },
    { name: "Partner 8", logoUrl: "https://thewowguys.com/wp-content/uploads/2026/02/8.png" },
    { name: "Partner 9", logoUrl: "https://thewowguys.com/wp-content/uploads/2026/02/9.png" },
    { name: "Partner 10", logoUrl: "https://thewowguys.com/wp-content/uploads/2026/02/10.png" },
    { name: "Partner 11", logoUrl: "https://thewowguys.com/wp-content/uploads/2026/02/11.png" },
  ],

  /** Featured clients shown on the home page */
  featuredClients: [
    {
      name: "Marshall + Sterling",
      logoUrl: "https://thewowguys.com/wp-content/uploads/2025/10/MS_logo_primary_white.png.webp",
      href: "/gallery",
    },
    {
      name: "Marist College",
      logoUrl: "https://thewowguys.com/wp-content/uploads/2026/01/resized-marist.png",
      href: "/gallery",
    },
  ],

  /** Manufacturer roster pulled from the live NYS contracts page. 41 partners, each linked. */
  manufacturers: [
    { name: "AIS", url: "https://www.ais-inc.com/" },
    { name: "Allermuir", url: "https://www.allermuir.com/us/" },
    { name: "Arcadia", url: "https://arcadiacontract.com/" },
    { name: "Berco", url: "https://bercodesigns.com/" },
    { name: "Biofit", url: "https://www.biofit.com/" },
    { name: "Claridge", url: "https://claridgeproducts.com/" },
    { name: "Cabot Wrenn", url: "https://www.cabotwrenn.com/" },
    { name: "COE Distributing", url: "https://www.coedistributing.com/" },
    { name: "9to5", url: "https://9to5seating.com/" },
    { name: "Darran", url: "https://www.darran.com/" },
    { name: "Encore", url: "https://encoreseating.com/" },
    { name: "ERG", url: "https://erginternational.com/" },
    { name: "Global", url: "https://www.globalfurnituregroup.com/" },
    { name: "Great Openings", url: "https://www.greatopenings.com/" },
    { name: "Groupe LaCasse", url: "https://www.groupelacasse.com/en/home.html" },
    { name: "Hale", url: "https://www.halemfg.com/" },
    { name: "Hickory Business Furniture", url: "https://www.hbf.com/" },
    { name: "Humanscale", url: "https://www.humanscale.com/products/seating" },
    { name: "Indiana", url: "https://indianafurniture.com/" },
    { name: "Integra", url: "https://integraseating.com/" },
    { name: "Jasper", url: "https://www.jaspergroup.us.com/" },
    { name: "KFI", url: "https://kfistudios.com/" },
    { name: "KI", url: "https://www.ki.com/" },
    { name: "Krug", url: "https://krug.ca/" },
    { name: "Leland", url: "https://lelandfurniture.com/" },
    { name: "Lesro", url: "https://www.lesro.com/" },
    { name: "Logiflex", url: "https://logiflex.ca/en-us/" },
    { name: "Moduform", url: "https://moduform.com/" },
    { name: "Nightingale", url: "https://nightingalechairs.com/" },
    { name: "Office Master", url: "https://www.omseating.com/" },
    { name: "OFS and Affiliates", url: "https://ofs.com/" },
    { name: "Raynor / Eurotech", url: "https://eurotechseating.com/about" },
    { name: "Safco", url: "https://www.safcoproducts.com/" },
    { name: "Seating Inc", url: "https://www.seatinginc.com/" },
    { name: "Sedia Systems", url: "https://www.sediasystems.com/" },
    { name: "SOURCE", url: "https://www.sourcefurniture.com/products/" },
    { name: "Spec", url: "https://specfurniture.com/" },
    { name: "Stylex", url: "https://www.stylexdesign.com/" },
    { name: "Trinity", url: "https://trinityfurniture.com/" },
    { name: "VIA", url: "https://viaseating.com/" },
    { name: "Work Rite", url: "https://workriteergo.com/" },
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
    { label: "Furniture", href: "/furniture" },
    { label: "NYS Contracts", href: "/nys-contracts" },
    { label: "Gallery", href: "/gallery" },
    { label: "E-Catalog", href: "/e-catalog" },
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
  ],
  footer: {
    company: [
      { label: "About", href: "/about" },
      { label: "Showroom", href: "/showroom" },
      { label: "Virtual Tour", href: "/virtual-tour" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
    ],
    services: [
      { label: "Space Planning", href: "/services/space-planning" },
      { label: "Delivery & Install", href: "/services/installation" },
      { label: "NYS Contracts", href: "/nys-contracts" },
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
