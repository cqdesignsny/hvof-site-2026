import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { getLooksByCategory, lookPriceFrom } from "@/lib/looks";
import { formatPrice, type ProductCategory } from "@/lib/products";

interface ShopTheLookProps {
  category: ProductCategory;
  eyebrow?: string;
  heading?: string;
}

/**
 * Image-first "shop the look" navigation. Renders nothing for categories that
 * have no looks defined, so it can be dropped into any category page.
 */
export function ShopTheLook({
  category,
  eyebrow = "Shop the look",
  heading = "What's your style?",
}: ShopTheLookProps) {
  const looks = getLooksByCategory(category);
  if (looks.length === 0) return null;

  return (
    <section className="bg-background section-y border-t border-border">
      <div className="container-wide">
        <FadeIn className="max-w-3xl">
          <p className="eyebrow text-muted-foreground">{eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Pick the look you are after. Each one opens a curated set with starting prices, so you can see the range before you ever pick up the phone.
          </p>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {looks.map((look, i) => {
            const from = lookPriceFrom(look);
            return (
              <FadeIn key={look.slug} delay={(i % 3) * 0.05}>
                <Link
                  href={`/furniture/${category}/style/${look.slug}`}
                  className="card-interactive group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={look.image}
                      alt={look.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                      {look.name}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      {look.blurb}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-6">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {from ? `Starting at ${formatPrice(from)}` : "Pricing on request"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2">
                        Shop the look
                        <ArrowUpRight className="h-4 w-4 arrow-slide" style={{ color: "var(--brand-yellow)" }} />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
