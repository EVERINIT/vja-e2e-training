import { seedRegistry } from "./registry";

// CLI: tsx backend/seeds/run.ts <name>
function main(): void {
  const name = process.argv[2];
  if (!name) {
    console.error("Usage: tsx backend/seeds/run.ts <seed-name>");
    console.error(`Available: ${Object.keys(seedRegistry).join(", ")}`);
    process.exit(1);
  }
  const fn = seedRegistry[name];
  if (!fn) {
    console.error(`Unknown seed "${name}". Available: ${Object.keys(seedRegistry).join(", ")}`);
    process.exit(1);
  }
  fn();
  console.log(`Seed "${name}" completed.`);
}

main();
