import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { TrustedBy } from "@/components/sections/trusted-by";
import { TeamSection } from "@/components/sections/team-section";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hudson Valley Office Furniture is a modern office furniture company in Wappingers Falls, NY. The largest showroom between New York City and Albany at 37,000 square feet. Family-owned since 1985.",
};

const NUMBERS = [
  { value: "1985", label: "Founded" },
  { value: "37,000", label: "Sqft showroom" },
  { value: "Largest", label: "Between NYC + Albany" },
  { value: "40+", label: "Manufacturers" },
];

/** The 10 values extracted from the live About page */
const VALUES = [
  {
    title: "Functionality First",
    body: "Every piece we sell has to earn its place. We start with how the space gets used, not what it looks like in a brochure.",
  },
  {
    title: "Ergonomic Design",
    body: "Eight-hour shifts. Twelve-hour shifts. We spec to the body, not just the desk. Adjustable, supported, sustainable.",
  },
  {
    title: "Expertise Matters",
    body: "Forty years of installs across insurance brokers, hospitals, colleges, government, and manufacturing. We have seen the building.",
  },
  {
    title: "Space Optimization",
    body: "Floor plans, traffic flow, sight lines. We measure, we draft, we walk through. Every square foot has a job.",
  },
  {
    title: "Aesthetics Influence",
    body: "How a space feels affects how a team works. Modern, warm, or executive. we tune the look to match the brand.",
  },
  {
    title: "Customization Options",
    body: "Custom upholstery, custom finishes, custom millwork integration. Your space, your spec, your timeline.",
  },
  {
    title: "Environmental Impact",
    body: "Pre-owned inventory keeps tier-A products out of landfills. New items come from manufacturers with verified sustainability programs.",
  },
  {
    title: "Budget Considerations",
    body: "We mix new, pre-owned, and contract pricing in the same quote. The goal is the best room for the money you have.",
  },
  {
    title: "Support After Install",
    body: "Warranties, adjustments, additions. We pick up the phone and we know your account. Same crew, same trucks, same names.",
  },
  {
    title: "Delivery + Installation",
    body: "Our own crews handle delivery and install. From dock to desk. No third-party hand-offs.",
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
            src={IMG.marshallSterling.gallery[3]}
            alt="HVOF showroom interior"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" aria-hidden="true" />
        </div>
        <div className="container-wide relative z-10 pb-20 pt-36 md:pb-28 md:pt-48">
          <FadeIn className="max-w-5xl">
            <p className="eyebrow text-brand-yellow">About HVOF</p>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-[0.95] tracking-[-0.02em] text-white">
              A modern office furniture<br />
              company. Hudson Valley made.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
              Cutting-edge design meets ergonomic functionality. Workspaces that inspire innovation, collaboration, and the kind of long days good work demands.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Numbers */}
      <section className="border-y bg-background py-14 md:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {NUMBERS.map((n, i) => (
              <FadeIn key={n.label} delay={i * 0.05}>
                <p className="font-display text-5xl font-light leading-none tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
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
        <div className="container-wide">
          <div className="grid gap-16 md:grid-cols-12 md:gap-20">
            <FadeIn className="md:col-span-5">
              <p className="eyebrow text-muted-foreground">Our story</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
                Built for the Hudson Valley, by the Hudson Valley.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-7">
              <div className="space-y-6 text-base leading-relaxed text-foreground/85 md:text-lg lg:text-xl">
                <p>
                  HVOF opened in 1985 with a small storefront on Route 9 in Wappingers Falls and one promise: that businesses across the Hudson Valley would not have to drive to New York City to buy serious office furniture. Forty years later, the storefront has grown into 37,000 square feet of working configurations. the largest showroom between NYC and Albany. and we are still on Route 9.
                </p>
                <p>
                  Three generations of the same family have run this company. We know the brands because we have sold them for decades. We know the buildings because we have installed in most of them. And we know the buyers because they keep coming back. for a fifth chair, a third floor, a second decade.
                </p>
                <p>
                  Today we serve corporate offices, healthcare facilities, colleges, K–12 schools, government agencies, manufacturers, and the kind of small businesses that grow into big ones. From single ergonomic chairs to floor-by-floor installations, we spec, source, deliver, and install. all with the same crew you met at the showroom.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <TrustedBy />

      {/* Team */}
      <TeamSection />

      {/* Values grid */}
      <section className="bg-foreground text-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-brand-yellow">What we believe</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
              Ten things,<br />
              non-negotiable.
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-x-12 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <FadeIn
                key={v.title}
                delay={(i % 6) * 0.04}
                className="border-t border-background/15 py-7 md:py-8"
              >
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-yellow">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl font-light leading-snug tracking-tight md:text-3xl">
                  {v.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-background/65 md:text-base">
                  {v.body}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Showroom photos grid */}
      <section className="bg-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">The showroom</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[1] tracking-tight md:text-6xl lg:text-7xl">
              37,000 square feet of<br />
              working configurations.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Every category we sell, laid out at full scale. Sit in chairs, open drawers, walk through workstation pods. Bring your team for the day.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-3 md:grid-cols-12 md:gap-6">
            <FadeIn className="md:col-span-7">
              <div className="card-image-outline relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={IMG.marshallSterling.angle7}
                  alt="HVOF showroom"
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="image-zoom object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-5">
              <div className="card-image-outline relative aspect-[4/3] overflow-hidden bg-muted md:aspect-auto md:h-full">
                <Image
                  src={IMG.marist.three}
                  alt="HVOF showroom"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="image-zoom object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.15} className="md:col-span-5">
              <div className="card-image-outline relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={IMG.marshallSterling.angle20}
                  alt="HVOF showroom"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="image-zoom object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="md:col-span-7">
              <div className="card-image-outline relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={IMG.marist.five}
                  alt="HVOF showroom"
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="image-zoom object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-yellow section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <h2 className="font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl xl:text-9xl">
              Come see for yourself.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
              {SITE.address.street}, {SITE.address.city}, {SITE.address.region}. Walk-ins welcome Monday through Friday.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-foreground px-7 text-base text-background hover:bg-foreground/90">
                <Link href="/contact" className="group">
                  Plan a visit
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
