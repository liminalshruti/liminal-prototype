# Cross-cut drift matrix — 2026-07-13

**Founder rulings (2026-07-13):** Row 1 → converged chrome ADOPTED as
canonical. Wave order approved: W2a (safety sweeps) then W2b (shared phone
layer + reset chip), both this session. North star for DESIGN.md: "The
Judgment Ledger".

Read-only inventory of 16 catalog surfaces + 3 embeds (3 parallel explorers,
findings spot-corrected against verified session ground truth). Purpose: rule
which pattern is canonical per row, then unify by **promoting into the shared
shell** (`lib/cut-shell-*`, `lib/loop.js`) — never by patching cuts one at a
time. Companion: `DESIGN.md` (de facto visual system, same date).

Legend: ✅ consumes canonical pattern · ⚠ diverges (drift) · ✳ deliberate
register difference (NOT drift) · — absent/n.a.

## Row 1 · Window chrome (.shell / titlebar / traffic lights)

**Finding:** `cut-shell-base.css` ships a converged chrome layer (`.shell`,
`.titlebar-converged`) explicitly marked "additive + inert — adopting = delete
a cut's inline chrome + import this sheet (Phase 2)". **No cut has adopted
it.** Every main surface carries an inline copy (00, 01*, 05 terminal-style,
06 `.win`, 09, 11, 12, custody, thread, team-drift, molehunt own `.topbar`);
03/04/10 partially reuse cut-shell classes.
**Recommended ruling:** adopt the converged path as canonical; migrate cuts in
waves (P0/P1 demo cuts first). This is the single highest-leverage
unification move — chrome fixes (like cut 11's mobile shell pin) become
one-file changes.

## Row 2 · Mobile breakpoints

| Surface | Lowest breakpoint |
|---|---|
| 01 | 380px ✅ (richest) |
| 11 | 760px ✅ (added 2026-07-13, incl. shell pin + rail collapse) |
| 02 | 560px · 04 | 560px · 05 | 600px · 06 | 760px |
| 09 | 940px ⚠ · 03 | 1024px ⚠ · 12 | 900px ⚠ · custody | 1180px ⚠ |
| 00, 10, thread, team-drift, molehunt | **none** ⚠⚠ |

**Recommended ruling:** promote cut 11's mobile block pattern (shell
`min-width:0` pin + rail collapse + `minmax(0,1fr)` center + inner-scroll
tables) into cut-shell as the shared phone layer; cuts opt in per register.
Forwarded investor links open on phones — index already routes there.

## Row 3 · Reset / recovery affordance

Only cut 11 has a **visible** restart (↺ + ⌥R/0, added 2026-07-13). Cut 01:
keyboard-only (⌘⇧R vault clear, ⌘Z). 08/09: disabled-until-active btnReset.
04: Esc-to-step-1. Everything else: none.
**Recommended ruling:** the ↺ restart chip becomes a shared shell affordance
(demo surfaces only), same placement and grammar everywhere.

## Row 4 · Claim / classification labels

- ⚠ "Maturity · live" survives in header metadata of **05, 10** (cut 11's was
  fixed this session); "live" pulse indicators on 00/01/03 rails; team-drift
  phase tab labeled "live"; 05 claims "shipped liminal-agents flow".
- ⚠ No shared badge component: cut 11 has `#run-badge` (vocabulary locked
  2026-07-13: demonstration / recorded · fixture), thread has "proposed",
  index now has legend chips — three different grammars.
- ✅ thread's "no accounts connected" disclaimer; 09's "frozen kernel bundle".
**Recommended ruling:** one `claim-chip` component in cut-shell carrying the
7-term legend (LIVE / DOGFOOD / RECEIPT / DETERMINISTIC FIXTURE / PROTOTYPE /
DESIGN INTENT / ROADMAP); per-surface header metadata reclassified to legend
terms; "live" as an ANIMATION label renamed ("reading", "active") so the word
live is reserved for the claim register.

## Row 5 · Seal choreography (loop-engine params)

| Cut | Params |
|---|---|
| 11 | bifurcated · 600ms · rule-gate · routing ✅ (Run-B C1 master ceremony; verified live this session — one explorer misread this as "instant") |
| 01 | rise · 520ms via CSS artifact-arrive ✅ (Run-B C1 demo surface) |
| 06 | rise · 360ms · gloss-layer · refined ✳ (Run-B C4 supports gloss-layer) |
| 08/09 | rise · 500ms · visible-clause · agent ✳/⚠ (500 vs canon 520 — verify vs RUN_B_CANON_RULINGS D3: 520 is the ruled value) |
| custody | per-mode: defense instant / osint rise 500 ✳ |
| 00 | instant · routing ✳ (explainer register) |

