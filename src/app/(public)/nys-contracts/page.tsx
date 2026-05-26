import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { ScrollText } from "@/components/motion/scroll-text";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { FAQSection } from "@/components/sections/faq-section";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "NYS Contract Office Furniture",
  description:
    "Authorized New York State contract dealer. State, municipal, nonprofit, and educational buyers can purchase office furniture from 40+ premier manufacturers at fixed, pre-negotiated contract pricing. Any organization receiving even one dollar of New York State funding qualifies.",
};

const ELIGIBLE = [
  "New York State agencies",
  "Counties, cities, towns, and villages",
  "Public colleges and universities",
  "K through 12 school districts and BOCES",
  "Public libraries and authorities",
  "Non-profits receiving any state aid",
];

const PROCESS = [
  { title: "Tell us your contract number", body: "OGS, county, or institutional. We confirm eligibility and pull contract pricing." },
  { title: "We spec the room", body: "Floor plans, furniture specifications, finishes, and installation timeline. Free with the quote." },
  { title: "Quote on letterhead", body: "Itemized quote with contract reference numbers, ready for your procurement team." },
  { title: "PO, delivery, install", body: "We accept POs from approved entities. Our crews handle delivery and installation." },
];

const FAQS = [
  {
    question: "Which NYS contracts do you carry?",
    answer:
      "We are an authorized vendor on multiple OGS contracts covering office furniture, seating, systems, and educational furniture. We pull current contract terms with every quote so the pricing matches the active contract on the day you order.",
  },
  {
    question: "What if our organization only receives partial state funding?",
    answer:
      "Even minimal state aid qualifies. If you receive even one dollar of state aid, you can buy through us at contract pricing. Public libraries, certain non-profits, and quasi-government entities use contracts for the price stability and the simplified procurement.",
  },
  {
    question: "Which manufacturers can we order from at contract pricing?",
    answer:
      "Over 40 manufacturers, including AIS, Allermuir, Global, Humanscale, KI, Safco, Steelcase / OFS, Knoll, HBF, KFI, Nightingale, and Trinity. Full list with links is on this page.",
  },
  {
    question: "Can you build a quote for our procurement portal?",
    answer:
      "Yes. We can format quotes to match your procurement system, include all required identifiers, and submit through whatever portal you use. We also accept standard purchase orders by email.",
  },
  {
    question: "Do you do BOCES, libraries, and town hall projects?",
    answer:
      "All the time. From a few task chairs at a town hall to a full BOCES classroom build, we handle every size with the same hands-on team.",
  },
];

export default function NYSContractsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "NYS Contracts", href: "/nys-contracts" },
        ]}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 -z-10">
          <Image
            src={IMG.marist.three}
            alt="Public sector office furniture installation"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" aria-hidden="true" />
        </div>
        <div className="container-wide relative z-10 pb-24 pt-40 md:pb-32 md:pt-52">
          <FadeIn className="max-w-5xl">
            <p className="eyebrow" style={{ color: "var(--brand-yellow)" }}>
              NYS Contracts
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-white">
              State, municipal, nonprofit,<br />
              and educational pricing.
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-[1.5] text-white/80 md:text-2xl">
              Authorized New York State contract dealer. 40+ premier manufacturers. Fixed, pre-negotiated pricing backed by collective purchasing power. Any organization receiving New York State funding, even as little as one dollar, is eligible to participate.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full px-8 text-base font-semibold text-foreground hover:opacity-90"
                style={{ backgroundColor: "var(--brand-yellow)" }}
              >
                <Link href="/quote-request" className="group">
                  Request a contract quote
                  <ArrowUpRight className="ml-1 h-5 w-5 arrow-slide" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-white/30 bg-transparent px-8 text-base text-white hover:bg-white/10 hover:text-white">
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
              <strong className="font-semibold">If you are eligible for even one dollar of state aid,</strong> you can benefit from special state contract pricing through us. What sets us apart is our value-added service that goes beyond standard offerings. With deep knowledge of every manufacturer&apos;s program and strong relationships across the contract lineup, we make procurement clean and fast.
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-[1.6] text-muted-foreground md:text-xl">
              All state contract items come at fixed prices, eliminating tedious negotiations. As your trusted local dealer we respond promptly and guide you through every step. Whether you need a single chair or a full facility outfit, the same team handles spec, source, deliver, and install.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Eligibility */}
      <section className="bg-muted section-y">
        <div className="container-wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <FadeIn className="md:col-span-5">
              <p className="eyebrow text-muted-foreground">Who qualifies</p>
              <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
                If you receive any state aid,<br />
                <span className="text-muted-foreground">you qualify.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-7">
              <ul className="grid gap-3 md:grid-cols-2">
                {ELIGIBLE.map((e) => (
                  <li key={e} className="flex items-start gap-3 border-t border-border pt-5">
                    <Check className="mt-1 h-5 w-5 shrink-0" style={{ color: "var(--brand-yellow)" }} />
                    <span className="text-lg leading-relaxed md:text-xl">{e}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-base text-muted-foreground md:text-lg">
                Not sure if your organization qualifies? Send us your entity name and we will confirm in 24 hours.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-foreground text-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow" style={{ color: "var(--brand-yellow)" }}>
              How it works
            </p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
              Four steps,<br />
              <span className="text-background/55">no surprises.</span>
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-x-12 gap-y-2 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.05} className="border-t border-background/15 py-8 md:py-10">
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{p.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-background/65 md:text-lg">{p.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturer roster with real outbound links */}
      <section className="bg-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">On contract</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
              {SITE.manufacturers.length} manufacturers.<br />
              <span className="text-muted-foreground">All linked.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Click through to any manufacturer to browse the catalog. We carry their full line at NYS contract pricing.
            </p>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
            {SITE.manufacturers.map((m) => (
              <a
                key={m.name}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-interactive group flex items-center justify-between gap-3 p-5 md:p-6"
              >
                <div>
                  <p className="font-display text-lg font-semibold tracking-tight md:text-xl">{m.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    NYS contract partner
                  </p>
                </div>
                <ExternalLink
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                  style={{ color: undefined }}
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <FAQSection eyebrow="Common questions" heading="Procurement teams ask first." items={FAQS} />

      {/* Closer with snap-pinned scroll text */}
      <section className="section-y" style={{ backgroundColor: "var(--brand-yellow)" }}>
        <div className="container-bleed">
          <ScrollText
            lines={["Have a contract", "number? Send it."]}
            textClassName="font-display font-semibold leading-[0.9] tracking-[-0.04em] text-foreground text-[clamp(3rem,12vw,11rem)]"
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
