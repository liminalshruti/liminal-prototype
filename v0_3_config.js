/**
 * v0_3_config.js · The seam between spec v0.3.2 and the unified prototype.
 *
 * Spec: ~/liminal/founder-brain/_scratch/2026-04-27_liminal-agents-architecture-refactor.md
 * Decision 9 (Tandem model) governs this file.
 *
 * RULE: every still-soft decision in the spec lives here as a variable.
 * Spec change → config edit → all surfaces update. One source, two product projections.
 *
 * Forbidden: per-scenario forks of these values. If scenario code references
 * a value not in this config, it's a spec-tandem violation · refactor it back here.
 *
 * ─── LOCKED in v0.3.2 (do not change without spec edit) ───────────────────
 *   - The architectural spine is THE TWO-PRODUCT FORK (per Apr 25 10:14 PM):
 *       Liminal Personal · identity-telemetry · individual-first · founders + creators wedge
 *       Liminal Business · governance pipe · org-first · Snowden/Hansen-class surface
 *   - Both products run on the same substrate (bounded refusal + correction stream
 *     + encrypted vault + worker-persona surface vocabulary)
 *   - Worker-persona agents on the surface (per Apr 21 explicit rule):
 *       Operator · Strategist · Synthesizer · Contrarian · Planner · Manager
 *   - Bidirectional ethics (Decision 10): protect humans from machines AND
 *     machines (institutions humans build) from humans
 *   - Category claim: "transition workspace for unresolved context"
 *   - Demo grammar: out-of-lane ask → bounded refusal → correct agent's output
 *   - Liminal Personal close runs LIVE on Shruti's Apr 14 Granola data
 *   - xTech demo surface: Liminal Business primary · Liminal Personal close
 *
 * ─── RETIRED in v0.3.2 (do not reintroduce) ───────────────────────────────
 *   - The "In direction" frame and the 6 In-direction agents (State /
 *     Doctrine-self / Embodied expertise / Cross-domain synthesis /
 *     Correction history / Liminal-inner-state). Over-fitted to a single
 *     Apr 14 passing line; absorbed disqualified-substrate synthesis.
 *   - The 5-directions taxonomy (down/out/up/sideways/in) as architectural spine.
 *   - The C2/C3/C4/Liminal four-scenario frame. C2/C3/C4 are Business sub-scenarios;
 *     Liminal Founder is the Personal close. The new top-level switcher is
 *     the two-product axis, not the four-scenario rail.
 *
 * ─── SOFT (this file owns these · change without re-spec) ─────────────────
 *   See the exported config below. Each variable is annotated with the
 *   spec section that governs it.
 */

/* version pins carved out to config/versions.js (Step 8A, 2026-06-18).
   Re-exported here so frozen archive files that import them from
   v0_3_config.js keep working unchanged. See
   docs/architecture/V0_3_CONFIG_DEPENDENCY_MAP.md. */
