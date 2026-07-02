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
