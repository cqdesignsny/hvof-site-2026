import type {
  ChannelBreakdownEntry,
  DailySessionsEntry,
  LandingPageEntry,
  Recommendation,
  SignalRange,
  SignalRecommendations,
  SignalSnapshot,
  SourceEntry,
} from "./types";

// Stable, hand-tuned numbers. Real shape, plausible scale for an HVOF-sized
// regional B2B. Replaced by the real Signal payload once SIGNAL_API_BASE is set.

const TODAY = "2026-05-17";

const RANGE_NUMBERS: Record<
  SignalRange,
  {
    label: string;
    start: string;
    end: string;
    priorStart: string;
    priorEnd: string;
    sessions: { current: number; prior: number };
    users: { current: number; prior: number };
    engaged_sessions: { current: number; prior: number };
    avg_session_duration_sec: { current: number; prior: number };
    daily_points: number;
    quote_leads_current: number;
    quote_leads_prior: number;
  }
> = {
  "7d": {
    label: "Last 7 days",
    start: "2026-05-11",
    end: "2026-05-17",
    priorStart: "2026-05-04",
    priorEnd: "2026-05-10",
    sessions: { current: 3120, prior: 2754 },
    users: { current: 2245, prior: 1990 },
    engaged_sessions: { current: 1840, prior: 1612 },
    avg_session_duration_sec: { current: 142, prior: 128 },
    daily_points: 7,
    quote_leads_current: 11,
    quote_leads_prior: 8,
  },
  "30d": {
    label: "Last 30 days",
    start: "2026-04-18",
    end: "2026-05-17",
    priorStart: "2026-03-19",
    priorEnd: "2026-04-17",
    sessions: { current: 12482, prior: 10930 },
    users: { current: 9210, prior: 8077 },
    engaged_sessions: { current: 7345, prior: 6101 },
    avg_session_duration_sec: { current: 138, prior: 121 },
    daily_points: 30,
    quote_leads_current: 38,
    quote_leads_prior: 27,
  },
  "90d": {
    label: "Last 90 days",
    start: "2026-02-17",
    end: "2026-05-17",
    priorStart: "2025-11-19",
    priorEnd: "2026-02-16",
    sessions: { current: 36420, prior: 32108 },
    users: { current: 25910, prior: 23044 },
    engaged_sessions: { current: 20940, prior: 17820 },
    avg_session_duration_sec: { current: 134, prior: 119 },
    daily_points: 90,
    quote_leads_current: 112,
    quote_leads_prior: 88,
  },
  "1y": {
    label: "Last 12 months",
    start: "2025-05-18",
    end: "2026-05-17",
    priorStart: "2024-05-18",
    priorEnd: "2025-05-17",
    sessions: { current: 145200, prior: 127400 },
    users: { current: 102300, prior: 89500 },
    engaged_sessions: { current: 82400, prior: 70200 },
    avg_session_duration_sec: { current: 131, prior: 116 },
    daily_points: 52,
    quote_leads_current: 415,
    quote_leads_prior: 348,
  },
};

function deltaPct(current: number, prior: number): number {
  if (prior === 0) return current === 0 ? 0 : 100;
  return ((current - prior) / prior) * 100;
}

function generateDaily(
  endIso: string,
  points: number,
  totalSessions: number,
  granularity: "day" | "week" = "day",
): DailySessionsEntry[] {
  const result: DailySessionsEntry[] = [];
  const end = new Date(endIso + "T00:00:00Z");
  const baseAvg = totalSessions / points;
  const stepDays = granularity === "week" ? 7 : 1;

  for (let i = points - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCDate(end.getUTCDate() - i * stepDays);
    const dow = d.getUTCDay();
    // HVOF is B2B. Weekends are quieter. Only apply for daily granularity.
    const weekendFactor =
      granularity === "day" && (dow === 0 || dow === 6) ? 0.55 : 1.0;
    // Stable pseudo-noise from date so the chart is deterministic.
    const seed = d.getUTCFullYear() * 366 + (d.getUTCMonth() + 1) * 31 + d.getUTCDate();
    const noise = Math.sin(seed * 0.78) * 0.18 + Math.cos(seed * 1.33) * 0.11;
    const value = Math.max(1, Math.round(baseAvg * weekendFactor * (1 + noise)));
    result.push({ date: d.toISOString().slice(0, 10), sessions: value });
  }
  return result;
}

const CHANNEL_BREAKDOWN: ChannelBreakdownEntry[] = [
  { channel: "Organic Search", sessions: 0, pct: 45 },
  { channel: "Direct", sessions: 0, pct: 22 },
  { channel: "Referral", sessions: 0, pct: 14 },
  { channel: "Organic Social", sessions: 0, pct: 8 },
  { channel: "Paid Search", sessions: 0, pct: 6 },
  { channel: "Email", sessions: 0, pct: 3 },
  { channel: "Other", sessions: 0, pct: 2 },
];

