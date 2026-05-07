import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
}

const SIZE_PX = {
  sm: { h: 28, w: 52 },
  md: { h: 36, w: 67 },
  lg: { h: 56, w: 105 },
};

export function Logo({ className, variant = "default", size = "md", asLink = true }: LogoProps) {
  const src = variant === "light" ? "/logo-light.svg" : "/logo.svg";
  const dims = SIZE_PX[size];

  const inner = (
    <Image
      src={src}
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
    <Link href="/" aria-label="Hudson Valley Office Furniture — home" className="inline-flex items-center">
      {inner}
    </Link>
  );
}
