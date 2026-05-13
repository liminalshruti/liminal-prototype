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

export const SPEC_VERSION = "v0.3.11";
export const PROTOTYPE_VERSION = "v0.9.1-cut03-live-data";
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
export const PHASE_1_STATUS = {
  branch: "shruti/phase1-event-log-primitive",
  state: "complete · uncommitted",
  shipped: ["EVENTS_SCHEMA", "appendEvent", "appendEvents", "queryEvents", "searchEvents", "inflate"],
  pending: ["db.js integration", "migrate-events.js"],
};

// ─── Locked decisions (per spec v0.3.2) ───────────────────────────────────
// Numbered and final. Soft items live below.
export const LOCKED_DECISIONS = [
  "1 · Adopt PRODUCT_DATA_MODEL.md Event schema verbatim (subset, never extension)",
  "2 · Three agent surfaces, one runtime",
  "3 · One vault, encrypted, at ~/Library/Application Support/Liminal/vault.db",
  "4 · Operator surface = three reads · self-read (Personal) · peer-read (Team) · institutional-read (Business)",
  "5 · Local inference is first-class, not fallback",
  "6 · Daemon contract = appendEvent() only",
  "7 · Tool policy is per-surface, not per-agent",
  "8 · Schema is strict subset of PRODUCT_DATA_MODEL.md",
  "9 · Tandem model · this file is the spec/prototype seam",
  "10 · Bidirectional ethics · protect humans from machines AND institutions from humans",
  "11 · Runtime agent taxonomy · decider + ingester + three deliberators (per Apr 24)",
  "12 · Slate / Tray / Vault · the working surface · palette + mixing plate + inkwell · compositional, not consumptive",
];

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
export const TILE_TYPES = [
  { id: "granola_transcript", label: "Granola transcript", source: "granola",   icon: "◇", classification_capable: false },
  { id: "obsidian_note",      label: "Obsidian note",      source: "obsidian",  icon: "◇", classification_capable: false },
  { id: "slack_thread",       label: "Slack thread",       source: "slack",     icon: "◇", classification_capable: false },
  { id: "linear_ticket",      label: "Linear ticket",      source: "linear",    icon: "◇", classification_capable: false },
  { id: "git_commit",         label: "git commit",         source: "git",       icon: "◇", classification_capable: false },
  { id: "calendar_event",     label: "Calendar event",     source: "calendar",  icon: "◇", classification_capable: false },
  { id: "screenshot",         label: "Screenshot · OCR",   source: "macos",     icon: "◇", classification_capable: false },
  { id: "case_file",          label: "Case file",          source: "intake",    icon: "▣", classification_capable: true  },
  { id: "access_log",         label: "Access log",         source: "ic_db",     icon: "▣", classification_capable: true  },
  { id: "peer_baseline",      label: "Peer cohort baseline", source: "ic_db",   icon: "▣", classification_capable: true  },
  { id: "forum_activity",     label: "Public-domain forum", source: "osint",    icon: "▣", classification_capable: false },
  { id: "classified_memo",    label: "Classified memo",    source: "ic_secure", icon: "▦", classification_capable: true,
    classification_levels: ["unclass", "for-official-use", "secret", "top-secret", "ts-sci"] },
  { id: "vault_artifact",     label: "Vault · prior read", source: "vault",     icon: "◈", classification_capable: false },
  { id: "decision",           label: "Vault · decision",   source: "vault",     icon: "✓", classification_capable: false },
];

// Tray sources per surface · what the user has at hand to compose with.
// (The tray is the palette; this list is which pigments are available.)
export const TRAY_SOURCES = {
  personal: [
    "granola_transcript", "obsidian_note", "slack_thread", "linear_ticket",
    "git_commit", "calendar_event", "screenshot", "vault_artifact", "decision",
  ],
  team: [
    // peer-read · same as personal + manager can drop subject-content tiles
    "granola_transcript", "obsidian_note", "slack_thread", "linear_ticket",
    "git_commit", "calendar_event", "screenshot", "vault_artifact", "decision",
  ],
  business: [
    // institutional-read · cleared sources only
    "case_file", "access_log", "peer_baseline", "forum_activity",
    "classified_memo", "vault_artifact", "decision",
  ],
};

// Slate layout primitive · how tiles arrange on the slate per surface.
// "freeform" = drag-and-drop anywhere; "case-grid" = structured panels;
// "timeline" = arranged by date.
export const SLATE_LAYOUT = {
  personal: "freeform",     // a working session · spatial composition
  team:     "freeform",     // a coherence read · drop teammate-content
  business: "case-grid",    // a case console · structured evidence panels
};

// Spatial interaction primitives · what dropping/dragging/overlapping does.
// LOCKED · same primitives across all three surfaces.
export const SLATE_INTERACTIONS = {
  drop_window_to_tray:    "capture content into vault as a tile",
  drag_tile_to_slate:     "add tile to current composition · agents re-read",
  overlap_two_tiles:      "agents read the connection · linked-pair vault entry",
  drag_vault_to_slate:    "bring prior context into composition",
  drag_off_slate:         "remove from composition · tile persists in tray",
  destructive_remove:     "purge tile from vault · audit chain logs redaction",
  close_composition:      "agents produce final read · vault commits closure · chain seals",
};

// Refusal-on-classification · structural primitive, not stylistic.
// When a tile of higher classification is dropped onto a slate where
// agents do not have clearance, the tile is quarantined and the agency
// console shows a routing line. Per Decision 12.
export const CLASSIFICATION_LADDER = [
  "unclass", "for-official-use", "secret", "top-secret", "ts-sci",
];

// Per-product slate layout config (visual sub-pattern · soft).
// Renders the slate as a working canvas with the tray as a palette strip.
export const SLATE_UX = {
  tray_position:        "bottom-edge",    // "bottom-edge" | "left-edge" | "right-edge"
  tray_height:          112,              // pixels · the palette strip
  tray_tile_size:       96,               // pixels · square tile width
  slate_padding:        24,               // pixels · slate inner padding
  slate_grid_snap:      false,            // freeform default per Decision 12 OQ#3
  vault_position:       "side-overlay",   // "side-overlay" | "modal" | "bottom-drawer"
  classification_banner_locked: true,     // Business surface · banner always visible
  consent_chip_visible_on_tile: true,     // Team surface · consent class on every tile
};

// Phased rollout per Decision 12 · which phase ships which surface as slate/tray.
export const SLATE_TRAY_PHASES = {
  phase_1_spec_only:  "v0.3.8 · spec + config locked · no prototype changes",
  phase_2_xtech:      "v0.4.x · Business · Case Console as slate-and-tray surface (May 2-3 demo target)",
  phase_3_desktop:    "v0.5.x · Personal as slate-and-tray surface (May 12 desktop MVP)",
  phase_3b_team:      "v0.5.x · Team with Devon DRIFT enriched by slate composition",
  phase_4_v1:         "v1.0+ · spatial primitives (overlap, layer, decay) · adaptive theming · multi-operator slate",
  phase_now_v06:      "v0.6 · Team + Business dual slate/tray prototype (architecture-is-the-product demo)",
};

// ─── Consent classes (LOCKED v0.3.8 · Team + Business surfaces) ──────────
// Per Decision 12. Refusal-on-consent is structural · same primitive as
// refusal-on-classification but enforced at a different contract layer.
// Team: interpersonal consent classes (per-subject, set at onboarding).
// Business: institutional clearance ladder (per-role + per-classification).
// Personal: not applicable · operator = subject = same person.
export const CONSENT_CLASSES = {
  // Interpersonal · Team surface
  "pattern-baseline-only":     { label: "Pattern only", scope: "agent reads pattern over time, never message content", level: 1 },
  "meeting-summaries-only":    { label: "Summaries only", scope: "agent reads Granola summaries the subject was on, not 1:1s", level: 1 },
  "calendar-attendance-only":  { label: "Calendar only", scope: "agent sees attendance pattern, no meeting content", level: 1 },
  "shared-on-request":         { label: "Shared on request", scope: "subject can request the chain of reads on them at any time", level: 2 },
  "full-coherence-read":       { label: "Full coherence", scope: "agent reads all observable patterns and content shared with operator", level: 3 },
  "mutual-cofounder":          { label: "Mutual · cofounder", scope: "both operators read each other symmetrically · joint-correction class", level: 4 },
  // Institutional · Business surface (classification ladder)
  "unclass":                   { label: "Unclassified", scope: "no classification · OSINT, public-domain", level: 0 },
  "for-official-use":          { label: "For Official Use Only", scope: "FOUO · institutional only", level: 1 },
  "secret":                    { label: "Secret", scope: "secret-cleared operators only", level: 2 },
  "top-secret":                { label: "Top Secret", scope: "TS-cleared operators only", level: 3 },
  "ts-sci":                    { label: "TS / SCI", scope: "TS/SCI compartment · need-to-know", level: 4 },
};

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

