"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TESTIDS } from "@/shared/testids";
import { CART_CONFIG } from "../cart-config";
import type { Cart } from "../cart-types";
import { CartItem } from "./cart-item";

interface CartPageProps {
  cart: Cart;
}

const EMPTY_CART: Cart = { items: [], count: 0, total: 0 };

export function CartPage({ cart: initialCart }: CartPageProps) {
  const router = useRouter();
  const [cart, setCart] = useState<Cart>(initialCart);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function notifyCartChanged() {
    window.dispatchEvent(new Event("cart:updated"));
    router.refresh();
  }

  async function handleRemove(productId: string) {
    const res = await fetch(CART_CONFIG.api.cartItem(productId), { method: "DELETE" });
    if (!res.ok) return;
    const next = (await res.json()) as Cart;
    setCart(next);
    setError(null);
    notifyCartChanged();
  }

  async function handleCheckout() {
    setBusy(true);
    setError(null);
    const res = await fetch(CART_CONFIG.api.orders, { method: "POST" });
    setBusy(false);

    if (res.ok) {
      setSuccess(true);
      setCart(EMPTY_CART);
      notifyCartChanged();
      return;
    }

    const data = (await res.json().catch(() => ({}))) as { error?: string };
    setError(
      data.error === "cart_empty"
        ? CART_CONFIG.text.emptyCartError
        : CART_CONFIG.text.genericError
    );
  }

  const isEmpty = cart.items.length === 0;

  return (
    <Box className="space-y-4" data-testid={TESTIDS.cartPage}>
      <Heading level={1}>{CART_CONFIG.heading}</Heading>

      {success && (
        <Card>
          <Text data-testid={TESTIDS.orderSuccessMessage} className="font-medium text-green-700">
            {CART_CONFIG.text.success}
          </Text>
        </Card>
      )}

      {isEmpty ? (
        <Text>{CART_CONFIG.text.empty}</Text>
      ) : (
        <Card>
          <Box>
            {cart.items.map((line) => (
              <CartItem key={line.product.id} line={line} onRemove={handleRemove} />
            ))}
          </Box>
          <Box className="flex items-center justify-between pt-4">
            <Text className="text-base font-semibold text-gray-900">
              {CART_CONFIG.text.totalLabel}: ${cart.total.toFixed(2)}
            </Text>
          </Box>
        </Card>
      )}

      {/* Deviation: contract has no cart-error testid; using data-testid="cart-error" so empty-checkout error is locatable. Reported to orchestrator. */}
      {error && (
        <Text data-testid="cart-error" className="font-medium text-red-600">
          {error}
        </Text>
      )}

      <Box>
        <Button
          data-testid={TESTIDS.checkoutBtn}
          onClick={handleCheckout}
          disabled={busy}
        >
          {busy ? CART_CONFIG.text.checkingOut : CART_CONFIG.text.checkout}
        </Button>
      </Box>
    </Box>
  );
}
