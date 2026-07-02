# RUN_B_CUTS_INVENTORY — prototype cuts fact sheet (producer pass)

> **What this is.** Read-only INVENTORY of the liminal-prototype cut surfaces, produced
> 2026-07-01 as the substrate for the Fable Run-B adjudicator pass (which infers the desktop
> canonical design system FROM this doc). This is a FACT SHEET: extraction + citation only.
> It contains no design inference, no recommendations. Every claim cites a file:line or an
> `audit-*.png` screenshot at repo root (screenshots are gitignored working artifacts —
> re-render the cut if an image is missing).
>
> **Method.** Five parallel extraction passes over `cuts/*.html` + `index.html` + the demo
> shells, each reading full HTML source plus matching audit screenshots. Facts grouped per
> cut: Visual facts / Interaction facts / Design-system usage / Feel-grammar note.

## Shared substrate (facts common to all cuts)

The cuts sit on a three-layer CSS cascade, declared in the files' own headers:

- **`design-system/tokens/design-tokens.css`** (1307 lines) — self-described "Liminal canon ·
  single source of truth"; header contract: every surface imports this file and only this
  file for color/type/spacing/motion; consumers add typography overrides + layout but never
  redefine tokens (design-tokens.css:1-45). Version line: canonical upstream at
  `liminal-creative/tokens/design-tokens.css`, 2026-06-11, with §18 PRODUCT SEMANTICS
  (desktop tray-loop layer) and §19 APP SCALE (second spacing/type scale, `--*-app-*`)
  (design-tokens.css:29-37).
- **`lib/cut-shell.css`** (2775 lines) — the shared desktop-app shell: register-coded
  `:root` tokens (`--diligence`/`--synthesis`/`--judgment`/`--outreach`), macOS-style frame
  chrome + titlebar + traffic lights, three-pane layout (left rail / slate / right rail
  agency), tray inkwell-rail + drag-and-drop choreography, disposition paper-card, audit
  ribbon, classification banner, marginalia (Caveat), staged boot animations,
  prefers-reduced-motion respected (cut-shell.css:1-33). Consumption order is documented:
  design-tokens.css first, cut-shell.css second, per-cut overrides after
  (cut-shell.css:19-27). A "CASCADE BRIDGE" block binds prototype tokens to canon via
  `var(--canon-name, fallback)` so canon wins when imported (cut-shell.css:40-50).
- **Per-cut inline `<style>`** — surface-specific layout/overrides (see each cut's
  Design-system usage section).

Type stack as declared in the shell: `--display: "Nineties Headliner", "Perfectly
Nineties", …`, `--serif: "Perfectly Nineties", …`, `--mono: "Geist Mono", …`
(cut-shell.css:123-126), with a comment at cut-shell.css:119 naming Newsreader "an off-canon
fork" (removed catalog-wide in commit `5b269f7`). Residual Newsreader references still
present as fallbacks in `lib/surface-nav.css:43`, `cuts/_console.html:53,64,122`,
`cuts/_compare.html:67`, `cuts/_template.html:44` (font `<link>`), and as live hardcodes in
`cuts/03-calibration.html:129,444` (plus its font `<link>` at line 41). Recorded as fact,
not judged.

Shared JS machinery in `lib/`: `boot.js` (633 lines), `slate.js` (818), `tray.js` (146),
`state.js` (138), `vault-store.js` (277), `agency.js` (221), `marginalia.js` (138),
`keyboard.js` (148), `surface-nav.js` (161), `previews.js` (482), `osint-kernel.bundle.js`
(1012, frozen bundle — source `liminal-test/src/browser.ts` missing per
cuts/09-osint-custody.html:35-40 comment, tracked LIM-1135), plus `demo-calm.css/js` (the
presentation "calm mode") and `brand-upgrade.css/js`.

Product-model frame (recorded from the repo's own doc, not inferred here):
`cuts/TAXONOMY.md` declares one substrate, many cuts — "Same loop — capture → read → decide
→ record — pointed at a [subject] first", and states cut 00's `SUBJECTS = {spend, custody,
osint, notice, pattern}` object is "the invariant made flesh" (TAXONOMY.md, "The model" §).

**Coverage note.** Sections below cover: cuts 00, 01, 02, 03, 04 (+`cuts/onboarding/`
support files), 05, 06, 08, 09, 10, 11 (+`govern-run.json`), root `index.html`,
`_demo-lan.html`, `_demo-lan-stitch.html`, and shared `cuts/surfaces.js` +
`cuts/cut-manifests.json`. There is no cut 07 in `cuts/` (numbering gap in the catalog).
Archived experiments (`cuts/_archive/`, `_explore/`, `_compare.html`, `_console.html`,
`_template.html`) are out of scope except where cited above. One image caveat:
`audit-02-speedrun.png` renders mostly blank (screenshot-timing artifact); speedrun visual
facts in the index section rely on `audit-02-speedrun-full.png` and source instead.

---
# Inventory — Liminal Prototype Cuts 00 & 01

## cuts/00-agency.html

### Visual facts — what is literally on the surface

**Layout structure** (lines 42–68): Three-column desktop grid with `.shell` container. Top bar (`.rb-top`) contains traffic lights, brand diamond + "Agency" label, subject-switch buttons (`.subjects`), frame ID display, and ⌘K button. Middle section (`.mid`) is `grid-template-columns: 280px 1fr 320px`: left rail (`.rail-l`), center work area (`.work`), right rail (`.rail-r`). Bottom chain ribbon (`.rb-bot`) + ledger modal (`.ledger`). Responsive body radial gradients at lines 50–51 (diligence-50 at 8% -6%, depth-50 at 106% 4%).

**Subject-as-a-switch IA** (lines 229–286): `SUBJECTS` object with keys `['pattern','notice','custody','osint','spend']` drives the entire loop. Each subject carries: `label`, `product`, `registers` (4 strings), `cover` (4 strings), `refuse` (4 strings), `slate` (2D array of tiles), `tray` (2D array), `sk` (subject key), `title`, `reads` (array with "VERDICT" marker at index 3), `verdict`, `refusalLine`, `evidence` (key to evidencePane). Current subject stored in `CUR` variable; `.on` button class marks active subject (line 60: `color: var(--bg); background: var(--diligence)`).

**Orbital-agency-diagram** (lines 314–334): Animated SVG in right rail. Function `orbitSVG(big)` generates `<svg class="orbit">` with center circle at cx/cy=85,85, four 80° arcs (one per register, 90° apart), register labels offset by `(rad+13)` pixels, agent names at arc endpoints, and refusal arrows (dashed lines pointing inward from arc midpoints to center). The refusal arrows are drawn via line elements at lines 322–324: `<line class="refuse">` with `opacity:0; transition:.2s` (line 154); `.hot` class on agent hover sets `opacity:.8` (line 155).

**Evidence panes** (lines 291–312): Subject-specific, conditionally rendered. Spend pane (lines 293–294): allocation bar (`.allocbar`) with two colored sections (`.p` diligence-bg, `.s` depth-bg) + ghost marker; swap section with two side-by-side cards (`.swap .side.cur` + alarm-edge, `.swap .side.sug` + connection-bg). Custody pane (lines 295–300): SVG map with compass path, two marker rings (animated via `@keyframes ring`, line 112: `0%{r:3;opacity:.7}100%{r:16;opacity:0}`), alarm markers at certain positions. OSINT pane (lines 301–303): layered reads (`.layers`), hypothesis bar (`.hyp-bar`) with three colored fills (connection, watch, alarm widths 62%/26%/12%). Notice pane (lines 304–309): audit trail (`.atrail`) with rows colored by status (`.match`, `.contra`). Pattern pane (lines 310–311): orbital diagram embedded + prose note.

**Register reads section** (lines 131–141): Four `.reg` blocks (one per register, r0–r3), each with header (rh: rname + rt + amend button, line 134 opacity:0 on hover), body (rbody serif text + hl highlights), corrected state (line 137: gradient background), cite links (line 138: depth-edge border), refusal block (line 139: judgment-bg with ico + tx). Animation: `@keyframes rin` (line 195: `opacity:0→1, transform:translateY(5px)→none`) with staggered animation-delay per data-reg.

**Sealed Stack / Ledger** (lines 167–194): Decision ledger modal triggered by clicking chain ribbon. `.page2` cards (lines 182–192) render sealed artifacts with colored left border (find/corr/dec/refuse/anchor, lines 184–189). Each page has ph (header), k (kind label), seal (glyph + background), pb (body), pf (footer hash). Center orb state: `.sealed` has stronger fill/stroke + drop-shadow (lines 180–185). `.areceipt` shows Algorand txn ID when proving is enabled (line 361).

**Color/type usage** (verified via grep and visual inspection):

CSS custom properties used throughout:
- Registers: `--diligence`, `--depth`, `--judgment`, `--connection`, `--outreach`, `--synthesis` (also called "alarm" / "watch" / "signal" in some contexts)
- Backgrounds: `--frame-bg`, `--frame-bg-2`, `--frame-bg-3`, `--diligence-bg`, `--depth-bg`, `--judgment-bg`, `--connection-bg`, `--card-border`, `--card-border-2`, `--frame-border`, `--depth-edge`, `--alarm-edge`
- Text: `--text`, `--text-mid`, `--text-dim`, `--text-faint`, `--text-mute`, `--bg` (light cream)
- Palette tokens for sealed states: `--cream-100`, `--cream-700`, `--cream-800` (lines 182–191)

Font stacks (lines 39–41, 53):
- `--display`: "Nineties Headliner" (h2 at line 91, 22px/400)
- `--serif`: "Perfectly Nineties" fallback Georgia (register body text, line 135, 13.5px/1.55)
- `--mono`: Geist Mono (labels, metadata, lines 53/71/88)
- `--sans`: (base body, line 49, 14px/1.5)

**Motion presence**:
- `@keyframes rin` (line 195): register read fade-in stagger
- `@keyframes pl` (line 195): pulsing live indicator (opacity 1→.3→1, 1.1s)
- `@keyframes fr` (line 195): fresh-correction highlight (bg + padding shrink, 1.6s)
- `@keyframes ring` (line 112): custody marker ring (r:3→16, opacity:.7→0, 2.4s)
- Button magnetic-hover (lines 46–48): `transform:translateY(-1.5px)` on hover, `.22s var(--ease-spring)`, `scale(.97)` on active

**Image evidence**: audit-07-agency-frozen.png shows three-column layout with left Signals panel (live indicator pulsing, slate/tray tabs), center Agency/Tuesday read (serif title, four register blocks with colored left borders staggered, refusal blocks with judgment background), right rail with four-plate orbital diagram (diligence top, outreach left, judgment right, synthesis bottom, agents at arc endpoints with status glyphs ◉/◯/●/⊘).

### Interaction facts — what the cut DOES

**Subject switch** (lines 337, 400, 384): Click `.subj[data-subj]` button triggers `go(k)` function. `go()` resets chain to 4 items, renders all panes fresh (renderSubjects, renderFrame, renderSlate, renderAgency, renderRead, renderChain), clears ledger open state, fires toast notification. Subject switch is the master control; everything re-renders.

**Drag-harden flow** (lines 410–419): Tray tiles are draggable (`.tile.tray-tile[draggable=true]`). `dragstart` event adds `.dragging` class and stores `dragId`. Slate accepts drop: `dragover` adds `.drop` class (line 415), `dragleave` removes it, `drop` event splices tile from tray into slate, appends to subject's slate array, re-renders, pushes chain event with "hardened" label, fires toast.

**Cite click** (lines 401, 138): Click `.cite[data-c]` on register reads highlights the corresponding tile: `highlight(+cite.dataset.c)` removes `.cited` from all tiles, adds `.cited` + `.open` to the target tile (line 406). Tile styling: `.tile.cited{border-color: var(--diligence); background: var(--diligence-bg)}` (line 81).

**Amend read** (lines 402, 134): Click `.amend[data-amend]` on a register header. Handler adds `.corrected` class to `.reg` (line 137 background gradient), calls `recordCorrection(register name)` (lines 388–389). Correction appends to CHAIN array with `['14:3'+count, 'correction · ...', 'corr', 'new']`, increments `corrections` count, updates CC display and button text. Chain is append-only; each correction is a new entry (comment line 387 notes this).

**Sign disposition** (lines 404, 389–393): Click `.db.sign[data-act="sign"]` calls `sign()`. Appends sealed entry to chain with timestamp 14:36. If `CUR==='spend'` (line 390), renders escalation artifact (CEO-visible chain path). Sets `signed=true`, hides the sign button (line 393). Fires toast "Sealed & handed off · the loop will return it in Today".

**Ledger modal** (lines 363, 396–399): Click `.rb-bot#chain` or `.dispo` artifact or `.prove#prove` button opens ledger. `openLedger()` adds `.open` class to `#ledger` (line 170: `transform:translateY(0)` vs `translateY(100%)`). `.prove` toggles `.proving` class on ledger to show Algorand receipt lane (lines 357–362). `#lclose` button removes `.open` and `.proving` classes.

**Agent hover** (lines 407–409): Hovering over any `[data-ag]` element (orbital agent groups or regblk) highlights its coverage. Orbital agents get `.hot` class (line 151: opacity:1, stroke-width:4), regblk siblings fade to `.5` opacity except the hovered one.

**Keyboard**: Script loads beat-rail.js and beat-marginalia.js (lines 423–425) for presenter aids; no direct keystroke handlers in this cut's inline script.

**State machine**: Simple state: `CUR` (subject), `corrections` (count), `signed` (bool), `CHAIN` (array, 4 → N entries). No explicit FSM, but order is enforced by UI: reads first, then corrections, then sign. Signing hides buttons and locks the read.

### Design-system usage — which tokens/components the cut consumes

