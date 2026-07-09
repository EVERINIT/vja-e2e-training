import { resetTables, ensureCatalog } from "../helpers";

// base: reset everything (user/session tables), ensure catalog, no users.
export function seedBase(): void {
  resetTables();
  ensureCatalog();
}
