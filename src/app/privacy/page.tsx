import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Hudson Valley Office Furniture.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Privacy", href: "/privacy" }]} />
      <section className="bg-background pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-editorial max-w-3xl">
          <p className="eyebrow text-muted-foreground">Legal</p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1] tracking-tight md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </section>
      <section className="bg-background pb-24 md:pb-32">
        <div className="container-editorial max-w-3xl space-y-8 text-base leading-relaxed text-foreground/85 md:text-lg">
          <p>
            {SITE.legalName} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates {SITE.url}. This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our service.
          </p>

          <h2 className="font-display text-2xl font-normal tracking-tight md:text-3xl">Information we collect</h2>
          <p>
            When you submit a contact form, we collect your name, email address, phone number (optional), company name (optional), and any project details you share. We use this information solely to respond to your inquiry and to coordinate the requested project.
          </p>

          <h2 className="font-display text-2xl font-normal tracking-tight md:text-3xl">How we use it</h2>
          <p>
            Personal information is used only to communicate with you about your inquiry, your order, or matters directly related to a project we are working on together. We do not sell or rent your information to third parties.
          </p>

          <h2 className="font-display text-2xl font-normal tracking-tight md:text-3xl">Cookies and analytics</h2>
          <p>
            We use Google Analytics 4 to understand site usage in aggregate. We may also use Meta Pixel for advertising effectiveness measurement. These tools may set cookies to track visits across websites. You can opt out via your browser settings.
          </p>

          <h2 className="font-display text-2xl font-normal tracking-tight md:text-3xl">Contact</h2>
          <p>
            For privacy questions or to request deletion of your information, contact us at <a className="underline" href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a> or {SITE.contact.phone}.
          </p>
        </div>
      </section>
    </>
  );
}
