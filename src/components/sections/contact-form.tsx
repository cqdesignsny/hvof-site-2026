"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const PROJECT_TYPES = [
  "Single chair / desk",
  "Full office (1–25 people)",
  "Multi-floor install",
  "Healthcare / education",
  "Pre-owned inventory",
  "NYS contract pricing",
  "Just looking",
] as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const data = new FormData(event.currentTarget);

    // For tonight: post to a generic endpoint or open mailto.
    // Replace with /api/lead route or a service like Formspree, Resend, or Vercel Form.
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
    } catch {
      // Silently fail and still mark as submitted. fallback for demo.
    }
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[480px] flex-col items-start justify-center rounded-2xl border bg-muted/30 p-10 md:p-14">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-foreground">
          <Check className="h-5 w-5" />
        </span>
        <h2 className="mt-6 font-display text-3xl font-light tracking-tight md:text-4xl">Got it. Thank you.</h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          A team member will reach out within 4 business hours. For anything urgent, call us at <span className="font-mono">{`(845) 297-8800`}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 rounded-2xl border bg-background p-6 md:p-10">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>

      <div>
        <Label className="eyebrow text-muted-foreground">Project type</Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {PROJECT_TYPES.map((p) => (
            <label
              key={p}
              className="cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors has-checked:border-foreground has-checked:bg-foreground has-checked:text-background"
            >
              <input type="radio" name="projectType" value={p} className="peer sr-only" />
              {p}
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="message" className="eyebrow text-muted-foreground">
          Tell us about your project
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          className="mt-3"
          placeholder="Floor count, headcount, timeline, brands you have in mind…"
        />
      </div>

      <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          We respect your inbox. No newsletters unless you ask.
        </p>
        <Button type="submit" size="lg" className="rounded-full bg-foreground px-6 text-base text-background hover:bg-foreground/90" disabled={submitting}>
          {submitting ? "Sending…" : "Send"}
          {!submitting ? <ArrowUpRight className="ml-1 h-4 w-4" /> : null}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name} className="eyebrow text-muted-foreground">
        {label}
        {required ? <span aria-hidden className="ml-1 text-brand-yellow">*</span> : null}
      </Label>
      <Input id={name} name={name} type={type} required={required} className="mt-3 h-12 rounded-md text-base" />
    </div>
  );
}
