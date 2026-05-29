"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getProductBySku } from "@/lib/products";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const HEAR_OPTIONS = [
  "Google Search or Ad",
  "Facebook",
  "Instagram",
  "LinkedIn",
  "Someone referred me",
  "Drove past the showroom",
  "YouTube",
  "Other",
] as const;

const HELP_OPTIONS = [
  "I need a new chair",
  "I need a Home Office",
  "I want to visit the showroom",
  "Other",
] as const;

const NEW_OR_PREOWNED = [
  "Show me new options",
  "Show me quality pre-owned",
  "I'm open to either",
] as const;

const LOOKING_TO_OPTIONS = [
  "Change a bedroom to an office",
  "Create a new workspace",
  "Build a corner workspace",
  "Try height-adjustable desks",
  "Other",
] as const;

const PREFER_TO_OPTIONS = [
  "Make an appointment",
  "Visit the showroom",
  "Get a quote by email",
  "Other",
] as const;

const BUSINESS_TYPES = [
  "Corporate firm",
  "Healthcare",
  "Education",
  "Government / NYS contract",
  "Small business",
  "Non-profit",
  "Other",
] as const;

const LOOKING_FOR_OPTIONS = [
  "Seating",
  "Office desks, storage, casegoods",
  "Conference / meeting rooms",
  "Reception / lobby",
  "Lounge / waiting area",
  "Panel systems",
  "Office design + space planning",
  "Other",
] as const;

const SCOPE_OPTIONS = [
  "1-5 employees",
  "5-10 employees",
  "10-25 employees",
  "25-50 employees",
  "50+ employees",
  "Office revamp",
  "Single office / single employee",
  "Multi-floor install",
] as const;

const TIMELINE_OPTIONS = [
  "ASAP",
  "Within 2 weeks",
  "Within 4-6 weeks",
  "Within 60 days",
  "No timeline yet",
] as const;

type Audience = "" | "Business" | "Individual";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  phoneExtension: string;
  audience: Audience;
  businessType: string;
  lookingFor: string[];
  scope: string;
  timeline: string;
  helpWith: string;
  newOrPreOwned: string;
  lookingTo: string;
  preferTo: string;
  hearAbout: string;
  notes: string;
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  phoneExtension: "",
  audience: "",
  businessType: "",
  lookingFor: [],
  scope: "",
  timeline: "",
  helpWith: "",
  newOrPreOwned: "",
  lookingTo: "",
  preferTo: "",
  hearAbout: "",
  notes: "",
}

interface StepDef {
  key: string;
  shortLabel: string;
  eyebrow: string;
  title: string;
  isValid: (s: FormState) => boolean;
  render: (props: StepRenderProps) => React.ReactNode;
}

interface StepRenderProps {
  state: FormState;
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  toggleMulti: (key: "lookingFor", value: string) => void;
}