**CSS files linked** (lines 31–37):
- `../design-system/tokens/design-tokens.css` (line 31) — canonical 12-wheel tokens
- `../design-system/components/framing.css` (line 32) — `.seam` class + utilities
- `../lib/cut-shell.css` (line 36) — converged shell chrome (`.shell`, `.rb-top`, `.rb-bot`, `.lab`, `.dispo`, `.dispo.db`, trade-off note line 34)
- `../lib/brand-upgrade.css` (line 37) — shared branding overrides

**Custom properties (--*) used** (grep across lines 38–196):
- Registers: `--diligence`, `--depth`, `--judgment`, `--connection`, `--outreach`, `--synthesis`
- Signal colors: `--signal`, `--alarm`, `--watch`
- Backgrounds: `--frame-bg`, `--frame-bg-2`, `--frame-bg-3`, `--bg`, `--card-border`, `--card-border-2`, `--frame-border`, `--depth-edge`, `--alarm-edge`, `--diligence-bg`, `--depth-bg`, `--judgment-bg`, `--connection-bg`, `--judgment-glow`, `--cream-100`, `--cream-700`, `--cream-800`
- Text: `--text`, `--text-mid`, `--text-dim`, `--text-faint`, `--text-mute`
- Timing: `--ease`, `--ease-spring`
- Fonts: `--sans`, `--mono`, `--serif`, `--display`

**Shared component classes** (inherited from cut-shell.css per line 54 comment):
- `.shell` — outer container
- `.rb-top` — top bar
- `.rb-bot` — chain ribbon + disposition anchor
- `.lab` — chain label glyph
- `.dispo` — disposition section
- `.db` — disposition button (cut-00 inherits, adds magnetic-hover override at lines 46–48)

**Cut-00-unique content preserved**: `.subjects` (subject-switch buttons), `.mid` (three-column grid with canonical 280/320 widths), `.slate` (dashed border, drop state), `.tray` (diffuse signals, drag affordance), `.orbital-pane` (evidence pane for pattern subject), all evidence panes (spend/custody/osint/notice/pattern specific), `.reg` (register reads with colored accents per r0–r3), `.orbit` (orbital diagram SVG), `.ledger` (decision ledger modal), `.page2` (sealed cards).

### Feel/grammar note

Forensic/analytic register; each subject is a case file the agents read and you judge. The loop is read-judge-refuse-correct-sign, embedded in audit-trail motion and sealed artifact ceremony (the Algorand ledger is investor-legible proof that disagreement is data). Refusal is structural; it's rendered as spatial boundary-crossing (arrows point inward, agents fade their slots when they refuse). The four registers are orbit-positioned (cardinal, not hierarchical); each covers a different domain of the subject, and refusal between them is routing, not failure.

---

## cuts/01-slate-tray.html

### Visual facts — what is literally on the surface

**Layout structure** (lines 734–1049): Desktop shell with titlebar (traffic lights + "◇ The control plane..." wedge + vault pill), product-row nav (Personal|Team|Business|Seed tabs), main three-pane layout (left rail + slate area + right agency rail), tray drawer on right edge. Desktop-first, 1180px shell (line 67 `.mid` in cut 00 equivalent). Entry overlay modal (lines 737–766) only on first visit, hidden by default; can be toggled to show three doors (Personal as lead with "start here" suffix, Team and Sam-Seed as secondary pair, lines 547–568).

**Slate area composition** (lines 823–910):
- Classification tag (data-product specific, lines 825)
- Header: eyebrow + title (36px, line 264!) + subtitle (15px, line 270)
- Metric band: 3-cell grid (lines 361–383), scenario-keyed (personal/team/business, lines 1302–1325), injected via runtime script
- Brief area: brief header + body + optional contrarian margin (mystic-margin, lines 314–320) + vault-calib calibration text + disposition buttons (Confirm / Defer 7d / Preview subject view)
- Disposition artifact: signed state with da-bar (stamp + title + time), da-body (4 sections: Disposition / Committed / Next action / Subject can request), da-foot (SHA-256 hash + handoff buttons), hidden until signed
- Audit ribbon: audit-rows flex container (line 908), disclosure toggle (lines 1359–1373 in runtime)

**Agency orbital diagram** (lines 912–1024):
- Right rail `.rail-right` with `.rail-right-header` (agency-label with static orbital-glyph SVG, lines 917–923; live indicator pill)
- `.orbital-rail` SVG container (280x320, lines 932–1016) with four register plates positioned: Diligence (top, x=60–220), Outreach (left, x=8–100), Judgment (right, x=180–272), Synthesis (bottom, x=60–220)
- Each plate: `<rect class="reg-plate">` with register-keyed stroke, label centered, agent slots with data-agent names and glyphs (◉/◯/●/⊘), lines 951–1009
- Refusal arrows: 4 curved `<path class="refusal-arrow">` connecting plates (witness→strategist, operator→bookkeeper, skeptic→editor), opacity 0 until active (lines 938–947)
- Center orb: `<circle class="center-orb">` at cx=140 cy=160 r=14, transitions fill+stroke opacity; `.convergent` adds purple tint, `.sealed` adds stronger glow (lines 168–185)
- Coverage line below diagram (lines 1020–1023): span with counts label + demo input italic text
- Demo loop (lines 1152–1286): orbitalDemo() IIFE runs 5-step cycle (scan → diligence-cascade → outreach-refuses → judgment-converges → rest), 4.2s per step, loops indefinitely. Each step defines agent states (reading/complete/refused/queued), active arrows, coverage text, convergent/sealed flags. Agents fade glyphs via `.agent-glyph` classes (queued: rgba(255,255,255,0.22), reading: animated pulse at line 155, complete/refused: saturated colors, lines 151–158).

**Entry overlay** (lines 737–766):
- Entry card with register toggle (Brand-first / Speedrun, lines 742–745), three door buttons (data-product=personal|team|sam-seed), skip button
- Personal door (line 748): grid-column:1/-1 (spans full width), larger padding + title, "start here" suffix (lines 547–551)
- Team + Seed (lines 753–762): secondary pair, slightly lower opacity, smaller title
- All three doors have eyebrow (register color), title, helper text

**Desktop primitives / v0.9 chrome** (per comment lines 254–260):
- Anointment: slate-title 36px !important (line 264), slate-subtitle 15px (line 270), rail headers + agency-label reduced to opacity:0.62 (lines 271–273)
- Reorder: flex-direction:column with order properties (lines 275–284) so brief appears above tiles (order:4 before slate-canvas order:5)
- Brief area styles: border-bottom instead of border-top, padding-top:12px (lines 285–290)
- Slate canvas: min-height 240px (line 291)
- Tray panel: background-color color-mix(...92%) to soften it (line 294), tiles .opacity:0.92 + hover→1 (lines 295–296)
- Disposition button hierarchy: is-primary (filled) vs is-defer (outline) + preview-sub (underline link), lines 322–340
- Metric band + audit disclosure + frame receipt: injected post-render via runtime (lines 1300–1390)
- Sealed slate tiles: avatars + close buttons hidden (lines 342–347)
- Vault pill delta: "+3 this week" suffix injected (lines 350–358)

**Entry door hierarchy** (lines 518–574):
- Personal (lead): grid-column:1/-1 (full width), grid-template-columns resets to 1fr 1fr + gap (lines 531–534), Personal gets 1/-1 (spans both), Team/Sam-Seed sit beneath as 1 col each. At ≤720px media query, reverts to single column (lines 572–574).
- Personal door: background color-mix 86% frame-bg-3 + 14% diligence-bg; border softened via color-mix on card-border-2 + diligence 30% (lines 536–541)
- Personal .ed-title: 23px vs secondary 16px (via base brand-upgrade, lines 542–544)
- Eye-brows register-colored: diligence for personal, synthesis for team/seed (lines 566–569)

**Focus ring a11y** (lines 582–614):
- `:focus-visible` outline 2px solid --diligence (register-aware but defaulted to diligence for the whole surface, line 608), outline-offset 2px, border-radius 3px (lines 595–611)
- Entry doors get outline-offset:3px to match their border-radius:5px (line 614)

**Responsive adapt** (lines 628–727):
- ≤1023px: `.main` flips to `flex-direction:column`, rail-right un-hidden and repositioned to order:2 (agency diagram flows below slate), rail-left to order:3. Orbital rail max-width:360px + margin-inline:auto (lines 692–694)
- ≤640px: metric-band 3 cols → 2 cols (with 3rd spanning full width via grid-column:1/-1), no right border on col 2 (lines 701–704)
- ≤380px: metric-band → 1 col (lines 709–712)
- Touch targets ≥44px (lines 718–727): dispo-btn, tray-pill, notes-toggle, preview-sub, entry-door, entry-register button all min-height:44px

**Motion presence**:
- Reveal failsafe (lines 196–208): body opacity:0 by default with transition:240ms ease-out; `.ready` class fires after STEP 0 setup to opacity:1 (prevents initial flash). Keyframe reveal-failsafe forces opacity:1 at 1200ms even if script errors. Reduced motion skips entirely.
- `@keyframes pulse-glyph` (line 158): agents reading pulse 0.55→1→0.55 opacity over 4.2s (synced to step duration)
- Orbital center-orb transitions fill/stroke 600ms ease for convergent/sealed states (lines 171–176)
- Refusal arrows transition opacity 320ms ease (line 215)
- Button magnetic-hover (lines 575–580): `transform:translateY(-1.5px)` on hover, `.22s var(--ease-spring)`, scale(.97) on active, disabled under prefers-reduced-motion
- Tray toggle chevron animation (inherited from cut-shell.css)

**Image evidence**: audit-05-embed-slate.png shows left rail with multiple signal cards (Granola, Obsidian, Git, etc. with timestamps and colored accents), center slate area with large serif title "Drag any window in", empty composition surface with instructions + small buttons below, right rail with vault counts and tray window (showing Granola, Obsidian, FAI signal tiles). Footer shows audit ribbon, network calls log.

### Interaction facts — what the cut DOES

**Product tab switch** (line 800–804 HTML, runtime logic in lib/boot.js):
- Click `.product-tab[data-product]` updates `body[data-product]` attribute
- MutationObserver in runtime (lines 1380–1384) watches for data-product change and re-injects scenario-keyed metrics/receipt
- Each product (personal/team/business/sam-seed) has own SCENARIOS config (lines 1300–1325) with metric sets + receipt text

**Tray toggle** (lines 1030–1047 HTML, runtime in lib/boot.js):
- Click `.tray-pill#tray-pill` toggles `.tray-pop#tray-pop` visibility
- Tray panel `.tray-panel` slides out from right edge
- Chevron icon `.tp-chevron` rotates on state change (visual only)
- Tray count updates via `#tp-count-strong` element

**Slate composition** (implied from HTML structure and brief copy):
- Empty slate shows `.slate-empty` with instructions "Drop a window from the tray to begin a read"
- Agents read the composed tiles; brief auto-generates
- Tiles have close buttons (hidden in sealed mode, line 344)

**Disposition flow**:
- `.dispo-btn.is-primary#dispo-primary` ("Confirm") — commits the read
- `.dispo-btn.is-defer#dispo-defer` ("Defer 7d") — defers decision, hides brief
- `.preview-sub#preview-sub` ("Preview subject view") — opens modal
- After confirm: `.dispo-artifact` un-hides (line 870 hidden), shows sealed card with disposition + committed + next action + subject-visibility sections
- `.da-handoff-btn#da-handoff` — escalates up the org (personal → team → business)
- `.da-handoff-btn#da-share` — shares with subject (copy to vault + forward)

**Audit disclosure** (lines 1359–1373 runtime):
- Click `.audit-disclosure` toggles `aria-expanded` state
- Toggles `.audit-ribbon` hidden property (was hidden by default, shown on toggle)
- `.ad-plus` icon rotates 45° (line 412: `transform:rotate(45deg)`)

**Modal preview** (HTML lines 1052–1070):
- `.modal-overlay#modal-overlay` + `.modal#modal` for subject preview
- `.preview-sub` trigger populates modal-title + modal-content + modal-chain sections
- `.modal-close#modal-close` button closes modal

**Keyboard shortcuts** (lines 1091–1129 HTML reference):
- ⌘Z: Undo last placement
- ⌘Enter: Confirm disposition
- ⌘D: Defer 7 days
- ⌘1–⌘3: Switch product (personal/team/business)
- ⌘[/]: Previous/next subject
- ⌘.: Toggle tray
- ⌘N: Toggle editor's notes
- ⌘?: Open shortcuts panel
- ⌘⇧R: Reset vault (IndexedDB)
- Esc: Close tray/overlay

**Entry overlay** (lines 1396–1408 runtime):
- Register toggle (Brand-first / Speedrun) flips `.entry-card.is-speedrun` class
- Speedrun mode reorders hero: register leads, wedge next, brand demoted to italic byline (lines 495–516)
- Door selection likely wired in lib/boot.js (not in inline script shown here)

**Notes toggle** (lines 1083): Click `.notes-toggle#notes-toggle` toggles editor's notes visibility (Caveat marginalia from Shruti, per comment line 1082).

**Keyboard help** (lines 1091–1129): Click `.kbd-hint` or press ⌘?, opens `.kbd-help#kbd-help` with 4 sections (Composition/Navigation/Surfaces/Vault). Esc closes (scoped to cut-shell or lib/boot.js handler).

**Version pin** (lines 1076–1080): Dev-only display of spec vs proto version drift; hidden by default, revealed by ?dev URL param.

**Toast notifications** (lines 1132–1135 HTML, lines 387–388 in cut 00): `.toast#toast` with glyph + message, auto-dismisses via timeout in runtime.

### Design-system usage — which tokens/components the cut consumes

**CSS files linked** (lines 43–54):
- Google Fonts: Caveat only (lines 43–45) — Newsreader, Geist, Geist Mono marked as "never rendered (status unloaded)" per comment line 40
- `../design-system/tokens/design-tokens.css` (line 48)
- `../lib/cut-shell.css` (line 52) — shared shell chrome
- `../lib/surface-nav.css` (line 53) — product row nav
- `../lib/brand-upgrade.css` (line 54)

