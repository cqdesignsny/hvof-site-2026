"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Transition } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

export interface GalleryShot {
  src: string;
  alt: string;
  /** Optional caption shown on hover and on the active hero */
  caption?: string;
  client?: string;
}

interface InteractiveGalleryProps {
  shots: GalleryShot[];
  eyebrow?: string;
  heading?: React.ReactNode;
}

/**
 * Editorial gallery: a large active hero on the left, click-to-swap thumbnails on the right.
 * Cross-fades when the active shot changes. Mobile collapses thumbs into a horizontal scroller.
 */
export function InteractiveGallery({
  shots,
  eyebrow = "Gallery",
  heading,
}: InteractiveGalleryProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = shots[active];

  return (
    <section className="bg-foreground text-background section-y">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="eyebrow" style={{ color: "var(--brand-yellow)" }}>
              {eyebrow}
            </p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
              {heading ?? (
                <>
                  Real installations,<br />
                  <span className="text-background/55">recently delivered.</span>
                </>
              )}
            </h2>
          </div>
          <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/25 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white">
            <Link href="/gallery" className="group">
              See all installations
              <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-12 md:gap-8 lg:gap-10">
          {/* Active hero on the left */}
          <div className="md:col-span-8">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black md:aspect-[16/11]">
              <AnimatePresence mode="sync">
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="(min-width: 768px) 66vw, 100vw"
                    className="object-cover"
                    quality={85}
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Caption overlay */}
              {(current.caption || current.client) && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-6 md:p-8">
                  {current.client ? (
                    <p
                      className="font-mono text-[11px] uppercase tracking-[0.22em]"
                      style={{ color: "var(--brand-yellow)" }}
                    >
                      {current.client}
                    </p>
                  ) : null}
                  {current.caption ? (
                    <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
                      {current.caption}
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail rail on the right */}
          <div className="md:col-span-4">
            <div
              className="grid auto-cols-[7rem] grid-flow-col gap-3 overflow-x-auto pb-3 md:auto-cols-auto md:grid-flow-row md:grid-cols-2 md:gap-3 md:overflow-visible md:pb-0"
              role="tablist"
              aria-label="Gallery thumbnails"
            >
              {shots.map((shot, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={shot.src}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={shot.caption ?? shot.alt}
                    onClick={() => setActive(i)}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black/40 transition-all duration-200 outline-none"
                    style={{
                      boxShadow: isActive
                        ? `0 0 0 3px var(--brand-yellow)`
                        : "0 0 0 1px rgba(255,255,255,0.08)",
                      opacity: isActive ? 1 : 0.7,
                    }}
                  >
                    <Image
                      src={shot.src}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-cover"
                      quality={60}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
