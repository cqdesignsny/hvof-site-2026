"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useQuoteCart } from "@/lib/quote-cart";
import { cn } from "@/lib/utils";

/**
 * Floating cart indicator. Pinned to the bottom-right on mobile, top-right desktop.
 * Hidden when cart is empty so it doesn't clutter the page.
 * Hidden on /quote itself since the page IS the cart.
 */
export function QuoteCartIndicator() {
  const count = useQuoteCart((s) => s.count());
  const [hydrated, setHydrated] = useState(false);
  const [pathname, setPathname] = useState<string>("");

  useEffect(() => {
    setHydrated(true);
    setPathname(window.location.pathname);
  }, []);

  if (!hydrated || count === 0) return null;
  if (pathname === "/quote") return null;

  return (
    <Link
      href="/quote"
      aria-label={`Open quote cart (${count} item${count === 1 ? "" : "s"})`}
      className={cn(
        "fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium shadow-lg shadow-black/20 transition-all",
        "bg-brand-yellow text-foreground hover:bg-brand-yellow-hover hover:shadow-xl",
        "md:bottom-auto md:top-24 md:right-6",
      )}
    >
      <ShoppingBag className="h-4 w-4" />
      <span>Quote cart</span>
      <span className="grid h-6 min-w-[1.5rem] place-items-center rounded-full bg-foreground px-1.5 text-xs font-bold text-background">
        {count}
      </span>
    </Link>
  );
}
