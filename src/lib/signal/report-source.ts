import "server-only";
import { getReceivedReport } from "./received-report-store";
import { mockBrief, mockRecommendations, mockSnapshot } from "./mock";
import type {
  SignalBrief,
  SignalRange,
  SignalRecommendations,
  SignalSnapshot,
} from "./types";

// The report source for /admin/reports under the push model. Floorplan no longer
// pulls Signal live; Signal pushes a signed, pre-built payload (all four ranges,
// each with its snapshot + recommendations + brief) and we render the stored
// copy. This module reads that copy and projects the requested range.
//
// Producer contract: CQ Signal's src/lib/push/contract.ts (ReportPushPayload).
// Snapshot + recommendations already match the v1 types in ./types; the brief
// arrives as raw markdown and we wrap it to SignalBrief here.

const BUSINESS_SLUG = "hudson-valley-office-furniture";

type ReceivedRangeBlock = {
  snapshot: SignalSnapshot;
  recommendations: SignalRecommendations | null;
  brief: string;
};

type ReceivedPayload = {
  contract_version: number;
  business: { slug: string; name: string };
  default_range: SignalRange;
  ranges: Partial<Record<SignalRange, ReceivedRangeBlock>>;
  pushed_at: string;
};

export type ReportSourceMode = "push" | "mock";

export type RangeReport = {
  mode: ReportSourceMode;
  /** ISO timestamp Signal built + sent this payload. Null in mock mode. */
  pushedAt: string | null;
  snapshot: SignalSnapshot;
  recommendations: SignalRecommendations | null;
  brief: SignalBrief;
};

function mockReport(range: SignalRange): RangeReport {
  return {
    mode: "mock",
    pushedAt: null,
    snapshot: mockSnapshot(range),
    recommendations: mockRecommendations(range),
    brief: { markdown: mockBrief(range), generated_at: new Date().toISOString() },
  };
}

// With a DB configured we're prod-like: a missing/partial push means "nothing
// pushed yet", so the page shows a waiting state rather than fake numbers.
// Without one (pure local dev) fall back to mock so /admin/reports stays
// developable offline.
function fallback(range: SignalRange): RangeReport | null {
  return process.env.DATABASE_URL ? null : mockReport(range);
}

/**
 * Read the latest report Signal pushed and project the requested range. Returns
 * null when there's nothing to render yet in a prod-like environment (the caller
 * shows a "waiting for the first push" state).
 */
export async function getRangeReport(
  range: SignalRange,
): Promise<RangeReport | null> {
  const stored = await getReceivedReport(BUSINESS_SLUG);
  if (!stored) return fallback(range);

  const payload = stored.payload as ReceivedPayload | null;
  const block = payload?.ranges?.[range];
  if (!block || !block.snapshot) return fallback(range);

  const pushedAt = payload?.pushed_at ?? stored.receivedAt;
  return {
    mode: "push",
    pushedAt,
    snapshot: block.snapshot,
    recommendations: block.recommendations ?? null,
    brief: { markdown: block.brief, generated_at: pushedAt },
  };
}
