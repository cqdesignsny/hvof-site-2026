import { cn } from "@/lib/utils";
import { DeltaPill } from "./delta-pill";

type Props = {
  label: string;
  value: string;
  deltaPct?: number;
  hint?: string;
  highlight?: boolean;
  invertSign?: boolean;
};

export function MetricTile({ label, value, deltaPct, hint, highlight, invertSign }: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 md:p-6",
        highlight
          ? "border-transparent"
          : "border-foreground/10 bg-background",
      )}
      style={
        highlight
          ? { borderColor: "var(--brand-yellow)", backgroundColor: "var(--brand-yellow)" }
          : undefined
      }
    >
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
        {label}
      </p>
      <p className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
        {value}
      </p>
      <div className="mt-3 flex items-center gap-2">
        {typeof deltaPct === "number" ? (
          <DeltaPill deltaPct={deltaPct} invertSign={invertSign} />
        ) : null}
        {hint ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45">
            {hint}
          </span>
        ) : null}
      </div>
    </div>
  );
}
