import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-auth";
import { Sidebar } from "@/components/admin/sidebar";
import { Topbar } from "@/components/admin/topbar";
import { ThemeInitScript } from "@/components/admin/theme-script";

export const metadata: Metadata = {
  title: { default: "Floorplan", template: "%s | Floorplan" },
  description: "Hudson Valley Office Furniture admin.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true } },
};

export default async function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <>
      <ThemeInitScript />
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Topbar />
        <div className="flex flex-1">
          <aside className="hidden w-64 shrink-0 border-r border-foreground/10 bg-background md:block">
            <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
              <Sidebar />
            </div>
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </>
  );
}
