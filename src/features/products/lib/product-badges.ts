import { productHash } from "./product-hash";

// Display-only corner badge derived deterministically from the product id.
// Cosmetic only, never persisted to the database.
export type ProductBadgeKind = "new" | "trending" | "sale";

export interface ProductBadge {
  kind: ProductBadgeKind;
  discountPercent?: number;
}

const SALE_STEPS = [10, 15, 20, 25] as const;

export function productBadge(id: string): ProductBadge | null {
  const hash = productHash(id);
  const bucket = hash % 5;
  if (bucket === 0) return { kind: "new" };
  if (bucket === 1) return { kind: "trending" };
  if (bucket === 2) return { kind: "sale", discountPercent: SALE_STEPS[hash % SALE_STEPS.length] };
  return null; // buckets 3 and 4 carry no badge
}

// Original "compare at" price a sale is discounted from (compareAt > price).
export function productCompareAtPrice(price: number, discountPercent: number): number {
  return price / (1 - discountPercent / 100);
}
