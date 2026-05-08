"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Transition } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

interface HeroProps {
  eyebrow: string;
  headline: string;
  sub: string;
  imageSrc: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function Hero({ eyebrow, headline, sub, imageSrc, imageAlt, primaryCta, secondaryCta }: HeroProps) {
  const reduce = useReducedMotion();
  const variants = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE_OUT },
        };

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-foreground text-background">
      {/* Background image with subtle parallax-feel scale */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
        {/* Depth gradient. pulls focus to lower-left text block */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/55 to-black/15"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" aria-hidden="true" />
      </div>

      <div className="container-wide relative z-10 pb-20 pt-36 md:pb-28 md:pt-48 lg:pb-36">
        <div className="max-w-4xl">
          <motion.p {...variants(0.1)} className="eyebrow text-brand-yellow">
            {eyebrow}
          </motion.p>
          <motion.h1
            {...variants(0.18)}
            className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-white"
          >
            {headline}
          </motion.h1>
          <motion.p {...variants(0.3)} className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
            {sub}
          </motion.p>
          <motion.div {...variants(0.42)} className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-brand-yellow text-black hover:bg-brand-yellow-hover">
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            {secondaryCta ? (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
          </motion.div>
        </div>

        {/* Lower-right info corner */}
        <motion.div
          {...variants(0.55)}
          className="mt-16 grid grid-cols-2 gap-8 border-t border-white/15 pt-8 md:absolute md:right-12 md:bottom-12 md:mt-0 md:grid-cols-3 md:gap-12 md:border-0 md:pt-0"
        >
          <Stat label="Years" value="40+" />
          <Stat label="Showroom" value="37,000 sqft" />
          <Stat label="Cities served" value="12+" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/50"
        >
          <span>Scroll</span>
          <span className="h-8 w-px bg-white/30" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
