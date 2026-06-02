# Cut Quality Audit — 2026-06-01

Method: served this repo on `localhost:5273` (clean instance; an unrelated stale
server was already on 5173), drove each prototype in Playwright at 1440×900,
captured pixels, checked browser console per page, and HEAD-verified every local
asset reference resolves. Live GitHub Pages site confirmed in sync with `main`
at `c8bd29b` (all linked pages 200).

## Verdict: PASS — every cut renders. One real architecture finding (F8) needs a call.

All 11 cuts + index rendered in a real browser (not HTTP-200 stamps). No broken
pages, no missing local assets, no content-breaking console errors. F7 (claimed
local "reload loop") was a FALSE ALARM — caused by the audit's own screenshot
writes into the watched repo root, not by any cut. The onboarding set (04–07)
does carry one real concern: it depends on an external CDN to render (F8).

## Surfaces audited (render = actual pixels observed)

| Cut | Render | Console | Assets | Notes |
|-----|--------|---------|--------|-------|
| `index.html` (menu) | ✅ | clean | ✅ | Newsreader/Geist, NOT brand stack (F3) |
| `cuts/00-hero-demo.html` | ✅ | clean | ✅ | Workspace engine; stage h-scrollbar (F2) |
| `cuts/01-slate-tray.html` (canon front door) | ✅ | clean | ✅ | Richest cut; NOT linked from menu (F1) |
| `cuts/01-slate-tray-speedrun.html` (menu "primary") | ✅ | clean | ✅ | Initial scroll parks in dark gap (F4) |
| `cuts/02-forensic-agent.html` | ✅ | clean | ✅ | Rendered; contradiction-diligence loop intact |
| `cuts/03-calibration.html` | ✅ | clean | ✅ | Heatmap; very low-contrast resting state (F9) |
| `cuts/08-liminal-custody.html` | ✅ | clean | ✅ | NatSec register intact |
| `cuts/04-onboarding.html` | ✅ (live) | benign 404s | ✅ | React/Babel canvas; CDN-dependent (F8); F7 was false alarm |
| `cuts/05-onboarding-argument.html` | ✅ (live) | clean | ✅ | Essay+redline; no design-canvas.jsx |
| `cuts/06-onboarding-compare.html` | ✅ (live) | benign 404s | ✅ | Canvas compare view |
| `cuts/07-onboarding-radical.html` | ✅ (live) | benign 404s | ✅ | Narrative first-read frame |
| `embed-slate-tray-demo.html` | ✅ | clean | ✅ | "Maya" contact refs (F5) |
| `embed-vault-demo.html` | ✅ | clean | ✅ | 4-loop layout; nav timeout = dev artifact (F6) |
| `index-agenthansa-frozen.html` | ✅ | clean | ✅ | Same engine as 00; stage h-scrollbar |
| `design-system.html` | — | — | ✅ | Asset refs clean (not pixel-rendered) |

## Findings (none block partner sends; all are polish/consistency)

**F1 — Menu links the wrong "front door."** `FRONT_DOOR_DECISION_2026-05-12.md`
and README name `cuts/01-slate-tray.html` as THE canonical front door, but
`index.html` links `cuts/01-slate-tray-speedrun.html` as the "primary demo."
The canonical cut is live and reachable but absent from the menu. Decision
needed: update the menu, or update the decision doc.

**F2 — Horizontal scrollbar on the stage** in all workspace cuts (00, 07, faint
on 01). A few-px overflow in the center column. Minor but shows on every
founder-facing workspace render at 1440px.
> **RESOLVED 2026-06-02 — not a defect.** Doc-level horizontal overflow = 0.
> The only h-scroll is the intentional 1920px `.wrap` artboard viewed in a
> sub-1920 window (the cut format). The `mystic-margin` aside is a designed,
> correctly-rendering marginalia note, not overflow. Won't-fix (fixing = change
> the artboard format). Evidence: audit-f2-cut00-1440.png. (00/agenthansa now
> in cuts/_archive/ per the consolidation refactor.)

**F3 — Index is off-canon type.** The menu uses Newsreader + Geist, not the
LOCKED brand stack (Nineties Headliner + Perfectly Nineties + Geist Mono). The
cuts themselves load the real brand fonts via `brand-upgrade.css`. The *menu* —
the literal front door of the live link — is the one surface not on brand type.

