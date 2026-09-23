#!/usr/bin/env node
/**
 * Resolve the sibling liminal-desktop checkout this gallery VIEWS, refresh the `./desktop`
 * symlink, and compute provenance for the banner (served live through the
 * `virtual:gallery-provenance` module in .storybook/main.ts, never written to disk).
 *
 * Resolution order:
 *   1. LIMINAL_DESKTOP_REPO (the /fe-loop skill sets this to the desktop worktree in use)
 *   2. the nearest ancestor that has a `liminal-desktop/` sibling (works from the main
 *      checkout AND from any liminal-prototype worktree under .claude/worktrees/)
 * The resolved checkout must carry FRONTEND.md: the gallery targets the desktop tree that
 * has the loop's primitives, and a checkout without it (e.g. main before #585) fails loudly
 * instead of rendering the wrong components under a truthful-looking banner.
 *
 * Why the provenance exists: liminal-desktop/scripts/tokens/sync-upstream.mjs learned the
 * hard way (desktop PR #236) that a verdict which does not name its baseline can be green
 * against the wrong branch.
 */
import { existsSync, lstatSync, readdirSync, readFileSync, realpathSync, rmSync, statSync, symlinkSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

function isDesktop(dir) {
  return existsSync(join(dir, "panda.config.ts")) && existsSync(join(dir, "src", "components", "ui"));
}

export function desktopRoot() {
  const tried = [];
  const candidates = [];
  if (process.env.LIMINAL_DESKTOP_REPO) candidates.push(resolve(process.env.LIMINAL_DESKTOP_REPO));
  let dir = here;
  for (let i = 0; i < 8; i += 1) {
    candidates.push(join(dir, "liminal-desktop"));
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  for (const c of candidates) {
    tried.push(c);
    if (!isDesktop(c)) continue;
    if (!existsSync(join(c, "FRONTEND.md"))) {
      throw new Error(
        `${c} is a liminal-desktop checkout without FRONTEND.md, so it predates the primitives these stories render.\n` +
          `Point LIMINAL_DESKTOP_REPO at a checkout on a branch that has it (e.g. the fe-loop worktree).`,
      );
    }
    return c;
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

/** Newest mtime under `dir`, symlink-safe (lstat; dangling links and swap files never throw). */
function newestMtime(dir) {
  let newest = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true, recursive: true })) {
    const p = join(entry.parentPath ?? entry.path ?? dir, entry.name);
    try {
      const st = lstatSync(p);
      if (st.isFile()) newest = Math.max(newest, st.mtimeMs);
    } catch {
      /* vanished between readdir and lstat */
    }
  }
  return newest;
}

function pkgVersion(p) {
  try {
    return JSON.parse(readFileSync(p, "utf8")).version;
  } catch {
    return null;
  }
}

export function provenance(root = desktopRoot()) {
  const rawBranch = git(root, ["rev-parse", "--abbrev-ref", "HEAD"]);
  const sha = git(root, ["rev-parse", "--short", "HEAD"]);
  const branch = rawBranch === "HEAD" ? `detached@${sha}` : rawBranch;
  const dirty = (git(root, ["status", "--porcelain"]) ?? "").split("\n").filter(Boolean).length;
  const behindRaw = git(root, ["rev-list", "--count", "HEAD..origin/main"]);
  // Everything Panda extracts from (the gallery's include is desktop/src/** plus its own config
  // and generated tokens), so an edit anywhere in it can make the emitted CSS stale.
  const sourceNewest = Math.max(
    newestMtime(join(root, "src")),
    ...["panda.config.ts", "panda.tokens.gen.ts"].map((f) => {
      try {
        return statSync(join(root, f)).mtimeMs;
      } catch {
        return 0;
      }
    }),
  );
  const generated = join(here, "styled-system", "styles.css");
  const stylesMtime = existsSync(generated) ? statSync(generated).mtimeMs : null;
  const solidDesktop = pkgVersion(join(root, "node_modules", "solid-js", "package.json"));
  const solidGallery = pkgVersion(join(here, "node_modules", "solid-js", "package.json"));
  return {
    root,
    branch,
    sha,
    dirty,
    behind: behindRaw === null ? null : Number(behindRaw),
    stale: stylesMtime === null ? true : stylesMtime < sourceNewest,
    solidDesktop,
    solidGallery,
    solidMismatch: Boolean(solidDesktop && solidGallery && solidDesktop !== solidGallery),
  };
}

export function refreshSymlink(root) {
  const link = join(here, "desktop");
  // rmSync removes a symlink (live or dangling) without touching its target and fails loudly
  // if `desktop` is somehow a real directory, which is the only case worth a stack trace.
  rmSync(link, { force: true });
  symlinkSync(root, link, "dir");
  return link;
}

export function formatProvenance(p) {
  const behindTxt = p.behind === null ? "behind: unknown (no origin/main)" : `behind origin/main: ${p.behind}`;
  const lines = [`[gallery] desktop = ${p.root}`, `[gallery] ${p.branch} @ ${p.sha} · dirty files: ${p.dirty} · ${behindTxt}`];
  if (p.stale) lines.push("[gallery] styled-system is STALE relative to desktop sources — run `npm run panda`");
  if (p.solidMismatch) lines.push(`[gallery] solid-js MISMATCH: desktop ${p.solidDesktop} vs gallery ${p.solidGallery} — pin the gallery to desktop's version`);
  return lines.join("\n");
}

const invokedDirectly = (() => {
  try {
    return process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
})();

if (invokedDirectly) {
  const root = desktopRoot();
  const link = refreshSymlink(root);
  if (process.argv.includes("--link")) {
    // Symlink only: Panda's config imports through ./desktop, so this runs before codegen.
    console.log(`[gallery] ${link} -> ${root}`);
  } else {
    console.log(formatProvenance(provenance(root)));
  }
}
