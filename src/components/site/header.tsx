"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ArrowUpRight, Phone, ShoppingBag } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/site/social-icons";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/site/logo";
import { FurnitureMegaMenu } from "@/components/site/furniture-mega-menu";
import { NAV, SITE } from "@/lib/site";
import { useQuoteCart } from "@/lib/quote-cart";
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
        // Always-on solid black. No backdrop blur picking up bluish hero tints.
        scrolled
          ? "bg-black shadow-lg shadow-black/20"
          : "bg-black/95 supports-[backdrop-filter]:bg-black/90 backdrop-blur-xl",
      )}
    >
      <div className="container-editorial flex h-16 items-center justify-between md:h-20">
        <Logo size="md" />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.primary.map((item) =>
            item.label === "Furniture" ? (
              <FurnitureMegaMenu key={item.label} />
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
          {/* Social icons. Hidden under md to keep mobile clean. */}
          <div className="hidden items-center gap-1 lg:flex">
            <Link
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <FacebookIcon className="h-4 w-4" />
            </Link>
            <Link
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <InstagramIcon className="h-4 w-4" />
            </Link>
            <Link
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LinkedInIcon className="h-4 w-4" />
            </Link>
            <span className="mx-1 h-4 w-px bg-white/15" aria-hidden="true" />
          </div>

          <Link
            href={`tel:${SITE.contact.phoneE164}`}
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-white/85 hover:text-white lg:inline-flex"
            aria-label={`Call ${SITE.contact.phone}`}
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="font-mono text-xs tracking-wide">{SITE.contact.phone}</span>
          </Link>
          <HeaderQuoteCart />
          <Button
            asChild
            size="sm"
            className="hidden md:inline-flex h-9 rounded-full bg-brand-yellow px-4 text-sm font-medium text-foreground hover:bg-white hover:text-foreground focus-visible:bg-white focus-visible:text-foreground"
          >
            <Link href="/quote-request">
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
                  <Logo size="md" />
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

                  <div className="mt-8 flex items-center gap-2 border-t pt-6">
                    <span className="eyebrow text-muted-foreground">Follow</span>
                    <Link
                      href={SITE.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="grid h-9 w-9 place-items-center rounded-full bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10"
                    >
                      <FacebookIcon className="h-4 w-4" />
                    </Link>
                    <Link
                      href={SITE.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="grid h-9 w-9 place-items-center rounded-full bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10"
                    >
                      <InstagramIcon className="h-4 w-4" />
                    </Link>
                    <Link
                      href={SITE.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="grid h-9 w-9 place-items-center rounded-full bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10"
                    >
                      <LinkedInIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="bg-foreground p-4">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 w-full rounded-full bg-brand-yellow text-base text-foreground hover:bg-white hover:text-foreground focus-visible:bg-white focus-visible:text-foreground"
                  >
                    <Link href="/quote-request" onClick={() => setOpen(false)}>
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

/** Quote-cart link in the header. Appears once the cart has items so people
 *  can always find their way back to /quote. */
function HeaderQuoteCart() {
  const count = useQuoteCart((s) => s.count());
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  if (!hydrated || count === 0) return null;
  return (
    <Link
      href="/quote"
      aria-label={`View quote cart (${count} item${count === 1 ? "" : "s"})`}
      className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
    >
      <ShoppingBag className="h-4 w-4" />
      <span className="hidden sm:inline">Quote</span>
      <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-brand-yellow px-1 text-[11px] font-bold text-foreground">
        {count}
      </span>
    </Link>
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
                className="flex w-full items-center justify-between py-3 text-2xl font-display font-semibold tracking-tight"
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
            className="py-3 text-2xl font-display font-semibold tracking-tight hover:opacity-70"
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

