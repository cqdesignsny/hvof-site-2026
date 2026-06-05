import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSlider } from "@/components/sections/hero-slider";
import { FAQSection } from "@/components/sections/faq-section";
import { TrustedBy } from "@/components/sections/trusted-by";
import { VirtualTourCTA } from "@/components/sections/virtual-tour-cta";
import { NewsletterSignup } from "@/components/sections/newsletter";
import { InteractiveGallery, type GalleryShot } from "@/components/sections/interactive-gallery";
import { ProductDeck } from "@/components/quote/product-deck";
import { FadeIn } from "@/components/motion/fade-in";
import { ScrollText } from "@/components/motion/scroll-text";
import { IMG } from "@/lib/images";
import { SITE, COUNTIES } from "@/lib/site";
import { getProductsByCategory } from "@/lib/products";

const HERO_SLIDES = [
  { src: IMG.marshallSterling.rooftop, alt: "Marshall and Sterling rooftop installation, Poughkeepsie NY" },
  { src: IMG.marshallSterling.gallery[0], alt: "HVOF executive office installation" },
  { src: IMG.marshallSterling.gallery[1], alt: "HVOF conference room installation" },
  { src: IMG.marist.lobby, alt: "Marist College lobby installation" },
  { src: IMG.marshallSterling.gallery[3], alt: "HVOF workstation installation" },
];

/**
 * Home gallery shots. Hand-picked for visual variety so the thumbnail rail
 * does not look like the same room repeated. Alternates M+S and Marist,
 * mixes outdoor / interior / lobby / detail.
 */
const HOME_GALLERY_SHOTS: GalleryShot[] = [
  { src: IMG.marshallSterling.rooftop, alt: "Marshall and Sterling rooftop", client: "Marshall + Sterling" },
  { src: IMG.marist.three, alt: "Marist College install", client: "Marist College" },
  { src: IMG.marshallSterling.detail22, alt: "Marshall and Sterling install", client: "Marshall + Sterling" },
  { src: IMG.marshallSterling.gallery[5], alt: "Marshall and Sterling install", client: "Marshall + Sterling" },
  { src: IMG.marshallSterling.angle7, alt: "Marshall and Sterling install", client: "Marshall + Sterling" },
  { src: IMG.marist.two, alt: "Marist College install", client: "Marist College" },
  { src: IMG.marshallSterling.gallery[8], alt: "Marshall and Sterling install", client: "Marshall + Sterling" },
  { src: IMG.marist.four, alt: "Marist College install", client: "Marist College" },
];

const CATEGORIES = [
  { name: "Seating", href: "/furniture/seating", icon: "/icons/chair.webp", desc: "Over a dozen manufacturers of task, executive, ergonomic, conference seating." },
  { name: "Desks", href: "/furniture/desks", icon: "/icons/desk.webp", desc: "Sit. Stand. Collaborate. Lead. From executive suites to floor-wide installations, many workspace solutions are available in one week or less." },
  { name: "Conference", href: "/furniture/conference", icon: "/icons/round-table.webp", desc: "Boardroom tables, training rooms, Zoom rooms, and technology-integrated meeting spaces." },
  { name: "Panel Systems and Pods", href: "/furniture/pods", icon: "/icons/cubicle.webp", desc: "Open-plan panel systems, acoustic pods, call center solutions, and collaborative team workspaces. Designed to support focus, privacy, and productivity at every scale." },
  { name: "Healthcare", href: "/furniture/healthcare", icon: "/icons/doctors-room.webp", desc: "From pediatrics to oncology, and from bariatrics to behavioral health, our comprehensive portfolio of healthcare furnishings and equipment provides solutions for every care environment." },
  { name: "Education", href: "/furniture/education", icon: "/icons/classroom.webp", desc: "From classrooms and lecture halls to faculty offices, libraries, student lounges, and collaborative learning spaces, we provide furniture solutions that support teaching, learning, and connection." },
  { name: "Reception", href: "/furniture/reception", icon: "/icons/reception.svg", desc: "Reception desks, lobby seating, first-impression environments." },
  { name: "Pre-Owned", href: "/furniture/preowned", icon: "/icons/chair.webp", desc: "Save 70 percent or more on premium pre-owned office furniture, without compromising on quality. Featuring top brands from some of the nation's finest workplaces." },
  { name: "NYS Contracts", href: "/nys-contracts", icon: "/icons/desk.webp", desc: "Access pre-negotiated pricing for over 40 vendors for government agencies, municipalities, nonprofits, educational institutions, and healthcare organizations." },
];

