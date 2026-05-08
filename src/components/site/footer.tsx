import Link from "next/link";
import { ArrowUpRight, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { Separator } from "@/components/ui/separator";
import { NAV, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-wide section-y">
        <div className="grid gap-16 md:grid-cols-12">
          {/* Manifesto column */}
          <div className="md:col-span-5">
            <Logo size="lg" asLink={false} />
            <p className="mt-6 max-w-md text-base leading-relaxed text-background/70">
              Furnishing the Hudson Valley&apos;s offices, healthcare facilities, and learning spaces since 1985. New, pre-owned, and custom. installed by a team that takes pride in the work.
            </p>

            <div className="mt-10 grid gap-3 text-sm">
              <Link
                href="https://maps.google.com/?q=1404+US+Route+9,+Wappingers+Falls,+NY+12590"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 text-background/70 hover:text-background"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
                </span>
              </Link>
              <Link
                href={`tel:${SITE.contact.phoneE164}`}
                className="inline-flex items-center gap-2 text-background/70 hover:text-background"
              >
                <Phone className="h-4 w-4" />
                <span className="font-mono">{SITE.contact.phone}</span>
              </Link>
              <p className="text-background/50">{SITE.hoursDisplay}</p>
            </div>
          </div>

          {/* Furniture column */}
          <div className="md:col-span-3">
            <p className="eyebrow text-background/50">Furniture</p>
            <ul className="mt-5 space-y-3">
              {NAV.furniture.slice(0, 6).map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="text-sm text-background/80 hover:text-background">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="md:col-span-2">
            <p className="eyebrow text-background/50">Company</p>
            <ul className="mt-5 space-y-3">
              {NAV.footer.company.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="text-sm text-background/80 hover:text-background">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div className="md:col-span-2">
            <p className="eyebrow text-background/50">Start a project</p>
            <Link
              href="/contact"
              className="group mt-5 inline-flex items-center gap-1 text-base font-medium text-brand-yellow hover:text-brand-yellow-hover"
            >
              Get a quote
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <Separator className="my-12 bg-background/10" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-wider text-background/40">
            <span>© {new Date().getFullYear()} {SITE.legalName}</span>
            <Link href="/privacy" className="hover:text-background/80">Privacy</Link>
            <Link href="/sitemap.xml" className="hover:text-background/80">Sitemap</Link>
          </div>
          <div className="flex items-center gap-5">
            {Object.entries(SITE.social).map(([key, url]) => (
              <Link
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider text-background/50 hover:text-background"
              >
                {key}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