**Recommended ruling:** keep Run-B's adjudicated diversity (this row is mostly
✳ voice, not drift), but snap the two 500ms outliers to the ruled 520 and
record every cut's params in one table inside RUN_B_CANON_RULINGS so future
cuts pick from the menu instead of inventing values.

## Row 6 · Reduced motion

Global kill: 00, 04, 05, 10, 11, team-drift ✅ · Partial: 03, 06, 08, 09,
12 ⚠ · None visible: 02, thread, molehunt, embeds ⚠.
**Recommended ruling:** the C8-safe global block (assert end-state, never
freeze content hidden) ships once in cut-shell-base; cuts delete local copies.

## Row 7 · Fonts

✅ Canon stacks (Nineties Headliner / Perfectly Nineties / Geist / Geist Mono
/ Caveat accent) everywhere EXCEPT: ⚠ **Newsreader in custody.html (line ~46
+ fallback ~1733) and cuts/thread/index.html (~line 23)** — matches the known
cut-shell-font-drift residue. (One explorer flagged the canon faces
themselves as off-canon — that reading is wrong; N.H./P.N. ARE the locked
stack.)
**Recommended ruling:** strip Newsreader from both files (10-minute fix,
include in first unification PR).

## Row 8 · Ink tokens on dark surfaces

- Fixed this session: cut 11 (19× `--text-mute` → `--text-faint`), cut 02/03
  were fixed in an earlier pass (their headers document the elevation).
- ⚠ Still carrying `--text-mute` on dark: **00 (line ~75), 12 (throughout),
  custody ("text-mute heavy")**. The token file's own 2026-06-19 note makes
  `--text-faint` (#807D78, 4.8:1) the AA floor for dark faint text;
  `--text-mute` (#3A3833) is a cream-surface ink.
- ✳ molehunt is legitimately cream-substrate (ink-on-paper) — not drift.
**Recommended ruling:** mechanical sweep `--text-mute` → `--text-faint` on
the three dark surfaces (Haiku-tier work); add a one-line doctrine to
DESIGN.md ("mute is a cream ink; it never touches a dark surface").

## Row 9 · Nav grammar

Three families in live use: (a) tabs + number keys + ⌘K (11; 12 partial;
molehunt tabs+numbers), (b) product tabs + orbital rail (01), (c) bespoke
(06 marginalia walk, 08/09 register tabs, custody mode toggle, 04 steprail).
Presenter layers (beat-rail/demo-calm/marginalia) only on 00 and 11.
**Recommended ruling:** don't force one nav — grammar follows register (✳) —
but standardize the KEYBOARD contract (number keys = surfaces, ⌘K where >4
surfaces, Esc = close/back) and document it in DESIGN.md so new cuts inherit
the contract, not the widgets.

## Row 10 · CSS import stack

Common spine: design-tokens + cut-shell(+shim) + brand-upgrade. ⚠ Divergers:
06 (tokens only), team-drift + molehunt (no cut-shell), thread (local
thread.css), embeds (fully inline). 03 lacks brand-upgrade.
**Recommended ruling:** canonical import spine = tokens → cut-shell →
brand-upgrade (in that order), documented; standalones adopt when they next
get touched (not worth a dedicated sweep).

## Suggested wave order (after rulings)

1. **W2a — safety sweeps** (small, mechanical): Newsreader strip (row 7),
   text-mute sweep on 00/12/custody (row 8), "Maturity · live" reclassification
   on 05/10 + "live"-pulse renames (row 4). One PR.
2. **W2b — shared phone layer + reset chip** (rows 2, 3): promote cut 11's
   patterns into cut-shell; adopt on 00/10 (the two zero-breakpoint catalog
   cuts investors actually reach from index).
3. **W3 — converged chrome adoption** (row 1): migrate P0/P1 cuts first
   (11, 01), then the catalog in pairs, deleting inline chrome per cut.
   Playwright cross-cut smoke extends per wave.
4. Seal-param snap + params table (row 5) rides whichever wave touches 08/09.
