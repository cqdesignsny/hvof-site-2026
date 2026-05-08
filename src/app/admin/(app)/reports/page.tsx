import { BarChart3, TrendingUp, Mail, Search } from "lucide-react";
import { getLeadCount } from "@/lib/leads-store";

export const metadata = { title: "Reports" };

const PLANNED_REPORTS = [
  {
    title: "Weekly leads digest",
    body: "Last 7 days of submissions, broken out by form type and source. Emailed every Monday.",
    icon: Mail,
    status: "Planned, depends on persistent storage",
  },
  {
    title: "Source attribution",
    body: '"How did you hear about us" responses over time. Tells you what marketing channels are paying back.',
    icon: TrendingUp,
    status: "Planned",
  },
  {
    title: "Search impressions",
    body: "Hudson Valley city and county pages, ranked by impressions, clicks, and average position.",
    icon: Search,
    status: "Plan to wire Google Search Console API",
  },
  {
    title: "Site analytics",
    body: "Top pages, referrers, conversion funnel from product browse → quote.",
    icon: BarChart3,
    status: "GA4 tag firing. Needs MCP unblock to surface here.",
  },
];

export default async function ReportsPage() {
  const counts = await getLeadCount();

  return (
    <div className="px-4 py-8 md:px-10 md:py-12 lg:px-14">
      <div>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/50">
          What you can measure
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Reports
        </h1>
        <p className="mt-3 max-w-2xl text-foreground/70">
          High-level numbers across the business. The reports below come online once the data sources are wired.
        </p>
      </div>

      {/* Live counter */}
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        <div
          className="rounded-2xl border-2 p-5 md:p-6"
          style={{ borderColor: "var(--brand-yellow)", backgroundColor: "var(--brand-yellow)" }}
        >
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/70">
            Leads in flight
          </p>
          <p className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {counts.total}
          </p>
        </div>
        <Stat label="Quote requests" value={counts.byType["main-lead"]} />
        <Stat label="Sell-to-us" value={counts.byType["sell-furniture"]} />
        <Stat label="Giveaway entries" value={counts.byType.giveaway} />
      </div>

      <div className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          Reports we&apos;ll wire next
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {PLANNED_REPORTS.map((r) => {
            const Icon = r.icon;
            return (
              <article
                key={r.title}
                className="rounded-2xl border border-foreground/10 bg-background p-6"
              >
                <Icon className="h-5 w-5 text-foreground/55" />
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight md:text-xl">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">{r.body}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                  {r.status}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-background p-5 md:p-6">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
        {label}
      </p>
      <p className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
        {value}
      </p>
    </div>
  );
}
