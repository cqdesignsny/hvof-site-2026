import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/hero";
import { FAQSection } from "@/components/sections/faq-section";
import { FadeIn } from "@/components/motion/fade-in";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

const FEATURED_INSTALLS = [
  {
    name: "Marshall & Sterling",
    type: "Insurance · 4 Floors",
    location: "Poughkeepsie, NY",
    blurb: "Floor-by-floor installation for one of the Hudson Valley's largest privately-held insurance brokers.",
    image: IMG.marshallSterling.rooftop,
    href: "/work/marshall-sterling",
    cols: "md:col-span-7",
    aspect: "aspect-[4/5]",
  },
  {
    name: "Marist College",
    type: "Education · Faculty + Common",
    location: "Poughkeepsie, NY",
    blurb: "Foy Hall renovation. Faculty offices, lecture seating, and lounge environments.",
    image: IMG.marist.one,
    href: "/work/marist",
    cols: "md:col-span-5",
    aspect: "aspect-[4/5]",
  },
  {
    name: "BCW",
    type: "Government · Executive Suite",
    location: "Albany, NY",
    blurb: "Executive offices and secure conference rooms, delivered on contract.",
    image: IMG.marshallSterling.angle14,
    href: "/work/bcw",
    cols: "md:col-span-12",
    aspect: "aspect-[16/9]",
  },
];

const CATEGORIES = [
  { num: "01", name: "Seating", href: "/furniture/seating", desc: "Task, executive, ergonomic, conference. Steelcase, Herman Miller, Knoll." },
  { num: "02", name: "Desks", href: "/furniture/desks", desc: "Sit-stand, executive, benching, height-adjustable." },
  { num: "03", name: "Conference", href: "/furniture/conference", desc: "Boardrooms, training rooms, integrated technology." },
  { num: "04", name: "Systems", href: "/furniture/systems", desc: "Workstations, panels, full-floor reconfigurations." },
  { num: "05", name: "Healthcare", href: "/furniture/healthcare", desc: "Patient seating, exam rooms, waiting areas." },
  { num: "06", name: "Pre-Owned", href: "/furniture/preowned", desc: "Inspected, refurbished, warranty-backed inventory." },
];

const TRUSTED_BY = [
  "Marist College",
  "Marshall + Sterling",
  "BCW",
  "Vassar Brothers Medical",
  "Bard College",
  "Mount Saint Mary",
  "Dutchess Community College",
  "Hudson Valley Federal Credit Union",
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
      "Yes. Our team produces floor plans, furniture specifications, and 3D renderings. For complex installations we coordinate directly with your architect or interior designer.",
  },
  {
    question: "Can I see furniture before buying?",
    answer:
      "Always. Our 37,000 sqft showroom in Wappingers Falls has every category we sell. Sit in the chair. Open the drawer. Bring your team. We are open Monday through Friday and Saturdays by appointment.",
  },
  {
    question: "Do you handle delivery and installation?",
    answer:
      "We do. Our crews are direct hires, not subcontractors. They know the products, they know the buildings, and they are on call for adjustments after the install.",
  },
  {
    question: "Do you accept NYS Contracts and procurement codes?",
    answer:
      "Yes. We are an authorized vendor on multiple New York State OGS contracts. For municipal, state, and educational buyers, we can quote on-contract pricing directly.",
  },
  {
    question: "What areas of the Hudson Valley do you serve?",
    answer:
      "Dutchess, Orange, Ulster, Putnam, Westchester, Rockland, Sullivan, and Columbia counties. We also deliver into the five boroughs and Long Island for larger projects.",
  },
];

