/* sam-seed.js · Agency-surface scenario data (IC pen-test lead · system-optimization proof)
 * ────────────────────────────────────────────────────────────────────
 * Sam-seed situation: an IC operator (Sam) leads a pen-test team triage crisis
 * on a frontier-model pilot security assessment (~1,000 findings) and discovers
 * the bottleneck is not person-skill but system coordination — bounded agents
 * reveal where the classification logic breaks, the reframe shifts from accusation
 * to optimization, and Sam lands a path forward that keeps trust intact.
 *
 * Pure data · no behavior · no imports. The agency surface's operator record,
 * tray tiles (the crisis artifacts), agent reads (what bounded specialists see),
 * contradictions (where logic breaks), and the reframe + resolution. Logic that
 * reads this (state.js accessors, boot render, slate render) stays in consumers.
 * Extracted from validated customer interview (2026-06-11, canon-safe pseudonym).
 */

// ─── Agency surface · IC pen-test lead (v0.6) ───────────────────────────────
export const AGENCY_OPERATOR = {
  id: "sam_pentest_ic",
  label: "Sam",
  role: "Security IC · Pen-test Lead",
  tier: "IC",
  org: "Assessment team",
  context: "frontier-model security pilot assessment",
};

// ─── Tray tiles · the crisis artifacts (Sam-seed scenario) ──────────────────
// What's available to drop onto a slate when diagnosing the triage bottleneck.
// These tiles represent the mess: ~1,000 findings, conflicting classifications,
// process observability gaps, and the audit trail that reveals it's a system problem.
export const AGENCY_TILES_SAM_SEED = [
  {
    id: "findings_raw_1000",
    label: "Raw findings · ~1,000 entries",
    source: "fuzz-scan",
    icon: "▣",
    kind: "incident",
    description: "frontier-model fuzzing output · unclassified, unsorted",
  },
  {
    id: "findings_classified_v1",
    label: "Findings · v1 triage (7d ago)",
    source: "team-work",
    icon: "▣",
    kind: "incident",
    description: "first-pass P1/P2/P3 classification · high error rate visible in audit",
  },
  {
    id: "findings_classified_v2",
    label: "Findings · v2 triage (3d ago)",
    source: "team-work",
    icon: "▣",
    kind: "incident",
    description: "re-triage after second-team review · contradictions on ~200 items",
  },
  {
    id: "process_observability_gap",
    label: "Process visibility · ZERO",
    source: "meta",
    icon: "◇",
    kind: "meta",
    description: "no tracking of *why* a finding was classified a certain way · no decision log",
  },
  {
    id: "tariq_team_pressure",
    label: "Tariq · team-lead audit notes",
    source: "internal-note",
    icon: "◇",
    kind: "meta",
    description: "second-team lead assigned to audit · notes frustration but no systemic frame",
  },
  {
    id: "misclass_p1_false_positive",
    label: "Misclassification · P1 false-positive cluster",
    source: "contradiction-surface",
    icon: "◈",
    kind: "contradiction",
    description: "~80 findings marked P1 (critical) on first pass, downgraded to P3 on second · all vendor-config non-issues",
  },
  {
    id: "misclass_p2_boundary",
    label: "Misclassification · P2 boundary breakdown",
    source: "contradiction-surface",
    icon: "◈",
    kind: "contradiction",
    description: "P2 definition drifted between passes · no shared lexicon for 'moderate impact'",
  },
  {
    id: "team_process_log",
    label: "Team standup log · 7d window",
    source: "async-log",
    icon: "▣",
    kind: "process",
    description: "no mention of classification uncertainty · team reports 'finished' but audit finds rework",
  },
  {
    id: "sam_vault_note",
    label: "Sam's private note · day 1",
    source: "vault",
    icon: "◈",
    kind: "vault",
    description: "instinct: 'this is coordination breaking, not skill breaking' · flagged before using Liminal",
  },
];

