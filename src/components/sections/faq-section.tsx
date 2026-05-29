import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQSchema } from "@/components/seo/json-ld";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  eyebrow?: string;
  heading: string;
  intro?: string;
  items: FAQ[];
  withSchema?: boolean;
  /** When set, renders a "See more" button below the list linking here. */
  moreHref?: string;
  moreLabel?: string;
}

export function FAQSection({
  eyebrow = "Common Questions",
  heading,
  intro,
  items,
  withSchema = true,
  moreHref,
  moreLabel = "See more FAQs",
}: FAQSectionProps) {
  return (
    <section className="bg-background section-y">
      <div className="container-editorial">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="eyebrow text-muted-foreground">{eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              {heading}
            </h2>
            {intro ? <p className="mt-5 max-w-md text-muted-foreground">{intro}</p> : null}
          </div>
          <div className="md:col-span-7">
            <Accordion type="single" collapsible className="w-full">
              {items.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b last:border-0">
                  <AccordionTrigger className="py-5 text-left text-lg font-display font-normal leading-snug hover:no-underline md:text-xl">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {moreHref ? (
              <Link
                href={moreHref}
                className="group mt-8 inline-flex items-center gap-1 text-base font-semibold text-foreground hover:gap-2"
              >
                {moreLabel}
                <ArrowUpRight className="h-5 w-5 arrow-slide" style={{ color: "var(--brand-yellow)" }} />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      {withSchema ? <FAQSchema items={items} /> : null}
    </section>
  );
}
