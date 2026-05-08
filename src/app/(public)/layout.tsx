import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { QuoteCartIndicator } from "@/components/quote/cart-indicator";

/**
 * Public site shell: customer-facing chrome wraps everything inside (public).
 * /admin and other internal routes get their own chrome.
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <QuoteCartIndicator />
    </>
  );
}
