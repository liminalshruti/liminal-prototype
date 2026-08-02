#!/usr/bin/env node
/**
 * sync-upstream.mjs — copy canon design files (liminal-creative) into this repo's
 * consumer copies, byte-identical. Currently syncs the token file AND the framing
 * component CSS.
 *
 *   node scripts/tokens/sync-upstream.mjs           # copy all
 *   node scripts/tokens/sync-upstream.mjs --check   # compare hashes (drift guard)
 *
 * Mirrors liminal-desktop/scripts/tokens/sync-upstream.mjs — same md5-verify
 * contract per liminal-creative/tokens/README.md — MINUS Panda codegen (this is
 * a buildless, GitHub-Pages-served consumer: the cuts <link> the committed CSS
 * directly, so there is no generate step).
 *
 * Why copies and not symlinks: a tracked symlink is stored by git as a path
 * string, and canon is a SEPARATE repo — on any sibling-less checkout (a fresh
 * clone, CI, the GitHub Pages deploy) the symlink dangles and the CSS 404s.
 * Committed flat copies can't 404; this script is the discipline that keeps them
 * in lockstep. (See _scratch/PORT_RECONCILIATION_SCOPE §2.)
 *
 * If the canon checkout is absent (someone clones the prototype alone), every
 * file no-ops with a warning and the run exits 0 — the committed local copies are
 * what the site serves either way, so the deployed prototype is unaffected.
 *
 * Baseline is canon's origin/main, NOT the checkout (LIM-1706):
 *
 *   node scripts/tokens/sync-upstream.mjs --worktree   # opt in to the sibling working tree
 *
 * Canon files are read via `git show origin/main:<path>` out of the sibling repo, so the
 * branch that checkout happens to sit on cannot change the verdict. Previously this read
 * the working tree with no pin and no report of which branch it was on, which yields a red
 * guard on a clean tree when canon is parked on a feature branch, and a green guard hiding
 * real drift when canon is parked on a stale one. The desktop twin of this script shipped
 * an unratified typeface into the product exactly that way (PR #236). Every run now prints
 * its baseline before any verdict.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
// Resolve the canon repo: env override (tests point this at a throwaway checkout), the
// canonical sibling, then the worktree context — matching liminal-desktop's twin, which
// always had the ../../ candidate this script lacked. Without it, any run from a git
// worktree silently found no canon and skipped every file.
const CANON =
  [
    process.env.LIMINAL_CANON_REPO,
    resolve(ROOT, "../liminal-creative"),
    resolve(ROOT, "../../liminal-creative"),
  ].find((dir) => dir && existsSync(dir)) || null;
const CANON_REF = process.env.LIMINAL_CANON_REF || "origin/main";
const useWorktree = process.argv.includes("--worktree");

// Each canon file the prototype mirrors locally. `rel` is the path INSIDE the canon repo,
// so it can address either a git blob or the working tree. Add a row to sync more.
const FILES = [
  {
    rel: "tokens/design-tokens.css",
    local: resolve(ROOT, "design-system/tokens/design-tokens.css"),
    label: "design-system/tokens/design-tokens.css",
  },
  {
    // The SEMANTIC layer — --fg-*, --surface-*, --type-*, --font-*, --brand-*.
    // 42 tokens, verified zero overlap with design-tokens.css: the two files
    // are complementary halves of canon, not competing copies.
    //
    // Added 2026-08-02. Canon has always had two token files; this repo synced
    // only one, so every semantic token was undefined here. That is not an
    // abstract gap — an undefined custom property fails SILENTLY to the initial
    // value rather than erroring, so canon's framing.css (written against this
    // layer) rendered muted metadata as full-bright body text. Measured on
    // cuts/09-osint-custody.html before this file was shipped:
    //
    //   .thesis-line  ->  rgb(244,242,238)   --fg-4 undefined, inherited --text
    //   .thesis-line  ->  rgb(138,135,128)   after this file loads
    //
    // ORDER MATTERS: every page that links framing.css must link this sheet
    // FIRST. See design-system.html and cuts/{00-agency,custody,09-osint-custody}.
    rel: "tokens/colors-and-type.css",
    local: resolve(ROOT, "design-system/tokens/colors-and-type.css"),
    label: "design-system/tokens/colors-and-type.css",
  },
  {
    rel: "tokens/components/framing.css",
    local: resolve(ROOT, "design-system/components/framing.css"),
    label: "design-system/components/framing.css",
    // Consumes the semantic layer above. This entry was red from 2026-06 until
    // 2026-08-02 and the local copy had been hand-translated to raw substrate
    // (--text-dim for --fg-4, --fs-eyebrow/--mono for --type-eyebrow) to make
    // it render. That translation was a correct workaround for a missing
    // dependency, not drift — but it meant the md5 guard asserted byte-equality
    // between two repos that did not share a token vocabulary, so the guard was
    // structurally unable to go green. Shipping colors-and-type.css removes the
    // reason for the fork; the byte-identical contract now actually holds.
  },
];

const md5 = (p) => createHash("md5").update(readFileSync(p)).digest("hex");
const md5Buf = (b) => createHash("md5").update(b).digest("hex");
const check = process.argv.includes("--check");

// stderr piped, not inherited: a probe that fails is data for us, not noise for the user.
const gitBuf = (args) =>
  execFileSync("git", ["-C", CANON, ...args], {
    maxBuffer: 64 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });

/** Canon bytes for one file, or null when canon is unreachable (sibling-less checkout). */
function readCanon(rel) {
  if (!CANON) return null;
  if (useWorktree) {
    const p = resolve(CANON, rel);
    return existsSync(p) ? readFileSync(p) : null;
  }
  try {
    return gitBuf(["show", `${CANON_REF}:${rel}`]);
  } catch {
    return null;
  }
}

