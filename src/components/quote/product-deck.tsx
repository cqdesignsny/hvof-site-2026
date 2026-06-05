"use client";

import { useEffect, useRef } from "react";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/quote/product-card";
import { cn } from "@/lib/utils";

interface ProductDeckProps {
  products: Product[];
  /** Desktop grid column classes, applied at sm and up. */
  gridClassName?: string;
  /** Optional wrapper class (e.g. a top margin) applied on mobile and desktop. */
  className?: string;
}

/**
 * Responsive product layout.
 *  - Phones (< sm): a swipeable "stacked deck". The centered card is full-size
 *    and in front; its neighbors scale back and peek at the edges. Native
 *    scroll-snap drives the swipe + snap; a scroll listener drives the depth.
 *    Tap a card to open it, add to quote inline, keep swiping.
 *  - sm and up: the standard grid (desktop unchanged).
 */
export function ProductDeck({
  products,
  gridClassName = "sm:grid-cols-2 lg:grid-cols-4",
  className,
}: ProductDeckProps) {
  return (
    <div className={className}>
      <MobileDeck products={products} />
      <div className={cn("hidden gap-6 sm:grid", gridClassName)}>
        {products.map((p) => (
          <ProductCard key={p.sku} product={p} />
        ))}
      </div>
    </div>
  );
}

function MobileDeck({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = ref.current;
    if (!scroller) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = scroller.getBoundingClientRect();
      const viewCenter = rect.left + rect.width / 2;
      const span = rect.width * 0.72; // ~one card + gap; distance to the next card's center
      const slides = Array.from(scroller.children) as HTMLElement[];
      // Read all centers first (center is invariant under center-origin scale),
      // then write, so we never thrash layout mid-loop.
      const ts = slides.map((s) => {
        const r = s.getBoundingClientRect();
        return Math.min(Math.abs(viewCenter - (r.left + r.width / 2)) / span, 1);
      });
      slides.forEach((s, i) => {
        const t = ts[i];
        s.style.transform = `scale(${(1 - t * 0.16).toFixed(3)})`;
        s.style.opacity = (1 - t * 0.45).toFixed(3);
        s.style.zIndex = t < 0.5 ? "2" : "1";
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [products.length]);

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Swipe to browse products"
      className="-mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-[14vw] py-5 sm:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {products.map((p) => (
        <div key={p.sku} className="w-[72vw] shrink-0 snap-center">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
