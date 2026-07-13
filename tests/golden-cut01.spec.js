// Golden path · cut 01 (P1): boot → capture surface → decide → sealed
// artifact → vault preserved (single write) → guided next action to cut 11.
import { test, expect } from "@playwright/test";
import {
  CUT_01_CANONICAL,
  trackConsoleErrors,
  skipEntryOverlay,
} from "./helpers.js";

test("confirm seals once, count stays monotonic, handoff to govern shows", async ({
  page,
}) => {
  const errors = trackConsoleErrors(page);
  await page.goto(CUT_01_CANONICAL);
  await skipEntryOverlay(page);

  // boot: slate + disposition visible
  const confirm = page.locator("#dispo-primary");
  await expect(confirm).toBeVisible();
  const before = Number(await page.locator("#vault-count").textContent());

  await confirm.click();

  // sealed artifact with the honest anchor label
  const artifact = page.locator("#dispo-artifact");
  await expect(artifact).toBeVisible();
  await expect(page.locator(".da-hash-label")).toHaveText("Anchor");

  // vault count bumps by exactly one and never drops (fresh profile per test)
  await expect(page.locator("#vault-count")).toHaveText(String(before + 1));

  // exactly ONE decision record in the store (the double-write regression)
  const records = await page.evaluate(async () => {
    const vs = await import("/lib/vault-store.js");
    return vs.countDecisions(document.body.dataset.product || "personal");
  });
  expect(records).toBe(1);

  // clear next action: re-enter affordance + guided handoff to the P0 proof
  await expect(page.locator("#da-reenter")).toBeVisible();
  const next = page.locator("#da-govern-next");
  await expect(next).toBeVisible();
  await expect(next).toHaveAttribute(
    "href",
    "11-govern.html?subject=spend&beat=loop&run=govern-run.json"
  );

  expect(errors, "console errors").toEqual([]);
});

test("defer works and materializes the slept-on artifact", async ({ page }) => {
  await page.goto(CUT_01_CANONICAL);
  await skipEntryOverlay(page);

  await page.locator("#dispo-defer").click();
  const artifact = page.locator("#dispo-artifact");
  await expect(artifact).toBeVisible();
  await expect(page.locator(".da-stamp")).toHaveText("Captured");
  await expect(page.locator("#da-title")).toContainText("Slept on");
});
