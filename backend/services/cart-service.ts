import { randomUUID } from "node:crypto";
import { and, eq, sql } from "drizzle-orm";
import { db } from "../db/client";
import { cartItems, products, type Product } from "../db/schema";

// A single cart line: the joined product row plus its quantity.
export interface CartLine {
  product: Product;
  qty: number;
}

// Cart shape returned to callers/API (CONTRACT §4).
export interface Cart {
  items: CartLine[];
  count: number;
  total: number;
}

// better-sqlite3 is synchronous, so these stay plain sync functions.
export function getCart(userId: string): Cart {
  const rows = db
    .select({ product: products, qty: cartItems.qty })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.userId, userId))
    .all();

  const items: CartLine[] = rows.map((r) => ({ product: r.product, qty: r.qty }));
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  return { items, count, total };
}

// Insert a new line at qty 1, or increment the existing line's qty.
export function addToCart(userId: string, productId: string): void {
  db.insert(cartItems)
    .values({ id: randomUUID(), userId, productId, qty: 1 })
    .onConflictDoUpdate({
      target: [cartItems.userId, cartItems.productId],
      set: { qty: sql`${cartItems.qty} + 1` },
    })
    .run();
}

// Remove the entire line for one product.
export function removeFromCart(userId: string, productId: string): void {
  db.delete(cartItems)
    .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)))
    .run();
}

// Total item count for the header badge. MUST stay exported (header imports it).
export function getCartCount(userId: string): number {
  return getCart(userId).count;
}
