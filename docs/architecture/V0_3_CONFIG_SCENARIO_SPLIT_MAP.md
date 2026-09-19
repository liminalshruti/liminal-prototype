# `v0_3_config.js` Scenario-Data Split Map (Step 8C): `liminal-prototype`

*Branch: `foundry/proof-to-port-architecture` · 2026-06-18 · Planning only.*
*Source: per-export consumer grep + direct reading of every live call site in `lib/`.*

> **This maps the live scenario/config knot. It moves nothing.** No file edited, no data
> moved, no deletion, no `slate.js`/cuts touched. It exists to rank *what to split first*
> and *at what risk*: grounded in how the code actually uses each export, not grep counts.

Live consumers throughout: `lib/state.js`, `lib/boot.js`, `lib/slate.js`, `lib/keyboard.js`.

---

## The structural finding (shapes the whole order)

**`lib/state.js` is the chokepoint.** The subject/thread/case lookups all funnel through
its accessors:
- `getActiveSubject()` → `TEAM_SUBJECTS.find(...)`
- `getActiveThread()` → `PERSONAL_THREADS.find(...)`
- `getActiveCase()` → `BUSINESS_SCENARIOS.find(...)`
- `getTilesForActive()` → `TEAM_TILES_FOR_SUBJECT[k]` / `PERSONAL_TILES_FOR_THREAD[k]` / `BUSINESS_TILES_FOR_CASE[k]`
- `getOperatorClearanceLevel()` → `BUSINESS_OPERATOR.clearance_level` / `PERSONAL_OPERATOR.clearance_level` / `CONSENT_CLASSES[...]?.level`

So the data is consumed as **pure data** (`.find`, `[key]`, property reads): there is **no
product behavior in these exports**; behavior lives in `state.js`'s accessors. That is the
good news: these are data modules, and `state.js` is the seam that already isolates them.

---

## Per-export map

### `PRODUCTS`: ⚠️ DEAD IMPORT (not a move, a drop)
- **Current consumers:** `boot.js` import line **only** (line 26). **Not used in any body**, not referenced anywhere else in `lib/`.
- **Exact usage:** none: product identity is handled by `activeProductId` string state in `state.js`, not the `PRODUCTS` array.
- **Category:** config/ontology (nominally)
- **Behavior or data?** neither: unused.
- **Recommended destination:** **none**: drop the unused import from `boot.js` (Stage 1 / dead-import cleanup), or relocate only if a future surface needs it.
- **Move risk:** **very low** (removing an unused import), but it is a *deletion of an import*, not an extraction.
- **Re-export after moving?** N/A.
- **Verification:** confirm `PRODUCTS` truly unused (done: 0 body refs); archive files do reference it, so if the symbol itself is relocated, `v0_3_config.js` must re-export.
- **First-candidate note:** *not* a clean "first extraction", it's a dead-import finding. Recorded so it isn't mistaken for the safest move.

### `CONSENT_CLASSES`: consent/clearance lookup table
- **Current consumers:** `state.js`, `boot.js`, `slate.js`
- **Exact usage:** keyed lookup: `CONSENT_CLASSES[s.consent_class]` (boot ×2, slate ×1) and `CONSENT_CLASSES[sub.consent_class]?.level` (state). Read-only.
- **Category:** consent/clearance (ontology-adjacent)
- **Behavior or data?** **data only** (a lookup table); the gating logic is in the consumers.
- **Recommended destination:** `config/consent.js` (or `ontology/consent.js`)
- **Move risk:** **medium**: 3 consumers, but identical read-only access pattern; no entanglement with the team/personal/business data.
- **Why:** cross-surface (all 3 surfaces read it) but cohesive and behavior-free.
- **Re-export after moving?** **yes** (archive files + transitional safety).
- **Verification:** load cut 01, switch surfaces, confirm clearance gating unchanged.

### `PERSONAL_OPERATOR`: operator record (personal surface)
- **Current consumers:** `state.js`, `boot.js`
- **Exact usage:** property reads: `PERSONAL_OPERATOR.clearance_level` (state:110), `.role + " · " + .unit` (boot:155).
- **Category:** scenario data (operator identity)
- **Behavior or data?** data only.
- **Recommended destination:** `data/personal.js`
- **Move risk:** **low–medium**: 2 consumers, simple property reads.
- **Re-export after moving?** yes.
- **Verification:** personal surface header renders identically.

