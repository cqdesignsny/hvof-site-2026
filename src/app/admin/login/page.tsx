import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Floorplan, the Hudson Valley Office Furniture admin.",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  // Already signed in? Bounce them straight to the dashboard.
  if (await isAdminAuthed()) {
    const { next } = await searchParams;
    redirect(next && next.startsWith("/admin") ? next : "/admin");
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-6"
      style={{ backgroundColor: "var(--brand-ink)" }}
    >
      <div className="absolute inset-0 -z-10 opacity-20">
        <div
          className="absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full blur-3xl"
          style={{ backgroundColor: "var(--brand-yellow)" }}
          aria-hidden
        />
        <div
          className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center">
          <p
            className="font-mono text-xs font-semibold uppercase tracking-[0.28em]"
            style={{ color: "var(--brand-yellow)" }}
          >
            Floorplan
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Sign in.
          </h1>
          <p className="mt-3 text-sm text-white/55">
            Hudson Valley Office Furniture admin.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md md:p-9">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          Authorized personnel only. Customer-facing site at{" "}
          <a href="/" className="underline-offset-4 hover:text-white/70 hover:underline">
            thewowguys.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
