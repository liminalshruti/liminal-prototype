#!/usr/bin/env node
/**
 * gen-design-md.mjs — derive each surface's DESIGN.md from the canon token file.
 *
 *   node scripts/design/gen-design-md.mjs           # write every surface
 *   node scripts/design/gen-design-md.mjs --check   # verify, exit 1 on drift
 *
 * WHY THIS EXISTS
 * ───────────────
 * Liminal has two tiers of design truth and only one of them had a contract.
 *
 *   machine-readable  design-tokens.css   sync-upstream.mjs + md5 + pre-push guard
 *   agent-readable    DESIGN.md           nothing
 *
 * The governed tier held: this repo's token copy is byte-identical to canon.
 * The ungoverned tier rotted. On 2026-07-29 canon §5 moved --sans Geist →
 * Space Grotesk and --mono Geist Mono → Space Mono; DESIGN.md kept declaring
 * Geist in both its front matter (typography.body/label) and its prose
 * (§3 "Body Fonts", "Label/Mono Font"). `impeccable` — the design skill that
 * actually runs against these surfaces — reads DESIGN.md, so every invocation
 * was handed a superseded type stack by a file labelled "locked".
 *
 * Agents read the ungoverned tier. So govern it, by derivation rather than by
 * discipline: tokens win on every value, and drift fails a check instead of
 * waiting to be noticed.
 *
 * WHAT IS GENERATED VS. WHAT IS YOURS
 * ───────────────────────────────────
 * Generated : YAML front matter — colors, typography, spacing, rounded. Every
 *             value traces to a token. Hand-edits are overwritten without
 *             ceremony; that is the point.
 * Yours     : the prose body, authored in design-system/design-md/<surface>.prose.md
 *             and spliced in verbatim. The Three-Voices Rule, the Mute-Is-Cream
 *             Rule, the Do/Don't list — none of that is derivable and none of it
 *             is touched.
 *
 * The prose is not merely passed through, though. Front matter that says
 * "Space Grotesk" above prose that says "Geist" is a file disagreeing with
 * itself, which is worse than being uniformly stale. So prose is LINTED
 * against the token file: naming a demoted face (one that canon has pushed
 * into a fallback position) fails the check with a file:line. See lintProse().
 *
 * BASELINE BEFORE VERDICT
 * ───────────────────────
 * Mirrors scripts/tokens/sync-upstream.mjs: the token file's md5 is printed
 * before any verdict, so a pass/fail is never readable without knowing what it
 * was judged against. That script's discipline is why the token tier never
 * drifted — this is the same contract applied one tier up.
 *
 * Note this check needs NO sibling canon checkout: it derives from this repo's
 * own committed token copy, which tokens:check separately proves equal to
 * canon. That makes it CI-able where tokens:check is not (canon is a private
 * sibling repo; see README "CI guard skipped").
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve, relative } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const TOKENS = resolve(ROOT, "design-system/tokens/design-tokens.css");
const PROSE_DIR = resolve(ROOT, "design-system/design-md");
const check = process.argv.includes("--check");

/**
 * Sibling repos are written only on explicit opt-in.
 *
 *   node scripts/design/gen-design-md.mjs              # this repo only
 *   node scripts/design/gen-design-md.mjs --siblings   # + desktop + creative
 *
 * Two reasons this is not the default. A generator that mutates adjacent
 * checkouts as a side effect of a local command is surprising, and would leave
 * uncommitted changes in repos the author never opened. More importantly it
 * would make the guard non-hermetic: a `--check` that reads a sibling fails
 * whenever someone's desktop checkout sits on an old branch, blocking a push
 * for reasons outside the repo being pushed. That is how a guard earns its way
 * into being switched off.
 *
 * Hermetic-by-default is also what makes this CI-able where tokens:check is
 * not — it needs nothing but files committed here.
 */
const withSiblings = process.argv.includes("--siblings");

