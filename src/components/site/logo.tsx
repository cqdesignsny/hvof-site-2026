import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
}

/**
 * Wordmark used until the SVG logo asset arrives.
 * Tight, condensed, premium — pairs well with editorial photography.
 */
export function Logo({ className, variant = "default", size = "md", asLink = true }: LogoProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const inner = (
    <span className={cn("flex items-baseline gap-1.5 font-display font-medium tracking-tight", sizes[size], className)}>
      <span className={variant === "light" ? "text-white" : "text-foreground"}>HVOF</span>
      <span
        className={cn(
          "text-xs font-mono tracking-widest uppercase opacity-60",
          variant === "light" ? "text-white" : "text-muted-foreground",
        )}
      >
        est. 1985
      </span>
    </span>
  );

  if (!asLink) return inner;

  return (
    <Link href="/" aria-label="Hudson Valley Office Furniture — home" className="inline-flex">
      {inner}
    </Link>
  );
}