const FAQS = [
  {
    question: "What is the typical lead time on an office furniture order?",
    answer:
      "In-stock and pre-owned items can ship within 1 to 2 weeks. New furniture from major brands typically runs 4 to 8 weeks depending on the manufacturer and customization. We give you a hard date with your quote and stick to it.",
  },
  {
    question: "Do you offer space planning and design?",
    answer:
      "Yes. Our team produces floor plans, furniture specifications, and 3D renderings included with the quote. For complex installations we coordinate directly with your architect or interior designer.",
  },
  {
    question: "Can I see furniture before buying?",
    answer:
      "Always. Our 37,000 square foot showroom in Wappingers Falls is the largest between New York City and Albany. Sit in the chair. Open the drawer. Bring your team. Walk-ins welcome Monday through Friday.",
  },
  {
    question: "Do you handle delivery and installation?",
    answer:
      "We do. Our crews are direct hires, not subcontractors. They know the products, they know the buildings, and they are on call for adjustments after the install.",
  },
  {
    question: "Do you offer pre-owned office furniture?",
    answer:
      "Yes. We carry a large inventory of inspected, cleaned, and warrantied pre-owned furniture, often saving 50 to 70 percent versus new. Tier-A brands at a fraction of the price.",
  },
  {
    question: "Do you accept NYS Contracts and procurement codes?",
    answer:
      "Yes. We are an authorized vendor on multiple New York State OGS contracts. Even minimal state aid qualifies an organization for contract pricing. Government, municipal, nonprofit, and educational buyers welcome.",
  },
];

const DIFFERENTIATORS = [
  {
    title: "Founded 1986. Family-owned.",
    body: "Three generations of the same Hudson Valley family. Still here when the warranty needs us, and still answering the phone.",
  },
  {
    title: "37,000 square feet on Route 9.",
    body: "The largest office furniture showroom between New York City and Albany. Real configurations at full scale. Walk in or schedule a tour.",
  },
  {
    title: "In-House. End-to-End.",
    body: "From sales and design to delivery and installation, every project is managed by our own team.",
  },
  {
    title: "Northeast Corridor and Beyond.",
    body: "Our in-house crews operate company-owned trucks throughout the Northeast Corridor, ensuring accountability, consistency, and quality from start to finish.",
  },
];

