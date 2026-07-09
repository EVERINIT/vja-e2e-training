import { test, expect } from "../../fixtures/test";

/*
 * CONNECTION DOC (read before writing steps)
 * Seed:      user-registered  (catalog + the e2e user exists, empty cart/favorites)
 * Route:     /login
 * Fixtures:  e2e user -> email "e2e@test.com", password "123456", name "E2E User".
 * TestIds:   login-form, login-email-input, login-password-input, login-btn, login-error
 * Rules:     correct creds set the session cookie and reach /products;
 *            wrong creds show login-error.
 */

test.describe("login", () => {
  test.beforeEach(async ({ seed }) => {
    await seed("user-registered");
  });

  test("logs in with correct credentials", async ({ page }) => {
    /* TODO: students write steps */
  });

  test("shows login-error with wrong credentials", async ({ page }) => {
    /* TODO: students write steps */
  });
});
