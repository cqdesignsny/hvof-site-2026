import { ArrowUpRight, FileText, Sparkles } from "lucide-react";
import { fetchBrief, fetchRecommendations, fetchSnapshot, SIGNAL_MODE } from "@/lib/signal/client";
import { isSignalRange, type SignalRange } from "@/lib/signal/types";
import { BriefMarkdown } from "@/components/admin/report/brief-markdown";
import { CHANNEL_COLORS, ChannelDonut, paletteFor } from "@/components/admin/report/channel-donut";
import { DeltaPill } from "@/components/admin/report/delta-pill";
import { MetricTile } from "@/components/admin/report/metric-tile";
import { MockBanner } from "@/components/admin/report/mock-banner";
import { RangeTabs } from "@/components/admin/report/range-tabs";
import { RecommendationsList } from "@/components/admin/report/recommendations-list";
import { SectionCard } from "@/components/admin/report/section-card";
import { StatusPill } from "@/components/admin/report/status-pill";
import { TrendChart } from "@/components/admin/report/trend-chart";

export const metadata = { title: "Reports" };
export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const DEFAULT_RANGE: SignalRange = "30d";

function resolveRange(value: unknown): SignalRange {
  if (isSignalRange(value)) return value;
  return DEFAULT_RANGE;
}

function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return Math.round(n).toString();
}

function formatDuration(seconds: number | undefined): string {
  if (!seconds) return "—";
  const s = Math.round(seconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m === 0) return `${r}s`;
  return `${m}m ${String(r).padStart(2, "0")}s`;
}

function formatLongDate(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00Z" : ""));
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
}

function formTypeLabel(t: string): string {
  switch (t) {
    case "main-lead":
      return "Quote requests";
    case "sell-furniture":
      return "Sell to us";
    case "giveaway":
      return "Giveaway entries";
    case "contact":
      return "Contact form";
    default:
      return t;
  }
}

