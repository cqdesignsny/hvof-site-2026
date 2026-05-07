import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { FAQSection } from "@/components/sections/faq-section";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site";

interface SubCategory {
  name: string;
  description: string;
  startingPrice?: string;
}

interface CategoryTemplateProps {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  subCategories: SubCategory[];
  features: string[];
  faqs: { question: string; answer: string }[];
  breadcrumb: string;
  href: string;
}

export function CategoryTemplate({
  eyebrow,
  title,
  intro,
  heroImage,
  heroAlt,
  subCategories,
  features,
  faqs,
  breadcrumb,
  href,
}: CategoryTemplateProps) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Furniture", href: "/furniture" },
          { name: breadcrumb, href },
        ]}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 -z-10">
          <Image src={heroImage} alt={heroAlt} fill priority sizes="100vw" quality={85} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" aria-hidden="true" />
        </div>
        <div className="container-editorial relative z-10 pb-20 pt-36 md:pb-28 md:pt-48">
          <FadeIn className="max-w-4xl">
            <p className="eyebrow text-brand-yellow">{eyebrow}</p>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[0.95] tracking-[-0.02em] text-white">
              {title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{intro}</p>
          </FadeIn>
        </div>
      </section>

      {/* Sub-categories */}
      <section className="bg-background section-y">
        <div className="container-editorial">
          <FadeIn className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">Selection</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Categories<br />we stock and spec.
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-x-12 gap-y-2 md:grid-cols-2">
            {subCategories.map((sub, i) => (
              <FadeIn key={sub.name} delay={i * 0.04} className="group border-t border-border py-7 md:py-9">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-light tracking-tight md:text-3xl">{sub.name}</h3>
                  {sub.startingPrice ? (
                    <p className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {sub.startingPrice}
                    </p>
                  ) : null}
                </div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  {sub.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted section-y-sm">
        <div className="container-editorial">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-muted-foreground">What&apos;s included</p>
            <h2 className="mt-4 font-display text-3xl font-light leading-[1.1] tracking-tight md:text-4xl">
              Every order, regardless of size.
            </h2>
          </FadeIn>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex gap-3 border-t border-border pt-5">
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand-yellow" />
                <span className="text-base leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        eyebrow="Common Questions"
        heading="Buyers ask first."
        items={faqs}
      />

      {/* CTA */}
      <section className="bg-brand-yellow section-y">
        <div className="container-editorial">
          <FadeIn className="max-w-3xl">
            <h2 className="font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Ready to spec?
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
              Tell us about your space. We&apos;ll have a quote and floor plan in your inbox, often same-day.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-foreground px-6 text-base text-background hover:bg-foreground/90">
                <Link href="/contact">
                  Get a quote
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-foreground/30 bg-transparent px-6 text-base text-foreground hover:bg-foreground/10"
              >
                <Link href={`tel:${SITE.contact.phoneE164}`}>{SITE.contact.phone}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
