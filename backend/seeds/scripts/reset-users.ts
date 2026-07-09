import { clearUsers, ensureCatalog } from "../helpers";

// reset-users: catalog present, users/favorites/cart/orders empty (register tests).
export function seedResetUsers(): void {
  clearUsers();
  ensureCatalog();
}
