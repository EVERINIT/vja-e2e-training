import { test as base, expect } from "@playwright/test";
import { seed } from "./seed";

// A bound seed helper: specs call `await seed('user-cart-has-items')`.
type SeedFn = (name: string) => Promise<void>;

interface Fixtures {
  seed: SeedFn;
}

export const test = base.extend<Fixtures>({
  seed: async ({ request }, use) => {
    await use((name: string) => seed(request, name));
  },
});

export { expect };
