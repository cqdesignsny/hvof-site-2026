import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Clock, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Showroom",
  description:
    "Visit the HVOF showroom. 37,000 sqft of office furniture configurations on Route 9 in Wappingers Falls, NY. Walk-ins welcome Monday through Friday.",
};

export default function ShowroomPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Showroom", href: "/showroom" }]} />

      {/* Hero */}
      <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 -z-10">
          <Image
            src={IMG.marshallSterling.angle7}
            alt="HVOF showroom interior"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" aria-hidden="true" />
        </div>
        <div className="container-editorial relative z-10 pb-20 pt-36 md:pb-28 md:pt-48">
          <FadeIn className="max-w-4xl">
            <p className="eyebrow text-brand-yellow">The Showroom</p>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[0.95] tracking-[-0.02em] text-white">
              Come spend<br />an afternoon.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
              37,000 square feet on Route 9. Every category we sell, laid out at full scale. Bring your team, bring your floor plans, bring your coffee mug.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-brand-yellow px-6 text-base text-foreground hover:bg-brand-yellow-hover">
                <Link href="/contact">
                  Plan a visit
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Visit info grid */}
      <section className="bg-background section-y">
        <div className="container-editorial">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Info icon={<MapPin className="h-5 w-5" />} label="Address" lines={[`${SITE.address.street}`, `${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`]} />
            <Info icon={<Clock className="h-5 w-5" />} label="Hours" lines={["Mon–Fri 8:30am–5pm", "Sat 10am–3pm"]} />
            <Info icon={<Phone className="h-5 w-5" />} label="Call ahead" lines={[SITE.contact.phone, "Saturdays by appointment"]} />
            <Info icon={<Car className="h-5 w-5" />} label="Parking" lines={["Dedicated lot on Route 9", "Free for visitors"]} />
          </div>
        </div>
      </section>

      {/* What you'll see */}
      <section className="bg-muted section-y">
        <div className="container-editorial">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">What you&apos;ll see</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Every category, at full scale.
            </h2>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              "Task seating from $200 to $1,800",
              "Sit-stand desks from every major brand",
              "Conference tables in 6 finishes",
              "Acoustic phone booths",
              "Pre-owned showroom inventory",
              "Healthcare seating",
              "Reception desks and casegoods",
              "Lounge furniture and breakroom sets",
            ].map((item, i) => (
              <FadeIn
                key={item}
                delay={i * 0.04}
                className="border-t border-border bg-background/0 py-6"
              >
                <p className="font-display text-lg font-light leading-snug">{item}</p>
              </FadeIn>
            ))}
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

function Info({ icon, label, lines }: { icon: React.ReactNode; label: string; lines: string[] }) {
  return (
    <FadeIn>
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <p className="eyebrow">{label}</p>
      </div>
      <div className="mt-3 space-y-1">
        {lines.map((line) => (
          <p key={line} className="font-display text-xl font-light leading-snug">
            {line}
          </p>
        ))}
      </div>
    </FadeIn>
  );
}
