import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";
import { type ProductCategory } from "@/lib/products";

/**
 * "This is just a sample" reassurance. The on-site catalog and the shop-the-look
 * groupings show only a slice of inventory. John's concern (2026-05-29): buyers
 * assume what they see is everything and leave. This banner makes it loud and
 * clear that there are hundreds more options, one phone call or showroom visit away.
 *
 * Drop it on category pages (top + bottom), look pages, and product pages.
 */
const CATEGORY_NOUN: Partial<Record<ProductCategory, string>> = {
  seating: "chairs",
  desks: "desks and workstations",
  conference: "conference tables",
  pods: "panel systems and pods",
  healthcare: "healthcare seating and furniture",
  education: "classroom and campus furniture",
  reception: "reception pieces",
  preowned: "pre-owned pieces",
};

interface SampleNoticeProps {
  /** Tailors the noun ("hundreds more chairs"). Falls back to "options". */
  category?: ProductCategory;
  /** Explicit override for the plural noun. */
  noun?: string;
  className?: string;
}

export function SampleNotice({ category, noun, className }: SampleNoticeProps) {
  const what = noun ?? (category ? CATEGORY_NOUN[category] : undefined) ?? "options";

  return (
    <section className={`bg-background py-8 md:py-10 ${className ?? ""}`}>
      <div className="container-wide">
        <div
          className="flex flex-col gap-6 rounded-2xl border-2 p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:p-8"
          style={{ borderColor: "var(--brand-yellow)" }}
        >
          <div className="flex items-start gap-4">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
              style={{ backgroundColor: "var(--brand-yellow)" }}
            >
              <Layers className="h-5 w-5 text-foreground" />
            </span>
            <div>
              <p className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                These aren&apos;t your only options.
              </p>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                What you see here is a sample, chosen to show the look and the price range
                you&apos;re after. We carry hundreds more {what}. If you can&apos;t find exactly what
                you want, contact us or visit the showroom and we&apos;ll track it down.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/quote-request"
              className="group inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
            >
              Tell us what you need
              <ArrowUpRight className="h-4 w-4 arrow-slide" />
            </Link>
            <Link
              href="/showroom"
              className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-6 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/[0.05]"
            >
              Visit the showroom
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
