import { seedBase } from "./scripts/base";

// Maps seed name -> seed fn. Keep entries easy to extend.
export const seedRegistry: Record<string, () => void> = {
  base: seedBase,
  // OTHER SEEDS ADDED BY seeds agent
};