export function QuoteRequestForm() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<FormState>(initialState);
  const [stepIdx, setStepIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prefill notes when arriving from a product card's Inquire button.
  useEffect(() => {
    const sku = searchParams?.get("product");
    if (!sku) return;
    const product = getProductBySku(sku);
    if (!product) return;
    setState((prev) => ({
      ...prev,
      notes:
        prev.notes || `Interested in ${product.name} (${product.sku}). `,
    }));
  }, [searchParams]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }
  function toggleMulti(key: "lookingFor", value: string) {
    setState((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  }

  const steps = computeSteps(state.audience);
  const total = steps.length;
  const current = steps[stepIdx];
  const isLastStep = stepIdx === total - 1;
  const canAdvance = current.isValid(state);

  function next() {
    if (!canAdvance) return;
    setStepIdx((i) => Math.min(i + 1, total - 1));
  }
  function back() {
    setStepIdx((i) => Math.max(i - 1, 0));
  }
  function jumpTo(i: number) {
    if (i < stepIdx) setStepIdx(i);
  }

  async function submit() {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...state, formType: "main-lead" }),
      });
      if (!res.ok) {
        setError(`Something went wrong. Try again, or call us at ${SITE.contact.phone}`);
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError(`Could not reach the server. Try again, or call us at ${SITE.contact.phone}`);
    }
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border-4 border-foreground bg-background p-10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.3)] md:p-14">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-foreground text-background">
          <Check className="h-10 w-10" strokeWidth={3} />
        </span>
        <h2 className="mt-8 font-display text-4xl font-semibold leading-[1] tracking-tight md:text-6xl">
          You&apos;re in good hands.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A real human follows up promptly. For anything urgent, call <span className="font-mono font-semibold text-foreground">{SITE.contact.phone}</span>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isLastStep) submit();
        else next();
      }}
      className="rounded-3xl border-4 border-foreground bg-background p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.3)] md:p-10 lg:p-12"
    >
      <StepRail steps={steps} stepIdx={stepIdx} onJump={jumpTo} />

      <AnimatePresence mode="wait">
        <motion.div
          key={current.key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-14"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            {current.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-[1] tracking-[-0.025em] md:text-5xl lg:text-6xl">
            {current.title}
          </h2>
          <div className="mt-8 md:mt-10">
            {current.render({ state, set, toggleMulti })}
          </div>
        </motion.div>
      </AnimatePresence>

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
        <p className="mt-6 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>
      ) : null}

      <div className="mt-12 flex items-center justify-between gap-3 border-t-2 border-foreground/10 pt-6">
        {stepIdx > 0 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex h-12 items-center gap-1 rounded-full px-5 text-base font-medium transition-colors hover:bg-foreground/5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={!canAdvance || submitting}
          className={cn(
            "inline-flex h-14 items-center gap-1.5 rounded-full bg-foreground px-8 text-base font-semibold text-background transition-all md:h-16 md:px-10 md:text-lg",
            "hover:bg-foreground/90 hover:scale-[1.02]",
            "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100",
          )}
        >
          {submitting ? "Sending..." : isLastStep ? "Send my request" : "Continue"}
          {!submitting ? <ArrowRight className="h-5 w-5" /> : null}
        </button>
      </div>
    </form>
  );
}

// ---------- step rail (numbered indicators) ----------

