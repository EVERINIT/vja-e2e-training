import { resetTables, ensureCatalog, createUser } from "../helpers";
import { E2E_USER } from "../e2e-fixtures";

// base: reset everything, ensure catalog, and create the demo account so a fresh
// `db:reset` lets you log in immediately with the credentials shown on the login page.
export function seedBase(): void {
  resetTables();
  ensureCatalog();
  createUser({ name: E2E_USER.name, email: E2E_USER.email, password: E2E_USER.password });
}
