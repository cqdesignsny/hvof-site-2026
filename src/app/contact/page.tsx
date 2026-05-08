import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Hudson Valley Office Furniture. Quotes within 24 hours. Visit our 37,000 sqft showroom in Wappingers Falls.",
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />

      <section className="bg-background pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-editorial">
          <p className="eyebrow text-muted-foreground">Contact</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            Let&apos;s design<br />
            <span className="text-muted-foreground">your space.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Single-chair upgrade or a full-floor install. Tell us about your project and we&apos;ll have a quote in your inbox, often same-day.
          </p>
        </div>
      </section>

      <section className="bg-background pb-24 md:pb-32">
        <div className="container-editorial">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            {/* Left: contact details */}
            <aside className="md:col-span-4">
              <div className="space-y-10 md:sticky md:top-28">
                <ContactItem
                  icon={<Phone className="h-4 w-4" />}
                  label="Call"
                  value={SITE.contact.phone}
                  href={`tel:${SITE.contact.phoneE164}`}
                  hint="Mon–Fri 8:30am–5pm"
                />
                <ContactItem
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={SITE.contact.email}
                  href={`mailto:${SITE.contact.email}`}
                  hint="Replies within 4 business hours"
                />
                <ContactItem
                  icon={<MapPin className="h-4 w-4" />}
                  label="Visit the showroom"
                  value={`${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`}
                  href="https://maps.google.com/?q=1404+US+Route+9,+Wappingers+Falls,+NY+12590"
                  hint="37,000 sqft. Walk-ins welcome."
                />
                <ContactItem
                  icon={<Clock className="h-4 w-4" />}
                  label="Hours"
                  value={SITE.hoursDisplay}
                  hint="Saturdays by appointment for projects in progress."
                />
              </div>
            </aside>

            {/* Right: form */}
            <div className="md:col-span-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-foreground">
        <div className="aspect-[16/8] w-full overflow-hidden md:aspect-[21/8]">
          <iframe
            title="HVOF showroom location"
            src="https://www.google.com/maps?q=Hudson+Valley+Office+Furniture,+1404+US-9,+Wappingers+Falls,+NY+12590&output=embed"
            className="h-full w-full grayscale-[60%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  hint?: string;
}) {
  const content = (
    <>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <p className="eyebrow text-muted-foreground">{label}</p>
      </div>
      <p className="mt-3 font-display text-xl font-semibold leading-snug">{value}</p>
      {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="group block transition-opacity hover:opacity-70">
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
}
