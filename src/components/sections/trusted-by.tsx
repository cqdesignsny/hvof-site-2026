import Image from "next/image";
import { SITE } from "@/lib/site";

interface Partner {
  name: string;
  logoUrl: string;
}

interface TrustedByProps {
  partners?: readonly Partner[];
  compact?: boolean;
  /** Custom eyebrow override */
  eyebrow?: string;
}

/**
 * Marquee row of partner logos. Uses the actual brand marks from the WP CDN.
 * Logos render in white-friendly opacity that lifts on hover.
 * Pauses on hover, doubles for seamless loop, fades at edges.
 */
export function TrustedBy({
  partners = SITE.trustedBy,
  compact = false,
  eyebrow = "Trusted across the Hudson Valley",
}: TrustedByProps) {
  // Doubled list creates a seamless infinite marquee
  const doubled = [...partners, ...partners];

  return (
    <section
      className={
        compact
          ? "border-y border-border/60 bg-foreground py-8"
          : "border-y border-border/40 bg-foreground py-12 md:py-16"
      }
    >
      <div className="container-wide">
        {!compact ? (
          <p className="eyebrow mb-8 text-center text-brand-yellow">{eyebrow}</p>
        ) : null}
        <div className="mask-fade-x overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-12 md:gap-20 lg:gap-28">
            {doubled.map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="relative h-14 w-32 shrink-0 grayscale-[20%] opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 md:h-16 md:w-40 lg:h-20 lg:w-48"
                aria-hidden={i >= partners.length}
              >
                <Image
                  src={p.logoUrl}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 192px, (min-width: 768px) 160px, 128px"
                  className="object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
