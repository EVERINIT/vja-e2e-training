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

// Insert a new user. Throws DuplicateEmailError on existing email.
// better-sqlite3 is synchronous, so this stays a plain sync function.
export function registerUser({ name, email, password }: RegisterUserInput): AuthPublicUser {
  const existing = db.select().from(users).where(eq(users.email, email)).get();
  if (existing) throw new DuplicateEmailError();

  const id = randomUUID();
  db.insert(users)
    .values({
      id,
      name,
      email,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    })
    .run();

  return { id, name, email };
}

// Verify credentials. Returns the public user or null on failure.
export function authenticateUser({ email, password }: AuthenticateUserInput): AuthPublicUser | null {
  const row = db.select().from(users).where(eq(users.email, email)).get();
  if (!row) return null;
  if (!verifyPassword(password, row.passwordHash)) return null;
  return { id: row.id, name: row.name, email: row.email };
}
