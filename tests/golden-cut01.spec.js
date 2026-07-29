// Golden path · cut 01 (P1): boot → capture surface → decide → DIVERGENCE →
// sealed artifact → vault preserved (single write) → guided next action to cut 11.
//
// 2026-07-29 · the Decide stage gained the DECIDING beat's divergence pane, so
// Confirm is now two presses: the first opens the split, the second seals through
// it. The single-write invariant this test exists to guard is unchanged — and the
// gate is now asserted alongside it, because a gate that accidentally sealed on
// the first press would reintroduce exactly the double-write regression below.
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

  const artifact = page.locator("#dispo-artifact");
  const pane = page.locator("#divergence-pane");

  // FIRST press · opens the split and seals NOTHING
  await confirm.click();
  await expect(pane).toBeVisible();
  await expect(pane.locator(".dvg-col")).toHaveCount(3);
  await expect(artifact).toBeHidden();
  await expect(page.locator("#vault-count")).toHaveText(String(before));

  // the three reads never merge · one is a typed refusal, not an empty slot
  await expect(pane.locator(".dvg-col.is-refused")).toHaveCount(1);
  await expect(pane.locator(".dvg-refusal-kind")).toContainText("refused");

  // SECOND press · seals through the split
  await confirm.click();

  // sealed artifact with the honest anchor label
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

// The divergence pane's substantive claim: WHERE you correct determines
// correction_kind. Position is the taxonomy — inner within a column, cross on the
// polarity edge, emergence on ground no agent produced. If this ever silently
// degrades to one undifferentiated "correction", the moat metric goes back to
// being a self-reported radio button.
test("correction kind is derived from position, not self-reported", async ({
  page,
}) => {
  await page.goto(CUT_01_CANONICAL);
  await skipEntryOverlay(page);

  await page.locator("#dispo-primary").click();
  const pane = page.locator("#divergence-pane");
  await expect(pane).toBeVisible();

  const ribbon = page.locator(".audit-ribbon");
  await expect(ribbon).toContainText("divergence · 3 reads");

  await pane.locator('[data-node="claim"]').first().click();
  await expect(ribbon).toContainText("correction · inner");

  await pane.locator('[data-node="edge"]').click();
  await expect(ribbon).toContainText("correction · cross");

  await pane.locator('[data-node="ground"]').click();
  await expect(ribbon).toContainText("correction · emergence");

  // still unsealed · correcting is not deciding
  await expect(page.locator("#dispo-artifact")).toBeHidden();
});

// The gate must re-arm after a seal. IDLE resets it, but the re-enter affordance
// only fires the re-surface preview and never returns the engine to IDLE — so a
// gate that armed once per page load would let every decision after the first
// seal without ever showing its split.
test("gate re-arms after sealing", async ({ page }) => {
  await page.goto(CUT_01_CANONICAL);
  await skipEntryOverlay(page);

  const confirm = page.locator("#dispo-primary");
  const pane = page.locator("#divergence-pane");
  const artifact = page.locator("#dispo-artifact");

  await confirm.click();                    // opens split
  await expect(pane).toBeVisible();
  await confirm.click();                    // seals
  await expect(artifact).toBeVisible();

  // the gate flag is the invariant · re-armed the moment the seal completes, so
  // the next decision cannot reach SEALING without its own DECIDING pass
  const seenAfterSeal = await page.evaluate(async () => {
    const d = await import("/lib/divergence.js");
    return d.isDivergenceSeen();
  });
  expect(seenAfterSeal, "gate must re-arm after sealing").toBe(false);

  // the split that produced this decision stays on screen · it is part of the record
  await expect(pane).toBeVisible();
});

// Every correction affordance must be reachable without a mouse — the pane is a
// decision gate, so keyboard users cannot be routed around it.
test("divergence affordances are keyboard-operable", async ({ page }) => {
  await page.goto(CUT_01_CANONICAL);
  await skipEntryOverlay(page);
  await page.locator("#dispo-primary").click();

  const pane = page.locator("#divergence-pane");
  const ground = pane.locator('[data-node="ground"]');
  await ground.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".audit-ribbon")).toContainText(
    "correction · emergence"
  );
  await expect(ground).toHaveClass(/is-corrected/);
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
