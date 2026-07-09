import { clearUsers, ensureCatalog, createUser } from "../helpers";
import { E2E_USER } from "../e2e-fixtures";

// user-no-favorites: e2e user, catalog, favorites empty.
export function seedUserNoFavorites(): void {
  clearUsers();
  ensureCatalog();
  createUser({ ...E2E_USER });
}
