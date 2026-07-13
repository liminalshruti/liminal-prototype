// Playwright harness for the two canonical demo paths + the front door.
// Run: npm test (starts server.mjs on :4173 automatically).
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4173",
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    {
      name: "reduced-motion",
      use: { ...devices["Desktop Chrome"], reducedMotion: "reduce" },
      testMatch: /smoke\.spec\.js/,
    },
  ],
  webServer: {
    command: "node server.mjs",
    port: 4173,
    env: { PORT: "4173" },
    reuseExistingServer: !process.env.CI,
  },
});
