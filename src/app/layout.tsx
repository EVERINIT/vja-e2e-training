import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { TESTIDS } from "@/shared/testids";
import { ROUTES } from "@/shared/routes";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "VJA E2E Training Store",
  description: "A QA training mini online store for writing Playwright e2e tests.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-gray-200 bg-white">
          <Container className="flex items-center justify-between py-3">
            <Link href={ROUTES.home} className="text-lg font-bold text-gray-900">
              VJA Store
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href={ROUTES.products} className="text-gray-700 hover:text-blue-600">
                Products
              </Link>
              <Link
                href={ROUTES.cart}
                data-testid={TESTIDS.cartLink}
                className="text-gray-700 hover:text-blue-600"
              >
                Cart (<span data-testid={TESTIDS.cartCount}>0</span>)
              </Link>
              <Link href={ROUTES.login} className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              {/* logout-btn placeholder; auth agent wires the action later. */}
              <button
                type="button"
                data-testid={TESTIDS.logoutBtn}
                className="text-gray-700 hover:text-blue-600"
              >
                Logout
              </button>
            </nav>
          </Container>
        </header>
        <main className="py-8">
          <Container>{children}</Container>
        </main>
      </body>
    </html>
  );
}
