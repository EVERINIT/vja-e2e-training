import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, CreditCard, MapPin, ShieldCheck, User } from "lucide-react";
import { getSessionUser } from "@backend/session";
import { ROUTES } from "@/shared/routes";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CART_CONFIG } from "@/features/cart/cart-config";
import { CATALOG_PRODUCTS } from "@/features/products/lib/product-catalog";
import { productFormatPrice } from "@/features/products/lib/product-format-price";

const P = CART_CONFIG.preview;
// Paths are literal: src/shared/routes.ts is off-limits for edits.
const CART_PATH = "/cart";

// Cosmetic, non-functional checkout preview. The graded order flow lives on /cart.
// Still a protected route: logged-out visitors are redirected to login.
export default async function CheckoutPreviewPage() {
  const user = await getSessionUser();
  if (!user) redirect(ROUTES.login);

  const sample = CATALOG_PRODUCTS.slice(0, 3);
  const subtotal = sample.reduce((sum, p) => sum + p.price, 0);
  const tax = subtotal * CART_CONFIG.taxRate;
  const total = subtotal + tax;

  return (
    <Box className="space-y-6">
      <Box className="space-y-2">
        <Badge variant="secondary">{P.checkoutBadge}</Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{P.checkoutTitle}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">{P.checkoutSubtitle}</p>
      </Box>

      <Box className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <Box className="space-y-6">
          <Card>
            <CardHeader className="flex-row items-center gap-2">
              <User className="size-4 text-muted-foreground" />
              <CardTitle className="text-base">{P.contactTitle}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Box className="space-y-1.5">
                <Label>{P.contactEmail}</Label>
                <Input type="email" placeholder="you@example.com" disabled />
              </Box>
              <Box className="space-y-1.5">
                <Label>{P.contactPhone}</Label>
                <Input placeholder="+1 555 000 0000" disabled />
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center gap-2">
              <MapPin className="size-4 text-muted-foreground" />
              <CardTitle className="text-base">{P.shippingTitle}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Box className="space-y-1.5 sm:col-span-2">
                <Label>{P.shippingName}</Label>
                <Input placeholder="Jane Doe" disabled />
              </Box>
              <Box className="space-y-1.5 sm:col-span-2">
                <Label>{P.shippingAddress}</Label>
                <Input placeholder="123 Market St" disabled />
              </Box>
              <Box className="space-y-1.5">
                <Label>{P.shippingCity}</Label>
                <Input placeholder="Springfield" disabled />
              </Box>
              <Box className="space-y-1.5">
                <Label>{P.shippingZip}</Label>
                <Input placeholder="00000" disabled />
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center gap-2">
              <CreditCard className="size-4 text-muted-foreground" />
              <CardTitle className="text-base">{P.paymentTitle}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Box className="space-y-1.5 sm:col-span-2">
                <Label>{P.paymentCard}</Label>
                <Input placeholder="4242 4242 4242 4242" disabled />
              </Box>
              <Box className="space-y-1.5">
                <Label>{P.paymentExpiry}</Label>
                <Input placeholder="04/29" disabled />
              </Box>
              <Box className="space-y-1.5">
                <Label>{P.paymentCvc}</Label>
                <Input placeholder="123" disabled />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Card className="h-fit gap-4 lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle className="text-base">{P.summaryTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Box className="space-y-3">
              {sample.map((p) => (
                <Box key={p.id} className="flex items-center gap-3">
                  <span className="size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img src={p.imageUrl} alt={p.name} className="size-full object-cover" />
                  </span>
                  <span className="flex-1 text-sm text-foreground">{p.name}</span>
                  <span className="text-sm font-medium text-foreground">
                    {productFormatPrice(p.price)}
                  </span>
                </Box>
              ))}
            </Box>
            <Separator />
            <Box className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{CART_CONFIG.text.subtotalLabel}</span>
              <span className="text-foreground">{productFormatPrice(subtotal)}</span>
            </Box>
            <Box className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{CART_CONFIG.text.shippingLabel}</span>
              <span className="font-medium text-[color:var(--success)]">
                {CART_CONFIG.text.shippingFree}
              </span>
            </Box>
            <Box className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{CART_CONFIG.text.taxLabel}</span>
              <span className="text-foreground">{productFormatPrice(tax)}</span>
            </Box>
            <Separator />
            <Box className="flex items-center justify-between text-base font-semibold text-foreground">
              <span>{CART_CONFIG.text.totalLabel}</span>
              <span>{productFormatPrice(total)}</span>
            </Box>
            <Button size="lg" className="w-full" disabled>
              {P.placeOrder}
            </Button>
            <p className="text-center text-xs text-muted-foreground">{P.disabledNote}</p>
            <Box className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5" />
              <span>{CART_CONFIG.text.secureCheckout}</span>
            </Box>
            <Button asChild variant="ghost" className="w-full">
              <Link href={CART_PATH}>
                <ArrowLeft />
                {P.backToCart}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
