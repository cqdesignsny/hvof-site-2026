import { SITE } from "@/lib/site";

interface TrustedByProps {
  /** Override the default list of names */
  names?: readonly string[];
  /** Compact: less vertical padding, single row, no eyebrow */
  compact?: boolean;
}

/**
 * Marquee-style trusted-by row. Names scroll horizontally and pause on hover.
 * Static fallback when the user prefers reduced motion (handled via CSS).
 */
export function TrustedBy({ names = SITE.trustedBy, compact = false }: TrustedByProps) {
  // Doubled list creates a seamless infinite marquee
  const doubled = [...names, ...names];

  return (
    <section
      className={
        compact
          ? "border-y border-border/60 bg-background py-6"
          : "border-y border-border/60 bg-background py-10 md:py-14"
      }
    >
      <div className="container-wide">
        {!compact ? (
          <p className="eyebrow mb-6 text-center text-muted-foreground">
            Trusted across the Hudson Valley
          </p>
        ) : null}
        <div className="mask-fade-x overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-12 md:gap-16 lg:gap-20">
            {doubled.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-lg font-light tracking-tight text-foreground/55 md:text-xl lg:text-2xl"
                aria-hidden={i >= names.length}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
