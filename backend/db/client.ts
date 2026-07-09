import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const DB_PATH = process.env.DATABASE_URL?.replace(/^file:/, "") || "./data/app.db";
const absPath = resolve(process.cwd(), DB_PATH);

// Ensure the data/ directory exists before opening the file.
const dir = dirname(absPath);
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true });
}

// Raw better-sqlite3 handle (synchronous).
export const sqlite = new Database(absPath);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

export const db = drizzle(sqlite, { schema });
