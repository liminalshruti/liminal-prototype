# RUN_B_SESSION_BRIEF — instructions for the Run-B adjudication session

> **You are Run-B**: a fresh Fable session whose sole job is to adjudicate the
> prototype's design-system contradictions into desktop canon. The producer session
> (2026-07-01) extracted the facts, ran the coherence panel, and consolidated the cuts
> onto a parameterized loop engine so that YOUR decisions are one-line default flips,
> not refactors. Do not re-derive the substrate; do not re-refactor; adjudicate.

## Scope guard (hard)

- You DECIDE and WRITE CANON. You do not port cuts, restructure files, or redesign
  surfaces. Every decision lands as (a) a canon ruling in your output doc, and (b) a
  parameter-default flip in `lib/loop.js` / per-surface config (one line each).
- Canon rulings that belong upstream (type scale, serif, motion policy tokens) are
  WRITTEN AS SPECS addressed to liminal-creative (`DESIGN_SYSTEM.md` / design-tokens
  upstream) — you do not edit design-tokens.css here (synced mirror; hard rule).
- founder-brain is read-only context.
- Bio/brand hard-stops apply (Liminal one word; locked type stack; core sentence).

## Inputs (read in this order)

1. `docs/RUN_B_COHERENCE_FINDINGS.md` — the contradiction ledger (C1–C9), panel
   disagreements (D1–D3), per-surface notes. Your work-list.
2. `docs/run-b-critiques/` — the four raw single-lens critiques (typography /
   spatial / motion / moments). Read before ruling on anything they evidence.
3. `docs/RUN_B_CUTS_INVENTORY.md` — cited fact sheet; use to verify any claim.
4. `docs/CUT_CONSOLIDATION_MAP.md` — the ladder join; §5 lists what you inherit.
5. `docs/CONSOLIDATION_DESIGN.md` (+ ADJUDICATED ADDENDUM) — the engine you're
   flipping defaults on.
6. Render wall: `audit-runb-wall-*.png` at repo root (gitignored; if absent,
   re-render via `npm run dev` + playwright at 1440×900 — capture method in the
   findings doc provenance note).
7. `founder-brain/meta/SHARED_CONTEXT.md` + `liminal-creative/canon/DESIGN_SYSTEM.md`
   — the brand canon your rulings must compose with.

## The decision list (ranked; C-numbers from the findings ledger)

1. **C1 — the sealed moment.** Decide what finality is: one ceremony, or an
   altitude rule (operator surfaces instant, demo surfaces rise) written down. Both
   live critics independently hypothesized the altitude rule — treat that as a
   candidate, not a conclusion. Flip: seal-choreography defaults per surface.
