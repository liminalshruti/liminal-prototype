# Master Grammar Upgrade Spec — tray + orbital in the master

*2026-07-01 · the fold map §4 upgrade deferred by the C2 build (correct call:
it risks the spend-native flow). The master (`cuts/11-govern.html`) now has the
subject switch + absorbed Today; this spec adds cut 01's interaction grammar.*

1. **Tray→slate drag**: consume `lib/tray.js` + `lib/slate.js` (the modular
   machinery cut 01 uses via boot.js) rather than reimplementing; the master needs
   the modular hosts (`#tray`, `.slate`, `#register-blocks`) added to its Loop
   surface, then `lib/loop.js`'s CAPTURING beat drives them (host-guards already
   in place — they no-op today precisely because these hosts are absent).
2. **Orbital agent rail**: `EVIDENCE_PANES.pattern.render()` already draws the
   orbital coverage SVG; the upgrade is rendering it in the right rail for ALL
   subjects (agency console), not only as the pattern evidence pane.
3. CSS: the needed vocabulary is in `lib/cut-shell-base.css` (tray inkwell-rail,
   slate canvas) — loaded already via the shim; no new CSS files.
4. Verify against `audit-runb-wall-cut01.png` for grammar parity and the master's
   own baseline for non-regression; beat walk spend end-to-end after.
