/* loop.js · consolidated beat state machine
 *
 * Orchestrates the canonical loop sequence: IDLE → CAPTURING → READING → DECIDING → SEALING → ENTERING → IDLE
 *
 * Exported API:
 *   initLoopEngine(spec) — initialize the engine with subject, persona, tier, and choreography parameters
 *   applyBeat(beatName) — fire a single beat, dispatches to BEAT_HANDLERS[beatName]
 *
 * Parameter surface (all optional, per-surface defaults applied by caller):
 *   subject ('spend'|'custody'|'osint'|'notice'|'pattern')
 *   persona (Maia|Sam|Rhea|Hollis|analyst)
 *   tier (founder|IC|manager|exec|L3)
 *
 * Choreography parameters (from RUN_B_COHERENCE_FINDINGS, not yet resolved):
 *   sealChoreography ('instant'|'rise'|'bifurcated') — C1 seal timing
 *   sealRiseMs (number) — 360|500|520 — per-cut timing defaults
 *   correctionModel ('gloss-layer'|'rule-gate'|'visible-clause') — C4 correction UX
 *   refusalFlavor ('system'|'agent'|'routing') — C5 refusal social semantics
 *   refusalTimingMs (200|320) — C5 refusal reveal timing
 *   motionTier ('ambient'|'refined'|'both') — C9 ambient vs gesture motion policy
 *
 * Hooks (optional):
 *   onBeatChange(beatName, prevBeatName) — fires when beat state changes
 *   onSealed(artifact) — fires when seal completes, passes the vault entry
 *   onSealGlow() — fires during bifurcated seal for cut-provided orbital glow animation
 */

import {
  setActiveProductId, setActiveContextId,
  activeProductId, activeContextId,
  slated, vaultCount, auditRows,
  getActiveSubject, getActiveCase, getActiveThread,
  getTilesForActive, tileIsRefused, getSlatedSet,
  setLastLandedId, resetAgencyState, bumpVault,
} from "./state.js";

import {
  AGENT_FLAT, REGISTERS, REGISTER_AGENTS,
  tickAgencyRail, refreshSlateReaderChips,
  startAgencyTicker, stopAgencyTicker,
} from "./agency.js";

import { renderTray, tilePreviewHTML, toggleTray } from "./tray.js";

import {
  renderSlate, renderSlateHeader, renderBrief,
  setDispositionLabels, materializeDisposition, wireDisposition,
  appendAudit, renderAuditRibbon,
  onTileClick, onTileRemove,
} from "./slate.js";

import { renderClassificationBanner, clearClassificationBanner } from "./classification.js";
import { renderAnnotations, clearAnnotations } from "./marginalia.js";
import { EVIDENCE_PANES } from "./evidence-panes.js";

/* ─── Engine state ─────────────────────────────────────────────────── */

let engineState = {
  currentBeat: "IDLE",
  prevBeat: null,
  subject: "pattern",
  persona: "Maia",
  tier: "founder",

  /* choreography parameters — applied per-cut, Run-B will adjudicate */
  sealChoreography: "rise",  // instant | rise | bifurcated
  sealRiseMs: 520,           // 360 | 500 | 520
  correctionModel: "rule-gate", // gloss-layer | rule-gate | visible-clause
  refusalFlavor: "routing",  // system | agent | routing
  refusalTimingMs: 320,      // 200 | 320
  motionTier: "both",        // ambient | refined | both

  /* hooks */
  onBeatChange: null,
  onSealed: null,
  onSealGlow: null,
};

/* ─── Public API ─────────────────────────────────────────────────── */

export function initLoopEngine(opts = {}) {
  engineState = {
    ...engineState,
    ...opts,
  };

  /* apply defaults for unspecified parameters */
  if (!opts.subject) engineState.subject = "pattern";
  if (!opts.persona) engineState.persona = "Maia";
  if (!opts.tier) engineState.tier = "founder";
  if (opts.sealChoreography === undefined) engineState.sealChoreography = "rise";
  if (opts.sealRiseMs === undefined) engineState.sealRiseMs = 520;
  if (opts.correctionModel === undefined) engineState.correctionModel = "rule-gate";
  if (opts.refusalFlavor === undefined) engineState.refusalFlavor = "routing";
  if (opts.refusalTimingMs === undefined) engineState.refusalTimingMs = 320;
  if (opts.motionTier === undefined) engineState.motionTier = "both";

  return engineState;
}

export function applyBeat(beatName) {
  const prevBeat = engineState.currentBeat;
  engineState.currentBeat = beatName;

  const handler = BEAT_HANDLERS[beatName];
  if (!handler) {
    console.warn(`unknown beat: ${beatName}`);
    return;
  }

  handler(engineState);

  if (engineState.onBeatChange) {
    engineState.onBeatChange(beatName, prevBeat);
  }
}

export function getBeatState() {
  return { ...engineState };
}

/* ─── Beat handlers ─────────────────────────────────────────────────── */

