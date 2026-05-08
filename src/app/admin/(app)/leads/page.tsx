import { listLeads, getLeadCount, isUsingDatabase, type StoredLead, type LeadFormType } from "@/lib/leads-store";

export const metadata = { title: "Leads" };

const TYPE_LABEL: Record<LeadFormType, string> = {
  "main-lead": "Quote Request",
  "sell-furniture": "Sell to Us",
  giveaway: "Giveaway Entry",
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const filterType = type === "main-lead" || type === "sell-furniture" || type === "giveaway"
    ? type
    : undefined;

  const [leads, counts] = await Promise.all([
    listLeads({ limit: 200, formType: filterType }),
    getLeadCount(),
  ]);
  const usingDb = isUsingDatabase();

  return (
    <div className="px-4 py-8 md:px-10 md:py-12 lg:px-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/50">
            Pipeline
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Leads
          </h1>
          <p className="mt-2 text-foreground/70">
            {counts.total} total · {counts.byType["main-lead"]} quote requests · {counts.byType["sell-furniture"]} sell-to-us · {counts.byType.giveaway} giveaway
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        <FilterChip href="/admin/leads" active={!filterType} label="All" />
        <FilterChip href="/admin/leads?type=main-lead" active={filterType === "main-lead"} label="Quote Request" />
        <FilterChip href="/admin/leads?type=sell-furniture" active={filterType === "sell-furniture"} label="Sell to Us" />
        <FilterChip href="/admin/leads?type=giveaway" active={filterType === "giveaway"} label="Giveaway" />
      </div>

      {/* Table */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-foreground/10 bg-background">
        {leads.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-display text-xl font-semibold">No leads yet.</p>
            <p className="mt-2 text-sm text-foreground/60">
              The pipeline will populate as the Quote Request and other forms get submitted.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-foreground/5">
              <tr>
                <Th>Received</Th>
                <Th>Type</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Company</Th>
                <Th>Snapshot</Th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <LeadRow key={l.id} lead={l} />
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="mt-6 text-xs text-foreground/45">
        Persistence: {usingDb ? "Neon Postgres (HVOF-DB). Durable across deploys." : "in-memory only. Set DATABASE_URL to persist."}
      </p>
    </div>
  );
}

function FilterChip({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <a
      href={href}
      className={
        active
          ? "rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-background"
          : "rounded-full border border-foreground/15 bg-background px-4 py-1.5 text-sm text-foreground/70 hover:border-foreground/40 hover:text-foreground"
      }
    >
      {label}
    </a>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/55">
      {children}
    </th>
  );
}

function LeadRow({ lead }: { lead: StoredLead }) {
  const name = [lead.firstName, lead.lastName].filter(Boolean).join(" ") || "—";
  const snapshot = buildSnapshot(lead);
  const received = new Date(lead.receivedAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return (
    <tr className="border-t border-foreground/10 align-top">
      <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-foreground/60">{received}</td>
      <td className="px-4 py-3">
        <span className="rounded-full bg-foreground/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/70">
          {TYPE_LABEL[lead.formType]}
        </span>
      </td>
      <td className="px-4 py-3 font-medium">{name}</td>
      <td className="px-4 py-3 text-foreground/75">
        {lead.email ? (
          <a href={`mailto:${lead.email}`} className="hover:text-foreground">
            {lead.email}
          </a>
        ) : (
          "—"
        )}
      </td>
      <td className="px-4 py-3 font-mono text-xs text-foreground/70">{lead.phone || "—"}</td>
      <td className="px-4 py-3 text-foreground/75">{lead.company || "—"}</td>
      <td className="max-w-md px-4 py-3 text-xs text-foreground/65">{snapshot || "—"}</td>
    </tr>
  );
}

function buildSnapshot(l: StoredLead): string {
  const bits: string[] = [];
  if (l.audience) bits.push(String(l.audience));
  if (l.businessType) bits.push(String(l.businessType));
  if (l.scope) bits.push(String(l.scope));
  if (l.timeline) bits.push(String(l.timeline));
  if (l.helpWith) bits.push(String(l.helpWith));
  if (Array.isArray(l.lookingFor) && l.lookingFor.length) {
    bits.push(`Wants: ${l.lookingFor.join(", ")}`);
  }
  if (l.notes && typeof l.notes === "string") {
    const trimmed = l.notes.length > 80 ? l.notes.slice(0, 80) + "…" : l.notes;
    bits.push(trimmed);
  }
  return bits.join(" · ");
}