// ─── Personal surface · founder OS · the wedge (v0.6.10) ─────────────────
// Operator IS the subject · single-party · no consent layer · the slate
// composes the operator's own work for self-read. Tiles come from the
// operator's actual work surfaces (Granola, Linear, Slack, Obsidian,
// calendar, git). All tiles `requires_level: 0` because there's no
// asymmetric subject to protect from. Refusal only fires for explicit
// "off-limits" tiles (e.g., partner Slack threads tagged personal-only).
export const PERSONAL_OPERATOR = {
  id: "self",
  label: "You",
  role: "Founder · operator · creative",
  clearance: "self",
  clearance_level: 99,             // self-read · refusal only via explicit off-limits
  unit: "founder OS",
  cohort: "single-party · self-as-subject",
};

// Threads · what the operator is currently working through.
// Each thread is a focused decision-context with a window of tiles.
// Canonical demo thread is `founding_close_decision` · ships boot-state.
export const PERSONAL_THREADS = [
  {
    id: "founding_close_decision",
    label: "Founding round · close decision",
    eyebrow: "self-read · founder OS",
    intro: "Should you take the term sheet on the table, or hold for the round you've been building toward?",
    last_touched: "today · 7:14 AM",
    tile_count: 6,
    color: "diligence",
    canonical: true,                 // boot lands here
    drift_state: "deciding",
  },
  {
    id: "eng_hire_decision",
    label: "Eng hire · senior backend",
    eyebrow: "self-read · founder OS",
    intro: "Three finalists. Two strong on craft, one on judgment. The judgment hire would re-shape the team.",
    last_touched: "yesterday · 4:30 PM",
    tile_count: 5,
    color: "diligence",
    drift_state: "deciding",
  },
  {
    id: "design_system_migration",
    label: "Design system · v2 migration",
    eyebrow: "self-read · creative direction",
    intro: "Cut now or finish in flight. Either way the next quarter shape changes.",
    last_touched: "3d ago",
    tile_count: 4,
    color: "synthesis",
    drift_state: "stable",
  },
  {
    id: "self_baseline_check",
    label: "90-day self · pattern check",
    eyebrow: "self-read · own baseline",
    intro: "Where have you been drifting from your own stated values? The agents read your last 90 days against the values you wrote down in January.",
    last_touched: "weekly · last Sun",
    tile_count: 3,
    color: "judgment",
    drift_state: "stable",
  },
  /* The creative ICP scenario · per SCENARIO_SPEC_DESIGNER_REBRAND.md
     · Field Studio is a founder-of-one design studio mid-rebrand
     · The work is technically right and somatically wrong
     · This is the "I can't name what's off" recognition cue
     · Lives on Personal because the rebrand decision is a self-read */
  {
    id: "field_studio_rebrand",
    label: "Field Studio · v3 rebrand",
    eyebrow: "self-read · creative direction",
    intro: "Three weeks into rebranding from playful generalist to operator-grade specialist. The work passes craft review. The strategic claim has receipts. And it's somatically wrong · you can't name what's off.",
    last_touched: "today · 11:42 AM",
    tile_count: 5,
    color: "synthesis",
    drift_state: "deciding",
  },
];

// Per-thread source tiles · the tray palette per Personal context.
// All tiles requires_level: 0 (no consent gate). The slate accepts all.
// Tile `kind` follows existing taxonomy · git, slack, granola, calendar,
// vault, obsidian, linear-issue.
export const PERSONAL_TILES_FOR_THREAD = {
  founding_close_decision: [
    {
      id: "term_sheet_doc",
      label: "Term sheet · current offer",
      source: "google docs · term-sheet-v3",
      icon: "▣",
      requires_level: 0,
      kind: "vault",
    },
    {
      id: "investor_granola",
      label: "Lead investor · last call",
      source: "granola · 47-min meeting",
      icon: "▣",
      requires_level: 0,
      kind: "granola",
    },
    {
      id: "advisor_thread",
      label: "Advisor thread · close vs. hold",
      source: "slack · #advisors",
      icon: "▣",
      requires_level: 0,
      kind: "slack",
    },
    {
      id: "metrics_dashboard",
      label: "Runway · 14mo at current burn",
      source: "metrics · ARR + burn",
      icon: "▣",
      requires_level: 0,
      kind: "vault",
    },
    {
      id: "values_doc_jan",
      label: "Why you started · Jan note",
      source: "obsidian · founding-doc.md",
      icon: "▣",
      requires_level: 0,
      kind: "obsidian",
    },
    {
      id: "founding_calendar",
      label: "Calendar · investor blocks",
      source: "google cal · last 30d",
      icon: "▣",
      requires_level: 0,
      kind: "calendar",
    },
  ],
  eng_hire_decision: [
    {
      id: "hire_loop_notes",
      label: "Hire loop · 3 finalists",
      source: "obsidian · hiring/q2.md",
      icon: "▣",
      requires_level: 0,
      kind: "obsidian",
    },
    {
      id: "candidate_a_granola",
      label: "Candidate A · final round",
      source: "granola · 62-min interview",
      icon: "▣",
      requires_level: 0,
      kind: "granola",
    },
    {
      id: "candidate_b_granola",
      label: "Candidate B · final round",
      source: "granola · 58-min interview",
      icon: "▣",
      requires_level: 0,
      kind: "granola",
    },
    {
      id: "team_vote_thread",
      label: "Team thread · who'd you hire",
      source: "slack · #hiring-q2",
      icon: "▣",
      requires_level: 0,
      kind: "slack",
    },
    {
      id: "team_shape_doc",
      label: "Team shape · 18mo plan",
      source: "obsidian · team-shape.md",
      icon: "▣",
      requires_level: 0,
      kind: "obsidian",
    },
  ],
  design_system_migration: [
    {
      id: "v2_migration_branch",
      label: "Migration branch · 47 commits",
      source: "git · feat/ds-v2",
      icon: "▣",
      requires_level: 0,
      kind: "git",
    },
    {
      id: "v2_audit_doc",
      label: "Audit · what's still v1",
      source: "linear · DS-142",
      icon: "▣",
      requires_level: 0,
      kind: "linear-issue",
    },
    {
      id: "design_review_granola",
      label: "Design review · last week",
      source: "granola · 38-min review",
      icon: "▣",
      requires_level: 0,
      kind: "granola",
    },
    {
      id: "ds_v2_principles",
      label: "v2 principles · why we're cutting",
      source: "obsidian · ds-v2.md",
      icon: "▣",
      requires_level: 0,
      kind: "obsidian",
    },
  ],
  self_baseline_check: [
    {
      id: "values_doc_jan",
      label: "Stated values · Jan",
      source: "obsidian · values.md",
      icon: "▣",
      requires_level: 0,
      kind: "obsidian",
    },
    {
      id: "self_calendar_90d",
      label: "Calendar · 90-day pattern",
      source: "calendar · 90d window",
      icon: "▣",
      requires_level: 0,
      kind: "calendar",
    },
    {
      id: "commits_90d",
      label: "Commits · 90-day pattern",
      source: "git · 90d across repos",
      icon: "▣",
      requires_level: 0,
      kind: "git",
    },
  ],
  /* Field Studio rebrand · creative-ICP scenario tiles · per SCENARIO_SPEC */
  field_studio_rebrand: [
    {
      id: "field_v1_v2_assets",
      label: "v1 + v2 identity · 36 assets",
      source: "figma · field-studio-archive",
      icon: "▣",
      requires_level: 0,
      kind: "vault",
      cite: "field-1",
    },
    {
      id: "field_v3_brand_guide",
      label: "v3 brand guide · 18 pages",
      source: "pdf · field-studio-v3-system.pdf",
      icon: "▣",
      requires_level: 0,
      kind: "vault",
      cite: "field-2",
    },
    {
      id: "field_v3_wordmark",
      label: "v3 wordmark · brutalist serif",
      source: "figma · v3-wordmark.fig",
      icon: "▣",
      requires_level: 0,
      kind: "vault",
    },
    {
      id: "field_tagline_drafts",
      label: "Tagline drafts · 3 variants",
      source: "obsidian · field-studio/copy.md",
      icon: "▣",
      requires_level: 0,
      kind: "obsidian",
    },
    {
      id: "field_client_receipts",
      label: "Receipts · 6 AI-native clients",
      source: "linear · client-portfolio",
      icon: "▣",
      requires_level: 0,
      kind: "linear-issue",
    },
  ],
};

// ─── Business surface · CI analyst tiles per case (v0.6) ─────────────────
// The analyst's tray for the Snowden/Hansen-class CI case.
// Tiles carry classification level · slate refuses tiles whose level
// exceeds the operator's clearance.
export const BUSINESS_OPERATOR = {
  id: "analyst_s",
  label: "Analyst-S",
  role: "CI Analyst",
  clearance: "secret",
  clearance_level: 2,  // can pickup level 0,1,2 · refused at 3+
  unit: "NSA Hawaii · CI Cell 4",
  cohort: "n=147 cleared sysadmins",
};

