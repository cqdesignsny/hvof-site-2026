"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Bot,
  Map,
  BarChart3,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Knowledge Base", href: "/admin/knowledge-base", icon: BookOpen },
  { label: "Agents", href: "/admin/agents", icon: Bot },
  { label: "Plan", href: "/admin/plan", icon: Map },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
] as const;

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname?.startsWith(href);
  }

  return (
    <nav className="flex h-full flex-col gap-1 p-3">
      <div className="px-3 py-4">
        <p
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em]"
          style={{ color: "var(--brand-yellow)" }}
        >
          Floorplan
        </p>
        <p className="mt-1 font-display text-base font-semibold leading-tight">
          Hudson Valley<br />Office Furniture
        </p>
      </div>

      <ul className="mt-2 flex-1 space-y-0.5">
        {NAV.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-foreground text-background"
                    : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
                {item.href === "/admin/leads" ? (
                  <span
                    className={cn(
                      "ml-auto rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold",
                      active
                        ? "bg-background/10 text-background"
                        : "bg-foreground/10 text-foreground/70",
                    )}
                  >
                    new
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-2 space-y-1 border-t border-foreground/10 pt-3">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          <span>View site</span>
        </Link>
        <button
          type="button"
          onClick={logout}
          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Sign out</span>
        </button>
      </div>
    </nav>
  );
}
