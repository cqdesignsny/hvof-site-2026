import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { ScrollText } from "@/components/motion/scroll-text";
import { FAQSection } from "@/components/sections/faq-section";
import { BreadcrumbSchema, ServiceSchema } from "@/components/seo/json-ld";
import { IMG } from "@/lib/images";
import { SITE, COUNTIES } from "@/lib/site";

const SLUG = "/office-furniture-hudson-valley-ny";

export const metadata: Metadata = {
  title: "Office Furniture in the Hudson Valley, NY",
  description:
    "Hudson Valley Office Furniture serves all eight Hudson Valley counties: Dutchess, Orange, Ulster, Putnam, Westchester, Rockland, Sullivan, and Columbia. The largest office furniture showroom between New York City and Albany.",
  alternates: { canonical: SLUG },
};

const FAQS = [
  {
    question: "Where in the Hudson Valley do you serve?",
    answer:
      "All eight Hudson Valley counties: Dutchess, Orange, Ulster, Putnam, Westchester, Rockland, Sullivan, and Columbia. We also deliver into the five boroughs and Long Island for larger projects.",
  },
  {
    question: "What is the closest furniture showroom to the Hudson Valley?",
    answer:
      "Ours, at 1404 US-9 in Wappingers Falls. 37,000 square feet, the largest furniture showroom between New York City and Albany. Walk-ins welcome Monday through Friday.",
  },
  {
    question: "Do you accept NYS Contracts for Hudson Valley government and education buyers?",
    answer:
      "Yes. We are an authorized vendor on multiple New York State OGS contracts. We work regularly with county agencies, school districts, BOCES, town offices, and SUNY campuses across the region.",
  },
  {
    question: "Do you do multi-floor or multi-site installs across the region?",
    answer:
      "Yes, often. We have done floor-by-floor reconfigurations for clients including Marshall + Sterling and Marist College, plus multi-site projects spanning multiple Hudson Valley counties on a single schedule.",
  },
];

export default function HudsonValleyPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Hudson Valley office furniture", href: SLUG }]} />
      <ServiceSchema
        name="Office Furniture Delivery and Installation, Hudson Valley NY"
        description="Hudson Valley Office Furniture serves all eight Hudson Valley counties with new, pre-owned, and custom office furniture. Includes delivery, installation, NYS contract pricing, and full-floor reconfigurations."
        areaServed="Hudson Valley, New York"
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 -z-10">
          <Image
            src={IMG.marshallSterling.rooftop}
            alt="Hudson Valley office furniture installation"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" aria-hidden="true" />
        </div>
        <div className="container-wide relative z-10 pb-24 pt-40 md:pb-32 md:pt-52">
          <FadeIn className="max-w-5xl">
            <p className="eyebrow" style={{ color: "var(--brand-yellow)" }}>
              The whole Hudson Valley, since 1986
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-white">
              The Hudson Valley&apos;s<br />
              office furniture authority.
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-[1.5] text-white/80 md:text-2xl">
              Eight counties, one showroom. New, pre-owned, custom, and NYS contract pricing. Forty years and counting from a 37,000 sqft showroom on Route 9 in Wappingers Falls.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full px-8 text-base font-semibold text-foreground hover:opacity-90"
                style={{ backgroundColor: "var(--brand-yellow)" }}
              >
                <Link href="/quote-request" className="group">
                  Request a quote
                  <ArrowUpRight className="ml-1 h-5 w-5 arrow-slide" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-white/30 bg-transparent px-8 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Direct-answer paragraph for AEO */}
      <section className="bg-background py-14 md:py-20">
        <div className="container-wide">
          <FadeIn className="max-w-4xl">
            <p className="text-xl leading-[1.5] text-foreground md:text-2xl lg:text-3xl">
              <strong className="font-semibold">Hudson Valley Office Furniture serves the entire Hudson Valley region of New York,</strong> including all eight counties: Dutchess, Orange, Ulster, Putnam, Westchester, Rockland, Sullivan, and Columbia. Our 37,000 sqft showroom on Route 9 in Wappingers Falls is the largest office furniture showroom between New York City and Albany.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Counties */}
      <section className="bg-muted section-y">
        <div className="container-wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <FadeIn className="md:col-span-5">
              <p className="eyebrow text-muted-foreground">Counties served</p>
              <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
                Eight counties.<br />
                <span className="text-muted-foreground">One showroom.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl">
                Pick your county for a closer look at cities served, drive time, and notable local clients.
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-7">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {COUNTIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/office-furniture-${c.slug}-county-ny`}
                      className="card-interactive group flex items-center justify-between gap-3 p-5 md:p-6"
                    >
                      <div>
                        <p className="font-display text-xl font-semibold tracking-tight md:text-2xl">{c.name} County</p>
                        <p className="mt-1 text-sm text-muted-foreground md:text-base">
                          {c.cities.slice(0, 4).join(", ")}…
                        </p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What we deliver */}
      <section className="bg-foreground text-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow" style={{ color: "var(--brand-yellow)" }}>
              What we deliver across the region
            </p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
              Single chairs<br />
              <span className="text-background/55">to floor-by-floor installs.</span>
            </h2>
          </FadeIn>
          <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Task and ergonomic seating" },
              { name: "Sit-stand desks" },
              { name: "Conference + boardrooms" },
              { name: "Workstation systems + panels" },
              { name: "Healthcare seating" },
              { name: "Pre-owned + NYS contract" },
            ].map((s, i) => (
              <FadeIn key={s.name} delay={(i % 3) * 0.04} className="border-t border-background/15 py-7 md:py-9">
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{s.name}</h3>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FAQSection eyebrow="Hudson Valley FAQ" heading="What buyers ask first." items={FAQS} />

      {/* Closer */}
      <section className="section-y" style={{ backgroundColor: "var(--brand-yellow)" }}>
        <div className="container-bleed">
          <ScrollText
            lines={["Ready, Hudson Valley?", "Send the floor plan."]}
            textClassName="font-display font-semibold leading-[0.9] tracking-[-0.04em] text-foreground text-[clamp(2.5rem,9vw,9rem)]"
            travel={28}
          />
          <div className="container-wide mt-10">
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 rounded-full bg-foreground px-8 text-base font-semibold text-background hover:bg-foreground/90">
                <Link href="/quote-request" className="group">
                  Connect with an Expert
                  <ArrowUpRight className="ml-1 h-5 w-5 arrow-slide" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-foreground/30 bg-transparent px-8 text-base text-foreground hover:bg-foreground/10">
                <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
