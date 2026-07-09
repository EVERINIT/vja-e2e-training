import { clearUsers, ensureCatalog, createUser, addFavorite } from "../helpers";
import { E2E_USER, FAVORITE_SEED_PRODUCT_ID } from "../e2e-fixtures";

// user-has-favorites: e2e user, catalog, 1 known product already favorited.
export function seedUserHasFavorites(): void {
  clearUsers();
  ensureCatalog();
  const userId = createUser({ ...E2E_USER });
  addFavorite(userId, FAVORITE_SEED_PRODUCT_ID);
}
