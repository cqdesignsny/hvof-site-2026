import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { FAQSection } from "@/components/sections/faq-section";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "NYS Contract Office Furniture",
  description:
    "Authorized vendor on multiple New York State OGS contracts. State, municipal, and educational buyers can purchase office furniture from 40+ manufacturers at contract pricing. Even minimal state aid qualifies.",
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
  { step: "01", title: "Tell us your contract number", body: "OGS, county, or institutional. We confirm eligibility and pull contract pricing." },
  { step: "02", title: "We spec the room", body: "Floor plans, furniture specifications, finishes, and installation timeline. Free with the quote." },
  { step: "03", title: "Quote on letterhead", body: "Itemized quote with contract reference numbers, ready for your procurement team." },
  { step: "04", title: "PO, delivery, install", body: "We accept POs from approved entities. Our crews handle delivery and installation." },
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
      "Even minimal state aid qualifies an organization to purchase off OGS contract. Public libraries, certain non-profits, and quasi-government entities frequently use contracts for the price stability and the simplified procurement process.",
  },
  {
    question: "Which manufacturers can we order from at contract pricing?",
    answer:
      "Over 40 manufacturers, including Steelcase / OFS, Herman Miller, Knoll, Humanscale, HON, Global, KI, Safco, Nightingale, and Trinity, plus regional specialty brands.",
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
          { name: "Furniture", href: "/furniture" },
          { name: "NYS Contracts", href: "/furniture/nys-contracts" },
        ]}
      />

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
            <p className="eyebrow text-brand-yellow">Furniture, NYS Contracts</p>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-white">
              State, municipal,<br />
              and educational pricing.
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-[1.5] text-white/80 md:text-2xl">
              Authorized vendor on multiple New York State OGS contracts. 40+ manufacturers. Quotes formatted for your procurement portal.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 rounded-full bg-brand-yellow px-8 text-base font-semibold text-foreground hover:bg-brand-yellow-hover">
                <Link href="/contact" className="group">
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

      {/* Eligibility */}
      <section className="bg-background section-y">
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
                    <Check className="mt-1 h-5 w-5 shrink-0 text-brand-yellow" />
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
            <p className="eyebrow text-brand-yellow">How it works</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
              Four steps,<br />
              <span className="text-background/55">no surprises.</span>
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-x-12 gap-y-2 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.05} className="border-t border-background/15 py-8 md:py-10">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-yellow">{p.step}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">{p.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-background/65 md:text-lg">{p.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturers */}
      <section className="bg-muted section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">On contract</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
              40 plus manufacturers.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              A working sample. Reach out if you need a specific brand confirmed.
            </p>
          </FadeIn>
          <div className="mt-12 flex flex-wrap gap-3">
            {SITE.manufacturers.map((m) => (
              <span key={m} className="rounded-full border border-foreground/15 bg-background px-5 py-2.5 text-base font-medium md:text-lg">
                {m}
              </span>
            ))}
            <span className="rounded-full bg-foreground px-5 py-2.5 text-base font-medium text-background md:text-lg">
              and 25+ more
            </span>
          </div>
        </div>
      </section>

      <FAQSection eyebrow="Common questions" heading="Procurement teams ask first." items={FAQS} />

      <section className="bg-brand-yellow section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <h2 className="font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-7xl lg:text-8xl">
              Have a contract number?<br />
              Send it over.
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 rounded-full bg-foreground px-8 text-base font-semibold text-background hover:bg-foreground/90">
                <Link href="/contact" className="group">
                  Get a quote
                  <ArrowUpRight className="ml-1 h-5 w-5 arrow-slide" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-foreground/30 bg-transparent px-8 text-base text-foreground hover:bg-foreground/10">
                <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
