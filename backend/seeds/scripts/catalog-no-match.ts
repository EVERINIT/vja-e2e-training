import { clearUsers, ensureCatalog, createUser } from "../helpers";
import { E2E_USER } from "../e2e-fixtures";

// catalog-no-match: e2e user, catalog (for search-yields-nothing / no-results test).
// Search SEARCH_NO_MATCH_TERM against this catalog to get zero results.
export function seedCatalogNoMatch(): void {
  clearUsers();
  ensureCatalog();
  createUser({ ...E2E_USER });
}
