import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { TrustedBy } from "@/components/sections/trusted-by";
import { TeamSection } from "@/components/sections/team-section";
import { ScrollText } from "@/components/motion/scroll-text";
import { VideoWithPoster } from "@/components/sections/video-with-poster";
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
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-white">
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
                <p className="font-display text-5xl font-semibold leading-none tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
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
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
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
            <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
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
                <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
                  {v.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-background/65 md:text-lg">
                  {v.body}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HVOF in motion. The 30-second video served from the WP CDN */}
      <section className="bg-background section-y-sm">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">HVOF in motion</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1] tracking-tight md:text-5xl lg:text-6xl">
              Thirty seconds in the showroom.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="mt-10">
            <VideoWithPoster
              src="https://thewowguys.com/wp-content/uploads/2024/04/HVOF-30.mp4"
              posterSrc={IMG.marshallSterling.gallery[0]}
              posterAlt="HVOF showroom video preview"
            />
          </FadeIn>
        </div>
      </section>

      {/* CTA with scroll-driven horizontal text */}
      <section className="section-y" style={{ backgroundColor: "var(--brand-yellow)" }}>
        <div className="container-bleed">
          <ScrollText
            lines={["Come see", "for yourself."]}
            textClassName="font-display font-semibold leading-[0.88] tracking-[-0.04em] text-foreground text-[clamp(3.5rem,15vw,13rem)]"
            travel={32}
          />
          <div className="container-wide mt-12">
            <p className="max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">
              {SITE.address.street}, {SITE.address.city}, {SITE.address.region}. Walk-ins welcome Monday through Friday.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-foreground px-7 text-base font-semibold text-background hover:bg-foreground/90">
                <Link href="/contact" className="group">
                  Plan a visit
                  <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-foreground/30 bg-transparent px-7 text-base text-foreground hover:bg-foreground/10">
                <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
