#!/usr/bin/env node
/**
 * sync-upstream.mjs — copy the canonical design-token upstream
 * (liminal-creative/tokens/design-tokens.css) into this repo's consumer
 * copy (design-system/tokens/design-tokens.css), byte-identical.
 *
 *   node scripts/tokens/sync-upstream.mjs           # copy
 *   node scripts/tokens/sync-upstream.mjs --check   # compare hashes (CI guard)
 *
 * Mirrors liminal-desktop/scripts/tokens/sync-upstream.mjs — same md5-verify
 * contract per liminal-creative/tokens/README.md — MINUS Panda codegen (this is
 * a buildless, GitHub-Pages-served consumer: the cuts <link> the committed CSS
 * directly, so there is no generate step).
 *
 * Why a copy and not a symlink: a tracked symlink is stored by git as a path
 * string, and canon is a SEPARATE repo — on any sibling-less checkout (a fresh
 * clone, CI, the GitHub Pages deploy) the symlink dangles and the CSS 404s.
 * A committed flat copy can't 404; this script is the discipline that keeps it
 * in lockstep. (See _scratch/PORT_RECONCILIATION_SCOPE §2.)
 *
 * If the upstream checkout is absent (someone clones the prototype alone), both
 * modes no-op with a warning and exit 0 — the committed local copy is what the
 * site serves either way, so the deployed prototype is unaffected.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const UPSTREAM = resolve(ROOT, "../liminal-creative/tokens/design-tokens.css");
const LOCAL = resolve(ROOT, "design-system/tokens/design-tokens.css");

if (!existsSync(UPSTREAM)) {
  console.warn(`tokens:sync — upstream not found at ${UPSTREAM}; skipping (committed local copy is what the site serves)`);
  process.exit(0);
}

const md5 = (p) => createHash("md5").update(readFileSync(p)).digest("hex");

if (process.argv.includes("--check")) {
  const up = md5(UPSTREAM);
  const lo = md5(LOCAL);
  if (up !== lo) {
    console.error(`tokens:sync --check FAILED — local copy (${lo}) ≠ upstream (${up}). Run: npm run tokens:sync`);
    process.exit(1);
  }
  console.log(`tokens:sync --check OK — consumer copy matches canon (md5 ${up})`);
} else {
  writeFileSync(LOCAL, readFileSync(UPSTREAM));
  console.log(`synced design-system/tokens/design-tokens.css from canon (md5 ${md5(LOCAL)})`);
}
