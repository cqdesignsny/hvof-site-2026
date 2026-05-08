"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface ScrollTextProps {
  /** The text to animate. Use newlines or commas to split into lines. */
  lines: string[];
  className?: string;
  /** Tailwind classes for the inner span (font, size, color) */
  textClassName?: string;
  /** How far to translate horizontally. Negative moves left as you scroll down. Default -30vw. */
  travel?: number;
  /** Direction. "rtl" moves right→left as scroll increases (default). "ltr" moves left→right. */
  direction?: "rtl" | "ltr";
}

/**
 * Scroll-driven horizontal text. As the user scrolls past the section,
 * each line shifts horizontally creating a "filling in" reading effect.
 * Lines alternate direction by default (line 1 from right, line 2 from left).
 */
export function ScrollText({
  lines,
  className = "",
  textClassName = "",
  travel = 30,
}: ScrollTextProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Two parallel transforms: line 1 enters from the right, line 2 enters from the left.
  // Both arrive centered when the section is centered in the viewport.
  const xLineA = useTransform(scrollYProgress, [0, 0.5, 1], [`${travel}vw`, "0vw", `-${travel}vw`]);
  const xLineB = useTransform(scrollYProgress, [0, 0.5, 1], [`-${travel}vw`, "0vw", `${travel}vw`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {lines.map((line, i) => (
        <motion.div
          key={`${line}-${i}`}
          style={reduce ? undefined : { x: i % 2 === 0 ? xLineA : xLineB }}
          className={`block whitespace-nowrap will-change-transform ${textClassName}`}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}
