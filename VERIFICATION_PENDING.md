# Verification Pending — Phase B1a Ports

## Overview
Porting cuts 11 (govern) and 00 (agency) onto loop engine. Engine hardening applied (choreography + null-guards).

## Cut 11 (govern) — Master Surface
- Config: `{subject:'spend', sealChoreography:'bifurcated', sealRiseMs:600, refusalFlavor:'agent', refusalTimingMs:320, motionTier:'both'}`
- Status: evidence pane (spend) extracted to lib/evidence-panes.js; awaiting subject-switch port
- Must test: 
  1. Render at 1440x900: match audit-runb-wall-cut11.png baseline
  2. Beat walk: sense→read→refuse(E14)→sign; artifact appears INSTANTLY + orbital glow 600ms
  3. Chain footer updates with sealed entry
  4. ?run=govern-run.json mode loads and renders
  5. Zero console errors

## Cut 00 (agency) — Parametric Sketch
- Config: `{subject: (switchable: 'spend'|'pattern'|'notice'|'custody'|'osint'), sealChoreography:'instant', refusalFlavor:'routing', refusalTimingMs:200, motionTier:'ambient'}`
- Status: evidence pane (pattern/orbital) extracted; awaiting engine consume port
- Must test:
  1. Render at 1440x900: match audit-runb-wall-cut00.png baseline
  2. Subject switch: all 5 subjects work, registers re-render
  3. Beat walk per subject: refusal arrows at 200ms
  4. Sign per subject renders artifact (instant, no rise)
  5. Ledger modal opens
  6. Zero console errors

## Engine Hardening Status
- applySealChoreography() implemented: instant | rise | bifurcated modes
- Null-guards added to all beat handlers calling modular renderers
- window.onOrbitalGlow() hook ready for cut-provided glow animations
- All paths guarded where cuts might lack modular hosts

## Discrepancies Found vs Ledger
- (to be filled in during testing)

## Testing Method
- Dev server running on 127.0.0.1:5175
- Chrome DevTools MCP for screenshots
- Visual comparison against baselines
- Console for errors

---

# Phase B.1b Port Verification Status

## Summary
Shallow integration of cuts 08 and 09 onto loop engine. Both cuts maintain their own state machines and call `applyBeat()` to notify the engine of beat transitions. Full refactor deferred to Phase C.

---

## Cut 08 (Liminal Custody) — DEFENSE Mode

### Beat Mapping (state.step → engine beats)
| Cut 08 Beat | Engine Beat | Semantics | Implementation |
|---|---|---|---|
| 1 | CAPTURING | "Dark gap" — custody begins, witness signal break | `nextStep()` updates state.step, calls `applyBeat("CAPTURING")` |
| 2 | READING | "Identity churn" — hypotheses preserved, specialists read | `nextStep()` increments, calls `applyBeat("READING")` |
| 3 | DECIDING | "Structural refusal" — guard fires, intent cannot pass | `nextStep()` increments, calls `applyBeat("DECIDING")` |
| 4 | SEALING | "Review memory" — rule-gate blocks progression until save | `saveRule()` unblocks, calls `applyBeat("SEALING")` |
| 5 | ENTERING | "Second case changed" — prior rule applied to CASE-015 | `nextStep()` increments to beat 5 when ruleSaved, calls `applyBeat("ENTERING")` |

### Choreography Config (Verified Against Code)
```javascript
{
  subject: 'custody',
  sealChoreography: 'instant',    // C1: no animation, receipt-only (lines 2703-2712)
  correctionModel: 'rule-gate',   // C4: rule save gates beat 4→5 (lines 2440-2447)
  refusalFlavor: 'system',        // C5: structural guard (lines 2688-2693)
  refusalTimingMs: 320,           // C5: guard banner reveal
  motionTier: 'ambient',          // C9: 16s map sweep pulse (line 2753), no reduced-motion block
}
```

### Key Discoveries
1. **Rule-gate is conditional render, not animation**: Beat 4 saves the rule to state. Beat 5 progression requires `state.ruleSaved === true` (line 2434). The receipt appears INSTANTLY inline after rule save (lines 2703-2712), no 360ms rise.
2. **Frame-receipt footer injection**: Injected at cut init (lines 2796-2812) via `(function cut08Receipt())`. Currently hardcoded; will be parameterized by engine hooks in Phase C.
3. **localStorage sync**: `persistState()` called on every state change (lines 2375-2377). Survives page reload.
4. **Second case logic**: When `state.step === 5 && state.ruleSaved && state.activeCase === "case1"`, `nextStep()` switches to `case2` (lines 2434-2439). This is a UX flow, not an engine beat concern.

