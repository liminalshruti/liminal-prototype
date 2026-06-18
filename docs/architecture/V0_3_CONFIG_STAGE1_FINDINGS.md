# Stage 1 Cleanup — Findings & Revised Scope (`v0_3_config.js`)

*Branch: `cleanup/v0_3_config-dead-exports-2026-06-18` · 2026-06-18 · Planning/findings only.*
*Supersedes the cleanup assumptions in `V0_3_CONFIG_QUARANTINE_PLAN.md` after re-verification against current `main` (post scenario-split).*

> This note records what Stage 1 cleanup discovered on first contact and revises the
> plan accordingly. No deletions performed in the commit that adds this note.

---

## What changed our mind (the load-bearing finding)

The quarantine plan treated **Group C (archive-only exports)** as low-risk to remove once
the archive-fate decision was made, with the option "inline the needed values into the
archives, then delete." On re-verification against current `main`, that path is **larger
and riskier than the plan implied**:

- The two frozen archive files —
  `cuts/_archive/root-experiments/index-v036-frozen.html` and `index-v04-frozen.html` —
  import **8–12 symbols each** from `v0_3_config.js` by name, e.g.:
  - v036: `SPEC_VERSION, PROTOTYPE_VERSION, PHASE_1_STATUS, LOCKED_DECISIONS, PRODUCTS, WORKER_PERSONAS, BUSINESS_SCENARIOS, PERSONAL_SCENARIOS, TEAM_SCENARIOS, BIDIRECTIONAL_ETHICS, ANNOTATIONS, V0_3_OPEN_QUESTIONS_IN_BUILD`
  - v04: `SPEC_VERSION, PROTOTYPE_VERSION, PRODUCTS, WORKER_PERSONAS, BUSINESS_SCENARIOS, PERSONAL_SCENARIOS, TEAM_SCENARIOS, BIDIRECTIONAL_ETHICS, ANNOTATIONS`
- "Make the archives self-contained" therefore means **inlining ~10 data structures**
  (including `BUSINESS_SCENARIOS`, ~187 lines) into two files whose entire purpose is to be
  **frozen snapshots**. Editing a frozen file to free a config export inverts the point of
  freezing it.

## The realization that resolves it

**The re-export facade we built already protects the archives** for the *extracted*
symbols. `SPEC_VERSION`, `PROTOTYPE_VERSION`, `PRODUCTS`, `BUSINESS_SCENARIOS` (and the
other extracted scenario data) are all re-exported from `v0_3_config.js` and keep resolving
for the archives regardless of cleanup. So:

- The archives are **already safe** for everything that's been extracted.
- The **only** symbols a future deletion would break are the **still-inline Group C**
  exports (`PHASE_1_STATUS`, `LOCKED_DECISIONS`, `WORKER_PERSONAS`, `TEAM_SCENARIOS`,
  `PERSONAL_SCENARIOS`, `BIDIRECTIONAL_ETHICS`, `V0_3_OPEN_QUESTIONS_IN_BUILD`,
  `ANNOTATIONS`).
- Cheapest correct treatment for Group C: **leave it inline.** It is an honest dependency
  of the frozen snapshots. Removing it requires either editing frozen files (bad) or
  re-exporting it from new modules (work with no live-consumer benefit, since nothing live
  reads Group C).

## Re-verified status (against current `main`)

- **Group D (14 exports)** — re-verified **0 consumers everywhere** (live AND archive):
  `TILE_TYPES, TRAY_SOURCES, SLATE_LAYOUT, SLATE_INTERACTIONS, CLASSIFICATION_LADDER,
  SLATE_UX, SLATE_TRAY_PHASES, READ_SHAPES, PERSONA_RENDER_COUNT, CATEGORY_CLAIM,
  CATEGORY_TAGLINE, NOT_CATEGORIES, AGENT_RAIL_UX, APR14_GRANOLA`.
  These are the *only* genuinely free-to-delete exports. Notable on content read:
  `CATEGORY_CLAIM` / `CATEGORY_TAGLINE` are the **superseded** old category noun
  ("transition workspace for unresolved context"), pre-dating the locked
  control-plane/judgment-infrastructure framing — preserving them as "reference" would
  preserve *retired positioning*. `NOT_CATEGORIES` + `CLASSIFICATION_LADDER` are the only
  two with durable reference value.
- **Group C (8 exports)** — imported by name by the 2 frozen archives. **Not free to
  delete** without editing frozen files. Recommendation: **leave inline.**
- **`PRODUCTS`** — dead *import* in `boot.js` (never used in body; verified), but the
  **export must stay** (archives import it). Only the boot import line is removable.
- **`ANNOTATIONS`** — the quarantine plan called it a Group B false-positive (marginalia
  has its own local const). True for *live* code, but the **archives do import the config
  `ANNOTATIONS`** — so it is effectively Group C, not freely deletable.

## Revised Stage 1 scope

| Item | Original plan | Revised verdict |
|---|---|---|
| Group D (14 dead exports) | delete later | **Delete-eligible** (0 consumers anywhere) — its own deletion-gated pass, with `CATEGORY_*` superseded-copy noted |
| Group C (8 archive-only) | inline archives, then delete | **Leave inline** — honest frozen-snapshot dependency; not worth editing frozen files |
| `PRODUCTS` export | drop dead import + delete export | **Drop boot import only**; keep export (archive needs it) |
| `ANNOTATIONS` | Group B, delete | **Reclassify to Group C** — archive imports it; leave inline |
| 2 frozen archives | candidate to delete/self-contain | **Leave frozen as-is** — self-containment is a large, anti-"frozen" edit; re-exports already protect them |

## Smallest safe cleanup available now

Only one truly-safe, non-deletion structural fix is available without editing frozen files
or removing archive dependencies: **drop the unused `PRODUCTS` import from `lib/boot.js`**
(leave the export). Group D deletion is a separate, deletion-gated pass.

## Boundaries

- No deletions in this findings commit.
- No frozen-archive edits.
- No runtime behavior change.