**F4 — Speedrun cut's initial scroll** parks the viewport in a dark gap between
hero and workspace on load; a first-time visitor sees near-black + scrollbar for
a beat. Not broken, but an awkward first frame.
> **RESOLVED 2026-06-02 — not a defect.** The "dark beat" is the canon
> `body{opacity:0}→.ready` initial-paint suppression — the same mechanism the
> verified-clean front door uses, at identical source positions. `.ready` fires
> (opacity→1), page never strands black; resting first frame is the centered
> brand hero. Last turn's bad frame was a screenshot taken mid-reveal during the
> live-reload loop. Won't-fix. (speedrun cut now in cuts/_archive/; its hero
> framing folded into 01-slate-tray as a register toggle.)

**F5 — "Maya" vs "Maia."** The Maya→Maia rename (commit #12) renamed the
*protagonist*. Surviving "Maya" instances (00, both embeds, agenthansa, hack)
refer to a *contact/counterparty* ("Coffee with Maya", "deck I can show
Saanvi"). Likely intentional (two distinct names), but near-homograph with the
renamed protagonist = confusion risk. Needs a human call, not a blind replace.

**F6 — embed-vault nav timeout is a dev-server artifact, NOT a page bug.**
`server.mjs` injects an open `EventSource('/__reload')` that delays Playwright's
`load` event. The live Pages site has no reload script, so real visitors never
hit this. Page renders perfectly once snapshot.

**F7 — FALSE ALARM (audit-methodology artifact, NOT a page or page-load bug).**
The original report claimed cuts 04–07 "infinite-reload / strobe" under
`npm run dev`. That is WRONG and is corrected here. Reproduced clean: with a
fresh server and NO file writes, loading cut 04 three times over 6s produced
**zero** reloads. The 440 reloads originally observed were caused by **the audit
itself** — Playwright writing `audit-*.png` screenshots into the watched repo
root in a tight loop. `server.mjs` watches `.png` at root **by design** (per the
README and the server's own comment), so each screenshot correctly fired a
reload, and screenshots were being taken continuously. The `design-canvas.jsx`
component is well-behaved: it `fetch()`es the sidecar once, `.catch()`es the 404
silently, never calls `location.reload()`, and writes only via a non-existent
`window.omelette` bridge (so it never writes in a plain browser). A normal viewer
running `npm run dev` to show an onboarding cut writes nothing and sees no loop.
**Nothing to fix in the page or the page-load path.** Mitigation applied for the
audit case only: `.playwright-mcp/` and `audit-*.png` added to `.gitignore` so
screenshot writes don't pollute commits — this does NOT change documented watcher
behavior. Any further dev-server change (e.g. ignoring `.DS_Store`) is unrequested
scope, left to founder's call.

**F8 — Onboarding cuts (04–07) break the repo's "no build step" contract.** Every
other cut is dependency-free vanilla HTML/CSS/JS (README: "single self-contained
file, no build step"). 04–07 load React 18 + ReactDOM + @babel/standalone from
**unpkg.com** at runtime and compile JSX in-browser (Babel warns: "precompile
for production"). If unpkg is unreachable/blocked, these four show nothing. They
are the only CDN-dependent, build-requiring surfaces in the catalog. Note: none
are linked from the menu, so blast radius is limited to direct-URL visitors.

## Drift gap (from earlier orientation, confirmed)

Menu links 6; repo has more live cuts (02 forensic, 03 calibration, 04–07
onboarding, design-system.html) reachable by URL but not discoverable.

**F9 — Calibration (03) resting state is near-invisible.** The 12×4 heatmap cells
barely separate from the near-black background until clicked (hint: "Click a
cell to see the pattern"). Likely intentional (intensity on interaction), but the
static first frame a partner sees reads as an empty grid. Same family as F4.
> **FIXED 2026-06-02.** Root cause: intensity ladder mixed `--cell-bg` (a ~6%
> alpha wash) with `--paper`, so filled cells landed ~1.5–4.5% above near-black.
> Fix: composite the FULL register accent (`--cell-accent`) with `--paper` at
> 14/28/46% + matching borders. Grid now reads as a populated heatmap at rest;
> per-register hue + intensity ordering preserved; no canon token redefined
> (CONTRIBUTING rule #1). Evidence: audit-f9-calibration-after.png.

## NOT verified
- Animation *completion*: workspace cuts (00, agenthansa) advertise an "18-second
  loop" ending in "NOT READY, 2 fixes, vault sealed." I captured opening frames
  (~4s in), not the advertised payoff. A cut that stalls mid-sequence would pass
  this audit and fail live. Worth a dedicated run-to-completion pass.
- `design-system.html`: asset-checked only, not pixel-rendered.

Screenshots: `audit-00`…`audit-13*.png` in repo root.
