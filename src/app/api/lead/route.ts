import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { recordLead } from "@/lib/leads-store";
import { ingestLeadToSignal } from "@/lib/signal/lead-ingest";

type FormType = "main-lead" | "sell-furniture" | "giveaway";

const SUBJECT_TAG: Record<FormType, string> = {
  "main-lead": "[Lead]",
  "sell-furniture": "[Sell to Us]",
  giveaway: "[Giveaway Entry]",
};

const SUBMITTED_VIA: Record<FormType, string> = {
  "main-lead": "/contact",
  "sell-furniture": "/sell-your-furniture",
  giveaway: "/giveaway",
};

// Keys we never want to echo back into the email body.
const INTERNAL_KEYS = new Set(["formType", "website"]);

export async function POST(request: Request) {
  let payload: Record<string, unknown> = {};
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot. silently accept and drop bot submissions.
  if (payload.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const formType: FormType = isFormType(payload.formType) ? payload.formType : "main-lead";

  const firstName = trimmed(payload.firstName);
  const lastName = trimmed(payload.lastName);
  const email = trimmed(payload.email);
  const company = trimmed(payload.company);
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || trimmed(payload.name);

  if (!fullName || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
  }

  console.log(`[lead] ${SUBJECT_TAG[formType]}`, {
    formType,
    name: fullName,
    email,
    receivedAt: new Date().toISOString(),
  });

  // Persist for the Floorplan admin lead pipeline. In-memory until Vercel KV is wired.
  try {
    const stored = await recordLead(payload);
    ingestLeadToSignal(stored, payload);
  } catch (err) {
    console.error("[lead] recordLead error", err);
  }

  if (process.env.RESEND_API_KEY && process.env.LEAD_EMAIL_TO) {
    const lines = buildEmailLines(payload);
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_EMAIL_FROM ?? "HVOF Site <noreply@thewowguys.com>",
          to: [process.env.LEAD_EMAIL_TO],
          reply_to: email,
          subject: `${SUBJECT_TAG[formType]} ${fullName}${company ? ` (${company})` : ""}`,
          tags: [{ name: "form_type", value: formType }],
          text: [...lines, ``, `Submitted via ${SITE.url}${SUBMITTED_VIA[formType]}`].join("\n"),
        }),
      });
    } catch (err) {
      console.error("[lead] resend error", err);
    }
  }

  return NextResponse.json({ ok: true });
}

function trimmed(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function isFormType(v: unknown): v is FormType {
  return v === "main-lead" || v === "sell-furniture" || v === "giveaway";
}

function buildEmailLines(payload: Record<string, unknown>): string[] {
  return Object.entries(payload)
    .filter(([key, value]) => !INTERNAL_KEYS.has(key) && hasValue(value))
    .map(([key, value]) => `${humanize(key)}: ${formatValue(value)}`);
}

function hasValue(v: unknown): boolean {
  if (v == null) return false;
  if (typeof v === "string") return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  return true;
}

function formatValue(v: unknown): string {
  if (Array.isArray(v)) return v.map(String).join(", ");
  return String(v);
}

function humanize(key: string): string {
  // firstName -> First Name, hearAbout -> Hear About
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}