const TOP_SOURCES_BASE: { source: string; share: number }[] = [
  { source: "google", share: 0.43 },
  { source: "(direct) / (none)", share: 0.22 },
  { source: "bing", share: 0.05 },
  { source: "linkedin.com", share: 0.045 },
  { source: "facebook.com", share: 0.04 },
  { source: "instagram.com", share: 0.035 },
  { source: "ogs.ny.gov", share: 0.03 },
  { source: "yelp.com", share: 0.02 },
];

const TOP_LANDING_BASE: { path: string; share: number }[] = [
  { path: "/", share: 0.18 },
  { path: "/furniture/seating", share: 0.12 },
  { path: "/quote-request", share: 0.085 },
  { path: "/nys-contracts", share: 0.075 },
  { path: "/furniture/desks", share: 0.06 },
  { path: "/about", share: 0.045 },
  { path: "/furniture/conference", share: 0.04 },
  { path: "/office-furniture-poughkeepsie-ny", share: 0.035 },
  { path: "/gallery", share: 0.03 },
  { path: "/furniture/healthcare", share: 0.028 },
];

const NATIVE_LEADS_RECENT = [
  { submitted_at: "2026-05-17T15:42:00Z", first_name: "Jennifer", last_name: "L.", company: "Marshall + Sterling", form_type: "main-lead" as const },
  { submitted_at: "2026-05-16T11:08:00Z", first_name: "Brian", last_name: "K.", company: "St. Catherine's Pediatrics", form_type: "main-lead" as const },
  { submitted_at: "2026-05-15T19:21:00Z", first_name: "Priya", last_name: "S.", company: "Hudson Valley Federal", form_type: "main-lead" as const },
  { submitted_at: "2026-05-15T09:54:00Z", first_name: "Dan", last_name: "O.", company: undefined, form_type: "giveaway" as const },
  { submitted_at: "2026-05-14T17:32:00Z", first_name: "Marisol", last_name: "R.", company: "Newburgh Free Library", form_type: "main-lead" as const },
  { submitted_at: "2026-05-13T13:11:00Z", first_name: "Kevin", last_name: "T.", company: "Vassar Brothers Medical", form_type: "main-lead" as const },
  { submitted_at: "2026-05-12T10:47:00Z", first_name: "Anonymous", last_name: undefined, company: undefined, form_type: "sell-furniture" as const },
];

function fillChannelSessions(total: number): ChannelBreakdownEntry[] {
  return CHANNEL_BREAKDOWN.map((c) => ({
    ...c,
    sessions: Math.round(total * (c.pct / 100)),
  }));
}

function fillSources(total: number): SourceEntry[] {
  return TOP_SOURCES_BASE.map((s) => ({
    source: s.source,
    sessions: Math.round(total * s.share),
  }));
}

function fillLandings(total: number): LandingPageEntry[] {
  return TOP_LANDING_BASE.map((l) => ({
    path: l.path,
    sessions: Math.round(total * l.share),
  }));
}

const REC_LIBRARY: Recommendation[] = [
  {
    id: "rec_organic_search_climb",
    priority: "high",
    title: "Organic search is up 14% and Seating is the page pulling it",
    body: "Sessions to `/furniture/seating` climbed faster than the rest of the catalog this period. Pair the Seating hero with three priced chair anchors above the fold to capture more of that intent into the quote cart.",
    source: "ga4",
    metric_refs: ["ga4.channel_breakdown.organic_search", "ga4.top_landing_pages./furniture/seating"],
  },
  {
    id: "rec_nys_landing",
    priority: "high",
    title: "NYS contracts traffic is steady, dedicated landing pages could double conversions",
    body: "`/nys-contracts` pulls real volume but the page is a flat list. Build dedicated landing pages for the top 5 manufacturers most-searched alongside `nys ogs` or `state contract` modifiers.",
    source: "ga4",
    metric_refs: ["ga4.top_landing_pages./nys-contracts"],
  },
  {
    id: "rec_quote_lift",
    priority: "medium",
    title: "Quote requests are up 41%, drag the contact step earlier on mobile",
    body: "On desktop the multi-step form converts fine. On mobile, drop-off concentrates between the audience and branch steps. Test consolidating those two into a single screen on viewports under 640px.",
    source: "leads_native",
    metric_refs: ["leads_native.total"],
  },
  {
    id: "rec_paid_social",
    priority: "low",
    title: "Paid Social is missing from the mix",
    body: "Organic IG and FB drive about 8% of traffic but no paid budget is flowing through Meta. A small test on Hudson Valley B2B targeting would tell us if the channel is worth the spend.",
    source: "meta_ads",
    metric_refs: [],
  },
];

