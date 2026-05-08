/**
 * Lead store. In-memory for now, with a single seam (recordLead/listLeads)
 * so we can swap in Vercel KV / Upstash Redis or Postgres later without
 * touching call sites.
 *
 * Production caveat: in serverless environments each lambda has its own
 * memory. To make this durable, wire up a Marketplace KV / Postgres
 * integration and replace the implementations below.
 */

export type LeadFormType = "main-lead" | "sell-furniture" | "giveaway";

export interface StoredLead {
  id: string;
  receivedAt: string;
  formType: LeadFormType;
  // Common fields
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  // Branching / extras
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
  // Catch-all for fields we add later
  [key: string]: unknown;
}

// Pin the in-memory store to globalThis so Next.js hot-reload (and shared
// module caches between server components and route handlers) preserve it.
// This is still per-process: in serverless production, multiple lambdas
// each have their own copy. Wire Vercel KV / Postgres for true durability.
const globalForLeads = globalThis as unknown as { __hvofLeads?: StoredLead[] };
const store: StoredLead[] = globalForLeads.__hvofLeads ?? (globalForLeads.__hvofLeads = []);
const MAX = 1000;

function id(): string {
  // Short, sortable lead id. Timestamp-prefix + random suffix.
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${ts}-${rand}`;
}

export async function recordLead(payload: Record<string, unknown>): Promise<StoredLead> {
  const formType = (payload.formType as LeadFormType) ?? "main-lead";
  const lead: StoredLead = {
    id: id(),
    receivedAt: new Date().toISOString(),
    formType,
    ...payload,
  };
  store.unshift(lead);
  if (store.length > MAX) store.length = MAX;
  return lead;
}

export async function listLeads(opts: { limit?: number; formType?: LeadFormType } = {}): Promise<StoredLead[]> {
  const { limit = 100, formType } = opts;
  const filtered = formType ? store.filter((l) => l.formType === formType) : store;
  return filtered.slice(0, limit);
}

export async function getLeadCount(): Promise<{ total: number; byType: Record<LeadFormType, number> }> {
  const byType: Record<LeadFormType, number> = {
    "main-lead": 0,
    "sell-furniture": 0,
    giveaway: 0,
  };
  for (const l of store) {
    byType[l.formType] = (byType[l.formType] ?? 0) + 1;
  }
  return { total: store.length, byType };
}
