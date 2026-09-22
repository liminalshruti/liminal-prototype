#!/usr/bin/env node
/**
 * Resolve the sibling liminal-desktop checkout this gallery VIEWS, print its provenance,
 * refresh the `./desktop` symlink, and write `.storybook/provenance.json` for the banner.
 *
 * Resolution order:
 *   1. LIMINAL_DESKTOP_REPO (the /fe-loop skill sets this to the desktop worktree in use)
 *   2. the nearest ancestor that has a `liminal-desktop/` sibling (works from the main
 *      checkout AND from any liminal-prototype worktree under .claude/worktrees/)
 *
 * Why the provenance line exists: liminal-desktop/scripts/tokens/sync-upstream.mjs learned
 * the hard way (desktop PR #236) that a verdict which does not name its baseline can be
 * green against the wrong branch. Every gallery run prints repo · branch · sha · dirty ·
 * behind-origin/main before showing a single pixel.
 */
import { existsSync, lstatSync, mkdirSync, readdirSync, statSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

function isDesktop(dir) {
  return existsSync(join(dir, "panda.config.ts")) && existsSync(join(dir, "src", "components", "ui"));
}

export function desktopRoot() {
  const tried = [];
  if (process.env.LIMINAL_DESKTOP_REPO) {
    const c = resolve(process.env.LIMINAL_DESKTOP_REPO);
    tried.push(c);
    if (isDesktop(c)) return c;
  }
  let dir = here;
  for (let i = 0; i < 8; i += 1) {
    const c = join(dir, "liminal-desktop");
    tried.push(c);
    if (isDesktop(c)) return c;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error(`liminal-desktop not found. Tried:\n  ${tried.join("\n  ")}\nSet LIMINAL_DESKTOP_REPO=/path/to/liminal-desktop (a worktree is fine).`);
}

function git(root, args) {
  try {
    return execFileSync("git", ["-C", root, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return null;
  }
}

function newestMtime(dir) {
  let newest = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) newest = Math.max(newest, newestMtime(p));
    else newest = Math.max(newest, statSync(p).mtimeMs);
  }
  return newest;
}

export function provenance() {
  const root = desktopRoot();
  const branch = git(root, ["rev-parse", "--abbrev-ref", "HEAD"]);
  const sha = git(root, ["rev-parse", "--short", "HEAD"]);
  const dirty = (git(root, ["status", "--porcelain"]) ?? "").split("\n").filter(Boolean).length;
  const behind = git(root, ["rev-list", "--count", "HEAD..origin/main"]);
  const uiNewestMtime = newestMtime(join(root, "src", "components", "ui"));
  const generated = join(here, "styled-system", "styles.css");
  const stylesMtime = existsSync(generated) ? statSync(generated).mtimeMs : null;
  return {
    root,
    branch,
    sha,
    dirty,
    behind: behind === null ? null : Number(behind),
    uiNewestMtime,
    stylesMtime,
    stale: stylesMtime === null ? true : stylesMtime < uiNewestMtime,
    generatedAt: new Date().toISOString(),
  };
}

export function refreshSymlink(root) {
  const link = join(here, "desktop");
  if (existsSync(link) || (() => { try { lstatSync(link); return true; } catch { return false; } })()) unlinkSync(link);
  symlinkSync(root, link, "dir");
  return link;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--link")) {
    // Symlink only. Panda's config imports through ./desktop, so this runs before codegen;
    // the provenance stamp (staleness included) must run AFTER codegen, hence the split.
    const link = refreshSymlink(desktopRoot());
    console.log(`[gallery] ${link} -> ${desktopRoot()}`);
    process.exit(0);
  }
  const p = provenance();
  refreshSymlink(p.root);
  mkdirSync(join(here, ".storybook"), { recursive: true });
  writeFileSync(join(here, ".storybook", "provenance.json"), JSON.stringify(p, null, 2) + "\n");
  const behindTxt = p.behind === null ? "behind: unknown (no origin/main)" : `behind origin/main: ${p.behind}`;
  console.log(`[gallery] desktop = ${p.root}\n[gallery] ${p.branch} @ ${p.sha} · dirty files: ${p.dirty} · ${behindTxt}${p.stale ? "\n[gallery] styled-system is STALE relative to src/components/ui — run `npm run panda`" : ""}`);
}