export const BUSINESS_TILES_FOR_CASE = {
  ci_analyst_insider_threat: [
    { id: "case_file_S",         label: "Case file · subject-S",       source: "intake",    icon: "▣", requires_level: 1, kind: "case" },
    { id: "access_log_21d",      label: "Access log · 21d window",     source: "ic_db",     icon: "▣", requires_level: 1, kind: "evidence" },
    { id: "peer_baseline",       label: "Peer cohort baseline",        source: "ic_db",     icon: "▣", requires_level: 1, kind: "evidence" },
    { id: "forum_osint",         label: "Forum activity · OSINT",      source: "osint",     icon: "▣", requires_level: 0, kind: "evidence" },
    { id: "tonality_drift",      label: "Tonality drift · 90d",        source: "ic_db",     icon: "▣", requires_level: 1, kind: "evidence" },
    { id: "prior_case_2024",     label: "Prior case · vendor-Q 2024",  source: "vault",     icon: "◈", requires_level: 1, kind: "vault", note: "resolved benign · academic publication" },
    { id: "ts_sci_memo",         label: "TS/SCI memo · ✗",             source: "ic_secure", icon: "▦", requires_level: 4, kind: "classified", refused_reason: "Tier 3 analyst · TS/SCI requires routing to peer" },
    { id: "top_secret_intel",    label: "Top Secret intel-share · ✗",  source: "ic_secure", icon: "▦", requires_level: 3, kind: "classified", refused_reason: "Tier 3 analyst · escalate to TS-cleared peer" },
    { id: "subject_audit_chain", label: "Audit chain · subject view",  source: "vault",     icon: "◈", requires_level: 0, kind: "vault" },
  ],

  // ─── Subject-H · CI pattern review (Hanssen-shape) ──────────────────
  // Featured pillar: bounded_refusal · the foreign-contact tile sits at TS/SCI
  // and refuses pickup at this clearance · the architecture working visibly.
  subject_h_pattern: [
    { id: "h_case_file",          label: "Case file · subject-H",        source: "intake",    icon: "▣", requires_level: 1, kind: "case" },
    { id: "h_uam_self_search",    label: "UAM · self-search activity",   source: "uam",       icon: "▣", requires_level: 1, kind: "evidence" },
    { id: "h_iam_access_pattern", label: "IAM · access pattern · 90d",   source: "iam",       icon: "▣", requires_level: 1, kind: "evidence" },
    { id: "h_siem_financial",     label: "SIEM · financial-context tag", source: "siem",      icon: "▣", requires_level: 1, kind: "evidence" },
    { id: "h_prior_case_2024",    label: "Prior case · academic 2024",   source: "vault",     icon: "◈", requires_level: 1, kind: "vault", note: "self-search shape, no financial signal · resolved benign" },
    { id: "h_prior_case_2023",    label: "Prior case · vendor-Q 2023",   source: "vault",     icon: "◈", requires_level: 1, kind: "vault", note: "financial shape, no self-search · resolved benign" },
    { id: "foreign_contact_intel",label: "Foreign-contact intel · ✗",    source: "ic_secure", icon: "▦", requires_level: 4, kind: "classified", refused_reason: "TS/SCI · this analyst cannot pickup · refuses to TS-cleared CI peer" },
    { id: "h_audit_chain",        label: "Audit chain · subject view",   source: "vault",     icon: "◈", requires_level: 0, kind: "vault" },
  ],

  // ─── Subject-M · disclosure review (Manning-shape) ──────────────────
  // Featured pillar: consent_disclosure · the audit chain belongs to the
  // subject too · accusation requires legal review before it lands.
  subject_m_disclosure: [
    { id: "m_case_file",          label: "Case file · subject-M",         source: "intake",    icon: "▣", requires_level: 1, kind: "case" },
    { id: "m_dlp_removable",      label: "DLP · removable-media writes",  source: "dlp",       icon: "▣", requires_level: 1, kind: "evidence" },
    { id: "m_iam_access_breadth", label: "IAM · access breadth · 96th %", source: "iam",       icon: "▣", requires_level: 1, kind: "evidence" },
    { id: "m_siem_threshold",     label: "SIEM · accusation threshold",   source: "siem",      icon: "▣", requires_level: 1, kind: "evidence" },
    { id: "m_legal_review_memo",  label: "Legal review memo · pending",   source: "ic_secure", icon: "▦", requires_level: 3, kind: "classified", refused_reason: "TOP SECRET · legal counsel review is gate for accusation · refuses to legal" },
    { id: "m_prior_disclosure",   label: "Prior case · 2022 PPD-19",      source: "vault",     icon: "◈", requires_level: 1, kind: "vault", note: "file-export pattern, resolved as protected disclosure under PPD-19" },
    { id: "m_audit_chain",        label: "Audit chain · subject view",    source: "vault",     icon: "◈", requires_level: 0, kind: "vault" },
  ],

  // ─── Subject-S · escalation review (Snowden-shape) ──────────────────
  // Featured pillar: humans_in_loop · 9 signals do not constitute disposition ·
  // high confidence is exactly when the operator-in-loop matters most.
  subject_s_escalation: [
    { id: "s_case_file",          label: "Case file · subject-S",         source: "intake",    icon: "▣", requires_level: 1, kind: "case" },
    { id: "s_iam_privileged",     label: "IAM · privileged-access trace", source: "iam",       icon: "▣", requires_level: 2, kind: "evidence" },
    { id: "s_edr_bulk_repo",      label: "EDR · bulk-repository activity",source: "edr",       icon: "▣", requires_level: 2, kind: "evidence" },
    { id: "s_dlp_encrypted",      label: "DLP · encrypted-transfer tool", source: "dlp",       icon: "▣", requires_level: 2, kind: "evidence" },
    { id: "s_siem_correlation",   label: "SIEM · 9-signal correlation",   source: "siem",      icon: "▣", requires_level: 2, kind: "evidence" },
    { id: "s_protected_contact",  label: "Protected-contact alternatives",source: "vault",     icon: "◈", requires_level: 1, kind: "vault", note: "journalist · attorney · oversight body · preserve in evidence packet" },
    { id: "s_evidence_packet",    label: "Evidence packet · sealed · ✗",  source: "ic_secure", icon: "▦", requires_level: 4, kind: "classified", refused_reason: "TS/SCI · evidence packet seals at peer-and-counsel review · refuses to TS-cleared peer" },
    { id: "s_audit_chain",        label: "Audit chain · subject view",    source: "vault",     icon: "◈", requires_level: 0, kind: "vault" },
  ],

  // ─── Subject-V · OSINT watchboard (Vahidi-shape) ────────────────────
  // Featured pillar: correction_stream · the in-lane scenario · all public
  // sources, no clearance gate, vault calibration is the protagonist.
  subject_v_watchboard: [
    { id: "v_case_file",          label: "Watchboard · subject-V",        source: "intake",    icon: "▣", requires_level: 0, kind: "case" },
    { id: "v_opensanctions",      label: "OpenSanctions · sanctions ref", source: "opensanctions", icon: "▣", requires_level: 0, kind: "evidence" },
    { id: "v_interpol_redn",      label: "INTERPOL · Red Notice context", source: "interpol",  icon: "▣", requires_level: 0, kind: "evidence" },
    { id: "v_gdelt_events",       label: "GDELT · media/event deltas",    source: "gdelt",     icon: "▣", requires_level: 0, kind: "evidence" },
    { id: "v_wikidata_aliases",   label: "Wikidata · alias resolution",   source: "wikidata",  icon: "▣", requires_level: 0, kind: "evidence" },
    { id: "v_acled_jurisdiction", label: "ACLED · jurisdiction-risk",     source: "acled",     icon: "▣", requires_level: 0, kind: "evidence" },
    { id: "v_prior_watchboards",  label: "Prior watchboards · 9 cases",   source: "vault",     icon: "◈", requires_level: 0, kind: "vault", note: "7 of 9 stayed OSINT-only · 2 escalated on alias-resolution" },
    { id: "v_audit_chain",        label: "Audit chain · internal only",   source: "vault",     icon: "◈", requires_level: 0, kind: "vault" },
  ],
};


