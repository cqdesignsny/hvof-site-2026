import { BookOpen, Plus } from "lucide-react";

export const metadata = { title: "Knowledge Base" };

const PLACEHOLDER_TOPICS = [
  {
    title: "Lead times by line",
    body: "In-stock, custom-upholstery, and special-order timelines per manufacturer.",
  },
  {
    title: "NYS contract eligibility",
    body: "Who qualifies, how to get on contract pricing, and which manufacturers we represent.",
  },
  {
    title: "Showroom logistics",
    body: "Hours, parking, sit-test policy, what to bring to a visit, and how appointments work.",
  },
  {
    title: "Delivery + install",
    body: "Crew composition, scheduling windows, building-access requirements, and post-install support.",
  },
  {
    title: "Pre-owned program",
    body: "Inspection process, in-house warranty, what we accept on trade-in.",
  },
  {
    title: "Custom upholstery",
    body: "COM/COL options, sample books we keep, color-matching capability per manufacturer.",
  },
];

export default function KnowledgeBasePage() {
  return (
    <div className="px-4 py-8 md:px-10 md:py-12 lg:px-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/50">
            Source of truth
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Knowledge base
          </h1>
          <p className="mt-3 max-w-2xl text-foreground/70">
            Articles the team and agents draw from. Topics below are planned. Wire a CMS or Markdown source to populate.
          </p>
        </div>
        <button
          type="button"
          disabled
          className="inline-flex h-11 items-center gap-1.5 rounded-full bg-foreground px-5 text-sm font-semibold text-background opacity-60 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
          New article
        </button>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PLACEHOLDER_TOPICS.map((t) => (
          <article
            key={t.title}
            className="rounded-2xl border border-foreground/10 bg-background p-5 transition-colors hover:border-foreground/30"
          >
            <BookOpen className="h-5 w-5 text-foreground/50" />
            <h2 className="mt-4 font-display text-lg font-semibold leading-tight tracking-tight md:text-xl">
              {t.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/65">
              {t.body}
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/35">
              Draft. Not published.
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
