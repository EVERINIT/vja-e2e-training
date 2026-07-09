import { clearUsers, ensureCatalog, createUser } from "../helpers";
import { E2E_USER } from "../e2e-fixtures";

// catalog-default: e2e user, full catalog, clean filter state (nothing user-specific).
export function seedCatalogDefault(): void {
  clearUsers();
  ensureCatalog();
  createUser({ ...E2E_USER });
}