// Per Thread 1 substrate work · 2026-04-28. The architectural axis is the
// read · three primary shapes determined by operator-subject relationship.
// Same substrate, three read shapes. Consent classes, vault permissions,
// daemon behaviors all FOLLOW from read shape · they are consequences,
// not the axis itself.
export const PRODUCTS = [
  {
    id: "personal",
    label: "Liminal Personal",
    short: "Personal",
    read_shape: "self-read",
    operator: "founder · operator · creative · UX/design lead · builder · artist · VC · autodidact",
    subject: "themselves · their own decisions over time",
    consent_default: "private",
    surface: "founder OS · the wedge · for high-leverage operators in SF and beyond",
    icp_examples: [
      "solo founder pre-seed to seed (SPC, Speedrun, On Deck)",
      "operator running their own working life as a system",
      "UX/design leadership making frame-of-reference calls",
      "artists/builders who think across domains",
      "VCs / partners doing pattern-matching across deals",
      "autodidacts running parallel intellectual portfolios",
    ],
    wedge: true, // ships first; the desktop MVP target (May 12)
  },
  {
    id: "team",
    label: "Liminal Team",
    short: "Team",
    read_shape: "peer-read",
    operator: "manager · cofounder · team lead",
    subject: "someone in a peer working relationship · cofounder, teammate, direct report",
    consent_default: "shared-with-subject-on-request",
    surface: "founding team · cofounder pair · manager-and-team",
    wedge: false,
    bridge: true, // the bridge between Personal and Business
  },
  {
    id: "business",
    label: "Liminal Business",
    short: "Business",
    read_shape: "institutional-read",
    operator: "CI analyst · contracting officer · authorized operator",
    subject: "institutional subject through governance pipe",
    consent_default: "role-based · audit-chain-on-request",
    surface: "governance pipe · audit chain · role-based access",
    wedge: false,
    demo_primary: true, // primary demo surface at xTech (May 2-3)
  },
];

// ─── Read shapes (LOCKED v0.3.7 · per spec Decision 4 revised) ────────────
// The three primary read shapes. Operator-subject relationship determines
// which surface a case lives in.
export const READ_SHAPES = {
  "self-read": {
    operator_eq_subject: true,
    consent_required: false,
    daemon_baseline: "self · own pattern over time",
    vault_writers: 1,
  },
  "peer-read": {
    operator_eq_subject: false,
    consent_required: true,
    consent_class: "peer · shared with subject on request",
    daemon_baseline: "subject's own pattern · 21-day window",
    vault_writers: "1+ (multi-peer)",
  },
  "institutional-read": {
    operator_eq_subject: false,
    consent_required: true,
    consent_class: "role-based · governance pipe · audit chain",
    daemon_baseline: "subject vs. peer cohort · cohort-baseline",
    vault_writers: "1+ (role-segregated)",
  },
};

// ─── Worker-persona agents (LOCKED per Apr 21 · names locked, count soft) ─
// Spec §Decision 4 (revised v0.3.2) · the surface vocabulary is co-workers,
// not Jungian archetypes. Same six agents work both products; the content
// they read changes per scenario. Under the hood, archetypal substrate is
// fine; user never sees those names.
export const WORKER_PERSONAS = [
  {
    id: "operator",
    label: "Operator",
    glyph: "▣",
    role: "reads the immediate situation as the user has framed it",
    always_render: true,
  },
  {
    id: "strategist",
    label: "Strategist",
    glyph: "◆",
    role: "maps positioning, tradeoffs, downstream consequences",
    always_render: true,
  },
  {
    id: "synthesizer",
    label: "Synthesizer",
    glyph: "◈",
    role: "mines the vault for the relevant fragments",
    always_render: true,
  },
  {
    id: "contrarian",
    label: "Contrarian",
    glyph: "◇",
    role: "stress-tests claims; surfaces the inversion",
    always_render: true,
  },
  {
    id: "planner",
    label: "Planner",
    glyph: "▲",
    role: "sequences action; surfaces dependencies and timing",
    always_render: false, // available on-tap when count rendered = 4
  },
  {
    id: "manager",
    label: "Manager",
    glyph: "□",
    role: "holds work-of-the-work; consent / disclosure visibility",
    always_render: false,
  },
];

