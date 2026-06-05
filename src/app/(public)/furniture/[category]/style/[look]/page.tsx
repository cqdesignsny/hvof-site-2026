import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { ProductCard } from "@/components/quote/product-card";
import { LOOKS, getLook, getLookProducts } from "@/lib/looks";
import { SITE } from "@/lib/site";

interface LookPageParams {
  params: Promise<{ category: string; look: string }>;
}

export function generateStaticParams() {
  return LOOKS.map((l) => ({ category: l.category, look: l.slug }));
}

export async function generateMetadata({ params }: LookPageParams): Promise<Metadata> {
  const { category, look } = await params;
  const found = getLook(category, look);
  if (!found) return { title: "Style not found" };
  const label = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${found.name} ${label}`,
    description: `${found.blurb} Curated ${category} picks with starting prices from Hudson Valley Office Furniture. Build a quote or connect with an expert.`,
  };
}

export default async function LookPage({ params }: LookPageParams) {
  const { category, look } = await params;
  const found = getLook(category, look);
  if (!found) notFound();

  const products = getLookProducts(found);
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Furniture", href: "/furniture" },
          { name: categoryLabel, href: `/furniture/${category}` },
          { name: found.name, href: `/furniture/${category}/style/${found.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-background pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="container-wide">
          <Link
            href={`/furniture/${category}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All {categoryLabel.toLowerCase()}
          </Link>
          <FadeIn className="mt-8 max-w-3xl">
            <p className="eyebrow text-muted-foreground">Shop the look</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              {found.name}.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {found.blurb}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Curated grid */}
      <section className="bg-background pb-16 md:pb-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Don't see it CTA */}
      <section className="section-y" style={{ backgroundColor: "var(--brand-yellow)" }}>
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <h2 className="font-display text-4xl font-semibold leading-[1.0] tracking-tight md:text-6xl">
              Don&apos;t see it here?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80 md:text-xl">
              This is a curated slice. We carry over 75 more lines across every budget. Tell us the look you are after and we will send options that fit.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 rounded-full bg-foreground px-8 text-base font-semibold text-background hover:bg-foreground/90">
                <Link href={`/quote-request?category=${category}`} className="group">
                  Connect with an expert
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
          </FadeIn>
        </div>
      </section>
    </>
  );
}