const DIFFERENTIATORS = [
  {
    title: "Founded 1985. Family-owned.",
    body: "Three generations of the same Hudson Valley family. Still here when the warranty needs us, and still answering the phone.",
  },
  {
    title: "37,000 sqft showroom on Route 9.",
    body: "Walk through real configurations. Sit in the chair. Try every desk. Bring your team for the day.",
  },
  {
    title: "In-house installation crews.",
    body: "Our installers are direct hires, not subcontracted day labor. They know the products and the buildings.",
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
        sub="New, pre-owned, and custom office furniture. Forty years of installations across the Hudson Valley, from a 37,000 sqft showroom on Route 9."
        imageSrc={IMG.marshallSterling.rooftop}
        imageAlt="Marshall + Sterling office installation, Poughkeepsie NY"
        primaryCta={{ label: "See our work", href: "/work" }}
        secondaryCta={{ label: "Visit the showroom", href: "/showroom" }}
      />

      {/* Trusted by */}
      <section className="border-y border-border bg-muted/30 py-10 md:py-12">
        <div className="container-editorial">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
            <p className="eyebrow shrink-0 text-muted-foreground">
              Trusted by Hudson Valley institutions
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end">
              {TRUSTED_BY.map((name) => (
                <span
                  key={name}
                  className="font-display text-base font-light tracking-tight text-foreground/55"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured installations */}
      <section className="bg-background section-y">
        <div className="container-editorial">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">Selected Work</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              Three projects.<br />
              <span className="text-muted-foreground">Forty years of receipts.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              We&apos;ve installed for insurance brokers, hospitals, colleges, manufacturers, and municipalities. A small selection of recent work.
            </p>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            {FEATURED_INSTALLS.map((inst, i) => (
              <FadeIn key={inst.name} delay={i * 0.06} className={inst.cols}>
                <Link href={inst.href} className="group block">
                  <div className={`relative ${inst.aspect} w-full overflow-hidden rounded-2xl bg-muted`}>
                    <Image
                      src={inst.image}
                      alt={`${inst.name} office furniture installation`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 md:p-8">
                      <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/70">
                        {inst.type} · {inst.location}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-light text-white md:text-3xl">
                        {inst.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {inst.blurb}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-all group-hover:gap-2">
                    Read the case study
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="mt-16 flex justify-center">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/work">
                See all installations
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-foreground text-background section-y">
        <div className="container-editorial">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-brand-yellow">What we furnish</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
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
                    <ArrowUpRight className="ml-auto h-4 w-4 text-background/40 opacity-0 transition-all group-hover:opacity-100 group-hover:text-brand-yellow" />
                  </div>
                  <p className="mt-3 max-w-md pl-10 text-sm leading-relaxed text-background/60 md:text-base">
                    {cat.desc}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why HVOF */}
      <section className="bg-background section-y">
        <div className="container-editorial">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
            <FadeIn className="md:col-span-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={IMG.marist.lobby}
                  alt="Marist College lobby installation"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="flex flex-col justify-center md:col-span-6">
              <p className="eyebrow text-muted-foreground">Why HVOF</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                Forty years here.<br />
                Still answering the phone.
              </h2>
              <ul className="mt-10 space-y-6">
                {DIFFERENTIATORS.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-brand-yellow" />
                    <div>
                      <p className="font-display text-xl font-normal leading-snug">{item.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/about">
                    Read our story
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-muted section-y-sm">
        <div className="container-editorial">
          <FadeIn className="mx-auto max-w-4xl text-center">
            <p className="eyebrow text-muted-foreground">From a recent project</p>
            <blockquote className="mt-6 font-display text-3xl font-light leading-[1.15] tracking-tight md:text-4xl lg:text-5xl">
              &ldquo;HVOF spec&apos;d, sourced, and installed every chair, desk, and conference table for a four-floor renovation. They hit every milestone. The installers showed up on time, the furniture is still perfect three years later, and they still answer the phone.&rdquo;
            </blockquote>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Director of Facilities · Hudson Valley insurance broker
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Showroom invite */}
      <section className="relative isolate overflow-hidden bg-foreground text-background section-y">
        <div className="absolute inset-0 -z-10 opacity-25">
          <Image
            src={IMG.marshallSterling.angle20}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="container-editorial">
          <FadeIn className="max-w-2xl">
            <p className="eyebrow text-brand-yellow">The showroom</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              Come spend an afternoon.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/75">
              Thirty-seven thousand square feet of working configurations. Walk-ins are welcome Monday through Friday. We&apos;ll have coffee.
            </p>
            <div className="mt-8 grid gap-3 text-base text-background/85">
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-yellow" />
                {SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
              </p>
              <p className="font-mono text-sm text-background/65">{SITE.hoursDisplay}</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-brand-yellow text-black hover:bg-brand-yellow-hover">
                <Link href="/showroom">
                  Plan a visit
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={`tel:${SITE.contact.phoneE164}`}>Call {SITE.contact.phone}</Link>
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

      {/* Closer */}
      <section className="bg-brand-yellow section-y">
        <div className="container-editorial">
          <FadeIn className="max-w-4xl">
            <h2 className="font-display text-6xl font-light leading-[0.9] tracking-tight md:text-8xl lg:text-9xl">
              Let&apos;s design<br />your space.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
              Single-chair upgrade or a full-floor install. Get a quote in under 24 hours, often same-day for stocked items.
            </p>
            <div className="mt-12 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                <Link href="/contact">
                  Start a project
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-foreground/30 bg-transparent text-foreground hover:bg-foreground/10"
              >
                <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