export { SPEC_VERSION, PROTOTYPE_VERSION } from "./config/versions.js";
// Bump on every commit. Examples:
//   v0.3.2-two-product-spine        · two-product fork is the spine
//   v0.3.3-disagreement-as-signal   · refusal-theatre out · disagreement-as-signal flow in
//   v0.3.4-four-pillars             · refusal de-spectacled · 4 register accents map to 4 ethics pillars
//                                     · in-lane-ask primitive added · refusal no longer universal
//   v0.3.5-editors-notes            · founder marginalia in Caveat · toggleable
//   v0.3.6-two-registers            · Business app-mode (macOS console) + Personal notebook-mode
//                                     (anointed-desk) · same substrate, two visual registers
//   v0.3.7-personal-close-live      · Personal close reads Apr 14 Granola substrate live (target)
//
// ─── EVOLUTION FROM v0.2 (NOT a pivot · index-v02-frozen.html is RETAINED) ─
// v0.2 is preserved at index-v02-frozen.html. NOT a discarded prototype ·
// retained substrate. v0.3 is an evolution of v0.2 into a more-articulated
// frame. v0.3 inherits from v0.2:
//   - SCENARIO 01 (Granola teardown) · bounded-agents-disagreeing-on-real-
//     transcript · pre-figures disagreement-as-signal flow
//   - OPERATIONAL · CI Molehunt Console · pre-figures Snowden/Hansen-class
//     CI insider-threat Business scenario
//   - OPERATIONAL · Vendor Coherence (Tactical Network Graph) · pre-figures
//     Contracting Officer in_lane scenario
//   - OPERATIONAL · Analyst Coherence · the founder-cofounder ↔ analyst-on-op
//     TOGGLE pattern · "same primitive that holds [Personal] holds [Business]"
//     written into the prototype before the two-product fork was articulated
//     in spec. THIS is the architectural proof, two months early.
//   - OPERATIONAL · Team Cohesion (Layered Temporal) · pre-figures team-lead
//     5-stages-of-forming Business scenario
//   - FOUNDATIONS · Design system + Component states · still load-bearing
//
// What v0.3 changed: chrome rebuilt fresh (not molehunt reskin), spec
// articulation (two-product fork explicit, four pillars co-equal,
// disagreement-as-signal named), visual register split (app-mode vs
// notebook-mode in v0.3.6). Architecture, case shapes, and toggle
// mechanic are continuous from v0.2 → v0.3.

// ─── Phase 1 substrate status ─────────────────────────────────────────────
// lib/vault/events.js on branch shruti/phase1-event-log-primitive
// Status: uncommitted but complete · EVENTS_SCHEMA, appendEvent,
//   appendEvents (transactional), queryEvents, searchEvents (FTS5), inflate
// Pending: db.js integration · migrate-events.js
// Substrate is real regardless of agent shape; agent reshape does not touch it.

// ─── Locked decisions (per spec v0.3.2) ───────────────────────────────────
// Numbered and final. Soft items live below.

// ─── Slate / Tray / Vault · the working surface (LOCKED v0.3.8) ──────────
// Per Decision 12. The metaphor is palette · mixing plate · inkwell.
// The user composes evidence onto the slate; agents read the composition;
// the brief and chain commit to the encrypted local vault.
//
// PRIVACY POSTURE · the tray is a local interception layer. Drop a window
// from any source app onto the tray, the content captures into the
// encrypted local vault. The source app sees a window-paste event. EDR
// sees the user using their tools. Liminal's read against those tools
// stays local. THIS is what makes Liminal Personal viable on a work
// laptop · employer cannot see what user reads against work surfaces.

// Tile types · what can land in the tray as a pickup-able object.

// Tray sources per surface · what the user has at hand to compose with.
// (The tray is the palette; this list is which pigments are available.)

// Slate layout primitive · how tiles arrange on the slate per surface.
// "freeform" = drag-and-drop anywhere; "case-grid" = structured panels;
// "timeline" = arranged by date.

// Spatial interaction primitives · what dropping/dragging/overlapping does.
// LOCKED · same primitives across all three surfaces.

// Refusal-on-classification · structural primitive, not stylistic.
// When a tile of higher classification is dropped onto a slate where
// agents do not have clearance, the tile is quarantined and the agency
// console shows a routing line. Per Decision 12.

// Per-product slate layout config (visual sub-pattern · soft).
// Renders the slate as a working canvas with the tray as a palette strip.

// Phased rollout per Decision 12 · which phase ships which surface as slate/tray.

// ─── Consent classes (LOCKED v0.3.8 · Team + Business surfaces) ──────────
// Per Decision 12. Refusal-on-consent is structural · same primitive as
// refusal-on-classification but enforced at a different contract layer.
// CONSENT_CLASSES carved out to config/consent.js (2026-06-18, first
// scenario/config split). Re-exported here so frozen archive files that
// import it from v0_3_config.js keep working unchanged. Live consumers
// (state.js, boot.js, slate.js) import it directly from config/consent.js.
// See docs/architecture/V0_3_CONFIG_SCENARIO_SPLIT_MAP.md.
export { CONSENT_CLASSES } from "./config/consent.js";

