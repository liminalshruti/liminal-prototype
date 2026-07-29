/* divergence.js · the DECIDING beat's content · where the reads split
 *
 * Fills the beat that lib/loop.js has always declared and nothing has ever
 * rendered: DECIDING, between READING and SEALING. Cut 01's Decide stage
 * previously presented ONE synthesized brief (#brief-body) plus a single margin
 * voice — which under-represents the product's core claim that three reads never
 * merge. This pane shows the split before the founder signs.
 *
 * Exported API:
 *   renderDivergence(host, ctx) — render the pane into host
 *   isDivergenceSeen()          — has the founder viewed the split this cycle?
 *   resetDivergence()           — clear seen-state (called on IDLE)
 *
 * SHAPE FIDELITY · every field here exists in liminal-desktop's shipped schema,
 * so this ports without a rewrite:
 *   claim · evidence_ref · confidence [0.0–1.0]   (migration 029)
 *   refusal_kind: values | scope | substrate | lane (migration 004)
 *   correction_kind: inner | outer | cross | emergence (migration 001/002)
 *
 * The payoff beyond legibility: correction_kind gets a GEOMETRIC definition.
 *   inner     · correcting within one agent's column
 *   cross     · correcting an edge spanning two columns
 *   emergence · annotating ground no agent produced  ← the moat metric,
 *               today a radio button the founder self-reports
 *
 * Agent roster note · agency.js's docblock mentions AGENCY_AGENTS
 * (Analyst/SDR/Auditor/Forensic) as the "production-real" names, but that export
 * does not exist in code. This pane therefore uses cut 01's LIVE roster —
 * getDisagreementPair() plus agentState — so it stays consistent with the agency
 * rail the same cut already renders. Reconciling prototype register names against
 * the desktop tray roster is a separate, cross-cut job.
 *
 * Tokens · consumes canon only (rule 1, cuts/CONTRIBUTING.md). Polarity maps to
 * --alarm (contradicts) / --watch (weakens) / --signal (supports), verdict chrome
 * to --judgment. Zero hardcoded hex; see lib/divergence.css.
 */

/* Imports state + roster only. Audit and toast arrive via ctx (makeCTX already
   exposes appendAudit) — deliberately NOT a static import of slate.js, which
   would make slate.js ↔ divergence.js circular once slate.js consults the gate. */
import { activeProductId, slated, getDisagreementPair } from "./state.js";
import { REGISTER_AGENTS } from "./agency.js";

/* ─── seen-state · the gate slate.js consults ───────────────────────── */

let divergenceSeen = false;

export function isDivergenceSeen() { return divergenceSeen; }
export function resetDivergence() { divergenceSeen = false; }

/* ─── scenario copy ─────────────────────────────────────────────────────
   Keyed by activeProductId, following cut 01's own SCENARIOS idiom. The
   STRUCTURE (which agents, how many columns, who refused) derives from live
   state below; only the claim prose is scenario-keyed. */

const SCENARIOS = {
  personal: {
    ground: "2 slated · comp memo above band · deadline note",
    claims: [
      { claim: "The offer clears the band only if the deadline is real.", confidence: 0.88, move: "Ask what changes if budget is fixed" },
      { claim: "Scarcity pressure is inflating the work-style concern.", confidence: 0.71, move: "Separate fit from timing" },
      { refusal_kind: "substrate", claim: "Deadline provenance is unverifiable from what was slated.", confidence: 0.42 },
    ],
    edge: { polarity: "weakens", note: "{b} weakens {a}'s premise · the deadline is doing the work" },
  },
  team: {
    ground: "3 slated · Devon thread · fundraise narrative · peer-read history",
    claims: [
      { claim: "The narrative gap is a sequencing problem, not a disagreement.", confidence: 0.84, move: "Surface at 1:1, not in writing" },
      { claim: "Devon has accepted 6 of 8 prior corrections — deference is drifting.", confidence: 0.69, move: "Ask for the objection first" },
      { refusal_kind: "scope", claim: "Reading Devon's intent is outside this agent's ground.", confidence: 0.38 },
    ],
    edge: { polarity: "contradicts", note: "{b} contradicts {a}'s sequencing read" },
  },
  business: {
    ground: "4 slated · CI-cleared analyst · insider-threat lane · 7 queued",
    claims: [
      { claim: "The pattern clears benign under the 30-day intake rule.", confidence: 0.79, move: "Close benign, log precedent" },
      { claim: "Two prior packets closed benign on thinner ground.", confidence: 0.73, move: "Re-read the precedent set" },
      { refusal_kind: "values", claim: "Will not infer intent from access pattern alone.", confidence: 0.31 },
    ],
    edge: { polarity: "weakens", note: "{b}'s precedent read weakens {a}'s benign close" },
  },
  "sam-seed": {
    ground: "1 slated · terminal seed · no prior corrections",
    claims: [
      { claim: "Insufficient prior ground to form a second read.", confidence: 0.55, move: "Slate one more artifact" },
      { refusal_kind: "substrate", claim: "One tile cannot produce divergence.", confidence: 0.28 },
    ],
    edge: null,
  },
};

