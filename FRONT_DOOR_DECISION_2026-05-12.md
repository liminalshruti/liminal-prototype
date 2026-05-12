---
id: decision.prototype.front-door.2026-05-12
type: decision-record
status: ACCEPTED · 2026-05-12 evening
deciders: Shruti
audience: future Claude sessions, prototype index curators, anyone deciding which cut to link as canonical
parent_canon:
  - cuts/01-slate-tray.html
  - liminal-desktop/docs/may-12-launch/19-ui-design-brief.md
related:
  - liminal-desktop/docs/may-12-launch/23-multi-agent-unpause-decision.md
  - founder-brain/strategy/PRD_DESKTOP_PILOT_2026-05-12.md
---

# Prototype Front-Door Decision

## Decision

**`cuts/01-slate-tray.html` (canon, brand-first hero) is the single canonical front door for all audiences.**

This is the artifact that:
- The prototype index page lists first / links most prominently
- `theliminalspace.io` links to as the "see the product" surface
- Speedrun partners are pointed to when sharing the prototype
- Founder-cohort prospects land on for M3 pilot recruitment
- Substack/brand-audience readers see when clicking from editorial content

## Rejected alternatives

- **`cuts/01-slate-tray-speedrun.html` as front door** — Speedrun-register hero (wedge-first sentence) reads correctly to product/partner audiences but is harder to recover from for brand-audience readers. Brand-first hero is the safer default; partner/product audiences get the workspace mechanics one beat later, no information lost. Speedrun cut stays available for internal/partner-specific contexts (e.g., direct sends to a16z partners) but is not the public front door.
- **`cuts/02-alt-ui.html` (doc-shape)** — sequential prose flow (CASE FILE → DILIGENCE → SYNTHESIS → JUDGMENT) is an alternate-register read for audiences that don't parse workspace UI. Linked, not front. Available for prospects who recoil from product-mechanics framing.
- **`cuts/00-hero-demo.html`** — single-scenario doc-shape, editorial register. Useful for landing-page-style brand reads but does not show the workspace product surface that M3 pilot will ship.
- **`cuts/03-calibration.html`** — analytic dashboard (12wk vault heatmap). Investor-side artifact for showing longitudinal signal. Not landing surface.
- **`cuts/08-liminal-custody.html`** — natsec-register custody view. Separate audience funnel (DoD, classified-register prospects). Not main door.
- **`cuts/04-07-onboarding-*`** — React/JSX user-flow pages. Live downstream of the front door, not as the door itself.
- **Different front door per audience** — exact register-fragmentation problem `feedback_audience_register_pitch_map.md` warns against. Different *pitches* per audience, yes. Different *front doors* per audience, no.

## Why one canonical front door

Three reasons:

1. **Discipline that scales.** Every audience-specific front door is one more surface to maintain coherent. One canonical artifact reduces maintenance + propagation cost; the per-audience-pitch work happens upstream of the front door (in deck slides, in cohort recruitment emails, in partner intros), not downstream.
2. **Brand-first hero is the safer default.** A Speedrun partner landing on cut 01-canon gets the brand sentence first, then reads into workspace mechanics. They get the operator-grade product surface, just one beat later. No information lost. A brand-audience reader landing on cut 01-speedrun gets the wedge sentence first ("operator app at agentic scale") which is harder to recover from for a non-product audience.
3. **It's already at parity.** Both 01 variants got full v0.9 anointment as of PR #6 merge (2026-05-12). The choice is curation, not build.

## Answers to the three parallel-session questions

A parallel session paused before opening new cut work and asked three questions. This decision-record answers all three so the parallel session can resume:

### Q1 — Which cut is the front door?

**`cuts/01-slate-tray.html` (canon, brand-first hero).** See §Decision above. PRs #6–9 already merged (2026-05-12 23:28 UTC); they brought 01-canon, 00-hero-demo, 03-calibration, and 08-custody to v0.9 anointment parity, which made this question answerable as a curation choice rather than a build choice.

### Q2 — Onboarding cuts (04/06/07) — separate work-stream or deliberate separation?

**Separate work-stream, scoped after pilot M2.0 ships.** They live downstream of the front door (post-discovery, post-signup, post-cohort-recruitment). Not gated to a different surface in code — they're prospect-discoverable today via the cuts directory — but the seam is acceptable for now because:

