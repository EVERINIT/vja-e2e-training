import { test, expect } from "../../fixtures/test";

/*
 * CONNECTION DOC (read before writing steps)
 * Seed:      reset-users  (catalog present; NO users, so email is free to register)
 * Route:     /register
 * Fixtures:  new creds are yours to invent; the reserved e2e user is
 *            email "e2e@test.com" / password "123456" (already-taken cases).
 * TestIds:   register-form, register-name-input, register-email-input,
 *            register-password-input, register-btn, email-error, password-error
 * Rules:     email format validated; password >= 6 chars; register does NOT auto-login.
 */

test.describe("register", () => {
  test.beforeEach(async ({ seed }) => {
    await seed("reset-users");
  });

  test("registers a new user with valid details", async ({ page }) => {
    /* TODO: students write steps */
  });

  test("shows email-error for an invalid email format", async ({ page }) => {
    /* TODO: students write steps */
  });

  test("shows password-error when password is too short", async ({ page }) => {
    /* TODO: students write steps */
  });
});
