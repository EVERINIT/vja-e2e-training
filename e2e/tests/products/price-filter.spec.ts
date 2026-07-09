import { test, expect } from "../../fixtures/test";

/*
 * CONNECTION DOC (read before writing steps)
 * Seed:      catalog-default  (e2e user, full catalog, clean filter state)
 * Route:     /products  (log in as the e2e user first)
 * Fixtures:  e2e user -> email "e2e@test.com", password "123456".
 *            Prices span ~11..1199 (e.g. Poetry Collection 11, Gaming Laptop 1199)
 *            so a min/max range reliably includes and excludes products.
 * TestIds:   price-filter, price-min-input, price-max-input, product-card
 */

test.describe("price filter", () => {
  test.beforeEach(async ({ seed }) => {
    await seed("catalog-default");
  });

  test("filters products within a min/max price range", async ({ page }) => {
    /* TODO: students write steps */
  });
});