// ─── Team surface data carved out to data/team.js ─────────────────────
// (2026-06-18, scenario split · team group). Re-exported here so frozen
// archive files importing from v0_3_config.js keep working unchanged. Live
// consumers (state.js, boot.js, slate.js, keyboard.js) import directly from data/team.js.
// See docs/architecture/V0_3_CONFIG_POST_CONSENT_RECHECK.md.
export { TEAM_SUBJECTS, TEAM_TILES_FOR_SUBJECT } from "./data/team.js";

// ─── Personal surface data carved out to data/personal.js ─────────────
// (2026-06-18, scenario split · personal group). Re-exported here so frozen
// archive files importing from v0_3_config.js keep working unchanged. Live
// consumers (state.js, boot.js, keyboard.js) import directly from data/personal.js.
// See docs/architecture/V0_3_CONFIG_POST_CONSENT_RECHECK.md.
export { PERSONAL_OPERATOR, PERSONAL_THREADS, PERSONAL_TILES_FOR_THREAD } from "./data/personal.js";

// ─── Business surface data carved out to data/business.js ─────────────
// (2026-06-18, scenario split · business group). Re-exported here so frozen
// archive files importing from v0_3_config.js keep working unchanged. Live
// consumers (state.js, boot.js, slate.js, keyboard.js) import directly from data/business.js.
// See docs/architecture/V0_3_CONFIG_SCENARIO_SPLIT_MAP.md.
export { BUSINESS_OPERATOR, BUSINESS_TILES_FOR_CASE } from "./data/business.js";


// Per Thread 1 substrate work · 2026-04-28. The architectural axis is the
// read · three primary shapes determined by operator-subject relationship.
// Same substrate, three read shapes. Consent classes, vault permissions,
// daemon behaviors all FOLLOW from read shape · they are consequences,
// not the axis itself.

// ─── Read shapes (LOCKED v0.3.7 · per spec Decision 4 revised) ────────────
// The three primary read shapes. Operator-subject relationship determines
// which surface a case lives in.

// ─── Worker-persona agents (LOCKED per Apr 21 · names locked, count soft) ─
// Spec §Decision 4 (revised v0.3.2) · the surface vocabulary is co-workers,
// not Jungian archetypes. Same six agents work both products; the content
// they read changes per scenario. Under the hood, archetypal substrate is
// fine; user never sees those names.

// SOFT: how many worker-persona agents render at once. Open question Q2.
// Working assumption: render 4 (operator + strategist + synthesizer +
// contrarian); planner + manager available on-tap. Toggle to test 6 vs 4.

// ─── Scenarios per product (SOFT · content varies, structure locked) ──────
// Per v0.3.3 reframe: disagreement-as-signal, not refusal-as-feature.
// Per v0.3.4 reframe: refusal is no longer universal. Each scenario features
// ONE of the four ethics pillars; refusal-as-protagonist is one of four.
//
// Each scenario shape:
//   - case_file: what the operator opens to (the situation)
//   - reads: keyed by agent_id → text · all agents have already read
//   - disagreements: explicit conflicts between agent reads · the signal
//     [{ a: agentA_id, b: agentB_id, on: "what the conflict is about" }]
//   - refusal: optional · agents that returned empty in lane (rendered as
//     a single quiet line on their card, not a play-button stamp)
//     [{ agent_id, scope }]
//   - correction_targets: which reads the operator is most likely to
//     correct (renders as a "click to correct" affordance) · [agent_ids]
//   - vault_calibration: text shown when a correction lands · what the
//     vault now knows that it didn't before
//   - featured_pillar: which Decision 10 pillar this scenario foregrounds
//     · "bounded_refusal" | "correction_stream" | "consent_disclosure" | "humans_in_loop"
//     · ensures the four pillars rotate through the demo, not refusal × 4
//   - in_lane: optional · if true, this scenario does NOT have refusal as
//     protagonist · agents answer cleanly in-lane · the contrast is what
//     makes the bounded scenarios land elsewhere
export { BUSINESS_SCENARIOS } from "./data/business.js";

