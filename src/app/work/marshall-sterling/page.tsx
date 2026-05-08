import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Marshall + Sterling Case Study",
  description:
    "Twenty-plus years of office furniture installations for Marshall + Sterling, the Hudson Valley's largest privately-held insurance broker. Floor-by-floor reconfiguration, C-suite redesign, and rooftop transformation.",
};

const SCOPE = [
  {
    title: "Complete office setup",
    body: "From open workstations to ergonomic chairs, we curated every detail of the layout. The result is a functional, modern environment that balances productivity with comfort.",
  },
  {
    title: "Conference rooms + private offices",
    body: "We outfitted conference rooms and individual offices with sleek, high-quality furniture that blends design and functionality. Built to impress and to perform.",
  },
  {
    title: "Rooftop outdoor furniture",
    body: "We transformed the rooftop into a vibrant extension of the workplace with durable, weather-rated outdoor furniture. A break area and a spot for team gatherings.",
  },
];

const STATS = [
  { value: "20+", label: "Years as a client" },
  { value: "4", label: "Floors reconfigured" },
  { value: "240+", label: "Workstations installed" },
  { value: "C-suite", label: "Redesigned" },
];

export default function MarshallSterlingPage() {
  const heroImage = IMG.marshallSterling.rooftop;
  const galleryImages = [
    ...IMG.marshallSterling.gallery,
    IMG.marshallSterling.detail22,
    IMG.marshallSterling.angle7,
    IMG.marshallSterling.angle14,
    IMG.marshallSterling.angle20,
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Work", href: "/work" },
          { name: "Marshall + Sterling", href: "/work/marshall-sterling" },
        ]}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImage}
            alt="Marshall + Sterling rooftop installation"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" aria-hidden="true" />
        </div>
        <div className="container-wide relative z-10 pb-24 pt-36 md:pb-32 md:pt-48">
          <FadeIn className="max-w-5xl">
            <p className="eyebrow text-brand-yellow">Case Study · Insurance · Poughkeepsie, NY</p>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7.5vw,6.5rem)] font-light leading-[0.92] tracking-[-0.02em] text-white">
              Twenty years.<br />
              Floor by floor.<br />
              From the basement to the roof.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
              Marshall + Sterling is one of the Hudson Valley&apos;s largest privately-held insurance brokers. We started replacing their 1960s furniture in 2004 and we are still on retainer.
            </p>

            <div className="mt-12 grid gap-6 border-t border-white/15 pt-8 md:grid-cols-4 md:gap-10">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-light leading-none text-white md:text-4xl lg:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/55">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Project meta strip */}
      <section className="border-y bg-background py-8">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-4 md:gap-10">
            <Meta icon={<MapPin className="h-4 w-4" />} label="Location" value="Poughkeepsie, NY" />
            <Meta icon={<Calendar className="h-4 w-4" />} label="Engagement" value="2004 – present" />
            <Meta label="Sector" value="Insurance · Privately held" />
            <Meta label="Scope" value="4 floors + C-suite + rooftop" />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-background section-y">
        <div className="container-wide">
          <div className="grid gap-16 md:grid-cols-12 md:gap-20">
            <FadeIn className="md:col-span-5">
              <p className="eyebrow text-muted-foreground">The story</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                A 1960s office.<br />
                A modern company.<br />
                A long relationship.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-7">
              <div className="space-y-6 text-base leading-relaxed text-foreground/85 md:text-lg lg:text-xl">
                <p>
                  When we first walked through Marshall + Sterling&apos;s headquarters in Poughkeepsie, the company was running a modern insurance operation out of a building still full of 1960s casegoods. The team was growing. The chairs were not ergonomic. The conference rooms were tired.
                </p>
                <p>
                  We started in one corner of one floor and replaced what mattered first. Twenty years later, we have updated every floor, redesigned the C-suite, outfitted satellite offices across the Hudson Valley, and transformed their rooftop into one of the most-used spaces in the building.
                </p>
                <p>
                  Along the way we have specified Steelcase systems, Herman Miller seating, custom millwork, weather-rated outdoor furniture, conference-grade boardroom suites, and acoustic phone booths. Every piece coordinated. Every install on a schedule the facilities team could plan around.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Scope sections */}
      <section className="bg-foreground text-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-brand-yellow">Project scope</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              Three rooms.<br />
              <span className="text-background/60">One full transformation.</span>
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-x-12 gap-y-2 md:grid-cols-3">
            {SCOPE.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.06} className="border-t border-background/15 py-8 md:py-10">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-yellow">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-2xl font-light tracking-tight md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-background/65 md:text-base">
                  {s.body}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="bg-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">Walk the project</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Selected installations.
            </h2>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {galleryImages.map((src, i) => {
              // Asymmetric layout: every 5th image is wider
              const wide = i % 5 === 0;
              return (
                <FadeIn
                  key={src}
                  delay={(i % 4) * 0.04}
                  className={wide ? "lg:col-span-2" : ""}
                >
                  <div className={`card-image-outline group relative ${wide ? "aspect-[16/10]" : "aspect-[4/5]"} overflow-hidden bg-muted`}>
                    <Image
                      src={src}
                      alt={`Marshall + Sterling installation, photo ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="image-zoom object-cover"
                      quality={80}
                    />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-muted section-y-sm">
        <div className="container-editorial">
          <FadeIn className="mx-auto max-w-5xl text-center">
            <p className="eyebrow text-muted-foreground">From the M+S file</p>
            <blockquote className="mt-6 font-display text-3xl font-light leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
              &ldquo;From design to install, our relationship with Marshall &amp; Sterling has spanned more than 20 years — from updating dated 1960s furniture one floor at a time, to reimagining their C-suite, to enhancing their rooftop with breathtaking views.&rdquo;
            </blockquote>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Hudson Valley Office Furniture
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-yellow section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-foreground/60">Have a project</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Let&apos;s talk specifics.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
              Single floor or whole building. Same approach: spec, source, deliver, install — and stay on call after.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-foreground px-7 text-base text-background hover:bg-foreground/90">
                <Link href="/contact" className="group">
                  Start a project
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

function Meta({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <p className="eyebrow">{label}</p>
      </div>
      <p className="mt-2 font-display text-lg font-light tracking-tight md:text-xl">{value}</p>
    </div>
  );
}
