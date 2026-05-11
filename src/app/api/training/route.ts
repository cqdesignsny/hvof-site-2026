import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import {
  TRAINING_SECTIONS,
  type TrainingAnswers,
  type TrainingQuestion,
  type TrainingSection,
  isAnswered,
} from "@/lib/training-questions";
import { recordTrainingSubmission } from "@/lib/training-store";

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot
  if (body.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const submitterName = trimmed(body.submitterName);
  const submitterEmail = trimmed(body.submitterEmail);
  const submitterRole = trimmed(body.submitterRole);
  const answers = isAnswersShape(body.answers) ? body.answers : {};

  if (!submitterName || !submitterEmail) {
    return NextResponse.json(
      { error: "Submitter name and email are required." },
      { status: 422 },
    );
  }

  const submittedAt = new Date();
  const markdown = buildMarkdown({
    submitterName,
    submitterEmail,
    submitterRole,
    submittedAt,
    answers,
  });

  // Persist first so a Resend hiccup doesn't lose the work.
  let submissionId = "(not stored)";
  try {
    const stored = await recordTrainingSubmission({
      submitterName,
      submitterEmail,
      submitterRole: submitterRole || undefined,
      answers,
      markdown,
    });
    submissionId = stored.id;
  } catch (err) {
    console.error("[training] recordTrainingSubmission failed", err);
  }

  if (process.env.RESEND_API_KEY && process.env.LEAD_EMAIL_TO) {
    const filename = buildFilename(submitterName, submittedAt);
    const subject = `[Agent Training] ${submitterName}${submitterRole ? ` (${submitterRole})` : ""}`;
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_EMAIL_FROM ?? "HVOF Site <noreply@thewowguys.com>",
          to: [process.env.LEAD_EMAIL_TO],
          reply_to: submitterEmail,
          subject,
          tags: [{ name: "form_type", value: "agent-training" }],
          text: emailBody(submitterName, submitterEmail, submitterRole, markdown),
          attachments: [
            {
              filename,
              content: Buffer.from(markdown, "utf8").toString("base64"),
            },
          ],
        }),
      });
      if (!res.ok) {
        console.error("[training] resend non-ok", res.status, await res.text());
      }
    } catch (err) {
      console.error("[training] resend error", err);
    }
  }

  return NextResponse.json({ ok: true, id: submissionId, markdown });
}

function trimmed(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function isAnswersShape(v: unknown): v is TrainingAnswers {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  return Object.values(v as Record<string, unknown>).every(
    (val) => typeof val === "string" || (Array.isArray(val) && val.every((x) => typeof x === "string")),
  );
}

function emailBody(name: string, email: string, role: string, markdown: string): string {
  return [
    `Agent training questionnaire submitted by ${name} (${email})${role ? ` — ${role}` : ""}.`,
    ``,
    `The markdown is attached and pasted below.`,
    `Forward this to Claude to start building the agent.`,
    ``,
    `--- BEGIN MARKDOWN ---`,
    ``,
    markdown,
    ``,
    `--- END MARKDOWN ---`,
    ``,
    `Submitted via ${SITE.url}/admin/training`,
  ].join("\n");
}

function buildFilename(name: string, when: Date): string {
  const date = when.toISOString().slice(0, 10);
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "submission";
  return `hvof-agent-training-${date}-${slug}.md`;
}

function buildMarkdown(input: {
  submitterName: string;
  submitterEmail: string;
  submitterRole: string;
  submittedAt: Date;
  answers: TrainingAnswers;
}): string {
  const { submitterName, submitterEmail, submitterRole, submittedAt, answers } = input;
  const lines: string[] = [];

  lines.push(`# HVOF Agent Training Responses`);
  lines.push(``);
  lines.push(`- Submitted: ${submittedAt.toISOString().replace("T", " ").slice(0, 16)} UTC`);
  lines.push(`- Submitter: ${submitterName} <${submitterEmail}>`);
  if (submitterRole) lines.push(`- Role: ${submitterRole}`);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);

  for (const section of TRAINING_SECTIONS) {
    lines.push(`## ${section.title}`);
    if (section.intro) {
      lines.push(``);
      lines.push(`_${section.intro}_`);
    }
    lines.push(``);

    const sectionAnswered = section.questions.some((q) => isAnswered(answers[q.id]));
    if (!sectionAnswered) {
      lines.push(`_No answers recorded for this section._`);
      lines.push(``);
      continue;
    }

    for (const question of section.questions) {
      const value = answers[question.id];
      lines.push(`### ${question.label}`);
      lines.push(``);
      lines.push(formatAnswer(question, value));
      lines.push(``);
    }
  }

  return lines.join("\n");
}

function formatAnswer(question: TrainingQuestion, value: string | string[] | undefined): string {
  if (!isAnswered(value)) return "_Not answered._";
  if (Array.isArray(value)) {
    return value.map((v) => `- ${v}`).join("\n");
  }
  const text = String(value).trim();
  // Multi-line answers stay as-is. Single-line answers stay as a paragraph.
  return text;
}

// Helper: re-export the section list shape so other modules can read without importing both files.
export type { TrainingSection };
