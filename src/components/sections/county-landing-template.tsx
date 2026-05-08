import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { ScrollText } from "@/components/motion/scroll-text";
import { FAQSection } from "@/components/sections/faq-section";
import { BreadcrumbSchema, ServiceSchema } from "@/components/seo/json-ld";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

interface CountyLandingProps {
  county: string;
  state?: string;
  driveTime: string;
  /** Cities/towns within this county that we serve */
  cities: readonly string[];
  /** Sector angle paragraph: what kinds of clients in this county */
  sectorAngle: string;
  /** Notable clients to drop into copy when relevant */
  notableClients?: readonly string[];
  /** Slug for breadcrumb + canonical, e.g. "dutchess" */
  slug: string;
}

export function CountyLandingTemplate({
  county,
  state = "NY",
  driveTime,
  cities,
  sectorAngle,
  notableClients,
  slug,
}: CountyLandingProps) {
  const href = `/office-furniture-${slug}-county-ny`;
  const fullName = `${county} County`;

  const FAQS = [
    {
      question: `Do you deliver office furniture throughout ${fullName}, ${state}?`,
      answer: `Yes. ${fullName} is part of our regular Hudson Valley delivery zone. Our crews handle every install personally, including the towns of ${cities.slice(0, 4).join(", ")}, and surrounding communities.`,
    },
    {
      question: `What is the closest showroom to ${fullName}?`,
      answer: `Our 37,000 sqft showroom on Route 9 in Wappingers Falls is the largest furniture showroom between New York City and Albany. Drive time from most of ${fullName} is around ${driveTime}. Walk-ins welcome Monday through Friday.`,
    },
    {
      question: `Do you accept NYS Contracts and county procurement codes for ${fullName}?`,
      answer: `Yes. We are an authorized vendor on multiple New York State OGS contracts and frequently work with ${fullName} agencies, school districts, BOCES, and town offices. Even minimal state aid qualifies your organization for contract pricing.`,
    },
    {
      question: `Do you offer pre-owned office furniture for ${fullName} businesses?`,
      answer: `Yes. We always have a large pre-owned inventory at the showroom, often saving 50 to 70 percent vs new. Tier-A brands inspected, cleaned, and warranted in-house.`,
    },
    {
      question: `Can you handle a large or multi-floor install in ${fullName}?`,
      answer: `Absolutely. We have done floor-by-floor reconfigurations across the Hudson Valley for 40 years. Field measurement, CAD layout, scheduled install, and on-call adjustments after the install are all included.`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: `${fullName} office furniture`, href },
        ]}
      />
      <ServiceSchema
        name={`Office Furniture Delivery and Installation in ${fullName}, ${state}`}
        description={`Hudson Valley Office Furniture serves ${fullName}, ${state}, with new, pre-owned, and custom office furniture. Includes delivery, installation, and NYS contract pricing.`}
        areaServed={fullName}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 -z-10">
          <Image
            src={IMG.marshallSterling.gallery[3]}
            alt={`Office furniture installation in ${fullName} ${state}`}
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
              Office furniture, {fullName}, {state}
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-white">
              {fullName}&apos;s office<br />
              furniture authority.
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-[1.5] text-white/80 md:text-2xl">
              {sectorAngle}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full px-8 text-base font-semibold text-foreground hover:opacity-90"
                style={{ backgroundColor: "var(--brand-yellow)" }}
              >
                <Link href="/contact" className="group">
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
              <strong className="font-semibold">Hudson Valley Office Furniture serves {fullName}, {state}</strong> from a 37,000 sqft showroom on Route 9 in Wappingers Falls, the largest office furniture showroom between New York City and Albany. Most of {fullName} is around {driveTime} away. New, pre-owned, custom, and NYS contract pricing for state and municipal buyers.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Cities served in this county */}
      <section className="bg-muted section-y">
        <div className="container-wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <FadeIn className="md:col-span-5">
              <p className="eyebrow text-muted-foreground">Cities and towns</p>
              <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
                {cities.length}+ {fullName}<br />
                <span className="text-muted-foreground">communities served.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl">
                Our crews deliver and install across {fullName} year-round. Same team for the showroom tour, the spec, and the install.
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-7">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {cities.map((city) => (
                  <li
                    key={city}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background px-5 py-4"
                  >
                    <MapPin className="h-4 w-4 shrink-0" style={{ color: "var(--brand-yellow)" }} />
                    <span className="text-lg font-medium md:text-xl">{city}</span>
                  </li>
                ))}
              </ul>
              {notableClients && notableClients.length > 0 ? (
                <p className="mt-8 text-base text-muted-foreground md:text-lg">
                  Recent + ongoing {fullName} clients: {notableClients.join(", ")}.
                </p>
              ) : null}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What we deliver to this county */}
      <section className="bg-foreground text-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow" style={{ color: "var(--brand-yellow)" }}>
              What we deliver to {fullName}
            </p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
              Every category.<br />
              <span className="text-background/55">Every brand. Every floor.</span>
            </h2>
          </FadeIn>
          <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Task and ergonomic seating", desc: "Steelcase, Herman Miller, Humanscale, HON, and a dozen more." },
              { name: "Sit-stand desks", desc: "Single units to floor-wide benching." },
              { name: "Conference rooms", desc: "Tables, chairs, AV-integrated boardrooms." },
              { name: "Workstation systems", desc: "Panels, benching, cubicles, full-floor reconfigurations." },
              { name: "Healthcare seating", desc: "Patient rooms, exam areas, waiting rooms. Antimicrobial finishes." },
              { name: "Pre-owned + NYS contract", desc: "Tier-A brands inspected and warranted. Contract pricing for state and municipal." },
            ].map((s, i) => (
              <FadeIn key={s.name} delay={(i % 3) * 0.04} className="border-t border-background/15 py-7 md:py-9">
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{s.name}</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-background/65 md:text-lg">{s.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why HVOF for this county */}
      <section className="bg-background section-y">
        <div className="container-wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
            <FadeIn className="md:col-span-6">
              <div className="card-image-outline relative aspect-[4/5] w-full overflow-hidden bg-muted">
                <Image
                  src={IMG.marshallSterling.gallery[5]}
                  alt={`Office furniture install for a ${fullName} client`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="image-zoom object-cover"
                  quality={85}
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="flex flex-col justify-center md:col-span-6">
              <p className="eyebrow text-muted-foreground">Why {fullName} buyers pick HVOF</p>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                Local, fast,<br />and accountable.
              </h2>
              <ul className="mt-10 space-y-6">
                {[
                  { title: `${driveTime} from the showroom`, body: "Quote, delivery, and installation timelines that match your project schedule." },
                  { title: "Same crew from spec to install", body: "The team that quotes you delivers and sets it up. No hand-offs, no surprises." },
                  { title: "Pre-owned + new together", body: "Outfit faster, spend less, scale without compromise. Mix and match in one quote." },
                  { title: "NYS contracts welcome", body: "Authorized vendor on multiple OGS contracts for state, municipal, and educational buyers." },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <Check className="mt-1.5 h-6 w-6 shrink-0" style={{ color: "var(--brand-yellow)" }} />
                    <div>
                      <p className="font-display text-2xl font-semibold leading-snug md:text-3xl">{item.title}</p>
                      <p className="mt-2 text-base leading-relaxed text-muted-foreground md:text-lg">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      <FAQSection eyebrow={`${fullName} FAQ`} heading={`Office furniture in ${fullName}.`} items={FAQS} />

      {/* Closer */}
      <section className="section-y" style={{ backgroundColor: "var(--brand-yellow)" }}>
        <div className="container-bleed">
          <ScrollText
            lines={[`Ready, ${fullName}?`, "Send the floor plan."]}
            textClassName="font-display font-semibold leading-[0.9] tracking-[-0.04em] text-foreground text-[clamp(3rem,11vw,10rem)]"
            travel={28}
          />
          <div className="container-wide mt-10">
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 rounded-full bg-foreground px-8 text-base font-semibold text-background hover:bg-foreground/90">
                <Link href="/contact" className="group">
                  Start a project
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
