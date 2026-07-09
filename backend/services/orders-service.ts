import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { orders, orderItems, cartItems } from "../db/schema";
import { getCart } from "./cart-service";

export interface CheckoutSuccess {
  orderId: string;
}

export interface CheckoutError {
  error: "cart_empty";
}

export type CheckoutResult = CheckoutSuccess | CheckoutError;

// Turn the current cart into an order, then clear the cart.
// Returns { error: 'cart_empty' } when the cart is empty (no order created).
// better-sqlite3 is synchronous, so this stays a plain sync function.
export function checkout(userId: string): CheckoutResult {
  const cart = getCart(userId);
  if (cart.items.length === 0) return { error: "cart_empty" };

  const orderId = randomUUID();
  db.insert(orders)
    .values({
      id: orderId,
      userId,
      total: cart.total,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    })
    .run();

  for (const line of cart.items) {
    db.insert(orderItems)
      .values({
        id: randomUUID(),
        orderId,
        productId: line.product.id,
        qty: line.qty,
        price: line.product.price,
      })
      .run();
  }

  db.delete(cartItems).where(eq(cartItems.userId, userId)).run();
  return { orderId };
}
