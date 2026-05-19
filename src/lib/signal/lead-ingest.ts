import "server-only";
import type { StoredLead } from "@/lib/leads-store";

const BUSINESS_SLUG = "hudson-valley-office-furniture";

/**
 * Fire-and-forget POST of a freshly-stored HVOF lead to CQ Signal's ingest
 * endpoint. No-op when SIGNAL_API_BASE or SIGNAL_API_KEY is unset, so it stays
 * inert until the Signal-side session ships v1 and hands us a key.
 *
 * Signal stays the system of record for cross-channel reporting; HVOF stays
 * the system of record for its own lead pipeline. Both stores diverging
 * temporarily is fine: a daily reconcile job on the Signal side catches drift.
 */
export function ingestLeadToSignal(lead: StoredLead, originalPayload: Record<string, unknown>): void {
  const base = process.env.SIGNAL_API_BASE;
  const key = process.env.SIGNAL_API_KEY;
  if (!base || !key) return;

  const body = {
    business_slug: BUSINESS_SLUG,
    external_id: lead.id,
    source: "hvof-floorplan",
    form_type: lead.formType,
    submitted_at: lead.receivedAt,
    name: [lead.firstName, lead.lastName].filter(Boolean).join(" ") || undefined,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    fields: originalPayload,
  };

  // Fire and forget. We don't block the response on the webhook, and we
  // swallow errors so a Signal outage doesn't surface to the form submitter.
  fetch(`${base}/api/v1/leads/ingest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).catch((err) => {
    console.error("[signal-ingest] webhook failed", err);
  });
}
