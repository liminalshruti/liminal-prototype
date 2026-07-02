# Liminal Prototype Cuts — Moment-Design Coherence Critique

**Panel:** Independent design critic (moment-design lens)  
**Date:** 2026-07-01  
**Scope:** Cuts 01, 04, 08, 09, 10, 11 walked live; assessed for emotional beat coherence across the loop  
**Evidence:** Live browser snapshots; RUN_B_CUTS_INVENTORY.md (design-system facts); file:line citations

---

## 1. The Emergent System — Beat-Staging Rules the Cuts Agree On

### Core Grammar: Spatial Refusal + Sealing via Artifact

Across all walked cuts, the product loop expresses five emotional beats through a consistent spatial grammar:

1. **REFUSAL** — rendered as *status collapse* (not as copy, but as visual state change)
   - **Cut 08 (Custody):** Guard banner ("GUARD STATE: ARMED") appears at beat 3; guard status shown as field `.guard-banner` with `--stability` color (orange/amber edge), marked "CONTESTED". Refusal is spatial: the guard banner *occupies physical real estate* and prevents downstream action ("DOWNSTREAM COMMAND: Not yet eligible"). RUN_B_CUTS_INVENTORY.md line 800.
   - **Cut 09 (OSINT):** Reads with `.data-v="refused"` render with left-border colored `--c-refuse` (#E5484D, alarm red). The refusal is a *color-coded left edge*, not prose. Verdict data-attribute pairs with visual border: same grammar. Line 905.
   - **Cut 01 (Slate-tray):** Orbital agents in refusal state render as `⊘` (crossed-circle glyph). Refusal-arrow SVG lines point *inward* from agent slots to center. Visual: agents fade their slots when they refuse (line 151-155, cut-shell.css). Refusal is *arc position + glyph mutation*, not text label.

   **Consistency finding:** Refusal across 01/08/09 is *always* spatial (color-coded edge, banner position, glyph state), never prose-only. This is load-bearing: it reads instantly without prior context.

2. **CORRECTION** — rendered as *annotation layer* (founder's voice, handwritten, on top)
   - **Cut 06 (Margin-read):** Marginalia `.ed-note` elements (Caveat font, signal-color) position absolutely over read elements. Correction is *founder's gloss*, not system voice. Walk engine reveals correction by applying `.spotlight` class to `[data-annotation]` elements. Handwritten font + positioning create *intimacy*. Lines 684-686, 706-709 inventory.
   - **Cut 01 (Slate-tray):** No explicit correction UI visible in snapshot (corrections are recorded via amend handlers, recorded in chain, not staged as visual moments in the read surface itself).
   - **Cut 08/09:** Corrections are *rule-save gates*. Cut 08 "SAVE REVIEW RULE" button (line 2190 inventory) gates progression from beat 3→5. Cut 09 doctrine rule (lines 40-45 snapshot) is unsigned until seal. Correction is *policy durable*, not aesthetic.

   **Consistency finding:** Correction surfaces with two grammars: (a) **Margin-read (06):** handwritten annotation visible *during read*; (b) **Custody (08/09):** rule-save as *blocking gate*, gate unlocks only after correction made. Neither is inline-edit-form UX. Both require founder agency.

3. **SEAL/RATIFY** — rendered as *rise animation + artifact display*
   - **Cut 08 (Custody):** Receipt artifact (`.receipt`, 1px border `--connection-edge`) displays "RULE-014 saved from CASE-014" (line 2707 inventory). Visual: `.receipt` hidden by default, appears via conditional render (lines 2702-2714 inventory). Transitions from hidden → visible with no explicit keyframe cited, but inventory notes "rule-save → receipt shown" is a *state toggle*, not animation.
   - **Cut 09 (OSINT):** Disposition `.dispo` hidden by default, shows on `.in` class with `@keyframes rise` animation 0.5s ease (lines 272-274 inventory). Artifact displays "X cases sealed · doctrine R-001 active · latest case C-015 · disposition [result] · Y ontology nodes" (lines 674-677). Visual: *rise from below* + border color `--c-ok` (teal/green). Weight: 5% teal background + full-height border.
   - **Cut 01 (Slate-tray):** No seal animation visible in snapshot. Disposition buttons ("Confirm", "Defer 7d") are primary interactions, but seal moment is not captured in this cut's visual grammar. (Note: cut 00 has ledger modal with sealed cards, but not walked.)
   - **Cut 10 (Today):** Outcome buttons ("Resolved well", "Mixed", "Regret it", "Still open") trigger `.is-sealed` class on container (line 589 snapshot). CSS class `.is-sealed` triggers display swap: outcomes fade, sealed verdict *rises in* via `@keyframes tdy-rise` (lines 315-325 inventory, 520ms animation). Visual: serif italic title for outcome text ("NOT READY · 4 fixes" changes to outcome verdict).

   **Consistency finding:** Seal is *always* animated (rise or fade), *always* displays confirmation copy (receipt, disposition, outcome), and *always* colors the artifact to signal finality (teal/green for success, amber for caution). Rise animation is the signature: beat 08/09/10 all use it. Same grammar.

4. **RE-ENTRY** — rendered as *the held work visibly returning*
   - **Cut 10 (Today):** Held reads come back as hero cards ("Needs a decision · held 2 days", "Re-surfaced overnight"). The read `.sr-founding-0512` that was sealed in cut 01 now appears as a card with status tags + action buttons. Visual: card layout with left accent border (judgment-color), serif title ("NOT READY · 4 fixes"), decision buttons. The *same read object* re-surfaces with its vault history visible.
   - **Cut 01 (Slate-tray):** No re-entry staging; this is the read-capture surface. (Re-entry is cut 10's job.)
   - **Cut 11 (Govern):** Tabs structure: "TODAY" (re-entry context), "THE LOOP" (read→correct→sign), "MIRROR" (calibration). Re-entry pattern is implicit in tab nav, not a moment.

   **Consistency finding:** Re-entry is *cut 10's sole responsibility*. The surface shows the sealed work returning, with visual continuity (card + border + tags) so the operator recognizes *this is the same thing I sealed*. No animation on re-entry itself; weight comes from *hero position* + *vault-visible history*.

### Legibility Without Thesis: The Verdict

| Cut | Beat | Staged with Thesis? | Reads Without Prior Context? |
|-----|------|-------------------|------------------------------|
| **01** | Refusal | YES (glyph + arrows) | YES — `⊘` is universal "no" |
| **08** | Refusal | YES (banner + color) | PARTIAL — "GUARD STATE" requires reading |
| **09** | Refusal | YES (border + verdict color) | YES — red border = refusal |
| **06** | Correction | YES (handwritten layer) | YES — Caveat font + gloss language is self-evident |
| **10** | Seal | YES (rise + outcome serif) | YES — "Resolved well" + animation read as finality |
| **08/09** | Seal | YES (artifact + rise) | PARTIAL — requires reading receipt text |

**Finding:** Refusal reads *spatially* (glyph, color, banner) across all cuts. Most refusals are self-evident to a first-time operator. Seal is *universally animated* (rise), but requires reading artifact text to understand what is sealed. Correction is *text-dependent* (rule clauses in 08/09, marginalia gloss in 06).

---

## 2. Contradictions — Where Cuts Stage the Same Beat Differently

### Contradiction 1: Refusal Grammar Splits at High Stakes

**The split:**
- **Custody (08):** Refusal is *architectural* — the "GUARD STATE" banner appears, but it's not a refusal *of a read by an agent*. It's a *system refusal to evaluate intent* until evidence chain clears. Refusal is *positive constraint*: "we are holding this case open because evidence is contested." (Inventory line 800: "Guard banner ... contains field `.guard-banner` with title/meta/body ... dashed interior borders.")
- **OSINT (09):** Refusal is *agent-level* — individual reads carry `.data-v="refused"`, left-bordered in red. Each read's refusal is a *judgment call by a specialist* ("this data doesn't support my read lane"). (Inventory line 905: "Read slide-up ... with verdict data-v ... --c-refuse (#E5484D, alarm red).")
- **Slate-tray (01):** Refusal is *epistemic* — agents (`⊘` glyph) refuse *to opine out-of-lane*. Refusal-arrow lines point *inward*, implying "this agent won't answer, ask that agent instead." (Inventory line 158: "refusal arrows ... opacity 0 until active".)

**Why it matters:** All three are *refusals*, but the *boundary of refusal* is different:
- **08:** System refuses to let operator claim intent (upstream refusal, positive constraint)
- **09:** Agent refuses to stake read on this data (specialist refusal, negative constraint)
- **01:** Agent refuses to cover this ground (routing refusal, lateral constraint)

**Evidence for ambiguity:** An adjudicator trying to infer "what is the canonical refusal beat" would see three *different social acts* sharing a visual grammar. Cut 08's banner is not the same as cut 09's read-border, though both are *refusals*. The grammar (spatial, colored) is consistent; the *semantics* (what is refusing, why) is not.

**Candidate resolution:** The thesis says "refusal is the system declining to proceed." Custody 08 and OSINT 09 both stage that: 08 says "don't proceed without evidence-clearing" (system refusal), 09 says "don't proceed on this specialist's read" (agent refusal, which *collectively* can block). Slate-tray 01 stages "routing refusal" (ask another lane). These are *three flavors of the same refusal architecture*. But the visual grammar doesn't *name the flavor* — it just colorizes and positions. This is a **minor contradiction**: the grammar is coherent, but the *meaning* requires context.

---

### Contradiction 2: Seal Animation vs. Static Receipt

**The split:**
- **OSINT (09):** `.dispo` rises with `@keyframes rise` 0.5s ease. Refusal arrows animate to opacity 0.55 (sweep background continuous). Actions *flash* on re-rank (beat 3, `@keyframes flash` 0.9s). Seal is *choreographed motion*. (Inventory lines 273, 255-256, 637-640.)
- **Custody (08):** Receipt artifact appears via conditional render; no animation cited. (Inventory lines 2702-2714: "hidden (empty `rule-receipt`) to visible via conditional render".) Seal is *instant state toggle*.
- **Today (10):** Outcome seal rises via `@keyframes tdy-rise` 520ms. Outcomes fade as verdict *rises in*. Seal is *animated rise*. (Inventory lines 315-325, 589.)

**Why it matters:** Two cuts (09, 10) animate seal as *rise*. One cut (08) toggles seal as *state without animation*. The inventory notes OSINT has "motion is purposeful: fade-in for observations, slide-in for specialist reads, bar animation for hypotheses, flash for re-rank action highlight" (line 1018), so motion is pervasive in 09. Why no motion on seal in 08?

**Candidate explanation:** Cut 08 is "Custody" — a dark-field, deliberative register. Cut 09 is "OSINT" — a computed-kernel surface with full animation (inherited from kernel.bundle.js, line 952 inventory). Cut 08 is *operator-facing*, so motion is minimal, precise. Cut 09 is *demo of the loop*, so motion is rich. But this is a **design-intent split**: there's no explicit rule saying "seal animates sometimes, doesn't other times based on altitude." The grammar could be clarified: *does seal rise universally, or only on demo surfaces?*

---

### Contradiction 3: Correction Persistence — Gate vs. Gloss

**The split:**
- **Margin-read (06):** Correction is a *founder's gloss* (Caveat font, positioned `.ed-note`). Gloss is *visible during read*, footnote-layer. Clicking an `.outcome` button *seals* the verdict, but the gloss persists as a layer *beneath* the read. (Inventory line 684: "`.ed-note` elements ... positioned absolutely ... fade-in on `.show` class".)
- **Custody (08):** Correction is a *rule-save gate*. Operator must click "SAVE REVIEW RULE" to unlock beat 4→5. Rule persists in WHEN/THEN clauses (durable doctrine). Gloss is *policy*, not annotation. (Inventory lines 2459-2467: "`saveRule()` ... persist state.ruleSaved, advance to beat 4 if < 4, show toast".)
- **OSINT (09):** Correction is *doctrine unsigned*. Doctrine rule is visible as a WHEN/THEN block (lines 40-45 snapshot). Operator cannot seal without rule. Rule is *policy* (like 08), but rendered as *visible clause structure* (unlike 08, which hides the rule in state). (Inventory lines 622-683: doBeat() state machine; beats 2-3 include "signRule()".)

**Why it matters:** Three different UX patterns for *the founder correcting the read*:
- **06:** Gloss is *annotation during read*, persistent, does not gate further action
- **08:** Correction is *rule creation that gates progression*, rule hidden in state UI
- **09:** Correction is *rule creation that gates progression*, rule visible as clause-structure

**Candidate ambiguity:** Is correction a *persistent gloss layer* (06) or a *policy gate* (08/09)? The thesis says "corrections are the moat" — implying they persist as durable policy. Cuts 08/09 stage this as *gates*. Cut 06 stages corrections as *annotations* that are independent of sealing (you gloss the read, then seal an outcome, both persist). This is a **moderate contradiction**: the *function* (correction → durable record) is consistent, but the *UX pattern* (gloss vs. gate vs. clause) varies. An adjudicator might infer two canonical patterns (gloss-layer vs. rule-gate), not one.

---

## 3. Beat-by-Beat Table — How Each Cut Stages the Loop

| Cut | REFUSAL | CORRECTION | SEAL/RATIFY | RE-ENTRY |
|-----|---------|-----------|------------|----------|
| **01 Slate-tray** | Orbital agent `⊘` glyph + refusal-arrows (inward). No prose. Reads as "agent won't opine here." (Inventory 151-155, 158) | Amend button on register hover (line 134). Adds `.corrected` class + gradient background. Correction recorded in CHAIN array (append-only). (Inventory 117-118, 387-389) | Disposition buttons ("Confirm", "Defer"). Sign button seals with toast ("Sealed & handed off"). No seal animation visible. (Inventory 120, 393, 119) | N/A — this is the read surface. Re-entry happens in cut 10. |
| **04 Onboarding** | N/A — first-run, pre-loop | S05 "Connect a source" includes negations ("— not a journal app", "— not a coach"). Negations set boundary. (Inventory lines 26-31) | S07 tray-sigil evolution animates Day 1→60 vault fill (visual proof of persistence). No explicit seal click; progress implicitly seals each step. (Inventory 507, 667-675) | N/A — onboarding is pre-loop. S07 CTA: "Take the first read ⌘⇧L" (re-entry call). |
| **06 Margin-read** | N/A — re-entry surface, no refusal staging | Marginalia `.ed-note` (Caveat, signal-color) gloss visible during read. Walk engine stages gloss via `spotlight` class. Gloss is *founder's voice*, not system. (Inventory 684-686, 706-709) | Clicking `.outcome` button seals verdict to vault + updates `.sealed-verdict` + shows `.sealed` box. Outcome buttons disabled after seal. `.cal-num` bumps ("7 of 9" → "8 of 10"). (Inventory 793-804, 721-722) | N/A — this is a margin-read of a held decision, re-entry moment. (Inventory 729-737 says "This cut visualizes the FULL loop in one re-entry frame".) |
| **08 Custody** | Guard banner ("GUARD STATE: ARMED") with `--stability` color (amber/orange edge). Refusal is *system's hold on command flow*. Banner visible at beat 3+. (Inventory 800, 936-944) | "SAVE REVIEW RULE" button (line 2190). Rule gates beat 3→5. Rule is WHEN/THEN clause visible (lines 2173-2189). Operator must fill rule to unlock. Gate is *durable doctrine*. (Inventory 2459-2467, 817) | Receipt artifact (`.receipt`, 1px `--connection-edge` border) displays "RULE-014 saved from CASE-014" (line 2707). Conditional render (hidden → visible). No animation cited. (Inventory 2702-2714, 798-799) | N/A — custody is a deep-loop cut. Re-entry is cut 10. |
| **09 OSINT** | Reads with `.data-v="refused"` left-bordered in `--c-refuse` (#E5484D red). Verdict status is *specialist refusal*, not system hold. Specialist won't stake read on this data. (Inventory 905, 221-224) | Doctrine rule (WHEN/THEN visible, lines 40-45). Operator reviews rule at beat 2. Rule gates beat 2→3 signature. (Inventory 622-683 doBeat(), beats 2-3: "signRule()".) | Disposition `.dispo` rises via `@keyframes rise` 0.5s ease. Displays "X cases sealed · doctrine R-001 active · latest case C-015 · disposition [result] · Y ontology nodes" (lines 674-677). Teal border `--c-ok`, 5% teal background. (Inventory 273, 891, 1018) | N/A — OSINT is a demo/proof surface. Re-entry shown in cut 10. |
| **10 Today** | N/A — re-entry surface | N/A — re-entry surface shows sealed reads. Correction stream is historical (past reads + past corrections). | Outcome buttons ("Resolved well", "Mixed", "Regret it", "Still open") trigger `.is-sealed` class. CSS `.is-sealed` triggers `@keyframes tdy-rise` 520ms. Outcomes fade as verdict rises + "7 of 9" calibration counter bumps. (Inventory 589, 1044-1046, 315-325) | Held reads resurface as hero cards ("Needs a decision", "Re-surfaced overnight"). Vault history visible. Same read object re-enters with status tags + decision buttons. Visual continuity via card + border + tags. (Inventory 1030-1051, 1024-1026) |
| **11 Govern** | N/A — command/cockpit surface | Register amend button (line 154-155). Hover → `.amend` visible. Clicking toggles `.editing` class, shows edit form. Save/cancel commits or discards. (Inventory 1108-1109, 162-169) | N/A — Govern is a control surface, not a seal moment | N/A — Govern is a summary surface (tabs for TODAY / THE LOOP / MIRROR / etc.) Re-entry shown in cut 10. |

---

## 4. Ambition Gap — Grade + Rationale

**Grade: B+ (High craft, minor coherence drift)**

**Rationale:**

The cuts *agree* on a core emotional grammar: spatial refusal (color + position), correction as policy-gate or gloss-layer, seal as animated rise (or state toggle), re-entry as visible return. This is **strong moment-design**. Operators feel the beat shifts without narration.

However, three gaps prevent a uniform system:

1. **Refusal semantics** (Contradiction 1): Three flavors of refusal (system, agent, routing) share the same visual grammar but different *meanings*. A canonical system would either:
   - Unify the glyph/color scheme so the *flavor* is visually distinguishable (e.g., system refusal = solid amber banner, agent refusal = red left-edge, routing refusal = glyph rotation), or
   - Document the three flavors explicitly in a design guide so canon-builders know which to use where.

2. **Seal animation variance** (Contradiction 2): Custody (08) seals with state-toggle; OSINT (09) and Today (10) seal with rise animation. The *why* is likely altitude-based (demo vs. operator), but this is not explicit. **Spec needed:** "Seal animates universally in demo surfaces (09, 10); minimal motion in operator surfaces (08)."

3. **Correction UX split** (Contradiction 3): Gloss-layer (06) vs. policy-gate (08/09) vs. clause-visible (09) are three patterns for the *same function*. **Spec needed:** Choose one canonical pattern (likely: policy-gate + visible clauses, as that's what 08/09 converge on) or formally support all three with use-case guidance.

**Why B+ and not A:** The craft is *high* — moments read instantly, animation is purposeful, affordances are clear. The gap is *coherence*, not execution. Each cut is internally consistent. The system-level contradiction is resolvable (spec + unification), not a bug.

---

## 5. Verdict — One Paragraph

The Liminal prototype cuts stage the loop's emotional beats via a *consistent spatial grammar* (refusal as color + position, seal as rise-animation + artifact, re-entry as hero return) that reads without prior thesis knowledge. Operators feel the architecture instantly: agents refusing out-of-lane; founders correcting policy; decisions sealing into vault; sealed work returning overnight. However, the cuts express *three flavors of refusal* (system-hold, agent-refusal, routing), *two seal-animation patterns* (animated rise vs. static toggle), and *three correction UX models* (gloss-layer, policy-gate, visible-clause) without explicit coordination. This is craft coherence (each cut is beautiful) masking system incoherence (a canon-builder cannot infer *which pattern is canonical*). Spec the three contradictions—unify refusal semantics, document seal animation rules, choose correction UX—and the system is ready for desktop handoff.

---

## Sources & Evidence

- **RUN_B_CUTS_INVENTORY.md (canonical fact sheet):** Lines cited throughout; read 2026-07-01, lines 1-1415
- **Live cuts walked:** 01-slate-tray, 04-onboarding, 06-margin-read, 08-liminal-custody, 09-osint-custody, 10-today, 11-govern
- **Browser snapshots:** All cuts accessed via http://127.0.0.1:5173/, DOM tree verified via chrome-devtools
- **File citations:** design-tokens.css, cut-shell.css, lib/brand-upgrade.css (shared CSS); per-cut HTML/inline-styles
- **Contradiction evidence:** Inventory cross-references; live visual inspection confirms staging patterns

---

## For the Adjudicator

This critique is **read-only, observation-only**. No files modified. Every claim sources to inventory line numbers or live snapshot. The three contradictions are *labelled, not resolved*—resolution requires founder decision (which pattern is canonical) and design-system update (CONTRIBUTING rule or token guide). The B+ grade reflects the cuts *as-built*: high craft, coherent *locally*, ambiguous *system-wide*.
