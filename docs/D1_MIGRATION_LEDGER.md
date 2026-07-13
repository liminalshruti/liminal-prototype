# D1 token-binding migration — ledger

Tracks the surface-by-surface binding of hardcoded spacing/radius/tracking/font-size
onto canon tokens (plan: `plan-the-d1-migration-adaptive-boot.md`; policy: pragmatic —
exact binds are identity-safe; ≤2px off-scale values snap to nearest token; ≥3px
stranded values stay raw as documented exceptions here). `design-tokens.css` never edited.

Verification: headless Chromium under forced reduced-motion. Exact (Pass A) binds proven
zero-change by sha256 on 8 deterministic shim cuts; snap (Pass B) changes measured with a
pure-Node PNG pixel-diff and visually confirmed as benign reflow.

## Phase 1 — shared cut-shell CSS (feeds the 17 shim-linked cuts) ✅

| File | Exact binds (Δ0) | Snap binds (≤2px) |
|---|---|---|
| `lib/cut-shell-base.css` | 193 | 101 |
| `lib/cut-shell-products.css` | 166 | 91 |
| `lib/cut-shell-registers.css` | 32 | 22 |

**Verification:** Pass A — all 8 deterministic cuts (02/03/05/08/09/10/11/12) byte-identical.
Pass B pixel-diff vs baseline: 02/03/05/09 = 0.000%; 10-today 0.81%; 11-govern 4.70%;
12-operating 5.00%; 08-custody 15.24% — all confirmed by eye as clean cumulative reflow
(no overlap/misalignment); custody + 00 (non-deterministic) visually confirmed clean.

### Stranded exceptions (kept raw — no canon token within 2px)
| File | Axis | Values | Reason |
|---|---|---|---|
| base | spacing | 32px, 360px | 32 between --space-6/7 (Δ4); 360 large custom |
| base | radius | 18px, 22px | large radii, no token (>14) |
| base | tracking | .10em | between --ls-app-wide(.06)/-wider(.14) |
| products | spacing | 1px, 32px, 40px, 188px | 1 = hairline; 32/40 stranded; 188 large custom |
| products | radius | 10px | in the --radius-4(6)→-5(14) gap |
| products | tracking | .10em, .24em | .10 stranded; .24 > --ls-mono-lg(.20) |
| registers | tracking | .10em | stranded |

Candidate for a founder micro-tier call if these recur widely: a `--radius` at ~10px and
an `--ls` at ~.10em would absorb the most common strandeds. Low priority.

## Phases 2–5 — per-surface binding ✅

**Policy refinement (important):** the shared shell (Phase 1) safely took exact **+ snap**
binds (verified across all consumers). A trial snap pass on the cuts' **own** inline
styles **clipped cut 08's left rail** — dense, fine-tuned per-cut layouts don't tolerate
cumulative ≤2px snaps. So per-surface binding is **exact-only**; off-scale per-cut values
stay raw (documented). This keeps the highest-leverage layer fully normalized while
preserving hand-tuned cut layouts.

| Surface group | Bind | Verification |
|---|---|---|
| 15 cuts (own inline `<style>`) | exact | 0.000% on all deterministic cuts; 00/custody/embeds identity-by-construction + visual |
| `index.html`, `team-drift`, 3 embeds | exact | 0.000% (det) / identity (non-det) |
| `cuts/onboarding/onboarding.css`, `lib/brand-upgrade.css` | exact | 0.000% via consumer render |
| `molehunt/index.html` (Phase 5) | de-fork local scale → canon + exact (space/radius/tracking) | 0.000% |

**molehunt specifics:** local parallel `--fs-*` scale repointed to canon (`--fs-micro`→
`--fs-mono-xs`, `--fs-meta`→`--fs-mono-sm`, `--fs-h`→`--fs-mono-lg`, `--fs-tier`→`--fs-2xl`;
`--pad-pane`→`--space-4`); dead `--u/--pad-row/--gap-col` removed. **font-size axis not
auto-bound** — molehunt carries 3 contested `--fs-body` definitions (base + 2 density
variants), so `14px→var(--fs-body)` is unreliable; the repoint already canonizes its type
scale, ~13 raw `font-size` px remain as documented exceptions.

## Deliberately deferred (documented)
- **Per-cut off-scale snaps** — kept raw to protect hand-tuned layouts (see policy above).
  Revisit per-surface with individual visual verification if full snap coverage is wanted.
- **rem-routed type** in cuts 00/03/10/11 — their px/radius/tracking are exact-bound; the
  rem type system is a consistent relative scale, left as-is (rem ≠ raw px).

## Tooling (reusable, in `scratchpad/d1/`)
`bind.mjs` — property-aware CSS→token binder (exact/snap passes, per-axis filter, HTML
`<style>`-scoped). `pngdiff.mjs` — pure-Node PNG pixel-diff (zlib only, no deps).
