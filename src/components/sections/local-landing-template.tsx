import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { FAQSection } from "@/components/sections/faq-section";
import { BreadcrumbSchema, ServiceSchema } from "@/components/seo/json-ld";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

interface LocalLandingProps {
  city: string;
  state?: string;
  driveTime: string;
  intro: string;
  faqs: { question: string; answer: string }[];
  href: string;
}

export function LocalLandingTemplate({
  city,
  state = "NY",
  driveTime,
  intro,
  faqs,
  href,
}: LocalLandingProps) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: `Office Furniture ${city}`, href },
        ]}
      />
      <ServiceSchema
        name={`Office Furniture Delivery and Installation in ${city}, ${state}`}
        description={`Hudson Valley Office Furniture delivers and installs new, pre-owned, and custom office furniture in ${city}, ${state}, including task seating, desks, conference tables, and full-floor installations.`}
        areaServed={`${city}, ${state}`}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 -z-10">
          <Image
            src={IMG.marshallSterling.rooftop}
            alt={`Office furniture installation near ${city}, ${state}`}
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" aria-hidden="true" />
        </div>
        <div className="container-editorial relative z-10 pb-20 pt-36 md:pb-28 md:pt-48">
          <FadeIn className="max-w-4xl">
            <p className="eyebrow text-brand-yellow">
              Office Furniture · {city}, {state}
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.25rem,6.5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-white">
              Office furniture in {city}.<br />
              Delivered and installed.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-brand-yellow px-6 text-base text-foreground hover:bg-brand-yellow-hover">
                <Link href="/quote-request">
                  Connect with an Expert
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Direct-answer paragraph for AEO */}
      <section className="bg-background py-12 md:py-16">
        <div className="container-editorial">
          <FadeIn className="max-w-3xl">
            <p className="text-xl leading-relaxed text-foreground md:text-2xl">
              <strong className="font-medium">Hudson Valley Office Furniture serves {city}, {state}</strong> from a 37,000 sqft showroom on Route 9 in Wappingers Falls. about {driveTime} from {city}. We deliver and install task seating, desks, conference tables, and full-floor installations, with in-house crews and same-day quote turnaround.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services for this city */}
      <section className="bg-background pb-20 md:pb-28">
        <div className="container-editorial">
          <FadeIn className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">What we deliver to {city}</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Every category.<br />
              Every brand.
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-x-12 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Task & ergonomic seating", desc: "Steelcase, Herman Miller, Humanscale, HON" },
              { name: "Sit-stand desks", desc: "Single units to floor-wide benching." },
              { name: "Conference rooms", desc: "Tables, chairs, AV-integrated boardrooms." },
              { name: "Workstation systems", desc: "Panels, benching, cubicles, reconfigurations." },
              { name: "Healthcare seating", desc: "Patient rooms, exam, waiting areas." },
              { name: "Pre-owned inventory", desc: "Tier-A brands, inspected and warranted." },
            ].map((s, i) => (
              <FadeIn
                key={s.name}
                delay={i * 0.04}
                className="border-t border-border py-6 md:py-7"
              >
                <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why HVOF for this city */}
      <section className="bg-foreground text-background section-y">
        <div className="container-editorial">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <FadeIn className="md:col-span-5">
              <p className="eyebrow text-brand-yellow">Why {city} buyers pick HVOF</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                Local, fast, and accountable.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-7">
              <ul className="space-y-6">
                {[
                  { title: `${driveTime} drive from {city}`.replace("{city}", city), body: "Quote, delivery, and installation timelines that match your project schedule." },
                  { title: "Same crew from spec to install", body: "The team that quotes you delivers and sets it up. No hand-offs, no surprises." },
                  { title: "Pre-owned + new inventory", body: "Outfit faster, spend less, scale without compromise. Quality controlled at our facility." },
                  { title: "NYS contracts welcome", body: "Authorized vendor on multiple OGS contracts for state, municipal, and educational buyers." },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4 border-t border-background/15 pt-5">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-brand-yellow" />
                    <div>
                      <p className="font-display text-xl font-normal leading-snug">{item.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-background/70">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Visit info bar */}
      <section className="border-y bg-muted py-10">
        <div className="container-editorial flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <MapPin className="h-5 w-5 text-brand-yellow" />
            <div>
              <p className="eyebrow text-muted-foreground">Showroom</p>
              <p className="mt-1 font-display text-lg font-semibold">
                {SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="h-5 w-5 text-brand-yellow" />
            <div>
              <p className="eyebrow text-muted-foreground">Hours</p>
              <p className="mt-1 font-display text-lg font-semibold">{SITE.hoursDisplay}</p>
            </div>
          </div>
          <Button asChild className="rounded-full" size="lg">
            <Link href="/quote-request">
              Request a quote
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection eyebrow={`${city} FAQ`} heading={`Office furniture in ${city}.`} items={faqs} />

      {/* Closer */}
      <section className="bg-brand-yellow section-y">
        <div className="container-editorial">
          <FadeIn className="max-w-3xl">
            <h2 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Ready, {city}?
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
              Get a quote in under 24 hours. Often same-day for stocked items.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-foreground px-6 text-base text-background hover:bg-foreground/90">
                <Link href="/quote-request">
                  Connect with an Expert
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-foreground/30 bg-transparent px-6 text-base text-foreground hover:bg-foreground/10"
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
