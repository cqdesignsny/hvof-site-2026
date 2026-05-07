"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ArrowUpRight, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/site/logo";
import { NAV, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        // Always-on dark header. Apple-like. Reads on every hero.
        scrolled
          ? "bg-foreground/95 backdrop-blur-xl supports-[backdrop-filter]:bg-foreground/85"
          : "bg-foreground/85 backdrop-blur-md supports-[backdrop-filter]:bg-foreground/65",
      )}
    >
      <div className="container-editorial flex h-16 items-center justify-between md:h-20">
        <Logo size="md" variant="light" />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.primary.map((item) =>
            item.label === "Furniture" ? (
              <FurnitureMenu key={item.label} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`tel:${SITE.contact.phoneE164}`}
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-white/85 hover:text-white lg:inline-flex"
            aria-label={`Call ${SITE.contact.phone}`}
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="font-mono text-xs tracking-wide">{SITE.contact.phone}</span>
          </Link>
          <Button
            asChild
            size="sm"
            className="hidden md:inline-flex h-9 rounded-full bg-brand-yellow px-4 text-sm font-medium text-foreground hover:bg-brand-yellow-hover"
          >
            <Link href="/contact">
              Get a quote
              <ArrowUpRight className="ml-0.5 h-3.5 w-3.5" />
            </Link>
          </Button>

          {/* Mobile trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10 hover:text-white"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-md border-l-0 p-0 sm:max-w-md">
              <div className="flex h-full flex-col bg-background">
                <div className="flex items-center justify-between border-b bg-foreground px-6 py-5">
                  <Logo size="md" variant="light" />
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-8">
                  <MobileNav onClose={() => setOpen(false)} />

                  <Separator className="my-8" />

                  <div className="space-y-3">
                    <p className="eyebrow text-muted-foreground">Visit the showroom</p>
                    <p className="text-base">
                      {SITE.address.street}
                      <br />
                      {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
                    </p>
                    <p className="text-sm text-muted-foreground">{SITE.hoursDisplay}</p>
                    <Link
                      href={`tel:${SITE.contact.phoneE164}`}
                      className="inline-flex items-center gap-2 font-mono text-sm"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {SITE.contact.phone}
                    </Link>
                  </div>
                </div>

                <div className="bg-foreground p-4">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 w-full rounded-full bg-brand-yellow text-base text-foreground hover:bg-brand-yellow-hover"
                  >
                    <Link href="/contact" onClick={() => setOpen(false)}>
                      Get a quote
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MobileNav({ onClose }: { onClose: () => void }) {
  const [furnitureOpen, setFurnitureOpen] = useState(false);
  return (
    <nav className="flex flex-col gap-1">
      {NAV.primary.map((item) => {
        if (item.label === "Furniture") {
          return (
            <div key={item.label}>
              <button
                type="button"
                onClick={() => setFurnitureOpen((v) => !v)}
                className="flex w-full items-center justify-between py-3 text-2xl font-display font-light tracking-tight"
                aria-expanded={furnitureOpen}
              >
                {item.label}
                <span
                  className={cn(
                    "text-base text-muted-foreground transition-transform",
                    furnitureOpen && "rotate-90",
                  )}
                >
                  ›
                </span>
              </button>
              {furnitureOpen ? (
                <div className="ml-1 mt-1 mb-3 flex flex-col gap-2 border-l border-border pl-4">
                  {NAV.furniture.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={onClose}
                      className="py-1.5 text-base text-foreground/80 hover:text-foreground"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          );
        }
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="py-3 text-2xl font-display font-light tracking-tight hover:opacity-70"
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function FurnitureMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className={cn(
          "rounded-full px-4 py-2 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white",
          open && "bg-white/10 text-white",
        )}
        aria-expanded={open}
      >
        Furniture
      </button>
      {open ? (
        <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
          <div className="grid w-[640px] grid-cols-3 gap-1 rounded-2xl border border-border bg-background p-3 shadow-2xl shadow-black/20">
            {NAV.furniture.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-xl p-3 transition-colors hover:bg-foreground/[0.04]"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