### `PERSONAL_THREADS`: personal subject list
- **Current consumers:** `state.js`, `boot.js`, `keyboard.js`
- **Exact usage:** `PERSONAL_THREADS.find(t => t.id === activeContextId)` (state:86); `.map(t => t.id)` sibling list (keyboard).
- **Category:** scenario data
- **Behavior or data?** data only.
- **Recommended destination:** `data/personal.js`
- **Move risk:** **medium**: 3 consumers; should move together with `PERSONAL_OPERATOR` + `PERSONAL_TILES_FOR_THREAD` (one surface's data).
- **Re-export after moving?** yes.
- **Verification:** personal context switching (⌘[ ]) + tile rendering.

### `PERSONAL_TILES_FOR_THREAD`: personal tile catalog
- **Current consumers:** `state.js`, `boot.js`
- **Exact usage:** `PERSONAL_TILES_FOR_THREAD[activeContextId] ?? []` (state:91).
- **Category:** scenario data
- **Behavior or data?** data only.
- **Recommended destination:** `data/personal.js`
- **Move risk:** **low–medium**: keyed lookup, 2 consumers.
- **Re-export after moving?** yes.
- **Verification:** personal tray populates per thread.

### `TEAM_SUBJECTS`: team subject list
- **Current consumers:** `state.js`, `boot.js`, `keyboard.js`
- **Exact usage:** `TEAM_SUBJECTS.find(...)` (state:76); `.map(s => s.id)` (keyboard).
- **Category:** scenario data
- **Behavior or data?** data only.
- **Recommended destination:** `data/team.js`
- **Move risk:** **medium**: 3 consumers; move with `TEAM_TILES_FOR_SUBJECT`.
- **Re-export after moving?** yes.
- **Verification:** team context switch + tray.

### `TEAM_TILES_FOR_SUBJECT`: team tile catalog
- **Current consumers:** `state.js`, `boot.js`, `slate.js`
- **Exact usage:** `TEAM_TILES_FOR_SUBJECT[activeContextId] ?? []` (state:94).
- **Category:** scenario data
- **Behavior or data?** data only.
- **Recommended destination:** `data/team.js`
- **Move risk:** **medium**: 3 consumers.
- **Re-export after moving?** yes.
- **Verification:** team tray populates per subject.

### `BUSINESS_OPERATOR`: operator record (business surface)
- **Current consumers:** `state.js`, `boot.js`, `slate.js`
- **Exact usage:** `.clearance_level` (state:103); multiple string interpolations (boot:165/359/361: the §552a notice copy), `.unit/.cohort` (slate:81).
- **Category:** **mixed**: operator data, but boot uses it to build sizable UI copy (the counterintelligence-notice strings).
- **Behavior or data?** data + UI copy assembled by the consumer (the copy lives in boot, not the export).
- **Recommended destination:** `data/business.js`
- **Move risk:** **medium**: 3 consumers, heavier string use; verify the notice copy renders identically.
- **Re-export after moving?** yes.
- **Verification:** business surface header + the §552a notice text byte-identical.

### `BUSINESS_TILES_FOR_CASE`: business tile catalog
- **Current consumers:** `boot.js`, `state.js`
- **Exact usage:** `BUSINESS_TILES_FOR_CASE[activeContextId] ?? []` (state:97).
- **Category:** scenario data
- **Behavior or data?** data only.
- **Recommended destination:** `data/business.js`
- **Move risk:** **low–medium**: keyed lookup, 2 consumers.
- **Re-export after moving?** yes.
- **Verification:** business tray populates per case.

### `BUSINESS_SCENARIOS`: business case list (the highest-risk knot)
- **Current consumers:** `state.js`, `slate.js`, `keyboard.js`, `boot.js`: **all four**.
- **Exact usage:** `BUSINESS_SCENARIOS.find(...)` (state:81); referenced in slate + keyboard sibling lists + boot.
- **Category:** scenario data
- **Behavior or data?** data only: but the widest consumer spread in the file.
- **Recommended destination:** `data/business.js`
- **Move risk:** **HIGH**: 4 consumers; the single most-depended-on scenario export.
- **Re-export after moving?** **yes** (essential during transition).
- **Verification:** business context switch from every entry point (state accessor, slate render, keyboard ⌘[ ], boot prestage).
- **Order note:** **move last** of the business group, after `BUSINESS_OPERATOR` + `BUSINESS_TILES_FOR_CASE` prove the `data/business.js` module works.

---

## Recommended safe move order

The data cleanly groups by **surface**, and `state.js` is the shared seam. Move by cohesive
surface-group, lowest-spread first, each re-exported from `v0_3_config.js` until all
importers are re-pointed:

1. **`CONSENT_CLASSES` → `config/consent.js`**: *first real candidate.* Behavior-free
   lookup table, cohesive, not entangled with any one surface's data; clears the
   cross-cutting piece before the per-surface groups.
2. **Personal group** → `data/personal.js` (`PERSONAL_OPERATOR`, `PERSONAL_THREADS`,
   `PERSONAL_TILES_FOR_THREAD`): lowest consumer spread (mostly state+boot).
3. **Team group** → `data/team.js` (`TEAM_SUBJECTS`, `TEAM_TILES_FOR_SUBJECT`).
4. **Business group** → `data/business.js` (`BUSINESS_OPERATOR`, `BUSINESS_TILES_FOR_CASE`,
   then **`BUSINESS_SCENARIOS` last**: the 4-consumer knot).
5. **`PRODUCTS`**: not in this sequence; it's a **dead-import drop** (Stage 1), not a move.

Every move keeps a `v0_3_config.js` re-export until the last importer is re-pointed (the
7A/8A pattern), so frozen archives and any missed consumer never break.

---

## First safe extraction candidate

> **`CONSENT_CLASSES` → `config/consent.js`.**

Why it edges out the per-surface groups as the *first* scenario/config move:
- **Behavior-free**: a pure lookup table; all gating logic stays in the consumers.
- **Cohesive and standalone**: not tangled with team/personal/business data; it's the one
  cross-cutting table, so extracting it first *reduces* coupling before the surface splits.
- **Re-export-safe**: `v0_3_config.js` re-exports it; archives + transitional consumers
  unaffected.
- **Bounded verification**: load cut 01, switch surfaces, confirm clearance gating
  unchanged.

**Ruling out the pre-map biases:** `PRODUCTS` looked safest but is a **dead import** (drop,
not move). `BUSINESS_SCENARIOS` is correctly **last** (4 consumers). `PERSONAL_OPERATOR` is
simple but belongs *with* its surface group, not as a lone first move. `CONSENT_CLASSES` is
the cleanest genuine extraction.

---

## Boundaries

- No runtime code changed; no data moved; no deletion.
- Destination paths (`config/`, `data/`) are *proposed*, not created.
- `PRODUCTS` "dead import" is a map finding: confirm once more before dropping it (Stage 1).
