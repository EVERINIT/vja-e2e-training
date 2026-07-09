import { redirect } from "next/navigation";
import { getSessionUser } from "@backend/session";
import { getCart } from "@backend/services/cart-service";
import { ROUTES } from "@/shared/routes";
import { CartPage } from "@/features/cart/ui/cart-page";

// Server component: guard the route, load cart server-side, hand to the client page.
export default async function CartRoutePage() {
  const user = await getSessionUser();
  if (!user) redirect(ROUTES.login);

  const cart = getCart(user.id);
  return <CartPage cart={cart} />;
}
