# RUN_B_COHERENCE_FINDINGS — do the cuts cohere as one design system?

> **Status: NOT-CANON.** Designer-judgment substrate for the Fable Run-B adjudicator.
> Provenance: producer session 2026-07-01 (same session as `RUN_B_CUTS_INVENTORY.md`,
> commit `91895e5`). Nothing here is a decision; contradictions are LABELLED, not resolved.
>
> **Method.** Panel-style critique, independent-then-converge: four critics, each with one
> lens (typography-as-craft / spatial rhythm / motion-carries-meaning / moment-design), each
> writing its full critique BEFORE seeing any other's. Two critics judged the fresh 1440px
> render wall + state screenshots; two drove the live cuts in a browser (dev server,
> separate browser instances). All four consumed `docs/RUN_B_CUTS_INVENTORY.md` as fact
> substrate and cited source only to confirm claims. Raw critiques preserved verbatim in
> `docs/run-b-critiques/` — read them for full evidence; this doc is the convergence.
> Reference = INTERNAL COHERENCE (what system do the cuts actually express?), not
> canon-compliance and not the desktop port.

---

## 1. The emergent system — where the cuts agree

These are the rules the panel found the cuts already obeying. For a canon-inferrer, this
is the "real" system, expressed in behavior rather than documentation.

**E1 · Three-voice type stack with a stable division of labor.** Display (Nineties
Headliner) = announcement/topic anchor; serif = the voice of reasoned argument (agent
reads, claims, narrative); mono (Geist Mono) = structured data, labels, evidence chains —
never narrative. The typography critic checked all 12 surfaces and found **no cut asks a
voice to do a different job** (critique-typography §1). This held even where the serif
*font file* drifts (see C3).

**E2 · Three-pane macOS frame as skeleton.** Titlebar (traffic lights + brand wedge) →
left rail | work | right rail → footer ribbon, per cut-shell.css. Cuts 00–09 all honor
it; only 10 (two-column card grid) and 11 (tab nav overlay) restructure
(critique-spatial §1, with per-cut column measurements).

**E3 · Rise = ceremony; fade-only = state change.** Across every cut with motion,
`translateY`-up + opacity-in marks a *witnessed moment* (register reads arriving,
disposition rising, sealed verdict landing), while fade-without-rise marks background
state transitions. The motion critic found this distinction maintained with **no
exceptions** (critique-motion §1, seven cited `@keyframes`).

**E4 · Two-easing vocabulary.** Standard ease `cubic-bezier(0.4,0,0.2,1)` for state, spring
`cubic-bezier(0.34,1.56,0.64,1)` reserved for gesture/magnetic hover, uniformly at .22s
(cut-shell.css:190; design-tokens.css:956, 1175). Custom eases appear only in two
localized entries (critique-motion §1).

**E5 · Refusal is always spatial, never prose-only.** Crossed-circle glyph + inward
arrows (01), guard banner occupying real estate + blocked downstream command (08),
red left-border on the read itself (09). The moments critic walked the beats live and
found refusal reads to a first-time operator without narration in nearly all cases
(critique-moments §1.1 and its legibility table).

**E6 · Component-level spatial consistency.** Tray tiles, disposition paper-cards, and
register read blocks carry near-identical insets across the cuts that use them (12–16px
paper-cards everywhere; tile variance ≈1px). No component drift found
(critique-spatial §1, "Component Spatial Consistency").

**E7 · Density asymmetry is deliberate, and cut 08 is exonerated.** The brief suspected
the 2,816-line custody cut of accretion; the spatial critic's squint verdict is that its
density is domain-semantics (map SVG + multi-pane state machine), with rest where rest is
meant — "no filth found" (critique-spatial §1, density audit of all 12 renders).

---

## 2. Contradiction ledger — the ambiguities Run-B must resolve

Ranked by (a) how many independent critics hit the same seam, (b) stakes. Each entry is a
question the adjudicator must answer to write canon; evidence lives in the named critique.

### C1 · The sealed moment has three (arguably four) choreographies — flagged independently by BOTH live-browser critics. HIGHEST STAKES.
The same semantic event (decision sealed, persisted to vault) is staged as:
- **instant inline append**, no animation — cuts 00, 08, and 11's artifact (finality-as-instant);
- **360ms rise** — cuts 01, 06;
- **500ms rise** — cut 09;
- **bifurcated** — cut 11: instant artifact + 600ms orbital center-orb glow.
Full table with per-cut on-screen behavior: critique-motion §3; independent confirmation
critique-moments Contradiction 2. Both critics independently offered the same *candidate*
explanation — operator surfaces stay minimal, demo surfaces animate — and both note no
such rule is stated anywhere. **Question for Run-B: what does "sealed" look, feel, and
time like — one ceremony, or an altitude-dependent rule that must then be written down?**