/**
 * Locate a sibling repo by walking up from ROOT.
 *
 * sync-upstream.mjs hardcodes two candidates (`../` and `../../`) to cover the
 * plain-checkout and worktree cases. That is one level short here: this repo's
 * worktrees live at `<repo>/.claude/worktrees/<name>`, three levels down, so
 * both candidates miss and every sibling "goes absent" — a run that reports
 * success while writing nothing. Walking up instead of enumerating fixed
 * depths makes the lookup independent of where the checkout sits.
 */
function findSibling(name) {
  let dir = ROOT;
  for (let i = 0; i < 8; i++) {
    const candidate = resolve(dir, name);
    if (candidate !== ROOT && existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

const md5 = (s) => createHash("md5").update(s).digest("hex");

/* ── token parsing ──────────────────────────────────────────────────────── */

/**
 * Every `--name: value;` in the file, last declaration winning.
 *
 * Comments are stripped first. The token file is heavily commented and several
 * comments quote token syntax verbatim (the §2 "ADDING A -LIFT STOP" recipe
 * writes out `--cerulean-lift` declarations as an example); scanning raw text
 * would capture those documentation examples as if they were real tokens.
 */
function parseTokens(css) {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const out = new Map();
  for (const m of stripped.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    out.set(m[1], m[2].trim().replace(/\s+/g, " "));
  }
  return out;
}

/**
 * Resolve a token to a literal, following `var(--x)` indirection.
 *
 * The register vocabulary is entirely indirection — `--diligence: var(--clarity)`
 * — which is exactly what lets a rebrand remap meaning without touching call
 * sites (Brand 4, 2026-07-29). Reading the register names therefore requires
 * chasing the chain, not reading one line.
 *
 * Depth-capped and cycle-guarded: a malformed canon file must produce a named
 * error, never a hang in a pre-push hook.
 */
function resolveToken(tokens, name, seen = new Set()) {
  if (seen.has(name)) throw new Error(`token cycle at ${name}`);
  if (seen.size > 24) throw new Error(`token chain too deep at ${name}`);
  const raw = tokens.get(name);
  if (raw === undefined) return null;
  const varOnly = raw.match(/^var\(\s*(--[\w-]+)\s*(?:,[^)]*)?\)$/);
  if (!varOnly) return raw;
  seen.add(name);
  return resolveToken(tokens, varOnly[1], seen);
}

/** Resolve or fail loudly — a silent null becomes `undefined` in YAML. */
function need(tokens, name) {
  const v = resolveToken(tokens, name);
  if (v === null) throw new Error(`canon token ${name} not found in ${relative(ROOT, TOKENS)}`);
  return v;
}

/* ── type stack ─────────────────────────────────────────────────────────── */

/** Split a font-family chain into families, unquoted. */
const families = (chain) =>
  chain.split(",").map((f) => f.trim().replace(/^["']|["']$/g, "")).filter(Boolean);

/** Generic CSS keywords are chain terminators, not brand faces. */
const GENERIC = new Set([
  "serif", "sans-serif", "monospace", "cursive", "system-ui", "ui-monospace",
  "-apple-system", "BlinkMacSystemFont", "Georgia", "Menlo", "Monaco",
  "Consolas", "SFMono-Regular",
]);

/**
 * Faces canon has DEMOTED: a real branded face that appears in some chain only
 * at a fallback position, and is the primary of no chain.
 *
 * This is the generated form of "the stack moved on and prose didn't". After
 * 2026-07-29, Geist and Geist Mono are exactly this — kept in the chains so an
 * un-updated build degrades to the previous face rather than to the OS default
 * (canon §5 says so explicitly), but no longer the primary of anything. Prose
 * naming one as *the* font is the 07-29 bug, so it is derived rather than
 * hardcoded: when the Geist entries are eventually dropped from the chains,
 * this set empties itself and the lint stops firing on its own.
 */
function demotedFaces(chains) {
  const primaries = new Set();
  const chainCount = new Map();   // face → how many chains contain it
  const atIndexOne = new Set();   // face → sits immediately behind a primary

  for (const chain of chains) {
    families(chain).forEach((f, i) => {
      if (GENERIC.has(f)) return;
      if (i === 0) primaries.add(f);
      if (i === 1) atIndexOne.add(f);
      chainCount.set(f, (chainCount.get(f) ?? 0) + 1);
    });
  }

  return [...atIndexOne].filter(
    (f) =>
      // Still leading some chain → not demoted at all.
      !primaries.has(f) &&
      // A superseded primary belongs to exactly the one chain it used to lead.
      // A face in several chains (Iowan Old Style, in both --display and
      // --serif) is a shared fallback that was never anyone's primary, and
      // prose may name it freely. Without this the lint fires on legitimate
      // writing, and a lint that cries wolf gets switched off — which is how
      // the §5 drift survived three months.
      chainCount.get(f) === 1
  );
}

/* ── surfaces ───────────────────────────────────────────────────────────── */

/**
 * Each consuming surface. `out` is relative to this repo, so the prototype
 * publishes its siblings' contracts the same way it publishes its own — the
 * distribution-hub role. A sibling that is not checked out is skipped, not
 * failed; this must stay runnable on a lone clone.
 */
const SURFACES = [
  {
    key: "prototype",
    name: "Liminal Prototype",
    description:
      "Public demo catalog for the judgment layer — bounded agents read, the human decides, the ledger remembers.",
    out: resolve(ROOT, "DESIGN.md"),
  },
  {
    key: "desktop",
    name: "Liminal Desktop",
    description:
      "The product surface — a local-first vault where bounded agents deliberate and the accountable human signs.",
    repo: "liminal-desktop",
  },
  {
    key: "creative",
    name: "Liminal Creative",
    description:
      "Brand canon home — authors the token file every other surface consumes.",
    repo: "liminal-creative",
  },
]
  .filter((s) => !s.repo || withSiblings)
  .map((s) => {
    if (s.out) return s;
    const repoDir = findSibling(s.repo);
    return { ...s, out: repoDir ? resolve(repoDir, "DESIGN.md") : null };
  });

/* ── front matter ───────────────────────────────────────────────────────── */

/** The ten named chrome registers, in canon order. */
const REGISTERS = [
  "diligence", "judgment", "synthesis", "outreach", "alarm",
  "watch", "signal", "ambient", "depth", "liminal",
];

const yamlStr = (s) => `"${String(s).replace(/"/g, '\\"')}"`;

function frontMatter(tokens, surface, stack) {
  const L = [];
  const put = (k, v) => L.push(`  ${k}: ${v}`);

  // The `---` delimiter MUST be the first bytes of the file. Every common
  // frontmatter parser (gray-matter and friends) anchors on that, and returns
  // an EMPTY object rather than an error when it is missing — so an HTML
  // "do not edit" banner placed above it makes the metadata silently invisible
  // to `impeccable`, which is worse than the stale metadata this replaces:
  // stale values are at least values. The notice therefore lives inside the
  // block as YAML comments.
  L.push("---");
  L.push("# ═══════════════════════════════════════════════════════════════");
  L.push("# GENERATED — DO NOT EDIT THIS FRONT MATTER.");
  L.push("#");
  L.push("# Derived from design-system/tokens/design-tokens.css by");
  L.push("# liminal-prototype/scripts/design/gen-design-md.mjs. Hand-edits are");
  L.push("# overwritten by `npm run design:gen` and fail `npm run design:check`.");
  L.push("#");
  L.push("# Change a VALUE  → edit the canon token upstream, sync, regenerate.");
  L.push(`# Change the PROSE → edit design-system/design-md/${surface.key}.prose.md`);
  L.push("# ═══════════════════════════════════════════════════════════════");
  L.push(`name: ${surface.name}`);
  L.push(`description: ${surface.description}`);

  L.push("colors:");
  for (const r of REGISTERS) put(r, yamlStr(need(tokens, `--${r}`)));
  put("void", yamlStr(need(tokens, "--bg")));
  put("frame", yamlStr(need(tokens, "--frame-bg")));
  for (const [alias, tok] of [
    ["ink-bright", "--text"], ["ink-mid", "--text-mid"],
    ["ink-dim", "--text-dim"], ["ink-faint", "--text-faint"],
    ["ink-mute", "--text-mute"],
  ]) put(alias, yamlStr(need(tokens, tok)));

  // Type roles map to canon families; sizes come from the §6 scale. Roles are
  // named for what they DO (announce / reason / record), matching the prose's
  // Three-Voices Rule rather than inventing a second vocabulary.
  L.push("typography:");
  const role = (n, chain, size, weight, lh, ls) => {
    L.push(`  ${n}:`);
    // Emit the family list unquoted-per-family, matching the schema the
    // hand-written file already used and that `impeccable` reads. Passing the
    // raw CSS chain through would embed CSS quoting inside a YAML string
    // (`"\"Space Grotesk\", \"Geist\"…"`), which is legal YAML but a different
    // shape than every consumer expects.
    L.push(`    fontFamily: ${yamlStr(families(chain).join(", "))}`);
    L.push(`    fontSize: ${yamlStr(size)}`);
    L.push(`    fontWeight: ${weight}`);
    L.push(`    lineHeight: ${lh}`);
    if (ls) L.push(`    letterSpacing: ${yamlStr(ls)}`);
  };
  role("display", stack.display, need(tokens, "--fs-display"), 700, 1.05, "-0.005em");
  // --fs-2xl is canon's "pin-name, section h2". The hand-written file carried
  // 27px, which is not a token at all — a value that never had an upstream.
  role("headline", stack.serif, need(tokens, "--fs-2xl"), 300, 1.18);
  role("body", stack.sans, need(tokens, "--fs-body"), 400, 1.5);
  role("read", stack.serif, need(tokens, "--fs-body"), 400, 1.55);
  role("label", stack.mono, need(tokens, "--fs-mono-xs"), 400, 1, "0.12em");

  L.push("rounded:");
  for (const [alias, tok] of [
    ["hairline", "--radius-1"], ["chip", "--radius-2"], ["control", "--radius-3"],
    ["card", "--radius-4"], ["frame", "--radius-5"], ["pill", "--radius-pill"],
  ]) put(alias, yamlStr(need(tokens, tok)));

  L.push("spacing:");
  for (let i = 1; i <= 10; i++) put(`s${i}`, yamlStr(need(tokens, `--space-${i}`)));

  L.push("---");
  return L.join("\n");
}

/* ── prose ──────────────────────────────────────────────────────────────── */

/**
 * Flag prose that contradicts the token file.
 *
 * Scoped deliberately narrow: only demoted brand faces, and only outside code
 * spans. A lint that cries wolf gets disabled, and a disabled lint is how the
 * §5 drift survived three months in the first place. Fenced blocks and inline
 * code are skipped so prose may still legitimately quote an old chain when
 * documenting the migration.
 */
function lintProse(prose, demoted, proseRel) {
  if (!demoted.length) return [];
  const findings = [];
  const lines = prose.split("\n");
  let inFence = false;
  lines.forEach((line, i) => {
    if (/^\s*```/.test(line)) { inFence = !inFence; return; }
    if (inFence) return;
    const bare = line.replace(/`[^`]*`/g, "");
    for (const face of demoted) {
      const re = new RegExp(`\\b${face.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
      if (re.test(bare)) {
        findings.push(
          `${proseRel}:${i + 1} names "${face}", which canon has demoted to a fallback. ` +
          `Prose must not contradict §5 of the token file.`
        );
      }
    }
  });
  return findings;
}

/* ── main ───────────────────────────────────────────────────────────────── */

if (!existsSync(TOKENS)) {
  console.error(`design:gen — token file missing at ${relative(ROOT, TOKENS)}`);
  process.exit(1);
}

const css = readFileSync(TOKENS, "utf8");
const tokens = parseTokens(css);

const stack = {
  display: need(tokens, "--display"),
  serif: need(tokens, "--serif"),
  sans: need(tokens, "--sans"),
  mono: need(tokens, "--mono"),
};
const demoted = demotedFaces(Object.values(stack));

const TAG = check ? "design:check" : "design:gen";

// Provenance before verdict.
console.log(`${TAG} baseline: ${relative(ROOT, TOKENS)} (md5 ${md5(css)})`);
console.log(`${TAG} type stack: sans=${families(stack.sans)[0]} · mono=${families(stack.mono)[0]}`);
if (demoted.length) console.log(`${TAG} demoted faces (prose may not name these): ${demoted.join(", ")}`);

/**
 * Report registers that resolve to the same hex.
 *
 * The prose states a One-Meaning Rule — "a chrome hue is used only for its
 * named register" — which two registers sharing a hue quietly contradicts.
 * As of 2026-07-29 --ambient and --depth both alias the Expression ladder,
 * so the ten named registers cover nine hues.
 *
 * WARN, never fail. Whether that aliasing is intended is a founder ruling
 * about canon, not something a generator downstream of canon may decide. The
 * job here is to make it impossible to not notice.
 */
{
  const byHex = new Map();
  for (const r of REGISTERS) {
    const hex = need(tokens, `--${r}`).toLowerCase();
    if (!byHex.has(hex)) byHex.set(hex, []);
    byHex.get(hex).push(r);
  }
  for (const [hex, rs] of byHex) {
    if (rs.length > 1) {
      console.warn(
        `${TAG} WARN — registers ${rs.join(" + ")} both resolve to ${hex}. ` +
        `The One-Meaning Rule reads as violated; confirm this aliasing is intended in canon.`
      );
    }
  }
}

if (!existsSync(PROSE_DIR)) mkdirSync(PROSE_DIR, { recursive: true });

let failed = 0;
const skipped = [];
const wrote = [];
for (const surface of SURFACES) {
  const proseFile = resolve(PROSE_DIR, `${surface.key}.prose.md`);
  const proseRel = relative(ROOT, proseFile);

  if (!existsSync(proseFile)) {
    console.error(`${TAG} FAILED — missing prose source ${proseRel}`);
    failed++;
    continue;
  }
  // Sibling repos are optional: a lone clone of this repo must not fail. But a
  // skip is reported as SKIP, not folded into the success lines — a silent skip
  // reads as "wrote it" and that is the failure this whole script exists to
  // stop. Counted and re-stated in the summary so it cannot scroll past.
  if (!surface.out) {
    console.warn(`${TAG} SKIP — ${surface.key}: sibling repo "${surface.repo}" not found near ${ROOT}`);
    skipped.push(surface.key);
    continue;
  }

  const prose = readFileSync(proseFile, "utf8");
  const findings = lintProse(prose, demoted, proseRel);
  if (findings.length) {
    findings.forEach((f) => console.error(`${TAG} PROSE DRIFT — ${f}`));
    failed++;
    continue;
  }

  const rendered = `${frontMatter(tokens, surface, stack)}\n\n${prose.trimStart()}`;
  const outRel = relative(ROOT, surface.out);

  if (check) {
    const current = existsSync(surface.out) ? readFileSync(surface.out, "utf8") : null;
    if (current === rendered) {
      console.log(`design:check OK — ${outRel}`);
    } else {
      const why = current === null ? "(missing)" : `(md5 ${md5(current)})`;
      console.error(
        `design:check FAILED — ${outRel} ${why} ≠ generated (md5 ${md5(rendered)}). Run: npm run design:gen`
      );
      failed++;
    }
  } else {
    writeFileSync(surface.out, rendered);
    wrote.push(surface.key);
    console.log(`generated ${outRel} (md5 ${md5(rendered)})`);
  }
}

// Summary last, so the coverage claim is the final thing read. "3 surfaces, 1
// written, 2 skipped" is a very different result from "3 written", and the
// per-line output above is easy to skim past.
const verb = check ? "checked" : "written";
console.log(
  `${TAG} summary — ${SURFACES.length} surface${SURFACES.length === 1 ? "" : "s"} · ` +
  `${(check ? SURFACES.length - failed - skipped.length : wrote.length)} ${verb} · ` +
  `${skipped.length} skipped${skipped.length ? ` (${skipped.join(", ")})` : ""} · ${failed} failed`
);

if (failed > 0) process.exit(1);
