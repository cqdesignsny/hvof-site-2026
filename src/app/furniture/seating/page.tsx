import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { FAQSection } from "@/components/sections/faq-section";
import { ProductCard } from "@/components/quote/product-card";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { getProductsByCategory } from "@/lib/products";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Office Seating",
  description:
    "Task chairs, executive seating, ergonomic chairs, and conference seating from Steelcase, Herman Miller, Knoll, Humanscale, and HON. Sit in the chair before you spec. or build a quote online.",
};

const FEATURES = [
  "Free in-showroom trials. Sit in any chair as long as you want.",
  "Custom upholstery and finish matching to your brand or existing palette.",
  "BIFMA-certified construction. Manufacturer warranty handled by us.",
  "Installation crew adjusts every chair to its end user on delivery day.",
  "Pre-owned options inspected, cleaned, and warranted in-house.",
  "Bulk pricing on orders of 12+ matched chairs. Volume discounts on 50+.",
];

const FAQS = [
  {
    question: "Can I try a chair before buying?",
    answer:
      "Always. Every chair we sell is in the showroom and available for hands-on testing. We also offer 7-day office trials on select task chairs over $600.",
  },
  {
    question: "What is the warranty on task seating?",
    answer:
      "New chairs from major brands carry 10–12 year manufacturer warranties on frames and 5–7 years on upholstery and mechanisms. Pre-owned chairs come with our in-house 1-year warranty.",
  },
  {
    question: "Do you handle warranty service?",
    answer:
      "Yes. We register every chair with the manufacturer at delivery, and our team handles warranty claims so you do not spend an hour on hold with a 1-800 number.",
  },
  {
    question: "Can I order custom upholstery?",
    answer:
      "Yes. All major brands offer custom fabric and leather options. We carry sample books in the showroom and can match to brand colors, existing palettes, or commercial-grade requirements.",
  },
  {
    question: "Lead times for custom seating?",
    answer:
      "In-stock task chairs ship in 1–2 weeks. Custom-upholstered orders typically run 6–10 weeks depending on the brand. We give a hard date with the quote.",
  },
];

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
              Task, executive, ergonomic, conference, lounge. Steelcase, Herman Miller, Knoll, HON, Humanscale, and a dozen specialty brands. Sit in the chair before you spec. or build a quote online.
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
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {subProducts.map((p) => (
                    <ProductCard key={p.sku} product={p} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted section-y-sm">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">What is included</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
              Every chair, every order.
            </h2>
          </FadeIn>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex gap-3 border-t border-border pt-5">
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand-yellow" />
                <span className="text-base leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection eyebrow="Common Questions" heading="Buyers ask first." items={FAQS} />

      {/* CTA */}
      <section className="bg-brand-yellow section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <h2 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Ready to spec?
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
              Build your quote cart, then submit. We confirm pricing, delivery dates, and contract eligibility within 24 hours.
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