**Custom properties (--*) used** (grep lines 56–727):
- Registers: `--diligence`, `--synthesis`, `--judgment`, `--outreach`, `--connection`, `--depth`, `--watch`, `--signal`, `--alarm`
- Register-accents: `--p-accent` (product-specific accent, muted to rgba(240,238,234,0.5) in brand-upgrade per line 591)
- Backgrounds: `--frame-bg`, `--frame-bg-2`, `--frame-bg-3`, `--card-border`, `--card-border-2`, `--frame-border`, `--connection-bg`, `--diligence-bg`, `--judgment-bg`, `--depth-bg`, `--depth-edge`, `--alarm-edge`, `--alarm-bg`, `--alarm-glow`
- Text: `--text`, `--text-mid`, `--text-dim`, `--text-faint`, `--text-mute`
- Timing: `--ease`, `--ease-spring`
- Fonts: `--display` (line 376), `--serif` (lines 190, 321), `--mono` (lines 119, 226, 371–372, 394), `--sans` (line 104)
- Cream palette: `--cream-100`, `--cream-700`, `--cream-800` (not used in cut 01 inline; reserved for sealed-artifact styling in cut 00)

**Shared component classes** (inherited from cut-shell.css and surface-nav.css):
- `.stage` — outer desktop container
- `.frame` — window frame with titlebar
- `.titlebar` — title bar with lights + wedge + vault pill
- `.lights` — traffic light indicators
- `.product-row` — product tab navigation
- `.product-tab` — individual tab button
- `.main` — three-pane layout wrapper
- `.rail-left`, `.rail-right` — sidebar panes
- `.slate-area` — center composition area
- `.slate-header`, `.slate-title`, `.slate-subtitle` — read header
- `.classification` — product/scenario tag
- `.brief-area`, `.brief-head`, `.brief-body` — agent brief
- `.disposition`, `.dispo-btn` — disposition buttons
- `.dispo-artifact` — sealed read display
- `.audit-ribbon`, `.audit-disclosure` — audit chain + toggle
- `.tray-pop`, `.tray-pill`, `.tray-panel` — tray drawer
- `.entry-overlay`, `.entry-door`, `.entry-card` — entry modal
- `.modal-overlay`, `.modal` — preview modal
- `.toast` — notification toasts
- `.kbd-help`, `.kbd-hint` — keyboard help overlay

**Cut-01-unique content**:
- Orbital diagram refactor (v0.8.4, lines 70–223): replaces old vertical register-list with four-plate orbital + demo loop
- Entry door hierarchy + asymmetry (lines 518–574): Personal lead, Team/Seed secondary pair
- Metric band + audit disclosure + frame receipt injection (lines 1300–1390 runtime)
- Hero register toggle (Brand-first / Speedrun, lines 1391–1408 runtime)
- Responsive three-pane restack (lines 628–727): ≤1023px stacks to single column, orbital diagram un-hidden and repositioned in flow
- Touch-target a11y (lines 718–727): 44px min-height gate on coarse pointer
- Focus ring a11y (lines 595–614): register-aware outline on keyboard navigation

### Feel/grammar note

