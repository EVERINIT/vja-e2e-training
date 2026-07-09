import { test, expect } from "../../fixtures/test";

/*
 * CONNECTION DOC (read before writing steps)
 * Seed:      user-cart-has-items  (e2e user, cart pre-loaded with 2 known products)
 * Route:     /cart  (log in as the e2e user first)
 * Fixtures:  e2e user -> email "e2e@test.com", password "123456".
 *            Cart contains: "p-elec-2" (Wireless Headphones), "p-book-1" (Mystery Novel).
 * TestIds:   cart-page, remove-cart-item-btn (per row; carries data-product-id), cart-count
 * Rules:     removing a line updates cart-count.
 */

test.describe("remove from cart", () => {
  test.beforeEach(async ({ seed }) => {
    await seed("user-cart-has-items");
  });

  test("removes a line item from the cart", async ({ page }) => {
    /* TODO: students write steps */
  });
});