// Provenance before verdict — a drift verdict must never be readable without its baseline.
if (!CANON) {
  console.warn(
    `tokens:sync — no canon checkout found (looked for liminal-creative beside ${ROOT} and one level up).`
  );
  console.warn(`  Skipping every file; the committed local copies are what the site serves.`);
} else {
  let branch = "unknown";
  try {
    branch = gitBuf(["rev-parse", "--abbrev-ref", "HEAD"]).toString("utf8").trim();
    if (branch === "HEAD") {
      branch = `detached@${gitBuf(["rev-parse", "--short", "HEAD"]).toString("utf8").trim()}`;
    }
  } catch {
    /* present but not a git repo — readCanon() reports per-file below */
  }
  if (useWorktree) {
    console.warn(
      `tokens:sync baseline: WORKING TREE ${CANON} (branch: ${branch}) — NOT a pinned ref, NOT canon`
    );
  } else {
    console.log(`tokens:sync baseline: ${CANON} @ ${CANON_REF} [checkout is on: ${branch}]`);
  }
}

let failed = 0;
for (const f of FILES) {
  const upstream = readCanon(f.rel);
  if (upstream === null) {
    console.warn(`tokens:sync — canon source missing for ${f.label}; skipping (committed local copy is what the site serves)`);
    continue;
  }
  if (check) {
    const up = md5Buf(upstream);
    const lo = existsSync(f.local) ? md5(f.local) : "(missing)";
    if (up !== lo) {
      console.error(`tokens:sync --check FAILED — ${f.label} (${lo}) ≠ canon (${up}). Run: npm run tokens:sync`);
      failed++;
    } else {
      console.log(`tokens:sync --check OK — ${f.label} matches canon (md5 ${up})`);
    }
  } else {
    writeFileSync(f.local, upstream);
    console.log(`synced ${f.label} from canon (md5 ${md5(f.local)})`);
  }
}

if (check && failed > 0) process.exit(1);
