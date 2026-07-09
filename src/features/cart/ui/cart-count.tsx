"use client";

import { useEffect, useState } from "react";
import { TESTIDS } from "@/shared/testids";
import { CART_CONFIG } from "../cart-config";

// Client fallback count badge: fetches on mount, refetches on `cart:updated`.
export function CartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let active = true;

    async function load() {
      const res = await fetch(CART_CONFIG.api.cart);
      if (!res.ok) return;
      const data = (await res.json()) as { count?: number };
      if (active) setCount(data.count ?? 0);
    }

    load();
    const handler = () => load();
    window.addEventListener("cart:updated", handler);
    return () => {
      active = false;
      window.removeEventListener("cart:updated", handler);
    };
  }, []);

  return <span data-testid={TESTIDS.cartCount}>{count}</span>;
}
