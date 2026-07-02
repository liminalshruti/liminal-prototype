# Liminal Prototype Cuts: Spatial Rhythm & Density Critique
## Internal Coherence Audit (1440px render wall)

---

## 1. The Emergent System — Shared Grammar

### Frame Skeleton
**Rule:** All cuts inherit a three-pane macOS-window frame: titlebar (traffic lights + brand wedge) → three-column grid (left rail | slate/work | right rail) → footer ribbon. Cut-shell.css §1-33 codifies this layout as the *invariant container*.

**Evidence:**
- Cut 00 (wall-cut00): 280px left rail (Signals) | 1fr center (Agency read) | 320px right rail (Orbital diagram). Grid-template-columns hardcoded at line 42-68.
- Cut 01 (wall-cut01): Same 3-pane skeleton, visible in layout—left tray rail, center slate, right orbital agency diagram.
- Cut 06 (wall-cut06): Left 196px rail (agents), center work, right modal.
- Cut 08 (wall-cut08): Three-pane horizontal: 264px left | center | 392px right; layout mirrors but with different semantics (custody sources vs. signals).
- Cut 09 (wall-cut09): 232px left rail | 1fr center | 250px right rail.
- Cut 10 (wall-cut10): Two-column grid (card stacks left | outcome buttons right), diverges from three-pane — *first major frame restructure* (see Contradiction #2).
- Cut 11 (wall-cut11): Three-pane, but top tab bar (5 PRICE / AGENCY / PROVE) added, left rail hidden in default view, center dominates.

**Spacing rhythm within frame:**
- Titlebar: 11px padding (cut 09 line 81), 9px padding (cut 08 line 49).
- Left/right rail padding: 12px–14px (cut 00), 14px border-inset.
- Center work padding: 18px–24px (cut 00 line 56: `.work { padding: 18px 24px }`), 16px (cut 01 line 100), 20px+ (cut 08).
- Footer padding: 9px (cut 08/09), varying in others.

**Verdict:** ✓ The three-pane macOS frame is canonical. All cuts follow it **except** cut 10 and cut 11, which restructure the layout for domain-specific reasons.

---

### Density-as-Choice: Rest vs. Grey Texture

**Rule:** Dense sections (reads, tables, charts) are balanced by *deliberate empty space* above and below. Each section has a clear white-space separator (margin, padding, border gap).

**Evidence (visual squint):**

- **Cut 00 (wall-cut00):** Evidence panes have 14px top margin (line 141). Register reads (.reg) are staggered vertically with 12px–16px margin between blocks. Sealed stack modal uses padding 16px inside cards. **Rest observed:** generous top/bottom margins around orb, spacious 3-column grid.
- **Cut 01 (wall-cut01):** Slate area has min-height 240px empty (line 291), brief area padding-top 12px (line 285). Orbital rail sits at 280x320 fixed; no overflow textile. **Rest observed:** large gap between header and entry-door cards, orbital diagram has breathing room below.
- **Cut 02 (wall-cut02):** Three-pane reads horizontally. Left pane (14 days stream) shows .stream-item rows, each 32px tall with 1px gaps. Center (contradiction narrative) is dense: two-column grid of cards (lines 209–253), no padding between rows. Right pane (audit trail) is monospace metadata, line-spaced tightly (lines 287–326). **Density issue:** Center + right are packed; left is calm. *Asymmetric rest* (see Contradiction #3).
- **Cut 03 (wall-cut03):** 12-week calibration grid, 1px gap (line 171), 1px border. No padding inside cells except count + tag. Header has ample spacing (8px line-height difference, line 113). **Rest observed:** Cells are tight; margins above/below grid are ~24px. Drill panel (below grid, 336–348) has 16px padding. **Accretion risk:** Cell interior is fully packed; no breathing room inside cells. *Suspected as intentional (data viz convention, not UI accretion).*
- **Cut 04 (wall-cut04):** Onboarding screens are staggered vertically (lines 65–128). Each `.screen` has padding 56px 64px 40px (line 116). Buttons get 0.22s ease-spring hover transform (line 81), magnetic. Spacing is **generous:** screen padding + inter-element gaps combine to ~80–90px margins top/bottom. **Rest observed:** Strong visual breathing; accretion signals are LOW.
- **Cut 05 (wall-cut05):** Terminal session, monospace, 13px line-height (line 90), beats staggered via animation-delay (220ms, line 298). Padding inside .beat is 24px (line 99) on beat-eyebrow, 16px on body (line 100). **Rest observed:** Beats rise in sequence, each with 220ms delay = **temporal rest**, not spatial. Vertical spacing is rhythmic, not packed.
- **Cut 06 (wall-cut06):** Left rail 196px, canvas (2-column grid 1.15fr 1fr), footer. Rail has 14px padding (lines 500–509). Canvas sections (.head, .cols, .tray) are separated by 16px gaps. Marginalia (.ed-note) fade in at 320ms (line 388). **Rest observed:** Generous section spacing in canvas; rail is compact but necessary. Guide dock fixed bottom center with 12px padding (lines 422–486). Accretion is **LOW**.
- **Cut 08 (wall-cut08):** Left-rail operator sources (lines 112–296) show compact .source-item tiles with 8px padding (line 166), separated by 1px gaps. Center viewport has 420px min-height (line 645), map SVG inside. Right panel has 5% padding (line 1054). **Density observation:** Left rail is *intentionally* compact (operator watch floor aesthetic); center has breathing room (map context); right is dense metadata + rules. **Asymmetric, deliberate** (custody domain justifies it). No accretion.
- **Cut 09 (wall-cut09):** Three-pane observations. Left ingest rail is 6px padding (line 462), tight on purpose (watch floor). Center has 12px padding on case content (line 542), observation fade-in at 0.3s (line 176). Right ontology rail is 16px padding, sparse dotted graph (line 597). **Density:** Left + right are intentionally sparse; center is moderate. **Asymmetric, disciplined.**
- **Cut 10 (wall-cut10):** Two-column grid. Left column (held decision + resurfaced cards) has 24px padding, cards stacked with 16px gap. Right column (close-the-loop hero) has 20px padding + outcome buttons (44px min height each). Footer tray has 12px padding. **Rest observed:** Strong vertical breathing between card stacks. Accretion is **NONE**.
- **Cut 11 (wall-cut11):** Tab nav (6px height), center work pane dominates (padding ~20px). Left rail visible only on tab switch. Right rail is a scrollable ontology (sparse). **Rest observed:** Top nav is minimal; center work has generous padding. Accretion signals are LOW for the viewport.

**Verdict:** ✓ All cuts balance density with deliberate rest. **Asymmetry is intentional:** custodial domains (cuts 08–09) compress left rail for operator efficiency; reads (cuts 00–01, 06) breathe. No evidence of accretion in cuts 00–07, 10–11. Cut 08 line count (2,816 lines per inventory §) is large but *not accretion*—it's because the custody domain has semantic complexity (map SVG, multi-pane state machine). Verdict: **System is healthy; no filth found.**

---

### Spacing Rhythm: Card Insets, Rail Widths, Section Gaps

**Rule:** Padding, gap, margin should follow a consistent scale. Read from the tokens and HTML:

1. **Rail widths:** 196–280–320–392px.
   - Cut 00: 280px left + 320px right (18% + 20% at 1440px).
   - Cut 01: 196px rail-left (inferred from layout description), orbital rail 280x320.
   - Cut 06: 196px left rail, canvas flex.
   - Cut 08: 264px left, 392px right.
   - Cut 09: 232px left, 250px right.
   - **Rhythm:** Rail widths are *ad-hoc per domain*, not normalized. No token-based grid (e.g., `--rail-width: 280px`). *This is the first ambiguity* (see Contradiction #1).

2. **Card/tile insets:**
   - Cut 00: Tile padding 7px 9px (line `border-radius:5px;background:var(--frame-bg);padding:7px 9px`).
   - Cut 01: Entry door padding 16px–20px (line 541), brief-area padding 12px top (line 285).
   - Cut 02: Record card padding ~16px inferred (lines 221–222 borders), text 13.5px serif.
   - Cut 03: Cell interior has no explicit padding; count + tag sit at font-size 0.875rem (line 307).
   - Cut 06: Canvas padding 20px on sections, cards padding 12px–16px.
   - Cut 08: Source item padding 8px (line 166), rule box padding 12px (line 465).
   - **Rhythm:** Insets range 7px–20px, no unified scale. Some use 8–16px (fine-grain), others use 12–24px (medium). *No token-driven inset system detected* (e.g., `--pad-xs: 4px; --pad-sm: 8px; --pad-md: 12px`). *Ambiguity #1 deepens.*

3. **Section gaps (margin-bottom, flex gap):**
   - Cut 00: `.evidence { margin: 14px 0 }` (line 141), `.invoke { gap: 9px }` (line 76).
   - Cut 01: `.metric-band` (gap not visible, lines 361–383 grid but no explicit gap).
   - Cut 03: Grid gap 1px (lines 171), drill margin-top 16px (line 372).
   - Cut 06: Section gaps inferred ~16px (lines 520–588 .cols grid).
   - Cut 08: Event stream gap 8px (line 555), hypothesis grid gap 6px (line 577).
   - **Rhythm:** Gap/margin is 1–16px, context-specific (data table → 1px; card stacks → 9–16px). *No unified rhythm.*

**Verdict:** ✗ **Spacing rhythm is **inconsistent across cuts**. Rail widths, card insets, and section gaps are ad-hoc, not unified by a token. The best examples (cuts 04, 05, 06) use clamp() and consistent padding (16–24px), but others (cuts 03, 08) use domain-specific compaction. *This is Contradiction #1.*

---

### Alignment Discipline: Edge Coherence Across Panels

**Rule:** Internal grids within panels (left rail, center work, right rail) should align to a common baseline.

**Evidence (picking three renders):**

1. **Cut 01 (wall-cut01):** Left tray rail contains signal cards. Center slate contains composition area. Right orbital rail has SVG + coverage line. Vertically:
   - Tray cards appear to align at 16px left padding.
   - Slate area has 12px–18px padding from frame edge.
   - Right rail SVG is centered within 280px, no explicit padding (inferred flex: align-items center).
   - **Baseline check:** Tray items line up; center slate title aligns ~20px from left rail edge; right rail SVG is centered. *Horizontal edge alignment is WEAK* (visual squint shows ~4–8px variance due to padding asymmetry). *No shared grid-column baseline.*

2. **Cut 06 (wall-cut06):** Left rail (agents, 196px), canvas (2-column grid 1.15fr 1fr). Vertically:
   - Rail items (.agent) are left-padded 12px (inferred).
   - Canvas .head h1 is 20px from left canvas edge.
   - Canvas .cols grid aligns at column 0 (no explicit outer padding).
   - **Baseline check:** Left rail edges align; canvas column 0 aligns with right edge of rail. **Edges are coherent.** ✓

3. **Cut 08 (wall-cut08):** Left-rail sources (264px), center panel, right panel (392px). Vertically:
   - Left rail .source-item has 8px padding (line 166).
   - Center title "The watchfloor sees absence..." is 24px from left, top-aligned (lines 295–340).
   - Right panel rules are 12px padded (line 465).
   - **Baseline check:** Left rail edges are tight (8px); center title does NOT align with rail column (it's inset further). Right panel is independently padded. **Edges are NOT coherent.** ✗ (Intentional: custody domain has different semantics per rail; not accretion.)

**Verdict:** ✓ Alignment discipline is **domain-aware**. Some cuts (01, 06) align edges precisely; others (08, 09) deliberately misalign for semantic reasons (operator vs. read flow). *No contradiction; asymmetry is intentional and legible.*

---

### Component Spatial Consistency: Tile, Chip, Paper-Card

**Rule:** When the same component appears in different cuts, its spatial treatment should be consistent **or the difference should reflect domain, not drift**.

**Evidence:**

1. **Tray tiles (cuts 00, 01, 10):**
   - Cut 00 `.tile { padding: 7px 9px; margin-bottom: 6px; }` (line 73).
   - Cut 01: Tray tiles inherit from cut-01 HTML (lines 1030–1047), styled via inlined CSS. Tiles appear to have 8px padding, 1px gap (lines 295–296: `.opacity: 0.92` on hover).
   - Cut 10: Tray entry footer (lines 547–550) shows dashed border but tiles aren't visible in render (tray is a drop zone, not populated).
   - **Consistency:** Cut 00 (7x9px) vs. Cut 01 (8px inferred). *Variance: 1px*, negligible. *Consistent.*

2. **Paper-card disposition artifact (cuts 00, 01, 06, 10):**
   - Cut 00: `.page2` cards (lines 182–192) have 16px padding inferred (seal + text inside).
   - Cut 01: `.dispo-artifact` (line 870 hidden by default) has `da-bar` (stamp + title), `da-body` (4 sections), `da-foot` (hash). Padding ~16px inferred.
   - Cut 06: `.sealed` verdict box (line 331) has padding 12px (animated rise, line 340).
   - Cut 10: `.tdy-sealed` (lines 315–325) shows sealed verdict after outcome button click, padding 16px (lines 315–320 implicit).
   - **Consistency:** All use 12–16px padding on sealed cards. *Consistent.*

3. **Register read blocks (cuts 00, 01, 11):**
   - Cut 00: `.reg` (line 131) with `.rname` (line 133), `.rbody` (line 135), `.amend` (line 134). Padding inside .reg not explicit (border 1px, margin 12px top implying internal grid).
   - Cut 01: Does not show inline register blocks (cut 00 feature; cut 01 is slate tray entry).
   - Cut 11: `.reg` (line 150) with `.rname` header (register color, line 158), `.rbody` (Perfectly Nineties serif, line 159), `.amend` button hover (line 154). Padding inside .reg is 12px inferred (line 158 layout: display grid, gap 8px).
   - **Consistency:** Cut 00 (12px internal margins) vs. Cut 11 (12px grid gap). *Consistent.*

4. **Chips / badges / tags (cuts 01, 02, 03, 06, 08, 09):**
   - Cut 01: `.metric-band` 3-cell grid (lines 361–383), cells have 12px padding (inferred from layout).
   - Cut 02: Flags are colored spans, no explicit padding (rendered as inline text).
   - Cut 03: Cell tags (line 312) are ellipsis-truncated, 0.625rem font, no padding inside.
   - Cut 06: `.tag` elements (line 200) are inline-flex with 4px padding (inferred).
   - Cut 08: Status chips (line 415) have `border-radius: 3px`, padding 4px 8px (inferred from 14px height / font 12px).
   - **Consistency:** Chips range 0–8px padding; most are 4–8px. *Reasonably consistent for a small-scale component.*

**Verdict:** ✓ Tile, paper-card, and register components are spatially consistent across cuts. Chips are somewhat variable (4–8px), but within a reasonable tolerance. *No evidence of component drift.*

---

## 2. Contradictions — Ambiguities for Canon Inference

### Contradiction #1: Rail Width Normalization

**Cuts disagreeing:** 00 (280px left, 320px right) | 01 (196px left inferred, 280px orbital right) | 06 (196px left), 08 (264px left, 392px right), 09 (232px left, 250px right), 10–11 (variable).

**What each does:**
- Cut 00: Fixed 280px + 320px = 600px rails on 1440px viewport (41.7% chrome). Center slate is 1fr (~840px).
- Cut 01: Responsive; left shrinks at ≤1023px (line 692: `.rail-right max-width 360px + margin auto`). Orbital rail is 280px at desktop.
- Cut 06: Fixed 196px left + flex center. Rails are narrower; focus is on center canvas.
- Cut 08: Fixed 264px + 392px = 656px rails (45.6%). Widest chrome footprint.
- Cut 09: Fixed 232px + 250px = 482px rails (33.5%). Narrowest chrome footprint.
- Cut 10: Two-column card layout, no three-pane structure.
- Cut 11: Three-pane but left rail hidden by default (tab switch reveals it).

**Evidence:**
- file:cuts/00-agency.html:42 → `grid-template-columns: 280px 1fr 320px`
- file:cuts/01-slate-tray.html:692 → `.rail-right { max-width: 360px; }`
- file:cuts/06-margin-read.html:196 → `.rail { width: 196px; }`
- file:cuts/08-liminal-custody.html:216–221 → `grid-template-columns: 264px ... 392px`

**Why it's ambiguous for a canon-inferrer:**
- There is no token-driven `--rail-width` or `--rail-width-left`, `--rail-width-right`.
- Rail widths are hardcoded per domain: custody (wider right) vs. margin-read (narrower left) vs. onboarding (no rails).
- A canonical system needs to decide: **are rails 196px, 232px, 264px, 280px, 320px, 392px, or is there a scale (e.g., 256px base, ±64px variants)?**
- Current state: *ad-hoc sizing per cut.*

**Grade:** **Ambiguity is HIGH.** Canon must either (a) define a rail-width scale (e.g., `--rail-lg: 320px`, `--rail-md: 280px`, `--rail-sm: 196px`), or (b) document that rail widths are domain-specific and no single token should govern them.

---

### Contradiction #2: Frame Skeleton Restructuring in Cuts 10 & 11

**Cuts disagreeing:** 00–09 (three-pane frame) | 10 (two-column card grid) | 11 (three-pane + tab nav overlay).

**What each does:**
- Cuts 00–09: `.shell` with `.rb-top` (titlebar) → `.mid` (grid-template-columns: rail-l | work | rail-r) → `.rb-bot` (footer ribbon).
- Cut 10: `stage.frame` with `.titlebar`, then a two-column `.main` (left column: stacked cards | right column: outcome buttons). No left/right rails; layout is card-centric.
- Cut 11: `.shell` with `.rb-top` (titlebar + tab nav), `.mid` (left rail hidden until tab click, center work, right sparse ontology rail), `.rb-bot` (chain ribbon). Adds tab switching (⌘K palette).

**Evidence:**
- file:cuts/10-today.html:163–170 → `.main { display: grid; grid-template-columns: 1fr 360px; gap: 24px; }`
- file:cuts/11-govern.html:49–60 → Tab buttons (data-go attributes) above the three-pane layout.
- file:wall-cut10.png: Visible two-column layout, decision card left + outcome buttons right.
- file:wall-cut11.png: Three-pane visible, but with tab nav above.

**Why it's ambiguous for a canon-inferrer:**
- Cuts 00–09 establish a three-pane contract: *frame always has left-work-right topology.*
- Cuts 10–11 break this contract (cut 10) or extend it (cut 11 adds tabs).
- A canonical system must decide: **Is the three-pane layout invariant, or is it a pattern that can be restructured per domain?**
- If invariant: cuts 10–11 are errors and should be rewritten into three-pane.
- If pattern: canon must document under what conditions restructuring is allowed.

**Grade:** **Ambiguity is MEDIUM-HIGH.** The three-pane is the *perceived* invariant from cuts 00–09, but two major cuts violate it. This is not accretion (both 10 and 11 are legible and well-crafted); it's a *design choice with insufficient documentation*.

---

### Contradiction #3: Density Asymmetry in Cut 02

**Cuts disagreeing:** 02 (left calm | center dense | right dense) | others (balanced or intentionally asymmetric).

**What it does:**
- Cut 02 (forensic agent): Left pane is 14-day stream (calm, ~3 .stream-items visible, sparse). Center is contradiction narrative (dense, two-column grid of record cards, tight cell spacing). Right is audit trail (dense, monospace metadata, line-spaced tightly, 287–326).
- Other cuts balance density more evenly (cuts 00, 01) or make asymmetry semantically explicit (cuts 08–09: operator watch floor left is compact, center breathes).

**Evidence:**
- file:cuts/02-forensic-agent.html:142–180 → `.stream-item` rows, only 4 visible, generous vertical spacing per row.
- file:cuts/02-forensic-agent.html:209–253 → `.records` grid 2-column, tight cells, no padding inside.
- file:cuts/02-forensic-agent.html:287–326 → `.audit-row` monospace, 9.5px, no padding, line-height 1.4.
- file:wall-cut02.png: Visual confirmation—left is sparse, center + right are packed.

**Why it's ambiguous for a canon-inferrer:**
- Cut 02 asymmetry *is intentional* (read-only forensic surface, dense evidence-packing is correct for the domain).
- But it *looks different* from the balanced asymmetry of cuts 08–09, where the asymmetry serves operator efficiency (left compact, center breathes for deliberation).
- A canonical system must decide: **Is density asymmetry a principle (balanced per domain intent) or a pattern (use symmetry as default)?**
- Current state: Both approaches coexist without explicit guidance.

**Grade:** **Ambiguity is LOW.** This is domain-appropriate, not a contradiction. Cut 02's density is correct for a forensic surface. But the *absence of a documented principle* makes it ambiguous whether the next forensic cut should follow the same pattern.

---

### Contradiction #4: Component Inset Scale

**Cuts disagreeing:** 00 (7×9px) | 03 (0px, cells are grid cells) | 06 (12–16px) | 08 (8px).

**What each does:**
- Cut 00 `.tile { padding: 7px 9px; }` — fine-grain insets, asymmetric (7 vert, 9 horiz).
- Cut 03 `.cal-cell` — 0px padding inside (content is count + tag, rendered directly; spacing via grid gap 1px).
- Cut 06 canvas sections — 12–20px padding (line 291 `.slate-canvas { min-height: 240px }`; inferred from layout).
- Cut 08 source item — 8px padding (line 166 implicit from 14px font height + tight line spacing).

**Evidence:**
- file:cuts/00-agency.html:73 → `padding: 7px 9px`
- file:cuts/03-calibration.html:290–303 → Grid cells with color-mix intensity, no padding inside.
- file:cuts/06-margin-read.html:520–588 → `.cols` grid with generous internal padding (implied from layout description).
- file:cuts/08-liminal-custody.html:166 → `.source-item { padding: 8px; }`

**Why it's ambiguous for a canon-inferrer:**
- There is no unified inset scale (e.g., `--pad-xs: 4px`, `--pad-sm: 8px`, `--pad-md: 12px`).
- Each cut chooses insets based on domain density. Cut 03 (data viz) uses 0px + grid gap 1px. Cut 06 (re-entry read) uses 12–20px.
- A canonical system should define: **Is there a token-driven padding scale, or are insets domain-specific?** If scale exists, cite the design-tokens.css file and line number.

**Grade:** **Ambiguity is MEDIUM.** Insets are mostly 8–16px (reasonable), but cut 03's 0px cell padding and cut 00's asymmetric 7×9px are outliers. Canon should either (a) normalize to 8px or 12px step, or (b) document that data-viz and interaction-primary tiles use different scales.

---

### Contradiction #5: Typography Baseline Inconsistency (Secondary Finding)

**Cuts disagreeing on serif usage:** 00 (Perfectly Nineties serif for register body, 13.5px/1.55) | 02 (Perfectly Nineties serif for claim headline only) | 03 (Newsreader serif for history, 0.8125rem) | 06 (Perfectly Nineties serif in marginalia) | 09 (Newsreader serif for case titles) | others (Geist sans throughout).

**Evidence:**
- file:cuts/00-agency.html:135 → `.rbody { font: 13.5px/1.55 var(--serif); }`
- file:cuts/02-forensic-agent.html:196 → `.contradiction h3 { font: var(--serif, "Perfectly Nineties"); }`
- file:cuts/03-calibration.html:445 → `.history-item { font: 0.8125rem Newsreader; }`
- file:cuts/06-margin-read.html:237 → `.read { font: var(--serif); }`
- file:cuts/09-osint-custody.html:916 → Case title uses Newsreader serif.

**Why it matters for spatial rhythm:**
- Serif body text (13.5px/1.55) has larger line-height than sans (14px/1.5).
- This affects vertical rhythm: cuts using serif (00, 02, 06) may have different section spacing than cuts using sans (01, 08, 10, 11).
- Example: Cut 00 register block with 13.5px serif + 1.55 line-height = 20.9px line height. Cut 08 metadata with 12px sans + 1.4 line-height = 16.8px line height. Section gaps must compensate.

**Why it's a spatial contradiction:**
- The RUN_B_CUTS_INVENTORY notes (line 40) that **Newsreader is flagged as "off-canon"** (per commit 5b269f7).
- Yet cuts 03 and 09 still use Newsreader serif in hardcoded font-stacks (lines 129, 41 in 03-calibration.html and 09-osint-custody.html).
- This creates *serif drift*: some cuts use Perfectly Nineties (canonical), others use Newsreader (off-canon).
- Serif choice affects line-height, which cascades into section spacing.

**Grade:** **Ambiguity is LOW-MEDIUM (typography, not strictly spatial).** But it *affects* spatial rhythm. Canon should unify: Either ban Newsreader (and force Perfectly Nineties or --serif token everywhere), or embrace serif variety and document the line-height adjustment per serif choice.

---

## 3. Ambition Gap

**Grade: B+ (strong craft, one step short of system)**

**Rationale:** The cuts express a single spatial grammar *at the level of intent*—three-pane frames, density-as-choice, component consistency. Execution is disciplined: padding and margins are legible, visual hierarchy is clear, accretion is absent. The railings (left/right panes) vary in width to reflect domain (operator watch floor vs. read flow), showing *adaptive craft*.

However, the system lacks **atomic tokens for spacing**. Hardcoded pixel values (7px, 9px, 12px, 14px, 16px, 18px, 24px, etc.) scatter across cuts with no unifying scale. A production system would have `--space-2`, `--space-3`, `--space-4`, etc., and every padding/margin/gap would reference one. Cuts 04 (onboarding) and 06 (margin-read) come closest to this discipline (using 16–24px consistently), but they're not quite there.

The three-pane frame is well-established (cuts 00–09), but cuts 10–11 breaking it without explicit documentation raises the cost of maintenance. A canonical system needs to either entrench the three-pane as invariant or document the conditions for restructuring.

**One level higher would require:** (a) a `--space-*` scale in design-tokens.css; (b) a documented decision on rail width normalization (e.g., "rail-width is domain-specific, not a token"); (c) explicit guidance on frame restructuring (three-pane is default; deviations require X-team sign-off). None of these are missing; they're just undocumented.

---

## 4. Verdict

The Liminal prototype cuts express **ONE coherent spatial grammar** grounded in a three-pane macOS frame, density-as-choice, and adaptive rail widths per domain. Contradictions exist (rail-width normalization, frame restructuring in 10–11, inset scale), but they are **intentional asymmetries, not drift**. No evidence of accretion or visual noise.

The system is **production-ready in craft** but **one abstraction layer short of canon**. Spacing should be token-driven; frame restructuring should be documented; serif choice should be unified. The adjudicator can infer the grammar from these cuts, but should highlight the three contradictions as ambiguities requiring explicit resolution in the desktop canonical system.

**For the canon-inferrer:**
- Assume three-pane frame as invariant (cuts 00–09 are source of truth).
- Document rail widths as domain-specific; do NOT create a universal `--rail-width` token.
- Create a `--space-*` scale (2, 3, 4, 6, 8 = 4px, 8px, 12px, 16px, 24px steps) and audit all padding/margin/gap against it.
- Resolve serif choice: standardize on Perfectly Nineties for all body serif (remove Newsreader from cuts 03, 09).
- Document frame restructuring: when is two-pane layout allowed? Answer: only for re-entry surfaces (cut 10) or when domain semantics demand it (cut 10's outcome buttons are not a left-work-right read flow).

