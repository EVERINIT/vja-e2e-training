import { clearUsers, ensureCatalog, createUser } from "../helpers";
import { E2E_USER } from "../e2e-fixtures";

// user-registered: catalog + the e2e user exists, empty cart/favorites (login tests).
export function seedUserRegistered(): void {
  clearUsers();
  ensureCatalog();
  createUser({ ...E2E_USER });
}