export default async function ReportsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const range = resolveRange(sp.range);

  const [snapshot, recs, brief] = await Promise.all([
    fetchSnapshot(range),
    fetchRecommendations(range),
    fetchBrief(range),
  ]);

  const ga4 = snapshot.ga4;
  const leadsNative = snapshot.leads_native;
  const dailySeries = (ga4?.daily_sessions ?? []).map((d) => d.sessions);
  const channelSegments = (ga4?.channel_breakdown ?? []).slice(0, 7).map((c, i) => ({
    label: c.channel,
    pct: c.pct,
    color: CHANNEL_COLORS[c.channel] ?? paletteFor(i),
  }));

  return (
    <div className="px-4 py-8 md:px-10 md:py-12 lg:px-14">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/50">
            Performance · {snapshot.meta.business.short_name ?? snapshot.meta.business.name}
          </p>
          <StatusPill status={SIGNAL_MODE === "mock" ? "mock" : "live"} />
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Reports
          </h1>
          <RangeTabs active={range} />
        </div>
        <p className="text-foreground/70">
          {snapshot.meta.range.label}, {formatLongDate(snapshot.meta.range.start)} to{" "}
          {formatLongDate(snapshot.meta.range.end)}.{" "}
          <span className="text-foreground/55">
            Compared against {formatLongDate(snapshot.meta.prior_range.start)} to{" "}
            {formatLongDate(snapshot.meta.prior_range.end)}.
          </span>
        </p>
      </header>

      {SIGNAL_MODE === "mock" ? (
        <div className="mt-6">
          <MockBanner />
        </div>
      ) : null}

      {/* Hero traffic */}
      {ga4?.status === "live" && ga4.sessions ? (
        <section className="mt-10 rounded-2xl border-2 p-6 md:p-9" style={{ borderColor: "var(--brand-yellow)" }}>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
                Find out how your audience is growing
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                Traffic over the last {snapshot.meta.range.label.replace(/^Last /, "").toLowerCase()}
              </h2>
            </div>
            <StatusPill status="live" />
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_240px] lg:items-center">
            <div className="min-w-0">
              <div className="flex items-baseline gap-3">
                <p className="font-display text-5xl font-semibold leading-none tracking-tight md:text-6xl">
                  {formatCompact(ga4.sessions.current)}
                </p>
                <p className="text-sm text-foreground/65">Sessions</p>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <DeltaPill deltaPct={ga4.sessions.delta_pct} withSuffix />
                <span className="text-foreground/55">
                  {formatNumber(ga4.sessions.prior)} prior period
                </span>
              </div>
              {dailySeries.length > 1 ? (
                <div className="mt-5 overflow-hidden">
                  <TrendChart data={dailySeries} height={160} />
                </div>
              ) : null}
            </div>

            {channelSegments.length > 0 ? (
              <div className="lg:flex lg:justify-end">
                <ChannelDonut segments={channelSegments} />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* KPI tiles */}
      <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        <MetricTile
          label="Sessions"
          value={ga4?.sessions ? formatNumber(ga4.sessions.current) : "—"}
          deltaPct={ga4?.sessions?.delta_pct}
        />
        <MetricTile
          label="Users"
          value={ga4?.users ? formatNumber(ga4.users.current) : "—"}
          deltaPct={ga4?.users?.delta_pct}
        />
        <MetricTile
          label="Engaged sessions"
          value={ga4?.engaged_sessions ? formatNumber(ga4.engaged_sessions.current) : "—"}
          deltaPct={ga4?.engaged_sessions?.delta_pct}
        />
        <MetricTile
          label="Quote leads"
          value={leadsNative?.total ? formatNumber(leadsNative.total.current) : "—"}
          deltaPct={leadsNative?.total?.delta_pct}
          highlight
        />
      </section>

      {/* Channels in detail */}
      {ga4?.channel_breakdown && ga4.channel_breakdown.length > 0 ? (
        <div className="mt-10">
          <SectionCard
            eyebrow="Traffic"
            title="Channels in detail"
            action={
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                Avg session {formatDuration(ga4.avg_session_duration_sec?.current)}
              </p>
            }
          >
            <ul className="space-y-3">
              {ga4.channel_breakdown.map((c, i) => {
                const color = CHANNEL_COLORS[c.channel] ?? paletteFor(i);
                return (
                  <li key={c.channel} className="grid grid-cols-[180px_1fr_70px] items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="truncate">{c.channel}</span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-foreground/5">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ width: `${c.pct}%`, backgroundColor: color }}
                      />
                    </div>
                    <div className="text-right font-mono text-xs tabular-nums text-foreground/70">
                      {formatNumber(c.sessions)}
                      <span className="ml-2 text-foreground/45">{c.pct}%</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </SectionCard>
        </div>
      ) : null}

      {/* Top sources + landing pages */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard eyebrow="Where they come from" title="Top sources">
          <ul className="divide-y divide-foreground/10">
            {(ga4?.top_sources ?? []).slice(0, 8).map((s) => (
              <li key={s.source} className="flex items-center justify-between py-2.5 text-sm">
                <span className="truncate">{s.source}</span>
                <span className="font-mono text-xs tabular-nums text-foreground/70">
                  {formatNumber(s.sessions)}
                </span>
              </li>
            ))}
            {(ga4?.top_sources ?? []).length === 0 ? (
              <li className="py-2.5 text-sm text-foreground/55">No source data for this range yet.</li>
            ) : null}
          </ul>
        </SectionCard>
        <SectionCard eyebrow="Where they land" title="Top landing pages">
          <ul className="divide-y divide-foreground/10">
            {(ga4?.top_landing_pages ?? []).slice(0, 8).map((l) => (
              <li key={l.path} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <span className="truncate font-mono text-[13px]">{l.path}</span>
                <span className="shrink-0 font-mono text-xs tabular-nums text-foreground/70">
                  {formatNumber(l.sessions)}
                </span>
              </li>
            ))}
            {(ga4?.top_landing_pages ?? []).length === 0 ? (
              <li className="py-2.5 text-sm text-foreground/55">No landing page data yet.</li>
            ) : null}
          </ul>
        </SectionCard>
      </div>

      {/* Native lead pipeline */}
      {leadsNative?.status === "live" ? (
        <div className="mt-6">
          <SectionCard
            eyebrow="Lead pipeline · Floorplan"
            title="Native form submissions"
            action={
              <a
                href="/admin/leads"
                className="inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground"
              >
                Open pipeline
                <ArrowUpRight className="size-3.5" />
              </a>
            }
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
                  By form type
                </p>
                <ul className="mt-3 space-y-2.5">
                  {(leadsNative.by_form_type ?? []).map((b) => (
                    <li
                      key={b.form_type}
                      className="flex items-center justify-between gap-3 rounded-lg border border-foreground/10 px-3 py-2 text-sm"
                    >
                      <span>{formTypeLabel(b.form_type)}</span>
                      <span className="font-mono text-xs font-semibold tabular-nums">{b.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
                  Most recent
                </p>
                <ul className="mt-3 divide-y divide-foreground/10">
                  {(leadsNative.recent ?? []).map((r, i) => (
                    <li key={i} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                      <div className="min-w-0">
                        <p className="truncate">
                          {[r.first_name, r.last_name].filter(Boolean).join(" ") || "Anonymous"}
                          {r.company ? (
                            <span className="text-foreground/55"> · {r.company}</span>
                          ) : null}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45">
                          {formTypeLabel(r.form_type)}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[10px] text-foreground/55">
                        {new Date(r.submitted_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionCard>
        </div>
      ) : null}

      {/* Recommendations */}
      <div className="mt-6">
        <SectionCard
          eyebrow="Signal recommendations"
          title="What to do next"
          action={
            <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55">
              <Sparkles className="size-3.5" />
              Generated {formatTimestamp(recs.generated_at)}
            </span>
          }
        >
          <RecommendationsList items={recs.items} />
        </SectionCard>
      </div>

      {/* Brief */}
      <div className="mt-6">
        <SectionCard
          eyebrow="The brief"
          title="What happened, in plain English"
          action={
            <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55">
              <FileText className="size-3.5" />
              Markdown
            </span>
          }
        >
          <BriefMarkdown markdown={brief.markdown} />
        </SectionCard>
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 pt-6 text-xs text-foreground/55">
        <p className="font-mono uppercase tracking-[0.14em]">
          Data from CQ Signal · Snapshot generated {formatTimestamp(snapshot.meta.generated_at)}
        </p>
        <p className="font-mono uppercase tracking-[0.14em]">
          Range · {snapshot.meta.range.key}
        </p>
      </div>
    </div>
  );
}
