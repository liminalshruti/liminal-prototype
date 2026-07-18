# Demo Sequences — compressing the cuts into played product experience (2026-07-17)

## Problem

The catalog has ~12 disparate surfaces. Each cut is a projection of one product
(TAXONOMY: one loop, many cuts), but a first-time viewer meets them as a flat
list and never sees the interface fit together as a system. The one prior
attempt at compression — `cuts/_demo-lan-stitch.html` — proved the mechanic
(iframe stitch, master rail, presenter notes, `?embed=1`) but was built for a
single investor demo with three beats and was never generalized.

## Signal grounding (July 2026 briefs, 07-12 → 07-16)

The daily/frontier signal briefs converge on three demo-narratives the market
is actively validating:

1. **Judgment bottleneck** — Microsoft-scale study: adopters merge ~24% more
   PRs; researchers caution merged PRs are an output proxy. "Generation becomes
   abundant; accountable acceptance becomes scarce." (brief 07-14 §2, 07-16 §5)
2. **Spend governance** — Meta floats per-engineer token budgets; IBM's miss
   makes AI spend a board-level tradeoff. The record that matters:
   `budget → consumption → work → corrections → accepted output → outcome`.
   (07-14 §1, 07-16 §1)
3. **Portability** — GitHub Models retires July 30; open-weight frontier models
   (Inkling) multiply; model portfolios become the default. The durable asset
   is the customer-owned, model-independent judgment record. (07-15 §5, 07-16
   §2, frontier brief §1–5)

These are exactly the three altitudes the catalog already renders — so the
sequences write themselves onto existing cuts.

## Deliverable

`cuts/_sequences.html` — the sequence player. Underscore-prefixed (a demo
choreography shell like `_console`/`_demo-lan-stitch`, not a new cut; no new
TAXONOMY coordinate, so the convergence rule is not tripped). Three sequences,
each: opening **system frame** (full-bleed narrative card: loop diagram with
lit stages, signal grounding, claim chips) → live cut beats in iframes with
`?embed=1` → close frame handing off to the next sequence.

### Sequence map (beats reuse canonical URLs; nothing forked)

| Seq | Frame narrative | Beats | Prior |
|---|---|---|---|
| 1 · One day | judgment bottleneck (brief №1) | `01-slate-tray` → `02-forensic-agent` → `10-today` | DEMO_MANIFEST P1; CUT_CONSOLIDATION_MAP row C1/B1 |
| 2 · The governed fleet | spend governance (brief №2) | `11-govern.html?subject=spend&beat=loop&run=govern-run.json` → `../team-drift/index.html` → `03-calibration` | DEMO_MANIFEST P0; map row B2 LAND |
| 3 · It travels | portability (brief №3) | `08-liminal-custody` (healthcare incident) → `09-osint-custody` | map rows D5/D6; 08's healthcare scenario per PR #60 |

Final close frame: "Same loop, every subject. Spend is the wedge; the judgment
record is the company." — the wedge→infra framing rule verbatim from TAXONOMY
half-3, which THESIS_CONVERGENCE names as the raise's #1 objection.

### Claim safety

Every beat carries the DEMO_MANIFEST claim vocabulary in the player chrome
(PROTOTYPE · DETERMINISTIC FIXTURE · RECEIPT · live kernel, per surface).
The player adds no new product claims; it sequences existing claimed surfaces.

### Mechanics

- Master rail (generalizes the stitch rail): sequence tabs + per-beat dots;
  ←/→ advances through frames and beats; Esc back to the cover; `?seq=&beat=`
  deep links; lazy iframe load + next-beat preload.
- Presenter note (Caveat register, ⌘N) carried over from the stitch.
- `lib/surface-nav.js` gains the same two-line `?embed=1` suppression guard
  `lib/beat-rail.js` already has, so cuts 01/02/03/08/10 don't stack their
  left rail inside the player. No other lib changes.
- Canon tokens + locked type stack; reduced-motion: instant frame swaps.
- `index.html`: one catalog entry linking the player (below the wedge lead
  card — cut-01-forward demonstration strategy is unchanged).

## Non-goals / assumptions (background-session decisions, flag if wrong)

- Does NOT replace DEMO_MANIFEST's canonical P0/P1 recording paths; it wraps
  them. Not a product-convergence move on the desktop spine (Sean's lane).
- 00-agency is deliberately NOT a beat: consolidation build-state says its
  mechanism now lives in the engine and the master's subject switch is the
  altitude proof; the close frame states "the subject is a parameter" instead.
- molehunt stays a side reference on the close frame, not a beat (coverage
  debt per RUN_B; keeps sequences at 2–3 beats).
- Founder visual review remains the gate before any external send (manifest
  GREEN* rule applies to this surface too).
