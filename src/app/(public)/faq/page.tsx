import type { Metadata } from "next";
import { FAQSection } from "@/components/sections/faq-section";
import { FadeIn } from "@/components/motion/fade-in";
import { GENERIC_FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Lead times, showroom hours, NYS contract eligibility, custom branding, delivery and installation, and more. Common questions about buying office furniture from Hudson Valley Office Furniture.",
};

export default function FAQPage() {
  return (
    <>
      <section className="bg-foreground text-background section-y">
        <div className="container-wide">
          <FadeIn className="max-w-4xl">
            <p className="eyebrow text-brand-yellow">Common questions</p>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
              Everything buyers<br />ask us first.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-background/75 md:text-xl">
              Lead times, showroom hours, contract pricing, custom branding, delivery, and install. If your question is not here, build a quote or call us and a real person will answer.
            </p>
          </FadeIn>
        </div>
      </section>

      <FAQSection eyebrow="FAQ" heading="Frequently asked questions." items={GENERIC_FAQS} />
    </>
  );
}
