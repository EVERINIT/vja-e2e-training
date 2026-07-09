import { test, expect } from "../../fixtures/test";

/*
 * CONNECTION DOC (read before writing steps)
 * Seed:      user-no-favorites  (e2e user, catalog, favorites empty)
 * Route:     /products  (log in as the e2e user first)
 * Fixtures:  e2e user -> email "e2e@test.com", password "123456".
 *            Any product id works, e.g. "p-elec-1" (Gaming Laptop).
 * TestIds:   favorite-btn (inside each card; carries data-product-id and
 *            data-active="true|false" reflecting favorited state)
 * Rules:     favorites persist after a page refresh (DB-backed).
 */

test.describe("favorites", () => {
  test.beforeEach(async ({ seed }) => {
    await seed("user-no-favorites");
  });

  test("toggles a product as favorite", async ({ page }) => {
    /* TODO: students write steps */
  });

  test("keeps the favorite after a page refresh", async ({ page }) => {
    /* TODO: students write steps */
  });
});
