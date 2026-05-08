"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface ScrollTextProps {
  /** Lines of text. Each renders as its own animated row. */
  lines: string[];
  className?: string;
  /** Tailwind classes for each line: font, size, color */
  textClassName?: string;
  /** How far each line travels in viewport-width units (vw). Default 35. */
  travel?: number;
  /**
   * Where in scroll progress the text "snaps" to centered.
   * The text will be fully visible (no x offset) between [pinStart, pinEnd].
   * Default [0.4, 0.65] gives a comfortable read window.
   */
  pinStart?: number;
  pinEnd?: number;
}

/**
 * Scroll-driven horizontal text with a snap-to-center "read window."
 *
 * Phase 1 (entry): line A slides from right, line B slides from left as section enters.
 * Phase 2 (read): both lines hold centered while section is in middle of viewport.
 * Phase 3 (exit): lines slide off in opposite directions as section leaves.
 *
 * Lines 1, 3, 5 enter from the right; lines 2, 4, 6 enter from the left.
 * Vertical padding on the wrapper ensures descenders (y, p, g) are not clipped.
 */
export function ScrollText({
  lines,
  className = "",
  textClassName = "",
  travel = 35,
  pinStart = 0.4,
  pinEnd = 0.65,
}: ScrollTextProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Snap-pinned: travel from outside to centered, hold centered, then exit.
  const xRtl = useTransform(
    scrollYProgress,
    [0, pinStart, pinEnd, 1],
    [`${travel}vw`, "0vw", "0vw", `-${travel}vw`],
  );
  const xLtr = useTransform(
    scrollYProgress,
    [0, pinStart, pinEnd, 1],
    [`-${travel}vw`, "0vw", "0vw", `${travel}vw`],
  );

  return (
    <div
      ref={ref}
      // overflow-x:clip so horizontal travel doesn't blow out the document width.
      // Vertical padding gives room for descenders so g/y/p don't clip.
      className={`overflow-x-clip py-4 md:py-6 lg:py-8 ${className}`}
    >
      {lines.map((line, i) => (
        <motion.div
          key={`${line}-${i}`}
          style={reduce ? undefined : { x: i % 2 === 0 ? xRtl : xLtr }}
          className={`block whitespace-nowrap will-change-transform ${textClassName}`}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}
