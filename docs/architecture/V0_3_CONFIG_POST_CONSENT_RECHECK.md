# Post-Consent Re-check — `v0_3_config.js` (Step 8, post-extraction)

*Branch: `foundry/proof-to-port-architecture` · 2026-06-18 · Planning only.*
*Source: re-derived export state + per-consumer call-site reading after `config/consent.js` landed.*

> Updates the live-export map now that versions + consent are extracted, and chooses the
> next surface-group candidate. No files edited; no scenario data moved.

---

## 1. Remaining export definitions in `v0_3_config.js`
**32 `export const` definitions remain** (was 35). Versions + consent are no longer defined
here. Of the 32, only the ~8 scenario-data exports + `PRODUCTS` are *live*; the rest are
Group C (archive-only) / Group D (dead) per the quarantine plan.

## 2. Now re-export-compatibility only (defined elsewhere)
- `SPEC_VERSION`, `PROTOTYPE_VERSION` → `./config/versions.js` (line 47)
- `CONSENT_CLASSES` → `./config/consent.js` (line 222)

These are facade lines — `v0_3_config.js` no longer owns them.

## 3. Imports still pointing at `v0_3_config.js`
- `state.js`, `boot.js`, `keyboard.js`, `slate.js` still import the **scenario data**
  (`TEAM_*`, `PERSONAL_*`, `BUSINESS_*`) — not yet extracted. Expected.
- Archive files import from `v0_3_config.js`; preserved by re-exports.

## 4. Candidate surface groups (blast-radius compared)

### Personal → `data/personal.js`  ⭐ next
| Export | Consumers | Usage | Behavior/data |
|---|---|---|---|
| `PERSONAL_OPERATOR` | state, boot | `.clearance_level` (state:110), `.role`/`.unit` (boot:155) | data only |
| `PERSONAL_THREADS` | state, boot, keyboard | `.find` (state:86, boot:152/533), `.forEach`/`.length` (boot:220/223), `.map` (keyboard:15) | data only |
| `PERSONAL_TILES_FOR_THREAD` | state, boot | `[ctx] ?? []` (state:91) | data only |

- **Files:** 3 (state, boot, keyboard) — **no `slate.js`.**
- **Risk:** low–medium. Pure data. **Re-export:** yes. **Blast radius:** smallest of the groups.

### Team → `data/team.js`
| Export | Consumers | Usage | Behavior/data |
|---|---|---|---|
| `TEAM_SUBJECTS` | state, boot, keyboard | `.find`/`.forEach`/`.length`/`.map` | data only |
| `TEAM_TILES_FOR_SUBJECT` | state, boot, **slate** | `[ctx] ?? []` (state:94), `[s.id]` (boot:340), import (slate:17) | data only |

- **Files:** 4 — **includes `slate.js`.** Risk: medium. Larger blast radius than personal.

### Business → `data/business.js`  (LAST)
- `BUSINESS_OPERATOR`, `BUSINESS_TILES_FOR_CASE`, **`BUSINESS_SCENARIOS`** (4 consumers).
  Highest-consumer knot; `BUSINESS_OPERATOR` carries §552a notice-copy interpolations.
  Move only after personal + team prove the pattern.

### `PRODUCTS` — NOT in this sequence
8C classified it a **dead import** (boot imports, never uses). Belongs to Stage 1
dead-import removal, not the scenario split.

## 5. Recommendation
> **Personal group → `data/personal.js`.** Smallest blast radius (3 files, no `slate.js`),
> pure-data usage, re-export-safe. Order: **personal → team → business**; `PRODUCTS` drop
> deferred to Stage 1.

## 6. Why personal beats team despite more call sites
Personal has *more* call sites but touches **3 files, zero `slate.js`**. Team has fewer
sites but crosses into `slate.js` (4 files). The lower-risk axis is files-touched
(especially `slate.js`), so personal is the smaller move.
