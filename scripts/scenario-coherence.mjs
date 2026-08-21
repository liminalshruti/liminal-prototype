#!/usr/bin/env node
/* scenario-coherence.mjs · does each surface tell ONE story?
 *
 * WHY THIS EXISTS
 * On 2026-08-20 cut 08 was live serving a healthcare incident brief on top of a
 * maritime tanker-tracking console: 68 maritime references against 4 healthcare
 * ones. PR #60 had swapped the page's FRAMING and left its CONSOLE alone.
 *
 * Nothing caught it. The page returned 200, threw no console errors, passed the
 * vocab gate, and every individual string in it was well written. Only the
 * COMBINATION was wrong — and no existing check looks at combinations.
 *
 * That is the gap this fills. It does not check whether words are allowed; the
 * vocab gate does that. It checks whether a surface is speaking one language.
 *
 * WHAT IT LOOKS FOR
 * The cut-08 signature: one dominant domain plus a thin veneer of another. A
 * page that is 94% maritime and 6% healthcare is not bilingual — it is a page
 * somebody half-converted.
 *
 * Report-only by default. `--check` exits non-zero on veneers that are not in
 * ALLOWED, so legitimate multi-domain surfaces do not fail a build.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const CHECK = process.argv.includes("--check");

/* Domain vocabularies. Word-boundary matched: an earlier hand-run of this sweep
   reported four AIS "leaks" that were the letters inside "raised". */
const DOMAINS = {
  maritime:     /\b(vessel|AIS|MMSI|chokepoint|tanker|nautical|watchfloor|kinematic|Hormuz)\b/gi,
  /* NOT `dispatch` or `triage`: both are ordinary agent-ops words here.
     Including them scored embed-agent-hack at healthcare:26 on the strength
     of "dispatch" alone. A domain term earns its place only if it is
     implausible in any other scenario on this site. */
  healthcare:   /\b(patient|Sev-1|clinical|ITSM|bedside|EHR|page-out)\b/gi,
  counterintel: /\b(molehunt|dossier|HUMINT|tradecraft|polygraph|exfil)\b/gi,
  spend:        /\b(vendor|seats?|invoice|entitled|ARR|licen[cs]e)\b/gi,
  founder:      /\b(cofounder|co-founder|term sheet|runway|fundraise|cap table)\b/gi,
};

/* Surfaces whose mixing is DELIBERATE and verified, with the reason. Anything
   here is reported but never fails --check. Add to this list only after reading
   the file and confirming the mix is by design — never to quiet a failure. */
const ALLOWED = {
  "cuts/11-govern.html":
    "SUBJECTS map genuinely carries a maritime subject beside spend and OSINT — the ?subject= switch is the point of the cut",
  "cuts/08-liminal-custody.html":
    "two complete scenarios behind ?subject=, each guarded by REQUIRED_KEYS; both vocabularies live in source, only one renders",
  "cuts/_sequences.html":
    "catalog page — describes every cut, so it necessarily names every domain",
  "cuts/_demo-lan.html":
    "stitched launcher — links across the whole catalog",
  "molehunt/index.html":
    "single spend hit is \"Vendor / DIB Tier-2\" — a defense-industrial-base org unit in a counterintel dossier, not spend vocabulary",
  "index.html":
    "front door — indexes all surfaces",
};

const VENEER_RATIO = 0.25;   // a second domain under this share of the dominant
const MIN_DOMINANT  = 8;     // ignore thin files where two words prove nothing

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    if (e === "node_modules" || e === ".git" || e === "_archive") continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".html")) out.push(p);
  }
  return out;
}

const rows = [];
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file);
  const text = readFileSync(file, "utf8");
  const counts = {};
  for (const [d, rx] of Object.entries(DOMAINS)) {
    const n = (text.match(rx) || []).length;
    if (n) counts[d] = n;
  }
  const present = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (!present.length) continue;
  const [topDomain, topCount] = present[0];
  if (topCount < MIN_DOMINANT) continue;
  const veneers = present.slice(1).filter(([, n]) => n / topCount < VENEER_RATIO);
  rows.push({ rel, topDomain, topCount, present, veneers });
}

let failures = 0;
console.log("scenario-coherence · does each surface tell one story?\n");
for (const r of rows) {
  const mix = r.present.map(([d, n]) => `${d}:${n}`).join(" · ");
  if (!r.veneers.length) {
    console.log(`  ok      ${r.rel}\n          ${mix}`);
    continue;
  }
  const names = r.veneers.map(([d]) => d).join(", ");
  if (ALLOWED[r.rel]) {
    console.log(`  allowed ${r.rel}  (veneer: ${names})\n          ${mix}\n          reason: ${ALLOWED[r.rel]}`);
  } else {
    failures++;
    console.log(`  VENEER  ${r.rel}  dominant ${r.topDomain}, thin ${names}\n          ${mix}`);
    console.log(`          Read the page. Either finish the conversion, or add it to ALLOWED with a reason.`);
  }
}

console.log(`\n${rows.length} surface(s) scanned · ${failures} unexplained veneer(s)`);
if (failures) {
  console.log("\nA veneer is a HINT, not a verdict — a scenario may reference another");
  console.log("domain in passing. But it is also exactly what a half-finished");
  console.log("conversion looks like, and that shipped once. Read before dismissing.");
}
process.exit(CHECK && failures ? 1 : 0);
