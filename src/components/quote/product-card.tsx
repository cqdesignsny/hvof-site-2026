import Image from "next/image";
import Link from "next/link";
import { AddToQuoteButton } from "@/components/quote/add-to-quote-button";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  const detailHref = `/furniture/${product.category}/${product.sku}`;

  return (
    <div className="card-interactive group flex flex-col overflow-hidden">
      <Link href={detailHref} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="image-zoom object-cover"
            />
          ) : (
            <div className="grid h-full place-items-center text-muted-foreground/40">
              <span className="font-mono text-xs uppercase tracking-[0.2em]">No image</span>
            </div>
          )}
          {isOnSale ? (
            <span
              className="absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground"
              style={{ backgroundColor: "var(--brand-yellow)" }}
            >
              Sale
            </span>
          ) : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <Link href={detailHref} className="block">
          <div>
            {product.subCategory ? (
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {product.subCategory}
              </p>
            ) : null}
            <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">
              {product.name}
            </h3>
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground md:text-base">
            {product.description}
          </p>
        </Link>

        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {formatPrice(product.price)}
          </span>
          {isOnSale ? (
            <span className="font-mono text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice!)}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <AddToQuoteButton product={product} className="flex-1" />
          <Link
            href={detailHref}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
