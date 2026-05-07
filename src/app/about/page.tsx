import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hudson Valley Office Furniture — family-owned since 1985. Three generations, 37,000 sqft showroom in Wappingers Falls, in-house installation crews across the Hudson Valley.",
};

const NUMBERS = [
  { value: "1985", label: "Founded" },
  { value: "37,000", label: "Square feet of showroom" },
  { value: "2,000+", label: "Projects delivered" },
  { value: "12", label: "Cities served daily" },
];

const PILLARS = [
  {
    title: "We sell only what we can stand behind.",
    body: "Forty years of vetting brands. Steelcase, Herman Miller, Knoll, HON, and a handful of regional makers we trust. If we wouldn't put it in our own office, we don't sell it.",
  },
  {
    title: "We installed it. We service it.",
    body: "Our crews are direct hires. They lay it out, they install it, and they come back when something needs attention. Same names, same trucks, year after year.",
  },
  {
    title: "Pre-owned isn't a downgrade. It's a strategy.",
    body: "We refurbish, inspect, and warranty pre-owned inventory. For startups outfitting their first office or facilities teams expanding mid-cycle, it's often the smarter buy.",
  },
  {
    title: "Local means we pick up.",
    body: "When the warranty needs us, when a chair shows up wrong, when the install runs into a wall that wasn't on the plans — we are forty minutes from your office, not an 800 number.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />

      {/* Hero */}
      <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 -z-10">
          <Image
            src={IMG.marist.lobby}
            alt="HVOF showroom interior"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" aria-hidden="true" />
        </div>
        <div className="container-editorial relative z-10 pb-20 pt-36 md:pb-28 md:pt-48">
          <FadeIn className="max-w-4xl">
            <p className="eyebrow text-brand-yellow">About HVOF</p>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[0.95] tracking-[-0.02em] text-white">
              Forty years.<br />
              One Hudson Valley family.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
              We started in 1985 with a single truck and a small showroom on Route 9. Today we&apos;re still on Route 9, still family-owned, and still answering the phone.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Numbers */}
      <section className="border-y bg-background py-14 md:py-20">
        <div className="container-editorial">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {NUMBERS.map((n, i) => (
              <FadeIn key={n.label} delay={i * 0.05}>
                <p className="font-display text-5xl font-light leading-none tracking-tight md:text-6xl lg:text-7xl">
                  {n.value}
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted-foreground md:text-base">
                  {n.label}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-background section-y">
        <div className="container-editorial">
          <div className="grid gap-16 md:grid-cols-12 md:gap-20">
            <FadeIn className="md:col-span-5">
              <p className="eyebrow text-muted-foreground">Our story</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                Built for the Hudson Valley, by the Hudson Valley.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-7">
              <div className="prose-style space-y-6 text-base leading-relaxed text-foreground/85 md:text-lg">
                <p>
                  HVOF opened in 1985 with a small storefront on Route 9 in Wappingers Falls and one promise: that businesses across the Hudson Valley wouldn&apos;t have to drive to New York City to buy serious office furniture. Forty years later, the storefront has grown into 37,000 square feet of working configurations, and we&apos;re still on Route 9.
                </p>
                <p>
                  Three generations of the same family have run this company. We know the brands because we&apos;ve sold them for decades. We know the buildings because we&apos;ve installed in most of them. And we know the buyers because they keep coming back — for a fifth chair, a third floor, a second decade.
                </p>
                <p>
                  Today we serve corporate offices, healthcare facilities, colleges, K-12 schools, government agencies, manufacturers, and the kind of small businesses that grow into big ones. From single ergonomic chairs to floor-by-floor installations, we spec, source, deliver, and install — all with the same crew you met at the showroom.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-foreground text-background section-y">
        <div className="container-editorial">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-brand-yellow">What we believe</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              Four things,<br />
              non-negotiable.
            </h2>
          </FadeIn>
          <div className="mt-20 grid gap-12 md:grid-cols-2 md:gap-16">
            {PILLARS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.05}>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-yellow">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-3xl font-light leading-snug tracking-tight md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-background/70">
                  {p.body}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Showroom photos */}
      <section className="bg-background section-y">
        <div className="container-editorial">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">The showroom</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              37,000 square feet of<br />
              working configurations.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Every category we sell is laid out at full scale. Sit in chairs, open drawers, walk through workstation pods. Bring your team for the day.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-4 md:grid-cols-12 md:gap-6">
            <FadeIn className="md:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={IMG.marshallSterling.angle7}
                  alt="HVOF showroom"
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted md:aspect-auto md:h-full">
                <Image
                  src={IMG.marist.three}
                  alt="HVOF showroom"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.15} className="md:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={IMG.marshallSterling.angle20}
                  alt="HVOF showroom"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="md:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={IMG.marist.five}
                  alt="HVOF showroom"
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-yellow section-y">
        <div className="container-editorial">
          <FadeIn className="max-w-3xl">
            <h2 className="font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Come see for yourself.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
              {SITE.address.street}, {SITE.address.city}, {SITE.address.region}. Walk-ins welcome Monday through Friday.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-foreground px-6 text-base text-background hover:bg-foreground/90">
                <Link href="/contact">
                  Plan a visit
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
