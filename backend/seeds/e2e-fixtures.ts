// Deterministic fixture data shared by seed scripts and e2e specs.
// Specs/students rely on these exact values, so seeds MUST use them.

import { PRODUCTS } from "./catalog";

// The known e2e user. Same across every seed that creates a user.
export const E2E_USER = {
  name: "E2E User",
  email: "e2e@test.com",
  password: "123456",
} as const;

// Cart seed: exactly these 2 products are placed in the cart.
export const CART_SEED_PRODUCT_IDS = ["p-elec-2", "p-book-1"] as const;

// Favorite seed: exactly this product is pre-favorited.
export const FAVORITE_SEED_PRODUCT_ID = "p-elec-1" as const;

// Search seed: this product is guaranteed present; search this term to match it.
export const SEARCH_MATCH_PRODUCT_ID = "p-elec-1" as const;
export const SEARCH_MATCH_TERM = "Laptop" as const; // matches "Gaming Laptop"

// A term guaranteed to match NOTHING in the catalog (for no-results test).
export const SEARCH_NO_MATCH_TERM = "zzzznomatch" as const;

// Guard: fail loudly if fixture ids drift from the catalog source of truth.
const catalogIds = new Set(PRODUCTS.map((p) => p.id));
for (const id of [
  ...CART_SEED_PRODUCT_IDS,
  FAVORITE_SEED_PRODUCT_ID,
  SEARCH_MATCH_PRODUCT_ID,
]) {
  if (!catalogIds.has(id)) {
    throw new Error(`e2e-fixtures references unknown product id: ${id}`);
  }
}