/* ─── derive structure from live state ──────────────────────────────── */

/* Pair the scenario's claims with agents actually present in cut 01's rail.
   The canonical disagreement pair (Strategist/Contrarian, set by agency.js at
   2+ non-refused tiles) leads when it exists, so the pane agrees with the rail. */
function deriveAgents(count) {
  const pair = getDisagreementPair() || [];
  const flat = Object.entries(REGISTER_AGENTS).flatMap(
    ([reg, names]) => names.map((name) => ({ name, reg }))
  );
  const lead = pair
    .map((n) => flat.find((a) => a.name === n))
    .filter(Boolean);
  const rest = flat.filter((a) => !lead.some((l) => l.name === a.name));
  return [...lead, ...rest].slice(0, count);
}

export function deriveDivergence() {
  const scenario = SCENARIOS[activeProductId] || SCENARIOS.team;
  const slatedCount = Object.keys(slated[activeProductId] || {}).length;
  const agents = deriveAgents(scenario.claims.length);

  /* The edge runs between the first two reads — which deriveAgents() has already
     ordered as the canonical disagreement pair. Resolving {a}/{b} to agent names
     rather than "column 1/2" keeps the note true when the container is narrow
     enough that the columns stack into rows. */
  const edge = scenario.claims.length >= 2 && scenario.edge
    ? {
        ...scenario.edge,
        note: scenario.edge.note
          .replace(/\{a\}/g, agents[0]?.name || "read 1")
          .replace(/\{b\}/g, agents[1]?.name || "read 2"),
      }
    : null;

  return {
    ground: scenario.ground,
    slatedCount,
    edge,
    columns: scenario.claims.map((c, i) => ({
      ...c,
      agent: agents[i]?.name || `Agent ${i + 1}`,
      reg: agents[i]?.reg || "diligence",
      refused: Boolean(c.refusal_kind),
    })),
  };
}

/* ─── render ────────────────────────────────────────────────────────── */

const POLARITY_LABEL = {
  supports: "SUPPORTS",
  weakens: "WEAKENS",
  contradicts: "CONTRADICTS",
};

function confidenceBand(c) {
  if (c >= 0.75) return "high";
  if (c >= 0.5) return "mid";
  return "low";
}

/* Cross-edge is drawn in a percentage-coordinate SVG overlay rather than by
   measuring elements. Column centres for an n-column equal grid are at
   (i + 0.5)/n — so the edge survives resize, iframe embedding, and a flat
   screenshot with no layout measurement and no ResizeObserver. */
function edgeSVG(model) {
  if (!model.edge) return "";
  const n = model.columns.length;
  const x1 = ((0 + 0.5) / n) * 100;
  const x2 = ((1 + 0.5) / n) * 100;
  const mid = (x1 + x2) / 2;
  return `
    <svg class="dvg-edge-layer" viewBox="0 0 100 100" preserveAspectRatio="none"
         aria-hidden="true" focusable="false">
      <path class="dvg-edge dvg-edge--${model.edge.polarity}"
            d="M ${x1} 4 C ${x1} 70, ${x2} 70, ${x2} 4" />
      <circle class="dvg-edge-node dvg-edge-node--${model.edge.polarity}"
              cx="${mid}" cy="52" r="2.2" />
    </svg>`;
}