Founder-first control plane; the slate is a composition surface where you drag signals into the read (tray → slate metaphor). The four registers orbit the central ◇ glyph (agents deliberate), refusal arrows show delegation (this-register won't opine, ask that-register instead). The orbital demo loop is an always-on IP receipt for investors: agents reading a scenario, disagreeing, converging, then sealing the decision to vault (three visible beats: deliberation → convergence → commit). The metric band and receipt footer keep the operator grounded in the context (runway, corrections, vault state). Entry doors are asymmetric (Personal leads; Team/Seed follow) to reinforce the thesis: founders enter first.
# Producer Pass Inventory: Part 2

## cuts/02-forensic-agent.html

### Visual facts

Three-column grid layout (lines 118–123: `grid-template-columns: minmax(280px, 22%) minmax(420px, 1fr) minmax(320px, 28%)`). 

**Left pane:** Incoming stream (14 days); `.stream-item` rows (lines 142–180) with time, sender, subject. One item flagged red (`stream-item--flagged`, line 164): decision-email contradiction signal. Flag styling uses alarm red via `color-mix(in srgb, var(--alarm, #c54a3a) 9%, transparent)` (line 167).

**Center pane:** Contradiction narrative (`contradiction`, lines 183–206). Claims headline in Perfectly Nineties serif font (line 196: `--serif, "Perfectly Nineties"`). Two-column grid of record cards (`.records`, lines 209–253): one marked `record--decided` with alarm red border (line 221), one marked `record--pending` with watch orange border (line 222). Next-moves section (lines 255–285) lists agent-proposed actions with move bullets (`→` for primary, `∘` for soft; line 281–284).

**Right pane:** Audit trail (lines 287–326) with paired rows: check glyph (`✓` or `!`; line 302) + key/value. Check marks use signal green (`--signal, #5b8a6f`, line 301); watch flags use `--watch, #b88a3a` (line 303). Provenance footer (lines 314–326) renders metadata in monospace with reduced opacity.

**Responsive:** At 1180px (line 353), audit pane drops below the two reading panes; at 860px (line 366), single column layout with left-padding to clear fixed surface-nav rail (56px).

**Color/type:** 
- Fonts: Geist sans (lines 58, 88, 137, 154, 200, 225, 239, 246, 261, 281, 299, 309, 318) and Geist Mono (lines 88, 133, 148, 177, 225, 246, 299, 309, 318).
- Serif accent: Perfectly Nineties (line 196) for the main claim.
- Tokens consumed: `--ink-1` through `--ink-9` (fallback palette, lines 56, 87, 95, 127, 150, 155, 160, 170, 179, 192, 200, 216, 219, 229, 235, 241, 252, 308, 309, 337); `--alarm` (lines 104, 106, 114, 170, 179, 192, 206, 221, 222); `--watch` (lines 222, 253); `--signal` (lines 282, 301).
- No `@keyframes` or `transition` declarations; no animations present.

**Topbar pill:** Alarm-red pill (lines 99–116) with glow effect (`box-shadow: 0 0 8px var(--alarm)`, line 115).

### Interaction facts

No JavaScript event handlers visible in this cut. The HTML is a static narrative surface — read-only, no state machines, no tray→slate→correction→packet→vault loop expressions. No click handlers, no gesture support documented.

Footer (lines 559–563) is a plain metadata strip; `surface-nav.js` is loaded (line 567) but provides cut-independent navigation, not cut-02-specific interaction.

### Design-system usage

**Imported:**
- Line 44: `design-system/tokens/design-tokens.css` (canonical tokens, not redefined per contract §32).
- Line 47: `cut-shell.css` (shared desktop-app shell).
- Line 48: `surface-nav.css` (navigation surface).
- Line 50: `brand-upgrade.css` (PerfectlyNineties @font-face + serif/display aliases).

**Tokens consumed (via fallbacks):**
- `--ink-1` through `--ink-9` (not defined in canon; fallbacks lines 56–337).
- `--alarm` (line 104, 106, 114, 170, 179, 192, 206, 221, 222; resolved from canon).
- `--watch` (line 222, 253; resolved from canon).
- `--signal` (line 282, 301; resolved from canon).
- `--font-sans`, `--font-mono`, `--font-serif` (lines 58, 88, 137, etc.).

**Classes:** Standard semantic classes (`.pane`, `.stream-item`, `.record`, `.audit-row`); no dependencies on shared utility classes from cut-shell.

**Note on canon drift (lines 340–350):** Cut paints dark surface via `--ink-*` fallbacks; canon does not define a named dark-ramp. Chrome tokens (`--alarm`, `--watch`, `--signal`) do resolve from canon. Fallbacks are the operational truth until canon adds ink/surface ramp.

### Feel/grammar note

Forensic audit aesthetic — monospace body, serif claim headline, red/orange/green signal palette for evidence classification; reads as substrate-level precision and founder-grade legibility over aesthetic.

---

## cuts/03-calibration.html

### Visual facts

**Layout:** Desktop-app shell frame (titlebar + content). Calibration view is a temporal grid (lines 165–174):
- `grid-template-columns: 100px repeat(12, minmax(0, 1fr))` (12 weeks)
- `grid-template-rows: 32px repeat(4, minmax(72px, 1fr))` (header + 4 register rows)
- Gap: 1px; background paper-soft; padding 1px (line 171).

**Visual structure:**
- Corner cell (week labels row, line 190–193).
- Week header cells (mm/dd format, lines 177–188, e.g., "03/10", "03/17" from screenshot audit-f9-calibration-after.png).
- Register row labels (left): Diligence (blue/clarity-500), Synthesis (yellow/agency-500), Judgment (pink/wholeness-500), Outreach (jade/connection-500) — colored via `.cal-register-label.{register}` classes (lines 214–228).
- Grid cells: intensity-encoded (`empty`, `light`, `medium`, `saturated`) via color-mix (lines 290–303). Each cell displays count + tag abbreviation.
  - Example from screenshot: Diligence row, 03/10 cell shows "4 MISSED·COMPENSA…" (truncated tag).
  - Saturated cells (4+ corrections) render at full hue intensity; light cells (1–2) at 14% blend.
- **Drill panel** (below grid, lines 336–348): fixed-height, border-soft, displays selected register/week + stats + history. Hidden (`.empty`) by default.

**Colors (via :root aliases, lines 72–92):**
- Surface: `--paper` (#0E0E11), `--paper-lift` (#0C0C0F), `--paper-soft` (#15161A), `--border` (#232327), `--border-soft` (#1F1F23), `--cell-bg` (#0C0C0F).
- Signal hues: `--signal-violet-ink` (clarity-500, #8E66FB), `--signal-solar-ink` (agency-500, #FFD24A), `--signal-pink-ink` (wholeness-500, #E90095), `--signal-jade-ink` (connection-500, #3EE878) + corresponding `-paper` (6% alpha wash).
- Per-register styling: `.cal-cell.diligence` binds `--cell-accent: var(--diligence)` and `--cell-bg: var(--diligence-bg)` (lines 254–272); same pattern for synthesis, judgment, outreach.
- Intensity encoding (lines 290–303) composites `--cell-accent` with `--paper` at ratios (14%, 28%, 46% for light/medium/saturated).

**Typography:**
- Eyebrow: Newsreader italic (line 129).
- Title: Geist sans, 1.5rem (line 137), bumped to 36px via override (line 465).
- Grid labels: Geist Mono, 0.75rem (line 182).
- Cell count: Geist Mono, 0.875rem (line 307).
- Cell tag: Geist sans, 0.625rem, uppercase, truncated with ellipsis (lines 312–328).
- Drill header: Geist sans, 1rem (line 378), smaller register label (line 384).
- History items: Newsreader serif, 0.8125rem (line 445); time in Geist Mono, 0.65rem (line 451).

**Responsive:** At 1024px (line 502), drill panel hides (`.cal-drill { display: none }`).

**Motion:**
- Body fade-in: opacity 0 → 1 transition 240ms ease-out on `.ready` class (lines 55–61).
- Cell hover: box-shadow + border-color transition 140ms (lines 249–252).
- Register label hover: background transition 140ms (line 207).
- Drill close button: magnetic-hover (translateY -1.5px), spring easing, active scale 0.97 (lines 520–523).
- All transitions use `var(--easing, cubic-bezier(0.4, 0, 0.2, 1))` or `var(--ease-spring)` (line 520).

**Seam component** (lines 151–152): canon framing component; override only: `--seam-size: 0.82rem`, `--seam-b-size: 0.95rem`, etc.

**Live indicator** (lines 1005–1036): Injected pill in header, monospace, violet-colored, fades in. Text: "illustrative baseline · seeded sample" or "N real corrections merged onto seeded baseline".

**Footer strip (v0.9.3 receipt, lines 471–485):** Thin `.frame-receipt` below prose footer — Geist Mono, 9.5px, uppercase, with glyph + strong text + right-aligned opacity-72 text.

### Interaction facts

Drill panel state machine (lines 868–954): click cell or register label → `showDrill(register, week)`.
- If `week` is null: show register summary (total by agent across all weeks, primary agent = highest-count, lines 872–896).
- If `week` is truthy: show week details (counts by agent for that register, lines 917–948).
- Close via button click (line 952) or Esc key (lines 953, 962–965).

Live data binding (lines 573–1060):
- `load()` (lines 749–766): seeds mock baseline, reads real corrections from `vaultStore.read({ surface: "personal" })`, merges into data shape.
- `renderGrid()` (lines 781–865): generates grid DOM from `mockData.weeks` and `mockData.data`.
- `renderLiveIndicator()` (lines 1005–1036): injects pill with real count or baseline disclosure.
- Event listeners (lines 1049–1055):
  - `liminal:vault:appended` (same-tab CustomEvent) → `refresh()`.
  - `storage` event (cross-tab, key `liminal:vault:pulse`) → `refresh()`.
  - `visibilitychange` (tab focus) → `refresh()`.

Grid cell interactivity (lines 857–860): click or Enter/Space key on cell fires `showDrill(register, week)`.
Register label interactivity (lines 808–811): click or Enter/Space key fires `showDrill(register, null)` (register summary).

Drill close button (line 952): click fires `closeDrill()`; Esc key (lines 962–965) also closes.

QA seed mode (lines 731–747): `?qa-seed=1` in URL pre-populates IDB with representative corrections via `vaultStore.appendCorrection()`.

### Design-system usage

**Imported:**
- Line 44: `design-system/tokens/design-tokens.css` (canonical tokens).
- Line 45: `design-system/components/framing.css` (framing/seam component).
- Line 48: `cut-shell.css` (shell frame).
- Line 49: `surface-nav.css` (navigation).
- Line 50: No brand-upgrade.css (no Perfectly Nineties here; Newsreader serif loaded via Google Fonts line 41).

**Canon tokens consumed (via :root aliases):**
- Surface/frame: `--frame-bg`, `--frame-bg-2`, `--frame-bg-3`, `--card-border`, `--frame-border` (lines 74–78).
- Text: `--text-dim`, `--text-mid`, `--text-faint` (lines 80, 315, 478).
- Hue scales (color-system): `--clarity-500`, `--clarity-bg`; `--agency-500`, `--agency-bg`; `--wholeness-500`, `--wholeness-bg`; `--connection-500`, `--connection-bg` (lines 84–91).
- Named registers: `--diligence`, `--synthesis`, `--judgment`, `--outreach` + corresponding `-bg` (lines 214–228, 254–272).
- Motion: `--ease-out` (line 81), `--ease-spring` (line 520).
- Shadow (pending): `--shadow-micro` with fallback (line 250).

**Components:**
- Framing `.seam` (line 551): prose text inside a styled div; margins/padding via canon seam variables (line 151).
- Shell `.frame`, `.titlebar` (lines 530–544).
- Navigation `.stage` (line 529).

**No redefinitions of canon tokens per contract (line 22–24).** The `:root` block (lines 72–92) creates *aliases* that *bind* to canon tokens, not new definitions.

### Feel/grammar note

Data-visualization dashboard aesthetic — 12-week temporal grid, multi-hue register encoding, intensity-via-saturation, drill-on-click; reads as the "record made visible" and "pattern is the signal" (line 566).
# Inventory: Cuts 04, 05, 06 · Liminal Prototype

## cuts/04-onboarding.html

### Visual facts

**Layout structure:** Desktop window chrome (titlebar with macOS lights + crumb navigation, fixed 1240px max-width). Two-pane grid: main stage (left, flex-fill) + steprail sidebar (right, 220px fixed). Seven sequential screens (S01–S07), only one visible at a time via `.screen.is-active` (line 65). Vertical padding clamp(18px, 5vw, 56px); stage content padding 56px 64px 40px (line 116). Responsive grid collapses to single column at max-width 980px; steprail hides on mobile (line 105).

**Atmospheric layer:** Radial gradient from `var(--clarity-bg)` centered at 50% 35%, opacity 0.6, applied as body::after (lines 14–18 in onboarding.css).

**Subject-as-a-switch IA:** The STEPS array (lines 546–554 in 04-onboarding.html) drives the entire render: seven step objects with `num`, `nm`, `crumb`. Current step (`cur`, initialized 1) renders live via `go(step)` function (line 622). The steprail is built from STEPS via map (lines 590–592), making it a live navigation control, not a static display.

**Orbital-agency-diagram:** Screen S06 (lines 427–475) displays three `.agent` cards (Analyst/SDR/Auditor), each with `.a-hd` (name + lane), `.a-reads` (reads tags + text), `.a-reads` (refuses tags + redirect). This is a static card grid, not animated, but the agent names and lanes form the three-lane doctrine. Top border-color coded: clarity, connection, expression (onboarding.css lines 435–437).

**Sealed-artifact moment:** Screen S07 (lines 489–515) renders `.welcome-mark` with a `.seal` pseudo-element (onboarding.css line 539) containing a radial gradient + ◇ glyph. Below that, `.tray-evo` displays five tray-sigil stages (data-stage 0–4, SVG-rendered by `sigil()` function lines 571–581). The `.tray-grow` (line 510) loops Day 1→60 live on the page via `startGrow()` (lines 667–675).

**Motion presence:**
- `screen-rise` keyframe (lines 75–78): 520ms, eases in with `--ease-out-quint`, staggered delays per child (0ms, 45ms, 90ms, 135ms, 170ms) — cited lines 67–74.
- `.btn` hover/active transitions (line 81): transform, color, background, border-color with 0.22s ease-spring on hover, 0.08s on active.
- Progress bar fill (lines 87–91): 420ms width transition to `var(--clarity)`.
- Reduced-motion media query (lines 120–127): removes all animations, transitions collapse to instant.

**Color/type usage:**
- CSS tokens from `design-tokens.css` (line 40): `--clarity`, `--frame-bg`, `--frame-border`, `--text`, `--text-mid`, `--text-dim`, `--text-faint`, `--card-border`, `--ease-out-quint`, `--clarity-glow-soft`, etc. (verified via grep of 04-onboarding.html).
- Font stack: `--display` (Nineties Headliner, set in lib/brand-upgrade.css line 42), `--serif` (Perfectly Nineties), `--mono` (Geist Mono), `--sans` (Geist) — all loaded from canonical fonts.googleapis.com (line 37) and lib/brand-upgrade.css (line 42).
- No inline color redefines. All colors route through CSS custom properties.

### Interaction facts

**Handlers & navigation:**
- `.flow` click handler (line 627): listens for `[data-go]` buttons; `data-go="next"` calls `go(cur + 1)`, `data-go="prev"` calls `go(cur - 1)`, `data-go="restart"` calls `go(1)`.
- Steprail jump-to-step (lines 636–639): `.sr-item` click handler sets step to `data-step` attribute.
- Source selection (S05, lines 642–652): `.anchors` group acts as a radio group; clicking `.anchor-card` toggles `.sel` class and updates `aria-checked`.
- Keyboard (lines 655–662): ← / → to nav, ⌘↵ or Ctrl↵ to advance, Esc to jump to step 1.

**State machine & transitions:**
- One screen active at a time; `render()` function (line 600) toggles `.is-active` and `.hidden` on screen elements.
- Progress bar `fill` width updates to `(cur / total * 100)%` (line 610).
- Steprail items update class state: `.done` for steps < cur, `.now` for cur, default for future (lines 614–616).
- Focus management: the active screen's `.display` heading gets focus with `preventScroll: true` (line 619).

**Loop expression:**
- Onboarding is pre-loop (entry surface), not part of the tray→slate→correction→packet→vault loop itself.
- But S07 closes with a call-to-action: "Take the first read ⌘⇧L" (line 518), which re-enters the main app via the global shortcut.
- The tray-sigil evolution (S07) visualizes the vault filling over time (Day 1→60), setting expectation for the later loop rhythm.

**Supporting directory: cuts/onboarding/**
- `onboarding.css` (21636 bytes): all per-cut layout + component styles. NO token redefinitions. Imports `design-tokens.css` via line 40 in the HTML.
- `design-canvas.jsx` (31136 bytes): archived React DesignCanvas component (pre-2026-06-19 rebuild). Not loaded by 04-onboarding.html; kept for reference.
- `parts.jsx` (6634 bytes): archived parts definitions (Tray, Agent, etc.). Not loaded.
- `screens.jsx` (20287 bytes): archived screen definitions. Not loaded.

The HTML (line 44) loads only `onboarding.css?v=4`. The JavaScript is inlined (lines 541–681) and self-contained; no JSX, no framework.

### Design-system usage

**CSS file links (lines 40–44):**
```
<link rel="stylesheet" href="../design-system/tokens/design-tokens.css">
<link rel="stylesheet" href="../lib/brand-upgrade.css">
<link rel="stylesheet" href="onboarding/onboarding.css?v=4">
```

**Token names found (grep `--[a-z-]+` across both HTML and onboarding.css):**
- Clarity: `--clarity`, `--clarity-bg`, `--clarity-300`, `--clarity-700`, `--clarity-edge`, `--clarity-glow-soft`, `--clarity-glow-strong`, `--clarity-100` (onboarding.css lines 122, 131, 142, 175, 181, 320, 344, 417, 453, 533).
- Frame & surface: `--frame-bg`, `--frame-bg-2`, `--frame-bg-3`, `--frame-border` (lines 30, 82, 92, 107, etc.).
- Text hierarchy: `--text`, `--text-mid`, `--text-dim`, `--text-faint`, `--text-mute` (lines 69, 80, 87, 122, etc.).
- Cards: `--card-border` (lines 101, 155, 169, etc.).
- Register colors (S06 agent borders): `--connection`, `--expression` (onboarding.css lines 436–437).
- Spacing: `--space-2` through `--space-8` (onboarding.css lines 44, 108, 116, 121, 149, 204–205, etc.).
- Typography: `--fs-mono-xs`, `--fs-mono-sm`, `--fs-mono-lg`, `--fs-base`, `--fs-md`, `--fs-lg`, `--fs-xl` (onboarding.css lines 160, 184–186, 212, 145, 440, 402, etc.).
- Letter-spacing: `--ls-mono`, `--ls-mono-sm`, `--ls-display`, `--ls-tight` (onboarding.css lines 123, 161, 137, 441).
- Line-height: `--lh-snug`, `--lh-loose`, `--lh-relaxed` (onboarding.css lines 136, 146, 314).
- Easing: `--ease`, `--ease-out-quint`, `--ease-spring` (lines 54, 68, 81, 90).
- Transaction duration: `--tx-base` (onboarding.css line 218).
- Radius: `--radius-1`, `--radius-2`, `--radius-3`, `--radius-pill`, `--radius-4`, `--radius-5` (onboarding.css lines 62, 169, 241, etc.).

**Font families (CSS custom properties from lib/brand-upgrade.css):**
- `--display`: Nineties Headliner (set via @font-face in brand-upgrade.css)
- `--serif`: Perfectly Nineties (same source)
- `--mono`: Geist Mono (loaded from googleapis line 37)
- `--sans`: Geist (default, system fallback or loaded separately)
- `--hand`: Not loaded in 04-onboarding; used in cut-06 only.

**Shared components/classes from cut-shell.css & onboarding.css:**
- `.stage`, `.frame`, `.titlebar` (window chrome, shared with all cuts)
- `.display`, `.lede` (typographic scales)
- `.btn`, `.btn-primary`, `.btn-ghost`, `.kbd` (button system with aria focus-visible)
- `.split`, `.pane-r`, `.row`, `.col` (layout primitives)
- `.fld`, `.input`, `.meter` (form components)
- `.footnote`, `.chip` (annotation styles)
- `.agents`, `.agent`, `.a-hd`, `.a-name`, `.a-lane`, `.a-reads`, `.a-tag` (the three-agent card component)

No local token redefines anywhere in the inlined style block (lines 46–128).

### Feel/grammar note

Forensic/inevitable register: the cut narrates the vault-building sequence with formal precision (each step labeled, locked progression, no skipping), grounded in real affordances (passphrase, encryption, daemon config). The handwritten sigil evolution (S07) adds earned expressiveness — the tray icon as an artifact the user will recognize over time. Tone is instructional + boundary-setting (negations in S01, crypto details matter, no notifications/prompts).

---

## cuts/05-plugin-seed.html

### Visual facts

**Layout structure:** A terminal session mockup. `body` centers a `.term` container (max-width 900px, 100% on mobile) with a fixed titlebar and scrolling body. Titlebar (lines 78–87): macOS lights + "sam@frontier-assessment · ~/pentest — claude" + "plugin · claude code" label. Body (lines 90–91): monospace (13px, Geist Mono), line-height 1.62, single column.

**Beats as visual units:** Four `.beat` sections (lines 203–282), each starting invisible (opacity 0, translateY 8px) and rising via `@keyframes rise` (lines 95–96). Beats are separated by top border dashed (line 97). Each beat has a `.beat-eyebrow` (lines 99–103) with a small pulsing dot (`.dot`) and step number in clarity color.

**Subject-as-a-switch IA:** The STEPS array (lines 293–295) drives the animation delay; each beat is queued with `b.style.animationDelay = reduce ? "0ms" : "${i * 220}ms"`. No interactive switching; beats reveal sequentially on page load.

**Motion presence:**
- `.beat` entrance: `@keyframes rise` (lines 95–96), 520ms, cubic-bezier eased, staggered per index (0ms, 220ms, 440ms, 660ms for the four beats).
- `.beat-eyebrow .dot` glow: `box-shadow: 0 0 10px var(--clarity-glow-soft)` (line 103).
- Reduced motion (lines 179–183): animation collapses to none, opacity stays 1.

**Register & content structure:**
- Beat 1 (enable): `.enable` section with `.ln` rows (key-value pairs) showing agent names, vault promise, consent framing (lines 111–115).
- Beat 2 (swarm): `.swarm` with `.agent-post` entries, each with `.ap-hd`, `.ap-name`, `.ap-lane`, `.ap-src`, `.ap-cand`. Three agents (analyst, sdr, auditor) with lane-coded left borders (lines 119–132).
- Beat 3 (try-liminal): `.reads` section with `.read` items, either `.inlane` (in-lane read with work) or `.refused` (refusal + redirect reason, line-colored). `.correct` box shows a correction capture with tags (lines 148–160).
- Beat 4 (install): `.install` with prose, `.offer` pill buttons, and a footnote mentioning fixture-mode (lines 162–173).

**Color/type usage:**
- Tokens from `design-tokens.css` (line 49): `--clarity`, `--text`, `--text-mid`, `--text-dim`, `--text-faint`, `--frame-bg`, `--frame-border`, `--card-border`, `--diligence`, `--outreach`, `--judgment`, `--connection` (for register coding).
- Font stack: `--mono` (Geist Mono, googleapis line 46), `--serif` (Perfectly Nineties from brand-upgrade.css), `--sans` (Geist).
- No Newsreader. Comment on line 38 flags that this is canon-safe (no local overrides).

### Interaction facts

**No click handlers or state toggles.** This is a read-only terminal render. The beats auto-advance on page load via staggered animation delays (lines 293–296). The `.ready` class is added to body on requestAnimationFrame (line 296), triggering opacity fade-in (line 62).

**Semantic structure for screen readers:**
- Each beat has `aria-label` (e.g., "Beat 1 of 4 · Enable the plugin", line 203).
- The `.term` region has `role="region"` and `aria-label` (line 191).
- No keyboard shortcuts in this cut; it's a presentation surface.

**Loop expression:**
- Beat 1: the consent gate (enabling the plugin).
- Beat 2: the onboard-swarm (each bounded agent reads its source in parallel, posts a candidate).
- Beat 3: the loop in 60s (three agents read, disagree, you correct, correction seals).
- Beat 4: install the desktop app so the vault persists.

This is the plugin-surface entry (G1 gap from REFACTOR_PLAN). It shows the loop sequence compressed but unambiguous.

**Supporting files:** None in cuts/05-plugin-seed/ directory. The HTML is self-contained.

### Design-system usage

**CSS file links (lines 49–52):**
```
<link rel="stylesheet" href="../design-system/tokens/design-tokens.css">
<link rel="stylesheet" href="../lib/cut-shell.css">
<link rel="stylesheet" href="../lib/brand-upgrade.css">
```

**Token names found:**
- Clarity & accent: `--clarity`, `--clarity-glow-soft`, `--clarity-bg` (lines 101, 102, 103, 115, 125, 126, 127, 142, 143, 145, 156–157).
- Register colors: `--diligence`, `--outreach`, `--judgment`, `--connection` (lines 115, 120–122, 125–127, 136–143, 145–146).
- Text hierarchy: `--text`, `--text-mid`, `--text-dim`, `--text-faint`, `--text-mute` (lines 91, 107, 108, 130, 139, 144, 145).
- Surface: `--frame-bg`, `--frame-border`, `--card-border` (lines 70, 71, 72, 97, 102, 141, 158).
- Spacing: rendered via hardcoded px (margins, padding in lines 99–100, 110–112, 127–131, etc.). Some use custom properties like `--space-*` implicitly or via margin-top/padding defaults, but mostly manual px.
- Typography: `--fs-mono-xs`, `--fs-mono-sm`, `--mono` (font-family), `--serif` (lines 90, 124, 128–130, 144, 164).
- Letter-spacing: `--ls-mono-sm` (lines 85, 166, 168).
- Easing: `--ease-out-quint` (line 95).
- Transitions: `var(--ease)` (line 451 in any inherit context, though line 95 hardcodes the ease).

**Shared components:**
- `.titlebar`, `.lights` (window chrome).
- `.beat`, `.beat-eyebrow` (reveal animation container).
- Monospace font stack for terminal aesthetic.
- No local token redefines in the inlined style block (lines 54–184).

### Feel/grammar note

Terminal-session register: the cut reads as a live CLI session unfolding, with step-by-step reveals mimicking a user running commands and seeing output. The language is operational (beat 1: enable, beat 2: read sources, beat 3: deliberate, beat 4: persist). Register is bounded-agent doctrine, phrased as agent names + lane labels + refusal logic. Tone: matter-of-fact, no speculation.

---

## cuts/06-margin-read.html

### Visual facts

**Layout structure:** Desktop app window (max-width 1180px, margin auto, 2-pane grid: 196px rail + flex canvas). Window chrome with macOS lights + "Liminal / Today" titlebar (lines 492–496). The rail (sidebar, lines 500–509) lists agents (Judgment, Synthesis, Diligence, Outreach, Watch, Mirror) with pip color indicators. Canvas (lines 513–596) is the main reading surface.

**Surface zones:**
1. `.head` — eyebrow + h1 title + lede (lines 514–517).
2. `.cols` (grid 1.15fr 1fr, lines 520–588) — left col has `.read` (the held read), `.refusal` inline, `.corr` (corrections), receipt. Right col has `.next` (close-loop decision box with outcomes), `.corr` (mirror note).
3. `.tray` (lines 591–593) — drag zone for new reads, dashed border.
4. `.foot` — reentry framing (line 596).

**Marginalia layer (staged guided reveal):**
- `.ed-note` elements (lines 370–397): positioned absolutely, max-width 244px, font-family `--hand` (Caveat), color `var(--signal)`, opacity/transform initially 0, fade-in on `.show` class. Positioned relative to target elements via JS (positionNote function, lines 659–692).
- `[data-annotation]` attribute on live elements (vault pill, rail, read, refusal, corr, next, tray). Each has a pseudo-element `::after` (lines 400–410) that draws a spotlight ring (border 1.5px, rounded, opacity 0).
- Body class `.walking` dims non-spotlight elements to opacity 0.4 (line 414).
- `.guide` dock (lines 602–609, 422–486): fixed bottom-center, shows hint text + progress dots + nav buttons. Driven by the walk engine.

**Motion presence:**
- Initial fade-in: body opacity 0→1 on `body.ready` (lines 61–62).
- `.ed-note` entrance: opacity 0→1, translateY 4px→0, 320ms ease (line 388).
- `[data-annotation]::after` spotlight ring: opacity 0→0.85, scale 0.985→1, 320ms (line 409).
- `.sealed.show` rise animation (line 331): `@keyframes rise` (line 340), 360ms ease.
- `.guide` progress dots pulse when idle (lines 479–483): `@keyframes gpulse`, opacity 0.8↔1, 2.6s.
- Reduced motion (lines 415–419, 484–486): transitions collapse to 1ms linear, animations disabled.

**Color/type usage:**
- Tokens from `design-tokens.css` (line 52): `--bg`, `--text`, `--text-mid`, `--text-dim`, `--text-faint`, `--frame-bg`, `--frame-border`, `--rail-bg`, `--signal`, `--clarity`, `--diligence`, `--judgment`, `--synthesis`, `--outreach`, `--watch`, `--expression` (registers via pips).
- Font stack: `--sans` (Geist), `--mono` (Geist Mono), `--serif` (Perfectly Nineties), `--hand` (Caveat, loaded line 49).
- Gradient background (lines 66–68): radial-gradient with `var(--diligence-bg)` (rgba tone).
- Register pips (lines 164–169): agent colors coded via register custom properties.

### Interaction facts

**The walk engine (lines 623–805):**
- STEPS array (lines 627–635) maps loop order: tray → rail → read → refusal → corr → next → vault. Each step has `target` (data-annotation name), `side` (left/right/above/below for note positioning), `text` (the founder's annotation).
- `start()` adds `.walking` class to body, activates guide dock (line 744).
- `goto(i)` (lines 717–740): scrolls target into view, applies `.spotlight` class to `[data-annotation="${target}"]`, calls `renderNote(i)` to position and show the `.ed-note`.
- `advance()` (line 749): if walk not started, calls `start()`; if in progress, calls `goto(idx + 1)`; if at end, calls `exit()`.
- `exit()` (lines 757–765): removes `.walking` class, clears spotlights, fades out note, removes note element after delay.

**Keyboard & click:**
- `⌘N` or `Ctrl+N` toggles walk on/off (lines 776–777).
- Arrow keys (← prev, → next) navigate steps when walk is active (lines 779–780).
- Esc exits the walk (line 781).
- Clicking the guide dock hint text starts the walk if not running (lines 768–770).
- Next/Exit buttons advance or exit (lines 772–773).
- Window resize repositions live note (lines 785–790).

**Outcome sealing (lines 793–804):**
- Clicking a `.outcome` button seals the verdict to the vault. The button click updates `.sealed-verdict` text, shows `.sealed` box (animation rise), marks outcomes disabled. The `.cal-num` updates from "7 of 9" to "8 of 10".

**State machine:**
- `idx = -1` = walk not started.
- `idx >= 0` = walk in progress, current step index.
- Guide dock shows `.guide-hint` when idle, `.guide-prog` (progress bar + step counter) when active.

**Loop expression:**
This cut visualizes the FULL loop in one re-entry frame:
- Tray (Capture): drag zone at bottom.
- Rail (Agency): the 12 bounded agents.
- Read (Read): the held slate with agent disagreements.
- Refusal (Refusal architecture): the explicit "not my ground" handoff.
- Corr (Record): the correction stream, the moat.
- Next (Decide/Seal): outcome buttons seal a verdict and timestamp.
- Vault (Persistence): the data store implicit in the design.

### Design-system usage

**CSS file links (line 52):**
```
<link rel="stylesheet" href="../design-system/tokens/design-tokens.css">
```

**Token names found:**
- Background & surface: `--bg`, `--frame-bg`, `--frame-bg-2`, `--frame-bg-3`, `--rail-bg`, `--card-border`, `--frame-border`, `--text-faint`, `--text-dim`, `--text-mid`, `--text`.
- Register colors: `--diligence`, `--judgment`, `--synthesis`, `--outreach`, `--watch`, `--signal`, `--expression` (lines 164–169, 236–237, 241–244, 252–254).
- Signal & alarm: `--signal`, `--alarm` (lines 107, 257, 284, 286, 325, 338, 453, 472).
- Accent/state: `--ui-focus-ring`, `--ui-state-success` (lines 285, 328, 333).
- Background tints: `--clarity-bg`, `--diligence-bg` (lines 149, 67).
- Spacing: `--space-2` through `--space-8` (lines 79, 109–111, 138, 147, 179, 201–204, 336–337, etc. mostly hardcoded px but CSS vars used in clamp/grid-gap).
- Typography: `--fs-mono-xs`, `--fs-mono-sm`, `--fs-base`, `--fs-md`, `--fs-lg`, `--fs-xl`, `--fs-mono` (lines 102–104, 141–145, 162, 189, 199, 209, 274–276, etc.).
- Letter-spacing: `--ls-mono-sm`, `--ls-mono`, `--ls-tight`, `--ls-display` (lines 104, 115, 143, 184, 194, 209, 227, 441).
- Line-height: `--lh-*` (lines 73, 199, 245).
- Radius: `--radius-1`, `--radius-2`, `--radius-3`, `--radius-4`, `--radius-pill` (lines 82, 114, 151, 221, 231, 251, 429).
- Easing: `--ease` (lines 155, 218, 282, 323, 451, 470).

**Shared components:**
- `.win`, `.win-bar`, `.lights` (window chrome, shared).
- `.rail`, `.agent` (agency sidebar component).
- `.canvas`, `.head`, `.eyebrow`, `.title`, `.lede` (layout primitives).
- `.read`, `.tag`, `.refusal`, `.actions`, `.btn` (read presentation).
- `.corr`, `.corr-row` (correction record component).
- `.next`, `.outcomes`, `.outcome` (decision/seal box).
- `.ed-note` (marginalia annotation — UNIQUE TO THIS CUT).
- `.guide`, `.guide-hint`, `.guide-prog` (walk dock — UNIQUE TO THIS CUT).

**No token redefines in the inlined style block** (lines 54–487). All color/space/type route through CSS custom properties.

### Feel/grammar note

Forensic, founder-facing register: the cut renders the loop as a founder would live it — reads held, corrections made, outcomes sealed, the record built. The marginalia (handwritten annotations via Caveat font) layer the founder's own voice onto the product surface, explaining each element in the loop. Register is calibration-focused (the correction stream is the moat; the mirror notes repose; outcomes calibrate the vault). Tone is intimate + bounded (12 bounded co-workers, explicit refusals, no external noise).

---

## Summary

**Cuts covered:**
1. **04-onboarding.html** (686 lines): Sequential first-run, 7 screens, step-pill progress, steprail jump-nav, live sigil evolution. Vanilla JS, no framework. Supporting CSS in `cuts/onboarding/onboarding.css`.
2. **05-plugin-seed.html** (302 lines): Terminal session, 4 beats auto-revealing, plugin entry (G1). Shows swarm coldstart + loop deliberation + install upsell. Vanilla JS, read-only.
3. **06-margin-read.html** (809 lines): Full-loop re-entry frame with staged marginalia walk. Founder sees the slate, the refusal, the record, seals an outcome. Interactive walk engine (⌘N to start, ←/→ to nav). Desktop app chrome.

**All three consume design-tokens.css (canonical), lib/brand-upgrade.css (faces), no local token redefines.**

**Unverified:** The live sigil SVG rendering in 04-onboarding.html (lines 559–586) could not be visually confirmed against audit-10-onboarding.png (image shows only a static screenshot of S01). The dots() and sigil() functions are code-only; I inferred their output from the function logic and the .tray-slot rendering call.
# Inventory: Cuts 08 & 09 — Custody + OSINT Loop

## cuts/08-liminal-custody.html

### Visual facts

**Layout structure:** Three-column grid (264px left-rail | minmax(0, 1fr) center | 392px right-panel) + 232px command-shell footer (lines 216–221). Left rail: operator state (sources, cases, beats). Center: map viewport (420px min-height) + event stream. Right: hypothesis board + reads + rules. Bottom shell: split 1.4fr | 1fr (console-left | console-right, line 268).

**Orbital-agency-diagram:** Viewport contains animated conic-gradient sweep (`@keyframes sweep`, lines 637–640) rotating 360deg over 16s, opacity 0.55, mix-blend-mode screen. No second animation state visible; single loop at constant speed.

**Subject-as-a-switch IA:** State machine driven by `state` object (lines 2342–2372): `step` (1–5), `ruleSaved` boolean, `activeCase` ("case1" | "case2"). Orchestrates all render() calls (line 2504). Five beats defined in `beatMeta` array (referenced but full array in HTML >2500). SEALED moment: the receipt artifact at footer (lines 2796–2812) dynamically injects a `.frame-receipt` div with "custody-packet · case-014 · 14 events · 3 guards · 1 contested · evidence integrity before command · device-local".

**Sealed-artifact rendering:** The vault moment is **rule persistence + receipt**. Rule saves at beat 4 (state.ruleSaved = true, line 2467; receipt shown lines 2703–2711). Visual: `.receipt` element (1px --connection-edge border, line 1054) displays "RULE-014 saved from CASE-014" (line 2707). Triggered by `saveRule()` listener (line 2401). Transitions from hidden (empty `rule-receipt`) to visible via conditional render (lines 2702–2714).

**Refusal-as-spatial rendering:** Guard banner (lines 936–944, --stability-edge accent) at beat 3+ contains field `.guard-banner` with title/meta/body. Visually marked by `--stability` color + dashed interior borders. The "contested" status appears on multiple `.status-chip.is-contested` elements (lines 415–420: --stability color/edge/bg). States: "open gap", "contested", "missing", "locked", "hinge", "default", "memory", "review", "request", "bounded" (lines 2302–2330).

**SVG map inside viewport:** Track lines (.track-line.track-a = --expression, .track-line.track-b = --connection; lines 1327–1335). Markers with pulse animation on `.marker.pulse` (lines 1381–1388, @keyframes pulse-ring). Heat-zone fills (rgba(240,64,64,0.1)) at line 1402–1406. Dashed connection-arc strokes (line 1390–1400). All rendered via SVG elements embedded in `.viewport` (line 642).

**CSS custom properties used:** --expression, --expression-bg, --expression-edge (lines 86–96, 167–170, 206–212, etc.). --stability, --stability-bg, --stability-edge (lines 146–150, 173–176, etc.). --connection, --connection-bg, --connection-edge (lines 721–722, 1334–1335, 1054, etc.). --agency (line 723, 994). --text, --text-mid, --text-dim, --text-faint (throughout). --frame-bg, --frame-bg-2, --frame-border (lines 232–235, 250–254, 264–266, etc.). --mono, --card-border (lines 159, 121, 278, etc.).

**Font stack:** `var(--mono)` for monospace (Geist Mono, line 34). Body inherits Geist sans (line 34). `.case-title` uses --serif (implied via context) or explicit sizing. Serif font not re-mapped in this cut; inherits from design-system.

**Motion presence:** Sweep animation (line 637–640), pulse-ring (line 1385–1388), button hover transforms (translateY(-1px), line 452–453), toast enter/exit (opacity + translateY, line 1273–1282), transitions on all interactive elements (line 1019: 160ms ease; line 1226: 160ms ease; line 1349: 220ms ease).

### Interaction facts

**State machine loop:** `render()` (line 2504) calls renderWorkflow(), renderSources(), renderCases(), renderBeats(), renderMain(), renderRuleArea(), renderConsole(), renderMap(), renderControls() sequentially. No async flow; all mutations are synchronous.

**Step navigation:**
- `nextStep()` (line 2433): advance beat, enforce rule-save gate at beat 4→5, case2 unlock at beat 5.
- `previousStep()` (line 2424): back-navigate, case2→case1 reset.
- `saveRule()` (line 2459): persist state.ruleSaved, advance to beat 4 if < 4, show toast.
- `resetDemo()` (line 2473): clear localStorage, reset state to defaults, full re-render.

**Event listeners:**
- Line 2401: save-rule-button → saveRule()
- Line 2402: open-second-case-button → conditional check, switch activeCase="case2", setState step=5
- Line 2413: reset-button → resetDemo()
- Line 2414–2415: prev/next step buttons → previousStep/nextStep
- Line 2416–2421: keydown Ctrl+Shift+R → resetDemo()
- Line 2586, 2765: case-button, step-button → addEventListener per element (dynamic)

**localStorage persistence:** STORAGE_KEY = "liminal-custody-beat" (referenced line 2354, 2376, 2478). `loadState()` tries parse, falls back to defaultState(). `persistState()` called after every state mutation (line 2375–2376).

**Toast notifications:** `showToast(title, body, alert=false)` (lines 2483–2492). Adds/removes `.is-visible` class, sets timeout 2600ms. Shows rule-save, gate-violations ("Rule required", "Save required"), demo-reset messages.

**Case-button handler:** Checks rule-saved state before case2 access (lines 2588–2590). Shows gated toast if attempt locked. Otherwise switches activeCase and re-renders.

**Step-button handler:** Validates step 5 requires ruleSaved (lines 2767–2769). Otherwise clamps target and re-renders.

**Map viewport mutations:** renderMap() (line 2743) manipulates SVG element opacities/classes based on beat.mapState object (lines 2746–2753). toggles pulse animation on `.marker-gap` (line 2753). No direct event handlers on map elements; all data-driven.

### Design-system usage

**CSS files linked:**
- Line 36: `design-system/tokens/design-tokens.css` (canonical tokens)
- Line 37: `design-system/components/framing.css` (.thesis-line rule, line 512)
- Line 38: `lib/cut-shell.css` (shared shell chrome)
- Line 39: `lib/surface-nav.css` (shared nav chrome)
- Line 40: `lib/brand-upgrade.css` (type + register accents)

**CSS custom properties consumed (token names):**
- --expression, --expression-bg, --expression-edge (primary accent, teal/cyan)
- --stability, --stability-bg, --stability-edge (alert accent, orange/amber)
- --connection, --connection-bg, --connection-edge (secondary accent, green)
- --agency (accent, used in .rule-preview .action on line 994)
- --text, --text-mid, --text-dim, --text-faint (text color hierarchy)
- --frame-bg, --frame-bg-2, --frame-border (surface layers)
- --card-border (inline element borders)
- --mono (font-family for monospace)
- --ease-spring (motion timing, used in brand-upgrade.css motion rules)

**Shared components from cut-shell.css:**
- `.frame` container (inherited dark background + frame-border)
- `.title-row`, `.product-row` nav chrome
- `.stage::before` radial-gradient backdrop (lines 50–56)
- Text color classes (--text-faint, --text-mid, etc.)

**Classes defined locally (08-only):**
- .custody-stage, .custody-frame, .custody-main (layout wrapper)
- .left-rail, .center-panel, .right-panel, .command-shell (grid children)
- .workflow-strip, .workflow-node, .workflow-glyph (workflow breadcrumb)
- .viewport, .viewport-label, .corner-pill (map container)
- .event-stream, .event-item, .event-dot (event timeline)
- .guard-banner, .guard-title, .guard-body (refusal banner)
- .rule-slate, .rule-preview, .rule-actions (rule draft area)
- .receipt, .receipt-glyph, .receipt-copy (save confirmation)
- .hyp-* (hypothesis card grid)
- .step-button, .beat-controls (navigation buttons)
- .toast (fixed notification, line 1258–1309)

### Feel/grammar note

**Operator register**: substrate-level custody workflow rendered as a four-stage narrative (watch-floor observes → deliberation → refusal/guard → review memory → sealed packet). Dark-field aesthetic (expression/stability colors as judicial decision markers). Motion is minimal, precise: sweep in background, pulse on anomaly, fade-in on rule save. Type: monospace for all metadata/controls, serif for titles. Tone is not urgent; it is deliberative—the vault moment is a quiet checkmark, not a flash.

---

## cuts/09-osint-custody.html

### Visual facts

**Layout structure:** Three-pane horizontal (232px left-rail | 1fr center | 250px right-rail) stacked to 1-column at <940px (line 319–331). Header: titlebar (11px padding, lights + chyron + vault-pill). Register tabs (reg-row, 9px padding). Body: `.cwrap` grid. Footer: 9px padding, monospace metadata. Min-height 560px on center pane (line 158).

**Observable ingestion + animation:** `.obs` elements fade in on stagger (opacity 0→1, translateX(-6px)→0) with 0.3s transition (lines 176–178). Each ingest iteration delays by 80*i + 40ms (line 540). Ten observations per case maximum. No looping; one-shot entrance per beat.

**Sealed-artifact moment — the DISPOSITION:** `.dispo` element (lines 272–274) hidden by default, shows on `dispo.in` class with `@keyframes rise` animation (0.5s ease). Renders "X cases sealed · doctrine R-001 active · latest case C-015 · disposition [result] · Y ontology nodes" (lines 674–677). Visual: teal border (--c-ok) + 5% teal background. This is the loop's **vault seal**.

**Vault pill** (line 375, 123): `.vault-pill.sealed` on color --c-ok when `p.vault.length > 0` (line 615). Text "VAULT · N SEALED" updates dynamically (line 614).

**Subject-as-a-switch IA:** `beat` state variable (0–5, lines 506) drives doBeat() state machine (lines 622–683):
- beat 0: ingest C1
- beat 1: deliberate + guard C1
- beat 2: sign durable doctrine R-001
- beat 3: ingest C2 with doctrine → re-rank (doctrine applies, actions flash)
- beat 4: seal / disposition artifact
- beat 5: complete (buttons disabled except reset)

Register switch (custody vs. discord) via `reg` variable (line 504), `switchRegister()` (line 718–723) applies REG[reg] object chrome labels (line 514–527).

**Forensic reads + verdict verdicts:** `.read` elements (line 215–225) have `data-v` attribute (supported|weakened|refused|contradicted). Left border color by verdict (lines 221–224: --c-ok|--c-weak|--c-refuse). Velocity: fade-in + slide-up (opacity 0→1, translateY(6px)→0) staggered 90*i + 60ms (line 561). Hypothesis bars (`.hyp-fill`) animate width over 0.6s cubic-bezier (line 244). Actions flash on re-rank (beat 3, line 664, `.act.flash` @keyframes line 255–256).

**Color palette (cut-internal tokens, lines 68–74):**
- --c-read: --clarity-500 (#8E66FB, deliberation)
- --c-refuse: --alarm-500 (#E5484D, refusal/guard)
- --c-weak: --amber-orn-500 (#F5A524, weakened)
- --c-ok: --connection-500 (#3EE878, supported/seal)
- --c-verdict: --wholeness-500 (#E90095, disposition)

**CSS custom properties used:** --clarity, --alarm, --amber-orn, --connection, --wholeness (via --c-* aliases). Also: --text, --text-mid, --text-dim, --text-faint. --frame-bg, --frame-bg-2, --frame-border. --mono, --sans, --serif (Newsreader). --radius-2, --radius-3, --radius-4, --radius-5. --shadow-card-lifted (line 96, box-shadow for .frame).

**Font stacks:** --sans (Geist), --mono (Geist Mono), --serif (Newsreader for case-title, metric-v, hyp-pct; lines 198, 205, 282).

**Motion presence:** Observation fade-in (0.3s, line 176). Read slide-up (0.32s, line 218). Hypothesis bar fill (0.6s cubic-bezier, line 244). Disposition rise (0.5s, line 273). Action flash (0.9s, line 256). Button hover transform (translateY(-1.5px), line 337). Button press scale (0.97, 0.08s, line 338). Reduced-motion override disables all (line 332–334). Magnetic spring motion on tabs/buttons (line 336, var(--ease-spring)).

### Interaction facts

**Loop driver — doBeat()** (lines 622–683): Five sequential beats managed by `beat` counter. Each beat calls session methods (ingest, commit, signRule, ingestWithDoctrine) and renders output.

- **beat 0→1:** `session = createCustodySession()` (line 625), render C1 title/sub, render observations (line 630), show "Specialists reading…" (line 631).
- **beat 1→2:** `session.ingest("C1", CASE_1_BUNDLE, facts)` (line 636), render reads/hypotheses/actions/metrics (lines 638–641), advance to sign beat.
- **beat 2→3:** `session.commit("C1", lastC1)` + `session.signRule("R-001", ...)` (lines 647–648), set rule to `.active` class (line 649), show "R-001 · ACTIVE" (line 650).
- **beat 3→4:** `session.ingestWithDoctrine("C2", ...)` (line 661), render with re-ranked actions + flash (line 664: `renderActions(res.case.actions, true)`), commit C2.
- **beat 4→5:** Call `renderProjections()`, show disposition artifact (line 678: `dispo.classList.add("in")`), disable step/run buttons (line 680–681).

**Control buttons:**
- btnRun: calls `run()` (line 725), auto-steps through beats every 1500ms (except beat 4: 0ms, line 690). Disables step/run, enables reset (line 687).
- btnStep: calls `doBeat()` once (line 726), advances beat counter. If beat >= 5, disables step/run.
- btnReset: calls `reset()` (line 727), clears timers, resets beat=0, clears all DOM, re-initializes to idle state.

**Register tabs (custody vs. discord):**
- Line 728–729: addEventListener on tabCustody/tabDiscord → switchRegister()
- switchRegister() (line 718–723): swaps `reg` variable, calls `applyRegisterChrome()` (relabels center content), calls `reset()` (clears all state and re-initializes beat=0).

**Event delegation:**
- Line 725–729: Direct addEventListener on btnRun, btnStep, btnReset, tabCustody, tabDiscord.
- Line 463–464: `reduce` = prefers-reduced-motion media query.
- Line 512: `after(ms, fn)` helper with reduce check: if reduce, setTimeout(fn, 0); else setTimeout(fn, ms).

**Specialist render functions (data-driven, no event handlers):**
- `renderObservations(bundle, caseId)` (line 530–542): creates .obs divs, stagger-animates via after().
- `renderReads(reads)` (line 544–563): creates .read divs with verdict data-v, layers (guard notes), stagger-animates.
- `renderHypotheses(hyps)` (line 565–575): creates .hyp bars, animates fill width.
- `renderActions(actions, flashTop)` (line 577–586): creates .act divs, applies .flash class if flashTop (beat 3 re-rank).
- `renderMetrics(c, doctrine)` (line 588–595): updates metric-band values.
- `renderProjections()` (line 597–617): reads session.projections(), updates ontology nodes/edges, audit log, vault count, event count.

**Session module (frozen kernel.bundle.js):**
- Imported `createCustodySession, CASE_1_BUNDLE, CASE_2_BUNDLE` (lines 459–461).
- Session methods: `ingest()`, `commit()`, `signRule()`, `ingestWithDoctrine()`, `projections()`.
- CASE_1_BUNDLE, CASE_2_BUNDLE are frozen observation arrays (original fixtures from hormuz.ts, not re-buildable).

**Keyboard support:** No explicit keyboard handlers in cut 09 (unlike cut 08 Ctrl+Shift+R). Focus ring on tabs/buttons via :focus-visible (lines 359–364: 2px outline --c-read color).

**localStorage:** No persistence in cut 09. State is ephemeral per session (reset clears beat counter and UI).

### Design-system usage

**CSS files linked:**
- Line 55: `design-system/tokens/design-tokens.css` (canonical, no override)
- Line 56: `design-system/components/framing.css` (.thesis-line rule)
- Line 58: `lib/cut-shell.css` (shared shell)
- Line 60: `lib/brand-upgrade.css` (type + register accents)

**Local token aliases (lines 68–74):**
```css
--c-read:    var(--clarity-500, #8E66FB);
--c-refuse:  var(--alarm-500, #E5484D);
--c-weak:    var(--amber-orn-500, #F5A524);
--c-ok:      var(--connection-500, #3EE878);
--c-verdict: var(--wholeness-500, #E90095);
```
These alias canon --clarity, --alarm, --amber-orn, --connection, --wholeness tokens with fallback hex values.

**CSS custom properties consumed directly:**
- --text, --text-mid, --text-dim, --text-faint (text hierarchy)
- --frame-bg, --frame-bg-2, --frame-bg-3 (surface layers)
- --frame-border (border color)
- --card-border, --card-border-2 (inline borders)
- --bg (body background)
- --mono, --sans, --serif (font families)
- --radius-2, --radius-3, --radius-4, --radius-5 (border-radius presets)
- --shadow-card-lifted (box-shadow on .frame)
- --ease-spring (motion cubic in brand-upgrade rules, line 336)

**Shared components from cut-shell.css:**
- .stage, .frame container (dark background + borders)
- Color variables inherited (--text-faint, --frame-border, etc.)

**Classes defined locally (09-only):**
- .titlebar, .lights, .chyron, .vault-pill (header chrome)
- .reg-row, .reg-tab, .transport, .t-btn, .beat-tag (register nav)
- .cwrap, .rail, .rail-left, .rail-right, .center (three-pane layout)
- .obs, .obs-top, .obs-src, .obs-sum (observation card)
- .classification, .case-eyebrow, .case-title, .case-sub (case header)
- .metric-band, .metric, .metric-k, .metric-v (hero stats)
- .sec-h (section header)
- .reads, .read, .read-top, .read-verdict, .read-layers, .layer (specialist read card)
- .hyp, .hyp-bar, .hyp-fill (hypothesis bar chart)
- .actions, .act, .act-rank, .act-label, .act-note (recommended next move)
- .brief, .rule, .rule-meta (operator review rule box)
- .dispo, .dispo-h, .dispo-row (sealed disposition artifact)
- .spine-stat, .applies, .audit, .prov (ontology + audit right-rail)
- .infra, .infra-row (live provenance rows, hidden by default)
- .frame-foot (footer metadata)

**a11y notes in code:**
- Lines 341–348: Contrast fix — --text-faint upgraded to AA-safe upstream (4.76:1 on --frame-bg).
- Lines 350–354: Touch target min 44px under coarse pointer.
- Lines 356–364: Focus ring via --c-read (brand-aware, 2px offset).

### Feel/grammar note

**Deliberation register**: The loop is staged as evidence ingestion → specialist reading → doctrine signing → re-ranking under doctrine → sealed disposition. Palette uses clarity (deliberation), alarm (refusal), amber (contested), connection (supported), verdict (disposition). Motion is purposeful: fade-in for observations, slide-in for specialist reads, bar animation for hypotheses, flash for re-rank action highlight. Type hierarchy: Newsreader serif for case titles (humanistic, approachable), Geist Mono for all metadata (crisp, forensic). Tone is architectural proof-of-mechanism—the loop runs in-page (frozen kernel), so every mutation is computed, not mocked. Vault seal is a rise-animation confirmation card showing doctrine captured as durable judgment.

# Liminal Prototype Surface Inventory — Part 5

## cuts/10-today.html

### Visual facts

Desktop app chrome via cut-shell.css (titlebar with traffic lights + title row, diamond glyph at left). Two-column grid layout under a centered 1080px max-width: left column holds "Needs a decision" hero card (paper-lift bg, tdy-decision class) + "Re-surfaced overnight" stacked secondary cards (tdy-resurfaced). Right column holds "Close the loop" hero card (tdy-loop) with centered CTA buttons + state mirror (tdy-state). Footer with tray entry point (dashed border).

Color/type usage: root-level CSS custom properties at lines 59-74 bind to canon tokens: `--paper` (var(--frame-bg)), `--paper-lift` (var(--frame-bg-2)), `--ink-clarity` (var(--clarity-500, #8E66FB)), `--ink-good` (var(--connection-500, #3EE878)), `--ink-warn` (var(--wholeness-500, #E90095)). All register-named (line comment 68-74). Font stack: Geist Mono (mono tokens, eyebrow/labels lines 114-117), Newsreader serif (display, lines 122-129), Geist sans (body text, lines 131-136). Initial-paint suppression: body opacity 0→1 on .ready class (lines 49-50).

Key visual regions:
- `.tdy-decision` (lines 163-169): the held-read hero card, margin-bottom-separated from resurfaced cards.
- `.tdy-verdct` (lines 184-191): red/warn italic serif title ("NOT READY · 4 fixes").
- `.tdy-tags` (lines 170-182): lane + almost-ready badges with colored borders derived from register tokens (clarity, amber).
- `.tdy-outcome` buttons (lines 293-313): choice buttons for "how it landed" (good/warn/neutral variants). Sealed state hides outcomes, reveals `.tdy-sealed` section (lines 315-325) with animation `@keyframes tdy-rise` (lines 325).
- `.tdy-cal` (lines 351-372): calibration ticker ("7 of 9 decisions calibrated") with `.tdy-bump` animation on increment (lines 365-366).

No animated orbital diagram; the re-entry loop is shown as static tiles (tray → slate → correction → vault is conceptual, not rendered as animation on this surface).

### Interaction facts

One real interaction: outcome-button click handler (lines 578-599 in inline script). Outcomes are buttons with data attributes `data-outcome` (verbal verdict) and `data-disp` (key for lookup). Clicking:
1. Populates `tdy-sealed-verdict` with the outcome text (line 585).
2. Updates `tdy-sealed-hash` with a deterministic seal stamp from SEALS object (lines 571-576), keyed on `data-disp`.
3. Adds class `is-sealed` to the loop container (line 589).
4. "Still open" disables calibration bump; others increment calibration counter (lines 591-598).
5. CSS class `.is-sealed` triggers display swap: outcomes fade, sealed verdict rises in (via animation, lines 315-325).

No state machine; purely CSS-driven state (the class toggle). No keyboard shortcuts. Vault pill in titlebar is display-only.

Loop-stage expression: The "tray" at bottom (dashed border, drag affordance, lines 547-550) is the entry point back to capture (tray→slate flow); the outcome buttons are the "Re-enter" stage completion (you say how the held decision landed).

### Design-system usage

Linked files:
- Line 41: `../design-system/tokens/design-tokens.css` (canon tokens, upstream).
- Line 43: `../lib/cut-shell.css` (chrome: stage, frame, titlebar).
- Line 44: `../lib/surface-nav.js` (loaded at line 606, not examined in detail here).

CSS custom properties from canon (all var() → upstream):
- `--frame-bg`, `--frame-bg-2`, `--frame-bg-3` (backgrounds, lines 60-62).
- `--text`, `--text-mid`, `--text-soft`, `--text-dim`, `--text-faint` (typography hierarchy, lines 65, 134, 254, etc.).
- `--clarity-500`, `--judgment`, `--connection-500`, `--wholeness-500`, `--agency-500` (register inks, lines 69-73).
- `--ease-out` (easing, line 66).
- `--mono`, `--display`, `--sans` (font families, lines 84, 122, 131, etc.).

Shared classes from cut-shell.css: `.stage`, `.frame`, `.titlebar`, `.lights` (title-bar traffic lights).

Per-cut aliases (lines 59-74) avoid redefining canon — they var() into it. This is CONTRIBUTING rule #1 compliance.

### Feel/grammar note

Register-named, canonical-first render; the re-entry surface as a "you held this, the daemon re-read it overnight, what happened?" moment — warm-ink palette, serif for the verdict, monospace for receipts and tags.

---

## cuts/11-govern.html

### Visual facts

Desktop app shell (cut-shell.css chrome: traffic lights, brand name "Liminal / Govern" in titlebar). Multi-pane layout:
- **Top bar (lines 49-60)**: Tab buttons (1–7 for Today/OKRs/The loop/Report/Mirror/Registry/Log) + ⌘K palette trigger + relationship selector (operator/oversight/public).
- **Left rail (lines 72-96)**: Evidence signals pane. Styled as tiles with macOS title-bar traffic-light glyphs (rendered via radial-gradient, lines 86-87) + "seated nib" connector (lines 79-81, a small dot to the left). Tray tiles are dashed-border, slate tiles solid. Signal flow is cut-01 vocabulary (sig, src, nm, act, rows classes).
- **Center work pane (lines 98-99)**: Scrollable; houses the active subject's read (sense tables, 4-register read, correction UI, findings).
- **Right rail (lines 370-395)**: Orbital agency diagram (SVG-based). Four register plates (diligence, synthesis, judgment, outreach) arranged in a circle; agent glyphs animate from queued (gray, line 381) → reading (pulsing glyph, line 382, @keyframes pulse-glyph at line 385) → complete (green) or refused (judgment red, line 384).
- **Bottom ribbon (lines 396-398)**: Hash-chain event log (event-type colored: corr=diligence, ref=judgment).

Color/type: Brand tokens loaded (line 29: design-tokens.css). Custom properties:
- `--bg`, `--frame-bg`, `--frame-bg-2`, `--frame-bg-3` (backgrounds, lines 43-45 via radial-gradient overlays).
- `--diligence`, `--depth`, `--judgment`, `--connection`, `--outreach`, `--alarm`, `--watch`, `--signal` (register inks + semantic colors, used throughout orbital SVG and register read).
- Font stack: Nineties Headliner (display, lines 35-36), Perfectly Nineties (serif, lines 37-40), Geist Mono (mono, line 43).

Key visual areas:
- **.subjects switcher** (lines 106-109): Grouped button set (spend, custody, etc.); one subject active (--diligence background).
- **.sense-h** (lines 134-137): Section header with agent-count badge (diligence color) + section title.
- **.tbl** (lines 138-143): Vendor/cost table. Flagged rows have alarm-bg. Total row has frame-bg-3 background and bold text.
- **The 4-register read** (lines 150-170): Each register (.reg) has a .rname header (register color applied via class, lines 158), .rbody (Perfectly Nineties serif), .amend button that appears on hover (lines 154-155). Corrected registers have a corrected background (diligence-bg gradient, line 159) + a .cmark checkmark (line 160-161).
- **.finding** (lines 202-243): Clickable provenance artifact. Contains finding-head (with badges, title, save amount), finding-body (evidence table, receipt, correct toggle). When .open, body shows. When .correcting, the correction box appears (lines 233).
- **Orbital rail** (lines 373-395): SVG with .agent-glyph elements (7–9px mono font, line 380). Refusal-arrow lines (.refusal-arrow, line 390) with opacity 0, animate to .55 when .active. Center-orb pulses when .convergent (fill-opacity .18, line 388), brightens when .sealed (fill-opacity .32, glow, line 389).

### Interaction facts

Tab switching (lines 454-461): data-go attributes on buttons; ⌘K opens palette (line 464, cmdk-btn id). Palette (lines 487-490): input + dynamic list, standard command-palette UX.

Relationship selector (lines 465-469): buttons toggle data-rel attribute on body (operator/oversight/public). Public mode hides the center work pane and shows a consent-boundary frame overlay (lines 418-428).

Subject switcher (lines 106-109): .subj buttons with .on class toggle; clicking updates the render loop (not detailed in HTML alone — JavaScript drives subject param).

Register amend (line 154-155): .amend button appears on .reg:hover. Clicking toggles .editing class (lines 162-169 show the edit form). Save/cancel buttons commit or discard (lines 166-167).

Finding click-through (lines 202-243): .finding with .open class shows .finding-body. Correction flow: .fc-toggle button (line 231) toggles .correcting on the finding (line 233 shows .fc-box becomes visible). Selecting a correction kind (.fc-kind button, line 235) and saving appends to the chain and marks .corrected (line 240 shows .fc-done appears).

Evidence pane (left rail): clicking a .sig tile toggles .open (line 96), expanding its .rows (line 95 show block when .open).

Orbital rail: no click handlers documented in HTML; the SVG glyph states (queued/reading/complete/refused) are driven by JavaScript based on agent status.

Loop expression: Today surface (tab 1) shows held decisions. The loop surface (tab 3) shows the read → correct → sign flow. Mirror (tab 5) shows calibration heatmap. The ⌘K palette drives action dispatch (Amend, Sign, etc.).

### Design-system usage

Linked CSS:
- Line 29: `../design-system/tokens/design-tokens.css` (canon).
- Line 30: `../design-system/components/framing.css` (component library, not examined in detail).
- Line 32: `../lib/cut-shell.css` (chrome).
- Line 33: `../lib/brand-upgrade.css` (legacy framing overrides, noted in memory as pre-lock; cert lines 34-46 use @font-face).

Custom properties used extensively:
- Register colors: `--diligence`, `--synthesis` (mapped to --depth), `--judgment`, `--outreach`, `--connection` (line 158-159 class-conditional color).
- Semantic: `--alarm`, `--watch`, `--good`, `--signal`.
- Backgrounds: `--diligence-bg`, `--judgment-bg`, `--alarm-bg`, `--connection-bg`, `--depth-bg` (gradient or tint overlays, lines 119-129, 159, 181, etc.).
- Edges: `--diligence-edge`, `--judgment-edge`, `--alarm-edge`, `--card-border`, `--frame-border`.

Shared components: .shell, .rb-top (ribbon top), .mid (3-pane grid), .work (center pane), .rail-l, .rail-r (from cut-shell.css).

### Feel/grammar note

Judgment-forward, correction-primary; a cockpit for reading agent disagreement and appending corrections to a chain. Register colors as primary semantic signal; monospace for receipts and hashes; Perfectly Nineties serif for the 4-register reads themselves.

---

## index.html (root catalog)

### Visual facts

Minimal catalog front door. Centered column (max 640px) with header + demo card list + footer.

Header (lines 82-116):
- Wordmark: diamond glyph + "Liminal" display-font title (lines 88-107).
- Lede: italic serif statement "Judgment infrastructure for founders..." (lines 109-116, using local brand stack Nineties Headliner + Perfectly Nineties).

Demo cards (lines 119-129): A flex column of cards, gap 1px (border-top effectively stacked). Each card is a link (lines 131-144) with hover behavior (background shift to accent-bg, arrow opacity/translate).

Card content per demo:
- Tag (demo-tag, mono, 9px, accent color).
- Title (demo-title, display font, 18px, accent hue on hover → darker).
- Description (demo-desc, sans, 13px, text-mid).
- Arrow (positioned absolute right, opacity 0 by default, opacity 1 + translate 0 on hover, lines 176-186).

Color usage: All via CSS custom properties. --accent binds to --clarity (#8E66FB). --bg, --frame-bg, --card-border sourced from design-tokens.css. Font stack: NinetiesHeadliner + PerfectlyNineties (defined as @font-face, lines 22-46, root-relative URLs). Mono is Geist Mono.

Cards are truly static; each href points to a cut (01-slate-tray.html, 06-margin-read.html, 00-agency.html, etc.).

### Interaction facts

Navigation only: each demo-card is an href. No JavaScript in index.html itself. Hover states are CSS-only (transition: background/opacity/transform).

### Design-system usage

Linked: Line 14, `design-system/tokens/design-tokens.css`.

Custom properties: --bg, --frame-bg, --frame-border, --text, --text-mid, --text-faint, --accent, --accent-bg, --card-border.

Font stacks inline at lines 22-46 (@font-face for Nineties Headliner + Perfectly Nineties weights). No shared component classes; layout is CSS Grid + Flexbox primitives.

### Feel/grammar note

Public front door; curated demo listing with the locked brand stack and minimal ornament. Each card links to a cut; the register-color accent appears sparingly (tag + arrow).

---

## cuts/_demo-lan.html

### Visual facts

Four-beat demo launcher (FEEL → UNDERSTAND → PRICE → PROVE). Styled with desktop app chrome (cut-shell.css titlebar). Beats are arranged in a 2-column grid on desktop (lines 50, responsive).

Header (lines 102-115):
- Eyebrow with dot (cerulean accent).
- H1 with em emphasis in italic cerulean (line 104: "bottleneck moved from information to judgment").
- Lede explaining the four beats.
- "It's real" chip (lines 108-114): inline-flex badge with lead + list of attributes (local-first, signed event log, vault.db, ed25519).

Beat cards (lines 117-171): Each is an anchor with:
- Beat number (40px serif, cerulean, opacity .9).
- Arc + where (beat-arc class, lines 59-62).
- Narrative paragraph (13.5px, text-dim).
- Handwritten note (Caveat font, 17px, cerulean, lines 65).
- Guardrail footer (dashed top border, monospace, faint, lines 67-68).
- Tag + arrow (top-right positioned absolute, lines 71-76).

Cards have hover state (border-color lightens to cerulean-edge, translateY -2px, background to frame-bg-3).

Color: cerulean (lines 32, 36, 38, 44, 46, 60, 76) defined as #197EEB (computed from --cerulean or hardcoded). Backgrounds use --frame-bg, --frame-bg-3. Beats are styled with card-border and frame-bg.

Font: Nineties Headliner (display, beat numbers), Geist Mono (beat-arc, tag), Caveat (beat notes).

### Interaction facts

Navigation only. Each beat card is an href (lines 120, 133, 146, 160). Beat 4 opens a new tab (target="_blank rel noopener, line 160).

Tags show offline/online status (lines 121, 134, 147, 161) with colored borders (offline: clarity, online: watch color).

### Design-system usage

Linked: Line 22, design-tokens.css. Line 23, cut-shell.css. Line 24, brand-upgrade.css.

Custom properties: --bg, --frame-bg, --frame-bg-3, --text, --text-faint, --text-dim, --card-border, --cerulean, --cerulean-wash, --cerulean-edge, --hover.

Font stack: Nineties Headliner (display, defined in _demo-lan.html itself via @font-face), Perfectly Nineties (sans), Geist Mono (mono), Caveat (handwriting note font).

### Feel/grammar note

Guided walkthrough; four beats in order, each card a stepping stone. Cerulean accent (not the canonical violet clarity) + Caveat handwritten notes for humanity + the "it's real" chip establishing veracity.

---

## cuts/_demo-lan-stitch.html

### Visual facts

Same four beats as _demo-lan.html, but stitched into a single page with in-page iframe swapping (no navigation flashes). Layout:

Top bar (lines 29-43): Fixed position, centered. Inner div with flex layout: home link (diamond, cerulean) + 4 beat buttons (beats 1-3 + beat 4 marked "tab"). Buttons show .num (beat number) + label. Beat 4 opens in a new tab (marked with .ext "tab" label, line 43).

Stage (line 46): Position absolute, contains frame-wraps (lines 47-49). Each frame-wrap has data-beat attribute (1-3) and an iframe inside (created on-demand by JavaScript).

Presenter note (lines 52-63): Fixed left-bottom, initially hidden (opacity 0, transform translateY 6px). Body.note-on class brings it in (transition 260ms). Shows the beat narrative in Caveat handwriting + a signature (sr).

Note toggle button (lines 59-63): Fixed left-bottom, click or Cmd-N to toggle note visibility.

### Interaction facts

JavaScript (lines 92-157):
- Frame-wrap iframes are created on-demand (ensureFrame function, lines 113-121) when a beat button is clicked. Next beat is preloaded for instant advance (line 127).
- Arrow-key navigation: ← and → to advance/retreat (lines 139-144).
- Cmd-N / Ctrl-N to toggle presenter note (lines 149-151).
- Beat 4 opens a new tab instead of swapping iframes (line 124).
- URL parameter ?start=N sets the starting beat (line 155).

SRC object (lines 93-97) maps beat numbers to iframe src URLs, with ?embed=1 parameter (suppresses the cut's own rails/notes).

NOTE object (lines 98-103) maps beat numbers to presenter notes.

### Design-system usage

Linked: Line 21, design-tokens.css. Line 22, cut-shell.css. Line 23, brand-upgrade.css.

Custom properties: --bg, --frame-bg, --text-faint, --text-dim, --card-border, --cerulean.

Font: Caveat (presenter note), Geist Mono (beat rail).

### Feel/grammar note

Smooth presenter-mode walkthrough; no navigation friction, presenter notes appear on demand (Cmd-N), beats advance with arrow keys. The four-beat narrative is protected from flashing/reload.

---

## cuts/govern-run.json

### Visual facts

Data file (not rendered directly; consumed by 11-govern.html). Contains a vendor list (VENDORS array, lines 8-100+) with per-row structure:

```
[ name, plan, count, cost, optional-flag ]
```

Example (lines 10-14): "Cursor", "Business", 30 users, $1200 cost. Some rows have a "flag" indicator (line 32: Figma, line 45: Vercel).

### Interaction facts

This is data, not a surface. The cut 11 consumes it to populate the sense table (vendor list, costs). No interaction documented in the JSON itself.

### Design-system usage

N/A (data file).

### Feel/grammar note

Spend audit dataset; realistic vendor roster with user counts and costs. The "flag" entries mark spending anomalies (flagged in the cut as items needing attention).

---

## cuts/surfaces.js

### Visual facts

Not a rendered surface; a data registry (export const SURFACES array, lines 19-114).

Defines every cut in the catalog with metadata:
- num: slot number (00–11, plus molehunt, team-drift).
- file: href path.
- name: display name.
- meta: short descriptor.
- badge: maturity (live, retired, etc.).
- survey: boolean (appears in console grid).
- alt (altitude): L1-founder, L2-team, L3-high-stakes, L1→L2, L1–L4.
- framing: wedge or infra.
- stage: loop stage(s) the cut owns (Capture→Read→Decide, Re-enter, full-loop, etc.).
- jump: lede/description.
- check: verification checklist.

Groups (lines 20-113):
- Live cuts (01–11, molehunt, team-drift).
- Scaffold + exploration (template, console, compare, ledger-directions).
- Standalone consoles (molehunt, team-drift).
- Embeds (slate-tray-demo, vault-demo, agent-hack).
- Specimens + design system (index, design-system.html, atlas, etc.).
- Archive · retired cuts (old 00-hero, speedrun variants, onboarding, etc.).
- Archive · root-experiments (3D ontology variants).
- Frozen baselines (pre-pivot v0.2, space-v1).

### Interaction facts

This is a data structure, not a live surface. Used by _console.html and _compare.html to populate navigation and cut matrices.

### Design-system usage

N/A (data file).

### Feel/grammar note

Canonical cut inventory; single source of truth per CONTRIBUTING rule #5. All coordinates per TAXONOMY.md v2.

---

## cuts/cut-manifests.json

### Visual facts

Not rendered; a forensic audit manifest (lines 1–295). Extracted evidence of each cut's state, proof claims, choreography, and portability. Schema fields (lines 10-22):
- coordinate, role, primitiveMadeVisible, loopTested, subjectDomain, stateReality, proof, choreography, portability, monolithic, orphanedSpecRefs, openQuestions.

Each cut entry (e.g., lines 35-56 for 00-agency) has:
- path, coordinate, role, primitiveMadeVisible, proof claim, monolithic status, open questions.

Key findings:
- Cut 01 is the only modular cut (consumes lib/boot.js, line 70: monolithic: false).
- Cut 03 is mock; illustrative, not measured (line 104).
- Cut 08 is ~104KB monolithic; largest file, flagged for size (line 189).
- Cut 09's osint-kernel.bundle.js is a frozen artifact from ../liminal-test (source not in workspace, line 205).
- Cut 11 grew +722 lines recently; product logic accreting in a demo file (line 252).
- Orphaned spec refs (not found in repo):
  - CUT_CONSOLIDATION_MAP.md (cut 00, line 50).
  - HCI_AUDIT.md, RECONCILED_SYSTEM.md (cut 11, lines 247-248).

### Interaction facts

Data only.

### Design-system usage

N/A.

### Feel/grammar note

A post-audit forensic record; evidence-only, unknowns marked "not found in repo."

---

## Image Evidence

**audit-00-index.png**: The public front door (root index.html). Shows the Liminal wordmark, lede, and a grid of demo cards (Hero landing pass · Slate tray · Agency master · Margin-read · Governi · Custody · OSINT · Molehunt · Team Drift · embeds). All cards are clickable links to cuts.

**audit-01-hero.png**: Cut 01 (Slate tray) in action. Shows the three-pane layout: left tray (signals, TicketCreated from live sources), center (a Speedrun partner call being read by agents across four registers: Diligence/Outreach/Judgment/Synthesis), right orbital rail showing agent status (reading, complete, refused). The verdict bar shows a refusal (Outreach refused out-of-lane). The footer shows a hash-chain event.

**audit-02-speedrun.png**: A speedrun hero moment (appears to be a large viewport screenshot showing the core loop animated or staged). Overlaid text "A founder OS where AI agents disagree, deliberate, and prompt you. The corrections are the moat." Shows the re-entry loop with mirrored reads and a correction-stream telemetry sidebar.

**audit-03-canon-frontdoor-full.png**: A full-screen walkthrough (appears to be either cut 06-margin-read or a presentation overlay). Multiple cards and panels visible: "Founding round · close decision", "Eng hire · senior backend", "Design system · v2 migration", "90-day self · pattern check", "Field Studio · v3 rebrand" on the left. Center shows a mix of content reads ("Read your own pattern", "Read your cofounder thread", "Read your work-in-progress"). A footnote reads "1 captured" and markup visible for loop closures and calibration.

---

## Shared Machinery: surfaces.js & cut-manifests.json

**surfaces.js** (lines 1–120): A registry of every surface coordinate, maturity, loop stage, altitude, framing. Used by _console.html (_console.html is a directory/substrate console) and _compare.html (A/B harness). Single source per CONTRIBUTING rule #5.

**cut-manifests.json** (lines 1–295): Forensic audit of each cut's evidence, portability, monolithic status, orphaned spec refs. Every claim sources to "cuts/TAXONOMY.md", "README.md", "grep results". Open questions documented (e.g., cut 08 file size, cut 09 kernel opacity, cut 11 product logic accrual).

Both are non-rendered data structures that inform the catalog's governance and audit.

---

## Summary of Surfaces Covered

| Surface | Loop Stage(s) | Altitude | Visual Substrate | Key Interaction |
|---------|---------------|----------|------------------|-----------------|
| **cut/10-today.html** | Re-enter | L1-founder | Desktop app, two-column, re-entry cards + close-the-loop hero | Outcome button click → seal verdict + bump calibration |
| **cuts/11-govern.html** | Full-loop | L1→L2 | Desktop cockpit, 3-pane + orbital rail, ⌘K palette | Tabs to switch surfaces; amend register; ⌘K to dispatch |
| **index.html** | — | — | Minimal catalog front door, card grid | Static nav links to cuts |
| **cuts/_demo-lan.html** | Full demo | — | Four-beat launcher, 2-column grid + title | Links to four beat surfaces (beats 1-3 local, beat 4 external tab) |
| **cuts/_demo-lan-stitch.html** | Full demo | — | Iframe stitch, beat rail top + presenter note left-bottom | Beat buttons swap iframes; ⌘N toggles presenter note; arrow keys advance |

---

## Presentation Legibility Observations (Recent Git History)

From git log noted in assignment:
- Commit 1b3ff6b: "Merge: lift presenter note above chain footer (no overlap)" — maps to _demo-lan-stitch.html's presenter note positioning (lines 52-63, bottom fixed but lifted above the footer).
- Commit 7f03407: "demo(lan): lift presenter note above the chain footer (no overlap)" — confirms _demo-lan-stitch.html change.

Both cuts' presenter notes appear to be anchored to avoid covering the bottom ribbon (chain event log in cut 11, tray entry in cut 10).

---

End of Inventory. All surfaces read in full. Screenshots examined. Shared machinery documented.