- The 20-founder M3 cohort is recruited directly (briefed founders, not cold prospects browsing the cuts catalog)
- Anointing onboarding cuts to match 01-canon's v0.9 register is real engineering work (React/JSX + separate CSS in `onboarding/`) and shouldn't block M3 ship
- Post-M3, when public discovery becomes relevant, onboarding cuts get their own anointment pass

**One-line clarification for the parallel session:** if you want to surface that the seam is deliberate-and-temporary (not lost), add a comment on `index.html` near the onboarding-cuts list saying "post-discovery surfaces — anointment scheduled post-M3." That's a 5-minute addition, not a work-stream.

### Q3 — Cut 02 doc-shape positioning — alternative read or competing product surface?

**Alternative read for a different ICP, not a competing product surface.** Cut 02 reads as institutional-doc-shape (CASE FILE → DILIGENCE → SYNTHESIS → JUDGMENT) which speaks to natsec/business audiences who don't parse workspace UI. It is the *same product* as cut 01 (same correction-loop thesis, same vault, same Analyst+Auditor agents) rendered in a different visual register.

**Why this doesn't violate Andrew Chen's "Tuesday afternoon" question:** Andrew's framing was "I can't picture what someone does with this on Tuesday afternoon." Cut 02 doesn't fragment the answer — it shows the same Tuesday-afternoon action through a doc-register lens. A natsec analyst's Tuesday afternoon looks like reading a structured case file; a tech founder's Tuesday afternoon looks like dropping context into a tray. Both surfaces test the same product thesis.

**Concretely:** cut 02 is linked from the cuts catalog and from natsec-audience contexts. It is **not** linked from `theliminalspace.io` as a primary CTA. The front door routes everyone through cut 01-canon; cut 02 is a register-alternative for prospects who don't parse the workspace UI.

If cut 02 starts pulling traction that cut 01-canon doesn't, that's a positioning signal worth a revisit per §Revisit criteria above — but today it's clarifying-the-pitch-for-an-audience, not parallel-product-confusion.

---

## What this triggers (downstream work)

Not blocking, sequenced:

1. **Prototype index curator pass** (~30 min) — `liminal-prototype/index.html` (or whichever lists cuts) shows canon first, with a sentence describing what each cut is for. Prevents random landing on cut 03 calibration or cut 08 custody.
2. **`desktop-pilot` fidelity target updated** — earlier today the direction was "make pilot look and feel like cut 01-speedrun." With this decision, the source becomes cut 01-canon (brand-first hero). The chrome is identical post-PR-#6; only the entry-card differs.
3. **Onboarding cuts anointment plan** — separate work-stream, scoped after pilot M2.0 ships. Onboarding cuts (04/05/06/07) live downstream of the front door. Not urgent for the M3 cohort if founders are briefed directly.
4. **`theliminalspace.io` link audit** — verify the brand site links to `cuts/01-slate-tray.html` (canon), not `01-slate-tray-speedrun.html` or any other variant. If currently pointed elsewhere, update.
5. **Speedrun cut becomes internal** — cut 01-speedrun stays as a usable artifact for direct-send to a16z partners (where the wedge-first hero lands cleaner) but is not the surface anyone discovers organically.

## Revisit criteria

Overturn if:
- Brand audience consistently bounces from cut 01-canon (signal that brand-first hero doesn't actually pull product-curious readers in) → consider 00-hero-demo or 02-alt-ui as front door
- Speedrun partner feedback says cut 01-canon's hero buries the product → consider speedrun cut as front door, brand cut becomes internal/Substack-only
- M3 pilot launches and cohort-recruitment funnel data shows a different cut converts better → switch
- Liminal pivots positioning (e.g., "judgment infrastructure" → different framing) → re-evaluate hero entirely

## Status history

- **2026-05-12 evening** — ACCEPTED. After PR #6 merge brought cut 01-canon to anointment parity with cut 01-speedrun, the question was no longer "which to build" but "which to curate as canonical."

## Action items (not blocking; work to sequence after this decision)

1. Curator pass on `index.html` to surface cut 01-canon prominently
2. Update `liminal-desktop/docs/may-12-launch/22-interaction-spec-tray-to-vault.md` if it references cut 01-speedrun as the visual reference (should now reference 01-canon)
3. Confirm `theliminalspace.io` link target
4. Add an `_internal/` or `_partner/` directory hint that cut 01-speedrun is for direct-send contexts, not organic discovery (optional documentation)
