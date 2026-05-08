import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft, Check, Truck, Shield, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { ProductCard } from "@/components/quote/product-card";
import { AddToQuoteButton } from "@/components/quote/add-to-quote-button";
import { PRODUCTS, getProductBySku, getProductsByCategory, formatPrice } from "@/lib/products";
import { SITE } from "@/lib/site";

interface ProductPageParams {
  params: Promise<{ category: string; sku: string }>;
}

// Static generation for every product
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    category: p.category,
    sku: p.sku,
  }));
}

export async function generateMetadata({ params }: ProductPageParams): Promise<Metadata> {
  const { sku } = await params;
  const product = getProductBySku(sku);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: `${product.description} ${formatPrice(product.price)}. Add to your HVOF quote cart.`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageParams) {
  const { category, sku } = await params;
  const product = getProductBySku(sku);
  if (!product || product.category !== category) notFound();

  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  // Related products: same category, exclude current. Up to 4.
  const related = getProductsByCategory(product.category)
    .filter((p) => p.sku !== product.sku)
    .slice(0, 4);

  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Furniture", href: "/furniture" },
          { name: categoryLabel, href: `/furniture/${category}` },
          { name: product.name, href: `/furniture/${category}/${product.sku}` },
        ]}
      />

      <section className="bg-background pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-wide">
          <Link
            href={`/furniture/${category}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {categoryLabel}
          </Link>

          <div className="mt-8 grid gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
            {/* Image column */}
            <FadeIn className="md:col-span-7">
              <div className="card-image-outline relative aspect-[4/3] w-full overflow-hidden bg-muted">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover"
                    quality={85}
                    priority
                  />
                ) : (
                  <div className="grid h-full place-items-center text-muted-foreground/40">
                    <span className="font-mono text-xs uppercase tracking-[0.2em]">No image yet</span>
                  </div>
                )}
                {isOnSale ? (
                  <span
                    className="absolute left-4 top-4 rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-foreground"
                    style={{ backgroundColor: "var(--brand-yellow)" }}
                  >
                    Sale
                  </span>
                ) : null}
              </div>
            </FadeIn>

            {/* Info column */}
            <FadeIn delay={0.1} className="md:col-span-5">
              {product.subCategory ? (
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {categoryLabel}, {product.subCategory}
                </p>
              ) : (
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {categoryLabel}
                </p>
              )}
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-5xl lg:text-6xl">
                {product.name}
              </h1>
              <p className="mt-3 font-mono text-xs text-muted-foreground">SKU, {product.sku}</p>

              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                  {formatPrice(product.price)}
                </span>
                {isOnSale ? (
                  <span className="font-mono text-base text-muted-foreground line-through">
                    {formatPrice(product.originalPrice!)}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Showroom list price. Final quote includes contract pricing, freight, and any active promotions.
              </p>

              <div className="mt-10">
                <AddToQuoteButton product={product} className="w-full md:w-auto" />
                <p className="mt-3 text-sm text-muted-foreground">
                  Adds to your purchase-order cart. Submit when ready, we email a finalized quote within 24 hours. Payment processed offline.
                </p>
              </div>

              <div className="mt-10 space-y-5 border-t pt-8">
                <p className="text-lg leading-relaxed text-foreground/85 md:text-xl">
                  {product.description}
                </p>
              </div>

              <div className="mt-10 grid gap-4 border-t pt-8 sm:grid-cols-3">
                <div>
                  <Truck className="h-5 w-5" style={{ color: "var(--brand-yellow)" }} />
                  <p className="mt-2 text-sm font-medium">Local install</p>
                  <p className="text-xs text-muted-foreground">Hudson Valley delivery and adjustment by our crew.</p>
                </div>
                <div>
                  <Shield className="h-5 w-5" style={{ color: "var(--brand-yellow)" }} />
                  <p className="mt-2 text-sm font-medium">Warranty</p>
                  <p className="text-xs text-muted-foreground">Manufacturer warranty registered at delivery.</p>
                </div>
                <div>
                  <Hammer className="h-5 w-5" style={{ color: "var(--brand-yellow)" }} />
                  <p className="mt-2 text-sm font-medium">Custom upholstery</p>
                  <p className="text-xs text-muted-foreground">Brand-match finishes available on most lines.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Long description / details. Placeholder for richer copy */}
      <section className="bg-muted py-16 md:py-20">
        <div className="container-wide grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="eyebrow text-muted-foreground">Why this one</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Built for daily use.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-base leading-relaxed text-foreground/85 md:text-lg">
            <p>{product.description}</p>
            <ul className="space-y-3">
              {[
                "BIFMA-certified construction with manufacturer warranty",
                "Available in stocked finish or custom upholstery",
                "Sit-test in the showroom before you commit",
                "Volume pricing on orders of 12 or more",
              ].map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: "var(--brand-yellow)" }} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 ? (
        <section className="bg-background section-y">
          <div className="container-wide">
            <FadeIn className="max-w-3xl">
              <p className="eyebrow text-muted-foreground">Also worth a look</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                More from {categoryLabel.toLowerCase()}.
              </h2>
            </FadeIn>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.sku} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-y" style={{ backgroundColor: "var(--brand-yellow)" }}>
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <h2 className="font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
              Need to see it first?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80 md:text-xl">
              Visit the Wappingers Falls showroom. Sit in the chair, try the desk, walk the install. Same crew, same week.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-foreground px-7 text-base font-semibold text-background hover:bg-foreground/90">
                <Link href="/showroom" className="group">
                  Plan a visit
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
