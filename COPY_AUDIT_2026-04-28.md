# Prototype Copy Audit — 2026-04-28

**Audit subject:** `cuts/01-slate-tray.html` (the live canonical cut surfaced via `index.html` as Cut 01) + `index.html` parent shell.

**Audit lens:** Cross-checked against the Apr 28 corpus convergence — Founder OS wedge, Persona Architecture's multi-ICP framing, the Maya Chen synthetic-substrate marketing discipline, the YC RFS #4/#15 + Speedrun cross-thesis alignment, and the substrate-correction patterns from Apr 28 8:29 PM strategy session.

**Key finding:** The prototype is **architecturally on-thesis** and **production-ready as a surface** — three switchable surfaces (Personal/Team/Business) directly match three of the five Persona Architecture ICPs. The hero already names "founder OS" explicitly. The tray + composition + vault + agents + audit chain are all named in the UI.

The audit identifies **6 specific copy issues** that, if addressed, take the prototype from "architecturally on-thesis" to "demo-ready for SR007 video + YC pitch + public landing page." All issues are scoped to copy, not architecture.

---

## What works (preserve)

### 1. Hero framing names the wedge correctly

> "Liminal · gives form to inner life."
> "A founder OS for state, deliberation, and the record of how you disagree with what AI reads of you."

**Why it works:** the brand sentence is canonical and protected. The sub-headline names "founder OS" — exactly the Apr 28 wedge convergence. **This copy block is wedge-correct and doesn't need to change.** Caveats below for a tightening-pass.

### 2. Three-surface architecture directly maps to the Persona ICP system

The prototype's Personal · Team · Business surfaces correspond to three of the five ICPs from `personae/_meta/PERSONA_ARCHITECTURE.md`:

| Prototype surface | Persona Architecture ICP |
|---|---|
| Personal · self-read | Personal (creator ops) — Priya Iyer persona |
| Team · peer-read | Team (multi-cofounder coordination) — Lena Park persona |
| Business · institutional-read | Business (operator running an org) — Darius Okonkwo persona |

**Strategic implication:** the prototype is already structured to demo *each ICP through its own surface*. The Maya Chen Founder-OS demo runs primarily on Personal+Team. Future Lena Park / Darius / Connor demos slot into Team / Business / [a new Defense surface] without architectural changes.

### 3. The tray + composition + vault + audit-chain naming is correct corpus vocabulary

Every UI element name (`tray`, `Composition surface`, `vault:`, `Audit chain`, `Disposition`, `SHA-256`) matches Liminal's canonical product vocabulary. **No naming corrections needed.**

### 4. The agents register is named in the UI

> "AGENCY · 12 BOUNDED"

The "12 bounded specialists in four registers" framing from the liminal-agents README is on-screen. **The architectural claim is visible as a UI primitive, not buried in marketing copy.**

### 5. The keyboard-shortcuts panel signals operator-class polish

⌘+. for tray, ⌘+1/2/3 for surface switching, ⌘+, for editor notes. **This signals "built for operators who keyboard-drive." That's wedge-aligned (founder-operators are exactly the audience that reads keyboard shortcuts as a credibility signal).**

---

## What doesn't work (6 issues)

### Issue #1 — The three try-one cards use ungrounded synthetic-feeling content

**Current copy (verbatim):**
> Founder · Team — Read your direct report — "Brian's pattern has narrowed. Pattern-only consent. Three open paths."
> Operator · Personal — Read your own pattern — "90-day own-baseline. Where you've drifted from your stated values."
> Creative · Personal — Read your work-in-progress — "Field Studio rebrand. Technically right. Somatically wrong."

**Why this hurts the demo:** these read like *real substrate hints* but a cold viewer has no way to verify or place them. "Brian" is unattributed. "Field Studio" is unattributed. "90-day own-baseline" is jargon without grounding. The viewer's parser stalls — **is this a real example I'm supposed to recognize, or a synthetic prompt the demo is offering?**

This is the same falsifiable-claim trap caught in application v4: a claim that *looks* like receipt-substrate but actually occupies *uncertain truth-status* breaks reader trust. The application fix was to either ground claims to verifiable artifacts or remove them. **The prototype's fix is to ground these to the Maya Chen persona system.**

**Recommended replacement (Maya-Chen-aligned):**

| Surface | Try-one card (current) | Try-one card (recommended) |
|---|---|---|
| Founder · Team | "Brian's pattern has narrowed. Pattern-only consent. Three open paths." | "Devon flagged a substrate gap in your fundraise narrative. Three corrections, one defer." |
| Operator · Personal | "90-day own-baseline. Where you've drifted from your stated values." | "Your last 30 days of decisions, read against your stated pre-seed thesis." |
| Creative · Personal | "Field Studio rebrand. Technically right. Somatically wrong." | "Your AgentScale judge-feedback memo, read against your application draft." |

