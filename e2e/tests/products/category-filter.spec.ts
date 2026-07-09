import { test, expect } from "../../fixtures/test";

/*
 * CONNECTION DOC (read before writing steps)
 * Seed:      catalog-default  (e2e user, full catalog, clean filter state)
 * Route:     /products  (log in as the e2e user first)
 * Fixtures:  e2e user -> email "e2e@test.com", password "123456".
 *            6 products per category; category ids: electronics, clothing, books, home.
 * TestIds:   category-filter, category-option-all, category-option-electronics,
 *            category-option-clothing, category-option-books, category-option-home,
 *            product-card
 */

test.describe("category filter", () => {
  test.beforeEach(async ({ seed }) => {
    await seed("catalog-default");
  });

  test("filters products by a selected category", async ({ page }) => {
    /* TODO: students write steps */
  });

  test("shows all products when 'all' is selected", async ({ page }) => {
    /* TODO: students write steps */
  });
});
