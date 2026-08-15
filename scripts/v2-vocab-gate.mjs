#!/usr/bin/env node
/**
 * v2-vocab-gate — the G3 disclosure boundary, made mechanical (LIM-1799).
 *
 * This repo deploys from branch root (GitHub Pages): a COMMIT here is a
 * PUBLICATION. Private-substrate schema vocabulary must never appear in any
 * committed file. This gate greps tracked deployable text files for the
 * banned list and exits non-zero with file:line hits.
 *
 * The list below is the single source of truth, blessed by founder-brain
 * decisions/2026-08-14-two-layer-demo-discipline.md; additions require an
 * addendum to that decision. Public gen-4 spine vocabulary (claim, evidence,
 * CONTRADICTS, traceBack ...) is deliberately NOT listed.
 *
 * Usage: node scripts/v2-vocab-gate.mjs [--check-file <path>]
 *   default: scan all tracked deployable files (pre-commit / suite mode)
 *   --check-file: scan ONE file regardless of tracking (used by the negative-proof test)
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

// Split-string construction so this file never contains its own banned terms
// verbatim in greppable form is NOT used: the gate exempts itself and the
// decision docs by path instead, keeping the list readable.
// Terms are literal substrings unless marked regex. Two deliberate refinements
// from the baseline run (2026-08-14): the private repo NAME is not on the list
// (it is long-public provenance labeling in this repo, name != mechanics), and
// SUPERSEDES — the only non-underscored schema term — matches only code-shaped
// usage (quoted / backticked / type-field), because the English word appears
// legitimately in brand comments (design-tokens.css:264).
const BANNED = [
  "BINDS_TO",
  { regex: /["'`]SUPERSEDES["'`]|type:\s*["']?SUPERSEDES/, label: "SUPERSEDES (schema usage)" },
  "RATIFIED_BY",
  "COMMITS_TO",
  "RESOLVED_BY",
  "AUTHORIZED_BY",
  "decision_record",
  "status_at_surface",
  "ontology_schema",
  "AUTHORITY_",
  "lib/ontology",
  "driftForClaim",
  "compileReviewRules",
  "wire/project",
  "DocUrlSurfaceRecord"
];

const SELF_EXEMPT = new Set(["scripts/v2-vocab-gate.mjs"]);
const EXTENSIONS = /\.(html|js|mjs|ts|css|md|json)$/;

const flagIndex = process.argv.indexOf("--check-file");
const singleFile = flagIndex !== -1 ? process.argv[flagIndex + 1] : null;

const tracked = singleFile
  ? [singleFile]
  : execSync("git ls-files", { encoding: "utf8" })
  .split("\n")
  .filter(
    (file) =>
      file &&
      EXTENSIONS.test(file) &&
      !SELF_EXEMPT.has(file) &&
      !file.startsWith("node_modules/") &&
      !file.startsWith("_scratch/")
  );

const hits = [];
for (const file of tracked) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  const lines = text.split("\n");
  for (const term of BANNED) {
    const matches = typeof term === "string"
      ? (line) => line.includes(term)
      : (line) => term.regex.test(line);
    const label = typeof term === "string" ? term : term.label;
    lines.forEach((line, index) => {
      if (matches(line)) {
        hits.push(`${file}:${index + 1}: ${label}`);
      }
    });
  }
}

if (hits.length > 0) {
  console.error("v2-vocab-gate: PRIVATE VOCABULARY IN A PUBLIC REPO — refuse to publish:");
  for (const hit of hits) console.error("  " + hit);
  process.exit(1);
}
console.error(`v2-vocab-gate: clean (${tracked.length} tracked files checked)`);