export default function HomePage() {
  const allSeating = getProductsByCategory("seating");
  // Pick 4 featured chairs to show on home
  const featuredChairs = [
    allSeating.find((p) => p.sku === "HVOF-T-01")!,
    allSeating.find((p) => p.sku === "HVOF-Vion-6321")!,
    allSeating.find((p) => p.sku === "HVOF-T-02")!,
    allSeating.find((p) => p.sku === "HVOF-T-03")!,
  ].filter(Boolean);

  const featuredDesks = getProductsByCategory("desks");

  return (
    <>
      <HeroSlider
        eyebrow="Established 1986"
        headline="Furniture for the spaces where work happens."
        sub="New, pre-owned, and custom office spaces. The largest showroom between New York City and Albany at 37,000 square feet."
        slides={HERO_SLIDES}
        primaryCta={{ label: "See our work", href: "/gallery" }}
        secondaryCta={{ label: "Visit the showroom", href: "/showroom" }}
      />

      {/* From Concept to Completion, with Dan */}
      <section className="bg-background section-y">
        <div className="container-wide">
          <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-16 lg:gap-24">
            <FadeIn className="md:col-span-7">
              <div className="card-image-outline relative aspect-[4/3] w-full overflow-hidden bg-muted md:aspect-[16/11]">
                <Image
                  src="/team/dan-1.png"
                  alt="Dan, HVOF designer, working through a floor plan at the showroom"
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                  quality={85}
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-5">
              <p className="eyebrow text-muted-foreground">Effortless office transformations</p>
              <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl xl:text-8xl">
                From concept,<br />
                to completion.
              </h2>
              <p className="mt-8 max-w-xl text-xl leading-[1.5] text-muted-foreground md:text-2xl">
                Empty space to move-in ready, without the vendor chaos. Our expert team handles every step, with one point of contact and one schedule.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-14 rounded-full bg-foreground px-8 text-base font-semibold text-background hover:bg-foreground/90">
                  <Link href="/about" className="group">
                    See how we work
                    <ArrowUpRight className="ml-1 h-5 w-5 arrow-slide" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-foreground/20 bg-transparent px-8 text-base text-foreground hover:bg-foreground/5">
                  <Link href={SITE.contact.typeformUrl} target="_blank" rel="noopener noreferrer">
                    Connect with an expert
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trusted by, real logos */}
      <TrustedBy />

      {/* Categories grid with custom SVG icons */}
      <section className="bg-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-4xl">
            <p className="eyebrow text-muted-foreground">Designed for productivity</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-7xl lg:text-8xl">
              Built for real life.
            </h2>
            <p className="mt-8 max-w-2xl text-xl leading-[1.5] text-muted-foreground md:text-2xl">
              From workstations to boardrooms, every category of office furniture is on display. Browse the showroom, build your quote online, and our team will follow up promptly.
            </p>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {CATEGORIES.map((cat, i) => (
              <FadeIn key={cat.name} delay={(i % 3) * 0.05}>
                <Link
                  href={cat.href}
                  className="card-interactive group flex h-full flex-col p-7 md:p-9"
                >
                  <Image
                    src={cat.icon}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 grayscale opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 md:h-16 md:w-16"
                  />
                  <h3 className="mt-8 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                    {cat.name}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                    {cat.desc}
                  </p>
                  <div className="mt-auto flex items-center gap-1 pt-8 text-base font-semibold text-foreground transition-all group-hover:gap-2">
                    Browse the catalog
                    <ArrowUpRight className="h-5 w-5 arrow-slide" style={{ color: "var(--brand-yellow)" }} />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive gallery */}
      <InteractiveGallery shots={HOME_GALLERY_SHOTS} />

      {/* Chairs section, 4-up product cards */}
      <section className="bg-background section-y">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <FadeIn className="max-w-3xl">
              <p className="eyebrow text-muted-foreground">Featured seating</p>
              <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
                Chairs that<br />earn their hours.
              </h2>
            </FadeIn>
            <FadeIn delay={0.05}>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-7 text-base">
                <Link href="/furniture/seating" className="group">
                  Browse all seating
                  <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
                </Link>
              </Button>
            </FadeIn>
          </div>
          <ProductDeck
            products={featuredChairs}
            gridClassName="sm:grid-cols-2 lg:grid-cols-4"
            className="mt-12"
          />
        </div>
      </section>

      {/* Desks section, 3-up */}
      <section className="bg-muted section-y">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <FadeIn className="max-w-3xl">
              <p className="eyebrow text-muted-foreground">Featured desks</p>
              <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
                Stand, sit,<br />or somewhere in between.
              </h2>
            </FadeIn>
            <FadeIn delay={0.05}>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-7 text-base">
                <Link href="/furniture/desks" className="group">
                  Browse all desks
                  <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
                </Link>
              </Button>
            </FadeIn>
          </div>
          <ProductDeck
            products={featuredDesks.slice(0, 3)}
            gridClassName="md:grid-cols-3"
            className="mt-12"
          />
        </div>
      </section>

      {/* Featured Clients with logos */}
      <section className="bg-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">Featured clients</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
              Long relationships.<br />
              <span className="text-muted-foreground">Big spaces.</span>
            </h2>
          </FadeIn>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {SITE.featuredClients.map((client, i) => (
              <FadeIn key={client.name} delay={i * 0.06}>
                <Link href={client.href} className="card-image-outline group relative block aspect-[4/3] overflow-hidden bg-foreground">
                  <Image
                    src={
                      i === 0
                        ? IMG.marshallSterling.rooftop
                        : IMG.marist.one
                    }
                    alt={`${client.name} installation`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="image-zoom object-cover opacity-70 transition-opacity group-hover:opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-10">
                    <div className="relative h-16 w-44 md:h-20 md:w-56">
                      <Image
                        src={client.logoUrl}
                        alt={client.name}
                        fill
                        className="object-contain object-left brightness-0 invert"
                        unoptimized
                      />
                    </div>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-yellow text-foreground transition-transform group-hover:rotate-45">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why HVOF, editorial split */}
      <section className="bg-background section-y">
        <div className="container-wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16 lg:gap-24">
            <FadeIn className="md:col-span-6">
              <div className="card-image-outline relative aspect-[4/5] w-full overflow-hidden bg-muted">
                <Image
                  src={IMG.marshallSterling.gallery[1]}
                  alt="HVOF install detail"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="image-zoom object-cover"
                  quality={85}
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="flex flex-col justify-center md:col-span-6">
              <p className="eyebrow text-muted-foreground">Why HVOF</p>
              <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
                Forty years here.<br />
                Still answering the phone.
              </h2>
              <ul className="mt-12 space-y-7">
                {DIFFERENTIATORS.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <Check className="mt-1.5 h-6 w-6 shrink-0 text-brand-yellow" />
                    <div>
                      <p className="font-display text-2xl font-semibold leading-snug md:text-3xl">{item.title}</p>
                      <p className="mt-2 text-base leading-relaxed text-muted-foreground md:text-lg">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-12">
                <Button asChild variant="outline" className="h-12 rounded-full px-7 text-base">
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

      {/* Virtual tour */}
      <VirtualTourCTA />

      {/* Testimonial */}
      <section className="bg-muted section-y-sm">
        <div className="container-editorial">
          <FadeIn className="mx-auto max-w-5xl text-center">
            <p className="eyebrow text-muted-foreground">From the showroom floor</p>
            <blockquote className="mt-8 font-display text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              &ldquo;From <span className="text-brand-yellow-hover">home offices</span> to{" "}
              <span className="text-brand-yellow-hover">corporate</span> and{" "}
              <span className="text-brand-yellow-hover">college campuses</span>, we serve customers across the Hudson Valley and nationwide.&rdquo;
            </blockquote>
            <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Hudson Valley Office Furniture
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Service areas, eight counties */}
      <section className="bg-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">Service area</p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              Hudson Valley,<br />
              <span className="text-muted-foreground">top to bottom.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-[1.5] text-muted-foreground md:text-xl">
              Eight counties. Fifty-plus towns and cities. Same install crew, same warranty discipline, every job. Pick your county to see the towns and cities we deliver to.
            </p>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {COUNTIES.map((c, i) => (
              <FadeIn key={c.slug} delay={(i % 4) * 0.04}>
                <Link
                  href={`/office-furniture-${c.slug}-county-ny`}
                  className="card-interactive group flex h-full flex-col p-6 md:p-7"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" style={{ color: "var(--brand-yellow)" }} />
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {c.driveTime}
                    </p>
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-semibold leading-[1] tracking-tight md:text-4xl">
                    {c.name}
                  </h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    County
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {c.cities.slice(0, 4).map((city) => (
                      <span
                        key={city}
                        className="rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground/70 md:text-sm"
                      >
                        {city}
                      </span>
                    ))}
                    {c.cities.length > 4 ? (
                      <span className="rounded-full border border-foreground/10 px-3 py-1 text-xs text-muted-foreground">
                        +{c.cities.length - 4}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-auto flex items-center gap-1 pt-7 text-sm font-semibold transition-all group-hover:gap-2">
                    See {c.name} County
                    <ArrowUpRight className="h-4 w-4 arrow-slide" style={{ color: "var(--brand-yellow)" }} />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-10">
            <Link
              href="/office-furniture-hudson-valley-ny"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-6 py-3 text-base font-semibold transition-all hover:bg-foreground hover:text-background"
            >
              Or see the whole Hudson Valley region
              <ArrowUpRight className="h-4 w-4 arrow-slide" />
            </Link>
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
          <FadeIn className="max-w-4xl">
            <p className="eyebrow text-brand-yellow">Build a space your team loves</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-7xl lg:text-8xl xl:text-9xl">
              Come spend an<br />afternoon.
            </h2>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-background/75 md:text-2xl">
              The largest furniture showroom between New York City and Albany. Walk-ins welcome Monday through Friday. Bring your team, your floor plans, and your coffee mug.
            </p>
            <div className="mt-10 grid gap-3 text-base text-background/85 md:text-lg">
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-yellow" />
                {SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
              </p>
              <p className="font-mono text-sm text-background/65">
                {SITE.hoursDisplay}, {SITE.hoursClosed}
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 rounded-full bg-brand-yellow px-8 text-base font-semibold text-foreground hover:bg-brand-yellow-hover">
                <Link href="/showroom" className="group">
                  Plan a visit
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

      {/* FAQ */}
      <FAQSection
        eyebrow="Common questions"
        heading="What buyers ask first."
        intro="Forty years of fielding the same questions. Here is the short version."
        items={FAQS}
      />

      {/* Newsletter */}
      <section className="bg-foreground text-background section-y">
        <div className="container-wide">
          <NewsletterSignup variant="dark" />
        </div>
      </section>

      {/* Final yellow closer with scroll-driven horizontal text */}
      <section className="section-y" style={{ backgroundColor: "var(--brand-yellow)" }}>
        <div className="container-bleed">
          <ScrollText
            lines={["Let's design", "your space."]}
            textClassName="font-display font-semibold leading-[0.88] tracking-[-0.04em] text-foreground text-[clamp(4rem,18vw,16rem)]"
            travel={35}
          />
          <div className="container-wide mt-12">
            <p className="max-w-2xl text-xl leading-relaxed text-foreground/80 md:text-2xl">
              Single-chair upgrade or a full-floor install. Build your quote online and our team will follow up promptly.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 rounded-full bg-foreground px-8 text-base font-semibold text-background hover:bg-foreground/90">
                <Link href="/quote-request" className="group">
                  Connect with an Expert
                  <ArrowUpRight className="ml-1 h-5 w-5 arrow-slide" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-foreground/30 bg-transparent px-8 text-base text-foreground hover:bg-foreground/10">
                <Link href="/quote" className="group">
                  Build a quote cart
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
