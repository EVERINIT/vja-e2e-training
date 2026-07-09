import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { TESTIDS } from "@/shared/testids";
import { ROUTES } from "@/shared/routes";
import { Container } from "@/components/ui/container";
import { AuthLogoutButton } from "@/features/auth/ui/auth-logout-button";
import { getSessionUserId } from "@backend/session";
import { getCartCount } from "@backend/services/cart-service";

export const metadata: Metadata = {
  title: "VJA E2E Training Store",
  description: "A QA training mini online store for writing Playwright e2e tests.",
};

// Root layout renders a session-aware header. The cart count is rendered
// server-side; product/cart mutations call router.refresh() so this re-renders
// with the new count (CONTRACT §4).
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const userId = await getSessionUserId();
  const cartCount = userId ? getCartCount(userId) : 0;

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
                Cart (<span data-testid={TESTIDS.cartCount}>{cartCount}</span>)
              </Link>
              {userId ? (
                <AuthLogoutButton />
              ) : (
                <>
                  <Link href={ROUTES.login} className="text-gray-700 hover:text-blue-600">
                    Login
                  </Link>
                  <Link href={ROUTES.register} className="text-gray-700 hover:text-blue-600">
                    Register
                  </Link>
                </>
              )}
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
