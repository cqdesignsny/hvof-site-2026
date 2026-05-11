"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ClipboardCopy, Send, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  TRAINING_SECTIONS,
  countAnsweredInSection,
  isAnswered,
  type TrainingAnswers,
  type TrainingQuestion,
  type TrainingSection,
} from "@/lib/training-questions";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "hvof-training-draft-v1";

interface DraftState {
  submitterName: string;
  submitterEmail: string;
  submitterRole: string;
  answers: TrainingAnswers;
}

const INITIAL_STATE: DraftState = {
  submitterName: "",
  submitterEmail: "",
  submitterRole: "",
  answers: {},
};

const TOTAL_QUESTIONS = TRAINING_SECTIONS.reduce((n, s) => n + s.questions.length, 0);

export function TrainingForm() {
  const [state, setState] = useState<DraftState>(INITIAL_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ markdown: string } | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DraftState;
        if (parsed && typeof parsed === "object") {
          setState({
            submitterName: parsed.submitterName ?? "",
            submitterEmail: parsed.submitterEmail ?? "",
            submitterRole: parsed.submitterRole ?? "",
            answers: parsed.answers ?? {},
          });
        }
      }
    } catch {
      // ignore corrupt drafts
    }
    setHydrated(true);
  }, []);

  // Debounced autosave
  useEffect(() => {
    if (!hydrated) return;
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // quota or private mode. Ignore.
      }
    }, 350);
    return () => window.clearTimeout(id);
  }, [state, hydrated]);

  function setSubmitter<K extends "submitterName" | "submitterEmail" | "submitterRole">(
    key: K,
    value: string,
  ) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function setAnswer(questionId: string, value: string | string[]) {
    setState((prev) => ({ ...prev, answers: { ...prev.answers, [questionId]: value } }));
  }

  function toggleAnswer(questionId: string, value: string) {
    setState((prev) => {
      const current = prev.answers[questionId];
      const arr = Array.isArray(current) ? current : [];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, answers: { ...prev.answers, [questionId]: next } };
    });
  }

  const totalAnswered = useMemo(
    () => TRAINING_SECTIONS.reduce((n, s) => n + countAnsweredInSection(s, state.answers), 0),
    [state.answers],
  );

  const submitterValid =
    state.submitterName.trim().length > 0 && /.+@.+\..+/.test(state.submitterEmail);

  async function submit() {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/training", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (!res.ok) {
        const data: { error?: string } = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong. Try again.");
        setSubmitting(false);
        return;
      }
      const data: { markdown?: string } = await res.json();
      setResult({ markdown: data.markdown ?? "" });
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Could not reach the server. Try again.");
    }
    setSubmitting(false);
  }

  function startOver() {
    setState(INITIAL_STATE);
    setResult(null);
    setError(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  if (result) {
    return <SuccessView markdown={result.markdown} onStartOver={startOver} />;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!submitterValid || submitting) return;
        submit();
      }}
      className="space-y-10"
    >
      <HeaderBlock totalAnswered={totalAnswered} />

      <SubmitterCard
        name={state.submitterName}
        email={state.submitterEmail}
        role={state.submitterRole}
        setName={(v) => setSubmitter("submitterName", v)}
        setEmail={(v) => setSubmitter("submitterEmail", v)}
        setRole={(v) => setSubmitter("submitterRole", v)}
      />

      <SectionToc answers={state.answers} />

      <div className="space-y-8">
        {TRAINING_SECTIONS.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            answers={state.answers}
            setAnswer={setAnswer}
            toggleAnswer={toggleAnswer}
          />
        ))}
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <SubmitBar
        canSubmit={submitterValid && !submitting}
        submitting={submitting}
        totalAnswered={totalAnswered}
        submitterValid={submitterValid}
      />
    </form>
  );
}

// ---------- Header + progress ----------

function HeaderBlock({ totalAnswered }: { totalAnswered: number }) {
  const pct = Math.min(100, Math.round((totalAnswered / TOTAL_QUESTIONS) * 100));
  return (
    <header>
      <p
        className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em]"
        style={{ color: "var(--brand-yellow)" }}
      >
        Floorplan / Agent training
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        Train the HVOF agent.
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/70">
        Answer what you can. When you hit send, a markdown file goes to Cesar so he can hand it off
        to Claude to start building the agent. Draft saves to this browser as you type, so you can
        come back later.
      </p>
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/55">
            Progress
          </p>
          <p className="font-mono text-xs text-foreground/70">
            {totalAnswered} of {TOTAL_QUESTIONS} questions ({pct}%)
          </p>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-foreground/10">
          <div
            className="h-full transition-[width] duration-300 ease-out"
            style={{ width: `${pct}%`, backgroundColor: "var(--brand-yellow)" }}
          />
        </div>
      </div>
    </header>
  );
}