function StepRail({
  steps,
  stepIdx,
  onJump,
}: {
  steps: StepDef[];
  stepIdx: number;
  onJump: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      {steps.map((s, i) => {
        const isActive = i === stepIdx;
        const isComplete = i < stepIdx;
        const isUpcoming = i > stepIdx;
        return (
          <div key={s.key} className="flex flex-1 items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => onJump(i)}
              disabled={isUpcoming}
              aria-label={`${s.shortLabel}, step ${i + 1} of ${steps.length}`}
              aria-current={isActive ? "step" : undefined}
              className={cn(
                "relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 font-display font-bold transition-all md:h-14 md:w-14 md:text-lg",
                isComplete && "border-foreground bg-foreground text-background hover:scale-105 cursor-pointer",
                isActive && "border-foreground bg-foreground text-background scale-110",
                isUpcoming && "border-foreground/20 bg-transparent text-foreground/40 cursor-not-allowed",
              )}
            >
              {isComplete ? <Check className="h-5 w-5 md:h-6 md:w-6" strokeWidth={3} /> : i + 1}
              {isActive ? (
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "0 0 0 6px var(--brand-yellow)" }}
                  aria-hidden
                />
              ) : null}
            </button>
            {i < steps.length - 1 ? (
              <div
                className={cn(
                  "h-0.5 flex-1 transition-colors",
                  isComplete ? "bg-foreground" : "bg-foreground/15",
                )}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

// ---------- step composition ----------

function computeSteps(audience: Audience): StepDef[] {
  const branchStep: StepDef =
    audience === "Business"
      ? {
          key: "business",
          shortLabel: "Project",
          eyebrow: "Business details",
          title: "Tell us about your project.",
          isValid: (s) =>
            s.businessType !== "" &&
            s.scope !== "" &&
            s.timeline !== "",
          render: BusinessStep,
        }
      : audience === "Individual"
        ? {
            key: "individual",
            shortLabel: "Needs",
            eyebrow: "Your needs",
            title: "How can we help?",
            isValid: (s) =>
              s.helpWith !== "" &&
              s.newOrPreOwned !== "" &&
              s.lookingTo !== "" &&
              s.preferTo !== "",
            render: IndividualStep,
          }
        : {
            // placeholder, unreachable since the audience selector blocks advance
            key: "branch-placeholder",
            shortLabel: "Project",
            eyebrow: "Project",
            title: "",
            isValid: () => false,
            render: () => null,
          };

  return [
    {
      key: "audience",
      shortLabel: "About",
      eyebrow: "Who we're working with",
      title: "Who's the project for?",
      isValid: (s) => s.audience !== "",
      render: AudienceStep,
    },
    branchStep,
    {
      key: "extras",
      shortLabel: "Notes",
      eyebrow: "Final touches",
      title: "Anything else we should know?",
      isValid: () => true,
      render: ExtrasStep,
    },
    {
      key: "contact",
      shortLabel: "You",
      eyebrow: "Last step",
      title: "Where do we send the quote?",
      isValid: (s) =>
        s.firstName.trim().length > 0 &&
        s.lastName.trim().length > 0 &&
        /.+@.+\..+/.test(s.email) &&
        s.phone.trim().length >= 7,
      render: ContactStep,
    },
  ];
}

// ---------- step renderers ----------

function AudienceStep({ state, set }: StepRenderProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      <BigCard
        title="Business"
        sub="Office, healthcare, education, government, non-profit"
        selected={state.audience === "Business"}
        onClick={() => set("audience", "Business")}
      />
      <BigCard
        title="Individual"
        sub="Home office, single chair, single desk"
        selected={state.audience === "Individual"}
        onClick={() => set("audience", "Individual")}
      />
    </div>
  );
}

function BusinessStep({ state, set, toggleMulti }: StepRenderProps) {
  return (
    <div className="space-y-9">
      <ChoiceField label="What kind of business are you with?">
        <RadioRow value={state.businessType} options={BUSINESS_TYPES} onChange={(v) => set("businessType", v)} />
      </ChoiceField>
      <ChoiceField label="What are you looking for? Pick any.">
        <CheckboxRow values={state.lookingFor} options={LOOKING_FOR_OPTIONS} onToggle={(v) => toggleMulti("lookingFor", v)} />
      </ChoiceField>
      <ChoiceField label="Scope of project / needs?">
        <RadioRow value={state.scope} options={SCOPE_OPTIONS} onChange={(v) => set("scope", v)} />
      </ChoiceField>
      <ChoiceField label="How quick do you need it?">
        <RadioRow value={state.timeline} options={TIMELINE_OPTIONS} onChange={(v) => set("timeline", v)} />
      </ChoiceField>
    </div>
  );
}

function IndividualStep({ state, set }: StepRenderProps) {
  return (
    <div className="space-y-9">
      <ChoiceField label="How can we help you?">
        <RadioRow value={state.helpWith} options={HELP_OPTIONS} onChange={(v) => set("helpWith", v)} />
      </ChoiceField>
      <ChoiceField label="Are you interested in new or pre-owned?">
        <RadioRow value={state.newOrPreOwned} options={NEW_OR_PREOWNED} onChange={(v) => set("newOrPreOwned", v)} />
      </ChoiceField>
      <ChoiceField label="I'm looking to...">
        <RadioRow value={state.lookingTo} options={LOOKING_TO_OPTIONS} onChange={(v) => set("lookingTo", v)} />
      </ChoiceField>
      <ChoiceField label="Would you prefer to...">
        <RadioRow value={state.preferTo} options={PREFER_TO_OPTIONS} onChange={(v) => set("preferTo", v)} />
      </ChoiceField>
    </div>
  );
}

function ExtrasStep({ state, set }: StepRenderProps) {
  return (
    <div className="space-y-9">
      <ChoiceField label="How did you hear about us?">
        <RadioRow value={state.hearAbout} options={HEAR_OPTIONS} onChange={(v) => set("hearAbout", v)} />
      </ChoiceField>
      <ChoiceField label="Notes for the team. Optional.">
        <Textarea
          value={state.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={5}
          placeholder="Floor plans, finishes, brand preferences, contract codes, custom upholstery..."
          className="text-base md:text-lg"
        />
      </ChoiceField>
    </div>
  );
}

function ContactStep({ state, set }: StepRenderProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 md:gap-6">
      <Field label="First name" required>
        <Input value={state.firstName} onChange={(e) => set("firstName", e.target.value)} required className="h-14 text-base md:text-lg" autoComplete="given-name" />
      </Field>
      <Field label="Last name" required>
        <Input value={state.lastName} onChange={(e) => set("lastName", e.target.value)} required className="h-14 text-base md:text-lg" autoComplete="family-name" />
      </Field>
      <Field label="Email" required>
        <Input type="email" value={state.email} onChange={(e) => set("email", e.target.value)} required className="h-14 text-base md:text-lg" autoComplete="email" />
      </Field>
      <Field label="Phone" required>
        <Input type="tel" value={state.phone} onChange={(e) => set("phone", e.target.value)} required className="h-14 text-base md:text-lg" autoComplete="tel" />
      </Field>
      <Field label="Company" className="md:col-span-2">
        <Input value={state.company} onChange={(e) => set("company", e.target.value)} className="h-14 text-base md:text-lg" autoComplete="organization" />
      </Field>
      <Field label="Direct line / extension. Optional." className="md:col-span-2">
        <Input value={state.phoneExtension} onChange={(e) => set("phoneExtension", e.target.value)} className="h-14 text-base md:text-lg" />
      </Field>
    </div>
  );
}

// ---------- field primitives ----------

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label className="text-sm font-semibold uppercase tracking-wider text-foreground/70">
        {label}
        {required ? <span aria-hidden className="ml-1 text-base" style={{ color: "var(--brand-yellow)" }}>*</span> : null}
      </Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ChoiceField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-display text-xl font-semibold tracking-tight md:text-2xl">{label}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function BigCard({
  title,
  sub,
  selected,
  onClick,
}: {
  title: string;
  sub: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border-4 p-7 text-left transition-all md:p-9",
        selected
          ? "border-foreground bg-foreground text-background shadow-[0_18px_36px_-12px_rgba(0,0,0,0.35)] scale-[1.02]"
          : "border-foreground/10 bg-background hover:border-foreground/40 hover:scale-[1.01]",
      )}
    >
      <span
        className={cn(
          "grid h-12 w-12 place-items-center rounded-full font-display text-lg font-bold transition-colors md:h-14 md:w-14 md:text-xl",
          selected
            ? "bg-[var(--brand-yellow)] text-foreground"
            : "bg-foreground/5 text-foreground/40 group-hover:bg-foreground/10",
        )}
      >
        {selected ? <Check className="h-6 w-6 md:h-7 md:w-7" strokeWidth={3} /> : ""}
      </span>
      <span className="font-display text-3xl font-semibold leading-[1] tracking-tight md:text-4xl">
        {title}
      </span>
      <span className={cn("text-sm md:text-base", selected ? "text-background/70" : "text-muted-foreground")}>
        {sub}
      </span>
    </button>
  );
}

function RadioRow({
  value,
  options,
  onChange,
}: {
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const checked = value === opt;
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onChange(opt)}
            aria-pressed={checked}
            className={cn(
              "rounded-full border-2 px-5 py-2.5 text-sm font-medium transition-all md:text-base",
              checked
                ? "border-foreground bg-foreground text-background scale-[1.02] shadow-md"
                : "border-foreground/15 bg-background hover:border-foreground/50 hover:bg-foreground/5",
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function CheckboxRow({
  values,
  options,
  onToggle,
}: {
  values: string[];
  options: readonly string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const checked = values.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onToggle(opt)}
            aria-pressed={checked}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border-2 px-5 py-2.5 text-sm font-medium transition-all md:text-base",
              checked
                ? "border-foreground bg-foreground text-background scale-[1.02] shadow-md"
                : "border-foreground/15 bg-background hover:border-foreground/50 hover:bg-foreground/5",
            )}
          >
            {checked ? <Check className="h-4 w-4" strokeWidth={3} /> : null}
            {opt}
          </button>
        );
      })}
    </div>
  );
}