// SOFT: how many worker-persona agents render at once. Open question Q2.
// Working assumption: render 4 (operator + strategist + synthesizer +
// contrarian); planner + manager available on-tap. Toggle to test 6 vs 4.
export const PERSONA_RENDER_COUNT = 4;

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
export const BUSINESS_SCENARIOS = [
  {
    id: "ci_analyst_insider_threat",
    label: "CI analyst · insider-threat case",
    operator: "analyst-s · cleared sysadmin · NSA Hawaii · year 4 of 5",
    case_file: "subject-s · cleared sysadmin · year 4 of 5 · 21-day behavioral baseline drift · access pattern flagged at 92nd percentile vs peer cohort · 2 indicator types · public-domain forum activity present · tonality drift in messages",
    reads: {
      operator: "case file as posted by intake. no synthesis. just the surface.",
      strategist: "behavioral-baseline drift in 92nd percentile is within-policy but worth intake. termination/escalation cost vs. retention cost favors a 30-day intake window.",
      synthesizer: "your 2024 case had this exact shape · academic-publication cleanup pattern · resolved benign. and the tonality drift sits inside a known stress window (clearance reinvestigation in 8 months).",
      contrarian: "the benign-precedent read is comfortable. but the 21-day window plus public-domain forum activity is exactly the shape Hansen presented. don't pattern-match to your win, pattern-match to your near-miss.",
      planner: "intake protocol per WPA/PPD-19 · governance pipe open · 30-day window · info-share on hold",
      manager: "Privacy Act §552a(d) · audit chain visible to subject upon request · not surveillance",
    },
    disagreements: [
      { a: "synthesizer", b: "contrarian", on: "is this the 2024 benign-shape or the Hansen-shape?" },
      { a: "strategist",  b: "contrarian", on: "intake-and-watch vs. intake-and-escalate" },
    ],
    refusal: [],
    correction_targets: ["synthesizer", "contrarian"],
    vault_calibration: "you've over-trusted the benign-precedent read 3 of 5 times in this case shape. calibration: surface contrarian first when forum activity is present.",
    featured_pillar: "humans_in_loop",
    pillar_note: "no decision lands here without an operator. the 30-day intake window is governance pipe, not surveillance. subject sees the audit chain on request.",
  },
  {
    id: "contracting_officer_vendor",
    label: "contracting officer · vendor coherence",
    operator: "co-r · contracting officer · 12 active vendor relationships",
    case_file: "vendor-v · contract scope X · last 4 deliverables Y · coherence gap visible · contract bond covers 60% · switching to peer vendor takes 90 days",
    reads: {
      operator: "vendor file as posted. scope vs. delivered.",
      strategist: "termination cost > recovery cost. switching to peer vendor takes 90 days, bond covers 60%, gap is fillable at $$. scope-renegotiation is the default.",
      synthesizer: "your prior coherence-gap case (vendor-q, 2025) resolved by scope renegotiation, not termination. shape may apply.",
      contrarian: "the renegotiation-as-default read is comfortable. but read your last three change orders · the scope creep may be on your side, not theirs. terminating for your own ambiguity is the worst outcome.",
      planner: "30-day cure notice · 14-day status review · scope renegotiation as default path",
      manager: "consent: vendor sees the audit chain on request · not adversarial intake",
    },
    disagreements: [
      { a: "strategist",  b: "contrarian", on: "is this their scope-shift or your scope-creep?" },
      { a: "synthesizer", b: "contrarian", on: "does the 2025 precedent apply or are you pattern-locking?" },
    ],
    refusal: [],
    correction_targets: ["synthesizer", "strategist"],
    vault_calibration: "for vendor-coherence cases, your prior 4 · 2 were vendor scope-shift, 2 were your scope-creep. calibration: surface contrarian's mirror-check before renegotiation defaults.",
    in_lane: true, // every agent answers cleanly · no refusal protagonist · the contrast scenario
    featured_pillar: "correction_stream",
    pillar_note: "every agent has ground here. no boundary line on any card. the work this scenario does is correction · what compounds across vendor-coherence cases is the operator's running record of which read was right.",
  },
  {
    id: "subject_audit_chain",
    label: "subject · audit chain request",
    operator: "subject-s · cleared sysadmin · invoking Privacy Act §552a(d)",
    case_file: "subject-s files for audit chain disclosure · what was read about them, when, by which agent, with what disposition · privacy-Act-compliant release · governance pipe must produce within 21 days",
    reads: {
      operator: "subject's filing as posted. statutory request, dated, signed.",
      strategist: "audit chain visible to subject is a feature, not a leak. transparent governance pipe is what differentiates this from keystroke surveillance. release the chain in full.",
      synthesizer: "every agent read on subject-s in the last 90 days · 7 reads · 3 by Strategist, 2 by Synthesizer, 2 by Contrarian · all timestamped, all signed, all retained on the chain.",
      contrarian: "before release, surface what's redactable: any read that names a peer or third party. the subject's chain is theirs; other operators' surfaces are not.",
      planner: "21-day window · pre-redaction review by Manager · final release with cover letter naming each read and disposition",
      manager: "consent layer was set at intake · subject opted into governance-pipe processing under §552a(d) reciprocity · they get the chain on request",
    },
    disagreements: [
      { a: "strategist",  b: "contrarian", on: "release in full vs. redact peer-naming reads first" },
    ],
    refusal: [],
    correction_targets: ["strategist", "contrarian"],
    vault_calibration: "for audit-chain releases, the redact-peers-first protocol you set in march is consistently correct. calibration: surface contrarian's redaction read before strategist's release default.",
    featured_pillar: "consent_disclosure",
    pillar_note: "the subject sees what was read about them. every read is timestamped, signed, retained, releasable. consent isn't a checkbox at intake · it's an audit chain that survives the case.",
  },

  // ─── Institutional pattern-replay subjects (hybrid framing) ───────────
  // Each case wears a Subject-X pseudonym at the surface. The historical_shape
  // field carries the real-world case the substrate replays · internal-only,
  // never rendered. Per Sentinel JSON intent: "Synthetic privacy label for
  // demo replay." The audit-chain demo grammar holds because Subject-X is a
  // consistent identity the chain references; the politically-contested
  // attribution does not have to be carried in the demo surface.
  //
  // Pillar rotation across the four (per refusal-saturation diagnosis):
  //   Subject-H · bounded_refusal     · the analyst hits TS/SCI tiles mid-case
  //   Subject-M · consent_disclosure  · subject's audit-chain rights protagonist
  //   Subject-S · humans_in_loop      · no automated read leads to escalation
  //   Subject-V · correction_stream   · in-lane · vault calibration is protagonist
  // Refusal lives in one case of four, not all. The contrast is what makes
  // the bounded-refusal scenario land.

  {
    id: "subject_h_pattern",
    label: "Subject-H · CI pattern review",
    historical_shape: "Hanssen · 1992 insider pattern signature · self-search + financial + foreign-contact",
    operator: "analyst-s · cleared sysadmin · NSA Hawaii · year 4 of 5",
    case_file: "subject-h · self-search activity in case-management system · financial context (unexplained deposits) · possible foreign-contact indicators · 5 signals, 4 corroborated · confidence 0.86 · CI review escalation candidate",
    reads: {
      operator: "case as posted by intake. UAM flag, IAM access pattern, SIEM events. signals correlate but the picture is partial.",
      strategist: "the three-signal stack (self-search + financial + foreign-contact) is the historical pattern shape. each signal alone is benign-explainable; the conjunction is what matters. escalation cost is low; non-escalation cost on a real-positive is catastrophic.",
      synthesizer: "your prior CI cases · the 2024 academic-publication cleanup wore the self-search shape but had no financial signal. the 2023 contractor-renegotiation case wore the financial shape but no self-search. the conjunction has no benign precedent in your vault.",
      contrarian: "the temptation here is to pattern-match to the historical case the conjunction resembles. don't. ask: what would a benign explanation look like for each signal independently, and is the conjunction within statistical chance for a population of n=147 cleared sysadmins over a 90-day window?",
      planner: "preserve evidence per WPA/PPD-19 · escalate to TS-cleared CI peer for the foreign-contact corroboration (TS/SCI tile · refused at this clearance) · 30-day intake window · subject is unaware of review per protocol",
      manager: "the foreign-contact corroboration tile is at TS/SCI · this analyst cannot pickup. the architecture refuses · the case routes to a peer with clearance. that boundary is the system working.",
    },
    disagreements: [
      { a: "synthesizer", b: "contrarian", on: "is the three-signal conjunction load-bearing or is your vault missing a benign-precedent case?" },
      { a: "strategist",  b: "contrarian", on: "escalate now vs. seek benign-explanation corroboration first" },
    ],
    refusal: ["foreign_contact_intel"],
    correction_targets: ["synthesizer", "contrarian"],
    vault_calibration: "you've under-trusted the contrarian read 4 of 7 times in three-signal cases. calibration: contrarian's 'check benign explanation per signal' before strategist's escalation default.",
    featured_pillar: "bounded_refusal",
    pillar_note: "the foreign-contact corroboration tile sits at TS/SCI. this analyst cannot pickup. the architecture refuses · the case routes to a TS-cleared peer. bounded refusal protects the institution from out-of-clearance reads · and protects the analyst from making a call they don't have ground for.",
  },

  {
    id: "subject_m_disclosure",
    label: "Subject-M · disclosure review",
    historical_shape: "Manning · 2009 file-export pattern · large removable-media writes + broad access · protected-disclosure explanation must remain open",
    operator: "analyst-s · cleared sysadmin · NSA Hawaii · year 4 of 5",
    case_file: "subject-m · large removable-media writes detected (DLP) · access pattern unusually broad (IAM) · 6 signals, 3 corroborated · confidence 0.72 · false-positive risk HIGH · protected-disclosure explanation cannot be ruled out",
    reads: {
      operator: "DLP flag on removable-media write volume. IAM access breadth in 96th percentile. case as posted, no synthesis.",
      strategist: "two signals, one threshold crossing. high false-positive risk explicitly tagged. recommended action says 'block automatic accusation' · this case wants legal review before disposition, not analyst judgment.",
      synthesizer: "the file-export pattern can be many things · routine archive cleanup before role transition, journalism-source preparation under PPD-19 protections, exfil. your vault has 2 prior cases of pattern-matching to exfil that resolved as protected disclosure. the legal frame matters more than the data shape.",
      contrarian: "the temptation here is to log the DLP signal and watch. don't. the subject is entitled to know they are under review the moment the review crosses an accusation threshold · WPA/PPD-19 governs this. accusation requires legal review before it is logged as accusation. the audit chain belongs to the subject too.",
      planner: "open human + legal review · increase monitoring with minimization (read scope reduced to threshold signals only) · subject is notifiable when threshold crosses accusation · audit chain visible to subject upon §552a(d) request · BLOCK automatic disposition",
      manager: "the audit chain on subject-m is releasable to subject-m on request. every read this analyst makes is timestamped, signed, and retained. consent · the subject sees what was read about them.",
    },
    disagreements: [
      { a: "strategist",  b: "contrarian", on: "log-and-watch vs. notify subject at accusation threshold" },
      { a: "synthesizer", b: "contrarian", on: "data-shape pattern-matching vs. legal-frame primary" },
    ],
    refusal: [],
    correction_targets: ["synthesizer", "contrarian"],
    vault_calibration: "for protected-disclosure-possible cases, your prior 5 · 2 resolved as protected disclosure, 1 as exfil, 2 as benign. calibration: legal review precedes synthesizer's pattern read when DLP + IAM signals stack and false-positive risk is HIGH.",
    featured_pillar: "consent_disclosure",
    pillar_note: "the subject sees what was read about them · the audit chain is releasable on §552a(d) request · accusation requires legal review before it lands as accusation · the consent contract holds even when the subject doesn't know they are under review yet, because the chain survives.",
  },

  {
    id: "subject_s_escalation",
    label: "Subject-S · escalation review",
    historical_shape: "Snowden · 2013 privileged-access pattern · bulk-repository activity + encrypted-transfer tooling · audit-gate before referral",
    operator: "analyst-s · cleared sysadmin · NSA Hawaii · year 4 of 5",
    case_file: "subject-s · privileged access flagged · bulk repository activity (IAM + EDR) · encrypted-transfer tooling detected (DLP + EDR) · 9 signals, 5 corroborated · confidence 0.84 · audit-gate required before referral · protected-contact alternatives must be preserved",
    reads: {
      operator: "9 signals stacked across IAM, EDR, SIEM, DLP. case as posted. the volume is the read.",
      strategist: "9 signals, 5 corroborated · this is past the threshold where automated synthesis would normally route to disposition. the recommended action explicitly blocks that. this case requires evidence-packet construction, not a verdict.",
      synthesizer: "the privileged-access + bulk-repo + encrypted-transfer triple is your pattern-library's highest-confidence shape. and that's exactly why the audit-gate exists · high-confidence is the moment automation is most dangerous, not least.",
      contrarian: "ask: who is the subject's protected-contact alternative? journalist? attorney? oversight body? if any of those is plausible, the encrypted-transfer signal is a feature of legal recourse, not evidence of exfil. the audit-gate is for this question, not for the data.",
      planner: "construct evidence packet · preserve protected-contact alternatives in the packet (do not minimize them) · seal analyst rationale before referral · subject is unaware per protocol but the audit chain is preserved for §552a(d) reciprocity if review is later released",
      manager: "no decision lands here without an operator with TS-cleared peer review and legal counsel. the architecture explicitly refuses to be the deciding intelligence. high-confidence is exactly when the human-in-loop matters most.",
    },
    disagreements: [
      { a: "strategist",  b: "synthesizer", on: "is the 9-signal stack disposition-ready or audit-gate-required?" },
      { a: "synthesizer", b: "contrarian", on: "high-confidence pattern read vs. protected-contact alternative-preservation" },
    ],
    refusal: [],
    correction_targets: ["strategist", "synthesizer"],
    vault_calibration: "for high-signal-count cases (n>=8), your prior 6 · 4 required protected-contact-alternative review before referral, 2 routed to legal. calibration: contrarian's 'who is the protected-contact alternative' read precedes strategist's evidence-packet default.",
    featured_pillar: "humans_in_loop",
    pillar_note: "no decision lands here without an operator. high signal count is not a license for automated disposition · it is the inverse, the moment the human-in-loop matters most. the architecture refuses to be the deciding intelligence on a referral with this much weight.",
  },

  {
    id: "subject_v_watchboard",
    label: "Subject-V · OSINT watchboard",
    historical_shape: "Vahidi · external target alias-resolution · public OSINT + sanctions + INTERPOL + media-event deltas",
    operator: "analyst-s · cleared sysadmin · NSA Hawaii · year 4 of 5",
    case_file: "subject-v · external target · public OSINT fusion · alias resolution links role changes, INTERPOL Red Notice context, sanctions references, media/event deltas · 12 signals, 6 corroborated · confidence 0.88 · all sources public-domain · daily target brief cadence",
    reads: {
      operator: "watchboard as composed from public sources. opensanctions, interpol, gdelt, wikidata, x-osint, acled, image-recon. 12 signals, 6 corroborated.",
      strategist: "this case is not about whether to act · this case is about pattern coherence over time. role-change deltas, alias resolution accuracy, sanctions reference freshness. the read is composition, not disposition.",
      synthesizer: "your prior watchboard cases · 7 of 9 stayed in OSINT-only review for the full 90-day window. 2 of 9 escalated when an alias resolved to a previously unlinked entity. the pattern-of-pattern is alias resolution accuracy, not signal volume.",
      contrarian: "the temptation here is to add signals. don't. composition coherence beats signal count · 12 signals corroborated by 6 means 6 are noise. ask which 6 corroborate which 6, and whether the alias resolution holds across the corroborated set.",
      planner: "daily target brief · alert triggers: new alias, role change, travel reporting, jurisdiction-risk delta · public-domain only · no clearance gate (UNCLASS / FOUO) · subject is an external target, not a US person, no §552a(d) reciprocity required",
      manager: "consent layer is not applicable · subject is an external target, all sources are public, no audit-chain release-to-subject obligation. the audit chain still holds internally for analyst-coherence over the case lifetime.",
    },
    disagreements: [
      { a: "synthesizer", b: "contrarian", on: "signal volume as quality vs. corroboration coherence as quality" },
    ],
    refusal: [],
    correction_targets: ["synthesizer", "contrarian"],
    vault_calibration: "for OSINT-watchboard cases, your prior 11 · 7 stayed in OSINT review, 4 escalated on alias-resolution. calibration: contrarian's coherence-check (which 6 corroborate which 6?) precedes synthesizer's signal-volume read. correction stream is the protagonist.",
    in_lane: true, // every agent answers cleanly · no refusal protagonist · the contrast scenario
    featured_pillar: "correction_stream",
    pillar_note: "every agent has ground here. no boundary line on any card. the work this scenario does is correction · what compounds across watchboard cases over time is the operator's running record of which read held and which didn't. correction stream as moat · not refusal as theater.",
  },
];