// ---------- Submitter card ----------

function SubmitterCard({
  name,
  email,
  role,
  setName,
  setEmail,
  setRole,
}: {
  name: string;
  email: string;
  role: string;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setRole: (v: string) => void;
}) {
  return (
    <section className="rounded-2xl border border-foreground/10 bg-background p-6 md:p-8">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
        Who&apos;s answering this?
      </p>
      <h2 className="mt-2 font-display text-xl font-semibold tracking-tight md:text-2xl">
        So Cesar knows who to thank.
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor="submitter-name" className="text-xs font-semibold uppercase tracking-wider text-foreground/65">
            Name
            <span aria-hidden className="ml-1" style={{ color: "var(--brand-yellow)" }}>*</span>
          </Label>
          <Input
            id="submitter-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            className="mt-2 h-11"
          />
        </div>
        <div>
          <Label htmlFor="submitter-email" className="text-xs font-semibold uppercase tracking-wider text-foreground/65">
            Email
            <span aria-hidden className="ml-1" style={{ color: "var(--brand-yellow)" }}>*</span>
          </Label>
          <Input
            id="submitter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="mt-2 h-11"
          />
        </div>
        <div>
          <Label htmlFor="submitter-role" className="text-xs font-semibold uppercase tracking-wider text-foreground/65">
            Role
          </Label>
          <Input
            id="submitter-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Sales, ops, owner..."
            className="mt-2 h-11"
          />
        </div>
      </div>
    </section>
  );
}

// ---------- Section TOC ----------

function SectionToc({ answers }: { answers: TrainingAnswers }) {
  return (
    <nav
      aria-label="Section list"
      className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 md:p-5"
    >
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
        Sections
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {TRAINING_SECTIONS.map((section, i) => {
          const answered = countAnsweredInSection(section, answers);
          const total = section.questions.length;
          const done = answered === total;
          const started = answered > 0;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  done
                    ? "border-foreground bg-foreground text-background"
                    : started
                      ? "border-foreground/40 bg-background text-foreground hover:border-foreground"
                      : "border-foreground/15 bg-background text-foreground/70 hover:border-foreground/40 hover:text-foreground",
                )}
              >
                <span className="font-mono text-[10px] opacity-70">{i + 1}.</span>
                <span>{section.title}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 font-mono text-[10px]",
                    done ? "bg-background/15" : "bg-foreground/8",
                  )}
                >
                  {answered}/{total}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ---------- Section card ----------

function SectionCard({
  section,
  answers,
  setAnswer,
  toggleAnswer,
}: {
  section: TrainingSection;
  answers: TrainingAnswers;
  setAnswer: (id: string, value: string | string[]) => void;
  toggleAnswer: (id: string, value: string) => void;
}) {
  const answered = countAnsweredInSection(section, answers);
  const total = section.questions.length;
  return (
    <section
      id={section.id}
      className="scroll-mt-24 rounded-2xl border border-foreground/10 bg-background p-6 md:p-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-foreground/10 pb-5">
        <div>
          {section.eyebrow ? (
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/50">
              {section.eyebrow}
            </p>
          ) : null}
          <h2 className="mt-1 font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
            {section.title}
          </h2>
          {section.intro ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/65">{section.intro}</p>
          ) : null}
        </div>
        <span className="rounded-full bg-foreground/5 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65">
          {answered}/{total} answered
        </span>
      </div>

      <div className="mt-6 space-y-7">
        {section.questions.map((question) => (
          <QuestionField
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChangeString={(v) => setAnswer(question.id, v)}
            onToggle={(v) => toggleAnswer(question.id, v)}
            onSetMulti={(v) => setAnswer(question.id, v)}
          />
        ))}
      </div>
    </section>
  );
}

// ---------- Question field ----------

