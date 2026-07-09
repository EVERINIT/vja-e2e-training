import { test, expect } from "../../fixtures/test";

/*
 * CONNECTION DOC (read before writing steps)
 * Seed:      catalog-search-match  (e2e user, catalog guaranteed to hold the match product)
 * Route:     /products  (log in as the e2e user first)
 * Fixtures:  e2e user -> email "e2e@test.com", password "123456".
 *            Match: search "Laptop" -> "Gaming Laptop" (id p-elec-1).
 *            No match: search "zzzznomatch" -> zero results.
 * TestIds:   search-input, product-card, no-results-message
 * Rules:     search by name; search works together with the other filters.
 */

test.describe("search", () => {
  test.beforeEach(async ({ seed }) => {
    await seed("catalog-search-match");
  });

  test("finds a product by name", async ({ page }) => {
    /* TODO: students write steps */
  });

  test("shows no-results-message for a term with no match", async ({ page }) => {
    /* TODO: students write steps */
  });
});
