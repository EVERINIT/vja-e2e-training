import { test, expect } from "../../fixtures/test";

/*
 * CONNECTION DOC (read before writing steps)
 * Seed:      user-cart-has-items  (e2e user, cart pre-loaded with 2 known products)
 * Route:     /cart  (log in as the e2e user first)
 * Fixtures:  e2e user -> email "e2e@test.com", password "123456".
 *            Cart contains: "p-elec-2" (Wireless Headphones), "p-book-1" (Mystery Novel).
 * TestIds:   cart-page, checkout-btn, order-success-message
 * Rules:     checkout of a non-empty cart succeeds and clears the cart.
 */

test.describe("checkout", () => {
  test.beforeEach(async ({ seed }) => {
    await seed("user-cart-has-items");
  });

  test("checks out a non-empty cart and shows success", async ({ page }) => {
    /* TODO: students write steps */
  });

  test("clears the cart after a successful checkout", async ({ page }) => {
    /* TODO: students write steps */
  });
});
