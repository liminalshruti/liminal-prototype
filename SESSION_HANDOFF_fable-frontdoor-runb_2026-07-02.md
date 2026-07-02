# Session handoff — Fable product-design session (2026-07-02)

> For the next session. Written on branch `claude/session-handoff-th499m` (off
> `main`, standalone — kept off the two review PRs so they stay clean).
> Model: claude-opus-4-8. Repo: `liminalshruti/liminal-prototype` (public demo
> surface, GitHub Pages at `liminalshruti.github.io/liminal-prototype`).

---

## TL;DR — current state

- **Two clean, mergeable PRs open against `main`, nothing merged yet:**
  - **#45** — Run-B coherence fixes + E8. Branch `claude/fable-product-design-th499m` (tip `c09220d`). 6 commits, touches cuts/lib only.
  - **#46** — Front-door redesign. Branch `claude/frontdoor-redesign`. 4 commits, 5 files (`index.html`, 3 prototypes, `.gitignore`).
- The two PRs touch **disjoint files** → no conflicts, merge order free. Recommended: **#45 first** (a11y/canon), then **#46** after eyeballing the orbital motion live.
- User was mid-transition to their **local Claude Code** setup to merge/continue. Working tree clean at handoff.
- **No CI** in this repo (`.github/workflows/` absent) — a "pending" status = no checks, not a failure.

---

## What shipped

### PR #45 — Run-B findings turned into code (all CDP-verified)
- **C8 · reduced-motion parity** across cuts 00/03/08/10/11, **plus 2 bugs the audit missed**:
  - cuts 00 & 11: `*{animation:none!important}` + `.reg{opacity:0;animation:rin forwards}` left register reads **stuck invisible** under reduced motion → added `.reg{opacity:1;transform:none}`.
  - `*` doesn't match pseudo-elements → widened to `*,*::before,*::after` (the `.live::before`/`.verifier::before` pulses).
