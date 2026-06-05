"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { useQuoteCart } from "@/lib/quote-cart";

/**
 * Floating quote-cart indicator. Pops up bottom-right whenever the cart has
 * items, so people can always jump back to /quote after adding things.
 * Hidden on /quote itself (the page IS the cart). Uses usePathname() so it
 * tracks the live route, not just the route it first mounted on.
 */
export function QuoteCartIndicator() {
  const count = useQuoteCart((s) => s.count());
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const show = hydrated && count > 0 && pathname !== "/quote";

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="quote-cart-indicator"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="fixed bottom-5 right-5 z-40"
        >
          <Link
            href="/quote"
            aria-label={`View quote cart (${count} item${count === 1 ? "" : "s"})`}
            className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-3 text-sm font-semibold text-foreground shadow-lg shadow-black/25 transition-all hover:bg-brand-yellow-hover hover:shadow-xl"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>View quote</span>
            <motion.span
              key={count}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 520, damping: 18 }}
              className="grid h-6 min-w-[1.5rem] place-items-center rounded-full bg-foreground px-1.5 text-xs font-bold text-background"
            >
              {count}
            </motion.span>
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
