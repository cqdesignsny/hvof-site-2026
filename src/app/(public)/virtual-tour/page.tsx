import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Virtual Tour",
  description:
    "Walk through the HVOF Wappingers Falls showroom from anywhere. Matterport 360° tour of 37,000 square feet of working office furniture configurations.",
};

const MATTERPORT_URL = "https://my.matterport.com/show/?m=Dz2yLKJbeH9";

export default function VirtualTourPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Virtual Tour", href: "/virtual-tour" },
        ]}
      />

      <section className="bg-background pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-wide">
          <p className="eyebrow text-muted-foreground">Virtual tour</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-[0.92] tracking-[-0.035em] md:text-7xl lg:text-8xl">
            Walk the showroom.<br />
            <span className="text-muted-foreground">From wherever you are.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-[1.5] text-muted-foreground md:text-2xl">
            37,000 square feet of working configurations, in 360°. Open it on your phone, pull it up in a meeting, send it to the team back at the office.
          </p>
        </div>
      </section>

      <section className="bg-background pb-24 md:pb-32">
        <div className="container-wide">
          <div className="card-image-outline relative aspect-video w-full overflow-hidden bg-black">
            <iframe
              title="HVOF showroom Matterport tour"
              src={MATTERPORT_URL}
              className="absolute inset-0 h-full w-full"
              allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer; magnetometer"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground md:text-base">
            Tip: drag to look around, click on dots to walk between rooms, tap the floor-plan icon for a top-down view.
          </p>
        </div>
      </section>

      <section className="bg-foreground text-background section-y-sm">
        <div className="container-wide flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow" style={{ color: "var(--brand-yellow)" }}>
              Or come in person
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Walk-ins welcome.
            </h2>
            <p className="mt-2 inline-flex items-center gap-2 text-base text-background/70">
              <MapPin className="h-4 w-4" style={{ color: "var(--brand-yellow)" }} />
              {SITE.address.street}, {SITE.address.city}, {SITE.address.region}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-full px-7 text-base font-semibold text-foreground hover:opacity-90" style={{ backgroundColor: "var(--brand-yellow)" }}>
              <Link href="/showroom" className="group">
                Plan a visit
                <ArrowUpRight className="ml-1 h-4 w-4 arrow-slide" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/25 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white">
              <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
