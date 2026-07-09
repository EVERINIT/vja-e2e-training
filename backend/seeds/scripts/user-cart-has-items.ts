import { clearUsers, ensureCatalog, createUser, addCartItem } from "../helpers";
import { E2E_USER, CART_SEED_PRODUCT_IDS } from "../e2e-fixtures";

// user-cart-has-items: e2e user, catalog, cart has 2 known products, favorites empty.
export function seedUserCartHasItems(): void {
  clearUsers();
  ensureCatalog();
  const userId = createUser({ ...E2E_USER });
  for (const productId of CART_SEED_PRODUCT_IDS) {
    addCartItem(userId, productId);
  }
}
