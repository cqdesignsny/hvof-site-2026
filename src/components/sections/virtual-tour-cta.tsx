import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { IMG } from "@/lib/images";

/**
 * "View Our Showroom. Check Out Our Virtual Tour" section.
 * Editorial split: text left, image right with hover overlay that reveals "Take the tour".
 */
export function VirtualTourCTA() {
  return (
    <section className="bg-background section-y">
      <div className="container-wide">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16 lg:gap-24">
          <FadeIn>
            <p className="eyebrow text-muted-foreground">View our showroom</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
              Step inside.<br />
              <span className="text-muted-foreground">Without stepping in.</span>
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
              Our interactive virtual tour lets you walk room-to-room through 37,000 sqft of working configurations on Route 9. Open it on your phone or pull it up in a meeting.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-foreground px-7 text-base text-background hover:bg-foreground/90"
              >
                <Link href="/virtual-tour" className="group">
                  Take the virtual tour
                  <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-foreground/20 bg-transparent px-7 text-base text-foreground hover:bg-foreground/5"
              >
                <Link href="/showroom">Plan a visit</Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Link
              href="/virtual-tour"
              className="card-image-outline group block aspect-[4/5] w-full overflow-hidden md:aspect-[4/5]"
            >
              <div className="relative h-full w-full">
                <Image
                  src={IMG.marshallSterling.gallery[2]}
                  alt="HVOF showroom virtual tour preview"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="image-zoom object-cover"
                  quality={85}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
                      360° walkthrough
                    </p>
                    <p className="mt-2 font-display text-2xl font-light text-white md:text-3xl">
                      Wappingers Falls showroom
                    </p>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-yellow text-foreground transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
