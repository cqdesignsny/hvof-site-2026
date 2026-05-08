"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Transition } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

interface Slide {
  src: string;
  alt: string;
}

interface HeroSliderProps {
  eyebrow: string;
  headline: string;
  sub: string;
  slides: Slide[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Milliseconds between auto-advances. 0 disables autoplay. */
  intervalMs?: number;
}

export function HeroSlider({
  eyebrow,
  headline,
  sub,
  slides,
  primaryCta,
  secondaryCta,
  intervalMs = 5500,
}: HeroSliderProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || intervalMs === 0 || slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [reduce, intervalMs, slides.length]);

  const variants = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.95, delay, ease: EASE_OUT },
        };

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-black text-white">
      {/* Slide stack */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            className="absolute inset-0"
          >
            <Image
              src={slides[index].src}
              alt={slides[index].alt}
              fill
              priority={index === 0}
              sizes="100vw"
              quality={85}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div
          className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/50 to-black/15"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10 pb-24 pt-40 md:pb-32 md:pt-52 lg:pb-40">
        <div className="max-w-5xl">
          <motion.p {...variants(0.1)} className="eyebrow text-brand-yellow">
            {eyebrow}
          </motion.p>
          <motion.h1
            {...variants(0.18)}
            className="mt-6 font-display text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-white"
          >
            {headline}
          </motion.h1>
          <motion.p
            {...variants(0.3)}
            className="mt-8 max-w-3xl text-xl leading-relaxed text-white/80 md:text-2xl lg:text-[1.65rem] lg:leading-[1.45]"
          >
            {sub}
          </motion.p>
          <motion.div {...variants(0.42)} className="mt-12 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-14 rounded-full bg-brand-yellow px-8 text-base font-semibold text-black hover:bg-brand-yellow-hover">
              <Link href={primaryCta.href} className="group">
                {primaryCta.label}
                <ArrowUpRight className="ml-1 h-5 w-5 arrow-slide" />
              </Link>
            </Button>
            {secondaryCta ? (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-white/40 bg-transparent px-8 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
          </motion.div>
        </div>

        {/* Slide indicators + counter */}
        <motion.div
          {...variants(0.6)}
          className="mt-20 flex items-center justify-between gap-8 border-t border-white/15 pt-8 md:absolute md:right-12 md:bottom-12 md:mt-0 md:flex-col md:items-end md:border-0 md:pt-0"
        >
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1 w-10 rounded-full transition-all ${
                  i === index ? "bg-brand-yellow" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/55">
            {String(index + 1).padStart(2, "0")} <span className="text-white/30">/</span>{" "}
            {String(slides.length).padStart(2, "0")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
