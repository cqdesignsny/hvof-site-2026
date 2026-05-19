import { cn } from "@/lib/utils";
import type { IntegrationStatus } from "@/lib/signal/types";

type Props = {
  status: IntegrationStatus | "mock";
  className?: string;
};

const LABELS: Record<IntegrationStatus | "mock", string> = {
  live: "Live",
  manual: "Manual",
  empty: "Not connected",
  mock: "Mock data",
};

export function StatusPill({ status, className }: Props) {
  const isLive = status === "live";
  const isMock = status === "mock";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em]",
        isLive
          ? "text-foreground"
          : isMock
            ? "border border-foreground/40 bg-foreground/5 text-foreground/70"
            : "bg-foreground/5 text-foreground/55",
        className,
      )}
      style={
        isLive
          ? {
              backgroundColor: "color-mix(in srgb, var(--brand-yellow) 40%, transparent)",
            }
          : undefined
      }
    >
      <span
        className="size-1.5 rounded-full"
        style={{
          backgroundColor: isLive
            ? "var(--brand-yellow)"
            : isMock
              ? "var(--brand-yellow)"
              : "currentColor",
          opacity: isLive ? 1 : isMock ? 0.9 : 0.45,
        }}
      />
      {LABELS[status]}
    </span>
  );
}
