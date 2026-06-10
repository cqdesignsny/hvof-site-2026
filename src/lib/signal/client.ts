import "server-only";
import { mockBrief, mockRecommendations, mockSnapshot } from "./mock";
import type {
  SignalBrief,
  SignalRange,
  SignalRecommendations,
  SignalSnapshot,
} from "./types";

const BUSINESS_SLUG = "hudson-valley-office-furniture";

const SIGNAL_API_BASE = process.env.SIGNAL_API_BASE;
const SIGNAL_API_KEY = process.env.SIGNAL_API_KEY;

export const SIGNAL_MODE: "live" | "mock" =
  SIGNAL_API_BASE && SIGNAL_API_KEY ? "live" : "mock";

function authHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${SIGNAL_API_KEY ?? ""}`,
    Accept: "application/json",
  };
}

async function getJson<T>(path: string): Promise<T> {
  const url = `${SIGNAL_API_BASE}${path}`;
  const res = await fetch(url, {
    headers: authHeaders(),
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`Signal request failed: ${res.status} ${res.statusText} on ${path}`);
  }
  return (await res.json()) as T;
}

async function getText(path: string): Promise<string> {
  const url = `${SIGNAL_API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { ...authHeaders(), Accept: "text/markdown" },
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`Signal request failed: ${res.status} ${res.statusText} on ${path}`);
  }
  return await res.text();
}

// Signal's v1 JSON API wraps every payload in an envelope: { data, meta }.
// The snapshot / recommendations live under `data`. (The brief endpoint
// returns raw markdown, so it isn't enveloped.)
type Envelope<T> = { data: T };

export async function fetchSnapshot(range: SignalRange): Promise<SignalSnapshot> {
  if (SIGNAL_MODE === "mock") return mockSnapshot(range);
  const res = await getJson<Envelope<SignalSnapshot>>(
    `/api/v1/businesses/${BUSINESS_SLUG}/snapshot?range=${range}`,
  );
  return res.data;
}

export async function fetchRecommendations(
  range: SignalRange,
): Promise<SignalRecommendations> {
  if (SIGNAL_MODE === "mock") return mockRecommendations(range);
  const res = await getJson<Envelope<SignalRecommendations>>(
    `/api/v1/businesses/${BUSINESS_SLUG}/recommendations?range=${range}`,
  );
  return res.data;
}

export async function fetchBrief(range: SignalRange): Promise<SignalBrief> {
  if (SIGNAL_MODE === "mock") {
    return {
      markdown: mockBrief(range),
      generated_at: new Date().toISOString(),
    };
  }
  const markdown = await getText(
    `/api/v1/businesses/${BUSINESS_SLUG}/brief?range=${range}`,
  );
  return { markdown, generated_at: new Date().toISOString() };
}
