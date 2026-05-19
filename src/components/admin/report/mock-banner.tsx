import { AlertCircle } from "lucide-react";

export function MockBanner() {
  return (
    <div
      className="flex items-start gap-3 rounded-xl border-2 p-4"
      style={{ borderColor: "var(--brand-yellow)", backgroundColor: "color-mix(in srgb, var(--brand-yellow) 14%, var(--background))" }}
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      <div className="min-w-0 text-sm">
        <p className="font-semibold">Showing mock data</p>
        <p className="mt-0.5 text-foreground/70">
          CQ Signal is the source of these reports. Set <code className="rounded bg-foreground/10 px-1 py-0.5 font-mono text-[0.85em]">SIGNAL_API_BASE</code> and <code className="rounded bg-foreground/10 px-1 py-0.5 font-mono text-[0.85em]">SIGNAL_API_KEY</code> in env to pull the live snapshot.
        </p>
      </div>
    </div>
  );
}
