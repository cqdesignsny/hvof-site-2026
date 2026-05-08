"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Native lead form replacing the JLIMOo51 Typeform.
 * 12 fields total, branches after Q3 (Business or Individual). Single-page,
 * conditionally-revealed sections so users can scan and skip.
 */

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

// Individual branch
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

// Business branch
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
  "Panel systems / cubicles",
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

interface LeadFormProps {
  /** Optional override on the form heading */
  heading?: string;
  /** Optional override on the intro paragraph */
  intro?: string;
}

export function LeadForm({ heading, intro }: LeadFormProps) {
  const [audience, setAudience] = useState<"" | "Business" | "Individual">("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType: "main-lead" }),
      });
      if (!res.ok) {
        setError("Something went wrong. Try again, or call us at " + SITE.contact.phone);
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Could not reach the server. Try again, or call us at " + SITE.contact.phone);
    }
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border bg-muted/30 p-10 md:p-14">
        <span className="grid h-14 w-14 place-items-center rounded-full text-foreground" style={{ backgroundColor: "var(--brand-yellow)" }}>
          <Check className="h-6 w-6" />
        </span>
        <h2 className="mt-8 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          We will contact you shortly. Thank you for your time.
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          A team member follows up within 4 business hours, often same-day. For anything urgent, call us at <span className="font-mono">{SITE.contact.phone}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-12 rounded-2xl border bg-background p-6 md:p-10">
      {heading || intro ? (
        <div>
          {heading ? (
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {heading}
            </h2>
          ) : null}
          {intro ? <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p> : null}
        </div>
      ) : null}

      {/* Section 1: contact info */}
      <Section
        eyebrow="Step one"
        title="Let's get to know you."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field name="firstName" label="First name" required />
          <Field name="lastName" label="Last name" required />
          <Field name="email" type="email" label="Email" required />
          <Field name="phone" type="tel" label="Phone number" required />
          <Field name="company" label="Company" className="md:col-span-2" />
          <Field name="phoneExtension" label="Direct phone line / extension (optional)" className="md:col-span-2" />
        </div>
      </Section>

      <Separator />

      {/* Section 2: audience selector (branching) */}
      <Section
        eyebrow="Step two"
        title="Are you a business or an individual?"
      >
        <div className="grid gap-3 md:grid-cols-2">
          <RadioCard
            name="audience"
            value="Business"
            label="Business"
            sub="Office, healthcare, education, government, non-profit"
            checked={audience === "Business"}
            onChange={() => setAudience("Business")}
          />
          <RadioCard
            name="audience"
            value="Individual"
            label="Individual"
            sub="Home office, single chair, single desk"
            checked={audience === "Individual"}
            onChange={() => setAudience("Individual")}
          />
        </div>
      </Section>

      {/* Branch B: Business */}
      {audience === "Business" ? (
        <>
          <Separator />
          <Section eyebrow="Business details" title="Tell us about your project.">
            <div className="space-y-7">
              <ChoiceGroup
                label="What kind of business are you with?"
                name="businessType"
                options={BUSINESS_TYPES}
              />
              <ChoiceGroup
                label="What are you looking for?"
                name="lookingFor"
                options={LOOKING_FOR_OPTIONS}
                multi
              />
              <ChoiceGroup label="Scope of project / needs?" name="scope" options={SCOPE_OPTIONS} />
              <ChoiceGroup
                label="How quick do you need the product?"
                name="timeline"
                options={TIMELINE_OPTIONS}
              />
            </div>
          </Section>
        </>
      ) : null}

      {/* Branch A: Individual */}
      {audience === "Individual" ? (
        <>
          <Separator />
          <Section eyebrow="Your needs" title="How can we help?">
            <div className="space-y-7">
              <ChoiceGroup
                label="How can we help you?"
                name="helpWith"
                options={HELP_OPTIONS}
              />
              <ChoiceGroup
                label="Are you interested in new or quality pre-owned?"
                name="newOrPreOwned"
                options={NEW_OR_PREOWNED}
              />
              <ChoiceGroup
                label="I'm looking to..."
                name="lookingTo"
                options={LOOKING_TO_OPTIONS}
              />
              <ChoiceGroup
                label="Would you prefer to..."
                name="preferTo"
                options={PREFER_TO_OPTIONS}
              />
            </div>
          </Section>
        </>
      ) : null}

      {audience !== "" ? (
        <>
          <Separator />
          <Section eyebrow="One more thing" title="How did you hear about us?">
            <ChoiceGroup label="" name="hearAbout" options={HEAR_OPTIONS} />
          </Section>

          <Separator />
          <Section eyebrow="Anything else" title="Notes for the team (optional)">
            <Textarea
              name="notes"
              rows={5}
              placeholder="Floor plans, finishes, brand preferences, contract codes, custom upholstery..."
              className="text-base"
            />
          </Section>
        </>
      ) : null}

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
        <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>
      ) : null}

      <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          We respect your inbox. No newsletters unless you ask.
        </p>
        <Button
          type="submit"
          size="lg"
          className="h-14 rounded-full bg-foreground px-8 text-base font-semibold text-background hover:bg-foreground/90"
          disabled={submitting || audience === ""}
        >
          {submitting ? "Sending..." : "Send"}
          {!submitting ? <ArrowUpRight className="ml-1 h-5 w-5" /> : null}
        </Button>
      </div>
    </form>
  );
}

// ---------- internal helpers ----------

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-6">
      <div>
        <p className="eyebrow text-muted-foreground">{eyebrow}</p>
        <legend className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
          {title}
        </legend>
      </div>
      {children}
    </fieldset>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  className,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required ? <span aria-hidden className="ml-1" style={{ color: "var(--brand-yellow)" }}>*</span> : null}
      </Label>
      <Input id={name} name={name} type={type} required={required} className="mt-2 h-12 text-base" />
    </div>
  );
}

function RadioCard({
  name,
  value,
  label,
  sub,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  sub?: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={cn(
        "card-interactive flex cursor-pointer items-start gap-4 p-5",
        checked && "ring-4",
      )}
      style={checked ? { boxShadow: `0 0 0 4px var(--brand-yellow)` } : undefined}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
        required
      />
      <span
        className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2"
        style={{
          borderColor: checked ? "var(--brand-yellow)" : "var(--color-border)",
          backgroundColor: checked ? "var(--brand-yellow)" : "transparent",
        }}
      >
        {checked ? <span className="block h-2 w-2 rounded-full bg-foreground" /> : null}
      </span>
      <span className="flex-1">
        <span className="block font-display text-xl font-semibold tracking-tight md:text-2xl">{label}</span>
        {sub ? <span className="mt-1 block text-sm text-muted-foreground md:text-base">{sub}</span> : null}
      </span>
    </label>
  );
}

function ChoiceGroup({
  label,
  name,
  options,
  multi = false,
}: {
  label: string;
  name: string;
  options: readonly string[];
  multi?: boolean;
}) {
  return (
    <div>
      {label ? <p className="text-base font-medium md:text-lg">{label}</p> : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors has-checked:border-foreground has-checked:bg-foreground has-checked:text-background md:text-base"
          >
            <input
              type={multi ? "checkbox" : "radio"}
              name={name}
              value={opt}
              className="peer sr-only"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
