"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";

export function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-foreground/10 bg-background px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            className="grid h-9 w-9 place-items-center rounded-full border border-foreground/15 text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <p
            className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em]"
            style={{ color: "var(--brand-yellow)" }}
          >
            Floorplan
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      {open ? (
        <>
          <div
            className="fixed inset-0 top-16 z-30 bg-foreground/40 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside className="fixed bottom-0 left-0 top-16 z-40 w-72 max-w-[85vw] overflow-y-auto border-r border-foreground/10 bg-background shadow-2xl md:hidden">
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </>
      ) : null}
    </>
  );
}
