# `v0_3_config.js` Quarantine Plan (Step 8B) — `liminal-prototype`

*Branch: `foundry/proof-to-port-architecture` · 2026-06-18 · Planning only.*
*Source: `docs/architecture/V0_3_CONFIG_DEPENDENCY_MAP.md` (Groups B/C/D).*

> **This is a burial map, not a cleanup.** No file is edited, nothing is deleted, no
> archive file is touched, no scenario data is moved. It decides *how each non-live export
> should eventually be treated* — and when. Execution is Stage 1, separately gated.

---

## The load-bearing finding (verified — shapes every Group C verdict)

The retired files `cuts/_archive/root-experiments/index-v036-frozen.html` and
`index-v04-frozen.html` import Group C symbols **by name** via
`import { … } from "./v0_3_config.js"` — which resolves to the **root `v0_3_config.js`**.

So: **any Group C export removed from `v0_3_config.js` breaks a frozen archive import**
unless re-exported. Group D, by contrast, is imported by *nothing* (0 consumers anywhere).

This makes the whole plan hinge on one gating decision, owned by Stage 1:

> **Are the frozen archive files a contract to preserve, or dead pages headed for deletion?**
> - **Preserve** → Group C must stay reachable from `v0_3_config.js` (keep, or move + re-export shim). Group D can still go.
> - **Delete in Stage 1** → once the archives go, Group C loses its only consumers and joins Group D as freely removable (~21 exports could then leave the file).

This plan does **not** decide that. It gives a recommendation per branch.

---

## Constraints honored

No runtime code changes · no deletion · no archive-file edits · no scenario-data moves ·
`TEAM_*` / `PERSONAL_*` / `BUSINESS_*` / `CONSENT_CLASSES` / `PRODUCTS` untouched (those
are live — Step 8C) · `slate.js` untouched · monolithic cuts untouched.

---

## Group B — false positives / orphaned

| Export | Category | Consumer status | Why not live product config | Recommended treatment | Risk | Verification before action | Before/after Stage 1 |
|---|---|---|---|---|---|---|---|
| `ANNOTATIONS` | copy | **none** — `marginalia.js` defines its OWN local `const ANNOTATIONS`; no import | The live marginalia layer is self-contained; this config copy is unused | **delete later** (or `docs/reference` if values have archival worth) | low | re-grep for any `import { ANNOTATIONS }` — confirm still zero | Stage 1 |
| `FLOW` | config | **none** — the `11-govern` hit is the word in a prose comment, not an import | No importer anywhere | **delete later** | low | re-grep `import .*FLOW` — confirm zero | Stage 1 |

**No re-export shim needed** for either (no real importer). Removable cleanly — but deletions, so deferred.

---

## Group C — archive-only (sole consumers are the retired frozen files)

| Export | Category | Consumer status | Why not live product config | Recommended treatment | Risk | Verification before action | Before/after Stage 1 |
|---|---|---|---|---|---|---|---|
| `PHASE_1_STATUS` | config/status | archive-only (frozen v036) | Only a retired index reads it | **leave until Stage 1** | low | confirm archive-fate decision first | Stage 1 (tied to archive fate) |
| `LOCKED_DECISIONS` | config/status | archive-only (frozen v036) | Only a retired index reads it | **leave until Stage 1** | low | same | Stage 1 |
| `WORKER_PERSONAS` | scenario data | archive-only (frozen v036 + v04) | Only retired indexes read it | **leave until Stage 1** | low | same | Stage 1 |
| `TEAM_SCENARIOS` | scenario data | archive-only (frozen v036 + v04) | Only retired indexes read it | **leave until Stage 1** | low | same | Stage 1 |
| `PERSONAL_SCENARIOS` | scenario data | archive-only (frozen v036 + v04) | Only retired indexes read it | **leave until Stage 1** | low | same | Stage 1 |
| `BIDIRECTIONAL_ETHICS` | ethics | archive-only (frozen v036 + v04) | Only retired indexes read it | **leave until Stage 1** | low | same | Stage 1 |
| `V0_3_OPEN_QUESTIONS_IN_BUILD` | config/status | archive-only (frozen v036) | Only a retired index reads it | **leave until Stage 1** | low | same | Stage 1 |

