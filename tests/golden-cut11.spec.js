// Golden path · cut 11 (P0): objective → reads → refusal → correction →
// ratify → sealed artifact → decision log. Asserted twice (fresh load and
// after the visible restart) to lock determinism.
import { test, expect } from "@playwright/test";
import { CUT_11_CANONICAL, trackConsoleErrors } from "./helpers.js";

async function runGoldenPath(page, { correct }) {
  // 1. the loop surface is up, with the run badge classified
  await expect(page.locator("body")).toHaveAttribute("data-surface", "loop");
  await expect(page.locator("#run-badge")).toHaveText("demonstration run");

  // 2. dissent: the diligence refusal is visible in the judgment hero
  await expect(page.getByText(/refused to read the team's work/i)).toBeVisible();

  // 3. reconciliation strip: naïve → dropped → verified figures render
  await expect(page.getByText(/dropped by verifier/i)).toBeVisible();

  // 4. optional operator correction on a finding
  if (correct) {
    // a viewer expands the finding first — the correct affordance lives inside
    await page.locator("[data-fexpand]").first().click({ force: true });
    await page.locator("[data-fcorrect]").first().click({ force: true });
    await page.locator(".fc-kind").first().click({ force: true });
    await page.locator("[data-fcsave]").first().click({ force: true });
    await expect(page.getByText(/correction appended/i)).toBeVisible();
  }

  // 5. ratify
  await page.locator('.db.sign').click();
  const artifact = page.locator(".artifact");
  await expect(artifact).toBeVisible();
  await expect(artifact).toContainText(
    "Opus 4.8 cannot be used for calendar management"
  );
  const entries = correct ? "entry 7/7" : "entry 6/6";
  await expect(artifact).toContainText(entries);
  if (correct) {
    await expect(artifact).toContainText("Operator made 1 correction");
  }

  // 6a. the pointer path to a second ratify is closed: Sign hides itself
  await expect(page.locator('.db.sign')).toBeHidden();

  // 6b. tab-hop re-entry restores the artifact WITHOUT duplicating the
  //     ratified chain entry (regression: it used to append one per revisit)
  await page.keyboard.press("1"); // Today (cut's own number-key nav)
  await page.keyboard.press("3"); // back to The loop
  await expect(page.locator(".artifact")).toHaveCount(1);

  // 6c. the palette's Sign action (the remaining second-ratify path) hits the
  //     guard instead of minting again
  await page.keyboard.press("ControlOrMeta+k");
  await page.getByText("Sign & hand off (ratify)").click();
  await expect(page.getByText(/already ratified this session/i)).toBeVisible();
  await expect(page.locator(".artifact")).toHaveCount(1);

  // 7. the decision log shows the classified, hash-linked trail with exactly
  //    one ratified entry
  // the palette input keeps focus after 6c and the key handler ignores inputs
  await page.evaluate(() => document.activeElement?.blur());
  await page.keyboard.press("7"); // Decision log
  await expect(page.getByText(/append-only trail/i)).toBeVisible();
  await expect(page.getByText(/anchors shown are illustrative/i)).toBeVisible();
  // the session ratification appears once in the summary line (table rows are
  // the fixture's recorded entries; the session mark must not duplicate)
  await expect(page.getByText(/1 ratified this session/)).toHaveCount(1);
  await expect(page.locator("tbody tr")).toHaveCount(4); // govern-run.json LOG length
}

test("golden path is deterministic across a restart", async ({ page }) => {
  const errors = trackConsoleErrors(page);
  await page.goto(CUT_11_CANONICAL);

  await runGoldenPath(page, { correct: false });

  // visible viewer-facing recovery: ↺ restart returns to a clean opening state
  await page.locator("#reset-demo").click();
  await expect(page.locator("body")).toHaveAttribute("data-surface", "today");

  // run 2 — after restart, the full path (now with a correction) completes
  await page.keyboard.press("3"); // The loop
  await runGoldenPath(page, { correct: true });

  expect(errors, "console errors across both runs").toEqual([]);
});

test("tampered fixture can never render live/real badge", async ({ page }) => {
  // intercept the fixture and claim mode:'live' — the badge must stay classified
  await page.route("**/govern-run.json", async (route) => {
    const res = await route.fetch();
    const body = await res.json();
    body.meta.mode = "live";
    await route.fulfill({ json: body });
  });
  await page.goto(CUT_11_CANONICAL);
  await expect(page.locator("#run-badge")).toHaveText("recorded run · fixture");
});
