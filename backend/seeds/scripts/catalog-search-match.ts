import { clearUsers, ensureCatalog, createUser } from "../helpers";
import { E2E_USER } from "../e2e-fixtures";

// catalog-search-match: e2e user, catalog guaranteed to contain the search-test product
// (SEARCH_MATCH_PRODUCT_ID "Gaming Laptop", matched by SEARCH_MATCH_TERM "Laptop").
export function seedCatalogSearchMatch(): void {
  clearUsers();
  ensureCatalog();
  createUser({ ...E2E_USER });
}
