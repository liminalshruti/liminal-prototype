/* consent.js · consent / clearance classes (lookup table)
 * ────────────────────────────────────────────────────────────────────
 * Extracted from v0_3_config.js 2026-06-18 (first scenario/config split)
 * per docs/architecture/V0_3_CONFIG_SCENARIO_SPLIT_MAP.md.
 *
 * Behavior-free: a pure keyed lookup table. The gating logic lives in the
 * consumers (state.js getOperatorClearanceLevel, boot/slate render). Chosen
 * as the first split because it is cohesive and cross-cutting (all surfaces
 * read it) without being tangled into any one surface's scenario data.
 *
 * v0_3_config.js re-exports this so frozen archive imports keep working;
 * live consumers (state.js, boot.js, slate.js) import it directly from here.
 *
 * Team: interpersonal consent classes (per-subject, set at onboarding).
 * Business: institutional clearance ladder (per-role + per-classification).
 * Personal: not applicable · operator = subject = same person.
 */
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
