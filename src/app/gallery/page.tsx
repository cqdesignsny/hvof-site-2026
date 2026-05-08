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
  title: "Gallery",
  description:
    "Photo gallery of recent HVOF installations across the Hudson Valley, including Marshall and Sterling, Marist College, and other client projects.",
};

interface GalleryItem {
  src: string;
  alt: string;
  /** Tailwind grid span suggestion */
  span?: "small" | "wide" | "tall";
}

const ITEMS: GalleryItem[] = [
  { src: IMG.marshallSterling.rooftop, alt: "Marshall and Sterling rooftop install", span: "wide" },
  { src: IMG.marshallSterling.gallery[0], alt: "Marshall and Sterling executive suite" },
  { src: IMG.marist.one, alt: "Marist College install", span: "tall" },
  { src: IMG.marshallSterling.gallery[1], alt: "M+S workstation pod" },
  { src: IMG.marshallSterling.gallery[2], alt: "M+S conference room" },
  { src: IMG.marist.two, alt: "Marist faculty office" },
  { src: IMG.marshallSterling.gallery[3], alt: "M+S open floor" },
  { src: IMG.marist.three, alt: "Marist common area", span: "wide" },
  { src: IMG.marshallSterling.gallery[4], alt: "M+S waiting area" },
  { src: IMG.marshallSterling.gallery[5], alt: "M+S detail" },
  { src: IMG.marshallSterling.gallery[6], alt: "M+S detail two" },
  { src: IMG.marist.four, alt: "Marist install detail" },
  { src: IMG.marshallSterling.gallery[7], alt: "M+S office", span: "tall" },
  { src: IMG.marist.five, alt: "Marist install five" },
  { src: IMG.marshallSterling.gallery[8], alt: "M+S install eight" },
  { src: IMG.marshallSterling.gallery[9], alt: "M+S install nine" },
  { src: IMG.marshallSterling.detail22, alt: "M+S install detail 22", span: "wide" },
  { src: IMG.marshallSterling.angle7, alt: "M+S angle 7" },
  { src: IMG.marshallSterling.angle14, alt: "M+S angle 14" },
  { src: IMG.marshallSterling.angle20, alt: "M+S angle 20" },
  { src: IMG.marist.lobby, alt: "Marist College lobby" },
];

function spanClasses(span?: GalleryItem["span"]) {
  switch (span) {
    case "wide":
      return "md:col-span-2 aspect-[16/10]";
    case "tall":
      return "md:row-span-2 aspect-[3/4]";
    default:
      return "aspect-[4/5]";
  }
}

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Gallery", href: "/gallery" }]} />

      <section className="bg-background pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-wide">
          <p className="eyebrow text-muted-foreground">Photo gallery</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-[0.92] tracking-[-0.035em] md:text-7xl lg:text-8xl xl:text-9xl">
            Real installations.<br />
            <span className="text-muted-foreground">Recent work.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-[1.5] text-muted-foreground md:text-2xl">
            A small slice of what we have built across the Hudson Valley. The full archive grows with every project.
          </p>
        </div>
      </section>

      <section className="bg-background pb-24 md:pb-32">
        <div className="container-wide">
          <div className="grid auto-rows-[12rem] grid-cols-1 gap-3 sm:auto-rows-[14rem] sm:grid-cols-2 md:auto-rows-[16rem] md:grid-cols-3 md:gap-5 lg:auto-rows-[20rem] lg:grid-cols-4 lg:gap-6">
            {ITEMS.map((item, i) => (
              <FadeIn key={`${item.src}-${i}`} delay={(i % 4) * 0.04} className={spanClasses(item.span)}>
                <div className="card-image-outline relative h-full w-full overflow-hidden bg-muted">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="image-zoom object-cover"
                    quality={75}
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background section-y-sm">
        <div className="container-wide flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-brand-yellow">Want to see more</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Visit the showroom.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-full bg-brand-yellow px-7 text-base font-semibold text-foreground hover:bg-brand-yellow-hover">
              <Link href="/showroom" className="group">
                Plan a visit
                <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/25 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white">
              <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