const BEAT_HANDLERS = {
  IDLE: (engine) => {
    /* reset state, close panels, hide active renders */
    stopAgencyTicker();
    clearAnnotations();
  },

  CAPTURING: (engine) => {
    /* user has opened the tray, ready to drag tiles
       render tray + slate stub, show agent rail */
    startAgencyTicker();
    /* null-guard: modular renderers assume their hosts exist; monolithic cuts may not have them */
    const trayHost = document.getElementById("tray");
    if (trayHost) renderTray(makeCTX(engine));
    const slateHost = document.querySelector(".slate") || document.getElementById("slate");
    if (slateHost) renderSlate(makeCTX(engine));
  },

  READING: (engine) => {
    /* agents are reading the slate
       tick the agency rail, refresh reader chips, render brief
       · modular renders only when the modular-app hosts exist (same guard
         idiom as CAPTURING/ENTERING) — monolithic cuts drive READING via
         their own render paths + the evidence pane below */
    if (document.getElementById("register-blocks")) {
      tickAgencyRail();
      refreshSlateReaderChips();
    }
    if (document.getElementById("brief-body")) {
      renderBrief(engine.subject);
    }

    /* render evidence pane if it has a renderer for this subject */
    const pane = EVIDENCE_PANES[engine.subject];
    if (pane && pane.render) {
      const host = document.querySelector(".evidence-pane");
      if (host) {
        pane.render(host, makeCTX(engine));
      }
    }
  },

  DECIDING: (engine) => {
    /* user is making a disposition choice
       show correction annotations, disposition buttons */
    renderAnnotations();
    setDispositionLabels(engine.subject);
  },

  SEALING: (engine) => {
    /* user has confirmed, artifact sealing
       materialize disposition, append audit, vault write

       Choreography application (per RUN_B_COHERENCE_FINDINGS C1):
       - instant: no animation, append to DOM synchronously
       - rise: append with rise animation (duration from sealRiseMs)
       - bifurcated: instant artifact + separate orbital glow animation */

    appendAudit(`disposition · subject=${engine.subject} · seal=${engine.sealChoreography}`);
    const artifact = materializeDisposition("primary");
    bumpVault(activeProductId);

    /* apply choreography to artifact if it exists */
    if (artifact) {
      applySealChoreography(artifact, engine.sealChoreography, engine.sealRiseMs, engine);
    }

    /* vault persistence (async, doesn't block the UI) */
    (async () => {
      try {
        const vs = await import("./vault-store.js");
        await vs.appendDecision({
          surface: activeProductId,
          kind: "primary",
          hash: null,
          payload: { subject: engine.subject, context: activeContextId },
        });
        const realCount = (await vs.count(activeProductId)) + (await vs.countDecisions(activeProductId));
        const vaultCountEl = document.getElementById("vault-count");
        if (vaultCountEl) {
          vaultCountEl.textContent = realCount > 0 ? realCount : vaultCount[activeProductId];
        }
      } catch (err) {
        /* fallback to in-memory count */
        const vaultCountEl = document.getElementById("vault-count");
        if (vaultCountEl) {
          vaultCountEl.textContent = vaultCount[activeProductId];
        }
      }
    })();

    /* visual pulse on vault pill */
    const vp = document.getElementById("vault-pill");
    if (vp) {
      vp.classList.add("is-pulse");
      setTimeout(() => vp.classList.remove("is-pulse"), 1400);
    }

    if (engine.onSealed) {
      engine.onSealed({ subject: engine.subject });
    }
  },

  ENTERING: (engine) => {
    /* loop closes, user returns to the palette
       reset for next beat, show tray again */
    resetAgencyState(AGENT_FLAT);
    const trayHost = document.getElementById("tray");
    if (trayHost) renderTray(makeCTX(engine));
    const ribbonHost = document.querySelector(".rb-bot");
    if (ribbonHost) renderAuditRibbon();
  },
};

/* ─── Choreography application ─────────────────────────────────────── */

function applySealChoreography(artifactEl, choreography, durationMs = 520, engine = engineState) {
  if (!artifactEl) return;

  switch (choreography) {
    case "instant":
      /* no animation, artifact appears immediately */
      artifactEl.classList.remove("seal-rise", "seal-glow");
      artifactEl.style.setProperty("--seal-rise-ms", "0ms");
      break;

    case "rise":
      /* artifact rises in with animation, duration per parameter */
      artifactEl.classList.add("seal-rise");
      artifactEl.classList.remove("seal-glow");
      artifactEl.style.setProperty("--seal-rise-ms", `${durationMs}ms`);
      break;

    case "bifurcated":
      /* instant artifact + separate orbital glow animation (600ms by convention) */
      artifactEl.classList.add("seal-glow");
      artifactEl.classList.remove("seal-rise");
      artifactEl.style.setProperty("--seal-rise-ms", "0ms");
      /* fire orbital glow hook if cut provides it */
      if (engine.onSealGlow && typeof engine.onSealGlow === "function") {
        engine.onSealGlow();
      }
      break;
  }
}

/* ─── Helper: build ctx object for reusable modules ─────────────────── */

function makeCTX(engine) {
  return {
    showToast: (msg) => {
      const t = document.getElementById("toast");
      if (t) {
        const msgEl = document.getElementById("toast-msg");
        if (msgEl) {
          msgEl.textContent = msg;
        }
        t.classList.add("is-shown");
        setTimeout(() => t.classList.remove("is-shown"), 2400);
      }
    },
    toggleTray: () => {
      const stage = document.querySelector(".stage");
      if (stage) stage.classList.toggle("tray-open");
      const trayPanel = document.getElementById("tray-panel");
      if (trayPanel) {
        trayPanel.setAttribute("aria-hidden", String(stage?.classList.contains("tray-open") ? "false" : "true"));
      }
    },
    renderTray: () => renderTray(makeCTX(engine)),
    renderSlate: () => renderSlate(makeCTX(engine)),
    tickAgencyRail,
    setProduct: (id) => {
      setActiveProductId(id);
      applyBeat("IDLE");
      applyBeat("CAPTURING");
    },
    setContext: (id) => {
      setActiveContextId(id);
      applyBeat("IDLE");
      applyBeat("CAPTURING");
    },
    onTileClick: (tile, isRefused) => onTileClick(tile, isRefused, makeCTX(engine)),
    onTileRemove: (tile) => onTileRemove(tile, makeCTX(engine)),
    appendAudit,
    undo: () => {
      /* undo handler would go here, delegating to undo.js */
    },
    refreshVaultCount: () => {
      /* refresh pill with vault count */
    },
  };
}
