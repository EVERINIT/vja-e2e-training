import type { Product } from "@backend/db/schema";

// Type-only aliases mirroring the cart-service shapes (safe for client bundles).
export type CartLine = { product: Product; qty: number };
export type Cart = { items: CartLine[]; count: number; total: number };
export type CheckoutResponse = { orderId: string } | { error: "cart_empty" };
