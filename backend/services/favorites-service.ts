import { randomUUID } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { db } from "../db/client";
import { favorites } from "../db/schema";

export function getFavoriteProductIds(userId: string): string[] {
  return db
    .select({ productId: favorites.productId })
    .from(favorites)
    .where(eq(favorites.userId, userId))
    .all()
    .map((r) => r.productId);
}

// Adds the favorite if absent, otherwise removes it. Returns the updated id list.
export function toggleFavorite(userId: string, productId: string): string[] {
  const existing = db
    .select({ id: favorites.id })
    .from(favorites)
    .where(and(eq(favorites.userId, userId), eq(favorites.productId, productId)))
    .get();

  if (existing) {
    db.delete(favorites).where(eq(favorites.id, existing.id)).run();
  } else {
    db.insert(favorites).values({ id: randomUUID(), userId, productId }).run();
  }

  return getFavoriteProductIds(userId);
}
