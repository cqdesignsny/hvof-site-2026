import Image from "next/image";
import { SITE } from "@/lib/site";

interface Partner {
  name: string;
  logoUrl: string;
}

interface TrustedByProps {
  partners?: readonly Partner[];
  eyebrow?: string;
}

/**
 * Marquee row of partner logos.
 * - Logos: large, ~30% bigger than before, closer together.
 * - Background: dark graphite for separation, narrower band so the section reads tighter.
 * - Filter: grayscale + slight contrast so logos stay legible (no harsh brightness:0 invert).
 */
export function TrustedBy({
  partners = SITE.trustedBy,
  eyebrow = "Trusted across the Hudson Valley",
}: TrustedByProps) {
  // Doubled list creates a seamless infinite marquee
  const doubled = [...partners, ...partners];

  return (
    <section
      className="border-y border-white/5"
      style={{ backgroundColor: "var(--brand-graphite)" }}
    >
      <div className="container-wide py-12 md:py-16">
        <p
          className="eyebrow mb-8 text-center md:mb-10"
          style={{ color: "var(--brand-yellow)" }}
        >
          {eyebrow}
        </p>
        <div className="mask-fade-x overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-8 md:gap-10 lg:gap-12">
            {doubled.map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="relative h-24 w-56 shrink-0 md:h-28 md:w-72 lg:h-32 lg:w-80"
                aria-hidden={i >= partners.length}
              >
                <Image
                  src={p.logoUrl}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 288px, 224px"
                  /* Soft monochrome: grayscale + brightness boost keeps detail.
                     Avoids harsh invert that nuked thin-line logos on the dark bg. */
                  className="object-contain grayscale brightness-[1.5] contrast-110 opacity-90"
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
