import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Phone, Clock, MapPin } from "lucide-react";
import { QuoteRequestForm } from "@/components/forms/quote-request-form";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell us about your project. Office, healthcare, education, or home office. We'll come back with pricing, finishes, and lead time promptly.",
};

export default function QuoteRequestPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Request a Quote", href: "/quote-request" }]} />

      {/* Yellow page wrapper - flag this whole page as the loud, conversion-first surface. */}
      <main style={{ backgroundColor: "var(--brand-yellow)" }}>
        {/* Hero */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="container-wide">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-4xl">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-foreground/70">
                  Quote Request
                </p>
                <h1 className="mt-5 font-display text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-foreground">
                  Connect with<br />
                  an expert.
                </h1>
                <p className="mt-7 max-w-2xl text-xl leading-[1.45] text-foreground/85 md:text-2xl">
                  Four quick steps. No friction. We come back promptly with pricing, finishes, and a lead time you can build a calendar around.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="rounded-2xl border-4 border-foreground bg-foreground px-6 py-5 text-background">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-background/60">
                    Prefer to call?
                  </p>
                  <Link href={`tel:${SITE.contact.phoneE164}`} className="mt-2 block font-display text-2xl font-semibold tracking-tight hover:opacity-80">
                    {SITE.contact.phone}
                  </Link>
                  <p className="mt-1 text-xs text-background/60">{SITE.hoursDisplay}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form section */}
        <section className="pb-24 md:pb-32">
          <div className="container-wide">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <aside className="lg:col-span-4">
                <div className="space-y-8 lg:sticky lg:top-28">
                  <NumberedStep
                    n={1}
                    title="Tell us who you're working with"
                    body="Business or individual. We tune the questions to match."
                  />
                  <NumberedStep
                    n={2}
                    title="Walk us through the project"
                    body="Scope, timeline, and what you're trying to solve."
                  />
                  <NumberedStep
                    n={3}
                    title="Anything else"
                    body="How you found us, plus any notes for the team."
                  />
                  <NumberedStep
                    n={4}
                    title="Your contact info"
                    body="Where the quote should land, and a number to reach you on."
                  />

                  <div className="rounded-3xl border-4 border-foreground bg-foreground p-6 text-background md:p-7">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-background/60">
                      Showroom
                    </p>
                    <p className="mt-3 flex items-start gap-2 font-display text-base leading-snug font-semibold">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                      {SITE.address.street}
                      <br />
                      {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
                    </p>
                    <p className="mt-3 flex items-start gap-2 text-sm text-background/70">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                      {SITE.hoursDisplay}
                    </p>
                    <p className="mt-2 flex items-start gap-2 text-sm text-background/70">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                      Walk-ins welcome.
                    </p>
                  </div>
                </div>
              </aside>

              <div className="lg:col-span-8">
                <Suspense fallback={<FormSkeleton />}>
                  <QuoteRequestForm />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* Reassurance closer */}
        <section className="border-t-4 border-foreground bg-foreground py-14 text-background md:py-20">
          <div className="container-wide flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p
                className="font-mono text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--brand-yellow)" }}
              >
                What happens next
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-[1] tracking-tight md:text-5xl">
                A real human, promptly.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-background/75 md:text-lg">
                Our team reads every submission and gets back within 4 business hours, often within minutes. No bots, no autoresponders, no twelve-step nurture sequence.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`tel:${SITE.contact.phoneE164}`}
                className="inline-flex h-12 items-center gap-1.5 rounded-full border-2 border-background/40 bg-transparent px-6 text-base font-medium text-background transition-colors hover:bg-background/10"
              >
                <Phone className="h-4 w-4" />
                {SITE.contact.phone}
              </Link>
              <Link
                href="/showroom"
                className="inline-flex h-12 items-center gap-1.5 rounded-full px-6 text-base font-semibold text-foreground transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--brand-yellow)" }}
              >
                Visit the showroom
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function NumberedStep({
  n,
  title,
  body,
}: {
  n: number;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-foreground font-display text-2xl font-bold text-background md:h-16 md:w-16 md:text-3xl">
        {n}
      </span>
      <div className="pt-2">
        <p className="font-display text-lg font-semibold leading-tight tracking-tight md:text-xl">
          {title}
        </p>
        <p className="mt-1.5 text-sm text-foreground/70 md:text-base">
          {body}
        </p>
      </div>
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="rounded-3xl border-4 border-foreground bg-background p-10">
      <div className="flex items-center gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-1 items-center gap-3">
            <div className="h-12 w-12 animate-pulse rounded-full bg-foreground/10 md:h-14 md:w-14" />
            {i < 3 ? <div className="h-0.5 flex-1 bg-foreground/10" /> : null}
          </div>
        ))}
      </div>
      <div className="mt-12 h-12 w-2/3 animate-pulse rounded bg-foreground/10" />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="h-32 animate-pulse rounded-2xl bg-foreground/5" />
        <div className="h-32 animate-pulse rounded-2xl bg-foreground/5" />
      </div>
    </div>
  );
}