const BRIEF_MARKDOWN_30D = `# HVOF performance brief

## Headline
Hudson Valley Office Furniture closed the last 30 days at **12,482 sessions** (+14% versus the prior 30), driven by a healthier organic mix and a 41% lift in Quote Request submissions.

## What's working
- **Organic Search** is up across the board. \`/furniture/seating\` is the highest-velocity entry point and converts above the site average.
- **NYS contracts** drew steady inbound from \`ogs.ny.gov\` and government-related referrals.
- **Quote Request form** is converting better since the multi-step rewrite. The new "audience first, contact last" order is paying back.

## What to watch
- **Mobile drop-off** on the Quote Request second step. The audience to branch transition is leaking.
- **Paid Social** remains zero. We may be leaving the channel on the table.
- **Email** is a small slice (3%). Once the weekly leads digest is wired, we get a feedback loop to grow re-engagement.

## What's next
Targeted asks for the team:
1. Build manufacturer-specific landing pages for the top 5 NYS contract manufacturers.
2. Run a mobile-only A/B that consolidates the audience and branch steps.
3. Spin up a Meta lead-gen test targeting Hudson Valley B2B (under $500 for 14 days).
`;

export function mockSnapshot(range: SignalRange): SignalSnapshot {
  const r = RANGE_NUMBERS[range];
  const dailySessions = generateDaily(
    r.end,
    r.daily_points,
    r.sessions.current,
    range === "1y" ? "week" : "day",
  );

  return {
    meta: {
      business: {
        slug: "hudson-valley-office-furniture",
        name: "Hudson Valley Office Furniture",
        short_name: "HVOF",
        vertical: "Commercial B2B",
        brand_color: "#E7C81F",
        logo_url: "https://hvof-site-2026.vercel.app/logo.svg",
      },
      range: {
        key: range,
        label: r.label,
        start: r.start,
        end: r.end,
      },
      prior_range: { start: r.priorStart, end: r.priorEnd },
      generated_at: `${TODAY}T21:00:00Z`,
      integrations: ["ga4", "leads_native", "meta_ads", "instagram", "facebook", "omnisend"],
    },
    ga4: {
      status: "live",
      sessions: { ...r.sessions, delta_pct: deltaPct(r.sessions.current, r.sessions.prior) },
      users: { ...r.users, delta_pct: deltaPct(r.users.current, r.users.prior) },
      engaged_sessions: {
        ...r.engaged_sessions,
        delta_pct: deltaPct(r.engaged_sessions.current, r.engaged_sessions.prior),
      },
      avg_session_duration_sec: {
        ...r.avg_session_duration_sec,
        delta_pct: deltaPct(
          r.avg_session_duration_sec.current,
          r.avg_session_duration_sec.prior,
        ),
      },
      channel_breakdown: fillChannelSessions(r.sessions.current),
      top_sources: fillSources(r.sessions.current),
      top_landing_pages: fillLandings(r.sessions.current),
      daily_sessions: dailySessions,
    },
    leads_native: {
      status: "live",
      source: "hvof-floorplan",
      total: {
        current: r.quote_leads_current,
        prior: r.quote_leads_prior,
        delta_pct: deltaPct(r.quote_leads_current, r.quote_leads_prior),
      },
      by_form_type: [
        { form_type: "main-lead", count: Math.round(r.quote_leads_current * 0.78) },
        { form_type: "sell-furniture", count: Math.round(r.quote_leads_current * 0.12) },
        { form_type: "giveaway", count: Math.round(r.quote_leads_current * 0.07) },
        { form_type: "contact", count: Math.round(r.quote_leads_current * 0.03) },
      ],
      recent: NATIVE_LEADS_RECENT.slice(0, range === "7d" ? 4 : 7),
    },
    meta_ads: { status: "empty" },
    instagram: { status: "empty" },
    facebook: { status: "empty" },
    omnisend: { status: "empty" },
  };
}

export function mockRecommendations(range: SignalRange): SignalRecommendations {
  // For 7d, surface fewer recs since the window is small. For 1y, all of them.
  const items =
    range === "7d"
      ? REC_LIBRARY.slice(0, 2)
      : range === "30d"
        ? REC_LIBRARY.slice(0, 3)
        : REC_LIBRARY;
  return {
    items,
    generated_at: `${TODAY}T21:00:00Z`,
    model: "mock",
  };
}

export function mockBrief(range: SignalRange): string {
  // For the mock we keep one brief and label it. Real Signal generates per-range.
  if (range === "30d") return BRIEF_MARKDOWN_30D;
  return BRIEF_MARKDOWN_30D.replace(
    "the last 30 days",
    range === "7d"
      ? "the last 7 days"
      : range === "90d"
        ? "the last 90 days"
        : "the last 12 months",
  );
}
