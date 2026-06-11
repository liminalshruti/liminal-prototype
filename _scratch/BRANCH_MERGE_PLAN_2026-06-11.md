# Branch consolidation plan — 2026-06-11

Investigation complete. This file records the full state + plan before any mutation.

## Starting state

- **Local `main`** = `c8bd29b` (#16 front-door polish). Clean working tree except
  untracked session artifacts (see below). Behind `origin/main` by 9 commits,
  **fast-forwardable** (no divergence).
- **`origin/main`** = `9aaecb6`. 9 new commits, all from 2026-06-06 — a coherent
  OSINT/Algorand hackathon build (cut-09 OSINT Custody wired to a real kernel:
  Neo4j + Algorand + Kafka; ontology travel cuts; trust-router cut then moved out
  to a separate `algorand-berlin-2026` repo). Additive, intentional. FF is safe.
- **`refactor/combine-cuts`** = `fcc42eb` (in sync with its origin). 3 unique
  commits: consolidate cuts by journey, archive old cuts, add surface-nav tool
  shell (rail + ⌘K palette), add `cuts/09-today.html`, plus two scratch docs.
  Diverged cleanly from `c8bd29b`.
- **`origin/claude/clever-einstein-bPiM3`** = identical to origin/main (0 ahead /
  0 behind). origin/main's HEAD points into this lineage. Fully merged → prune.
- **`rename/maya-to-maia-canon`** = `[gone]`, content already in main as #12 → prune.

## The uncommitted "work" on local main

Entirely **untracked session artifacts**, no tracked file is dirty:
- `.playwright-mcp/`, `audit-*.png`, `refactor-*.png`, `zip-today-surface.png`

The `refactor/combine-cuts` branch's `.gitignore` ALREADY ignores all of these
(`audit-*.png`, `zip-*.png`, `refactor-*.png`, `.playwright-mcp/`). So once that
branch merges to main, these correctly disappear from `git status` as ignored
artifacts. **The stash/unstash step is effectively a no-op** — nothing tracked to
preserve. We still do a guarded `stash -u` for safety and pop it after, but it
should restore zero changes (the files just become ignored).

## Merge order (verified safe)

1. FF local `main` → `origin/main` (`9aaecb6`). Clean, no merge commit.
2. Merge `refactor/combine-cuts` into `main`. **Verified clean** via
   `git merge-tree --write-tree` (exit 0, no CONFLICT). Only `index.html` is
   touched by both sides; the 3-way merge auto-resolves (non-overlapping menu
   additions). Result tree: `5d1bb5c`.
3. Push `main` to origin. **← outward-facing, gated on founder OK (see below).**

## TODO docs found (combined)

From `refactor/combine-cuts`: `_scratch/NEXT_STAGES_2026-06-02.md` (S1–S7) and
`_scratch/CUT_QUALITY_AUDIT_2026-06-01.md` (F1–F9).

**Already resolved in the branch** (no action): F2, F4, F7 (won't-fix, justified),
F9 (fixed: calibration heatmap contrast).

**Safe for me to complete on main** (code-only, scoped, no founder call):
- **S6** — cut 01 speedrun byline sizing (12.8px eyeballed → match archived original).

**Founder-gated — I will NOT decide these, only surface** (your call):
- **F1 / S?** — menu links speedrun cut, but decision doc names `01-slate-tray.html`
  as THE front door. Update menu, or update the doc?
- **S3 / F3** — index/menu uses Newsreader+Geist, not the LOCKED brand stack.
  Intentional (fast catalog) or drift?
- **S4** — 12 vs 13 agent count. Source material conflicts. Needs a brand-canon
  decision; blocks the Agents register cut. Touches a brand HARD-STOP.
- **F5** — "Maya" (contact/counterparty) vs "Maia" (renamed protagonist). Near-
  homograph. Keep distinct or unify? Needs human call, not blind replace.

**Optional / deferred** (founder chose to defer; not doing): S2, S5, S7, F8.

## Branch pruning (outward-facing — confirm before remote deletes)

- Local: delete `rename/maya-to-maia-canon` (gone), `refactor/combine-cuts` (merged).
- Remote: delete `origin/refactor/combine-cuts`, `origin/claude/clever-einstein-bPiM3`.
  `git fetch --prune` to clean stale tracking refs.