function columnHTML(col, i) {
  const conf = Math.round(col.confidence * 100);
  const band = confidenceBand(col.confidence);

  const head = `
    <div class="dvg-agent">
      <span class="dvg-agent-name">${col.agent}</span>
      <span class="dvg-reg" data-reg="${col.reg}">${col.reg}</span>
    </div>`;

  /* A refusal is not a failed read — it is the read. Rendered as typed chrome,
     never as an empty state. */
  const body = col.refused
    ? `<div class="dvg-refusal" data-refusal-kind="${col.refusal_kind}">
         <span class="dvg-refusal-kind">refused · ${col.refusal_kind}</span>
         <p class="dvg-claim-text">${col.claim}</p>
       </div>`
    : `<div class="dvg-claim" data-node="claim" data-col="${i}"
            role="button" tabindex="0"
            aria-label="Correct this claim by ${col.agent} (inner correction)">
         <p class="dvg-claim-text">${col.claim}</p>
       </div>`;

  const conf_ = `
    <div class="dvg-conf" data-band="${band}">
      <span class="dvg-conf-track"><span class="dvg-conf-fill" style="width:${conf}%"></span></span>
      <span class="dvg-conf-num">${col.confidence.toFixed(2)}</span>
    </div>`;

  const move = col.refused
    ? `<div class="dvg-move is-null" aria-label="no next move · read refused">∅</div>`
    : `<div class="dvg-move" data-node="move" data-col="${i}"
            role="button" tabindex="0"
            aria-label="Correct this next move by ${col.agent} (inner correction)">
         <span class="dvg-move-bullet">→</span>${col.move}
       </div>`;

  return `<div class="dvg-col${col.refused ? " is-refused" : ""}" data-agent="${col.agent}">
    ${head}${body}${conf_}${move}
  </div>`;
}

export function renderDivergence(host, ctx) {
  const model = deriveDivergence();
  const n = model.columns.length;

  host.innerHTML = `
    <div class="dvg" style="--dvg-cols:${n}">
      <div class="dvg-h">
        <span class="dvg-h-glyph">⑂</span>
        <span>Divergence · where the reads split</span>
        <span class="dvg-tag">${n} reads · never merged</span>
      </div>

      <div class="dvg-ground" data-node="ground"
           role="button" tabindex="0"
           aria-label="Annotate ground no agent produced (emergence correction)">
        <span class="dvg-ground-label">same ground</span>
        <span class="dvg-ground-body">${model.ground}</span>
        <span class="dvg-ground-hint">annotate → emergence</span>
      </div>

      <div class="dvg-body">
        ${edgeSVG(model)}
        <div class="dvg-grid">${model.columns.map(columnHTML).join("")}</div>
      </div>

      ${model.edge ? `
        <div class="dvg-edge-caption" data-node="edge"
             data-polarity="${model.edge.polarity}"
             role="button" tabindex="0"
             aria-label="Correct this ${model.edge.polarity} edge (cross correction)">
          <span class="dvg-edge-label dvg-edge-label--${model.edge.polarity}">${POLARITY_LABEL[model.edge.polarity]}</span>
          <span class="dvg-edge-note">${model.edge.note}</span>
          <span class="dvg-edge-hint">correct → cross</span>
        </div>` : ""}
    </div>`;

  wireCorrections(host, ctx);
  host.hidden = false;
  divergenceSeen = true;
  ctx?.appendAudit?.(`divergence · ${n} reads · split shown`);
}

/* ─── correction geometry ───────────────────────────────────────────────
   The whole point: WHERE you click determines correction_kind. */

function kindFor(node) {
  if (node === "ground") return "emergence";
  if (node === "edge") return "cross";
  return "inner"; /* claim | move — within a single agent's column */
}

function wireCorrections(host, ctx) {
  host.querySelectorAll("[data-node]").forEach((el) => {
    const node = el.dataset.node;
    const kind = kindFor(node);

    const fire = () => {
      const col = el.closest(".dvg-col");
      const agent = col?.dataset.agent;
      el.classList.add("is-corrected");
      ctx?.appendAudit?.(
        `correction · ${kind}${agent ? ` · ${agent}` : ""} · ${node}`
      );
      ctx?.showToast?.(
        kind === "emergence"
          ? "Emergence · ground no agent produced"
          : `Correction · ${kind} · ${node}`
      );
    };

    el.addEventListener("click", fire);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fire(); }
    });
  });
}
