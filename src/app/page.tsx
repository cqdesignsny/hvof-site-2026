import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/hero";
import { FAQSection } from "@/components/sections/faq-section";
import { TrustedBy } from "@/components/sections/trusted-by";
import { VirtualTourCTA } from "@/components/sections/virtual-tour-cta";
import { NewsletterSignup } from "@/components/sections/newsletter";
import { FadeIn } from "@/components/motion/fade-in";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

const FEATURED_INSTALLS = [
  {
    name: "Marshall + Sterling",
    type: "Insurance · 20+ year client",
    location: "Poughkeepsie, NY",
    blurb: "Floor-by-floor reconfiguration of one of the Hudson Valley's largest privately-held insurance brokers, plus a redesigned C-suite and rooftop.",
    image: IMG.marshallSterling.rooftop,
    href: "/work/marshall-sterling",
    cols: "md:col-span-7",
    aspect: "aspect-[4/5] md:aspect-[5/6]",
  },
  {
    name: "Marist College",
    type: "Higher Education",
    location: "Poughkeepsie, NY",
    blurb: "Foy Hall renovation. Faculty offices, lecture seating, and lounge environments specified for daily use.",
    image: IMG.marist.one,
    href: "/work/marist",
    cols: "md:col-span-5",
    aspect: "aspect-[4/5] md:aspect-[5/6]",
  },
  {
    name: "Marshall + Sterling Rooftop",
    type: "Insurance · Outdoor",
    location: "Poughkeepsie, NY",
    blurb: "A vibrant rooftop extension of the workspace, designed for collaboration and seasonal team gatherings.",
    image: IMG.marshallSterling.detail22,
    href: "/work/marshall-sterling",
    cols: "md:col-span-12",
    aspect: "aspect-[16/9] md:aspect-[21/9]",
  },
];

const CATEGORIES = [
  { num: "01", name: "Seating", href: "/furniture/seating", desc: "Task, executive, ergonomic, conference. Steelcase, Herman Miller, Knoll, Humanscale, HON." },
  { num: "02", name: "Desks", href: "/furniture/desks", desc: "Sit-stand, executive, benching, height-adjustable. Single units to floor-wide." },
  { num: "03", name: "Conference", href: "/furniture/conference", desc: "Boardroom tables, training rooms, AV-integrated meeting spaces." },
  { num: "04", name: "Pods + Phonebooths", href: "/furniture/pods", desc: "Acoustic privacy spaces. One-person to four-person. ADA compliant." },
  { num: "05", name: "Healthcare", href: "/furniture/healthcare", desc: "Patient seating, exam rooms, waiting areas. Antimicrobial and bariatric options." },
  { num: "06", name: "Pre-Owned", href: "/furniture/preowned", desc: "Inspected, refurbished, warrantied. Save up to 70% without compromising on quality." },
];

const FAQS = [
  {
    question: "What's the typical lead time on an office furniture order?",
    answer:
      "In-stock and pre-owned items can ship within 1–2 weeks. New furniture from major brands typically runs 4–8 weeks depending on the manufacturer and customization. We give you a hard date with your quote and stick to it.",
  },
  {
    question: "Do you offer space planning and design?",
    answer:
      "Yes. Our team produces floor plans, furniture specifications, and 3D renderings included with the quote. For complex installations we coordinate directly with your architect or interior designer.",
  },
  {
    question: "Can I see furniture before buying?",
    answer:
      "Always. Our 37,000 sqft showroom in Wappingers Falls is the largest between New York City and Albany. Sit in the chair. Open the drawer. Bring your team. Walk-ins are welcome Monday through Friday.",
  },
  {
    question: "Do you handle delivery and installation?",
    answer:
      "We do. Our crews are direct hires, not subcontractors. They know the products, they know the buildings, and they are on call for adjustments after the install.",
  },
  {
    question: "Do you offer pre-owned office furniture?",
    answer:
      "Yes. We carry a large inventory of inspected, cleaned, and warrantied pre-owned furniture, often saving 50–70% versus new. Tier-A brands at a fraction of the price.",
  },
  {
    question: "Do you accept NYS Contracts and procurement codes?",
    answer:
      "Yes. We are an authorized vendor on multiple New York State OGS contracts. Even minimal state aid qualifies an organization for contract pricing. Government, municipal, and educational buyers welcome.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Dutchess, Orange, Ulster, Putnam, Westchester, Rockland, Sullivan, and Columbia counties — plus the boroughs and Long Island for larger projects.",
  },
];

