import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { SampleNotice } from "@/components/sections/sample-notice";
import { IMG } from "@/lib/images";
import { NAV } from "@/lib/site";

export const metadata: Metadata = {
  title: "Furniture Catalog",
  description:
    "Browse the full HVOF office furniture catalog: seating, desks, conference, pods, healthcare, education, pre-owned, and NYS contracts.",
};

const COVER_IMAGES: Record<string, string> = {
  Seating: IMG.marshallSterling.angle14,
  Desks: IMG.marist.three,
  Conference: IMG.marshallSterling.gallery[0],
  "Panel Systems and Pods": IMG.marshallSterling.gallery[3],
  Healthcare: IMG.marist.lobby,
  Education: IMG.marist.four,
  "Pre-Owned": IMG.marshallSterling.angle20,
  "NYS Contracts": IMG.marshallSterling.gallery[5],
};

export default function FurniturePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Furniture", href: "/furniture" },
        ]}
      />

      {/* Hero */}
      <section className="bg-background pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-wide">
          <p className="eyebrow text-muted-foreground">Furniture</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl xl:text-9xl">
            Every category.<br />
            <span className="text-muted-foreground">Every brand. Every floor.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Browse the catalog, build a quote cart, and submit. We confirm pricing, delivery, and contract eligibility promptly.
          </p>
        </div>
      </section>

      {/* Categories grid */}
      <section className="bg-background pb-24 md:pb-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
            {NAV.furniture.map((cat, i) => (
              <FadeIn key={cat.href} delay={(i % 4) * 0.04}>
                <Link href={cat.href} className="group block">
                  <div className="card-image-outline relative aspect-[4/5] overflow-hidden bg-muted">
                    <Image
                      src={COVER_IMAGES[cat.label] ?? IMG.marshallSterling.rooftop}
                      alt={cat.label}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="image-zoom object-cover"
                      quality={80}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent p-5 md:p-6">
                      <div className="flex items-baseline justify-between">
                        <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                          {cat.label}
                        </h2>
                        <ArrowUpRight className="h-4 w-4 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SampleNotice />

      <section className="bg-foreground text-background section-y-sm">
        <div className="container-wide flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-brand-yellow">Quick path</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Already know what you need?
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-full bg-brand-yellow px-7 text-base text-foreground hover:bg-brand-yellow-hover">
              <Link href="/quote" className="group">
                Build a quote
                <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/25 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/quote-request">Connect with an Expert</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
