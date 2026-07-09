import { test, expect } from "../../fixtures/test";

/*
 * CONNECTION DOC (read before writing steps)
 * Seed:      catalog-default  (e2e user, full 24-product catalog, clean filter state)
 * Route:     /products  (guarded: log in as the e2e user first)
 * Fixtures:  e2e user -> email "e2e@test.com", password "123456".
 *            Catalog = 24 products, 6 per category (electronics/clothing/books/home).
 * TestIds:   product-list, product-card (each card also has data-product-id={id})
 */

test.describe("product list", () => {
  test.beforeEach(async ({ seed }) => {
    await seed("catalog-default");
  });

  test("shows the product list after login", async ({ page }) => {
    /* TODO: students write steps */
  });

  test("renders all catalog products as cards", async ({ page }) => {
    /* TODO: students write steps */
  });
});
