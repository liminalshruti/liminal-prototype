// Cut inventory (DES-181): every HTML surface under cuts/ (plus molehunt/ and
// team-drift/) has one status in cuts/cut-status.json, and the recorded drift
// matches what the files actually say. Ratchet both ways: new drift fails, and
// so does listed drift that has been fixed (update the json with the fix).
import { test, expect } from "@playwright/test";
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const INV = JSON.parse(readFileSync("cuts/cut-status.json", "utf8"));
const VOCAB = new Set(["stub", "sketch", "refining", "live"]);
const byPath = new Map(INV.cuts.map((c) => [c.path, c]));

// The status word, wherever the contract block puts it: its own line
// ("  Maturity   · live") or inline ("… · Status · sketch · …", "Maturity: live.").
// Only the file's first 80 lines are read, so the header and not body prose decides.
function header(path) {
  const top = readFileSync(path, "utf8").split("\n").slice(0, 80).join("\n");
  const m = top.match(/\b(Maturity|Status)\s*[·:]\s*([^\s·,.(]+)/);
  return m ? `${m[1]} · ${m[2]}` : null;
}

function staticDrift(c) {
  const h = header(c.path);
  const ids = [];
  if (c.status === "archive") {
    if (h && /^(live|refining|sketch|kernel-wired)$/.test(h.split(" · ")[1])) ids.push("archive-header-claims-current");
  } else if (c.kind !== "tool") {
    if (!h) ids.push("no-contract-header");
    else if (c.status === "live" && !VOCAB.has(h.split(" · ")[1])) ids.push("maturity-off-vocab");
  }
  return ids;
}

test("every cut surface is listed once, with a known status", () => {
  const onDisk = execSync(
    "git ls-files 'cuts/*.html' 'cuts/**/*.html' molehunt/index.html team-drift/index.html",
    { encoding: "utf8" },
  ).split("\n").filter(Boolean);
  const unlisted = onDisk.filter((p) => !byPath.has(p));
  expect(unlisted, "add these to cuts/cut-status.json").toEqual([]);
  expect(INV.cuts.length, "no duplicate paths").toBe(byPath.size);
  for (const c of INV.cuts) {
    expect(["live", "frozen", "archive"], c.path).toContain(c.status);
    if (!c.pendingPr) expect(existsSync(c.path), `${c.path} exists`).toBe(true);
    expect(c.path.includes("/_archive/"), `${c.path}: archive ⇔ cuts/_archive/`).toBe(c.status === "archive");
  }
});

test("frozen cuts name their ruling and say frozen in their own header", () => {
  for (const c of INV.cuts.filter((x) => x.status === "frozen")) {
    expect(c.ruling, `${c.path} ruling`).toBeTruthy();
    const top = readFileSync(c.path, "utf8").split("\n").slice(0, 80).join("\n");
    expect(top, `${c.path} header`).toMatch(/frozen/i);
  }
});

test("the demo path is 01 → 11 → 10, all live", () => {
  const path = INV.cuts.filter((c) => c.demoPath).sort((a, b) => a.demoPath - b.demoPath);
  expect(path.map((c) => c.path)).toEqual([
    "cuts/01-slate-tray.html",
    "cuts/11-govern.html",
    "cuts/10-today.html",
  ]);
  for (const c of path) expect(c.status).toBe("live");
});

test("header drift recorded in cut-status.json matches the files exactly", () => {
  const mismatches = [];
  for (const c of INV.cuts) {
    if (c.pendingPr && !existsSync(c.path)) continue;
    const actual = staticDrift(c).sort();
    const listed = (c.drift || [])
      .map((d) => d.id)
      .filter((id) => id !== "archive-no-onpage-marker")
      .sort();
    if (JSON.stringify(actual) !== JSON.stringify(listed)) mismatches.push({ path: c.path, actual, listed });
  }
  expect(mismatches).toEqual([]);
});

test("archive pages: the on-page marker drift is recorded exactly", async ({ page }) => {
  const mismatches = [];
  for (const c of INV.cuts.filter((x) => x.status === "archive")) {
    await page.goto(`/${c.path}`, { waitUntil: "load" });
    await page.waitForTimeout(300);
    const text = await page.evaluate(() => document.body.innerText);
    const marked = /\b(archived|superseded|not maintained)\b/i.test(text);
    const listed = (c.drift || []).some((d) => d.id === "archive-no-onpage-marker");
    if (marked === listed) mismatches.push({ path: c.path, marked, listed });
  }
  expect(mismatches).toEqual([]);
});
