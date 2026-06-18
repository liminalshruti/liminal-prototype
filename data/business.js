/* business.js · Business-surface scenario data (CI analyst · high-stakes proof)
 * ────────────────────────────────────────────────────────────────────
 * Extracted from v0_3_config.js 2026-06-18 (scenario split, business group —
 * the last and highest-consumer scenario group, isolated to its own branch)
 * per docs/architecture/V0_3_CONFIG_SCENARIO_SPLIT_MAP.md.
 *
 * Pure data · no behavior · no imports. The business surface's operator
 * record, per-case tile catalog, and the scenario list. Logic that reads
 * this (state.js accessors, boot render incl. the §552a notice copy, slate
 * render, keyboard sibling lookup) stays in the consumers. v0_3_config.js
 * re-exports these so frozen archive imports keep working; live consumers
 * import directly from data/business.js.
 *
 * NOTE: the generic "Scenarios per product" shape doc-comment intentionally
 * stays in v0_3_config.js — it documents TEAM_SCENARIOS / PERSONAL_SCENARIOS
 * (still inline there) as well as the business scenarios moved here.
 */

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

// ─── Business scenarios (shape documented in v0_3_config.js) ──────────────
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
