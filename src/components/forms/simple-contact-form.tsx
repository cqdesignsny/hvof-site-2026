"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SITE } from "@/lib/site";

/**
 * Plain contact form. For people who just want to send a quick note.
 * For multi-step project intake, the Quote Request form lives at /quote-request.
 */
export function SimpleContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType: "main-lead" }),
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
      <div className="rounded-2xl border bg-muted/30 p-10 md:p-12">
        <span
          className="grid h-14 w-14 place-items-center rounded-full text-foreground"
          style={{ backgroundColor: "var(--brand-yellow)" }}
        >
          <Check className="h-6 w-6" />
        </span>
        <h2 className="mt-7 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Thanks. We&apos;ll be in touch.
        </h2>
        <p className="mt-3 max-w-md text-base text-muted-foreground md:text-lg">
          We reply as soon as possible. For urgent needs call <span className="font-mono">{SITE.contact.phone}</span>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-7 rounded-2xl border bg-background p-6 md:p-10"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="firstName" label="First name" required />
        <Field name="lastName" label="Last name" required />
        <Field name="email" type="email" label="Email" required />
        <Field name="phone" type="tel" label="Phone (optional)" />
        <Field name="subject" label="Subject (optional)" className="md:col-span-2" />
        <div className="md:col-span-2">
          <Label htmlFor="message" className="text-sm font-medium">
            Message
            <span aria-hidden className="ml-1" style={{ color: "var(--brand-yellow)" }}>*</span>
          </Label>
          <Textarea id="message" name="message" rows={6} required className="mt-2 text-base" placeholder="Tell us a bit about what you need." />
        </div>
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
        <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>
      ) : null}

      <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          We respect your inbox. No newsletters unless you ask.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="h-12 rounded-full bg-foreground px-7 text-base font-semibold text-background hover:bg-foreground/90"
        >
          {submitting ? "Sending..." : "Send message"}
          {!submitting ? <ArrowRight className="ml-1 h-4 w-4" /> : null}
        </Button>
      </div>
    </form>
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
