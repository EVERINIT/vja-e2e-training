import { test, expect } from "../../fixtures/test";

/*
 * CONNECTION DOC (read before writing steps)
 * Seed:      user-empty-cart  (e2e user, catalog, cart empty)
 * Route:     /cart  (log in as the e2e user first)
 * Fixtures:  e2e user -> email "e2e@test.com", password "123456".
 * TestIds:   cart-page, checkout-btn
 * Rules:     checking out an empty cart is rejected (error: 'cart_empty'); no order created.
 */

test.describe("empty checkout", () => {
  test.beforeEach(async ({ seed }) => {
    await seed("user-empty-cart");
  });

  test("rejects checkout when the cart is empty", async ({ page }) => {
    /* TODO: students write steps */
  });
});
