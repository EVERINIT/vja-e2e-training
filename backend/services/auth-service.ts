import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { users } from "../db/schema";
import { hashPassword, verifyPassword } from "../seeds/helpers";

// Public user shape (never exposes the password hash).
export interface AuthPublicUser {
  id: string;
  name: string;
  email: string;
}

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthenticateUserInput {
  email: string;
  password: string;
}

// Typed error thrown when the email is already registered.
export class DuplicateEmailError extends Error {
  constructor() {
    super("email_taken");
    this.name = "DuplicateEmailError";
  }
}

// better-sqlite3 raises a UNIQUE constraint failure as an Error with
// code "SQLITE_CONSTRAINT_UNIQUE" (message also contains "UNIQUE constraint failed").
function isUniqueViolation(err: unknown): boolean {
  if (typeof err !== "object" || err === null) return false;
  const code = (err as { code?: string }).code;
  const message = (err as { message?: string }).message ?? "";
  return code === "SQLITE_CONSTRAINT_UNIQUE" || message.includes("UNIQUE constraint failed");
}

// Insert a new user. Throws DuplicateEmailError on existing email.
// better-sqlite3 is synchronous, so this stays a plain sync function.
export function registerUser({ name, email, password }: RegisterUserInput): AuthPublicUser {
  const existing = db.select().from(users).where(eq(users.email, email)).get();
  if (existing) throw new DuplicateEmailError();

  const id = randomUUID();
  try {
    db.insert(users)
      .values({
        id,
        name,
        email,
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString(),
      })
      .run();
  } catch (err) {
    // The email UNIQUE constraint is the real guard; the select above can race it.
    // Map the raw SQLite constraint error to our typed one so the route answers 409,
    // not 500.
    if (isUniqueViolation(err)) throw new DuplicateEmailError();
    throw err;
  }

  return { id, name, email };
}

// Verify credentials. Returns the public user or null on failure.
export function authenticateUser({ email, password }: AuthenticateUserInput): AuthPublicUser | null {
  const row = db.select().from(users).where(eq(users.email, email)).get();
  if (!row) return null;
  if (!verifyPassword(password, row.passwordHash)) return null;
  return { id: row.id, name: row.name, email: row.email };
}
