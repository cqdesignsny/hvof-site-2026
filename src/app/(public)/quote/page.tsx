import type { Metadata } from "next";
import { QuoteCart } from "@/components/quote/quote-cart-page";
import { BreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Build your purchase order, then submit it to Hudson Valley Office Furniture for a prompt quote. Add chairs, desks, conference tables and more. Pay offline after we confirm.",
};

export default function QuotePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Quote", href: "/quote" }]} />
      <QuoteCart />
    </>
  );
}
