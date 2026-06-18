/* versions.js · spec + prototype version pins
 * ────────────────────────────────────────────────────────────────────
 * Extracted from v0_3_config.js 2026-06-18 (Step 8A) per
 * docs/architecture/V0_3_CONFIG_DEPENDENCY_MAP.md — the first, lowest-risk
 * slice of the v0_3_config split (one live consumer: boot.js's ?dev/?v pin).
 *
 * v0_3_config.js re-exports these so frozen archive imports keep working;
 * boot.js imports them directly from here.
 *
 * Bump on every commit. Examples:
 *   SPEC_VERSION      — the design/behavior spec version
 *   PROTOTYPE_VERSION — this prototype build's version
 */
export const SPEC_VERSION = "v0.3.11";
export const PROTOTYPE_VERSION = "v0.9.1-cut03-live-data";
