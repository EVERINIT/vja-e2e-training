import { defineConfig, devices } from "@playwright/test";

// App must run on 3100 for tests (CONTRACT §7).
const baseURL = "http://localhost:3100";

export default defineConfig({
  testDir: "./tests",
  retries: 0,
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev -- --port 3100",
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