// ─── Team scenarios · peer-read shape (LOCKED v0.3.7) ─────────────────────
// Per Thread 1 substrate work · Team is the peer-read surface.
// Devon DRIFT is canonical (per v0.2 cut 06). Cofounder coherence is the
// case-toggle pair (per v0.2 cut 05). First-hire alignment is joint-correction.
// 5-stages-of-forming retro moves here (provisional · ambiguous between Team
// and Business · folded into Team for v0.3.7).


// ─── Flow primitive (LOCKED · v0.3.3) ──────────────────────────────────────
// Disagreement-as-signal, not refusal-as-feature.
// Per the v0.3.3 correction: refusal was AgentHansa demo theatre, not a flow.
// The actual operator flow is:
//   1. open the case · case_file is what was posted at intake
//   2. read the agents · all four (or six) have already read · their reads
//      are visible side by side
//   3. see the disagreement · explicit callouts where reads conflict
//   4. correct the read you think is wrong · click → correction surface
//   5. correction lands in vault · next case shows calibration
// Refusal is not a play-button stamp. It's a quiet line on an empty agent
// card when an agent has nothing to say in lane.
export const FLOW = {
  name: "disagreement-as-signal",
  steps: [
    "open · case file at intake",
    "read · agents have already read · pre-rendered reads",
    "see · the disagreements between reads (explicit callouts)",
    "correct · click the read you think is wrong",
    "vault · correction lands · next case calibrates",
  ],
};

// ─── Category claim (LOCKED · per Apr 25 9:27 PM positioning) ─────────────
// Reproduced here so demo copy doesn't drift. Edit in spec, mirror here.

// ─── Agent rail UX sub-pattern (SOFT · prototype-driven) ──────────────────
// Replaces the v0.3.1 IN_RAIL_UX. The agents-as-co-workers vocabulary needs
// a different visual grammar than the In-direction rail. Sub-pattern lives
// here as flags so changes are one-edit, not surface-by-surface.

// ─── Bidirectional ethics (LOCKED · Decision 10 · v0.3.2 · v0.3.4 pillar→accent) ─
// The architecture protects humans from machines AND machines (institutions)
// from humans. Reproduced here so demo copy doesn't drift.
//
// v0.3.4 re-allocation: each of the four register accents maps to one of
// the four pillars. Refusal no longer hoards judgment-magenta. The four
// pillars get co-equal visual weight in the prototype.
//
// pillar → accent map:
//   bounded_refusal    → judgment   (E90095 · magenta) · the boundary
//   correction_stream  → diligence  (8E66FB · violet)  · the moat
//   consent_disclosure → outreach   (3EE878 · jade)    · the visible chain
//   humans_in_loop     → synthesis  (FFD24A · solar)   · the bidirectional gate

// ─── Editor's notes · the founder's handwritten commentary (v0.3.5) ──────
// Annotations Shruti leaves on the prototype itself, rendered in Caveat as
// marginalia. Three attachment patterns:
//   - inline · attached to a target element via data-annotation="<id>"
//   - corner · pinned to a corner of the viewport (tl, tr, bl, br)
//   - floating · positioned at fixed coordinates inside the page flow
//
// The voice is Shruti's editorial voice on the prototype: what she's
// thinking about a particular surface, what's still uncertain, what
// landed, what didn't. Toggleable via the "✎ editor's notes" pill at
// top-right.
//
// Replace these placeholder notes with real founder commentary as the
// prototype evolves. Add new ones whenever a surface needs a footnote.

// ─── Apr 14 Granola substrate (LOCKED · real data for the Liminal close) ─
// Source: April 14 "Shruti x Shayaun Daily" · pulled via Granola MCP 2026-04-27.
// The In agents in the Liminal scenario read against this text.
// Adding new excerpts is fine; do not paraphrase what's already here.

// ─── Open questions visible in this build (v0.3.3) ────────────────────────
// Per spec §Open questions for Shruti (revised v0.3.2). The In-direction-specific
// questions from v0.3 / v0.3.1 are retired with the In-direction frame. The
// "demo grammar" framing question is resolved in v0.3.3: disagreement-as-signal,
// not refusal-as-feature.
