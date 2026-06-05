"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useQuoteCart } from "@/lib/quote-cart";
import { formatPrice } from "@/lib/products";
import { SITE } from "@/lib/site";

const TIMELINES = ["ASAP", "Within 30 days", "30–60 days", "60–90 days", "Just exploring"] as const;

export function QuoteCart() {
  const items = useQuoteCart((s) => s.items);
  const setQty = useQuoteCart((s) => s.setQty);
  const remove = useQuoteCart((s) => s.remove);
  const clear = useQuoteCart((s) => s.clear);
  const estimatedTotal = useQuoteCart((s) => s.estimatedTotal());

  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => setHydrated(true), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      type: "quote-request",
      items,
      estimatedTotal,
      contact: Object.fromEntries(formData),
      submittedAt: new Date().toISOString(),
    };
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // graceful fail. still mark submitted for demo flow
    }
    setSubmitted(true);
    clear();
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <section className="bg-background pt-32 pb-32 md:pt-40">
        <div className="container-editorial max-w-3xl text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-yellow text-foreground">
            <Check className="h-8 w-8" />
          </span>
          <h1 className="mt-8 font-display text-5xl font-semibold leading-[1] tracking-tight md:text-7xl">
            Quote received.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            A team member will follow up and email you a finalized quote as soon as possible. The prices you saw are starting points, your final number is set once all the options are discussed. Payment is collected offline once you approve.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-full px-7 text-base">
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-7 text-base">
              <Link href="/furniture/seating">Keep browsing</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (hydrated && items.length === 0) {
    return (
      <section className="bg-background pt-32 pb-32 md:pt-40">
        <div className="container-editorial max-w-3xl text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border bg-muted/30 text-muted-foreground">
            <ShoppingBag className="h-7 w-7" />
          </span>
          <h1 className="mt-8 font-display text-5xl font-semibold leading-[1] tracking-tight md:text-7xl">
            Your quote cart is empty.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Add chairs, desks, conference tables, or anything else from our catalog. We will compile a quote promptly.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-full bg-foreground px-7 text-base text-background hover:bg-foreground/90">
              <Link href="/furniture/seating" className="group">
                Browse seating
                <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-7 text-base">
              <Link href="/contact">Or send a message</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background pt-28 pb-24 md:pt-40 md:pb-32">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <p className="eyebrow text-muted-foreground">Quote request</p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
            Build your<br />
            purchase order.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Every price here is a starting point to help you set a budget, not a final number. Adjust quantities, add notes, and submit. Your dedicated rep confirms the final pricing, delivery, and contract eligibility once you walk through the options together. Payment is processed offline by check, ACH, or PO once you approve.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Cart items column */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border bg-background">
              <div className="flex items-center justify-between border-b px-5 py-4 md:px-7">
                <p className="eyebrow text-muted-foreground">Items in cart · {items.length}</p>
                <button
                  type="button"
                  onClick={clear}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground hover:underline"
                >
                  Clear cart
                </button>
              </div>
              <ul className="divide-y">
                {hydrated &&
                  items.map((item) => (
                    <li key={item.sku} className="flex gap-4 px-5 py-5 md:gap-6 md:px-7 md:py-7">
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-muted md:h-24 md:w-32">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="128px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="grid h-full place-items-center text-muted-foreground/40">
                            <span className="font-mono text-[9px] uppercase tracking-wider">No img</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-display text-lg font-normal leading-snug md:text-xl">
                            {item.name}
                          </h3>
                          <p className="font-display text-lg font-semibold tracking-tight">
                            ~{formatPrice(item.price * item.qty)}
                          </p>
                        </div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          {item.sku} · Starting at ~{formatPrice(item.price)} each
                        </p>
                        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                          <div className="inline-flex items-center rounded-full border">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              className="grid h-9 w-9 place-items-center rounded-l-full hover:bg-muted"
                              onClick={() => setQty(item.sku, item.qty - 1)}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-[2.5rem] text-center font-mono text-sm">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              className="grid h-9 w-9 place-items-center rounded-r-full hover:bg-muted"
                              onClick={() => setQty(item.sku, item.qty + 1)}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(item.sku)}
                            aria-label="Remove from cart"
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>

              <div
                className="rounded-b-2xl border-t-2 bg-muted/40 px-5 py-6 md:px-7 md:py-7"
                style={{ borderColor: "var(--brand-yellow)" }}
              >
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground"
                      style={{ backgroundColor: "var(--brand-yellow)" }}
                    >
                      Starting point, not final
                    </span>
                    <p className="mt-2.5 font-display text-xl font-semibold tracking-tight md:text-2xl">
                      Estimated starting total
                    </p>
                  </div>
                  <p className="font-display text-4xl font-semibold leading-none tracking-tight md:text-5xl">
                    ~{formatPrice(estimatedTotal)}
                  </p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                  This is a starting point to ballpark your budget, not a fixed price per item. Your dedicated rep sets the final number once options, finishes, freight, and contract pricing are discussed and confirmed.
                </p>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-5">
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border bg-muted/30 p-6 md:p-8"
            >
              <h2 className="font-display text-2xl font-normal leading-snug md:text-3xl">
                Who can we contact about your quote?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                A team member will follow up with your quote and contact you as soon as possible.
              </p>

              <div className="mt-6 grid gap-5">
                <Field name="name" label="Full name" required />
                <Field name="company" label="Company" />
                <Field name="email" type="email" label="Email" required />
                <Field name="phone" type="tel" label="Phone" />

                <div>
                  <Label htmlFor="timeline" className="eyebrow text-muted-foreground">
                    Timeline
                  </Label>
                  <select
                    id="timeline"
                    name="timeline"
                    className="mt-3 h-12 w-full rounded-md border border-input bg-background px-3 text-base"
                    defaultValue="Within 30 days"
                  >
                    {TIMELINES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="notes" className="eyebrow text-muted-foreground">
                    Anything else?
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    className="mt-3"
                    placeholder="Floor plans, finishes, brand preferences, contract codes, custom upholstery…"
                  />
                </div>
              </div>

              <Separator className="my-6" />

              <Button
                type="submit"
                size="lg"
                className="h-12 w-full rounded-full bg-foreground text-base text-background hover:bg-foreground/90"
                disabled={submitting}
              >
                {submitting ? "Submitting…" : "Submit quote request"}
                {!submitting ? <ArrowUpRight className="ml-1 h-4 w-4" /> : null}
              </Button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Or call directly at{" "}
                <a className="font-medium text-foreground hover:underline" href={`tel:${SITE.contact.phoneE164}`}>
                  {SITE.contact.phone}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
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
