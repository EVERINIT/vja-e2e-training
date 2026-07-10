import { test, expect } from "../../fixtures/test";

/*
 * CONNECTION DOC (read before writing steps)
 * Seed:      catalog-default  (e2e user, full 500-product catalog, clean filter state)
 * Route:     /products?category=<id>  (log in as the e2e user first)
 * Fixtures:  e2e user -> email "e2e@test.com", password "123456".
 *            Category ids: "electronics", "clothing", "books", "home".
 *            Each category holds 125 products (500 split evenly across 4 categories).
 * Behavior:  Landing on /products?category=electronics pre-selects that category, so
 *            the list is already filtered on first paint (no click needed). An unknown
 *            or missing ?category= value falls back to showing all 500.
 * TestIds:   results-count (matching count, e.g. "125 products"), product-card,
 *            category-filter / category-option-electronics (the selected state).
 */

test.describe("category deep-link", () => {
  test.beforeEach(async ({ seed }) => {
    await seed("catalog-default");
  });

  test("pre-filters the list from the ?category= query param", async ({ page }) => {
    /* TODO: students write steps */
  });

  test("falls back to the full catalog for an unknown category", async ({ page }) => {
    /* TODO: students write steps */
  });
});
