import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = { title: "Plan" };

type Status = "done" | "in-progress" | "next" | "later";

const PHASES: {
  name: string;
  status: Status;
  body: string;
  items?: string[];
}[] = [
  {
    name: "Foundation",
    status: "done",
    body: "Core site rebuilt on Next.js 16. Catalog, NYS contracts, gallery, and showroom live.",
    items: [
      "Brand and type system locked",
      "Quote cart + Quote Request form",
      "13 chair SKUs priced and live",
      "36+ showcase products across 8 categories",
      "Local SEO: 12 city + 8 county + Hudson Valley region pages",
    ],
  },
  {
    name: "Forms + lead capture",
    status: "in-progress",
    body: "Multi-step Quote Request live. Two more native forms to replace remaining Typeforms.",
    items: [
      "Quote Request multi-step (live)",
      "Sell Your Furniture form (pending field list)",
      "Giveaway entry native form",
      "Resend tag-routing by formType",
    ],
  },
  {
    name: "Floorplan admin",
    status: "in-progress",
    body: "Internal portal. Lead pipeline working in-memory, durable storage to be wired.",
    items: [
      "Password gate + cookie session",
      "Dashboard, Leads, KB, Agents, Plan, Reports",
      "Wire Vercel KV / Upstash for durable persistence",
      "Resend webhook for delivery status",
    ],
  },
  {
    name: "Agents + knowledge base",
    status: "next",
    body: "AI assistance for visitors and staff. Knowledge base feeds the agents.",
    items: [
      "Author starter KB articles (lead times, NYS, showroom logistics)",
      "Concierge web-chat agent on customer-facing pages",
      "Email triage on the sales inbox",
      "Phone responder for after-hours",
    ],
  },
  {
    name: "Launch",
    status: "later",
    body: "DNS cutover, GSC sitemap, Google Business Profile, and Pixel ID.",
    items: [
      "DNS cutover from thewowguys.com to Vercel",
      "Submit sitemap to Google Search Console",
      "Claim and verify Google Business Profile",
      "Wire Meta Pixel ID once provided",
    ],
  },
];

export default function PlanPage() {
  return (
    <div className="px-4 py-8 md:px-10 md:py-12 lg:px-14">
      <div>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/50">
          Roadmap
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Plan
        </h1>
        <p className="mt-3 max-w-2xl text-foreground/70">
          Where we are, what&apos;s next, and what&apos;s landing later. Updated as work ships.
        </p>
      </div>

      <ol className="mt-10 space-y-6">
        {PHASES.map((p, i) => (
          <li
            key={p.name}
            className={cn(
              "rounded-2xl border-2 p-6 md:p-8",
              p.status === "done" && "border-foreground/15 bg-foreground/5",
              p.status === "in-progress" && "border-[var(--brand-yellow)] bg-[color-mix(in_srgb,var(--brand-yellow)_8%,transparent)]",
              p.status === "next" && "border-foreground/15 bg-background",
              p.status === "later" && "border-foreground/10 bg-background opacity-80",
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <StatusBadge status={p.status} />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50">
                    Phase {i + 1}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {p.name}
                  </h2>
                </div>
              </div>
              <StatusChip status={p.status} />
            </div>
            <p className="mt-3 max-w-2xl text-foreground/75">{p.body}</p>
            {p.items ? (
              <ul className="mt-5 space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span
                      aria-hidden
                      className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--brand-yellow)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "done") {
    return (
      <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background">
        <CheckCircle2 className="h-5 w-5" />
      </span>
    );
  }
  if (status === "in-progress") {
    return (
      <span
        className="grid h-9 w-9 place-items-center rounded-full text-foreground"
        style={{ backgroundColor: "var(--brand-yellow)" }}
      >
        <Clock className="h-5 w-5" />
      </span>
    );
  }
  return (
    <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-foreground/30 text-foreground/40">
      <Circle className="h-4 w-4" />
    </span>
  );
}

function StatusChip({ status }: { status: Status }) {
  const label = {
    done: "Done",
    "in-progress": "In progress",
    next: "Up next",
    later: "Later",
  }[status];
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]",
        status === "done" && "bg-foreground text-background",
        status === "in-progress" && "bg-foreground text-background",
        status === "next" && "bg-foreground/10 text-foreground/70",
        status === "later" && "bg-foreground/5 text-foreground/50",
      )}
    >
      {label}
    </span>
  );
}
