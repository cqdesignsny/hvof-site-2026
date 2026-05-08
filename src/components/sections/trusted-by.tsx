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
 * - Background: bright cream, much lighter than before so logos read clearly.
 * - Logos: bigger, closer together. Grayscale only (no brightness boost needed on light bg).
 */
export function TrustedBy({
  partners = SITE.trustedBy,
  eyebrow = "Trusted across the Hudson Valley",
}: TrustedByProps) {
  // Doubled list creates a seamless infinite marquee
  const doubled = [...partners, ...partners];

  return (
    <section
      className="border-y border-border"
      style={{ backgroundColor: "var(--brand-cream)" }}
    >
      <div className="container-wide py-10 md:py-12">
        <p className="eyebrow mb-7 text-center text-muted-foreground md:mb-9">
          {eyebrow}
        </p>
        <div className="mask-fade-x overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-4 md:gap-6 lg:gap-8">
            {doubled.map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="relative h-32 w-72 shrink-0 md:h-36 md:w-80 lg:h-40 lg:w-96"
                aria-hidden={i >= partners.length}
              >
                <Image
                  src={p.logoUrl}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 384px, (min-width: 768px) 320px, 288px"
                  /* Grayscale only. Light cream background makes logos legible without filter tricks. */
                  className="object-contain grayscale opacity-80 transition-opacity hover:opacity-100"
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
