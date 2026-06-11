/**
 * Stores the latest report payload Signal pushed for a business. One row per
 * business slug (the newest push overwrites the previous). The admin report
 * page renders straight from this, so it never calls Signal live.
 *
 * Postgres-backed via Neon when DATABASE_URL is set, with an in-memory fallback
 * for local dev so /admin works without a DB. Schema is created lazily on first
 * use. Mirrors the convention in src/lib/leads-store.ts.
 */

import { neon } from "@neondatabase/serverless";

export type StoredReport = {
  businessSlug: string;
  receivedAt: string;
  /** The ReportPushPayload from Signal. Typed against the contract when the
   *  render step lands; stored opaquely here so receiving never blocks on shape. */
  payload: unknown;
};

const globalForReports = globalThis as unknown as {
  __signalReports?: Map<string, StoredReport>;
};
const memStore: Map<string, StoredReport> =
  globalForReports.__signalReports ?? (globalForReports.__signalReports = new Map());

function getDbUrl(): string | null {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url || url.trim() === "") return null;
  return url;
}

let schemaReady: Promise<void> | null = null;

function ensureSchema(dbUrl: string): Promise<void> {
  if (schemaReady) return schemaReady;
  const sql = neon(dbUrl);
  schemaReady = (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS signal_reports (
        business_slug text PRIMARY KEY,
        received_at timestamptz NOT NULL DEFAULT now(),
        payload jsonb NOT NULL
      )
    `;
  })().catch((err) => {
    schemaReady = null;
    throw err;
  });
  return schemaReady;
}

export async function saveReceivedReport(
  businessSlug: string,
  payload: unknown,
): Promise<void> {
  const receivedAt = new Date().toISOString();
  const dbUrl = getDbUrl();
  if (dbUrl) {
    try {
      await ensureSchema(dbUrl);
      const sql = neon(dbUrl);
      await sql`
        INSERT INTO signal_reports (business_slug, received_at, payload)
        VALUES (${businessSlug}, ${receivedAt}, ${JSON.stringify(payload)}::jsonb)
        ON CONFLICT (business_slug)
        DO UPDATE SET received_at = EXCLUDED.received_at, payload = EXCLUDED.payload
      `;
      return;
    } catch (err) {
      console.error(
        "[signal-reports] DB upsert failed, falling back to memory",
        err,
      );
    }
  }
  memStore.set(businessSlug, { businessSlug, receivedAt, payload });
}

export async function getReceivedReport(
  businessSlug: string,
): Promise<StoredReport | null> {
  const dbUrl = getDbUrl();
  if (dbUrl) {
    try {
      await ensureSchema(dbUrl);
      const sql = neon(dbUrl);
      const rows = await sql`
        SELECT business_slug, received_at, payload
        FROM signal_reports
        WHERE business_slug = ${businessSlug}
        LIMIT 1
      `;
      const row = rows[0] as Record<string, unknown> | undefined;
      if (!row) return null;
      return {
        businessSlug: String(row.business_slug),
        receivedAt:
          row.received_at instanceof Date
            ? row.received_at.toISOString()
            : String(row.received_at),
        payload: row.payload,
      };
    } catch (err) {
      console.error(
        "[signal-reports] DB read failed, falling back to memory",
        err,
      );
    }
  }
  return memStore.get(businessSlug) ?? null;
}