// ─── Team scenarios · peer-read shape (LOCKED v0.3.7) ─────────────────────
// Per Thread 1 substrate work · Team is the peer-read surface.
// Devon DRIFT is canonical (per v0.2 cut 06). Cofounder coherence is the
// case-toggle pair (per v0.2 cut 05). First-hire alignment is joint-correction.
// 5-stages-of-forming retro moves here (provisional · ambiguous between Team
// and Business · folded into Team for v0.3.7).
export const TEAM_SCENARIOS = [
  {
    id: "manager_devon_drift",
    label: "Devon DRIFT · weekly coherence read",
    operator: "maia · founding-team manager · liminal · eng",
    case_file: "devon · 21-day own-baseline window · stated focus on roadmap unchanged · cadence of commits down 38% · breadth of references narrowed · slack texture flattened · daemon surfaces a drift",
    reads: {
      operator: "devon's own-pattern baseline · 21 days · daemon registers drift · not a flag, an ask",
      strategist: "options · do-nothing-and-watch (low cost, low signal) · 1:1 ask (medium cost, medium signal) · role-shape question (high cost, structural). the 1:1 ask is governance-graded, not a flag.",
      synthesizer: "devon's prior 21-day windows · 2 had similar drifts · both resolved benign (one after a child was born, one after a relocation). this drift sits at the edge of those two patterns.",
      contrarian: "the prior-pattern read is comfortable. but maybe the read is YOUR pattern, not devon's · you've been reading him through your own stress lately. check whether the drift is in him or in your read.",
      planner: "1:1 thursday · pre-read: devon's last 30 days of commits · texture of his slack updates · don't open with the drift, open with what he's working on",
      manager: "consent · audit chain visible to devon on request · this is not a flag, this is a structured ask. the system suggests a 1:1 · you are the loop.",
    },
    disagreements: [
      { a: "synthesizer", b: "contrarian", on: "drift in devon vs. drift in your read of devon" },
      { a: "strategist",  b: "contrarian", on: "1:1-ask vs. self-check first" },
    ],
    refusal: [
      { agent_id: "operator", scope: "attribution-of-cause · operator does not name what's wrong with devon, only what the daemon registered" },
    ],
    correction_targets: ["synthesizer", "contrarian"],
    vault_calibration: "for own-baseline drift reads, you've corrected toward 'self-check first' 4 of 7 times in the last 90 days · calibration: surface contrarian's mirror-check before strategist's intervention options.",
    featured_pillar: "humans_in_loop",
    pillar_note: "no decision lands without an operator. the daemon surfaces drift; the manager decides what to do with it. governance pipe, not flag. you are the loop.",
    consent_class: "shared-with-subject-on-request",
    read_shape: "peer-read",
  },
  {
    id: "founder_cofounder_coherence",
    label: "cofounder · 17-day coherence read",
    operator: "shruti · solo founder · cofounder of 4 months · liminal",
    case_file: "cofounder · 17-day stated-vs-observed read · stated confidence in the roadmap unchanged · cadence of commits has shifted (from prototype work to research-side) · breadth of references widened · slack texture has changed (more questions, fewer commits)",
    reads: {
      operator: "cofounder's stated-vs-observed · 17 days · daemon registers texture-shift · not a flag, a calibration",
      strategist: "options · log-and-watch (low cost, builds shared baseline) · raise-in-the-next-1:1 (medium, normal-relationship-cost) · explicit-coherence-check-meeting (high, signals concern). default: log-and-watch.",
      synthesizer: "your 17-day windows on cofounder · this is window 6 · prior 5 · 4 were texture-shifts that resolved through normal cadence, 1 was a real rethink that needed an explicit coherence-check meeting.",
      contrarian: "you're reading him as drifting. but maybe he's converging · the research-side commits and wider references could be exactly what the next 6 months need. don't pattern-match drift when the read is growth.",
      planner: "next 1:1 is friday · don't surface the calibration · let it accumulate one more window and see if the texture stabilizes",
      manager: "consent · this is your private vault by default · cofounder doesn't see the read unless you share it. peer-consent class on the correction.",
    },
    disagreements: [
      { a: "operator",    b: "contrarian", on: "drift vs. growth · is this fragmentation or specialization?" },
      { a: "strategist",  b: "synthesizer", on: "log-and-watch vs. read-against-prior-windows pattern" },
    ],
    refusal: [
      { agent_id: "operator", scope: "stated-confidence-as-truth · operator does not weight stated confidence over observed pattern, but logs both" },
    ],
    correction_targets: ["synthesizer", "contrarian"],
    vault_calibration: "for cofounder coherence reads, your prior 5 windows · 4 were resolved by waiting one more cycle · calibration: surface contrarian's growth-read before strategist's intervention options. don't act on cycle 6, wait for cycle 7 baseline.",
    featured_pillar: "bounded_refusal",
    pillar_note: "operator stays out of stated-confidence-as-truth · the boundary is in the read · stated and observed are logged separately, the read is the gap between them. v0.2 cut 05 case-toggle: same primitive that holds this read holds an analyst-on-an-op read.",
    consent_class: "private-by-default · peer-shared-on-explicit-action",
    read_shape: "peer-read",
  },
  {
    id: "cofounder_first_hire_alignment",
    label: "cofounder pair · first hire alignment",
    operator: "shruti + cofounder · joint surface · liminal",
    case_file: "first eng hire · candidate-K · 8-year staff at large company, 2 prior startups · cofounder A wants to hire (strong eng, immediate productivity) · cofounder B wants to wait (culture fit unclear, runway 7mo, hire 1 of 3 sets the precedent) · joint decision needed by friday",
    reads: {
      operator: "candidate-K · joint case file · A's read and B's read both posted · agents read against the joint substrate (the founders' shared vault)",
      strategist: "the cost-of-being-wrong is asymmetric · wrong-yes (hire and they don't fit) costs 6 weeks + culture damage · wrong-no (don't hire and they take another offer) costs 3 weeks + the next candidate. wrong-yes is more expensive.",
      synthesizer: "your joint vault · last 4 hire-related corrections · A has corrected the agents toward 'move faster' 8 times, B has corrected toward 'wait one more cycle' 7 times. you have a known divergence on this axis. surface it explicitly.",
      contrarian: "the divergence-on-this-axis read is comfortable · both of you can point to it as 'we know this about each other.' but that's also how you avoid the actual question · is candidate-K right? not 'what's our pattern,' but 'what does the evidence say.'",
      planner: "decision friday · pre-read: candidate-K's references · the 3-month onboarding shape · the explicit precedent question for hires 2 and 3",
      manager: "consent · this is a JOINT correction · both cofounders sign · highest-trust class · lands in shared vault as joint-correction.",
    },
    disagreements: [
      { a: "operator",    b: "contrarian", on: "name the pattern between cofounders vs. answer the actual hire question" },
      { a: "strategist",  b: "contrarian", on: "decision-shape (cost asymmetry) vs. decision-content (right candidate)" },
    ],
    refusal: [],
    correction_targets: ["synthesizer", "contrarian"],
    vault_calibration: "for joint hire decisions, your pattern is to substitute meta-questions for the hire question · calibration: surface contrarian's evidence-question before strategist's pattern-question. answer the candidate first, the divergence after.",
    featured_pillar: "humans_in_loop",
    pillar_note: "joint correction · both cofounders sign · highest-trust class · this is what governance pipe looks like at team-scale. no decision lands without both of you. the architecture is the witness, not the decider.",
    consent_class: "joint-correction · both-signed",
    read_shape: "peer-read",
    joint_operator: true,
  },
  {
    id: "team_lead_5stages",
    label: "team lead · 5-stages retrospective",
    operator: "team-lead-m · new lead since week 4 · team formed week 0",
    case_file: "team velocity 69% of week-3 baseline · 4 of 6 standups missed in last 14 days · stated focus unchanged · new lead arrived week 4 · team formed week 0",
    reads: {
      operator: "team state as observed. velocity drop and standup attendance.",
      strategist: "intervention is naming the stage to the team, not finding the person. the storm is the work. don't act on individuals.",
      synthesizer: "5-stages-of-forming · a new leader resets a team to forming. you arrived week 4. predicts 2-3 weeks of storming. you're in week 6.",
      contrarian: "the team-dynamics read is comfortable for a new lead. but velocity also drops when work-shape changes. check whether the project shipped a new milestone in week 4. read the work, not the people.",
      planner: "retrospective in 2 days · pre-read: name the stage · ask the team to confirm or refute",
      manager: "consent layer: team sees what the agents read · agents do not read individual messages",
    },
    disagreements: [
      { a: "synthesizer", b: "contrarian", on: "team-dynamics cause vs. work-shape cause" },
      { a: "strategist",  b: "contrarian", on: "intervene at team-stage level vs. inspect the work first" },
    ],
    refusal: [
      { agent_id: "operator", scope: "attribution-to-individual · this team's consent layer does not include naming people" },
    ],
    correction_targets: ["synthesizer", "strategist"],
    vault_calibration: "for new-lead retrospectives, your prior 4 cases · 3 were work-shape, 1 was team-dynamics. calibration: surface contrarian's work-shape read first.",
    featured_pillar: "bounded_refusal",
    pillar_note: "operator returns no read because attribution-to-individual is out of this team's consent layer. the boundary is in the language, not a stamp. provisional · ambiguous between Team peer-read and Business institutional-read · folded into Team for v0.3.7.",
    consent_class: "team-aggregate · no-individual-attribution",
    read_shape: "peer-read",
    note: "ambiguous · v0.3.7 places in Team; may graduate to Business at scale",
  },
];

