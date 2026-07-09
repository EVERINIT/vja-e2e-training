import type { User } from "@backend/db/schema";

// Public user shape returned by the API (never exposes the password hash).
export type AuthPublicUser = Pick<User, "id" | "name" | "email">;

// Field name a validation error is attached to.
export type AuthErrorField = "name" | "email" | "password";

// Typed result of a registration attempt at the service layer.
export type AuthRegisterResult =
  | { ok: true; user: AuthPublicUser }
  | { ok: false; error: "email_taken" };