**Net for Group C: leave until Stage 1.** The correct move *depends on* the archive-fate
decision (a Stage 1 item). If archives are kept, options are *keep-in-place* (zero-risk) or
*move-with-re-export-shim*. If archives are deleted, Group C becomes freely removable.
`docs/reference` is **not** viable while archives exist — they import these as live JS, and
docs cannot satisfy an `import`.

---

## Group D — zero consumers anywhere (genuinely dead; re-confirmed 0 incl. archive)

| Export | Category | Consumer status | Why not live product config | Recommended treatment | Risk | Verification before action | Before/after Stage 1 |
|---|---|---|---|---|---|---|---|
| `TILE_TYPES` | spec/doc const | **0 everywhere** | Nothing reads it | delete later | low | final re-grep (0) | Stage 1 |
| `TRAY_SOURCES` | spec/doc const | **0 everywhere** | Nothing reads it | delete later | low | final re-grep (0) | Stage 1 |
| `SLATE_LAYOUT` | spec/doc const | **0 everywhere** | Nothing reads it | delete later | low | final re-grep (0) | Stage 1 |
| `SLATE_INTERACTIONS` | spec/doc const | **0 everywhere** | Nothing reads it | delete later | low | final re-grep (0) | Stage 1 |
| `CLASSIFICATION_LADDER` | spec/doc const | **0 everywhere** | Nothing reads it | **`docs/reference`** (likely product-reference worth) or delete | low | final re-grep (0) | Stage 1 |
| `SLATE_UX` | spec/doc const | **0 everywhere** | Nothing reads it | delete later | low | final re-grep (0) | Stage 1 |
| `SLATE_TRAY_PHASES` | spec/doc const | **0 everywhere** | Nothing reads it | delete later | low | final re-grep (0) | Stage 1 |
| `READ_SHAPES` | spec/doc const | **0 everywhere** | Nothing reads it | delete later | low | final re-grep (0) | Stage 1 |
| `PERSONA_RENDER_COUNT` | config | **0 everywhere** | Nothing reads it | delete later | low | final re-grep (0) | Stage 1 |
| `CATEGORY_CLAIM` | copy | **0 everywhere** | Nothing reads it | **`docs/reference`** (positioning copy worth keeping) or delete | low | final re-grep (0) | Stage 1 |
| `CATEGORY_TAGLINE` | copy | **0 everywhere** | Nothing reads it | **`docs/reference`** (positioning copy) or delete | low | final re-grep (0) | Stage 1 |
| `NOT_CATEGORIES` | copy | **0 everywhere** | Nothing reads it | **`docs/reference`** (anti-positioning copy) or delete | low | final re-grep (0) | Stage 1 |
| `AGENT_RAIL_UX` | UI labels | **0 everywhere** | Nothing reads it | delete later | low | final re-grep (0) | Stage 1 |
| `APR14_GRANOLA` | scenario data | **0 everywhere** | Nothing reads it | delete later | low | final re-grep (0) | Stage 1 |

**Net for Group D: delete-later, with a sub-sort.** A few carry product-reference value
(`CATEGORY_CLAIM`, `CATEGORY_TAGLINE`, `NOT_CATEGORIES`, `CLASSIFICATION_LADDER`) → route
to `docs/reference`; the rest are dead. **No shim needed for any** (nothing imports them) —
the cleanest removable set in the file.

---

## Summary

| Group | Count | Recommendation | Shim needed? | When |
|---|---|---|---|---|
| B (orphaned) | 2 | delete later (`ANNOTATIONS` → maybe `docs/reference`) | no | Stage 1 |
| C (archive-only) | 7 | **leave until Stage 1** (verdict depends on archive fate) | only if moved while archives kept | Stage 1 |
| D (dead) | 14 | delete later; route reference-worthy copy to `docs/reference` | no | Stage 1 |

**The one decision that unlocks ~21 exports leaving the live config surface:** keep vs.
delete the frozen archive files — a Stage 1 call. Until then, the only no-shim shrink
available is Group B + Group D (16 exports), and even those are deletions → Stage 1.

**Nothing in this plan executes now.** It is the framework Stage 1 will act on.
