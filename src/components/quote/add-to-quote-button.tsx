"use client";

import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteCart } from "@/lib/quote-cart";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

interface AddToQuoteButtonProps {
  product: Product;
  variant?: "default" | "compact";
  className?: string;
}

export function AddToQuoteButton({ product, variant = "default", className }: AddToQuoteButtonProps) {
  const add = useQuoteCart((s) => s.add);
  const [added, setAdded] = useState(false);

  function handleClick() {
    add(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full border border-foreground/15 bg-background px-3 text-xs font-medium transition-all",
          "hover:border-foreground/40 hover:bg-foreground/5",
          added && "border-brand-yellow bg-brand-yellow text-foreground",
          className,
        )}
        aria-label={added ? "Added to quote" : `Add ${product.name} to quote`}
      >
        {added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        {added ? "Added" : "Add to quote"}
      </button>
    );
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      size="sm"
      className={cn(
        "h-10 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-all hover:bg-foreground/85",
        added && "bg-brand-yellow text-foreground hover:bg-brand-yellow",
        className,
      )}
    >
      {added ? <Check className="mr-1 h-4 w-4" /> : <Plus className="mr-1 h-4 w-4" />}
      {added ? "Added to quote" : "Add to quote"}
    </Button>
  );
}