- **C3 · single serif**: off-canon Newsreader (removed catalog-wide in `5b269f7`) → canon Perfectly Nineties (`--serif`). Brand-upgrade opt-out cuts (03/10/`_compare`/surface-nav) now resolve to the canon Georgia fallback. `cuts/thread/` left alone intentionally (deliberate editorial font).
- **C7 · hero `!important`** (cut 01): dropped the 4 gratuitous ones, kept the 3 load-bearing (they answer brand-upgrade's shared defaults). Byte-identical render verified at 1440/1100/800px.
- **cut-02 canon binding**: bound the phantom `--ink-1..9` ramp (canon never defined it) to real canon surface/text tokens.
- **`3dba7dc`** (parallel session): elevated cut-02 provenance-footer legibility + a thread a11y fix. Already in #45.
- **E8 · shell reduced-motion floor** (`cut-shell.css`): new cuts inherit safe motion via the **near-instant pattern** (`animation-duration:.01ms`, `iteration-count:1`) — NOT `animation:none`, so reveals still land visible (avoids the C8 trap).

### PR #46 — Front door redesign
- `index.html` rebuilt from a static 640px card stack → **C-led living-orbital hero + A's hairline catalog**.
- **Bifurcated C1 seal** (this is the canon C1 decision, prototyped): (1) vault artifact appears **instantly**, no transition (finality-as-transaction), then (2) a **separate** core-glow ceremony (stakes-scaled acknowledgment). Verified by polling animation state: beat 1 `phase="sealed · vault", glow=0`; beat 2 `phase="acknowledged", glow=0.5`.
- **3 direction prototypes** kept as reference: `cuts/_explore/frontdoor-{a-elevated,b-cinematic,c-swing}.html`.
- Veracity fixes (index.html + all 3 prototypes).

---

## Key decisions & rationale (so they aren't re-litigated)

- **C-led, not B-led.** B (brand-type-at-scale manifesto) opens on the "inner life" brand sentence then pivots to the category noun — a widen-before-concrete register collision, wrong for a *prototype* front door. B's technique is **reserved for the deck / marketing site**.
- **Bifurcated seal = canon C1.** Record and ceremony are two beats, not one. Don't re-conflate them when wiring into cuts.
- **Veracity (public-surface, ratified):**
  - lead noun → **"local-first control plane for human-AI work"** (Option B), replacing "judgment infrastructure".
  - **"top 16 of 102 finalists (200 teams at start)"** — the bare denominator is banned.
  - **drop the "12" agent count** (3-vs-12 unresolved) → "bounded agents". "four registers" is fine (structural).
  - refusal in the **external worker register** ("ask Diligence"), not the internal "Healer" archetype.
- **Everything was verified in a real headless Chromium (CDP), not eyeballed.** Keep that bar.

---

## Open threads / next steps (prioritized)

1. **Eyeball the front-door orbital MOTION live before final-locking #46.** The state machine + both seal beats are verified in stills; the *feel* of the 8.9s auto-cycle and the ~650ms artifact→glow gap is NOT. This is the one thing stills can't certify.
2. **Merge** #45, then #46 (order free, but this is safest). Both mergeable-clean at handoff.
3. **C1-in-cuts** — wire the bifurcated seal back into the live cuts **00/01/11**. Natural follow-up; the front door only *demonstrates* it. Touches their seal moments → deliberate, reviewable.
4. **C7-full** — claim a named display scale (22 / 28–32 / 36) in `brand-upgrade.css` and de-escalate its shared `.slate-title !important` (touches cut 01 + `embed-slate-tray-demo.html` + `liminal-desktop-specimen.html`). This is a **canon decision** ("lock a scale vs canonize moment-relative sizing"), founder-gated.

### Founder-gated — do NOT touch without an explicit decision (documented in-code)
- **team-drift** (`team-drift/index.html`): forks canon (redefines `--synthesis`/`--outreach` to *stale* values; parallel `--drift/--good/--queued` status palette). Comment marks it a "founder-gated telemetry-choreography sub-register."
- **cuts/thread/** positioning: embodies the superseded diffuse-context framing; uses Newsreader deliberately.

### Dataviz audit result (already done — don't redo)
The shipping cuts' charts are **already** token-driven, CVD-safe (register quad ΔE 43.5), and labeled (not color-alone) — validated with the dataviz skill's `validate_palette.js`. **Guardrail:** canon `--signal` (lime) vs `--watch` (amber) collapse to ΔE 2.9 in deuteranopia → never distinguish those two by color alone (must stay glyph/label-paired). The only real divergences were the two founder-gated items above.

---

## Environment / gotchas (save time next session)

- **No image-generation tool.** `imagegen-frontend-web`/`brandkit` skills need an image model that isn't wired up. Build visual direction as **rendered HTML on the real tokens** and screenshot via CDP — plays to the env's real edge and is more truthful anyway.
- **Chromium**: `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Launch with the Bash tool's `run_in_background:true` (backgrounding inside a compound command dies). Drive via CDP over a `--remote-debugging-port`; Node 22 has a global `WebSocket`.
  - **Deterministic animation capture**: poll DOM state (e.g. `#phase.textContent`, a stop's `stop-opacity`) rather than wall-clock waits — timing drifts with nav/paint/fonts.
  - Long-lived Chromium instances get flaky after many screenshot passes — relaunch fresh if a CDP call hangs.
- **Dev server**: `node server.mjs` (port 5173), zero-dep.
- **`pkill` in a compound Bash command returns exit 144** in this sandbox and aborts the rest of the line — kill/launch in separate calls.
- **Screenshot artifacts**: the **front-door branch's** `.gitignore` ignores `_frontdoor-*.png`; the **designated branch's does NOT** — throwaway PNGs will trip the clean-tree stop hook. Delete them (`rm -f _frontdoor-*.png`) before ending a turn on that branch. `_scratch/` is gitignored; scratch scripts live under the session scratchpad.
- **Brand canon is UPSTREAM, not in this repo**: `~/liminal/founder-brain/meta/SHARED_CONTEXT.md` + `liminal-creative/tokens/`. Visual direction is doable from in-repo `PRODUCT.md` + `design-system/tokens/design-tokens.css` + vendored fonts + the cuts. Bio/positioning **copy** needs the upstream canon — treat front-door copy as visual-placeholder pending it.
- **The git split**: `#45` and `#46` were separated by cherry-picking the front-door commits onto a fresh branch off `main`, then rebuilding the designated branch as Run-B + E8 and force-pushing with lease. Both PRs are diffs vs `main`; if #45 merges first, #46 stays clean (disjoint files).

---

## How to re-verify (commands that worked)

- **Reduced-motion**: CDP `Emulation.setEmulatedMedia` with `prefers-reduced-motion:reduce`, then evaluate computed `.reg` opacity (must be >0) and count elements with `animationName!=='none' && animationDuration>0.05s` (must be 0).
- **Seal bifurcation**: navigate `index.html`, poll `getElementById('phase').textContent` + `getElementById('c1').getAttribute('stop-opacity')`; capture at `sealed · vault`/`0` and `acknowledged`/`0.5`.
- **Link integrity**: `grep -oE 'href="[^"]+"' index.html` → `curl -o /dev/null -w "%{http_code}"` each.
- **Palette**: dataviz skill `scripts/validate_palette.js "<hex,…>" --mode dark` (skill-bundle path under `/tmp/claude-0/bundled-skills/.../dataviz/` — may not persist across sessions; reload the `dataviz` skill).

---

## Session arc (for context)
Cold-read of the repo → discovered the prior "Fable Run-B" design-system audit (`docs/RUN_B_*`, `docs/run-b-critiques/`) → closed its findings in code (C8/C3/C7/cut-02) → validated-audited the dataviz (already sound; one gated fix green-lit: cut-02 ink ramp) → opened #45 + subscribed to watch it → explored 3 front-door directions as rendered HTML → per design review, shipped C-led + A-catalog with the bifurcated C1 seal + veracity fixes → added E8 shell floor → split front-door out into #46 so #45 stays the reviewed Run-B scope.