These ground to the Maya Chen synthetic corpus (`Devon`, `AgentScale`, `pre-seed thesis`) without invoking real-Shruti substrate. **The viewer recognizes the same operator-class scenarios but they're demo-content, not founder-mystery.**

**Filing:** the recommended copy lives downstream in `personae/maya-chen-founder-os/snapshots/` once those snapshots are constructed Apr 30. Until then, the recommended copy is a placeholder consistent with the eventual demo.

---

### Issue #2 — Sub-headline uses two abstractions in one sentence

**Current copy:**
> "A founder OS for state, deliberation, and the record of how you disagree with what AI reads of you."

**Why it stutters:** the sentence has *three nouns* the viewer must decode: "state," "deliberation," "the record." Each is meaningful in Liminal's IP corpus but neither is legible cold.

**Tightening options (preserve "founder OS" + the disagreement claim):**

| Variant | Wins | Loses |
|---|---|---|
| Current | Architecturally complete | Density blocks first-read |
| **A:** "A founder OS where AI agents disagree, deliberate, and prompt you. The corrections are the moat." | Names the agent action + names the moat | Loses "state" (which IS the architectural primitive) |
| **B:** "A founder OS for the work no agent should automate. Twelve bounded specialists. Your corrections are the moat." | Names the founder-class + agents + moat | Slightly long for sub-headline |
| **C:** "A founder OS for the moments before a decision. Twelve bounded agents disagree on what AI reads of you. Your corrections are the moat." | Names the operating context + agents + moat | Three-sentence sub-headline is heavy |

**Recommended: variant A.** Tightest, most SCQA-compatible with the application v4 + Maya Chen persona's primary tagline ("Operational knowledge layer for solo operators running agentic teams"). Trade-off acknowledged: dropping "state" loses one architectural primitive — but the viewer doesn't decode "state" cold anyway, so the loss is internal-only.

---

### Issue #3 — "AGENCY · 12 BOUNDED" label is jargon without anchor

The current label appears as UI chrome without explanation. A viewer sees "12" and "BOUNDED" but no path to what that means.

