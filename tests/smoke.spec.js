// Smoke: both canonical URLs + the front door load directly, with all
// same-origin assets resolving and zero material console errors.
// Runs in both projects (default + reduced-motion).
import { test, expect } from "@playwright/test";
import {
  CUT_11_CANONICAL,
  CUT_01_CANONICAL,
  trackConsoleErrors,
} from "./helpers.js";

const SURFACES = [
  { name: "front door", url: "/index.html", marker: "See the judgment loop" },
  { name: "cut 01 canonical", url: CUT_01_CANONICAL, marker: null },
  { name: "cut 11 canonical", url: CUT_11_CANONICAL, marker: null },
];

for (const s of SURFACES) {
  test(`${s.name} loads clean`, async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const failed = [];
    page.on("response", (res) => {
      // external font CDNs are out of scope; same-origin assets must resolve
      if (res.status() >= 400 && res.url().includes("localhost")) {
        failed.push(`${res.status()} ${res.url()}`);
      }
    });

    // NOTE: server.mjs holds a live-reload connection open — networkidle never
    // fires against it. "load" + settle delay is the reliable wait here.
    await page.goto(s.url, { waitUntil: "load" });
    await page.waitForTimeout(2000);

    if (s.marker) await expect(page.getByText(s.marker)).toBeVisible();
    expect(failed, "same-origin asset failures").toEqual([]);
    expect(errors, "console errors").toEqual([]);
  });
}

test("cut 11 fixture actually loads (badge flips to demonstration run)", async ({
  page,
}) => {
  await page.goto(CUT_11_CANONICAL);
  await expect(page.locator("#run-badge")).toHaveText("demonstration run");
});

test("cut 11 missing fixture falls back to inline demo", async ({ page }) => {
  await page.goto("/cuts/11-govern.html?subject=spend&beat=loop&run=nope.json");
  // fallback keeps the badge in demo mode and still renders the loop + refusal
  await expect(page.locator("#run-badge")).toHaveText("demo");
  await expect(page.locator("body")).toHaveAttribute("data-surface", "loop");
  await expect(page.getByText(/refused/i).first()).toBeVisible();
});
