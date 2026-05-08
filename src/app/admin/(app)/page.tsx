import Link from "next/link";
import { ArrowUpRight, Users, BookOpen, Bot, Map, BarChart3 } from "lucide-react";
import { listLeads, getLeadCount } from "@/lib/leads-store";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const [leads, counts] = await Promise.all([listLeads({ limit: 5 }), getLeadCount()]);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="px-4 py-8 md:px-10 md:py-12 lg:px-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/50">
            {today}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Welcome back.
          </h1>
          <p className="mt-3 max-w-xl text-foreground/70">
            What&apos;s coming through the front door, and where to focus today.
          </p>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        <Stat
          label="Total leads"
          value={String(counts.total)}
          accent
        />
        <Stat label="Quote requests" value={String(counts.byType["main-lead"])} />
        <Stat label="Sell-to-us" value={String(counts.byType["sell-furniture"])} />
        <Stat label="Giveaway entries" value={String(counts.byType["giveaway"])} />
      </div>

      {/* Recent leads */}
      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <section className="lg:col-span-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Recent leads
            </h2>
            <Link href="/admin/leads" className="inline-flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground">
              See all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-foreground/10 bg-background">
            {leads.length === 0 ? (
              <div className="p-8 text-center text-foreground/60">
                <p className="text-base">No leads yet.</p>
                <p className="mt-1 text-sm">When someone fills the Quote Request, it lands here.</p>
              </div>
            ) : (
              <ul className="divide-y divide-foreground/10">
                {leads.map((l) => (
                  <li key={l.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-base font-semibold">
                          {[l.firstName, l.lastName].filter(Boolean).join(" ") || l.email || "Anonymous"}
                        </p>
                        <p className="text-xs text-foreground/60">
                          {l.email}
                          {l.company ? ` · ${l.company}` : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block rounded-full bg-foreground/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/70">
                          {l.formType}
                        </span>
                        <p className="mt-1 font-mono text-[11px] text-foreground/40">
                          {new Date(l.receivedAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="lg:col-span-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Quick links
          </h2>
          <div className="mt-5 space-y-2">
            <QuickLink href="/admin/leads" label="Lead pipeline" icon={Users} />
            <QuickLink href="/admin/knowledge-base" label="Knowledge base" icon={BookOpen} />
            <QuickLink href="/admin/agents" label="Agents" icon={Bot} />
            <QuickLink href="/admin/plan" label="Plan" icon={Map} />
            <QuickLink href="/admin/reports" label="Reports" icon={BarChart3} />
          </div>

          <div
            className="mt-7 rounded-2xl border-2 p-5"
            style={{ borderColor: "var(--brand-yellow)", backgroundColor: "color-mix(in srgb, var(--brand-yellow) 12%, transparent)" }}
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/70">
              Storage status
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Leads currently persist in-memory. Wire Vercel Marketplace KV / Upstash to make the pipeline durable in production.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className="rounded-2xl border-2 p-5 md:p-6"
      style={
        accent
          ? { borderColor: "var(--brand-yellow)", backgroundColor: "var(--brand-yellow)" }
          : undefined
      }
    >
      <p
        className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em]"
        style={accent ? { color: "var(--brand-ink)" } : { color: "rgb(0 0 0 / 0.55)" }}
      >
        {label}
      </p>
      <p
        className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl"
        style={accent ? { color: "var(--brand-ink)" } : undefined}
      >
        {value}
      </p>
    </div>
  );
}

function QuickLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm font-medium transition-colors hover:border-foreground/40"
    >
      <Icon className="h-4 w-4 text-foreground/60" />
      <span>{label}</span>
      <ArrowUpRight className="ml-auto h-4 w-4 text-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
    </Link>
  );
}
