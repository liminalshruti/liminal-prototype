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
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const CANON = resolve(ROOT, "../liminal-creative");

// Each canon file the prototype mirrors locally. Add a row to sync more.
const FILES = [
  {
    upstream: resolve(CANON, "tokens/design-tokens.css"),
    local: resolve(ROOT, "design-system/tokens/design-tokens.css"),
    label: "design-system/tokens/design-tokens.css",
  },
  {
    upstream: resolve(CANON, "tokens/components/framing.css"),
    local: resolve(ROOT, "design-system/components/framing.css"),
    label: "design-system/components/framing.css",
  },
];

const md5 = (p) => createHash("md5").update(readFileSync(p)).digest("hex");
const check = process.argv.includes("--check");

let failed = 0;
for (const f of FILES) {
  if (!existsSync(f.upstream)) {
    console.warn(`tokens:sync — canon source missing for ${f.label}; skipping (committed local copy is what the site serves)`);
    continue;
  }
  if (check) {
    const up = md5(f.upstream);
    const lo = existsSync(f.local) ? md5(f.local) : "(missing)";
    if (up !== lo) {
      console.error(`tokens:sync --check FAILED — ${f.label} (${lo}) ≠ canon (${up}). Run: npm run tokens:sync`);
      failed++;
    } else {
      console.log(`tokens:sync --check OK — ${f.label} matches canon (md5 ${up})`);
    }
  } else {
    writeFileSync(f.local, readFileSync(f.upstream));
    console.log(`synced ${f.label} from canon (md5 ${md5(f.local)})`);
  }
}

if (check && failed > 0) process.exit(1);