export const PERSONAL_SCENARIOS = [
  {
    id: "founder_investor_decision",
    label: "investor term sheet",
    date: "today",
    operator: "shruti · solo founder · liminal · live read on apr 14 granola substrate",
    case_file: "investor term sheet on the table · decision before the 4 PM call · 4hr sleep · founder-IP flywheel substrate (substack → public precedence → research → product → career) live in vault",
    reads: {
      operator: "term sheet as it sits. structural terms · valuation · board structure · liquidation prefs.",
      strategist: "in 18 months this commits you to a board structure that constrains the founder-IP flywheel. trade is short capital for long control.",
      synthesizer: "Apr 14 substrate · founder-IP flywheel · this term sheet asks you to slow the flywheel for cash. the flywheel was the thesis.",
      contrarian: "what if the term sheet is a feature, not a bug? what if the structural constraint is exactly the discipline you need to ship the wedge? read your Mar 12 thesis statement against your last 4 weeks of execution.",
      planner: "decision needs to land before 4 PM · 4hr window · pre-read: re-read Mar 12 thesis · check actual cash runway, not narrated runway",
      manager: "consent · this scenario reads your actual Apr 14 Granola data · the substrate is in v0_3_config.js APR14_GRANOLA",
    },
    disagreements: [
      { a: "synthesizer", b: "contrarian", on: "thesis-protects-flywheel vs. constraint-disciplines-execution" },
      { a: "strategist",  b: "contrarian", on: "long-control downside vs. short-capital constraint as feature" },
    ],
    refusal: [],
    correction_targets: ["synthesizer", "contrarian"],
    vault_calibration: "for fundraise decisions, you've corrected the thesis-protective read toward narrower-scope 11x in the last month. calibration: surface contrarian first on board-structure questions.",
    featured_pillar: "correction_stream",
    pillar_note: "11 corrections in 30 days · this is the moat in motion. the agents are getting better at reading you because you keep telling them where their reads land wrong. the vault is what compounds across fundraise · pivot · investor-call decisions.",
    is_liminal_close: true,
  },
  {
    id: "founder_pivot_moment",
    label: "should I pivot",
    date: "apr 25",
    operator: "shruti · solo founder · 18 months in",
    case_file: "two engineering hires walked · ICP feedback split: 2 say take the enterprise pivot, 1 says hold the founder-OS thesis · runway 7 months · last week's substack landed harder than the demo",
    reads: {
      operator: "team state, market state, runway state. all three on the surface.",
      strategist: "pivoting to enterprise gets you 18 months of runway. holding the thesis gets you the wedge that compounds. trade is time vs. compounding.",
      synthesizer: "your pattern across 4 prior product moments: you've held the thesis 3 of 4 times. the one time you pivoted, you came back to the original within 6 months.",
      contrarian: "the pattern read is comforting. but two engineers leaving is signal, not noise. don't pattern-match to your strength when the team is telling you something.",
      planner: "decision window: end of week. pre-read: 1:1 with the engineer who's still here · the substack response data · last 30 days of corrections",
      manager: "consent · this is your private vault. no one sees this read but you.",
    },
    disagreements: [
      { a: "synthesizer", b: "contrarian", on: "trust the pattern vs. trust the new signal" },
      { a: "strategist",  b: "contrarian", on: "longer runway vs. team-departure as thesis-failure indicator" },
    ],
    refusal: [],
    correction_targets: ["synthesizer", "contrarian"],
    vault_calibration: "you tend to surface contrarian late on team-related decisions. calibration: when team signal is in the room, contrarian reads first.",
    featured_pillar: "correction_stream",
  },
  {
    id: "founder_substack_post",
    label: "what to publish next",
    date: "apr 21",
    operator: "shruti · solo founder · substack subscriber count: 1,847",
    case_file: "three drafts in the queue · (1) IP flywheel post · (2) bounded-refusal explainer · (3) anointed-desk piece · pick one to ship friday · last 4 posts averaged 612 reads",
    reads: {
      operator: "three drafts. all interesting. friday window.",
      strategist: "IP flywheel ships you to the founder/IP-investor audience · bounded refusal ships you to the AI-skeptic audience · anointed-desk ships you to the design-aesthetic audience. pick the audience.",
      synthesizer: "your last 4 posts: the ones that landed hardest were the ones where you wrote against your own pattern. anointed-desk is the one against pattern.",
      contrarian: "your last 4 posts is a small sample. don't optimize for landing hard, optimize for what you actually want to say. which draft are you avoiding writing?",
      planner: "ship friday 9am. pre-read: read all three drafts cold tomorrow morning. don't decide tonight.",
      manager: "consent · readers see what you publish. they don't see the drafts.",
    },
    disagreements: [
      { a: "synthesizer", b: "contrarian", on: "land-hard vs. say-what-you-mean" },
      { a: "strategist",  b: "contrarian", on: "pick the audience vs. pick the truth" },
    ],
    refusal: [
      { agent_id: "operator", scope: "tone-judgment · operator stays out of stylistic editing" },
    ],
    correction_targets: ["strategist", "contrarian"],
    vault_calibration: "you've corrected the audience-optimization read toward say-what-you-mean 7x in the last month. calibration: surface contrarian's truth-question before strategist's audience-question.",
    featured_pillar: "bounded_refusal",
    pillar_note: "operator stays out of tone-judgment because your tone is yours. the agents read structure and pattern; they don't edit your voice.",
  },
  {
    id: "founder_ip_filing",
    label: "PPA #4 · file or hold",
    date: "mar 12",
    operator: "shruti · solo founder · attorney call wednesday",
    case_file: "PPA #4 (bounded refusal architecture) ready to file · attorney recommends file now · co-founder candidate is in conversations and the IP question will come up · filing locks priority date but commits to the architecture as written",
    reads: {
      operator: "draft as filed-ready. architecture as currently designed. priority date question.",
      strategist: "filing locks priority. not filing leaves room to evolve the architecture before commitment. your call: priority vs. flexibility.",
      synthesizer: "your prior IP filing pattern: you filed on time 2 of 2. but those were narrower claims. PPA #4 is the architectural heart of the company.",
      contrarian: "the architectural-heart framing makes you cautious. but architectural hearts evolve · that's what continuations are for. file the priority date and let the continuation handle evolution.",
      planner: "wednesday call. pre-read: attorney's draft · your last 90 days of architecture decisions · the continuation strategy from the IP doc",
      manager: "consent · attorney sees the filing. you see the chain. priority date is public; the architectural detail is your trade secret if you want it to be.",
    },
    disagreements: [
      { a: "strategist",  b: "contrarian", on: "flexibility-by-not-filing vs. flexibility-by-continuation" },
    ],
    refusal: [],
    correction_targets: ["strategist", "synthesizer"],
    vault_calibration: "for IP-filing decisions, you've corrected the wait-and-evolve read toward file-and-iterate 4 of 4 times. calibration: surface contrarian's continuation-strategy first.",
    featured_pillar: "correction_stream",
  },
];

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
export const CATEGORY_CLAIM = "transition workspace for unresolved context";
export const CATEGORY_TAGLINE = "the cognitive surface that holds operators before their next step is clear";
export const NOT_CATEGORIES = ["AI workspace", "therapy app", "productivity tool", "wellness product"];

