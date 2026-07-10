import { productHash } from "./product-hash";

// Display-only star rating + review count derived deterministically from the
// product id. Cosmetic only, never persisted to the database.
export interface ProductRating {
  stars: number;
  reviewCount: number;
}

export function productRating(id: string): ProductRating {
  const hash = productHash(id);
  const stars = 3.5 + (hash % 16) / 10; // 3.5 .. 5.0
  const reviewCount = 12 + (hash % 488); // 12 .. 499
  return { stars: Math.round(stars * 10) / 10, reviewCount };
}
