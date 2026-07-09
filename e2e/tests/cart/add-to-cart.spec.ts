import { test, expect } from "../../fixtures/test";

/*
 * CONNECTION DOC (read before writing steps)
 * Seed:      user-empty-cart  (e2e user, catalog, cart empty, favorites empty)
 * Route:     /products then /cart  (log in as the e2e user first)
 * Fixtures:  e2e user -> email "e2e@test.com", password "123456".
 *            Any product works, e.g. "p-elec-1" (Gaming Laptop).
 * TestIds:   add-to-cart-btn (inside each card; carries data-product-id),
 *            cart-count, cart-link
 * Rules:     adding a product increments cart-count.
 */

test.describe("add to cart", () => {
  test.beforeEach(async ({ seed }) => {
    await seed("user-empty-cart");
  });

  test("adds a product and updates the cart count", async ({ page }) => {
    /* TODO: students write steps */
  });
});
