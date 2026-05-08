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
 * Marquee row of partner logos. Always grayscale, dark graphite background,
 * generous vertical padding. Logos are large and breathe.
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
      <div className="container-wide py-20 md:py-28 lg:py-32">
        <p
          className="eyebrow mb-12 text-center md:mb-16"
          style={{ color: "var(--brand-yellow)" }}
        >
          {eyebrow}
        </p>
        <div className="mask-fade-x overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-16 md:gap-24 lg:gap-32">
            {doubled.map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="relative h-20 w-44 shrink-0 md:h-24 md:w-56 lg:h-28 lg:w-64"
                aria-hidden={i >= partners.length}
              >
                <Image
                  src={p.logoUrl}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 256px, (min-width: 768px) 224px, 176px"
                  className="object-contain grayscale brightness-0 invert opacity-70"
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