2. **C2 — tokens as infrastructure vs documentation.** Rule whether the implied
   scales (type/spacing/tracking/rail) get claimed as tokens with required binding,
   or compositional sizing is canonized. This decides D1 (the panel's grade split)
   — address D1 explicitly in your ruling.
3. **C3 — the serif.** One face. Kill or keep the Newsreader residuals
   (`03-calibration.html:129,444` are the only live renders; full residual list in
   the cut-shell-font-drift memory + findings). Upstream spec if the answer touches
   the token file.
4. **C4 — correction UX.** One canonical pattern or two named patterns with
   use-case guidance (gloss-layer vs rule-gate; 09's visible-clause is a rule-gate
   variant). Flip: correction-model defaults.
5. **C5 — refusal.** Name the three flavors (system/agent/routing) as canon or
   collapse them; pick 200ms vs 320ms. Flip: refusal params.
6. **C6 — frame restructuring license.** Three-pane invariant + documented
   exceptions (re-entry, command surfaces), or free. (Partially dissolved: cut 10's
   two-column broke the frame and 10 is absorbed into the master's Today surface —
   verify the absorbed rendering, then rule for future surfaces.)
7. **C7 — display scale steps.** Claim them (the renders imply 22/28–32/36) or
   canonize moment-relative sizing. Fix whatever cascade fragility forced cut 01's
   `!important` hero.
8. **C8 — reduced-motion policy.** Shipping requirement per surface? Scope: ambient
   vs ceremony vs feedback (toasts). Currently 5/10 handle it.
9. **C9 — ambient vs refined precedence** + one canonical pulse duration (4.2s is
   the step-synced value in evidence).

Also resolve: **D2/D3** (the panel's seal-observation conflicts — verify against the
consolidated engine, where the answer is now a parameter table you can read);
**coverage debt** — molehunt and team-drift were never panel-audited (findings §5
flag); audit them against your rulings before declaring canon complete.

## The parameter contract (what a decision flips)

The consolidation put every contested behavior behind `initLoopEngine(opts)` in
`lib/loop.js`. Exact opts surface (verbatim from the engine):

| Ledger item | Engine parameter | Values (current per-surface defaults) |
|---|---|---|
| C1 seal ceremony | `sealChoreography` | `'instant'` (00, 08/custody-defense) · `'rise'` (01, 06, 09/osint, 10-absorbed) · `'bifurcated'` (11/master spend) |
| C1 seal timing | `sealRiseMs` | 360 (06) · 500 (osint) · 520 (01) · 600 = the bifurcated glow (master). **ERRATA: the findings ledger said cut 01 = 360ms; code is 520ms (`artifact-arrive`, cut-shell:~1008). 06 really is 360ms.** |
| C1 bifurcated glow | `onSealGlow` hook (opts, fires only when choreography = bifurcated) | master implements the 600ms orbital-core glow |
| C4 correction UX | `correctionModel` | `'gloss-layer'` (06 — reference impl) · `'rule-gate'` (01, 08) · `'visible-clause'` (09) |
| C5 refusal flavor | `refusalFlavor` | `'system'` (custody-defense) · `'agent'` (osint, 11) · `'routing'` (00, 01, 06) |
| C5 refusal timing | `refusalTimingMs` | 200 (00) · 320 (everything later) |
| C9 motion tier | `motionTier` | `'ambient'` · `'refined'` · `'both'` per surface |

Mechanism: `applySealChoreography(artifactEl, choreography, durationMs)` sets the
`--seal-rise-ms` custom property / animation class per mode — so flipping a default is
literally editing the per-surface `initLoopEngine({...})` config block in that cut.
Beats: `applyBeat('IDLE'|'CAPTURING'|'READING'|'DECIDING'|'SEALING'|'ENTERING')`;
other hooks: `onBeatChange(beat, prev)`, `onSealed(artifact)`.

Post-consolidation surface list (where the config blocks live): the master
(`cuts/11-govern.html`, subject-switchable), `cuts/custody.html` (defense|osint modes),
`cuts/01-slate-tray.html`, `cuts/02-forensic-agent.html` (READ-only), 
`cuts/06-margin-read.html`, `cuts/00-agency.html` (archived behind redirect once the
master absorbs it — check `docs/CUT_CONSOLIDATION_MAP.md` §4 state at your runtime).

Additional errata your ledger inherits:
- The fold map's claim that cut 10 was "already absorbed" into 11's Today was
  substantially false (see `docs/architecture/CUT10_ABSORPTION_PARITY.md`); the
  consolidation completed the absorption — verify the absorbed Today surface, not
  cut 10's file, when ruling C6.
- `SUBJECT_REGISTER_MAP` in `lib/evidence-panes.js` binds subjects to the
  presentation registers (diligence/judgment/synthesis/outreach per
  `docs/architecture/ONTOLOGY_RECONCILIATION_2026-07-01.md` V4).

## Output contract

1. `docs/RUN_B_CANON_RULINGS.md` — one section per C-number: ruling, rationale,
   evidence cites, and the exact default flips (file:line diffs).
2. The default flips themselves, committed on a branch (`canon/run-b-rulings`).
3. Upstream specs (type scale / serif / motion tokens) as a section addressed to
   liminal-creative — NOT edits to the synced mirror.
4. Anything you could not rule without the founder → a short decision-needed list,
   framed as yes/no questions.
