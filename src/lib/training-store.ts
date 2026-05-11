/**
 * Training submissions store. Mirrors the leads-store pattern:
 * Neon when DATABASE_URL is set, in-memory fallback otherwise.
 *
 * Each submission is one team member's completed (or partial) questionnaire,
 * with the rendered markdown stored alongside the structured answers so we
 * can re-export the file later without re-rendering from logic that may have
 * drifted.
 */

import { neon } from "@neondatabase/serverless";
import type { TrainingAnswers } from "@/lib/training-questions";

export interface StoredTrainingSubmission {
  id: string;
  receivedAt: string;
  submitterName: string;
  submitterEmail: string;
  submitterRole?: string;
  answers: TrainingAnswers;
  markdown: string;
}

const globalForTraining = globalThis as unknown as {
  __hvofTraining?: StoredTrainingSubmission[];
};
const memStore: StoredTrainingSubmission[] =
  globalForTraining.__hvofTraining ?? (globalForTraining.__hvofTraining = []);
const MEM_MAX = 500;

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
      CREATE TABLE IF NOT EXISTS training_submissions (
        id text PRIMARY KEY,
        received_at timestamptz NOT NULL DEFAULT now(),
        submitter_name text,
        submitter_email text,
        submitter_role text,
        answers jsonb NOT NULL DEFAULT '{}'::jsonb,
        markdown text NOT NULL DEFAULT ''
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_training_received_at ON training_submissions (received_at DESC)`;
  })().catch((err) => {
    schemaReady = null;
    throw err;
  });
  return schemaReady;
}

function newId(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${ts}-${rand}`;
}

export async function recordTrainingSubmission(input: {
  submitterName: string;
  submitterEmail: string;
  submitterRole?: string;
  answers: TrainingAnswers;
  markdown: string;
}): Promise<StoredTrainingSubmission> {
  const submission: StoredTrainingSubmission = {
    id: newId(),
    receivedAt: new Date().toISOString(),
    submitterName: input.submitterName,
    submitterEmail: input.submitterEmail,
    submitterRole: input.submitterRole,
    answers: input.answers,
    markdown: input.markdown,
  };

  const dbUrl = getDbUrl();
  if (dbUrl) {
    try {
      await ensureSchema(dbUrl);
      const sql = neon(dbUrl);
      await sql`
        INSERT INTO training_submissions (id, received_at, submitter_name, submitter_email, submitter_role, answers, markdown)
        VALUES (
          ${submission.id},
          ${submission.receivedAt},
          ${submission.submitterName},
          ${submission.submitterEmail},
          ${submission.submitterRole ?? null},
          ${JSON.stringify(submission.answers)}::jsonb,
          ${submission.markdown}
        )
      `;
      return submission;
    } catch (err) {
      console.error("[training-store] DB insert failed, falling back to memory", err);
    }
  }

  memStore.unshift(submission);
  if (memStore.length > MEM_MAX) memStore.length = MEM_MAX;
  return submission;
}

export async function listTrainingSubmissions(limit = 50): Promise<StoredTrainingSubmission[]> {
  const dbUrl = getDbUrl();
  if (dbUrl) {
    try {
      await ensureSchema(dbUrl);
      const sql = neon(dbUrl);
      const rows = (await sql`
        SELECT id, received_at, submitter_name, submitter_email, submitter_role, answers, markdown
        FROM training_submissions
        ORDER BY received_at DESC
        LIMIT ${limit}
      `) as Record<string, unknown>[];
      return rows.map((r) => ({
        id: String(r.id),
        receivedAt:
          r.received_at instanceof Date ? r.received_at.toISOString() : String(r.received_at),
        submitterName: (r.submitter_name as string) ?? "",
        submitterEmail: (r.submitter_email as string) ?? "",
        submitterRole: (r.submitter_role as string) ?? undefined,
        answers: (r.answers as TrainingAnswers) ?? {},
        markdown: (r.markdown as string) ?? "",
      }));
    } catch (err) {
      console.error("[training-store] DB read failed, falling back to memory", err);
    }
  }
  return memStore.slice(0, limit);
}