const DIFFERENTIATORS = [
  {
    title: "Founded 1985. Family-owned.",
    body: "Three generations of the same Hudson Valley family. Still here when the warranty needs us, and still answering the phone.",
  },
  {
    title: "37,000 sqft on Route 9.",
    body: "The largest office furniture showroom between New York City and Albany. Real configurations at full scale. Walk in or schedule a tour.",
  },
  {
    title: "In-house installation crews.",
    body: "Our installers are direct hires, not subcontracted day labor. Same names, same trucks, year after year.",
  },
  {
    title: "Hudson Valley to NYC. NYS-contract approved.",
    body: "Dutchess to Westchester to the boroughs. Authorized OGS vendor for state, municipal, and educational buyers.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Established 1985 · Wappingers Falls, NY"
        headline="Furniture for the rooms where work happens."
        sub="New, pre-owned, and custom office furniture. The largest showroom between New York City and Albany at 37,000 square feet."
        imageSrc={IMG.marshallSterling.rooftop}
        imageAlt="Marshall + Sterling office installation, Poughkeepsie NY"
        primaryCta={{ label: "See our work", href: "/work" }}
        secondaryCta={{ label: "Visit the showroom", href: "/showroom" }}
      />

      {/* From Concept to Completion */}
      <section className="bg-background section-y">
        <div className="container-wide">
          <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-16 lg:gap-24">
            <FadeIn className="md:col-span-6">
              <div className="card-image-outline relative aspect-[4/5] w-full overflow-hidden bg-muted md:aspect-[4/5]">
                <Image
                  src={IMG.marist.lobby}
                  alt="HVOF office installation in progress"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  quality={85}
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-6">
              <p className="eyebrow text-muted-foreground">Effortless transformations</p>
              <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
                From concept<br />
                to completion.
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                From empty space to move-in ready, without the vendor chaos. Our streamlined process delivers exceptional results every time, on every floor.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-12 rounded-full bg-foreground px-7 text-base text-background hover:bg-foreground/90">
                  <Link href="/contact" className="group">
                    See how we work
                    <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-foreground/20 bg-transparent px-7 text-base text-foreground hover:bg-foreground/5">
                  <Link href={SITE.contact.typeformUrl} target="_blank" rel="noopener noreferrer">
                    Connect with an expert
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trusted by marquee */}
      <TrustedBy />

      {/* Featured installations */}
      <section className="bg-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">Selected Work</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
              Three projects.<br />
              <span className="text-muted-foreground">Forty years of receipts.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              We have installed for insurance brokers, hospitals, colleges, manufacturers, and municipalities. A small selection of recent work.
            </p>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            {FEATURED_INSTALLS.map((inst, i) => (
              <FadeIn key={`${inst.name}-${i}`} delay={i * 0.06} className={inst.cols}>
                <Link href={inst.href} className="group block">
                  <div className={`card-image-outline relative ${inst.aspect} w-full overflow-hidden bg-muted`}>
                    <Image
                      src={inst.image}
                      alt={`${inst.name} office furniture installation`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="image-zoom object-cover"
                      quality={85}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent p-6 md:p-10">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
                        {inst.type} · {inst.location}
                      </p>
                      <h3 className="mt-2 font-display text-3xl font-light text-white md:text-4xl">
                        {inst.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                    {inst.blurb}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-all group-hover:gap-2">
                    Read the case study
                    <ArrowUpRight className="h-3.5 w-3.5 arrow-slide" />
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="mt-16 flex justify-center">
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-7 text-base">
              <Link href="/work" className="group">
                See all installations
                <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Categories — editorial type */}
      <section className="bg-foreground text-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-brand-yellow">What we furnish</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
              Every category.<br />
              <span className="text-background/60">Every brand. Every floor.</span>
            </h2>
          </FadeIn>

          <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, i) => (
              <FadeIn
                key={cat.num}
                delay={i * 0.05}
                className="group border-t border-background/15 py-8 md:py-10"
              >
                <Link href={cat.href} className="block">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-background/40">{cat.num}</span>
                    <span className="font-display text-3xl font-light tracking-tight transition-transform group-hover:translate-x-1 md:text-4xl">
                      {cat.name}
                    </span>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-background/40 transition-all group-hover:text-brand-yellow group-hover:rotate-12" />
                  </div>
                  <p className="mt-3 max-w-md pl-10 text-sm leading-relaxed text-background/60 md:text-base">
                    {cat.desc}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="mt-16">
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/20 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white">
              <Link href="/furniture" className="group">
                Browse the full catalog
                <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Why HVOF — editorial split */}
      <section className="bg-background section-y">
        <div className="container-wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16 lg:gap-24">
            <FadeIn className="md:col-span-6">
              <div className="card-image-outline relative aspect-[4/5] w-full overflow-hidden bg-muted">
                <Image
                  src={IMG.marshallSterling.gallery[1]}
                  alt="Hudson Valley Office Furniture install"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="image-zoom object-cover"
                  quality={85}
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="flex flex-col justify-center md:col-span-6">
              <p className="eyebrow text-muted-foreground">Why HVOF</p>
              <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
                Forty years here.<br />
                Still answering the phone.
              </h2>
              <ul className="mt-10 space-y-6">
                {DIFFERENTIATORS.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-brand-yellow" />
                    <div>
                      <p className="font-display text-xl font-normal leading-snug md:text-2xl">{item.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button asChild variant="outline" className="h-12 rounded-full px-6 text-base">
                  <Link href="/about" className="group">
                    Read our story
                    <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <VirtualTourCTA />

      {/* Testimonial */}
      <section className="bg-muted section-y-sm">
        <div className="container-editorial">
          <FadeIn className="mx-auto max-w-5xl text-center">
            <p className="eyebrow text-muted-foreground">From the showroom floor</p>
            <blockquote className="mt-6 font-display text-3xl font-light leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              &ldquo;From <span className="text-brand-yellow-hover">home offices</span> to{" "}
              <span className="text-brand-yellow-hover">corporate</span> and{" "}
              <span className="text-brand-yellow-hover">college campuses</span>, we serve customers across the Hudson Valley and nationwide.&rdquo;
            </blockquote>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Hudson Valley Office Furniture
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Showroom invite */}
      <section className="relative isolate overflow-hidden bg-foreground text-background section-y">
        <div className="absolute inset-0 -z-10 opacity-30">
          <Image
            src={IMG.marshallSterling.angle20}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            quality={75}
          />
          <div className="absolute inset-0 bg-foreground/55" />
        </div>
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-brand-yellow">Build a space your team loves</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl xl:text-9xl">
              Come spend an<br />afternoon.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-background/75">
              The largest furniture showroom between New York City and Albany. Walk-ins welcome Monday through Friday. Bring your team, your floor plans, and your coffee mug.
            </p>
            <div className="mt-8 grid gap-3 text-base text-background/85">
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-yellow" />
                {SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
              </p>
              <p className="font-mono text-sm text-background/65">
                {SITE.hoursDisplay} · {SITE.hoursClosed}
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-brand-yellow px-7 text-base text-foreground hover:bg-brand-yellow-hover">
                <Link href="/showroom" className="group">
                  Plan a visit
                  <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/30 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        eyebrow="Common Questions"
        heading="What buyers ask first."
        intro="Forty years of fielding the same questions. Here is the short version."
        items={FAQS}
      />

      {/* Newsletter + closer */}
      <section className="bg-foreground text-background section-y">
        <div className="container-wide">
          <NewsletterSignup variant="dark" />
        </div>
      </section>

      {/* Final yellow closer */}
      <section className="bg-brand-yellow section-y">
        <div className="container-wide">
          <FadeIn className="max-w-5xl">
            <h2 className="font-display text-6xl font-light leading-[0.9] tracking-tight md:text-8xl lg:text-9xl xl:text-[10rem]">
              Let&apos;s design<br />your space.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
              Single-chair upgrade or a full-floor install. Get a quote in under 24 hours, often same-day for stocked items.
            </p>
            <div className="mt-12 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-foreground px-7 text-base text-background hover:bg-foreground/90">
                <Link href="/contact" className="group">
                  Start a project
                  <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-foreground/30 bg-transparent px-7 text-base text-foreground hover:bg-foreground/10">
                <Link href="/quote" className="group">
                  Build a quote cart
                  <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-foreground/30 bg-transparent px-7 text-base text-foreground hover:bg-foreground/10">
                <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
