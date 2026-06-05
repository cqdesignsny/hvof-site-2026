import Link from "next/link";
import { ArrowUpRight, Phone, MapPin, ShoppingBag } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/site/social-icons";

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
} as const;
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
              Furnishing the Hudson Valley&apos;s offices, healthcare facilities, and learning spaces since 1986. New, pre-owned, and custom. installed by a team that takes pride in the work.
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
              {NAV.furniture.map((i) => (
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
              href="/quote-request"
              className="group mt-5 inline-flex items-center gap-1 text-base font-medium text-brand-yellow hover:text-brand-yellow-hover"
            >
              Connect with an Expert
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/quote"
              className="mt-4 flex items-center gap-1.5 text-sm text-background/70 hover:text-background"
            >
              <ShoppingBag className="h-4 w-4" />
              Your quote cart
            </Link>
          </div>
        </div>

        <Separator className="my-12 bg-background/10" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-wider text-background/40">
            <span>© {new Date().getFullYear()} {SITE.legalName}</span>
            <Link href="/privacy" className="hover:text-background/80">Privacy</Link>
            <Link href="/sitemap.xml" className="hover:text-background/80">Sitemap</Link>
            <Link href="/admin" className="hover:text-background/80">Admin</Link>
          </div>
          <div className="flex items-center gap-3">
            {Object.entries(SITE.social).map(([key, url]) => {
              const Icon = SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS];
              if (!Icon) return null;
              return (
                <Link
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  className="grid h-10 w-10 place-items-center rounded-full bg-background/5 text-background/65 transition-colors hover:bg-background/15 hover:text-background"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
