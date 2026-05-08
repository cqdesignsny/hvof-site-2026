import { Bot, MessageSquare, Phone, Inbox } from "lucide-react";

export const metadata = { title: "Agents" };

const AGENTS = [
  {
    name: "Concierge (web chat)",
    icon: MessageSquare,
    status: "Planned",
    body: "On-site assistant that answers product questions, qualifies leads, and books showroom visits.",
  },
  {
    name: "Phone responder",
    icon: Phone,
    status: "Planned",
    body: "After-hours phone agent that captures intent, schedules callbacks, and forwards urgent inquiries.",
  },
  {
    name: "Email triage",
    icon: Inbox,
    status: "Planned",
    body: "Reads incoming sales@ inbox, classifies, drafts responses, and routes by lead type.",
  },
];

export default function AgentsPage() {
  return (
    <div className="px-4 py-8 md:px-10 md:py-12 lg:px-14">
      <div>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/50">
          AI workforce
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Agents
        </h1>
        <p className="mt-3 max-w-2xl text-foreground/70">
          Assistant programs running on the HVOF behalf. None are live yet. Each one is wired here once it ships.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {AGENTS.map((a) => {
          const Icon = a.icon;
          return (
            <article
              key={a.name}
              className="rounded-2xl border border-foreground/10 bg-background p-6"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-foreground/5 text-foreground/70">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="rounded-full bg-foreground/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/60">
                  {a.status}
                </span>
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold leading-tight tracking-tight">
                {a.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                {a.body}
              </p>
            </article>
          );
        })}
      </div>

      <div
        className="mt-10 rounded-2xl border-2 p-6"
        style={{ borderColor: "var(--brand-yellow)", backgroundColor: "color-mix(in srgb, var(--brand-yellow) 10%, transparent)" }}
      >
        <Bot className="h-5 w-5" />
        <h2 className="mt-3 font-display text-xl font-semibold tracking-tight">
          Bring an agent online
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/75">
          Agents read from the knowledge base and write back into the lead pipeline. Once one is wired, this page becomes the dashboard for chat volume, deflection rates, and quality grading.
        </p>
      </div>
    </div>
  );
}
