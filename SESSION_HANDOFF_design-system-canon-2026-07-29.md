# Session handoff · design-system canon pass · 2026-07-29

Branch `redesign/register-propagation-2026-07-29`. Ran alongside the govern/atlas
session in the same worktree, on a disjoint file lane (design-system/, components/,
specimen, lib/ type+color). Founder rulings this session: **canon wins** for both the
type stack and the wheel registers.

## Open — needs the govern/atlas lane

### 1. Two un-swapped §18 alias call sites  ← the actual handoff

`cuts/12-operating-plane.html` was outside my lane, so these were left:

| line | now | should be |
|---|---|---|
| 150 | `border-color: var(--resolved-soft)` | `var(--resolved-edge)` |
| 300 | `border-color: var(--emergence-soft)` | `var(--emergence-edge)` |

Why: the 2026-07-29 §18 normalization inverted the ladder to match the wheel —
`-soft` went 0.40 → 0.24 and `-edge` 0.22 → 0.40. Both of these are *borders*
written against v1, so they meant the heavy 0.40, which is now `-edge`. The swap is
value-preserving; leaving it means the borders quietly render at ~half weight.

The same swap was already applied to `liminal-desktop-specimen.html` in `73438be` —
use that as the reference. These two are the last remaining call sites in the repo.

### 2. `cuts/11-govern.html:1419` still names a retired hex

`var(--coherence,#7AA9FF)` — the fallback is the pre-retune off-wheel literal that
§18 replaced. Harmless while canon loads, wrong if it ever fires. Canon now resolves
`--coherence` to `--cerulean-lift`.

## Open — unowned

- **`design-system/ds-styles.css` is a dead monolith.** Loaded by no page, but still
  carries the retired v0.2 hexes (`:2094-2096`, `:2558-2560`), its own `--display/
  --serif/--sans/--mono` block (`:890-893`), and 5 phantom `--fg-N` refs. It reads as
  live code in every grep and will keep generating false findings. Delete or archive.
- **Atlas pages load no webfont link at all.** `design-system/atlas/*.html` import
  tokens → cut-shell → cut-shell-products → brand-upgrade, but nothing fetches a
  family, so `--mono` falls to system `ui-monospace`. `design-system.html` and the
  specimen were fixed in `a11ddcf`; the atlases still need it.
- **The type-SIZE vocabularies are still split.** `lib/brand-upgrade.css` defines
  `--text-*` / `--tracking-*` / `--leading-*` in parallel with canon's `--fs-*` /
  `--ls-*` / `--lh-*`. The *face* names were converged in `66b86d9`, but the sizes
  were deliberately left: the scales are not 1:1 (`--text-2xs` is 8.2px, `--fs-eyebrow`
  is 9px), so aliasing them silently reflows type. Needs a founder-reviewed mapping
  table before anyone touches it.
- **`--good`/`--amber`/`--red` pattern audit.** Fixed in `9c4ada8`, but the same
  self-referencing idiom (`--x: var(--x, fallback)` — a cycle, always invalid) may
  exist elsewhere. Worth a sweep: `grep -nE '\-\-([a-z-]+):\s*var\(--\1[,)]'`.

## Founder-owned, drafted not written

`founder-brain/meta/SHARED_CONTEXT.md` §2 and `~/.claude/CLAUDE.md` both still read
*"Type stack locked: Nineties Headliner + Perfectly Nineties + Geist Mono."* Superseded
2026-07-29 — canon §5 now ships Space Grotesk (sans) and Space Mono (mono), with Geist
retained only as fallback chain entries. SHARED_CONTEXT is the root both other copies
cite; correcting it first prevents the leaves from re-diverging. This repo's own
`CLAUDE.md` was corrected in `a42bddc` and now points at §5 rather than restating faces.

Note: `founder-brain` local was 2 commits behind `origin/main` at session start —
fetch before editing.

## Landed

| commit | |
|---|---|
| `73438be` | §18 alias swap · specimen (4 of 6 sites) |
| `5fb6ff1` | last live v0.2 hexes → `--ui-state-*`; `framing.css` phantom tokens repaired |
| `a11ddcf` | Space Grotesk + Space Mono actually loaded |
| `66b86d9` | canon wins the face names; **cuts stop rendering in Times** |
| `9c4ada8` | `--good`/`--red` were invalid on every cut |
| `83d4995` | brand-upgrade's wheel fork stripped — one register system again |
| `a42bddc` | CLAUDE.md type stack superseded |
| liminal-creative `71d7fcf` | canon back-port; both mirrored files verified byte-identical |

### The two that weren't on the plan

`lib/cut-shell-base.css` used `--sans: var(--sans, fallback)` in five places and
`--good`/`--red` in two more. A custom property referencing *itself* is a dependency
cycle, and per css-variables-1 §3 every property in a cycle computes to the
guaranteed-invalid value — **the fallback is never consulted.** So the "bridge to
canon" destroyed canon's values instead of deferring to them. Measured on
`cuts/00-agency.html` before the fix: `--display`, `--serif`, `--sans`, `--mono`,
`--good` and `--red` all computed to empty, and `body` font-family was **`Times`**.
The cuts only ever looked right because `brand-upgrade.css` loads afterward and
redefined the same names non-cyclically — the exact load-order dependency that file's
comment claimed to have removed. Inverting the aliases removed the accidental repair
and made it visible.

Tell: `cut-shell-base.css:61` already warns *"use explicit values to avoid the
circular-ref invalidation trap"* — sixteen lines above two instances of the trap.
