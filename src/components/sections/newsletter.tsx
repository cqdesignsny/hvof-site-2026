"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Email-only newsletter form. Posts to /api/lead with type=newsletter.
 * Designed to drop into a closer/footer section. Light copy, single field.
 */
export function NewsletterSignup({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Newsletter subscriber", email, type: "newsletter" }),
      });
    } catch {
      // Soft fail — still mark done so user gets feedback
    }
    setDone(true);
    setSubmitting(false);
  }

  const isDark = variant === "dark";

  return (
    <div className="w-full">
      <p
        className={
          isDark
            ? "eyebrow text-brand-yellow"
            : "eyebrow text-muted-foreground"
        }
      >
        Stay in the loop
      </p>
      <h3
        className={
          "mt-3 font-display text-3xl font-light leading-[1.05] tracking-tight md:text-4xl lg:text-5xl"
        }
      >
        New showroom arrivals,<br />
        deals, and Hudson Valley install reveals.
      </h3>

      {done ? (
        <p
          className={
            isDark
              ? "mt-8 inline-flex items-center gap-2 text-base text-background/85"
              : "mt-8 inline-flex items-center gap-2 text-base text-foreground/85"
          }
        >
          <Check className="h-4 w-4 text-brand-yellow" />
          Thanks. We will only email when there is something worth opening.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={
              isDark
                ? "h-12 flex-1 rounded-full border-white/15 bg-white/5 px-5 text-base text-white placeholder:text-white/40 focus-visible:border-brand-yellow focus-visible:ring-brand-yellow/30"
                : "h-12 flex-1 rounded-full border-border bg-background px-5 text-base"
            }
            aria-label="Email address"
          />
          <Button
            type="submit"
            disabled={submitting}
            className="h-12 rounded-full bg-brand-yellow px-6 text-base font-medium text-foreground hover:bg-brand-yellow-hover"
          >
            {submitting ? "Subscribing…" : "Subscribe"}
            {!submitting ? <ArrowUpRight className="ml-1 h-4 w-4" /> : null}
          </Button>
        </form>
      )}

      <p
        className={
          isDark
            ? "mt-4 max-w-md text-xs text-background/50"
            : "mt-4 max-w-md text-xs text-muted-foreground"
        }
      >
        We respect your inbox. No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
