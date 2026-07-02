# Custody Transplant Spec — finishing the 08+09 fold

*2026-07-01 · from the C1 fold attempt's honest failure analysis. The scaffold
(`cuts/custody.html`, maturity: sketch, NO redirects) has the mode toggle, layout,
CSS gates, and per-mode engine configs. What it lacks is the two behavior
transplants. Originals live at `cuts/_archive/pre-consolidation/` (source of truth
for the transplant) AND remain live at their original URLs until this spec executes.*

## Why the first attempt failed
The two cuts are different event loops — 08 is a ~1,080-line manual 5-beat state
machine (localStorage, guard logic, rule-gate, frame-receipt, ~40 element IDs);
09 is a ~320-line kernel-driven auto-advance flow (frozen bundle import, 4→5 beats,
500ms dispo rise, register swap, ~30 IDs). They cannot be merged casually; treat as
surgical transplants, one mode at a time, verified per mode before the next.

## The transplant (per C1's analysis, verified against source)
1. **Defense**: move cut 08's full inline script (archived original lines ~1810-2811)
   into custody.html's defense module block. Reconcile IDs by renaming custody.html
   MARKUP to match the script (script is the fragile part). Gate init on
   mode==='defense'. localStorage key unchanged: `liminal-custody-prototype-v1`.
2. **OSINT**: move cut 09's script (archived lines ~458-775): kernel import
   (`lib/osint-kernel.bundle.js`, READ-ONLY — LIM-1135), doBeat + applyBeat
   integration, REG register swap, vault pill. Dynamic-import kernel on mode
   activation. Gate init on mode==='osint'.
3. **Mode switch = navigation** to `?mode=` (full reload; no double-binding).
4. Only after BOTH modes verify (beat walks per RUN_B brief's per-mode configs):
   convert 08/09 originals to redirect stubs per CUT_CONSOLIDATION_MAP §4.

## Verification gate (no self-reported passes — drive the browser)
Defense: beats 1→5, guard banner, rule-gate blocks, INSTANT receipt, footer
injection, localStorage survives reload. OSINT: kernel computes, visible WHEN/THEN,
re-rank flash, 500ms rise, vault pill seals, register swap. Zero console errors.
