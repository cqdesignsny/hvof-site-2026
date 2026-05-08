/**
 * Lead store. Postgres-backed via Neon when DATABASE_URL is set, otherwise
 * an in-memory fallback for local dev so /admin still functions without a DB.
 *
 * Schema is created lazily on first call. The `leads` table is intentionally
 * generous — `payload` (jsonb) catches every field a form submits so we can
 * add new fields to the form without a migration.
 */

import { neon } from "@neondatabase/serverless";

export type LeadFormType = "main-lead" | "sell-furniture" | "giveaway";

export interface StoredLead {
  id: string;
  receivedAt: string;
  formType: LeadFormType;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  audience?: string;
  businessType?: string;
  lookingFor?: string[];
  scope?: string;
  timeline?: string;
  helpWith?: string;
  newOrPreOwned?: string;
  lookingTo?: string;
  preferTo?: string;
  hearAbout?: string;
  notes?: string;
  [key: string]: unknown;
}

// ---------- in-memory fallback (dev only) ----------

const globalForLeads = globalThis as unknown as { __hvofLeads?: StoredLead[] };
const memStore: StoredLead[] = globalForLeads.__hvofLeads ?? (globalForLeads.__hvofLeads = []);
const MEM_MAX = 1000;

// ---------- Postgres path ----------

function getDbUrl(): string | null {
  // Neon's Marketplace integration provisions DATABASE_URL. POSTGRES_URL is the
  // legacy alias, kept around for older code. Prefer DATABASE_URL.
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
      CREATE TABLE IF NOT EXISTS leads (
        id text PRIMARY KEY,
        received_at timestamptz NOT NULL DEFAULT now(),
        form_type text NOT NULL,
        first_name text,
        last_name text,
        email text,
        phone text,
        company text,
        payload jsonb NOT NULL DEFAULT '{}'::jsonb
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_received_at ON leads (received_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_form_type ON leads (form_type)`;
  })().catch((err) => {
    // Reset so the next call retries instead of permanently failing.
    schemaReady = null;
    throw err;
  });
  return schemaReady;
}

function rowToLead(row: Record<string, unknown>): StoredLead {
  const payload = (row.payload as Record<string, unknown>) ?? {};
  return {
    id: String(row.id),
    receivedAt:
      row.received_at instanceof Date
        ? row.received_at.toISOString()
        : String(row.received_at),
    formType: row.form_type as LeadFormType,
    firstName: (payload.firstName as string) ?? (row.first_name as string) ?? undefined,
    lastName: (payload.lastName as string) ?? (row.last_name as string) ?? undefined,
    email: (payload.email as string) ?? (row.email as string) ?? undefined,
    phone: (payload.phone as string) ?? (row.phone as string) ?? undefined,
    company: (payload.company as string) ?? (row.company as string) ?? undefined,
    ...payload,
  } as StoredLead;
}

// ---------- public API ----------

function newId(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${ts}-${rand}`;
}

export async function recordLead(payload: Record<string, unknown>): Promise<StoredLead> {
  const formType = (payload.formType as LeadFormType) ?? "main-lead";
  const id = newId();
  const receivedAt = new Date().toISOString();

  const lead: StoredLead = {
    id,
    receivedAt,
    formType,
    ...payload,
  };

  const dbUrl = getDbUrl();
  if (dbUrl) {
    try {
      await ensureSchema(dbUrl);
      const sql = neon(dbUrl);
      const firstName = typeof payload.firstName === "string" ? payload.firstName : null;
      const lastName = typeof payload.lastName === "string" ? payload.lastName : null;
      const email = typeof payload.email === "string" ? payload.email : null;
      const phone = typeof payload.phone === "string" ? payload.phone : null;
      const company = typeof payload.company === "string" ? payload.company : null;
      await sql`
        INSERT INTO leads (id, received_at, form_type, first_name, last_name, email, phone, company, payload)
        VALUES (${id}, ${receivedAt}, ${formType}, ${firstName}, ${lastName}, ${email}, ${phone}, ${company}, ${JSON.stringify(payload)}::jsonb)
      `;
      return lead;
    } catch (err) {
      console.error("[leads-store] DB insert failed, falling back to memory", err);
    }
  }

  memStore.unshift(lead);
  if (memStore.length > MEM_MAX) memStore.length = MEM_MAX;
  return lead;
}

export async function listLeads(opts: { limit?: number; formType?: LeadFormType } = {}): Promise<StoredLead[]> {
  const { limit = 100, formType } = opts;
  const dbUrl = getDbUrl();
  if (dbUrl) {
    try {
      await ensureSchema(dbUrl);
      const sql = neon(dbUrl);
      const rows = formType
        ? await sql`SELECT * FROM leads WHERE form_type = ${formType} ORDER BY received_at DESC LIMIT ${limit}`
        : await sql`SELECT * FROM leads ORDER BY received_at DESC LIMIT ${limit}`;
      return rows.map((r) => rowToLead(r as Record<string, unknown>));
    } catch (err) {
      console.error("[leads-store] DB read failed, falling back to memory", err);
    }
  }
  const filtered = formType ? memStore.filter((l) => l.formType === formType) : memStore;
  return filtered.slice(0, limit);
}

export async function getLeadCount(): Promise<{ total: number; byType: Record<LeadFormType, number> }> {
  const empty: Record<LeadFormType, number> = {
    "main-lead": 0,
    "sell-furniture": 0,
    giveaway: 0,
  };
  const dbUrl = getDbUrl();
  if (dbUrl) {
    try {
      await ensureSchema(dbUrl);
      const sql = neon(dbUrl);
      const rows = (await sql`
        SELECT form_type, COUNT(*)::int AS count
        FROM leads
        GROUP BY form_type
      `) as { form_type: string; count: number }[];
      let total = 0;
      const byType = { ...empty };
      for (const row of rows) {
        const t = row.form_type as LeadFormType;
        if (t in byType) byType[t] = row.count;
        total += row.count;
      }
      return { total, byType };
    } catch (err) {
      console.error("[leads-store] DB count failed, falling back to memory", err);
    }
  }
  const byType = { ...empty };
  for (const l of memStore) {
    if (l.formType in byType) byType[l.formType] = (byType[l.formType] ?? 0) + 1;
  }
  return { total: memStore.length, byType };
}

export function isUsingDatabase(): boolean {
  return getDbUrl() !== null;
}
