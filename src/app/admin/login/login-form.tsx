"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get("next") || "/admin";

  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Could not sign in. Try again.");
        setSubmitting(false);
        return;
      }
      router.replace(next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="password"
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 h-12 w-full rounded-full border border-white/15 bg-white/5 px-5 text-base text-white outline-none transition-colors placeholder:text-white/30 focus:border-[var(--brand-yellow)] focus:bg-white/10"
          placeholder="Enter admin password"
        />
      </div>

      {error ? (
        <p className="rounded-lg bg-destructive/15 p-3 text-sm text-red-300">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={submitting || !password}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-base font-semibold text-foreground transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        style={{ backgroundColor: "var(--brand-yellow)" }}
      >
        {submitting ? "Signing in..." : "Sign in"}
        {!submitting ? <ArrowRight className="h-4 w-4" /> : null}
      </button>
    </form>
  );
}
