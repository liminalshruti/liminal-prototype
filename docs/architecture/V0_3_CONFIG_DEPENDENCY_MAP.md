# `v0_3_config.js` Dependency Map — `liminal-prototype`

*Branch: `foundry/proof-to-port-architecture` · 2026-06-18 · Step 8 (planning only).*
*Source: every `export` in `v0_3_config.js` (35 total) + a per-symbol consumer grep across `lib/`, `cuts/`, `index.html`.*

> **This is a map, not a split.** No `v0_3_config.js` change is proposed for execution
> here. It tells the eventual split *what is safe to move, in what order, and at what
> risk*. No runtime code is edited by this document.

---

## Verification findings (read first — they correct the raw grep)

A naive grep of export names over-reports consumption in three ways. Each was verified
directly:

1. **`ANNOTATIONS` is a false positive.** `lib/marginalia.js` defines its **own local
   `const ANNOTATIONS`** (line 12) and does **not** import from `v0_3_config.js`. So
   `v0_3_config.ANNOTATIONS` has **no live consumer**.
2. **`FLOW` is a false positive.** The match in `cuts/11-govern.html` is the word "FLOW"
   inside a **prose comment** ("…the CORRECTION FLOW…"), not an import. So `FLOW` has
   **no live consumer**.
3. **`cuts/_archive/root-experiments/*` are retired/frozen.** `cuts/_console.html` badges
   every archive entry `retired` (e.g. `index-v036-frozen`, `index-v04-frozen`). They are
   **not live consumers** — they are frozen scaffolding that still imports old symbols.
   They must **not** count toward "safe to move" decisions.

---

## Live-consumer definition

> **Live consumers are `lib/state.js`, `lib/boot.js`, `lib/slate.js`, and
> `lib/keyboard.js`** — the modular slate-tray app (entered via `cuts/01-slate-tray.html`
> → `lib/boot.js`). `lib/marginalia.js` is live but does **not** consume config (own
> `ANNOTATIONS`). **`cuts/_archive/**` (including `root-experiments/*`) is NOT live.**

All four live consumers import via named imports `from "../v0_3_config.js"` (verified).

---

## Group A — LIVE-consumed (used by the modular app)

The real working surface: ~12 exports the running app actually imports.

| Export | Live consumers | Category | Safe to move? | Recommended destination | Risk |
|---|---|---|---|---|---|
| `CONSENT_CLASSES` | state, boot, slate | ontology | yes (move with consumers) | `config/consent.js` (or `ontology/`) | med |
| `TEAM_SUBJECTS` | state, boot, keyboard | scenario data | yes | `data/team.js` | med |
| `TEAM_TILES_FOR_SUBJECT` | state, boot, slate | scenario data | yes | `data/team.js` | med |
| `PERSONAL_OPERATOR` | state, boot | scenario data | yes | `data/personal.js` | med |
| `PERSONAL_THREADS` | state, boot, keyboard | scenario data | yes | `data/personal.js` | med |
| `PERSONAL_TILES_FOR_THREAD` | state, boot | scenario data | yes | `data/personal.js` | med |
| `BUSINESS_OPERATOR` | state, slate, boot | scenario data | yes | `data/business.js` | med |
| `BUSINESS_TILES_FOR_CASE` | boot, state | scenario data | yes | `data/business.js` | med |
| `BUSINESS_SCENARIOS` | state, boot, slate, keyboard | scenario data | yes | `data/business.js` | **high** (4 consumers) |
| `PRODUCTS` | boot (+ archive) | config / ontology | yes | `config/products.js` | med |
| `SPEC_VERSION` | boot (+ archive) | config | **yes (cleanest)** | `config/versions.js` | **low** |
| `PROTOTYPE_VERSION` | boot (+ archive) | config | **yes (cleanest)** | `config/versions.js` | **low** |

---

## Group B — NO live consumer / false positives