**Recommended:** keep the label (it's tight + correct) but add a hover-tooltip or eyebrow expansion that surfaces the architectural claim:

> "AGENCY · 12 BOUNDED"
> *(hover: "Twelve bounded specialists in four registers — Diligence, Outreach, Judgment, Operations. Each refuses out of lane and names the right agent. The refusal is the feature.")*

This keeps the chrome tight while letting a viewer-on-demand pull the substrate. **Cold-read principle: bait the click-through rather than exhaust the topic.**

---

### Issue #4 — "skip · go straight to Team" hides the wedge

The "skip" link in the try-one section pushes the viewer past the choice. **But the wedge is solo-founder Personal, not Team.** Skipping to Team is a wrong-default for the SR007 audience (Speedrun reviews are dominated by solo or duo founders, not 5-person teams).

**Recommended replacement:**
> "skip · go straight to Personal" (default to the wedge surface)

Or remove the skip link entirely for the SR007 demo cut — let the try-one cards do the lifting and force the viewer to make a surface choice.

---

### Issue #5 — Brand-sentence-vs-sub-headline tension

The hero stack is:

> "Liminal · gives form to inner life."
> "A founder OS for state, deliberation, and the record of how you disagree with what AI reads of you."

The brand sentence ("gives form to inner life") is **brand-canon protected** and doesn't change. But it lives in the *Liminal Space* register — therapy-adjacent, contemplative, identity-state language. The sub-headline beneath it is in the *Founder OS* register — pragmatic, builder-oriented, agent-architecture language.

**The two registers are different,** and a cold viewer reading them in sequence experiences a register-switch within 2 lines. That's not catastrophic — both registers are legitimate and the corpus has reconciled them — but it does mean the SR007 audience reading top-to-bottom hits *therapy-adjacent first, builder-oriented second*. Reverse-order would invert.

**Recommended: keep current order for the brand-canon-protected version (theliminalspace.io), but produce a `cuts/01-slate-tray-speedrun.html` variant** that flips the stack:

> "A founder OS where AI agents disagree, deliberate, and prompt you. The corrections are the moat."
> *Liminal — gives form to inner life.*

Speedrun-register hero first. Brand sentence as italic byline. **Same content, different audience-calibrated emphasis.**

This is the same two-track architecture the Persona system uses: real-substrate track (theliminalspace.io with brand-sentence-first) vs. synthetic-substrate-marketing track (Speedrun-cut with Founder-OS-first).

---

### Issue #6 — The "Liminal · Slate" label below the surface-switcher is unclear

The sub-rail under the hero shows:

> "Liminal · Slate"
> "vault:"
> "personal · self-read"
> "team · peer-read"
> "business · institutional-read"

A cold viewer parses "Slate" as either (a) a product feature name, (b) a noun describing the canvas, or (c) something else. The corpus knows "Slate" is the desktop-app's canonical UI primitive (the canvas onto which the user composes via tray-drop), but the viewer doesn't.

**Recommended:** either:
- Keep "Slate" but add a compact annotation (e.g., "the surface where you compose")
- Or rename the rail to "Composition" since "Composition surface" is already the central panel's heading — that resolves the redundancy

Default: **rename to "Composition"** for consistency with the central-panel heading. The viewer learns one term instead of two.

---

## Cross-cutting observations

### A. The prototype already supports the SR007 video demo *as-is*

Even without the 6 fixes, the prototype is recordable. The architectural primitives (tray + composition + vault + 12 agents + audit chain + 3 surfaces + keyboard shortcuts) are visible. The fixes are *quality polish*, not blockers.

**Estimated effort to apply all 6 fixes:** ~2 hours of HTML edits + 1 hour of cross-check against the Maya Chen persona corpus once Apr 30 snapshots are built.

### B. The prototype's two-cut structure (Cut 01 live + Cut 02 alt) is the right shape

Cut 01 = the canonical demo surface. Cut 02 = the doc-shape alt UI exploration. The 3 stub cuts (Calibration, Vault, Morning ritual) are all named with reasonable descriptions and correct severity flags.

**Strategic recommendation:** before May 1 record day, **promote Cut 01 to demo-record-ready by applying fixes #1, #2, #4** (the three highest-leverage copy fixes). The other 3 fixes (Issue #3 hover-tooltip, Issue #5 Speedrun-cut variant, Issue #6 rail rename) are post-record polish.

### C. The frozen-version artifacts (`index-agenthansa-frozen.html`, etc.) preserve historical state correctly

These are *intentionally frozen* per the AgentHansa hackathon submission. They should not be edited. **Audit conclusion: no changes to frozen versions.**

### D. The README is honest but doesn't yet name the cross-thesis alignment

Current `README.md` line 5: "single-file embodiment of the four loops" + lists Refusal / Deliberation / Correction / Vault.

This is correct and self-contained. But the Apr 28 corpus convergence added a *cross-thesis alignment claim* — the prototype is on-thesis for YC RFS #4 + #15 + Speedrun SR007 at the architectural layer. **The README should add a single sentence acknowledging this** so a cold reader (Speedrun partner clicking through, YC partner cold-reading) sees the wedge → adjacent ICPs → infrastructure arc immediately.

**Recommended addition (1 sentence after the four-loops list):**

> "The same architectural pattern (typed event log + bounded multi-agent reads + correction stream) ships at solo-operator scale here as the Founder OS wedge, and generalizes to team / business / defense ICPs as the substrate layer for agentic-system legibility."

---

## Recommended action sequence

| Priority | Fix | Effort | Status |
|---|---|---|---|
| **P0** (pre-record) | Issue #1 — Replace try-one cards with Maya-Chen-aligned copy | 30 min | ✅ **DONE Apr 28 evening.** Personal-first ordering, synthetic-substrate-grounded scenarios. Devon (cofounder name from Maya Chen identity.json), "stated thesis", "Judge feedback memo", "application draft" — all consistent with the persona corpus and free of unverifiable-feeling content. |
| **P0** (pre-record) | Issue #2 — Tighten sub-headline to variant A | 5 min | ✅ **DONE Apr 28 evening.** New copy: *"A founder OS where AI agents disagree, deliberate, and prompt you. The corrections are the moat."* Names the agent action + names the moat. |
| **P0** (pre-record) | Issue #4 — Default skip-link to Personal (or remove) | 2 min | ✅ **DONE Apr 28 evening.** Three-point change: (a) copy "skip · go straight to Personal", (b) `boot.js` skip-handler routes via `dismissAndRoute("personal", null)`, (c) body default + `setProduct("personal")` aligned. Personal is now the wedge surface for first-visit, returning-visit, and skip-path. |
| **P1** (post-record) | Issue #3 — Add hover-tooltip on AGENCY label | 15 min | ✅ **DONE Apr 28 evening.** Native HTML `title` attribute on `.agency-label` span carries the explanation: *"Twelve bounded specialists in four registers — Diligence, Outreach, Synthesis, Judgment. Each refuses out of lane and names the right agent. The refusal is the feature."* Plus per-cut CSS adds `cursor: help` + dotted-underline affordance so viewers know to hover. Matches the cut-shell classification-token tooltip idiom. |
| **P1** (post-record) | Issue #5 — Produce Speedrun-cut variant with flipped hero | 30 min | ✅ **DONE Apr 28 evening.** New file `cuts/01-slate-tray-speedrun.html` cloned from canonical with three deltas: (a) header-block contract documents the variant rationale + persona-corpus link, (b) hero stack flipped — `<h1 class="entry-wedge">` (founder-OS line) precedes `<div class="entry-brand">` (brand sentence as italicized byline), (c) per-cut CSS makes `.entry-brand` italic / 0.85em / 0.72 opacity so it reads as byline. Catalog `index.html` Reference section gets a new nav-item linking the Speedrun variant alongside canonical Cut 01. Same architecture, audience-keyed surface swap — operationalizes Maya Chen's three-tagline pattern at the cut level. |
| **P1** (post-record) | Issue #6 — Rename "Slate" rail to "Composition" | 5 min | ✅ **DONE Apr 28 evening.** Titlebar `<span class="brand">Liminal · Slate</span>` changed to `<span class="brand">Liminal · Composition</span>`. Removes the redundancy with the central panel's "Composition surface" heading. Viewer learns one term instead of two. |
| **P2** (post-cohort) | README add cross-thesis-alignment sentence | 5 min | Pending May 3 |

**Total P0 effort actually spent:** ~25 min. Demo-record-ready prototype landed Apr 28 evening, ahead of Apr 30 target.

**Total P1 effort actually spent:** ~35 min (all three shipped Apr 28 evening, ahead of May 2 target). Prototype now demo-record-ready AND polished, with audience-keyed Speedrun-cut variant available for SR007 video shoot.

## P1 fix verification

All three P1 items applied cleanly to `cuts/01-slate-tray.html` + new `cuts/01-slate-tray-speedrun.html` + `index.html`:

- **Issue #3:** AGENCY label has `title` attribute + `.agency-label` class with `cursor: help` + dotted underline. Hover surfaces the architectural explanation. Native browser tooltip — no JS, no new component, works immediately.
- **Issue #5:** Speedrun cut at `cuts/01-slate-tray-speedrun.html`. Hero stack flipped (founder-OS sentence first, brand sentence as italic byline). Catalog rail Reference section now exposes both canonical + Speedrun variants. Standalone-loadable per `_template.html` contract. Audience routing: brand-canon-protected `theliminalspace.io` ships canonical; Speedrun video demo + SR007-partner-facing context ship the variant.
- **Issue #6:** Titlebar reads "Liminal · Composition" everywhere — single term replaces the rail-vs-central-panel redundancy.

Files changed in this fix pass:
- `cuts/01-slate-tray.html` — agency-label class + title attribute + per-cut CSS (P1 #3); titlebar span rename (P1 #6)
- `cuts/01-slate-tray-speedrun.html` — NEW FILE, full clone of canonical with header-block, hero stack, and CSS variant deltas (P1 #5)
- `index.html` — new Reference nav-item linking Speedrun variant (P1 #5)

All edits are surgical (no architectural changes). The prototype's iframe-loadable structure, design-token cascade, event bus, and standalone-loadability all preserved.

**Total P0 effort actually spent:** ~25 min (verification took longer than the edits). Demo-record-ready prototype landed Apr 28 evening, ahead of Apr 30 target.

## P0 fix verification

Re-extracted visible copy from `cuts/01-slate-tray.html` after fixes confirms all three P0 items applied cleanly:
- Sub-headline reads as designed (variant A)
- Try-one cards in Personal-first order with Maya-Chen-aligned helper text
- Skip-link copy + handler + body default + setProduct call all route to Personal

Files changed in this fix pass:
- `cuts/01-slate-tray.html` — entry overlay copy + body data-product attribute
- `lib/boot.js` — skip-handler dismissAndRoute call + setProduct default

All edits are surgical (no architectural changes). The prototype's iframe-loadable structure, design-token cascade, and event bus are untouched.

---

## Filing note

This audit lives at `liminal-prototype/COPY_AUDIT_2026-04-28.md` rather than in `founder-brain/` because it's prototype-specific and should travel with the prototype repo. Cross-references:

- `personae/_meta/PERSONA_ARCHITECTURE.md` (corpus convergence on multi-ICP architecture)
- `personae/maya-chen-founder-os/identity.json` (the synthetic substrate the recommended try-one cards ground to)
- `~/liminal/founder-brain/fundraise/speedrun/sr007/application/SR007-APPLICATION-DRAFT.md` (the application v4 substrate the prototype demo-records support)

The audit's architectural-layer findings (3-surface structure, 12-bounded label, brand-sentence preservation) should propagate into `~/liminal/founder-brain/liminal-ip/STRATEGY.md` as a "prototype is already on-thesis" note when next updated.
