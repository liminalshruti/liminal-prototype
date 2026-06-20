/* sam-seed.js · Sam-seed scenario — playable in the 01-slate-tray loop
 * ────────────────────────────────────────────────────────────────────
 * The validated pen-test-crisis seed situation, reshaped from the pitch
 * render into the LIVE LOOP's data contract (same shape as data/team.js):
 * an operator reads SUBJECTS via per-subject draggable TILES. The "reframe"
 * is NOT a narrated stage — it's what happens when Sam slates the SYSTEM
 * tiles (observability gap, lexicon, process) instead of the BLAME tiles
 * (tariq pressure, misclassification): the agents re-read and the
 * disposition shifts. The loop enacts it; nothing announces it.
 *
 * Wired as the "sam-seed" product in lib/boot.js + lib/state.js + the
 * product tab in cuts/01-slate-tray.html.
 * Canon-safe: locked cast (Sam, Tariq Osei). No real names.
 */

export const SAMSEED_OPERATOR = Object.freeze({
  id: "sam",
  label: "Sam",
  role: "Security IC · Pen-test Lead",
  unit: "frontier-model assessment",
  clearance: "ic",
  clearance_level: 99,   // Sam reads his own team's work · no consent gate on own surface
});

// The "subjects" Sam can read — here, the assessment itself (and its people).
// Modeled like TEAM_SUBJECTS so the existing loop renders it unchanged.
export const SAMSEED_SUBJECTS = Object.freeze([
  {
    id: "assessment_triage",
    label: "The assessment",
    role: "~1,000 findings · triage crisis",
    relationship: "own-team",
    consent_class: "full-coherence-read",
    drift_state: "drifting",
    last_surfaced: "today · audit escalated",
    mutual: false,
    window_days: 7,
    color: "diligence",
    drift_window_active: true,
    intro: "frontier-model security pilot · ~1,000 findings to triage·classify·route · a second team pulled in to audit",
  },
  {
    id: "tariq_lead",
    label: "Tariq Osei",
    role: "Team lead · 9yr · audited",
    relationship: "peer-lead",
    consent_class: "pattern-baseline-only",
    drift_state: "drifting",
    last_surfaced: "today · canceled 1:1, complaints triangulating",
    mutual: false,
    window_days: 21,
    color: "judgment",
    intro: "the lead whose team is failing the triage · read as a SYSTEM to tune, never a person to indict",
  },
]);

// Per-subject draggable tiles. kind drives how the agents read:
//   "blame"  tiles → read as accusation (person problem)
//   "system" tiles → read as optimization (the reframe)
//   "evidence"/"process"/"vault" → neutral context
export const SAMSEED_TILES_FOR_SUBJECT = Object.freeze({
  assessment_triage: [
    { id: "findings_raw",       label: "Raw findings · ~1,000",        source: "scanner",  icon: "◇", requires_level: 1, kind: "evidence" },
    { id: "findings_v1",        label: "Triage v1 · 7d ago",           source: "scanner",  icon: "◇", requires_level: 1, kind: "evidence" },
    { id: "findings_v2",        label: "Triage v2 · 3d ago",           source: "scanner",  icon: "◇", requires_level: 1, kind: "evidence" },
    { id: "misclass_cluster",   label: "~240 misclassified · P1↔P2",   source: "scanner",  icon: "◇", requires_level: 1, kind: "blame",  note: "the surface the audit flagged" },
    { id: "no_lexicon",         label: "No shared P-tier lexicon",     source: "process",  icon: "◈", requires_level: 1, kind: "system", note: "no agreed definition of 'moderate' to drift from" },
    { id: "no_observability",   label: "Decision-log · ✗ none",        source: "process",  icon: "◈", requires_level: 1, kind: "system", note: "zero visibility into how calls were made" },
    { id: "no_calibration",     label: "No live calibration phase",    source: "process",  icon: "◈", requires_level: 1, kind: "system", note: "novel frontier-model output, no warm-up" },
    { id: "standup_log",        label: "Team standup log · 7d",        source: "calendar", icon: "◇", requires_level: 1, kind: "process" },
    { id: "sam_note",           label: "Sam's private note · day 1",   source: "vault",    icon: "◈", requires_level: 0, kind: "operator-self" },
  ],
  tariq_lead: [
    { id: "tariq_escalation",   label: "Audit escalation · Tariq",     source: "ticket",   icon: "◇", requires_level: 1, kind: "blame",  note: "Tariq escalated the wrong work" },
    { id: "tariq_canceled_1on1",label: "Canceled 1:1 · today",         source: "calendar", icon: "◇", requires_level: 1, kind: "blame" },
    { id: "tariq_complaints",   label: "Triangulated complaints",      source: "slack",    icon: "◇", requires_level: 2, kind: "blame",  note: "others routing around him" },
    { id: "tariq_dms",          label: "Tariq's DMs · ✗",              source: "slack",    icon: "◇", requires_level: 3, kind: "content", refused_reason: "out of consent · pattern-only · no message-content reads" },
    { id: "tariq_tenure",       label: "9yr tenure · prior wins",      source: "vault",    icon: "◈", requires_level: 1, kind: "system", note: "context: not a bad hire — a hard transition" },
    { id: "agentic_shift",      label: "Shift to agentic operating",   source: "process",  icon: "◈", requires_level: 1, kind: "system", note: "the real variable that changed" },
  ],
});
