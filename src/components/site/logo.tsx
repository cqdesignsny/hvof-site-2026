import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
}

const SIZE_PX = {
  sm: { h: 40, w: 75 },
  md: { h: 53, w: 99 },
  lg: { h: 80, w: 150 },
};

/**
 * Always renders the full-color HVOF SVG (yellow + gray + white text).
 * The brand reads well on both light and dark surfaces, so no variant switching.
 */
export function Logo({ className, size = "md", asLink = true }: LogoProps) {
  const dims = SIZE_PX[size];

  const inner = (
    <Image
      src="/logo.svg"
      alt="Hudson Valley Office Furniture"
      width={dims.w}
      height={dims.h}
      priority
      className={cn("h-auto w-auto", className)}
      style={{ height: `${dims.h}px`, width: "auto" }}
    />
  );

  if (!asLink) return inner;

  return (
    <Link href="/" aria-label="Hudson Valley Office Furniture, home" className="inline-flex items-center">
      {inner}
    </Link>
  );
}