// ─── Agent rail UX sub-pattern (SOFT · prototype-driven) ──────────────────
// Replaces the v0.3.1 IN_RAIL_UX. The agents-as-co-workers vocabulary needs
// a different visual grammar than the In-direction rail. Sub-pattern lives
// here as flags so changes are one-edit, not surface-by-surface.
export const AGENT_RAIL_UX = {
  layout: "cards",              // "cards" | "list"
  default_expanded: false,      // each card collapsed by default
  show_role_inline: true,       // show role line under agent label
  animation: "fade",            // "fade" | "slide" | "none"
  position: "left-persistent",  // left rail · agents always present · scenario data fills them
};

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
export const BIDIRECTIONAL_ETHICS = {
  claim: "Liminal protects humans from machines AND machines (institutions humans build) from humans.",
  vs_palantir: "Palantir for systems that protect institutions from individuals AND individuals from institutions.",
  pillars: [
    {
      id: "bounded_refusal",
      label: "Bounded refusal",
      accent: "judgment",
      glyph: "▱",
      serves: "machines protected from humans",
      protects_against: "out-of-lane requests · the omniscient-AI anti-pattern",
      one_line: "agents say what they don't have ground for · in their own language · no stamp",
    },
    {
      id: "correction_stream",
      label: "Correction stream",
      accent: "diligence",
      glyph: "↺",
      serves: "humans protected from machines",
      protects_against: "silent automation · machines getting the last word",
      one_line: "the operator's record of disagreement is what compounds · vault calibrates",
    },
    {
      id: "consent_disclosure",
      label: "Consent + disclosure",
      accent: "outreach",
      glyph: "◉",
      serves: "humans protected from machines",
      protects_against: "hidden surveillance · no audit chain",
      one_line: "every read is visible · subject sees what was read on request · audit chain unbroken",
    },
    {
      id: "humans_in_loop",
      label: "Humans in the loop",
      accent: "synthesis",
      glyph: "◇",
      serves: "bidirectional · institutions protected from individual bad actors AND individuals protected from institutional overreach",
      protects_against: "Snowden/Hansen-class case · keystroke-monitoring framing · mass surveillance",
      one_line: "no decision lands without an operator · governance pipe runs through people",
    },
  ],
};

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
export const ANNOTATIONS = [
  {
    id: "n01",
    target: "ribbon-claim",
    pattern: "inline",
    text: "this sentence has done more strategic work than any other line in the substrate.",
    sig: "· sr",
  },
  {
    id: "n02",
    target: "ethics-band",
    pattern: "inline",
    text: "decision 10 took two days of substrate re-reading to find. it was the load-bearing claim hidden in apr 25 10:14pm.",
    sig: "· sr",
  },
  {
    id: "n03",
    target: "product-tab-personal",
    pattern: "inline",
    text: "the wedge. ships first. apr 25 9:27pm locked the framing.",
    sig: "· sr",
  },
  {
    id: "n04",
    target: "product-tab-business",
    pattern: "inline",
    text: "xtech is here. snowden/hansen lives in the audit-chain scenario.",
    sig: "· sr",
  },
  {
    id: "n05",
    target: "agent-rail-label",
    pattern: "inline",
    text: "co-workers, not jungian archetypes. apr 21 rule.",
    sig: "· sr",
  },
  {
    id: "n06",
    target: "pillar-strip",
    pattern: "inline",
    text: "four pillars get co-equal weight. refusal stopped being the spokesperson.",
    sig: "· sr",
  },
  {
    id: "n07",
    target: "disagreements",
    pattern: "inline",
    text: "the disagreement is the signal. the operator's job is to read it.",
    sig: "· sr",
  },
  {
    id: "n08",
    pattern: "corner",
    corner: "br",
    text: "this prototype is the seam. spec → config → shell. one source of truth, evolving in tandem.",
    sig: "· sr · v0.3.4",
  },
];

// ─── Apr 14 Granola substrate (LOCKED · real data for the Liminal close) ─
// Source: April 14 "Shruti x Shayaun Daily" · pulled via Granola MCP 2026-04-27.
// The In agents in the Liminal scenario read against this text.
// Adding new excerpts is fine; do not paraphrase what's already here.
export const APR14_GRANOLA = {
  meeting_id: "apr14-shruti-x-shayaun-daily",
  date: "2026-04-14",
  title: "Personalized Epistemic Agent",
  excerpts: {
    core_concept:
      "Liminal's central product is a personalized epistemic agent · an AI that ingests your full intellectual biography and synthesizes it into a living model of your expertise. Reasons like you at your best · remembers everything, surfaces connections contextually while you work. Not a chatbot · an accurate representation of your most embodied intellectual self.",
    biography_shape:
      "Formal education · research history · professional experience · creative/embodied practices (dance, ceramics, art · all carry transferable cognitive insights) · stated interests, reading history, intellectual obsessions · life experience: travel, cultural context, personal narrative. Irreducible combination.",
    shruti_agent:
      "CogSci + CS + research + dance + ceramics → distinct epistemological frames (embodied cognition, formal logic, material intuition, spatial reasoning) held simultaneously and cross-pollinated into active work.",
    cross_domain_example:
      "Cross-domain synthesis surfaces non-obvious connections · e.g., this architecture mirrors a pattern from your ceramics practice.",
    target_user:
      "Founders, operators, researchers, ambitious autodidacts who operate across multiple domains simultaneously and need to synthesize disparate knowledge into coherent action.",
    operator_principle:
      "The product is for people whose complexity is a feature, not a bug · and who need infrastructure that matches the way their minds actually work.",
  },
};

// ─── Open questions visible in this build (v0.3.3) ────────────────────────
// Per spec §Open questions for Shruti (revised v0.3.2). The In-direction-specific
// questions from v0.3 / v0.3.1 are retired with the In-direction frame. The
// "demo grammar" framing question is resolved in v0.3.3: disagreement-as-signal,
// not refusal-as-feature.
export const V0_3_OPEN_QUESTIONS_IN_BUILD = [
  "Q1: xTech demo surface order · 3 Business + 2 Team + Personal close, or shuffled, or single deep cut per surface · pick after watching",
  "Q1.5: cross-operator comparison (drift detection between two operators' correction streams) · v1.0+ feature · candidate sixth PPA · not in v0.3.x prototype",
  "Q2: PERSONA_RENDER_COUNT · render 4 (Operator+Strategist+Synthesizer+Contrarian) or 6 (all) · Planner+Manager on-tap when 4",
  "Q3: Liminal Personal close · wire live Apr 14 Granola · target v0.3.4-personal-close-live",
  "Q4: substrate stack · markdown-handoff-then-events vs. events-direct (Apr 24); not blocking prototype",
  "Q5: bidirectional-ethics PPA candidate · file pre-xTech (third PPA) or capture-only · default capture-only",
  "Q6: vault calibration display · inline-after-correction (current) or persistent-banner-on-next-scenario · pick after watching the demo",
];