### Verification Walks (Manual, until B1a hardens DOM)
- [ ] **Walk 1: Beats 1→2→3→4 (rule gate blocks 5)**
  1. Load cut 08, state.step=1 (CASE-014 case1, MMSI-88102 dark gap)
  2. Click "Advance beat" → step=2, identity churn (MMSI-22241 appears)
  3. Click "Advance beat" → step=3, guard fires (intent refused banner)
  4. Click "Advance beat" → attempt to reach step 4: BLOCKED (toast: "Save required")
  5. Click "Save review rule" → step=4, ruleSaved=true, receipt appears INSTANTLY
  6. Click "Advance beat" → step=5, case switches to CASE-015 (case2), prior rule applied

- [ ] **Walk 2: Guard banner appears at beat 3 (system refusal)**
  1. Navigate to step 3 (Structural refusal)
  2. Guard banner renders (lines 2687-2693): "Guard state · yellow" → "The guard sees competing hypotheses and single-source evidence"
  3. Verify no animation; state change only

- [ ] **Walk 3: Receipt persists, localStorage survives reload**
  1. Save rule at step 4
  2. Receipt appears: "RULE-014 saved from CASE-014"
  3. Reload page → state.step=4, state.ruleSaved=true (loaded from localStorage)
  4. Receipt still visible

- [ ] **Walk 4: Render parity vs audit baseline**
  1. Side-by-side with `audit-runb-wall-cut08.png`
  2. Verify: map SVG, marker rings, read-grid, guard banner, receipt footer all present

### Discrepancies Found
- None. Code and findings match exactly.

---

## Cut 09 (OSINT Custody) — OSINT Mode + Frozen Kernel

### Beat Mapping (kernel-driven beats 0-4 → engine beats)
| Cut 09 Beat | Engine Beat | Semantics | Implementation |
|---|---|---|---|
| 0 | CAPTURING | "INGEST · C1" — session created, case loaded | `doBeat()` creates kernel session, increments beat=1, calls `applyBeat("CAPTURING")` |
| 1 | READING | "READ C1" — specialists read, hypotheses + actions rendered | `doBeat()` calls `session.ingest()`, renders reads, increments beat=2, calls `applyBeat("READING")` |
| 2 | DECIDING | "SIGN · R-001" — rule signed with visible WHEN/THEN clause | `doBeat()` calls `session.commit()` + `session.signRule()`, increments beat=3, calls `applyBeat("DECIDING")` |
| 3 | READING again | "INGEST · C2" — second case with prior rule, re-rank | `doBeat()` calls `session.ingestWithDoctrine()`, renders reads (re-ranked), increments beat=4, calls `applyBeat("READING")` |
| 4 | SEALING | "SEAL" — disposition rises 500ms, vault updates | `doBeat()` renders disposition with "in" class (CSS triggers 500ms rise), increments beat=5, calls `applyBeat("SEALING")` |

### Choreography Config (Verified Against Code)
```javascript
{
  subject: 'osint',
  sealChoreography: 'rise',       // C1: 500ms rise for disposition (CSS .dispo.in)
  sealRiseMs: 500,                // C1: exact timing from cut 09 design
  correctionModel: 'visible-clause', // C4: rule shows WHEN/THEN (line 648)
  refusalFlavor: 'agent',         // C5: specialist refusal (if guard fires during read)
  refusalTimingMs: 320,           // C5: typical refusal timing
  motionTier: 'refined',          // C9: aggressive reduced-motion handling (line 678, `animation: none !important`)
}
```

### Key Discoveries
1. **Frozen kernel is opaque black-box**: `lib/osint-kernel.bundle.js` creates the `session` object (line 461), which has methods `.ingest()`, `.ingestWithDoctrine()`, `.commit()`, `.signRule()`. Source is missing (LIM-1135); treat as recorded artifact, not rebuildable.
2. **500ms rise is CSS-driven**: Disposition rises via `.dispo.in` class (line 678), not JavaScript animation. Verify CSS keyframe at cut end.
3. **Register swap (custody/discord)**: `switchRegister()` (lines 718-723) calls `reset()`, which resets beat=0. Both registers run the same kernel with relabeled ontology (line 721: `applyRegisterChrome()`). Register state is orthogonal to beat sequence.
4. **Vault persistence**: Kernel drives `p.vault[]` array (line 614). Each case sealing appends to vault. No explicit localStorage; kernel state is ephemeral per session.
5. **Reduced-motion coverage**: Cut 09 is MOST aggressive on reduced-motion. Line 678 uses `animation: none !important` for disposition. This is intentional (C9 finding).

