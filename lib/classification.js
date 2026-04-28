/* classification.js · Business surface classification banner
 *
 * Renders the dense one-liner of acronym tokens with hover-tooltips,
 * plus an expandable glossary that translates each acronym to plain
 * language. Trades cosplay for credibility.
 */

export const CLASSIFICATION_TOKENS = [
  {
    key: "IL-5",
    acronym: "IL-5 PERIMETER",
    tip: "DoD Impact Level 5 · controlled unclassified, mission-critical",
    gloss: "DoD Impact Level 5 enclave · cleared for controlled unclassified national-security data",
  },
  {
    key: "AIR-GAP",
    acronym: "AIR-GAPPED",
    tip: "Network-isolated · no internet, no public cloud egress",
    gloss: "No network egress · the slate composes on a host that cannot reach the public internet",
  },
  {
    key: "FIPS",
    acronym: "FIPS 140-2",
    tip: "NIST validated cryptography · vault encryption meets federal standard",
    gloss: "Federal cryptographic standard · vault-at-rest encryption is NIST-validated",
  },
  {
    key: "552a",
    acronym: "§552a(d)",
    tip: "Privacy Act · subject's right to access records about them",
    gloss: "Privacy Act subject-access right · the audit chain is releasable to the subject of the case",
  },
  {
    key: "WPA",
    acronym: "WPA/PPD-19",
    tip: "Whistleblower protection · PPD-19 governs IC retaliation",
    gloss: "Whistleblower Protection · PPD-19 governs intelligence-community retaliation; informs disposition",
  },
];

export function renderClassificationBanner() {
  const host = document.getElementById("classification");
  if (!host) return;
  host.innerHTML = `
    <div class="cls-row">
      <div class="cls-tokens">
        ${CLASSIFICATION_TOKENS.map(t => `
          <span class="cls-token" data-key="${t.key}">
            ${t.acronym}
            <span class="cls-tip">${t.tip}</span>
          </span>
        `).join("")}
      </div>
      <button class="cls-toggle" id="cls-toggle" type="button">
        <span class="cls-tog-label">decode</span>
        <span class="cls-tog-glyph">⌄</span>
      </button>
    </div>
    <div class="cls-gloss">
      ${CLASSIFICATION_TOKENS.map(t => `
        <div class="cls-gloss-row">
          <span class="cls-gloss-key">${t.key}</span>
          <span class="cls-gloss-val">${t.gloss}</span>
        </div>
      `).join("")}
    </div>
  `;
  document.getElementById("cls-toggle").addEventListener("click", () => {
    const banner = document.getElementById("classification");
    const isExpanded = banner.classList.toggle("is-expanded");
    banner.querySelector(".cls-tog-label").textContent = isExpanded ? "collapse" : "decode";
  });
}

export function clearClassificationBanner() {
  const host = document.getElementById("classification");
  if (!host) return;
  host.innerHTML = "";
  host.classList.remove("is-expanded");
}