### C2 · Tokens are declared but not consumed — flagged independently by TWO critics.
Canon declares `--ls-mono`, `--fs-*`, spacing candidates; **no cut binds to them** — every
size, tracking, inset, and rail width is hardcoded inline. Typography: tracking values
.10/.12/.14/.16/.18/.20em across cuts vs the declared `--ls-mono: 0.18em` default, with a
per-cut table (critique-typography §4). Spatial: no `--space-*` scale exists; insets run
7×9px → 0px → 8px → 12–20px ad hoc, rail widths 196/232/264/280/320/392px with no scale
(critique-spatial Contradictions 1 & 4). **Question: are tokens infrastructure (require
binding, canonize the scales the renders imply) or documentation (embrace compositional
sizing)? The renders are consistent enough to extract scales from; the code never claims
them.**

### C3 · The serif identity is unresolved: Perfectly Nineties vs Newsreader — TWO critics.
Newsreader (off-canon per commit `5b269f7`'s own comment) is still *loaded* in 8 of 12
cuts and *hardcoded* in several (03:129,444; 09; 10 ×8 instances) while brand-upgrade
declares Perfectly Nineties. The two faces read differently (journalistic vs branded-warm)
and have different metrics, which cascades into line-height and section rhythm. Per-cut
load matrix: critique-typography §5; spatial-rhythm consequences: critique-spatial
Contradiction 5. **Question: one serif, which, and does the answer change body
line-height math?**

### C4 · Correction has three UX models for one function.
Founder-corrects-the-read is staged as (a) handwritten gloss layer during read, Caveat,
non-blocking (06); (b) rule-save as a blocking gate with the rule hidden in state (08);
(c) rule-save as a blocking gate with the WHEN/THEN clause visible (09); plus 01's
lightweight amend-on-hover. The thesis line "corrections are the moat" implies durable
policy, which 08/09 stage and 06 does not. Evidence: critique-moments Contradiction 3 and
beat table. **Question: one canonical correction pattern, or two named patterns
(gloss-layer vs rule-gate) with use-case guidance?**

### C5 · Refusal: one grammar, three semantics — and two timings.
The moments critic distinguishes system-refusal (08: hold on command flow), agent-refusal
(09: specialist won't stake a read), and routing-refusal (01: out-of-lane, ask the other
agent) — three different social acts sharing one visual grammar that never names the
flavor (critique-moments Contradiction 1). Independently, the motion critic found the
refusal-arrow reveal is 200ms in cut 00 but 320ms in 01 and 11 (critique-motion Finding
5). **Question: does canon name the refusal flavors (distinct treatments) or keep one
grammar; and is refusal a fast supporting detail (200ms) or a witnessed beat (320ms)?**

### C6 · Frame restructuring in cuts 10 & 11 is undocumented.
Cuts 00–09 establish three-pane as an invariant; 10 breaks it (two-column card grid,
`grid-template-columns: 1fr 360px`, 10-today.html:163–170) and 11 extends it (tab nav).
Both are well-crafted, neither cites a rule. Evidence: critique-spatial Contradiction 2.
**Question: is three-pane invariant (10/11 are exceptions needing rewrite or explicit
license) or a default pattern with documented restructuring conditions (re-entry
surfaces, command surfaces)?**

### C7 · Display-scale steps are unclaimed.
Hero/announcement type lands at 22px (00), ~28–32px (04, via `--fs-3xl`), 36px-!important
(01), ~36px serif (11) for the same semantic load, with no named steps; one cut needs
`!important` to win the cascade. Evidence: critique-typography Findings 1–2, §3.
**Question: lock a display scale (display-sm/display?) or canonize moment-relative
sizing — and fix whatever cascade fragility forced the `!important`.**

### C8 · prefers-reduced-motion coverage is 50%.
Explicitly handled in 01, 04, 05, 06, 09 (09 most aggressively: `animation: none
!important`); absent in 00, 03, 08, 10, 11 — including motion-heavy 00 and 08 (16s map
sweep). cut-shell.css:202 covers only button transforms globally. Evidence:
critique-motion Finding 4. **Question: is reduced-motion parity a shipping requirement
per surface, and does it silence ambient motion, ceremonies, or both (do toasts
survive)?**

### C9 · Ambient vs refined motion has no precedence rule.
Orbital glyph pulses on a 4.2s step cycle while gesture motion runs at .22s on top;
nothing states whether a user action interrupts, restarts, or coexists with an active
pulse — and the shared `pulse-glyph` keyframe has a bound duration in 01 but an
unspecified binding in 11. Evidence: critique-motion Findings 1 & 3. **Question: a
two-tier motion policy (ambient yields to refined?) plus one canonical pulse duration.**

---

## 3. Panel disagreements — findings in their own right

The critics wrote independently; where they disagree, the design is ambiguous, not merely
disliked.

**D1 · Grade split: typography C+ vs spatial B+ vs motion B+/A− vs moments B+.** The
typography critic graded the same substrate a full band lower. The substance of the
disagreement: whether *consistent rendered results from hardcoded values* counts as
coherence. Spatial/motion/moments treat the missing token layer as "one abstraction short
of canon" atop sound craft; typography treats unclaimed scales + dual serif + unconsumed
tokens as the system itself being unresolved ("tokens are documentation, not
infrastructure"). Both readings are defensible — which one Run-B adopts materially changes
how much the canon must *invent* vs merely *transcribe*. This is the panel's deepest
split; surfacing it is the point.

**D2 · "Seal is always animated" vs the instant seals.** The moments critic's
emergent-system section asserts seal is always animated; the motion critic's per-cut table
documents instant seals in 00 and 08 (and the moments critic's own Contradiction 2 then
concedes 08). Where they conflict, the motion critic's evidence is more granular (per-cut
DOM/keyframe traces). Recorded because a canon-inferrer reading only critique-moments §1
would over-generalize.

**D3 · Cut 01's seal: 360ms rise (motion critic, from source + trigger) vs "no seal
animation visible" (moments critic, from its walk).** Likely the moments walk didn't reach
the confirm beat; flagging so Run-B verifies against `cuts/01-slate-tray.html:340` rather
than trusting either observation alone.

---

## 4. Per-surface notes (one line each, panel-consolidated)

| Surface | Coherence note |
|---|---|
| index.html | Catalog front door; hero + speedrun states; consumes canon chrome. |
| 00-agency | The invariant made flesh (SUBJECTS switch); earliest motion values (200ms refusal) that later cuts outvote; no reduced-motion block. |
| 01-slate-tray | Fullest loop surface; 360ms seal-rise camp; entry overlay diverges from every other cut's direct-open; one `!important` hero. |
| 02-forensic | Static by design (no motion at all — itself a data point for the altitude rule); dense center/right vs calm left, domain-appropriate. |
| 03-calibration | Data-viz register (0px cell insets, 1px gaps — principled outlier); worst serif drift (hardcoded Newsreader ×2 live). |
| 04-onboarding | Closest to token discipline + most generous spacing; staged 520ms entry choreography; reduced-motion handled. |
| 05-plugin-seed | Terminal-mono register; temporal (not spatial) rest via 220ms beat stagger; coherent as a deliberate register extreme. |
| 06-margin-read | The gloss-layer correction model (vs 08/09's gate); 360ms seal camp; reduced-motion handled. |
| 08-liminal-custody | Exonerated of accretion; instant-seal camp (proof-of-transaction receipt); widest chrome (656px rails); no reduced-motion block despite 16s ambient sweep. |
| 09-osint-custody | Richest purposeful motion (kernel-driven); 500ms seal camp; visible-clause correction; most aggressive reduced-motion handling. |
| 10-today | Breaks the three-pane frame (undocumented); 520ms seal-rise; re-entry weight carried by hero position + vault history, not animation. |
| 11-govern | Bifurcated seal (instant artifact + 600ms orbital glow); tab-nav frame extension; 320ms refusal camp. |
| _demo-lan | Presentation shell over the cuts; calm-mode legibility layer lives here, not in the cuts themselves. |

---

## 5. Ambition-gap summary

Panel consensus (with the D1 dissent noted): **craft is high and internally consistent per
cut; the system exists in behavior but not in rule.** Recurring phrase across three
independent critiques: *one abstraction layer short of canon*. What separates this from
the best dense-operator interfaces is not execution but the absence of claimed scales
(type, spacing, rail), a written seal/motion policy, a single serif, and token
consumption. Every contradiction in §2 is resolvable by decision + spec, not rework —
except C1 (the seal), which is a genuine design choice about what finality feels like,
and is the single call with the most downstream surface area.

---

*Producer session, 2026-07-01. Inputs: RUN_B_CUTS_INVENTORY.md (commit 91895e5), fresh
1440px render wall (13 surfaces, scratchpad archive), live walks of 7 cuts. Panel: 4
independent single-lens critics (Sonnet), converged by the producer session. NOT-CANON —
Run-B adjudicates.*
