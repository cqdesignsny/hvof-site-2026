import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  deltaPct: number;
  className?: string;
  withSuffix?: boolean;
  invertSign?: boolean;
};

export function DeltaPill({ deltaPct, className, withSuffix, invertSign }: Props) {
  const flat = !Number.isFinite(deltaPct) || Math.abs(deltaPct) < 0.5;
  const positive = deltaPct > 0;
  const isGood = invertSign ? !positive : positive;

  const Icon = flat ? Minus : positive ? ArrowUp : ArrowDown;
  const formatted = flat
    ? "flat"
    : `${positive ? "+" : ""}${deltaPct.toFixed(1)}%`;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]",
        flat
          ? "bg-foreground/5 text-foreground/60"
          : isGood
            ? "text-foreground"
            : "bg-foreground/5 text-foreground/65",
        className,
      )}
      style={
        !flat && isGood
          ? {
              backgroundColor: "color-mix(in srgb, var(--brand-yellow) 30%, transparent)",
            }
          : undefined
      }
    >
      <Icon className="size-3" />
      <span>{formatted}</span>
      {withSuffix ? <span className="opacity-60">vs prior</span> : null}
    </span>
  );
}
