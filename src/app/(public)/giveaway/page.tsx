import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { ScrollText } from "@/components/motion/scroll-text";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { FacebookIcon, InstagramIcon } from "@/components/site/social-icons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "40th Anniversary Giveaway",
  description:
    "Win a height-adjustable classic desk from the Refined Collection (list price $1,460) to celebrate Hudson Valley Office Furniture's 40th anniversary. Entries open June 1 through June 30.",
};

const FOLLOWS = [
  {
    label: "Follow on Facebook",
    handle: "@HVOfficeFurniture",
    href: SITE.social.facebook,
    icon: FacebookIcon,
  },
  {
    label: "Follow on Instagram",
    handle: "@hv_office_furniture",
    href: SITE.social.instagram,
    icon: InstagramIcon,
  },
  {
    label: "Subscribe on YouTube",
    handle: "@HudsonValleyOfficeFurniture",
    href: "https://www.youtube.com/@HudsonValleyOfficeFurniture",
    icon: null,
  },
];

const STEPS = [
  { title: "Follow", body: "Follow Hudson Valley Office Furniture on Facebook, Instagram, and YouTube." },
  { title: "Enter", body: "Submit the entry form below before June 30, 2026 at 11:59 PM ET." },
  { title: "Win", body: "One winner notified the first week of July 2026. We will reach out by email." },
];

const RULES = [
  "Open to legal residents of the United States, 18+ at the time of entry.",
  "One entry per person, per follow, for the duration of the contest.",
  "Contest runs June 1, 2026 (12:00 PM ET) through June 30, 2026 (11:59 PM ET).",
  "Winner is responsible for any applicable accessories, shipping, installation, duties, and taxes.",
  "Employees, interns, and contractors of Hudson Valley Office Furniture and affiliated entities, plus their immediate families, are not eligible.",
  "No purchase necessary. Void where prohibited.",
];

export default function GiveawayPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Giveaway", href: "/giveaway" }]} />

      {/* Hero */}
      <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/giveaway/desk-2026-q2.jpg"
            alt="The height-adjustable desk we are giving away"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" aria-hidden="true" />
        </div>
        <div className="container-wide relative z-10 pb-24 pt-40 md:pb-32 md:pt-52">
          <FadeIn className="max-w-5xl">
            <p className="eyebrow" style={{ color: "var(--brand-yellow)" }}>
              40th Anniversary Giveaway
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-white">
              Win a height-adjustable<br />
              classic desk. On us.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-[1.5] text-white/80 md:text-2xl">
              We are turning 40. To say thank you to the Hudson Valley, we are giving away one height-adjustable desk from the Refined Collection. Bold lines, a weathered vintage finish, sit or stand all day. List price $1,460.
            </p>

            <div className="mt-10 grid gap-6 border-t border-white/15 pt-8 md:grid-cols-3 md:gap-10">
              <div className="flex items-start gap-3">
                <Calendar className="mt-1 h-5 w-5 shrink-0" style={{ color: "var(--brand-yellow)" }} />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">Open</p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">June 1, 12:00 PM ET</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="mt-1 h-5 w-5 shrink-0" style={{ color: "var(--brand-yellow)" }} />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">Closes</p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">June 30, 11:59 PM ET</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="mt-1 h-5 w-5 shrink-0" style={{ color: "var(--brand-yellow)" }} />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">Winner</p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">First week of July</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How to enter */}
      <section className="bg-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">How to enter</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
              Three steps.<br />
              <span className="text-muted-foreground">All free.</span>
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-x-12 gap-y-2 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.06} className="border-t border-border py-8 md:py-10">
                <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{s.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{s.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Follow buttons */}
      <section className="bg-muted section-y-sm">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">Step one</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Follow on all three.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Each platform counts as one entry, so all three triple your chances. We see your follow before we draw the winner.
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {FOLLOWS.map((f) => {
              const Icon = f.icon;
              return (
                <Link
                  key={f.handle}
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-interactive group flex items-center gap-4 p-6"
                >
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-foreground"
                    style={{ backgroundColor: "var(--brand-yellow)" }}
                  >
                    {Icon ? <Icon className="h-5 w-5" /> : <Award className="h-5 w-5" />}
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-xl font-semibold tracking-tight">{f.label}</p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {f.handle}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Entry CTA */}
      <section className="bg-background section-y-sm">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">Step two</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Submit your entry.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Tell us your name and how to reach you. One winner drawn the first week of July.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 rounded-full bg-foreground px-8 text-base font-semibold text-background hover:bg-foreground/90">
                <Link href={SITE.contact.typeformUrl} target="_blank" rel="noopener noreferrer" className="group">
                  Enter the giveaway
                  <ArrowUpRight className="ml-1 h-5 w-5 arrow-slide" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-foreground/20 bg-transparent px-8 text-base text-foreground hover:bg-foreground/5">
                <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Rules */}
      <section className="bg-muted section-y-sm">
        <div className="container-wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <FadeIn className="md:col-span-5">
              <p className="eyebrow text-muted-foreground">The fine print</p>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
                Quick read of the rules.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-7">
              <ul className="space-y-4">
                {RULES.map((rule) => (
                  <li key={rule} className="flex items-start gap-3 border-t border-border pt-5">
                    <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: "var(--brand-yellow)" }} />
                    <span className="text-base leading-relaxed text-foreground/85 md:text-lg">{rule}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-muted-foreground md:text-base">
                Sponsor: {SITE.legalName}, {SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Closer */}
      <section className="section-y" style={{ backgroundColor: "var(--brand-yellow)" }}>
        <div className="container-bleed">
          <ScrollText
            lines={["Forty years.", "One free desk."]}
            textClassName="font-display font-semibold leading-[0.9] tracking-[-0.04em] text-foreground text-[clamp(3rem,12vw,11rem)]"
            travel={28}
          />
          <div className="container-wide mt-10">
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 rounded-full bg-foreground px-8 text-base font-semibold text-background hover:bg-foreground/90">
                <Link href={SITE.contact.typeformUrl} target="_blank" rel="noopener noreferrer" className="group">
                  Enter now
                  <ArrowUpRight className="ml-1 h-5 w-5 arrow-slide" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-foreground/30 bg-transparent px-8 text-base text-foreground hover:bg-foreground/10">
                <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
