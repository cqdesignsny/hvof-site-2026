import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { ScrollText } from "@/components/motion/scroll-text";
import { FAQSection } from "@/components/sections/faq-section";
import { ProductCard } from "@/components/quote/product-card";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { getProductsByCategory, type ProductCategory } from "@/lib/products";
import { SITE } from "@/lib/site";
import { ShopTheLook } from "@/components/sections/shop-the-look";
import { WHATS_INCLUDED, FAQ_PREVIEW } from "@/lib/faqs";

interface SubCategory {
  name: string;
  description: string;
  startingPrice?: string;
}

interface CategoryTemplateProps {
  /** Product category to render the showcase grid from */
  category: ProductCategory;
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  subCategories: SubCategory[];
  /** Deprecated: What's-included is now site-wide generic content (lib/faqs). */
  features?: string[];
  /** Deprecated: FAQs are now site-wide generic content (lib/faqs). */
  faqs?: { question: string; answer: string }[];
  breadcrumb: string;
  href: string;
  /** Optional override on the showcase heading copy */
  showcaseHeading?: string;
  showcaseEyebrow?: string;
}

export function CategoryTemplate({
  category,
  eyebrow,
  title,
  intro,
  heroImage,
  heroAlt,
  subCategories,
  breadcrumb,
  href,
  showcaseHeading = "Lines we spec.",
  showcaseEyebrow = "Featured selections",
}: CategoryTemplateProps) {
  const products = getProductsByCategory(category);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Furniture", href: "/furniture" },
          { name: breadcrumb, href },
        ]}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 -z-10">
          <Image src={heroImage} alt={heroAlt} fill priority sizes="100vw" quality={85} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" aria-hidden="true" />
        </div>
        <div className="container-editorial relative z-10 pb-20 pt-36 md:pb-28 md:pt-48">
          <FadeIn className="max-w-4xl">
            <p className="eyebrow text-brand-yellow">{eyebrow}</p>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-white">
              {title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{intro}</p>
          </FadeIn>
        </div>
      </section>

      {/* Shop the look */}
      <ShopTheLook category={category} />

      {/* Sub-categories */}
      <section className="bg-background section-y">
        <div className="container-editorial">
          <FadeIn className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">Selection</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Categories<br />we stock and spec.
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-x-12 gap-y-2 md:grid-cols-2">
            {subCategories.map((sub, i) => (
              <FadeIn key={sub.name} delay={i * 0.04} className="group border-t border-border py-7 md:py-9">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{sub.name}</h3>
                  {sub.startingPrice ? (
                    <p className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {sub.startingPrice}
                    </p>
                  ) : null}
                </div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  {sub.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Product showcase grid */}
      {products.length > 0 ? (
        <section className="bg-background section-y border-t border-border">
          <div className="container-wide">
            <FadeIn className="max-w-3xl">
              <p className="eyebrow text-muted-foreground">{showcaseEyebrow}</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                {showcaseHeading}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                A snapshot of the brands and lines we stock and spec for this category. Inquire on any line and we&apos;ll come back with finishes, lead time, and pricing.
              </p>
            </FadeIn>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.sku} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Features */}
      <section className="bg-muted section-y-sm">
        <div className="container-editorial">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">What&apos;s included</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl">
              Every order, regardless of size.
            </h2>
          </FadeIn>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {WHATS_INCLUDED.map((f) => (
              <li key={f} className="flex gap-3 border-t border-border pt-5">
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand-yellow" />
                <span className="text-base leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        eyebrow="Common Questions"
        heading="Buyers ask first."
        items={FAQ_PREVIEW}
        moreHref="/faq"
      />

      {/* CTA with snap-pinned scroll text */}
      <section className="section-y" style={{ backgroundColor: "var(--brand-yellow)" }}>
        <div className="container-bleed">
          <ScrollText
            lines={["Ready to spec?", "Send the floor plan."]}
            textClassName="font-display font-semibold leading-[0.9] tracking-[-0.04em] text-foreground text-[clamp(3rem,12vw,11rem)]"
            travel={28}
          />
          <div className="container-wide mt-10">
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 rounded-full bg-foreground px-8 text-base font-semibold text-background hover:bg-foreground/90">
                <Link href="/quote-request" className="group">
                  Request a quote
                  <ArrowUpRight className="ml-1 h-5 w-5 arrow-slide" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-foreground/30 bg-transparent px-8 text-base text-foreground hover:bg-foreground/10"
              >
                <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
