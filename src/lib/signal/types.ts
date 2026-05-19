// Contract types for what HVOF Floorplan consumes from CQ Signal.
// Source of truth: /Users/cqstudio/Library/CloudStorage/Dropbox/HVOF/HVOF Site 2026/SIGNAL-HANDOFF.md
//
// Signal owns the connectors. Floorplan only reads. If a field is missing in the
// real response, the renderer falls back to "empty" state.

export type SignalRange = "7d" | "30d" | "90d" | "1y";

export type IntegrationStatus = "live" | "manual" | "empty";

export type Delta = {
  current: number;
  prior: number;
  delta_pct: number;
};

export type SignalBusinessMeta = {
  slug: string;
  name: string;
  short_name?: string;
  vertical?: string;
  brand_color?: string;
  logo_url?: string;
};

export type SignalRangeMeta = {
  key: SignalRange;
  label: string;
  start: string;
  end: string;
};

export type SignalMeta = {
  business: SignalBusinessMeta;
  range: SignalRangeMeta;
  prior_range: { start: string; end: string };
  generated_at: string;
  integrations: string[];
};

export type ChannelBreakdownEntry = {
  channel: string;
  sessions: number;
  pct: number;
};

export type SourceEntry = {
  source: string;
  sessions: number;
};

export type LandingPageEntry = {
  path: string;
  sessions: number;
};

export type DailySessionsEntry = {
  date: string;
  sessions: number;
};

export type GA4Snapshot = {
  status: IntegrationStatus;
  sessions?: Delta;
  users?: Delta;
  engaged_sessions?: Delta;
  avg_session_duration_sec?: Delta;
  channel_breakdown?: ChannelBreakdownEntry[];
  top_sources?: SourceEntry[];
  top_landing_pages?: LandingPageEntry[];
  daily_sessions?: DailySessionsEntry[];
};

export type TypeformLeadEntry = {
  submitted_at: string;
  name?: string;
  email?: string;
  company?: string;
};

export type TypeformSnapshot = {
  status: IntegrationStatus;
  total_leads?: Delta;
  leads?: TypeformLeadEntry[];
};

export type MetaAdsSnapshot = {
  status: IntegrationStatus;
  spend?: Delta;
  impressions?: Delta;
  clicks?: Delta;
  ctr?: Delta;
};

export type SocialSnapshot = {
  status: IntegrationStatus;
  followers?: Delta;
  engagement_rate?: Delta;
  reach?: Delta;
};

export type OmnisendCampaignEntry = {
  name: string;
  sent_at: string;
  open_rate: number;
  click_rate: number;
};

export type OmnisendSnapshot = {
  status: IntegrationStatus;
  campaigns?: OmnisendCampaignEntry[];
  open_rate?: Delta;
  click_rate?: Delta;
};

export type NativeLeadByType = {
  form_type: string;
  count: number;
};

export type NativeLeadRecent = {
  submitted_at: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  form_type: string;
};

export type LeadsNativeSnapshot = {
  status: IntegrationStatus;
  source: string;
  total?: Delta;
  by_form_type?: NativeLeadByType[];
  recent?: NativeLeadRecent[];
};

export type SignalSnapshot = {
  meta: SignalMeta;
  ga4?: GA4Snapshot;
  typeform?: TypeformSnapshot;
  meta_ads?: MetaAdsSnapshot;
  instagram?: SocialSnapshot;
  facebook?: SocialSnapshot;
  omnisend?: OmnisendSnapshot;
  leads_native?: LeadsNativeSnapshot;
};

export type RecommendationPriority = "high" | "medium" | "low";

export type Recommendation = {
  id: string;
  priority: RecommendationPriority;
  title: string;
  body: string;
  source: string;
  metric_refs?: string[];
};

export type SignalRecommendations = {
  items: Recommendation[];
  generated_at: string;
  model?: string;
};

export type SignalBrief = {
  markdown: string;
  generated_at: string;
};

export const RANGE_OPTIONS: { key: SignalRange; label: string; shortLabel: string }[] = [
  { key: "7d", label: "Last 7 days", shortLabel: "7d" },
  { key: "30d", label: "Last 30 days", shortLabel: "30d" },
  { key: "90d", label: "Last 90 days", shortLabel: "90d" },
  { key: "1y", label: "Last 12 months", shortLabel: "1y" },
];

export function isSignalRange(value: unknown): value is SignalRange {
  return (
    typeof value === "string" &&
    RANGE_OPTIONS.some((r) => r.key === value)
  );
}
