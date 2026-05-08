import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

/**
 * Lead intake endpoint. For tonight's demo this just logs and (optionally) emails via Resend if RESEND_API_KEY is set.
 * Wire your preferred provider once the form fields are locked in.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown> = {};
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot check. reject if a hidden field is filled by a bot.
  if (payload.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const { name, email, phone, company, projectType, message } = payload as {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    projectType?: string;
    message?: string;
  };

  if (!name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
  }

  // eslint-disable-next-line no-console
  console.log("[lead]", {
    name,
    email,
    phone,
    company,
    projectType,
    message: message?.slice(0, 200),
    receivedAt: new Date().toISOString(),
  });

  // Optional: send via Resend if configured.
  if (process.env.RESEND_API_KEY && process.env.LEAD_EMAIL_TO) {
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
          subject: `New lead from ${name}${company ? ` (${company})` : ""}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            phone ? `Phone: ${phone}` : null,
            company ? `Company: ${company}` : null,
            projectType ? `Project: ${projectType}` : null,
            message ? `\n${message}` : null,
            `\n. Submitted via ${SITE.url}/contact`,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[lead] resend error", err);
    }
  }

  return NextResponse.json({ ok: true });
}