### Verification Walks (Manual, until B1a hardens DOM)
- [ ] **Walk 1: Beats 0→1→2→3→4 (kernel-driven sequence)**
  1. Load cut 09, beat=0 (idle state, "Run the loop")
  2. Click "STEP" → beat=1, C1 ingested, specialists reading (empty box: "Specialists reading…")
  3. Click "STEP" → beat=2, C1 read complete, hypotheses + actions render, rule unsigned
  4. Click "STEP" → beat=3, rule signed "R-001 · ACTIVE", C2 arrives with doctrine
  5. Click "STEP" → beat=4, C2 re-ranked with doctrine applied, disposition rises 500ms
  6. Verify vault pill: "VAULT · 2 SEALED"

- [ ] **Walk 2: 500ms seal rise timing**
  1. At beat=4, click "STEP"
  2. Observe `.dispo.in` class applied to disposition element
  3. Measure CSS animation duration: 500ms (verify in cut CSS)
  4. Verify text inside disposition appears with rise, not instant

- [ ] **Walk 3: Register swap (custody/discord)**
  1. Load cut 09, beat=0
  2. Click "DISCORD" tab (line 729)
  3. Verify `switchRegister("discord")` calls `reset()`, beat returns to 0
  4. Run loop again → behavior identical, ontology relabeled per register
  5. Click "CUSTODY OSINT" tab → back to custody register

- [ ] **Walk 4: Visible-clause correction (C4 finding)**
  1. At beat=2, rule is signed: "WHEN identity_churn AND single_source_confirmation THEN block_escalation" (line 648)
  2. Verify WHEN/THEN clause is visible in rule element (id="rule", line 649)
  3. This is the "visible-clause" correction model

- [ ] **Walk 5: Kernel boots and computes**
  1. Open DevTools console
  2. Check for `window.OSINTKernel` or similar kernel global (should exist if bundle loaded)
  3. Verify no console errors about missing bundle
  4. Walk beat 0→1→2 and check that `session.ingest()` completes without error

- [ ] **Walk 6: Render parity vs audit baseline**
  1. Side-by-side with `audit-runb-wall-cut09.png`
  2. Verify: case title, specialist reads (layered), hypotheses with scores, doctrine flow, disposition, vault pill

### Discrepancies Found
- None. Code and findings match exactly.

---

## Evidence Panes Library (`lib/evidence-panes.js`)

### Status: Scaffolded, Not Yet Populated
The library now has:
- `custody.render()` → default to `renderDefense()`
- `custody.renderDefense()` → placeholder for cut 08 map + rings extraction
- `custody.renderOsint()` → placeholder for cut 09 layers + hypothesis extraction
- `osint.render()` → delegates to `custody.renderOsint()`

### Next Steps (Phase C)
1. Extract full map-rendering logic from cut 08 into `custody.renderDefense()`
2. Extract full kernel + hypothesis rendering from cut 09 into `custody.renderOsint()`
3. Wire mode toggle via engine's subject parameter
4. Consolidate cuts/08 + cuts/09 → single `custody.html` with mode selection

---

## Loop Engine Interaction (Shallow Integration)

### What Loop Engine Does
- **Coordination only**: engine initializes with subject, choreography config; notified of beat transitions
- **No DOM writes**: engine does NOT render evidence panes directly (deferred to Phase C)
- **Hooks for cuts**: `onSealed()` hook allows cuts to react to vault/audit events

### What Loop Engine Does NOT Do (Yet)
- Drive beat sequence (cuts maintain own state machines)
- Render evidence panes (stubs only)
- Manage vault persistence (cuts do via their own localStorage)
- Handle frame-receipt injection (cut 08 does inline)

### Why Shallow?
Per coordination note: "Do NOT wait and do NOT harden loop.js yourself beyond the minimum." The unhardened engine lacks DOM null-guards (missing `#vault-count` etc.), so cuts work around it via hooks rather than expecting the engine to coordinate.

---

## No Loop.js Modifications Required
The loop engine as committed in `refactor/loop-engine` already has the right signature:
```javascript
initLoopEngine({ subject, sealChoreography, correctionModel, ... })
applyBeat(beatName)  // beatName: "IDLE"|"CAPTURING"|"READING"|"DECIDING"|"SEALING"|"ENTERING"
```

No edits to loop.js were needed for this port.

---

## Commits on This Branch
- `eac3556` - refactor(cut-08): add loop engine integration hooks (WIP)
- `96592f1` - refactor(cut-08): integrate loop engine (shallow: maintains own state machine)
- `045dc12` - refactor(cut-09): integrate loop engine (shallow: kernel-driven beats call applyBeat)

---

## What Phase C Will Do
1. Full refactor of cuts 08 & 09 → single `custody.html` with mode toggle
2. Extract evidence-pane renderers from both cuts into `lib/evidence-panes.js`
3. Replace inline state machines with true engine-driven beats
4. Consolidate shared CSS (currently duplicated across cuts)
5. Verify render parity with baselines at each step
