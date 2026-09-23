#!/usr/bin/env node
/**
 * Phase D capture: serve the static build, walk every story in index.json, and hand each one
 * to Argos' argosScreenshot (writes ./screenshots, stabilizes fonts/animations/hover, waits
 * for aria-busy to clear). `npm run argos:upload` sends the folder; Argos diffs against the
 * branch's approved baseline. Plain Playwright rather than the Storybook test-runner: with
 * Storybook 10.6 the runner's Jest host refuses the config loader's module.register() hook.
 *
 *   GALLERY_REDUCED_MOTION=1   capture with prefers-reduced-motion: reduce (static states)
 *   GALLERY_TEST_PORT          static server port (default 6116)
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { chromium } from "@playwright/test";
import { argosScreenshot } from "@argos-ci/playwright";

const port = process.env.GALLERY_TEST_PORT ?? "6116";
const reduced = process.env.GALLERY_REDUCED_MOTION === "1";
if (!existsSync("storybook-static/index.json")) {
  console.error("storybook-static/ missing — run `npm run build` first (`npm test` does).");
  process.exit(2);
}
const server = spawn("npx", ["http-server", "storybook-static", "-p", port, "-s", "-a", "127.0.0.1"], { stdio: "ignore" });
const base = `http://127.0.0.1:${port}`;
const ready = async () => {
  for (let i = 0; i < 60; i += 1) {
    try { const r = await fetch(`${base}/index.json`); if (r.ok) return r.json(); } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  return null;
};
const index = await ready();
if (!index) { server.kill(); console.error("static server never answered"); process.exit(2); }
const ids = Object.keys(index.entries).filter((id) => index.entries[id].type === "story");
let failed = 0;
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1000, height: 600 }, reducedMotion: reduced ? "reduce" : "no-preference" });
const page = await context.newPage();
for (const id of ids) {
  try {
    await page.goto(`${base}/iframe.html?id=${id}&viewMode=story`, { waitUntil: "networkidle" });
    await page.waitForSelector("[data-gallery-provenance]", { timeout: 10_000 });
    // Loading placeholders are aria-busy by contract (Skeleton stories, ExaminationLoading);
    // Argos would otherwise wait forever for them to clear. Every other stabilizer stays on.
    await argosScreenshot(page, reduced ? `${id}--reduced-motion` : id, { stabilize: { waitForAriaBusy: false } });
    console.log(`✓ ${id}`);
  } catch (e) {
    failed += 1;
    console.log(`✕ ${id}: ${String(e.message).split("\n")[0]}`);
  }
}
await browser.close();
server.kill();
console.log(`${ids.length - failed} captured, ${failed} failed${reduced ? " (reduced motion)" : ""}`);
process.exit(failed ? 1 : 0);
