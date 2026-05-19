import Link from "next/link";
import { cn } from "@/lib/utils";
import { RANGE_OPTIONS, type SignalRange } from "@/lib/signal/types";

type Props = {
  active: SignalRange;
  basePath?: string;
};

export function RangeTabs({ active, basePath = "/admin/reports" }: Props) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-foreground/15 bg-background p-1">
      {RANGE_OPTIONS.map((r) => {
        const isActive = r.key === active;
        return (
          <Link
            key={r.key}
            href={`${basePath}?range=${r.key}`}
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
              isActive
                ? "bg-foreground text-background"
                : "text-foreground/60 hover:text-foreground",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {r.shortLabel}
          </Link>
        );
      })}
    </div>
  );
}
