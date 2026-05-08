import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { MasonryGallery, type LightboxItem } from "@/components/sections/photo-lightbox";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo gallery of HVOF office furniture installations across the Hudson Valley. Marshall and Sterling, Marist College, and other recent client projects.",
};

const PHOTOS: LightboxItem[] = [
  { src: IMG.marshallSterling.rooftop, alt: "Marshall and Sterling rooftop install", caption: "Marshall + Sterling, rooftop" },
  { src: IMG.marshallSterling.gallery[0], alt: "M+S executive suite", caption: "Marshall + Sterling, executive suite" },
  { src: IMG.marist.one, alt: "Marist install", caption: "Marist College, faculty offices" },
  { src: IMG.marshallSterling.gallery[1], alt: "M+S workstations", caption: "Marshall + Sterling, workstations" },
  { src: IMG.marshallSterling.gallery[2], alt: "M+S conference", caption: "Marshall + Sterling, conference" },
  { src: IMG.marist.lobby, alt: "Marist lobby", caption: "Marist College, lobby" },
  { src: IMG.marshallSterling.gallery[3], alt: "M+S floor", caption: "Marshall + Sterling, trading floor" },
  { src: IMG.marist.three, alt: "Marist atrium", caption: "Marist College, common area" },
  { src: IMG.marshallSterling.detail22, alt: "M+S detail 22", caption: "Marshall + Sterling, custom millwork" },
  { src: IMG.marshallSterling.angle7, alt: "M+S angle 7", caption: "Marshall + Sterling, private office" },
  { src: IMG.marist.two, alt: "Marist 2", caption: "Marist College, faculty pods" },
  { src: IMG.marshallSterling.angle14, alt: "M+S angle 14", caption: "Marshall + Sterling, open plan" },
  { src: IMG.marist.four, alt: "Marist 4", caption: "Marist College, lounge" },
  { src: IMG.marshallSterling.angle20, alt: "M+S angle 20", caption: "Marshall + Sterling, casegoods" },
  { src: IMG.marshallSterling.gallery[4], alt: "M+S 4", caption: "Marshall + Sterling, lobby" },
  { src: IMG.marist.five, alt: "Marist 5", caption: "Marist College, study commons" },
  { src: IMG.marshallSterling.gallery[5], alt: "M+S 5", caption: "Marshall + Sterling, workstation detail" },
  { src: IMG.marshallSterling.gallery[6], alt: "M+S 6", caption: "Marshall + Sterling, breakroom" },
  { src: IMG.marshallSterling.gallery[7], alt: "M+S 7", caption: "Marshall + Sterling, executive" },
  { src: IMG.marshallSterling.gallery[8], alt: "M+S 8", caption: "Marshall + Sterling, reception" },
  { src: IMG.marshallSterling.gallery[9], alt: "M+S 9", caption: "Marshall + Sterling, casegoods" },
];

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
            A small slice of what we have built across the Hudson Valley. Click any photo to open it large. The full archive grows with every project.
          </p>
        </div>
      </section>

      <section className="bg-background pb-24 md:pb-32">
        <div className="container-wide">
          <MasonryGallery items={PHOTOS} />
        </div>
      </section>

      <section className="bg-foreground text-background section-y-sm">
        <div className="container-wide flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow" style={{ color: "var(--brand-yellow)" }}>Want to see more</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Take the virtual tour or visit the showroom.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-full px-7 text-base font-semibold text-foreground hover:opacity-90" style={{ backgroundColor: "var(--brand-yellow)" }}>
              <Link href="/virtual-tour" className="group">
                Virtual tour
                <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/25 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white">
              <Link href="/showroom">Plan a visit</Link>
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