function QuestionField({
  question,
  value,
  onChangeString,
  onToggle,
  onSetMulti,
}: {
  question: TrainingQuestion;
  value: string | string[] | undefined;
  onChangeString: (v: string) => void;
  onToggle: (v: string) => void;
  onSetMulti: (v: string[]) => void;
}) {
  const answered = isAnswered(value);
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <Label className="text-sm font-semibold leading-snug text-foreground">
          {question.label}
          {question.optional ? (
            <span className="ml-2 font-mono text-[10px] font-medium uppercase tracking-wider text-foreground/45">
              optional
            </span>
          ) : null}
        </Label>
        {answered ? (
          <span
            className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--brand-yellow)" }}
          >
            <Check className="h-3 w-3" strokeWidth={3} />
            Answered
          </span>
        ) : null}
      </div>
      {question.helper ? (
        <p className="mt-1 text-xs leading-relaxed text-foreground/55">{question.helper}</p>
      ) : null}

      <div className="mt-3">
        {question.type === "shorttext" ? (
          <Input
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChangeString(e.target.value)}
            placeholder={question.placeholder}
            className="h-11"
          />
        ) : question.type === "textarea" ? (
          <Textarea
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChangeString(e.target.value)}
            rows={question.rows ?? 4}
            placeholder={question.placeholder}
          />
        ) : question.type === "radio" ? (
          <ChipRow
            options={question.options ?? []}
            value={typeof value === "string" ? value : ""}
            onChange={(v) => onChangeString(v)}
          />
        ) : question.type === "multiselect" ? (
          <ChipRow
            options={question.options ?? []}
            values={Array.isArray(value) ? value : []}
            onToggle={onToggle}
            multi
            onClear={() => onSetMulti([])}
          />
        ) : null}
      </div>
    </div>
  );
}

// ---------- Chip row (used for radio + multiselect) ----------

function ChipRow(props: {
  options: readonly string[];
  value?: string;
  values?: string[];
  multi?: boolean;
  onChange?: (v: string) => void;
  onToggle?: (v: string) => void;
  onClear?: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {props.options.map((opt) => {
        const checked = props.multi
          ? (props.values ?? []).includes(opt)
          : props.value === opt;
        return (
          <button
            type="button"
            key={opt}
            onClick={() => {
              if (props.multi) props.onToggle?.(opt);
              else props.onChange?.(opt);
            }}
            aria-pressed={checked}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-all",
              checked
                ? "border-foreground bg-foreground text-background"
                : "border-foreground/15 bg-background text-foreground/80 hover:border-foreground/45 hover:text-foreground",
            )}
          >
            {checked ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
            <span>{opt}</span>
          </button>
        );
      })}
      {props.multi && (props.values ?? []).length > 0 ? (
        <button
          type="button"
          onClick={props.onClear}
          className="rounded-full px-3 py-2 text-xs font-medium text-foreground/55 hover:text-foreground"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}

// ---------- Submit bar ----------

function SubmitBar({
  canSubmit,
  submitting,
  totalAnswered,
  submitterValid,
}: {
  canSubmit: boolean;
  submitting: boolean;
  totalAnswered: number;
  submitterValid: boolean;
}) {
  return (
    <div className="sticky bottom-4 z-10 rounded-2xl border-2 border-foreground bg-background p-4 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.35)] md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-display text-base font-semibold leading-tight">
            {totalAnswered} of {TOTAL_QUESTIONS} answered
          </p>
          <p className="text-xs text-foreground/60">
            {submitterValid
              ? "Partial sends are fine. We can do follow-up rounds."
              : "Fill in your name and email above to enable sending."}
          </p>
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className={cn(
            "inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-all md:h-14 md:px-8 md:text-base",
            "hover:bg-foreground/90",
            "disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          {submitting ? "Sending..." : "Send to Cesar"}
          {submitting ? null : <Send className="h-4 w-4 md:h-5 md:w-5" />}
        </button>
      </div>
    </div>
  );
}

// ---------- Success view ----------

function SuccessView({ markdown, onStartOver }: { markdown: string; onStartOver: () => void }) {
  const [copied, setCopied] = useState(false);

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore
    }
  }

  function downloadMarkdown() {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hvof-agent-training-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div
        className="rounded-2xl border-2 p-6 md:p-8"
        style={{ borderColor: "var(--brand-yellow)" }}
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-foreground text-background">
          <Sparkles className="h-6 w-6" />
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          Sent. The training packet is on its way to Cesar.
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/70">
          The markdown is attached to the email and pasted below. You can also copy or download it
          and forward it any way you like.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copyMarkdown}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background hover:bg-foreground/90"
          >
            {copied ? <Check className="h-4 w-4" strokeWidth={3} /> : <ClipboardCopy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy markdown"}
          </button>
          <button
            type="button"
            onClick={downloadMarkdown}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-foreground/20 bg-background px-5 text-sm font-semibold hover:border-foreground/50"
          >
            Download .md
          </button>
          <button
            type="button"
            onClick={onStartOver}
            className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-foreground/65 hover:text-foreground"
          >
            Start a new one
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 md:p-6">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
          Preview
        </p>
        <pre className="mt-3 max-h-[60vh] overflow-auto whitespace-pre-wrap break-words rounded-xl bg-background p-4 font-mono text-xs leading-relaxed text-foreground/85 ring-1 ring-foreground/10">
          {markdown}
        </pre>
      </div>
    </div>
  );
}
