# Loop Consolidation Design — Executive Summary

**Status:** Design document (not implementation)  
**Scope:** Full consolidation of 8 loop-bearing cuts (00, 01, 02, 06, 08, 09, 10, 11) onto one parameterized engine  
**Timeline:** 4 weeks (Phase A proof + Phase B ports in parallel + Phase C fold)  
**Key principle:** Reuse existing lib/ modules; parametrize divergences without resolving them  

---

## What This Is

This design answers 6 foundational questions about how to consolidate the prototype's scattered loop implementations into one coherent engine:

1. **Loop-engine contract** — what does the state machine look like, what does it export, how do cuts call it?
2. **Port strategy** — which cuts go first, why, and in what order?
3. **CSS architecture** — how to split cut-shell.css (2,775 lines) into modular, reusable layers?
4. **Execution plan** — what runs in parallel, what serializes, which branches?
5. **Verification** — how do we know it works (render wall + beat walks)?
6. **Risk mitigation** — the top 5 ways this breaks, and how to prevent each.

The design does **not** propose new features or resolve the 9 contradictions in `RUN_B_COHERENCE_FINDINGS.md` — those are for Run-B to adjudicate. Instead, it **parameterizes them** so Run-B can decide later without triggering a re-port.

---

## The Core Architecture (One Page)

### The Loop Engine: `lib/loop.js`

A state machine with one method:

```javascript
// One beat sequence: IDLE → CAPTURING → READING → DECIDING → SEALING → ENTERING → IDLE
export function applyBeat(beat) { /* dispatch to handlers */ }

export function initLoopEngine({
  subject,      // spend | custody | osint | notice | pattern
  persona,      // Maia | Sam | Rhea | Hollis | analyst
  tier,         // founder | IC | manager | exec | L3
  
  // Choreography parameters (from RUN_B divergences, not resolved)
  sealChoreography,    // instant | rise | bifurcated (C1: no consensus yet)
  correctionModel,     // gloss-layer | rule-gate | visible-clause (C4)
  refusalFlavor,       // system | agent | routing (C5)
  refusalTiming,       // 200ms | 320ms (C5)
  motionTier,          // ambient | refined | both (C9)
  
  // Hooks for cuts to react to beats
  onBeatChange,
  onSealed,
}) { }
```

**This is NOT a rewrite.** It calls into existing modules:
- `state.js` — read/write active subject, slated tiles, vault count
- `slate.js` — render evidence pane, wire citations, show disposition
- `agency.js` — tick agent readers, manage register state
- `vault-store.js` — persist sealed decisions
- `keyboard.js` — keyboard shortcuts

### Evidence Panes: `lib/evidence-panes.js`

Each subject has a visual:
- **spend:** OKR allocation bar + agent-fit cost-swap (from cut 11)
- **custody:** geographic map + marker rings (cut 08) OR layered reads + hypothesis bar (cut 09) — togglable
- **notice:** dense 24-row audit trail (cut 02)
- **osint:** same as custody-osint mode; subject is separate because it uses the frozen kernel
- **pattern:** orbital coverage viz (from cut 00)

All live in `EVIDENCE_PANES = { spend, custody, notice, osint, pattern }`. When the user clicks a subject button, the engine calls the right renderer.

### CSS Split: Three Modular Files

Current single 2,775-line file becomes:

| File | Lines | Content | Scope |
|---|---|---|---|
| `cut-shell-base.css` | 1,200 | Frame chrome, 3-pane layout, slate/tray/audit/brief vocabulary | **ALL 35+ surfaces** |
| `cut-shell-registers.css` | 850 | Register plate styling, refusal glyph, citation links, register colors | **ALL surfaces** |
| `cut-shell-products.css` | 725 | Business classification, OSINT hypothesis bar, per-subject titlebar, density | **Only surfaces using these features** |

Load order: base → registers → products (no file shadows earlier file via specificity).

---

## Ports in Order (Proof-First)

### Phase A: Prove It (Cut 01 as Model)

1. **Create lib/loop.js** skeleton (state machine + dispatch)
2. **Refactor cut 01** to call `loop.applyBeat(beat)` instead of inline dispatch
3. **Create lib/evidence-panes.js** with stub renderers
4. **Render test:** cut 01 refactored should match baseline PNG (no visual change, only JS refactor)
5. **Merge to main** → Phase B unblocked

**Effort:** 1–2 weeks, one developer, proves the contract works.

### Phase B: Ports in Parallel (3 Worktrees)

Once Phase A is merged, spin up three parallel branches:

**Branch 1 (11 + 08 + 09 + 00):**
- Port cut 11 (spend evidence pane)
- Port cut 08 (custody defense mode)
- Port cut 09 (osint subject + custody osint mode)
- Refactor cut 00 to consume engine, delete inline subject-switch logic

**Branch 2 (02 + 06 + 10):**
- Port cut 02 as notice evidence pane
- Port cut 06 as correction-model variant
- Port cut 10 as re-entry beat handler

**Branch 3 (CSS split, parallel):**
- Extract cut-shell.css → 3 files
- Render test all 35+ surfaces (no visual change expected)
- Merge independently when ready

All three branches merge to main daily (if possible). Total: 1–2 weeks.

### Phase C: Fold & Consolidate

Merge cuts/08 + 09 → one `custody.html` with mode toggle.  
Archive originals to `cuts/_archive/pre-consolidation/`.  
Update `cuts/cut-manifests.json`.  

**Effort:** 1 week.

**Total timeline:** 4 weeks (A serial, B + CSS parallel, C serial).

---

## Verification: Render Wall + Beat Walks

**Before consolidation starts:**
```bash
npm run dev &
# Capture baseline: all 13 surfaces at 1440px → audit-runb-wall-baseline.png
```

