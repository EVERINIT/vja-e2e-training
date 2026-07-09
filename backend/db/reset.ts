import { dropAllTables, createAllTables } from "./ddl";
import { seedBase } from "../seeds/scripts/base";

// tsx backend/db/reset.ts — drop+recreate all tables, then run base catalog seed.
function main(): void {
  dropAllTables();
  createAllTables();
  seedBase();
  console.log("DB reset complete: tables recreated + base catalog seeded.");
}

main();
