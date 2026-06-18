/* correction-tags.js · the correction taxonomy · carved out of vault-store.js
 * ────────────────────────────────────────────────────────────────────
 * Extracted 2026-06-18 (Stage 2, candidate #1) per
 * docs/architecture/EXTRACTION_PLAN_correction-tags.md.
 *
 * AUTHORITY (Decision #1, 2026-06-18):
 *   · `liminal-agents/lib/correction-tags.js` is the SCHEMA AUTHORITY for
 *     correction-tags. This repo is NOT the permanent authority.
 *   · CORRECTION_TAGS + CORRECTION_TAG_DESCRIPTIONS match that liminal-agents
 *     canon as of this extraction plan · keep in sync if the agents repo
 *     changes the list.
 *   · CORRECTION_TAG_LABELS is prototype-ahead: liminal-agents has no labels
 *     export. It is treated as canon-candidate presentation metadata, NOT
 *     disposable local UI copy.
 *
 * TODO (cross-repo · tracked in the extraction plan + portability backlog):
 *   upstream CORRECTION_TAG_LABELS to liminal-agents, OR define a shared
 *   correction-taxonomy package both repos consume. Until then LABELS stays
 *   here as canon-candidate / pending upstream reconciliation.
 *
 * Pure data + one validator · no DOM · no IndexedDB · no imports.
 * vault-store.js re-exports these to preserve its public API.
 */

/* tags + descriptions · match liminal-agents canon as of this extraction
   plan · this is a mirror · MUST stay in sync if the agents repo changes
   the list */
export const CORRECTION_TAGS = Object.freeze([
  "wrong_frame",
  "wrong_intensity",
  "wrong_theory",
  "right_but_useless",
  "right_but_already_known",
  "too_generic",
  "missed_compensation",
  "assumes_facts_not_in_evidence",
  "off_by_layer",
]);

export const CORRECTION_TAG_DESCRIPTIONS = Object.freeze({
  wrong_frame: "The agent used the wrong lens entirely.",
  wrong_intensity: "The reading was too strong or too weak.",
  wrong_theory: "The causal story behind the read is incorrect.",
  right_but_useless: "Accurate but does nothing for the user.",
  right_but_already_known: "Surfaces nothing the user did not already see.",
  too_generic: "Could apply to anyone; not about this state.",
  missed_compensation: "Missed that the user is already balancing for this.",
  assumes_facts_not_in_evidence: "Projected context that isn't there.",
  off_by_layer: "Correct direction but wrong layer of the stack.",
});

/* LABELS · prototype-ahead canon-candidate presentation metadata · pending
   upstream reconciliation to liminal-agents (which has no labels export).
   Preserved here so UI copy does not regress. NOT authoritative canon yet. */
export const CORRECTION_TAG_LABELS = Object.freeze({
  wrong_frame: "Wrong frame",
  wrong_intensity: "Wrong intensity",
  wrong_theory: "Wrong theory",
  right_but_useless: "Right but useless",
  right_but_already_known: "Right but already known",
  too_generic: "Too generic",
  missed_compensation: "Missed compensation",
  assumes_facts_not_in_evidence: "Assumes facts not in evidence",
  off_by_layer: "Off by layer",
});

export function isValidTag(t) {
  return t == null || CORRECTION_TAGS.includes(t);
}
