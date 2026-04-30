---
id: prototype.scratch.2026-04-28-quick-win-wireframes
type: wireframe-spec
status: draft
created: 2026-04-28
author: shruti + creative-director
purpose: Wireframe-first spec for two quick-win extensions to the prototype catalog. Both extend the existing live "Three-surface slate" cut (cut-01) by adding a glowing-line connector to a next-screen that demonstrates an ICP deliverable in instrumentation register (per Apr 28 inspo investigation).
canon:
  - prototype shell · index.html · v0.8.2-iframe-cuts
  - existing live cut · cuts/01-slate-tray.html · "Three-surface slate"
  - cut template · cuts/_template.html
  - design tokens · design-system/tokens/design-tokens.css (12-wheel canon)
  - shared shell · lib/cut-shell.css
  - existing agency runtime · lib/agency.js (12 agents in 4 registers, rotation)
  - inspo register source · _inspo/inspo/2026-04-28/manifest.json (highest-signal #3 Houdini HUD, #4 TDA topology, Pinterest pin orbital diagram)
  - register diagnosis · 2026-04-28 inspo investigation reflection
  - ICP source · liminal-agents README §"five named buyers"
gating_decisions:
  - which cut number(s) the new screens occupy (07 + 08 proposed)
  - glowing-line connector visual treatment (single shared pattern proposed)
  - whether to extend cut-01 or ship standalone cuts that link from cut-01
---

# Quick-Win Wireframes — Cut 01 Extensions

## What this doc gates

Two new prototype screens that extend the existing live `cut-01-slate-tray.html` ("Three-surface slate") by adding a **glowing-line connector** that visually links the slate to a next-screen demonstrating how a bounded-agent surface supports an ICP buyer. Both are wireframe-first per the discipline established in the SR007 deck rebuild — no HTML until the structural argument is approved.

Picked from the 5 candidates surfaced in the prior turn:

- **#1 Diligence Memo Generator** → proposed Cut 07 (one new cut)
- **#3 Bounded-Agent Disagreement Console** → proposed Cut 08 (one new cut)

Deferred (per prior triage): #2 Coherence Topology (small-N artifact risk), #4 Founder Dataroom Intake (duplicates #1's audience), #5 Correction Stream Viz (no real data).

---

## What's already on disk (the substrate to extend)

### The live cut: `cut-01-slate-tray.html`

Three-surface slate with operator-subject relationships across **Personal · Team · Business** products. Body has `data-product` attribute that switches across the three. Already has:

- Three entry doors (Team / Personal / Creative-Personal) with named scenarios
- `data-product` switching via internal ⌘1/⌘2/⌘3 handler (separate from parent-shell ⌘⇧1...⌘⇧5)
- Right-rail agency console rendering 12 agents in 4 registers (Diligence / Outreach / Synthesis / Judgment) per `lib/agency.js`
- One agent "currently reading" at a time, rotating every 3.5s when non-refused tiles are slated
- Disagreement edge drawn between Strategist + Contrarian when 2+ tiles are slated
- Witness joins Diligence per SCENARIO_SPEC §8.3 (the creative-ICP recognition cue: "technically right, somatically wrong")

### The cut template: `_template.html`

Standard frontmatter requirement for new cuts:
- ICP named (founder · operator · creative · or specific role)
- Surface named (personal · team · business · or new)
- Spec ref (path to spec doc + section)
- Status (stub · sketch · refining · live)
- Token-canon discipline (no redefining; import from `design-system/tokens/design-tokens.css`)
- Shell-canon discipline (import `lib/cut-shell.css` unless documented divergence)
- DOM-bubble ownership (works standalone OR inside parent catalog iframe)
- "No vibe-coded slop" — every flourish grounded in a spec ref / substrate citation / named experiment

### The catalog shell: `index.html`

- 188px left rail + 1fr stage with iframes
- Sections: Live (1) / Alts (1) / Speced not built (3) / Reference (2)
- Hash routing (`#cut-NN`) + ⌘⇧1...⌘⇧5 keyboard
- postMessage bus already wired for parent ↔ cut communication (currently logs only; future: toast forwarding, navigation requests)
- **Adding a new cut = one HTML file + one nav-item entry. The architecture invites this exact move.**

---

## The glowing-line connector pattern (shared spec)

### What it is

A **glowing line that originates from a slate tile in cut-01** and visually connects to a "next-screen" affordance. When clicked or keyboard-activated, the parent shell routes to the connected cut. The line is the *visual proof* that this isn't a separate UI — it's the same workspace flowing into its next surface.

### Visual treatment (per inspo register diagnosis)

Per the prior turn's "instrumentation, not atmosphere" finding — this is **not** a soft glow. The reference is the Pinterest pin's directional-arrow orbit lines + Houdini HUD register, not v0.2 deck atmospheric blur.

| Element | Spec |
|---|---|
| Line stroke | 1.5px, accent-tinted (matches origin tile's register color) |
| Line path | SVG polyline · two segments + 90° elbow · routed around UI chrome |
| Glow | `filter: drop-shadow(0 0 6px var(--register-accent))` — single layer, hard-edged, NOT multi-layer mist |
| Endpoint | Origin = tile-attached "◇" diamond glyph (existing canon mark). Terminus = pulsing 8px orb at next-screen entry (also "◇" pulled apart) |
| Animation | Subtle 2.4s pulse on terminus orb only. Line itself is static. No traveling-light animation (would read as shimmer/atmosphere) |
| Label | Tiny mono caption mid-line: e.g. `→ DILIGENCE MEMO · ⌘⇧7` — readable, named, keyboard-shortcut surfaced |
| Hover state | Line stroke 2.5px, label brightens, terminus orb saturates to full register accent |
| Click | Routes parent shell to connected cut number via existing hash routing |

### Why a line, not a button

Per the inspo investigation: investors pattern-match diagrams as IP receipts; paragraphs read as marketing. **A line is a diagram element. A button is a paragraph element.** The line says "this surface flows into another surface that's part of the same architecture." A button says "click here for more." Different epistemic claims.

### Where the line originates

Per `cut-01-slate-tray.html` body `data-product`:
- **Team product** → line originates from a slate tile (e.g., Brian's narrowing-pattern tile) → terminates at Cut 08 (Disagreement Console). *"Seeing 12 agents disagree about Brian is the next move from reading Brian on the slate."*
- **Personal product** → line originates from operator's own-pattern tile → terminates at Cut 07 (Diligence Memo) when the operator is mid-fundraise context. *"Reading your own pattern flows into producing the diligence memo a partner asks for."*
- **Creative product** → line could terminate at either (deferred — Creative ICP is a Phase 2 audience for #1 and #3)

---

## CUT 07 — Diligence Memo Generator

### Frontmatter (per `_template.html` contract)

```
ICP        · accelerator partner triaging founder dataroom (Buyer #2 per liminal-agents README)
             secondary: solo founder mid-fundraise (Buyer #1) running it on own dataroom for self-audit
Surface    · business (new entry door candidate · or extends Team product)
Spec ref   · liminal-agents/README.md §"The five buyers" buyer #2
             AgentHansa judge feedback verbatim (2026-04-26):
               "a16z Speedrun-style diligence memo from a founder dataroom in 30 min"
Status     · wireframe (this doc) → stub → live
```

### The structural argument (one anchor)

**One thing this screen shows:** *the 12-agent architecture, applied to a real dataroom, produces a Speedrun-grade diligence memo in measurable time.* The whole screen serves that one claim. Every element subordinates.

### Layout (HUD-readout register per inspo #3 Houdini Containment MUBs)

```
┌──────────────────────────────────────────────────────────────────────┐
│ ◇ LIMINAL · DILIGENCE                              [⌘⇧7]  [⌘⇧1 back]│  ← chrome strip
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   DATAROOM · acme-co-seed-2026.zip                  ⏱ 28:14           │  ← top-meta
│   ─────────────────────────────────────             ──────            │
│   12 files · pitch-deck.pdf · founder-memo.md ·                       │
│   3 transcripts · 1 financial-model.xlsx                              │
│                                                                       │
│   ┌──────────────┬──────────────┬──────────────┬──────────────┐       │  ← 4-register grid
│   │ DILIGENCE    │ OUTREACH     │ SYNTHESIS    │ JUDGMENT     │       │
│   │ violet       │ orange       │ gold         │ green        │       │
│   ├──────────────┼──────────────┼──────────────┼──────────────┤       │
│   │ ◉ Operator   │ ◯ Planner    │ ◉ Strategist │ ● Contrarian │       │  ← agent cells
│   │ READING…     │ QUEUED       │ COMPLETE     │ COMPLETE     │       │     status states:
│   │              │              │              │              │       │     ◯ queued
│   │ ◉ Synthesizr │ ◉ SDR        │ ◯ Editor     │ ◯ Manager    │       │     ◉ reading
│   │ READING…     │ READING…     │ QUEUED       │ QUEUED       │       │     ● complete
│   │              │              │              │              │       │     ⊘ refused
│   │ ⊘ Witness    │              │              │              │       │
│   │ REFUSE→Strat │              │              │              │       │
│   └──────────────┴──────────────┴──────────────┴──────────────┘       │
│                                                                       │
│   ┌─────────────────────────────────────────────────────────────┐     │  ← memo preview
│   │ MEMO PREVIEW · synthesizing…                          ↓ PDF │     │     fills bottom
│   │ ─────────────────────────────────────────────────────────── │     │     half as
│   │   Diligence: ACME has [synthesis cascading line by line]    │     │     register summaries
│   │   Outreach: founder reach pattern shows…                    │     │     land
│   │   Judgment: NOT READY · one fix · founder needs to…         │     │
│   │   Operations: next move · request 3 specific docs…          │     │
│   └─────────────────────────────────────────────────────────────┘     │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

### Element-level spec

| Element | Spec | Source |
|---|---|---|
| Top chrome strip | Reuses `cut-shell.css` titlebar pattern from cut-01. Mono nav, accent dot, ⌘⇧7 keyboard hint. | `lib/cut-shell.css` |
| Dataroom name + filename | Mono caps, accent-violet (Diligence is the primary register). 12-file count rendered as flat numerals. | Standard typography token |
| Countdown timer | `⏱ MM:SS` mono, top-right. Real elapsed time from POST. Per judge verbatim "30 min." If actual API latency exceeds 30:00 on full dataroom, demo on subset and label "5 min · single deck." | Real-time timer · no fake countdown |
| 4-register grid | 4 columns × 3 rows = 12 cells. Each column tinted by register accent at 6% bg opacity (same as cut-shell.css uses for product-tab tinting). Column headers in mono caps. | 12-wheel canon · `frontier.ts` register tokens |
| Agent cells | Each cell: status glyph (◯ ◉ ● ⊘) + agent name + status label. Refusal cells show "REFUSE→AgentName" in red-orange. Reading cells show subtle ◉ pulse (single hard-edged glow ring, NOT multi-layer mist). | Status states match `lib/agency.js` semantics |
| Memo preview pane | Bottom 35% of viewport. Synthesis cascades line by line as register-summaries land. Real markdown rendering. PDF export button right-aligned. | Real markdown · real PDF (browser print-to-PDF acceptable) |
| Glowing-line origin | Top-left corner of screen has the connector line entering from cut-01's slate. The line "arrives" at this screen rather than being click-launched. Reverse-orientation of normal connector: this is the destination view. | Wireframe pattern §"glowing-line connector" |

### What it does NOT have

- No bookend orbs at scaled opacity
- No accent-tinted ambient washes
- No hero-text glow halo
- No gradient bottom-rule
- No atmospheric grain overlay
- No softness anywhere — every edge is hard, every glyph is mono, every status is binary

This is the inspo register correction made literal: **flat, saturated, instrument-grade.**

### Demo flow (60s for deck/video)

| Time | What happens |
|---|---|
| 0–5s | Drop `acme-co-seed-2026.zip` onto window. Dataroom name + file count appear. Countdown starts. |
| 5–15s | 12 agent cells light up sequentially (◯ → ◉) following `runAllAgents` orchestration. Refusal cells render with REFUSE→target. |
| 15–45s | Register summaries cascade into memo preview pane line by line as each register completes. |
| 45–60s | Full memo renders. "↓ PDF" button activates. Click → PDF download. |

### Honest gates

- Agents really run via `lib/agency.js` (or extended version that takes file paths, not slated tiles)
- Refusals are real (each agent's domain prompt drives its own refusal logic)
- Memo synthesis is real markdown, not a mock
- Countdown is real-time, not a fake animation
- If 30:00 is a stretch for full dataroom, demo labeled "5 min · single deck"

### Cut nav-item to add to `index.html`

```html
<div class="cn-section">
  <div class="cn-section-label"><span>ICP screens</span><span class="count">2</span></div>
  <a class="cn-item" data-cut="07" href="#cut-07">
    <span class="num">07</span><span class="lbl">Diligence memo · accelerator partner</span>
    <span class="meta">stub</span>
  </a>
  <a class="cn-item" data-cut="08" href="#cut-08">
    <span class="num">08</span><span class="lbl">Disagreement console · 12 agents</span>
    <span class="meta">stub</span>
  </a>
</div>
```

---

## CUT 08 — Bounded-Agent Disagreement Console

### Frontmatter (per `_template.html` contract)

```
ICP        · all 5 buyers · architecture demo, not buyer-specific
             specifically: anyone who needs the patent claim PPA #4 (Bounded Agent Refusal) to be visible in 5 seconds
Surface    · cross-product · sits above Personal/Team/Business as an architectural diagnostic
Spec ref   · liminal-ip/06-evidence/INVENTIONS.md §2 (Bounded Agent Refusal Logic as Architecture)
             liminal-ip/04-design/UI_GAP_SPEC.md (TBD section)
             inspo: _inspo/inspo/2026-04-28 manifest · #3 Houdini Containment MUBs · Pinterest pin orbital diagram
Status     · wireframe (this doc) → stub → live
```

### The structural argument (one anchor)

**One thing this screen shows:** *12 bounded agents read the same input through different lenses. The disagreement is the architecture's output, not its bug.* PPA #4 rendered as live diagram, not paragraph.

### Layout (Pinterest-pin orbital + Houdini HUD register)

```
┌──────────────────────────────────────────────────────────────────────┐
│ ◇ LIMINAL · DISAGREEMENT                            [⌘⇧8]  [⌘⇧1 back]│
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   INPUT · "Brian missed standup again. Maya is fielding questions     │
│           about him. Customer X escalated for 3rd week."              │
│                                                                       │
│                                                                       │
│              ┌─────────── DILIGENCE ─────────────┐                    │  ← register arc · top
│              │   ◉ Operator        ◉ Synthesizr  │                    │     concave plate per
│              │      "pattern…"        "Brian's…"  │                    │     Pinterest pin shape
│              │           ⊘ Witness                │                    │
│              │           "REFUSE→Strategist"      │                    │
│              └────────────────────────────────────┘                    │
│                                                                       │
│   ┌──── OUTREACH ─────┐    ◇    ┌───── JUDGMENT ─────┐                │  ← left + right arcs
│   │ ⊘ Planner          │ central│ ● Contrarian        │                │     center: ◇ glyph
│   │  REFUSE→Liaison    │  glyph │  "if obvious read   │                │     small luminous-orb
│   │                    │   with │   is wrong, the…"   │                │     at heart per pin
│   │ ⊘ SDR              │  small │                     │                │
│   │  REFUSE→Liaison    │  orb   │ ● Manager           │                │
│   └────────────────────┘        │  "next: head-of-eng │                │
│                                 │   call this week"   │                │
│                                 └─────────────────────┘                │
│                                                                       │
│              ┌─────────── SYNTHESIS ─────────────┐                    │  ← register arc · bottom
│              │   ● Strategist      ◯ Editor      │                    │
│              │   "make the call,    queued       │                    │
│              │    sleep tax goes…"               │                    │
│              └────────────────────────────────────┘                    │
│                                                                       │
│   ─────────────────────────────────────────────────────────────────   │  ← divider
│   12 agents · 5 in lane · 3 refused with named redirect · 4 queued    │  ← coverage line
│   convergence: 2 of 5 lanes converge on "head-of-eng call is blocker" │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

### Element-level spec

| Element | Spec | Source |
|---|---|---|
| Input cell at top | Operator-supplied scenario, mono italic. Real input field accepting any string. | Standard input |
| 4 register plates arranged orbitally | Top (Diligence), bottom (Synthesis), left (Outreach), right (Judgment). Each plate is concave-edged per Pinterest pin shape. Plate background is register accent at 8% opacity. | `frontier.ts` register tokens · concave-edge SVG mask per Pinterest pin reference |
| Central ◇ glyph | Diamond at center of orbital diagram. Small accent-orb at heart (8px, register-accent gradient if convergence detected, neutral if not). Per Pinterest pin's central diamond mark. | Existing canon ◇ glyph |
| Agent cells within plates | 3 agents per plate (matches `lib/agency.js` REGISTER_AGENTS). Status glyph (◯ ◉ ● ⊘) + agent name + 1-line read or REFUSE→target. | `lib/agency.js` |
| Refusal arrows | Curved SVG path from refusing agent to target agent across plates. 1px stroke, accent-tinted to TARGET agent's register, terminating in small arrowhead. Per Pinterest pin directional arrows. | New SVG |
| Convergence indicator | When 2+ in-lane agents reach similar judgment, a subtle 1px arc connects them through the center ◇. Drawn only when convergence detected, not always. | New convergence detector |
| Coverage line at bottom | "12 agents · 5 in lane · 3 refused with named redirect · 4 queued" — mono, accent-tinted at faint opacity. The architectural claim made counted. | New computed field |
| Glowing-line origin | Connector enters from cut-01's slate (e.g., from Brian's narrowing-pattern tile). The input field at top of cut-08 receives the slate's input contextually. | Wireframe pattern §"glowing-line connector" |

### What it does NOT have

- No bookend orbs at scaled opacity
- No mix-blend-mode soft-glow effects
- No eyebrow accent-orbs (different element; reserved for cut-01's chrome)
- No hero text glow
- No gradient washes behind the orbital diagram
- The orbital diagram IS the visual; nothing competes with it

This is the patent claim rendered as the diagram itself, per the inspo investigation insight that *investors pattern-match diagrams as IP receipts; paragraphs read as marketing.*

### Demo flow (45s for deck/video)

| Time | What happens |
|---|---|
| 0–3s | Input cell shows scenario. ◇ central glyph at neutral. All 12 cells at ◯ queued. |
| 3–18s | Agents activate sequentially in their plates. Status glyphs cascade ◯ → ◉ → ● for in-lane agents. |
| 8–18s | Refusal cells render REFUSE→target. Curved SVG arrows draw across plates from refusing agent to redirect target. |
| 18–25s | Convergence indicator activates: 1px arc through ◇ connecting Strategist + Manager (both reached "head-of-eng call is the blocker"). Central orb saturates to faint accent. |
| 25–30s | Coverage line at bottom updates: "12 agents · 5 in lane · 3 refused with named redirect · 4 queued · convergence: 2 of 5 lanes." |
| 30–45s | Operator can click any agent to drill into the full read in a side panel. |

### Honest gates

- 12 agents really run, real reads
- Refusals are domain-driven (each agent's prompt determines its own refusal)
- Refusal-to-target arrows render real `REFUSE→AgentName` data, not a mock
- Convergence detection is a simple keyword/embedding overlap calc on the actual agent reads, not a script
- If convergence calc is harder than 4 hours, ship without it; the diagram still carries the claim

---

## The glowing-line connector — picked from cut-01

### Origin point on cut-01

Per `cut-01-slate-tray.html` body `data-product`:

| Cut-01 product | Slate tile origin | Line terminates at | Why this pairing |
|---|---|---|---|
| Team (Brian read) | Brian's narrowing-pattern tile | Cut 08 (Disagreement Console) | "Seeing 12 agents disagree about Brian is the next move from reading him on the slate" |
| Personal (own-baseline) | Operator's own-pattern tile | Cut 07 (Diligence Memo) | "Reading your own pattern flows into producing the diligence memo a partner is asking for" |
| Creative (Field Studio) | Field Studio rebrand tile | (deferred) | Creative ICP is Phase 2 for both #1 and #3 |

### Implementation hook (no code yet)

The connector is one SVG element absolutely positioned over the cut-01 iframe stage area, originating at the slate tile's DOM coordinate and terminating at the bottom-left corner of the parent shell where Cut 07 / Cut 08 nav items live. Click on terminus = parent-shell `activateCut(7|8)` call via existing routing.

The line lives in `index.html`'s parent shell, NOT inside the cut-01 iframe. This keeps the cut-01 standalone (the line only renders when running inside the catalog parent). Per the prototype's "DOM-bubble ownership" discipline.

### What the line says (one sentence per terminus)

| Line | Caption mid-stroke |
|---|---|
| Slate-tile → Cut 07 | `→ DILIGENCE MEMO · ⌘⇧7` |
| Slate-tile → Cut 08 | `→ DISAGREEMENT · ⌘⇧8` |

Captions in mono, accent-tinted, readable at thumbnail size.

---

## What this wireframe deliberately does NOT do

- **Touch any HTML.** Wireframes are structural argument; HTML is downstream cost. Per the discipline established in the SR007 deck wireframe-first move
- **Specify pixel-exact coordinates.** That's the HTML-pass concern. This doc names which elements, where in the layout grid, what register accents — not which px from which edge
- **Specify SVG path data.** Same reason
- **Touch `lib/agency.js` to extend it.** The agency runtime already supports the data shape these screens need; the screens are new view layers on existing state. If extension is needed, that's an HTML-pass scope decision
- **Pick the test dataroom for Cut 07.** Open question — synthetic (you draft) vs real (from AgentHansa interactions). Gating decision before HTML
- **Pick the test scenario for Cut 08.** The Brian-narrowing-pattern scenario from cut-01 is the obvious default. Gating decision before HTML

---

## Approval gates (need your call before HTML)

| # | Gate | Default | Override path |
|---|---|---|---|
| 1 | Cut 07 = Diligence Memo, Cut 08 = Disagreement Console — picked from the 5 candidates per prior triage. Right? | Yes | If you want #4 Dataroom Intake first or #2 Topology, name it |
| 2 | Both new cuts ship as **iframe-loaded** in the catalog (not inline stubs) — i.e., real HTML files under `cuts/`. Right? | Yes | If you want stubs first to test the nav, that's a 5-min add |
| 3 | Glowing-line connector lives in **parent shell** (`index.html`), not inside cut-01 iframe — preserves cut-01 standalone. Right? | Yes | If you want the line inside cut-01 (deeper integration but breaks standalone), that's the override |
| 4 | Cut 07 line originates from **Personal-product own-pattern tile**; Cut 08 from **Team-product Brian tile**. Right? | Yes | If different pairings, name them per the table above |
| 5 | Inspo register: **flat, saturated, hard-edged, instrument-grade** per Houdini #3 + Pinterest pin. NOT atmospheric / soft-glow / gradient-mist per v0.2 deck push. Right? | Yes | If atmospheric is preferred, that's the register-shift override (will read as inconsistent with the inspo investigation finding) |
| 6 | Add the new "ICP screens" section to catalog rail with count of 2. Right? | Yes | Or add to "Speced not built" with stub status until iframes ship |
| 7 | Token-canon discipline: zero token redefinition; all accents pulled from `design-tokens.css` 12-wheel; zero new colors. Right? | Yes | Non-negotiable per `_template.html` contract |

---

## What ships if all 7 gates green

Two new HTML files (`cuts/07-diligence-memo.html` + `cuts/08-disagreement-console.html`), one updated `index.html` (nav-item additions + parent-shell SVG connector layer), zero changes to existing cuts or design tokens. ~6-8 hours of build work depending on convergence-detection scope. Both ship demo-ready in a single focused session.

The deck cites both as live URL screenshots. The video uses Cut 07 as the product-half receipt. The application's "Anything Else" cites the live cuts. Same artifact, three downstream surfaces.

---

## What this wireframe inherits from the v0.2 deck push (and what it doesn't)

**Inherits:**
- The mono-nav-with-accent-dot pattern (top-right of every screen) — `slide-meta` from v0.2
- The hard-edged accent dot ornament — `accent-orb` from v0.2 if applied at glyph scale only (NOT scaled-up bookend variant)
- ⌘⇧N keyboard discipline

**Does NOT inherit:**
- Bookend orbs at 22-32% opacity with screen blend (atmospheric, not instrumental)
- Gradient bottom-rules (decorative)
- Atmospheric grain overlay (decorative)
- Hero-text glow halos (atmospheric)
- Per-slide ambient washes (decorative)

The visual vocabulary delta IS the inspo register correction. The wireframe enacts it.

---

## Change log

| Date | Change |
|---|---|
| 2026-04-28 | Initial wireframe spec for Cut 07 + Cut 08 + glowing-line connector. Picked from prior turn's 5-candidate triage (#1 + #3). All 7 gates open for approval before HTML. |
