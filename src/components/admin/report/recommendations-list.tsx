import { cn } from "@/lib/utils";
import { renderMarkdown } from "./markdown";
import type { Recommendation } from "@/lib/signal/types";

const PRIORITY_LABEL: Record<Recommendation["priority"], string> = {
  high: "High priority",
  medium: "Worth a look",
  low: "Watching",
};

export function RecommendationsList({ items }: { items: Recommendation[] }) {
  if (!items || items.length === 0) {
    return (
      <p className="text-sm text-foreground/55">
        No recommendations for this range yet.
      </p>
    );
  }

  return (
    <ol className="space-y-3">
      {items.map((rec, i) => (
        <li
          key={rec.id}
          className={cn(
            "rounded-xl border p-5 md:p-6",
            rec.priority === "high"
              ? "border-transparent"
              : "border-foreground/10 bg-background",
          )}
          style={
            rec.priority === "high"
              ? {
                  borderColor: "var(--brand-yellow)",
                  backgroundColor: "color-mix(in srgb, var(--brand-yellow) 14%, var(--background))",
                }
              : undefined
          }
        >
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] font-semibold text-foreground/50">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
                {PRIORITY_LABEL[rec.priority]} · via {rec.source}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold leading-tight tracking-tight md:text-xl">
                {rec.title}
              </h3>
              <div
                className="prose-rec mt-2 text-sm leading-relaxed text-foreground/75"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(rec.body) }}
              />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
