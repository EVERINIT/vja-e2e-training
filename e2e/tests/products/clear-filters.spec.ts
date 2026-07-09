import { test, expect } from "../../fixtures/test";

/*
 * CONNECTION DOC (read before writing steps)
 * Seed:      catalog-default  (e2e user, full catalog, clean filter state)
 * Route:     /products  (log in as the e2e user first)
 * Fixtures:  e2e user -> email "e2e@test.com", password "123456".
 * TestIds:   category-filter, price-min-input, price-max-input, search-input,
 *            clear-filters-btn, product-card
 * Rules:     clear-filters-btn resets category + price + search back to the full list.
 */

test.describe("clear filters", () => {
  test.beforeEach(async ({ seed }) => {
    await seed("catalog-default");
  });

  test("resets all filters to show the full catalog", async ({ page }) => {
    /* TODO: students write steps */
  });
});
