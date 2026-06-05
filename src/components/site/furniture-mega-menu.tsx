"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Gift } from "lucide-react";
import { NAV } from "@/lib/site";
import { LOOKS } from "@/lib/looks";
import { cn } from "@/lib/utils";

/** Category icon by href. Reuses the webp icon set from /public/icons. */
const CATEGORY_ICONS: Record<string, string> = {
  "/furniture/seating": "/icons/chair.webp",
  "/furniture/desks": "/icons/desk.webp",
  "/furniture/conference": "/icons/round-table.webp",
  "/furniture/pods": "/icons/cubicle.webp",
  "/furniture/healthcare": "/icons/doctors-room.webp",
  "/furniture/education": "/icons/classroom.webp",
  "/furniture/preowned": "/icons/chair.webp",
  "/nys-contracts": "/icons/desk.webp",
};

/** Three featured looks in the menu (a mix of seating + desks). */
const FEATURED_LOOK_SLUGS = ["basic-tasking-and-ergonomic", "conference-and-executive", "modern-with-detail"];

export function FurnitureMegaMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const openNow = () => {
    cancelClose();
    setOpen(true);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Categories: the furniture lines (minus Giveaway, featured separately) + NYS.
  const categories = [
    ...NAV.furniture.filter((i) => i.href !== "/giveaway"),
    {
      label: "NYS Contracts",
      href: "/nys-contracts",
      description: "OGS pricing for state, municipal, and nonprofit buyers.",
    },
  ];
  const featuredLooks = FEATURED_LOOK_SLUGS.map((slug) =>
    LOOKS.find((l) => l.slug === slug),
  ).filter(Boolean) as typeof LOOKS;

  return (
    <div
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={() => (open ? setOpen(false) : openNow())}
        onFocus={openNow}
        className={cn(
          "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white",
          open && "bg-white/10 text-white",
        )}
      >
        Furniture
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="furniture-mega"
            id={panelId}
            role="region"
            aria-label="Furniture menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 z-40 px-4 md:top-20"
            onMouseEnter={openNow}
            onMouseLeave={scheduleClose}
          >
            <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-black/25">
              <div className="grid grid-cols-12">
                {/* Shop by category */}
                <div className="col-span-7 p-7">
                  <p className="eyebrow text-muted-foreground">Shop by category</p>
                  <div className="mt-5 grid grid-cols-2 gap-1">
                    {categories.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-foreground/[0.04]"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-foreground/[0.04]">
                          {CATEGORY_ICONS[item.href] ? (
                            <Image
                              src={CATEGORY_ICONS[item.href]}
                              alt=""
                              width={24}
                              height={24}
                              className="h-6 w-6 object-contain grayscale"
                            />
                          ) : null}
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                            {item.label}
                            <ArrowUpRight className="h-3 w-3 text-brand-yellow opacity-0 transition-opacity group-hover:opacity-100" />
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Shop the look + CTA */}
                <div className="col-span-5 border-l border-border bg-muted/40 p-7">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow text-muted-foreground">Shop the look</p>
                    <Link
                      href="/furniture/seating"
                      onClick={() => setOpen(false)}
                      className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {featuredLooks.map((look) => (
                      <Link
                        key={look.slug}
                        href={`/furniture/${look.category}/style/${look.slug}`}
                        onClick={() => setOpen(false)}
                        className="group"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-background">
                          <Image
                            src={look.image}
                            alt={look.name}
                            fill
                            sizes="160px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <p className="mt-2 text-xs font-medium leading-snug text-foreground">
                          {look.name}
                        </p>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3 rounded-xl bg-foreground p-4 text-background">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-snug">Not sure where to start?</p>
                      <p className="mt-0.5 text-xs text-background/70">
                        Tell us the space. We will send options that fit.
                      </p>
                    </div>
                    <Link
                      href="/quote-request"
                      onClick={() => setOpen(false)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-yellow px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-white"
                    >
                      Get a quote
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs">
                    <Link
                      href="/nys-contracts"
                      onClick={() => setOpen(false)}
                      className="font-medium text-foreground transition-colors hover:text-brand-yellow-hover"
                    >
                      NYS contract pricing →
                    </Link>
                    <Link
                      href="/giveaway"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-1 font-semibold text-foreground transition-colors hover:text-brand-yellow-hover"
                    >
                      <Gift className="h-3.5 w-3.5 text-brand-yellow" />
                      Giveaway
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