// ─── Agent reads on the triage crisis ────────────────────────────────────────
// What each bounded specialist surfaces when reading the tiles.
// The agents disagree on the root cause · that disagreement is the insight.
export const AGENCY_AGENT_READS = [
  {
    agent: "diligence",
    register: "diligence",
    read_text: "Found: 240 items with conflicting P-tier assignments between v1 and v2. The error is concentrated in vendor-supplied findings (non-custom code). Classification logic broke when the team saw unfamiliar patterns.",
    confidence: "high",
    note: "diligence surfaces the error signature",
  },
  {
    agent: "judgment",
    register: "judgment",
    read_text: "No shared definition of 'moderate' (P2) in process. Team v1 used 'could affect auth flow' as P2 threshold; v2 switched to 'requires active exploitation.' That drift alone explains the rework.",
    confidence: "high",
    note: "judgment identifies the logic-design break",
  },
  {
    agent: "outreach",
    register: "outreach",
    read_text: "Team marked 'finished' to Tariq on day 5; no signal that they were uncertain. Tariq escalated to audit without asking for re-calibration. The second team couldn't see *why* v1 was structured that way — no handoff artifact.",
    confidence: "medium-high",
    note: "outreach surfaces the visibility and handoff gap",
  },
  {
    agent: "synthesis",
    register: "synthesis",
    read_text: "The pattern: rapid context-switch (frontier-model findings are novel), no canonical frame for judgment, async team (no live debate on boundary cases), and zero observability. This is a coordination debt problem, not a competence problem.",
    confidence: "high",
    note: "synthesis reframes: system, not person",
  },
];

// ─── Contradictions · where agents disagree ──────────────────────────────────
// The disagreements are productive: they reveal where the logic actually broke.
export const AGENCY_CONTRADICTIONS = [
  {
    a: "diligence",
    b: "outreach",
    on: "Is this rework avoidable? Diligence says the v1 team saw genuinely novel patterns and made a first-pass error. Outreach says Tariq should have asked if they were confident before escalating to audit.",
    productive: "The truth is both: the team made first-pass errors *and* signaled false confidence. The gap is observability.",
  },
  {
    a: "judgment",
    b: "synthesis",
    on: "Should we retrain the team on P-tier definitions? Judgment flags the lexicon drift as fixable. Synthesis questions whether the team ever had a shared definition to drift *from*.",
    productive: "The break is upstream: no canonical definition existed before the work started. Adding one for next time is necessary but insufficient — process change (live calibration, observability gates) is required.",
  },
];

// ─── The reframe · from accusation to optimization ────────────────────────────
// G2: the emotional turn. "It's not a person problem, it's a system-optimization problem."
export const AGENCY_REFRAME = {
  from: "person problem framing",
  from_copy: "The team misclassified ~240 findings. This is either gross incompetence (bad hire, bad training) or negligence (they didn't care, rushed it). Tariq escalated the audit because the work was wrong.",
  to: "system-optimization framing",
  to_copy: "The team faced novel findings (frontier-model output), no shared classification lexicon, no way to surface uncertainty, and no observability into their own decision-making. Rework is predictable under those conditions — and fixable by designing the system differently.",
  emotional_center: "Sam catches that Tariq isn't a bad manager; he's caught in a bad system. The audit was right (the work had errors), but the accusation framing ('you guys messed up') is replaced by optimization framing ('we need to tune how we work together'). That shift keeps trust intact.",
};

// ─── Resolution · the path forward ──────────────────────────────────────────
// G3: the payoff. How Sam uses this frame to move without burning bridges.
export const AGENCY_RESOLUTION = {
  copy: "Sam installs the Liminal plugin, drops the findings mess into a bounded-agent read, the contradictions surface where the classification logic breaks, he corrects the frame with Tariq from 'your team failed' to 'we need observability + shared definitions + calibration gates', and gets buy-in on a process patch: live classification agreement phase before async work, decision-log tile in the tray, re-run on the corrected system. The team doesn't feel accused. Tariq doesn't feel defensive. The second audit becomes a co-design session instead of a trial.",
  feeling: "scoping therapy session, not a sales pitch",
  movement: "Trust preserved, system improved, path to next assessment is clear.",
};

// ─── Freeze the scenario ─────────────────────────────────────────────────────
export const SAM_SEED = Object.freeze({
  id: "sam-seed",
  operator: AGENCY_OPERATOR,
  situation: {
    title: "Frontier-model security assessment triage crisis",
    crisis_summary: "Pen-test team triage on ~1,000 frontier-model findings produced contradictory classifications, triggered audit, revealed system-coordination debt instead of person-skill failure",
    stakes: "Path to next assessment depends on distinguishing rework-due-to-process from rework-due-to-incompetence · accusation-framing burns the team and Tariq; optimization-framing preserves trust and fixes the system",
  },
  tray_tiles: AGENCY_TILES_SAM_SEED,
  agent_reads: AGENCY_AGENT_READS,
  contradictions: AGENCY_CONTRADICTIONS,
  reframe: AGENCY_REFRAME,
  resolution: AGENCY_RESOLUTION,
});

Object.freeze(AGENCY_OPERATOR);
Object.freeze(AGENCY_TILES_SAM_SEED);
Object.freeze(AGENCY_AGENT_READS);
Object.freeze(AGENCY_CONTRADICTIONS);
Object.freeze(AGENCY_REFRAME);
Object.freeze(AGENCY_RESOLUTION);
