# Extraction Plan — `correction-tags`

*Branch: `foundry/proof-to-port-architecture` · 2026-06-18 · Stage 2, candidate #1*
*Source: `docs/architecture/PORTABILITY_BACKLOG.md` (Tier 1) + `docs/architecture/EXTRACTION_FOUNDRY_AUDIT_2026-06-18.md` §6.*

> **This is a plan, not the extraction.** No runtime code is edited by this document.
> Every "action" below is described; none is performed. Execution is separately gated.

---

## Why this is the first extraction

It is the lowest-risk, highest-leverage move in the backlog:

- **Pure data + one validator** — a frozen 9-tag array, a labels map, a descriptions
  map, and `isValidTag`. No DOM, no IndexedDB, no framework.
- **Hand-mirrored across repos today** — the operating model's #1 drift class. Single-
  sourcing it removes a whole category of silent divergence.
- **First-extractions-are-schemas rule** — it is a schema, not UI. Exactly the kind of
  thing the operating model says to extract first.

---

## Current state (measured 2026-06-18)

### Where the canon lives in this repo
`lib/vault-store.js`, lines 49–87:
- `CORRECTION_TAGS` — `Object.freeze([...])`, 9 tags
- `CORRECTION_TAG_DESCRIPTIONS` — `Object.freeze({...})`, 9 entries
- `CORRECTION_TAG_LABELS` — `Object.freeze({...})`, 9 entries
- `isValidTag(t)` — `t == null || CORRECTION_TAGS.includes(t)`

The file's own comment (lines 46–48) declares it a **mirror** of
`liminal-agents/lib/correction-tags.js` that "MUST stay in sync."

### The named upstream (verified present in workspace)
`../liminal-agents/lib/correction-tags.js` exists and exports:
- `CORRECTION_TAGS` — **identical** 9 tags
- `CORRECTION_TAG_DESCRIPTIONS` — **identical** 9 entries
- `isValidTag` — same logic, arrow-function form

### ⚠️ The divergence (the reason this is a reconciliation, not a copy)
| Symbol | `liminal-agents` (named source) | `liminal-prototype` mirror |
|---|---|---|
| `CORRECTION_TAGS` | present, 9 | present, 9 — **same** |
| `CORRECTION_TAG_DESCRIPTIONS` | present | present — **same** |
| `CORRECTION_TAG_LABELS` | **absent** | **present** (prototype-only addition) |
| `isValidTag` | arrow form | function form (equivalent) |

**The prototype has drifted *ahead* of its named canon: it added `CORRECTION_TAG_LABELS`,
which the upstream does not have.** So "make this the source" is not a clean lift — it is a
three-way reconciliation decision (see Open Decisions).

### In-repo consumers (2, both verified)
| Consumer | Line | Uses | Import style |
|---|---|---|---|
| `lib/slate.js` | 418, 424, 425 | `CORRECTION_TAGS`, `CORRECTION_TAG_LABELS`, `CORRECTION_TAG_DESCRIPTIONS` (tag-picker UI) | dynamic `import("./vault-store.js")` |
| `cuts/03-calibration.html` | 592, 594, 657, 663 | `CORRECTION_TAGS` | `import * as vaultStore from "../lib/vault-store.js"` |

Both reach the symbols through `vault-store.js`. Neither imports a dedicated tags module
(none exists yet). Both are **late-bound / module imports**, so re-pointing them is a
contained, explicit change.

---

## Open decisions (must be answered before execution — not decided here)

1. **Which copy is authoritative?** `liminal-agents/lib/correction-tags.js` is *named* as
   the source, but the prototype has the richer set (labels). Options:
   - (a) Promote the prototype's superset (tags + descriptions + labels) to canon, and
     have `liminal-agents` consume it too.
   - (b) Keep `liminal-agents` as canon for tags+descriptions; treat `LABELS` as a
     presentation concern owned by consumers, not canon.
   - This is a cross-repo ownership call — **gated to you**, not decided in this plan.
2. **Where does the single source physically live?** Candidates: a shared package
   (`@liminal/correction-tags`), or canon-in-`liminal-agents` consumed by sync (mirroring
   the token-sync pattern). Depends on #1.
3. **Does `LABELS` belong in canon at all?** Labels are display strings; tags +
   descriptions are the schema. A defensible split: schema travels, labels stay local.

---

## Proposed execution (DESCRIBED — do not run until approved)

Sequenced so each step is independently reversible and the prototype keeps working at
every step.

**Step A — carve out, in-repo, no behavior change.**
Create `lib/correction-tags.js` containing the four symbols (verbatim from
`vault-store.js`). Have `vault-store.js` re-export them so its public API is unchanged:
`export { CORRECTION_TAGS, ... } from "./correction-tags.js"`. Net effect: zero consumer
changes, zero behavior change — purely a file split. *(Edits `vault-store.js` — a runtime
file — so gated behind token/gated-doc-clean + your go-ahead.)*

**Step B — verify consumers untouched.**
`lib/slate.js` and `cuts/03-calibration.html` still import from `vault-store.js` and still
work, because the re-export preserves the surface. Confirm by loading cut 01 (tag picker)
and cut 03 (calibration) — *verification, not edit.*

**Step C — reconcile with `liminal-agents` (cross-repo, decision #1).**
Only after the ownership call: align the two copies (or point both at one shared source).
This is the step that actually kills the drift. Out of scope until #1–#3 are answered.

**Step D — re-point consumers to the dedicated module (optional, later).**
Change `slate.js` and `03-calibration.html` to import directly from `correction-tags.js`
instead of via `vault-store.js`. Pure cleanup; not required for single-sourcing.

---

## Risk / blast radius

- **Step A blast radius: tiny.** One new file + a re-export line in `vault-store.js`. Two
  consumers, both unchanged because the re-export preserves the API.
- **No monolithic cut is touched** except `03-calibration.html` as a *read-only verifier*
  in Step B (and only optionally re-pointed in Step D). `slate.js` is touched only by the
  re-export-preserving carve-out (Step A) — **not refactored.**
- **The frozen-schema nature is protective:** `Object.freeze` + `isValidTag` means a wrong
  edit fails loudly (invalid-tag throw in `appendCorrection`), not silently.

---

## Guardrails honored by this plan

- No cleanup started.
- No monolithic cut edited (03-calibration referenced as a verifier only).
- `slate.js` not refactored (Step A is a re-export-preserving split, gated; not done here).
- No runtime code edited by this document.
- Cross-repo reconciliation (#1) explicitly deferred to your decision.

---

## What unblocks execution

1. Token-diff decision resolved (commit / revert / keep) — working tree clean.
2. Your answer to Open Decision #1 (authoritative copy / source location).
3. Explicit go-ahead to edit `vault-store.js` for Step A.

Until then, this plan sits as Stage-2 preparation — the map, not the move.
