// Demo path "Decisions with receipts" (LIM-2187): cuts/_demo.html walks
// 01 → 11 → 10 inside a thin frame. These tests lock the order, the
// always-on fixture label, keyboard operation, and that step 2 is the
// LIM-1554 JSV URL verbatim (route and params never change).
import { test, expect } from "@playwright/test";
import { CUT_11_CANONICAL, trackConsoleErrors } from "./helpers.js";

const DEMO = "/cuts/_demo.html";
const ORDER = [
  "/cuts/01-slate-tray.html",
  CUT_11_CANONICAL,
  "/cuts/10-today.html",
];
const LABEL = "prototype · deterministic fixtures";
// banned brand form, assembled so this file stays clean itself
const OLD_BRAND = new RegExp(["Liminal", "Space"].join(" "));

function framePath(page) {
  return page.locator("#demo-frame").evaluate((f) => {
    const u = new URL(f.contentWindow.location.href);
    return u.pathname + u.search;
  });
}

test("demo path walks 01 → 11 → 10 with prev/next, label on every step", async ({ page }) => {
  const errors = trackConsoleErrors(page);
  await page.goto(DEMO);
  const prev = page.locator("#demo-prev");
  const next = page.locator("#demo-next");

  for (let i = 0; i < ORDER.length; i++) {
    await expect(page).toHaveURL(i === 0 ? /_demo\.html$/ : new RegExp(`step=${i + 1}$`));
    await expect.poll(() => framePath(page)).toBe(ORDER[i]);
    await expect(page.locator("[data-demo-label]")).toHaveText(LABEL);
    await expect(page.locator("[data-demo-label]")).toBeVisible();
    await expect(page.locator("#demo-say")).not.toBeEmpty();
    await expect(page.locator(`.demo-steps a[data-step="${i + 1}"]`)).toHaveAttribute("aria-current", "step");
    if (i === 0) await expect(prev).toBeDisabled();
    if (i < ORDER.length - 1) await next.click();
  }

  await expect(next).toHaveText(/start over/i);
  await prev.click();
  await expect.poll(() => framePath(page)).toBe(ORDER[1]);
  await page.goBack({ waitUntil: "commit" });
  await expect.poll(() => framePath(page)).toBe(ORDER[2]);
  await next.click(); // start over
  await expect.poll(() => framePath(page)).toBe(ORDER[0]);
  expect(errors, "console errors on the demo frame").toEqual([]);
});

test("demo step 2 is the JSV URL verbatim and its badge stays a demonstration run", async ({ page }) => {
  await page.goto(`${DEMO}?step=2`);
  await expect(page.locator("#demo-frame")).toHaveAttribute(
    "src",
    CUT_11_CANONICAL.replace("/cuts/", ""),
  );
  await expect.poll(() => framePath(page)).toBe(CUT_11_CANONICAL);
  const frame = page.frameLocator("#demo-frame");
  await expect(frame.locator("#run-badge")).toHaveText("demonstration run");
  // the stand-alone link points at the same contract URL
  await expect(page.locator("#demo-say a.demo-open")).toHaveAttribute(
    "href",
    CUT_11_CANONICAL.replace("/cuts/", ""),
  );
});

test("demo frame is keyboard operable with visible focus", async ({ page }) => {
  await page.goto(DEMO);
  // Tab reaches the step links and the next button without a mouse
  let reached = false;
  for (let i = 0; i < 8 && !reached; i++) {
    await page.keyboard.press("Tab");
    reached = await page.evaluate(() => document.activeElement?.id === "demo-next");
  }
  expect(reached, "Tab reaches Next").toBe(true);
  const outline = await page.locator("#demo-next").evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(outline, "focus ring visible").not.toBe("none");
  await page.keyboard.press("Enter");
  await expect.poll(() => framePath(page)).toBe(ORDER[1]);
  // arrow keys work while focus is on the frame chrome
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => framePath(page)).toBe(ORDER[2]);
  await page.keyboard.press("ArrowLeft");
  await expect.poll(() => framePath(page)).toBe(ORDER[1]);
});

test("demo frame chrome passes the claim gate and loads only the §5 faces", async ({ page }) => {
  for (let step = 1; step <= ORDER.length; step++) {
    await page.goto(`${DEMO}?step=${step}`);
    const text = await page.locator(".demo-bar").innerText();
    expect(text).not.toMatch(/—/);
    expect(text).not.toMatch(/\b(live|real|production|customers?|pilots?|partners?)\b/i);
    expect(text).not.toMatch(OLD_BRAND);
  }
  const fams = await page.evaluate(() =>
    [...document.querySelectorAll(".demo-bar, .demo-bar *")].map((el) =>
      getComputedStyle(el).fontFamily.split(",")[0].trim().replace(/"/g, ""),
    ),
  );
  const canon = ["Nineties Headliner", "Perfectly Nineties", "Space Grotesk", "Space Mono"];
  for (const f of new Set(fams)) expect(canon, `primary face ${f}`).toContain(f);
  await page.evaluate(() => document.fonts.ready);
  const loaded = await page.evaluate(() =>
    [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family.replace(/"/g, "")),
  );
  for (const f of ["Space Grotesk", "Space Mono"]) expect(loaded, `${f} loaded`).toContain(f);
});

test("demo frame fits a 400px phone without horizontal scroll", async ({ page }) => {
  await page.setViewportSize({ width: 400, height: 860 });
  for (let step = 1; step <= ORDER.length; step++) {
    await page.goto(`${DEMO}?step=${step}`);
    const { sw, cw } = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
    }));
    expect(sw, `step ${step} scrollWidth`).toBeLessThanOrEqual(cw);
    // and the framed cut itself does not pan sideways
    await page.waitForTimeout(1200);
    const inner = await page.locator("#demo-frame").evaluate((f) => {
      const d = f.contentDocument.documentElement;
      return { sw: d.scrollWidth, cw: d.clientWidth };
    });
    expect(inner.sw, `step ${step} framed cut scrollWidth`).toBeLessThanOrEqual(inner.cw);
  }
});

test("demo frame respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(DEMO);
  const durations = await page.evaluate(() =>
    [...document.querySelectorAll(".demo-nav button, .demo-steps a")].map(
      (el) => getComputedStyle(el).transitionDuration,
    ),
  );
  for (const d of durations) expect(d.split(",").every((x) => parseFloat(x) === 0)).toBe(true);
});
