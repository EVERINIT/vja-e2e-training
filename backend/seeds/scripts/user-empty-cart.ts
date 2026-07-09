import { clearUsers, ensureCatalog, createUser } from "../helpers";
import { E2E_USER } from "../e2e-fixtures";

// user-empty-cart: e2e user, catalog, cart empty, favorites empty.
export function seedUserEmptyCart(): void {
  clearUsers();
  ensureCatalog();
  createUser({ ...E2E_USER });
}
