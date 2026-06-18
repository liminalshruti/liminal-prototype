/* team.js · Team-surface scenario data (operator reads on teammates)
 * ────────────────────────────────────────────────────────────────────
 * Extracted from v0_3_config.js 2026-06-18 (scenario split, team group)
 * per docs/architecture/V0_3_CONFIG_POST_CONSENT_RECHECK.md.
 *
 * Pure data · no behavior · no imports. The team surface's subject list
 * (teammates the operator can read, each with a consent class) and the
 * per-subject tile catalog. Logic that reads this (state.js accessors,
 * boot render, slate render, keyboard sibling lookup) stays in the
 * consumers. v0_3_config.js re-exports these so frozen archive imports
 * keep working; live consumers import directly from data/team.js.
 */

// ─── Subjects · the people the operator can read on Team surface (v0.6) ──
// Each subject is a person on the team with a per-subject consent class.
// The tray exposes subject tiles · drag onto slate to compose a coherence read.
// Subject's consent class governs which source-tile types can be read against
// them · refusal-on-consent triggers when crossed.
export const TEAM_SUBJECTS = [
  {
    id: "sean_cofounder",
    label: "Sean",
    role: "Cofounder · CTO",
    relationship: "cofounder",
    consent_class: "mutual-cofounder",
    drift_state: "stable",
    last_surfaced: "14d ago · resolved benign",
    mutual: true,  // Sean has Liminal too · symmetric read
    window_days: 17,
    color: "diligence",
    intro: "shared from day one · symmetric coherence read · joint correction class",
  },
  {
    id: "devon_eng",
    label: "Devon",
    role: "Eng · 3yr tenure",
    relationship: "direct-report",
    consent_class: "pattern-baseline-only",
    drift_state: "drifting",
    last_surfaced: "today · 9:42 AM · drift detected",
    mutual: false,
    window_days: 21,
    color: "judgment",
    drift_window_active: true,
    intro: "21-day own-pattern baseline · governance-graded · no message-content reads",
  },
  {
    id: "priya_design",
    label: "Priya",
    role: "Design",
    relationship: "direct-report",
    consent_class: "calendar-attendance-only",
    drift_state: "stable",
    last_surfaced: "never",
    mutual: false,
    window_days: 30,
    color: "outreach",
    intro: "minimal read · attendance pattern only · no message-content, no commits",
  },
  {
    id: "janice_advisor",
    label: "Janice",
    role: "Advisor",
    relationship: "advisor",
    consent_class: "meeting-summaries-only",
    drift_state: "stable",
    last_surfaced: "weekly check-in · last Tue",
    mutual: false,
    window_days: 14,
    color: "synthesis",
    intro: "Granola transcripts she's been on · no other reads",
  },
];

// ─── Per-subject source tiles (Team surface) ─────────────────────────────
// What's available to drop onto a slate when reading a subject.
// Each tile carries a `requires_consent_level` · slate refuses tiles whose
// requirement exceeds the subject's consent class level.
export const TEAM_TILES_FOR_SUBJECT = {
  devon_eng: [
    { id: "devon_commits_21d",  label: "Commit pattern · 21d",   source: "git",       icon: "◇", requires_level: 1, kind: "pattern" },
    { id: "devon_calendar_21d", label: "Calendar attendance",     source: "calendar",  icon: "◇", requires_level: 1, kind: "pattern" },
    { id: "devon_slack_texture", label: "Slack channel texture · 21d", source: "slack", icon: "◇", requires_level: 1, kind: "pattern" },
    { id: "devon_standups",     label: "Standup attendance",      source: "calendar",  icon: "◇", requires_level: 1, kind: "pattern" },
    { id: "devon_dms",          label: "Direct messages · ✗",     source: "slack",     icon: "◇", requires_level: 3, kind: "content", refused_reason: "Devon opted into pattern-only · no message-content reads" },
    { id: "devon_prior_w1",     label: "Prior window · Q4 2024",  source: "vault",     icon: "◈", requires_level: 1, kind: "vault", note: "academic-publication cleanup · resolved benign" },
    { id: "devon_prior_w2",     label: "Prior window · Mar 2025", source: "vault",     icon: "◈", requires_level: 1, kind: "vault", note: "family bereavement · resolved benign" },
    { id: "maia_obsidian",      label: "Maia's notes on Devon",   source: "obsidian",  icon: "◇", requires_level: 0, kind: "operator-self" },
  ],
  sean_cofounder: [
    { id: "sean_commits_17d",   label: "Commit pattern · 17d",    source: "git",      icon: "◇", requires_level: 1, kind: "pattern" },
    { id: "sean_granola_joint", label: "Joint Granola · last 4",  source: "granola",  icon: "◇", requires_level: 3, kind: "joint" },
    { id: "sean_slack_thread",  label: "Slack thread · cofounders", source: "slack",  icon: "◇", requires_level: 4, kind: "joint" },
    { id: "sean_obsidian",      label: "Sean's recent notes",     source: "obsidian", icon: "◇", requires_level: 4, kind: "joint" },
    { id: "shruti_corrections", label: "Shruti's vault on Sean",  source: "vault",    icon: "◈", requires_level: 0, kind: "operator-self" },
  ],
  maya_design: [
    { id: "maya_attendance",    label: "Calendar attendance",     source: "calendar", icon: "◇", requires_level: 1, kind: "pattern" },
    { id: "maya_slack_msgs",    label: "Slack messages · ✗",      source: "slack",    icon: "◇", requires_level: 3, kind: "content", refused_reason: "Maya opted into calendar-only" },
    { id: "maya_commits",       label: "Design commits · ✗",      source: "figma",    icon: "◇", requires_level: 2, kind: "content", refused_reason: "Maya opted into calendar-only" },
  ],
  janice_advisor: [
    { id: "janice_granola",     label: "Granola · weekly checkin", source: "granola", icon: "◇", requires_level: 1, kind: "summary" },
    { id: "janice_emails",      label: "Email thread · ✗",         source: "gmail",   icon: "◇", requires_level: 2, kind: "content", refused_reason: "Janice opted into meeting-summaries-only" },
  ],
};
