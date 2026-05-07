import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected office furniture installations across the Hudson Valley — insurance, education, healthcare, government, and corporate clients.",
};

const PROJECTS = [
  {
    name: "Marshall & Sterling",
    sector: "Insurance",
    location: "Poughkeepsie, NY",
    summary: "Four-floor reconfiguration. 240 workstations, executive offices, conference rooms.",
    image: IMG.marshallSterling.rooftop,
    href: "/work/marshall-sterling",
    feature: true,
  },
  {
    name: "Marist College",
    sector: "Higher Education",
    location: "Poughkeepsie, NY",
    summary: "Foy Hall renovation. Faculty offices, lecture seating, lounge zones.",
    image: IMG.marist.one,
    href: "/work/marist",
    feature: true,
  },
  {
    name: "Marshall & Sterling — Detail",
    sector: "Insurance",
    location: "Poughkeepsie, NY",
    summary: "Custom millwork integration with Steelcase systems.",
    image: IMG.marshallSterling.detail22,
    href: "/work/marshall-sterling",
  },
  {
    name: "Marist Lecture Common",
    sector: "Higher Education",
    location: "Poughkeepsie, NY",
    summary: "Modular soft seating in a high-traffic study area.",
    image: IMG.marist.lobby,
    href: "/work/marist",
  },
  {
    name: "Marshall & Sterling — Trading Floor",
    sector: "Insurance",
    location: "Poughkeepsie, NY",
    summary: "Sit-stand benching and acoustic privacy for an open-plan trading desk.",
    image: IMG.marshallSterling.angle14,
    href: "/work/marshall-sterling",
  },
  {
    name: "Marist Faculty Suite",
    sector: "Higher Education",
    location: "Poughkeepsie, NY",
    summary: "Private offices and shared admin pods for tenured faculty.",
    image: IMG.marist.two,
    href: "/work/marist",
  },
];

export default function WorkPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Work", href: "/work" }]} />

      <section className="bg-background pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-editorial">
          <p className="eyebrow text-muted-foreground">Selected Work</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            Forty years.<br />
            <span className="text-muted-foreground">A few we&apos;re proud of.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            We don&apos;t publish every project. These are the ones that taught us the most or showcase what we do at scale.
          </p>
        </div>
      </section>

      <section className="bg-background pb-24 md:pb-32">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            {PROJECTS.map((proj, i) => {
              const cols = proj.feature ? "md:col-span-6" : "md:col-span-4";
              const aspect = proj.feature ? "aspect-[4/5]" : "aspect-[4/5]";
              return (
                <FadeIn key={`${proj.name}-${i}`} delay={(i % 3) * 0.06} className={cols}>
                  <Link href={proj.href} className="group block">
                    <div className={`relative ${aspect} w-full overflow-hidden rounded-2xl bg-muted`}>
                      <Image
                        src={proj.image}
                        alt={`${proj.name} installation`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-5 flex items-baseline justify-between">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {proj.sector} · {proj.location}
                      </p>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-light tracking-tight md:text-3xl">{proj.name}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{proj.summary}</p>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background section-y-sm">
        <div className="container-editorial flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-brand-yellow">Have a project</p>
            <h2 className="mt-3 font-display text-4xl font-light tracking-tight md:text-5xl">
              Let&apos;s talk specifics.
            </h2>
          </div>
          <Button asChild size="lg" className="rounded-full bg-brand-yellow px-6 text-base text-foreground hover:bg-brand-yellow-hover">
            <Link href="/contact">
              Start a project
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
