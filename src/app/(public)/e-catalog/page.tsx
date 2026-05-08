import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "E-Catalog",
  description:
    "Browse the full HVOF e-catalog. Thousands of office furniture options with specs, finishes, and dimensions. Powered by OfficeSource.",
};

const EXTERNAL_CATALOG_URL = "https://www.coedistributing.com/officesource-catalog/";

const BENEFITS = [
  { icon: <BookOpen className="h-7 w-7" />, title: "Thousands of products", body: "Every chair, desk, table, and panel system in our network. Specs, dimensions, finishes." },
  { icon: <Search className="h-7 w-7" />, title: "Filter by need", body: "Search by category, sub-category, finish, price, or use case. Faster than a phone call." },
  { icon: <Download className="h-7 w-7" />, title: "Save what you like", body: "Bookmark items you want to discuss, then build a quote with us when you are ready." },
];

export default function ECatalogPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "E-Catalog", href: "/e-catalog" },
        ]}
      />

      <section className="bg-background pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-wide">
          <p className="eyebrow text-muted-foreground">E-Catalog</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-[0.92] tracking-[-0.035em] md:text-7xl lg:text-8xl xl:text-9xl">
            The full catalog,<br />
            <span className="text-muted-foreground">at your fingertips.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-[1.5] text-muted-foreground md:text-2xl">
            Browse thousands of office furniture options with full specs, finishes, and dimensions. When you are ready, send us a list and we build the quote.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-14 rounded-full bg-brand-yellow px-8 text-base font-semibold text-foreground hover:bg-brand-yellow-hover">
              <Link href={EXTERNAL_CATALOG_URL} target="_blank" rel="noopener noreferrer" className="group">
                Open the catalog
                <ArrowUpRight className="ml-1 h-5 w-5 arrow-slide" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-foreground/20 bg-transparent px-8 text-base text-foreground hover:bg-foreground/5">
              <Link href="/quote">Build a quote cart</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Live flipbook embed. Right on the page so users do not need a second click. */}
      <section className="bg-background pb-24 md:pb-32">
        <div className="container-wide">
          <div className="card-image-outline relative aspect-[3/4] w-full overflow-hidden bg-black md:aspect-[16/10]">
            <iframe
              title="HVOF 2026 Hudson Valley Office Catalog"
              src="https://online.fliphtml5.com/jnqxv/2026_Hudson_Valley_Office_Catalog/#p=1"
              className="absolute inset-0 h-full w-full"
              allow="fullscreen"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground md:text-base">
            Use the arrow buttons inside the flipbook to flip pages, or click the fullscreen icon for a larger view.
          </p>
        </div>
      </section>

      <section className="bg-foreground text-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-brand-yellow">What you get</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
              Full library,<br />always current.
            </h2>
          </FadeIn>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {BENEFITS.map((b, i) => (
              <FadeIn key={b.title} delay={i * 0.06} className="rounded-2xl border border-background/15 bg-background/5 p-7 md:p-9">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-yellow text-foreground">
                  {b.icon}
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight md:text-3xl">{b.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-background/70 md:text-lg">{b.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-yellow section-y">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <h2 className="font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-7xl lg:text-8xl">
              See something?<br />Send us the list.
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 rounded-full bg-foreground px-8 text-base font-semibold text-background hover:bg-foreground/90">
                <Link href="/quote" className="group">
                  Build a quote
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
