import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, Package } from "lucide-react";
import { getSessionUser } from "@backend/session";
import { ROUTES } from "@/shared/routes";
import { Box } from "@/components/ui/box";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CART_CONFIG } from "@/features/cart/cart-config";
import { CATALOG_PRODUCTS } from "@/features/products/lib/product-catalog";
import { productFormatPrice } from "@/features/products/lib/product-format-price";

const P = CART_CONFIG.preview;
const PRODUCTS_PATH = "/products";

// A few deterministic demo orders built from the static catalog. Cosmetic only.
const DEMO_ORDERS = [
  { id: "ORD-2043", date: "Jun 28, 2026", productIds: ["p-elec-2", "p-home-1"] },
  { id: "ORD-1987", date: "Jun 12, 2026", productIds: ["p-cloth-3", "p-book-6", "p-home-4"] },
  { id: "ORD-1852", date: "May 30, 2026", productIds: ["p-elec-5"] },
];

// Cosmetic order-history preview, but still a protected route.
export default async function OrdersPreviewPage() {
  const user = await getSessionUser();
  if (!user) redirect(ROUTES.login);

  const byId = new Map(CATALOG_PRODUCTS.map((p) => [p.id, p]));

  return (
    <Box className="space-y-6">
      <Box className="space-y-2">
        <Badge variant="secondary">{P.checkoutBadge}</Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{P.ordersTitle}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">{P.ordersSubtitle}</p>
      </Box>

      <Box className="space-y-4">
        {DEMO_ORDERS.map((order) => {
          const items = order.productIds.map((id) => byId.get(id)).filter(Boolean);
          const total = items.reduce((sum, p) => sum + (p?.price ?? 0), 0);
          return (
            <Card key={order.id}>
              <CardHeader className="flex-row flex-wrap items-center justify-between gap-3">
                <Box className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Package className="size-4" />
                  </span>
                  <Box>
                    <p className="text-sm font-semibold text-foreground">{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.date} · {items.length} {P.ordersItemsLabel}
                    </p>
                  </Box>
                </Box>
                <Badge variant="muted" className="gap-1 text-[color:var(--success)]">
                  <CheckCircle2 className="size-3" />
                  {P.ordersStatus}
                </Badge>
              </CardHeader>
              <Separator />
              <CardContent className="space-y-3 pt-2">
                {items.map(
                  (p) =>
                    p && (
                      <Box key={p.id} className="flex items-center gap-3">
                        <span className="size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <img src={p.imageUrl} alt={p.name} className="size-full object-cover" />
                        </span>
                        <span className="flex-1 text-sm text-foreground">{p.name}</span>
                        <span className="text-sm font-medium text-foreground">
                          {productFormatPrice(p.price)}
                        </span>
                      </Box>
                    )
                )}
                <Separator />
                <Box className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    {CART_CONFIG.text.totalLabel} {productFormatPrice(total)}
                  </span>
                  <Button asChild variant="outline" size="sm">
                    <Link href={PRODUCTS_PATH}>{P.ordersReorder}</Link>
                  </Button>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
