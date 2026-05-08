import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

interface QuoteItem {
  sku: string;
  name: string;
  qty: number;
  price: number;
}

/**
 * Quote-cart submission endpoint. Receives the cart + contact info,
 * logs it, and emails the team if Resend is configured.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown> = {};
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const items = (payload.items as QuoteItem[]) ?? [];
  const contact = (payload.contact as Record<string, string>) ?? {};
  const estimatedTotal = (payload.estimatedTotal as number) ?? 0;

  // Honeypot — if name or email missing, treat as bot
  if (!contact.name || !contact.email) {
    return NextResponse.json({ error: "Missing contact info" }, { status: 422 });
  }

  // eslint-disable-next-line no-console
  console.log("[quote-request]", {
    name: contact.name,
    company: contact.company,
    email: contact.email,
    phone: contact.phone,
    timeline: contact.timeline,
    itemCount: items.length,
    estimatedTotal,
    receivedAt: new Date().toISOString(),
  });

  // Optional: forward via Resend
  if (process.env.RESEND_API_KEY && process.env.LEAD_EMAIL_TO) {
    const itemLines = items.map(
      (i) => `  - ${i.qty}× ${i.name} (${i.sku}) @ $${i.price.toLocaleString()}`,
    );
    const body = [
      `New quote request from ${contact.name}${contact.company ? ` at ${contact.company}` : ""}`,
      ``,
      `Email: ${contact.email}`,
      contact.phone ? `Phone: ${contact.phone}` : null,
      contact.timeline ? `Timeline: ${contact.timeline}` : null,
      ``,
      `Items (${items.length}):`,
      ...itemLines,
      ``,
      `Estimated subtotal at list: $${estimatedTotal.toLocaleString()}`,
      ``,
      contact.notes ? `Notes:\n${contact.notes}` : null,
      ``,
      `— Submitted via ${SITE.url}/quote`,
    ]
      .filter(Boolean)
      .join("\n");

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
          reply_to: contact.email,
          subject: `Quote request: ${items.length} item${items.length === 1 ? "" : "s"} from ${contact.name}`,
          text: body,
        }),
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[quote] resend error", err);
    }
  }

  return NextResponse.json({ ok: true });
}
