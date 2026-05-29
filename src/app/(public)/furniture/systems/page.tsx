import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { FAQSection } from "@/components/sections/faq-section";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Workstation Systems",
  description:
    "Panel systems, benching, workstations, and full-floor reconfigurations. AIS Divi, Steelcase, and Knoll systems. Floor planning, install, and reconfiguration by our crews.",
};

const AIS_BASE = "https://imagelibrary.ais-inc.com/files/images/_webp";
const SYSTEM_PHOTOS = [
  { src: `${AIS_BASE}/11_AIS_R24_DIVI_RENDERING_SCENE_01_FINAL__webp_4725b3c8d1ad97478bf348d0d48abd3d.webp`, alt: "Divi rendering, full floor" },
  { src: `${AIS_BASE}/Typical_2_V4_-_UPDATE_3_webp_4725b3c8d1ad97478bf348d0d48abd3d.webp`, alt: "Divi with linear trim" },
  { src: `${AIS_BASE}/Divi_with_Mixers_webp_4725b3c8d1ad97478bf348d0d48abd3d.webp`, alt: "Divi with Mixers, NeoCon 2023" },
  { src: `${AIS_BASE}/CHI_AIS_204-207__webp_4725b3c8d1ad97478bf348d0d48abd3d.webp`, alt: "Divi NeoCon 2022 install" },
  { src: `${AIS_BASE}/Divi_close_up_left_NeoCon_21_webp_4725b3c8d1ad97478bf348d0d48abd3d.webp`, alt: "Divi NeoCon 2021 close-up left" },
  { src: `${AIS_BASE}/Divi_close_up_right_NeoCon_21_webp_4725b3c8d1ad97478bf348d0d48abd3d.webp`, alt: "Divi NeoCon 2021 close-up right" },
  { src: `${AIS_BASE}/Divi2-back_webp_4725b3c8d1ad97478bf348d0d48abd3d.webp`, alt: "Divi back panel detail" },
  { src: `${AIS_BASE}/IAC_Client_Space_Lisa_Hubert_%285%29_webp_4725b3c8d1ad97478bf348d0d48abd3d.webp`, alt: "Client install, Divi systems" },
  { src: `${AIS_BASE}/Typical__1_Update_NEW_webp_4725b3c8d1ad97478bf348d0d48abd3d.webp`, alt: "Linear open-plan system" },
  { src: `${AIS_BASE}/Divi_Updated_10_29_23_DF_webp_4725b3c8d1ad97478bf348d0d48abd3d.webp`, alt: "Updated workstation" },
];

const FAQS = [
  {
    question: "Can you reconfigure systems we already own?",
    answer:
      "Yes. Floor reconfigurations are one of our most common projects. We field-measure, draw the new layout in CAD, source any missing parts, and install. We work with most major systems including Steelcase, Knoll, Herman Miller, and AIS.",
  },
  {
    question: "What is the lead time on a new systems install?",
    answer:
      "From kickoff to install, most full-floor systems projects run 8 to 12 weeks: 2 to 3 weeks for design and approval, 6 to 10 weeks for manufacturing, and 1 to 2 weeks for delivery and install.",
  },
  {
    question: "Can you mix new and pre-owned panels in the same floor?",
    answer:
      "Often, yes. We always have pre-owned inventory in matching finishes from major brands. We can mix new and pre-owned for cost-conscious budgets where the look stays consistent.",
  },
  {
    question: "Do you handle the electrical for power-to-the-station?",
    answer:
      "We handle the furniture-side electrical, including base-feed connections and quick-disconnects. Your electrician handles the wall-side feed. We coordinate the timing.",
  },
];

export default function SystemsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Furniture", href: "/furniture" },
          { name: "Workstation Systems", href: "/furniture/systems" },
        ]}
      />

      <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 -z-10">
          <Image src={SYSTEM_PHOTOS[0].src} alt={SYSTEM_PHOTOS[0].alt} fill priority sizes="100vw" quality={85} className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
        </div>
        <div className="container-wide relative z-10 pb-24 pt-40 md:pb-32 md:pt-52">
          <FadeIn className="max-w-5xl">
            <p className="eyebrow" style={{ color: "var(--brand-yellow)" }}>Furniture, Workstation Systems</p>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-white">
              Floor-by-floor systems.<br />
              Done with care.
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-[1.5] text-white/80 md:text-2xl">
              Panel systems, benching, workstations, and full-floor reconfigurations. AIS Divi, Steelcase, Knoll. Field-measured, CAD-drawn, installed by our crews.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">What we install</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
              From single pods<br />
              <span className="text-muted-foreground">to thirty-floor rebuilds.</span>
            </h2>
          </FadeIn>
          <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2">
            {[
              { name: "Panel-based workstations", desc: "Acoustic panels, stack-on tiles, integrated power-data, glass headers." },
              { name: "Benching systems", desc: "Open-plan benching with shared power, 4 to 30 person rows." },
              { name: "Spine-and-wing", desc: "Power spine with offset wings. Maximum density without a panel forest." },
              { name: "Hot-desk + hoteling", desc: "Mobile, height-adjustable workstations with locker integration." },
              { name: "Reconfigurations", desc: "Take what you have, redraw the floor, swap missing parts. Save vs replacing." },
              { name: "Full-floor design-build", desc: "From CAD to install. Coordinated with your architect, electrician, and IT." },
            ].map((item, i) => (
              <FadeIn key={item.name} delay={(i % 3) * 0.04} className="border-t border-border py-7 md:py-8">
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{item.name}</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Photo gallery from AIS */}
      <section className="bg-foreground text-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow" style={{ color: "var(--brand-yellow)" }}>Sample installs</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
              How systems look<br />
              <span className="text-background/55">at full scale.</span>
            </h2>
          </FadeIn>
          <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {SYSTEM_PHOTOS.map((p, i) => (
              <FadeIn key={p.src} delay={(i % 3) * 0.04}>
                <div className={`card-image-outline relative ${i % 4 === 0 ? "aspect-[4/3]" : "aspect-[4/5]"} overflow-hidden bg-black`}>
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="image-zoom object-cover" quality={75} unoptimized />
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-background/55">
            System renderings courtesy of AIS Inc, an HVOF manufacturer partner.
          </p>
        </div>
      </section>

      <section className="bg-muted section-y-sm">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">What is included</p>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
              Every install, end to end.
            </h2>
          </FadeIn>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              "Field measurement and CAD layout, included with every quote.",
              "Coordination with your electrician on power-feed timing.",
              "Day-of install supervision by our project lead.",
              "Punch list and adjustments handled by the same crew that installed.",
              "Reconfigurations of existing inventory wherever it saves you money.",
            ].map((f) => (
              <li key={f} className="flex gap-3 border-t border-border pt-5">
                <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: "var(--brand-yellow)" }} />
                <span className="text-base leading-relaxed md:text-lg">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQSection eyebrow="Common questions" heading="Buyers ask first." items={FAQS} />

      <section className="section-y" style={{ backgroundColor: "var(--brand-yellow)" }}>
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <h2 className="font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-7xl lg:text-8xl">
              Have a floor plan?<br />Send it over.
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 rounded-full bg-foreground px-8 text-base font-semibold text-background hover:bg-foreground/90">
                <Link href="/quote-request" className="group">
                  Connect with an Expert
                  <ArrowUpRight className="ml-1 h-5 w-5 arrow-slide" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-foreground/30 bg-transparent px-8 text-base text-foreground hover:bg-foreground/10">
                <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