**After each phase:**
1. **Render test:** port cut vs original PNG at 1440px (pixel-perfect match expected)
2. **Beat walk:** navigate through CAPTURE → READ → DECIDE → SEAL → ENTER, verify beats fire correctly
3. **If diff found:** debug via DevTools, document if intentional (per Run-B decision)

**Final verification (Phase C):**
- Render wall: all 13 surfaces vs pre-consolidation baseline
- Beat walk matrix (Playwright): all 5 subjects × all beat sequences
- Definition of done: render parity + beat sequences pass + code organized (no more inline loops in cuts)

---

## Risk Register (Top 5)

| Risk | Mitigation |
|---|---|
| **CSS split cascade shadow** — a rule in one file accidentally wins specificity, breaking 35+ surfaces | Use CSS comment markers per file; load in strict order; render-test all surfaces; use DevTools cascade inspector if diff found |
| **Choreography default misses cut's original feel** — e.g., cut 08's instant seal becomes "rise" by default | Extract per-cut choreography params before porting; wire defaults to match original; verify vs baseline PNG |
| **Evidence pane renderer breaks citation wiring** — clicking a cite doesn't light the tile | Evidence panes call `slate.js` internals; test each with a beat walk; document override in comments |
| **Frozen osint-kernel.bundle.js breaks** — kernel compute drifts during port | Treat as read-only; verify loads in browser console before porting; re-test on any future kernel rebuild |
| **Subject switch doesn't re-render evidence pane** — user clicks "spend" → "custody" but pane doesn't swap | Wire button click to `loop.initLoopEngine({subject: new_subject})` + render; test in beat-walk script; verify state.js + loop.js sync |

---

## Implementation Checklist (Per Phase)

### Phase A
- [ ] Create lib/loop.js (300 lines)
- [ ] Extract beat sequence from cut 01 inline JS
- [ ] Refactor cut 01 to call `loop.applyBeat(beat)`
- [ ] Create lib/evidence-panes.js stubs (all 5 subjects)
- [ ] Render test cut 01 refactored vs baseline PNG
- [ ] Merge to main

### Phase B.1 (Parallel)
- [ ] Port cut 11 → spend evidence pane
- [ ] Port cut 08 → custody defense mode
- [ ] Port cut 09 → osint subject + custody osint mode
- [ ] Refactor cut 00 to consume engine
- [ ] Render test each; beat walk each
- [ ] Commit daily; merge to main

### Phase B.2 (Parallel)
- [ ] Port cut 02 → notice evidence pane
- [ ] Port cut 06 → correction model
- [ ] Port cut 10 → re-entry beat handler
- [ ] Render test each; beat walk each
- [ ] Merge to main

### Phase B.3 (Parallel)
- [ ] Extract cut-shell.css → 3 files
- [ ] Render test all 35+ surfaces
- [ ] Merge to main

### Phase C
- [ ] Merge cuts/08 + 09 → custody.html with mode toggle
- [ ] Archive originals to cuts/_archive/
- [ ] Update cuts/cut-manifests.json
- [ ] Full render wall test (13 surfaces)
- [ ] Beat walk matrix (Playwright)
- [ ] Final PR to main

---

## Questions for the Founder

Before kicking off, clarify:

1. **C1 Seal choreography:** Should the engine default to "preserve per-cut behavior" (cut 00/08 = instant, cut 01/06 = rise, cut 09 = 500ms) or pick one canonical timing?

2. **C3 Serif identity:** All cuts to Perfectly Nineties, or preserve Newsreader where it's hardcoded?

3. **Custody mode toggle:** Button in subject bar, dropdown in pane header, or both?

4. **Final cut structure:** All subjects in agency-master.html (true consolidation), or separate custody.html + agency-master.html (two-cut model)?

5. **Onboarding (cut 04):** In-scope for the engine, or stays separate? If separate, should finish button call `loop.initLoopEngine()`?

---

## Next Steps

1. **Review this design.** Does the architecture make sense? Any concerns?
2. **Clarify the 5 questions** above (founder decision).
3. **Kick off Phase A** (one developer, 2 weeks).
4. **Once Phase A merges, unblock Phase B** (3 parallel branches, 2 weeks).
5. **Phase C after Phase B merges** (1 week).

---

*Design authored 2026-07-01. Implementation ready when founder approves.*

---

## ADJUDICATED ADDENDUM (2026-07-01, governs where this doc conflicts)

This design was authored before `docs/CUT_CONSOLIDATION_MAP.md`; the map is the
binding authority for targets. Corrections and answers:

1. **Master surface = generalized cut 11** (map §1, per the founder-brain fold map) —
   NOT an ambiguous "agency-master" and NOT cut 00. Cut 00's SUBJECTS mechanism moves
   into lib/loop.js; the 00 file archives behind a redirect after absorption.
2. **The five "Questions for the Founder" are answered** (plan of record):
   Q1 seal → preserve per-cut behavior as parameter defaults (Run-B flips later).
   Q2 serif → untouched; Run-B's C3 call; ports must not change rendered fonts.
   Q3 custody toggle → cut 09's existing register-swap pattern; no new UI paradigm.
   Q4 structure → master (generalized 11) + custody.html, per the fold map.
   Q5 onboarding (04) → out of engine scope (pre-loop, per the map's ruling).
3. **Cut 10 is not "ported"** — the fold map records it as already absorbed into 11's
   Today surface; the work is parity-verify then archive + redirect (map §2, §4).
4. **Timeline** — phases execute agentically in-session (Phase A gate → B1/B2/B3
   parallel worktrees → C fold), not the 4-week human cadence written above.
5. **Archive discipline** — archived cuts become thin redirects (map §4), zero broken
   links for index.html/_demo-lan/external URLs.