| Export | Why no live consumer | Category | Safe to move? |
|---|---|---|---|
| `ANNOTATIONS` | `marginalia.js` defines its **own** local const (no import) | copy | yes — orphaned in config |
| `FLOW` | `11-govern` match is the word in a **prose comment**, not an import | config | yes — orphaned |

---

## Group C — Archive-only (consumed solely by retired `cuts/_archive/**`)

These have consumers, but only **retired/frozen** archive files. Low risk to move (only
already-frozen files reference them), but **flag, don't delete**, until the archive's fate
is decided in Stage 1.

| Category | Exports | Safe to move? | Destination |
|---|---|---|---|
| ethics | `BIDIRECTIONAL_ETHICS` | yes (archive-only) | `archive-config/` or quarantine |
| scenario data | `TEAM_SCENARIOS`, `PERSONAL_SCENARIOS`, `WORKER_PERSONAS` | yes (archive-only) | quarantine with archive |
| config / status | `PHASE_1_STATUS`, `LOCKED_DECISIONS`, `V0_3_OPEN_QUESTIONS_IN_BUILD` | yes (archive-only) | quarantine |

> Note: `SPEC_VERSION`, `PROTOTYPE_VERSION`, `PRODUCTS`, `BUSINESS_SCENARIOS`, and
> `ANNOTATIONS` are *also* referenced by archive files, but they are classified by their
> **live** use (Group A) or **own-definition** status (Group B), not here.

Risk for Group C: **low** — only retired files would break, and they are already frozen.

---

## Group D — Zero consumers anywhere (dead exports)

No code reads these — not live, not archive. Dead-code candidates (verify once more before
any deletion; this is a map, not a delete order).

| Category | Exports (14) | Safe to move? | Destination |
|---|---|---|---|
| spec / doc constants | `TILE_TYPES`, `TRAY_SOURCES`, `SLATE_LAYOUT`, `SLATE_INTERACTIONS`, `CLASSIFICATION_LADDER`, `SLATE_UX`, `SLATE_TRAY_PHASES`, `READ_SHAPES`, `PERSONA_RENDER_COUNT`, `CATEGORY_CLAIM`, `CATEGORY_TAGLINE`, `NOT_CATEGORIES`, `AGENT_RAIL_UX`, `APR14_GRANOLA` | **yes — dead-code candidates** | none — mark for removal review |

Risk: **low** to move/quarantine; no code reads them.

---

## Headline (what the map reframes)

- **The live surface is small:** ~12 of 35 exports are actually imported by the running
  app (Group A). The other 23 are orphaned/false-positive (B), archive-only (C), or dead
  (D).
- **This reframes the split:** it is not "carve a 1460-line file into modules" — it is
  "~23 exports may be removable or quarantine-able, and only ~12 need a real home."
- **The hard knot is scenario data** (`TEAM_*` / `PERSONAL_*` / `BUSINESS_*`), entangled
  across state + boot + slate + keyboard. `BUSINESS_SCENARIOS` (4 consumers) is the
  highest-risk single move.

---

## Conclusion — first safe extraction candidate

> **`SPEC_VERSION` + `PROTOTYPE_VERSION` → `config/versions.js`.**

Why it is first:
- **Two values, one live consumer** (`boot.js`, the dev `?dev` version pin). Trivially
  cohesive, lowest risk in the entire file.
- **Behavior-preserving** — `boot.js` imports the same names, just from a new path; the
  `v0_3_config` analogue of the 7A/7B/7C pattern (smallest cohesive unit first).
- **Archive-safe** — the frozen files also reference these two; `v0_3_config.js` can
  **re-export** them from `config/versions.js` (the 7A re-export trick) so nothing breaks.

The clean wins (versions + the dead/orphaned constants) shrink the file *before* the
scenario-data surgery. Scenario data is the last and highest-risk tranche.

---

## Boundaries

- No `v0_3_config.js` split performed; no runtime code edited.
- "Recommended destination" paths are *proposed*, not created.
- Group D "dead" verdicts are extraction-map findings — confirm before any deletion.
