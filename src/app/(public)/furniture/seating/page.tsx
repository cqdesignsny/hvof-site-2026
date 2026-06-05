import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { FAQSection } from "@/components/sections/faq-section";
import { ProductDeck } from "@/components/quote/product-deck";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { getProductsByCategory } from "@/lib/products";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";
import { ShopTheLook } from "@/components/sections/shop-the-look";
import { SampleNotice } from "@/components/sections/sample-notice";
import { WHATS_INCLUDED, FAQ_PREVIEW } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Office Seating",
  description:
    "Task chairs, executive seating, ergonomic chairs, and conference seating from over a dozen manufacturers. Sit in the chair before you spec, or build a quote online.",
};

export default function SeatingPage() {
  const products = getProductsByCategory("seating");

  // Group by sub-category for cleaner display
  const grouped = products.reduce<Record<string, typeof products>>((acc, p) => {
    const key = p.subCategory ?? "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});
  const subCategoryOrder = ["Task", "Ergonomic", "Executive", "Conference", "Other"];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Furniture", href: "/furniture" },
          { name: "Seating", href: "/furniture/seating" },
        ]}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 -z-10">
          <Image
            src={IMG.marshallSterling.angle14}
            alt="HVOF office seating installation"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" aria-hidden="true" />
        </div>
        <div className="container-wide relative z-10 pb-20 pt-36 md:pb-28 md:pt-48">
          <FadeIn className="max-w-4xl">
            <p className="eyebrow text-brand-yellow">Furniture · Seating</p>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-white">
              Seating that<br />earns its eight hours.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
              Over a dozen manufacturers of task, executive, ergonomic, conference seating. Sit in the chair before you spec, or build a quote online.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-brand-yellow px-7 text-base text-foreground hover:bg-brand-yellow-hover">
                <a href="#catalog" className="group">
                  Browse the catalog
                  <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/30 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/quote-request">Or connect with an expert</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <SampleNotice category="seating" />

      {/* Shop the look */}
      <ShopTheLook category="seating" />

      {/* Catalog */}
      <section id="catalog" className="bg-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">Catalog</p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              Add to your quote.<br />
              <span className="text-muted-foreground">Pay offline once we confirm.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Pricing shown is current showroom list. Final quote includes contract pricing, freight, and any applicable promos.
            </p>
          </FadeIn>

          {subCategoryOrder.map((sub) => {
            const subProducts = grouped[sub];
            if (!subProducts || subProducts.length === 0) return null;
            return (
              <div key={sub} className="mt-16">
                <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-border pb-4">
                  <h3 className="font-display text-2xl font-normal tracking-tight md:text-3xl">
                    {sub} seating
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {subProducts.length} {subProducts.length === 1 ? "model" : "models"}
                  </p>
                </div>
                <ProductDeck products={subProducts} gridClassName="sm:grid-cols-2 lg:grid-cols-4" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted section-y-sm">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">What&apos;s included</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
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
      <FAQSection eyebrow="Common Questions" heading="Buyers ask first." items={FAQ_PREVIEW} moreHref="/faq" />

      <SampleNotice category="seating" />

      {/* CTA */}
      <section className="bg-brand-yellow section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <h2 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Ready to spec?
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
              Build your quote cart, then submit. We confirm pricing, delivery dates, and contract eligibility promptly.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-foreground px-7 text-base text-background hover:bg-foreground/90">
                <Link href="/quote" className="group">
                  Open quote cart
                  <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-foreground/30 bg-transparent px-7 text-base text-foreground hover:bg-foreground/10">
                <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
