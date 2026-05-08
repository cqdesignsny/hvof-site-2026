"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/lib/products";

export interface QuoteItem {
  sku: string;
  name: string;
  price: number;
  image?: string;
  category: Product["category"];
  qty: number;
}

interface QuoteState {
  items: QuoteItem[];
  add: (product: Product, qty?: number) => void;
  setQty: (sku: string, qty: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
  /** Total number of items (sum of quantities) */
  count: () => number;
  /** Estimated total at list price — labeled as estimate, not a binding quote */
  estimatedTotal: () => number;
}

export const useQuoteCart = create<QuoteState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product, qty = 1) => {
        const existing = get().items.find((i) => i.sku === product.sku);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.sku === product.sku ? { ...i, qty: i.qty + qty } : i,
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                sku: product.sku,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                qty,
              },
            ],
          });
        }
      },

      setQty: (sku, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i.sku !== sku) });
          return;
        }
        set({
          items: get().items.map((i) => (i.sku === sku ? { ...i, qty } : i)),
        });
      },

      remove: (sku) => {
        set({ items: get().items.filter((i) => i.sku !== sku) });
      },

      clear: () => set({ items: [] }),

      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),

      estimatedTotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    {
      name: "hvof-quote-cart",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
