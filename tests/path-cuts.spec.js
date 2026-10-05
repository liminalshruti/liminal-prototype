// The three demo-path cuts (01 → 11 → 10, LIM-2187) hold one claim register,
// load the canon §5 type stack, and fit a 400px phone. The claim gate reads
// every text node in the DOM (hidden panes and later beats included), not just
// what the first viewport shows.
import { test, expect } from "@playwright/test";
import { CUT_01_CANONICAL, CUT_11_CANONICAL, skipEntryOverlay } from "./helpers.js";

const PATH = [
  { name: "cut 01", url: CUT_01_CANONICAL },
  { name: "cut 11", url: CUT_11_CANONICAL },
  { name: "cut 10", url: "/cuts/10-today.html" },
];

// fixture screens never claim reality, customers or deployment
const CLAIM_WORDS = /\b(live|real|production|customers?|pilots?|partners?)\b/i;
// SHARED_CONTEXT §3 banned words
const BANNED = /\b(transformation|journey|companion|unlock\w*|manifest|healing|optimi[sz]e\w*|breakthrough|flourishing|wellness|empathic|emotional intelligence)\b/i;
// banned brand form, assembled so this file stays clean itself
const OLD_BRAND = new RegExp(["Liminal", "Space"].join(" "));
// §5: display · serif · sans · mono · hand (family names compared without spaces)
const CANON_FACES = ["NinetiesHeadliner", "PerfectlyNineties", "SpaceGrotesk", "SpaceMono", "Caveat"];

async function open(page, url) {
  await page.goto(url, { waitUntil: "load" });
  if (url === CUT_01_CANONICAL) await skipEntryOverlay(page);
  await page.waitForTimeout(1500);
}

function domText(page) {
  return page.evaluate(() => {
    const out = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) =>
        n.parentElement.closest("script,style,noscript,template")
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT,
    });
    let n;
    while ((n = walk.nextNode())) if (n.textContent.trim()) out.push(n.textContent.trim());
    for (const el of document.querySelectorAll("[title],[aria-label],[placeholder]"))
      for (const a of ["title", "aria-label", "placeholder"]) {
        const v = el.getAttribute(a);
        if (v) out.push(v);
      }
    return out;
  });
}

for (const c of PATH) {
  test(`${c.name}: one claim register, no banned words, no em dashes`, async ({ page }) => {
    await open(page, c.url);
    const texts = await domText(page);
    const hits = (re) => texts.filter((t) => re.test(t));
    expect(hits(CLAIM_WORDS), "claim words").toEqual([]);
    expect(hits(BANNED), "banned words").toEqual([]);
    expect(hits(OLD_BRAND), "brand").toEqual([]);
    // a lone "—" is an empty-value placeholder (kept as a value by #119), not prose
    expect(texts.filter((t) => t.includes("—") && t !== "—"), "em dashes").toEqual([]);
  });

  test(`${c.name}: renders only §5 faces, and the ones it uses are loaded`, async ({ page }) => {
    await open(page, c.url);
    await page.evaluate(() => document.fonts.ready);
    // faces load lazily per weight, so check each family at the weight/style it renders in
    const used = await page.evaluate(() => {
      const set = new Map();
      for (const el of document.querySelectorAll("body *")) {
        if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
        if (el.closest("script,style,noscript,template") || !el.getClientRects().length) continue;
        const cs = getComputedStyle(el);
        const family = cs.fontFamily.split(",")[0].trim().replace(/["']/g, "");
        set.set(`${cs.fontStyle} ${cs.fontWeight} 16px "${family}"`, family);
      }
      return [...set];
    });
    for (const [, f] of used) expect(CANON_FACES, `primary face "${f}"`).toContain(f.replace(/\s+/g, ""));
    const missing = await page.evaluate((specs) =>
      specs.map(([spec]) => spec).filter((spec) => !document.fonts.check(spec)), used);
    expect(missing, "faces used but not loaded").toEqual([]);
  });

  test(`${c.name}: fits a 400px phone without horizontal scroll`, async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 860 });
    await open(page, c.url);
    const { sw, cw } = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
    }));
    expect(sw).toBeLessThanOrEqual(cw);
  });
}

test("cut 11 run badge never reads live or real", async ({ page }) => {
  await open(page, CUT_11_CANONICAL);
  await expect(page.locator("#run-badge")).toHaveText("demonstration run");
  await expect(page.locator("#run-badge")).not.toHaveText(CLAIM_WORDS);
});
