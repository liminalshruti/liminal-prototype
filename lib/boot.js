/* boot.js · entrypoint · wires the modules together
 *
 * imports:
 *   state.js       · pure mutable state + accessors
 *   agency.js      · right-rail liveness + reader chips
 *   tray.js        · the palette · renderTray + tilePreviewHTML + toggleTray
 *   slate.js       · composition surface · renderSlate + brief + disposition
 *                    + audit ribbon · onTileClick + onTileRemove
 *   classification.js · Business banner with decode toggle
 *   marginalia.js  · Caveat editor's notes overlay
 *   undo.js        · ⌘Z handler (popUndo with surface hop)
 *   keyboard.js    · unified shortcut layer + help overlay
 *
 * Everything that wasn't pulled into a module lives here:
 *   · setProduct + setContext + prestage
 *   · the three rail renderers (Personal / Team / Business)
 *   · staged boot moment + canonical-case glow
 *   · slate-canvas drop wiring (HTML5 + OS file/url)
 *   · tray-panel drop wiring (capture-to-vault on OS drop)
 *   · modal preview subject view
 *   · showToast helper
 *   · boot.
 */
import {
  SPEC_VERSION, PROTOTYPE_VERSION,
  PRODUCTS, BUSINESS_OPERATOR,
  TEAM_SUBJECTS, TEAM_TILES_FOR_SUBJECT,
  BUSINESS_SCENARIOS, BUSINESS_TILES_FOR_CASE,
  PERSONAL_OPERATOR, PERSONAL_THREADS, PERSONAL_TILES_FOR_THREAD,
  CONSENT_CLASSES,
} from "../v0_3_config.js";

import {
  setActiveProductId, setActiveContextId,
  activeProductId, activeContextId,
  slated, vaultCount, auditRows,
  getActiveSubject, getActiveCase, getActiveThread,
  getTilesForActive, tileIsRefused, getSlatedSet,
  setLastLandedId, resetAgencyState,
} from "./state.js";

import {
  AGENT_FLAT, REGISTERS, REGISTER_AGENTS,
  tickAgencyRail, renderConsole, refreshSlateReaderChips,
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
import { renderAnnotations, clearAnnotations, wireMarginaliaToggle } from "./marginalia.js";
import { popUndo } from "./undo.js";
import { wireKeyboard } from "./keyboard.js";

/* ─── version pin · dev-only · ?dev or ?v reveals it ─────────────── */

const _devMode = /[?&](dev|v)\b/.test(location.search);
if (_devMode) {
  const _vp = document.getElementById("v-pin");
  if (_vp) _vp.hidden = false;
  document.getElementById("vp-spec").textContent  = SPEC_VERSION;
  document.getElementById("vp-proto").textContent = PROTOTYPE_VERSION;
}

/* ─── shared helpers ─────────────────────────────────────────────── */

function showToast(msg) {
  const t = document.getElementById("toast");
  document.getElementById("toast-msg").textContent = msg;
  t.classList.add("is-shown");
  setTimeout(() => t.classList.remove("is-shown"), 2400);
}
/* slate.js dispatches a custom event when calibration commits · forward it */
window.addEventListener("liminal:toast", (e) => showToast(e.detail));

/* ctx · the lightweight callback object passed into modules that need
   to invoke siblings (so we don't create import cycles between slate
   and tray, etc.) */
const ctx = {
  showToast,
  toggleTray,
  renderTray:    () => renderTray(ctx),
  renderSlate:   () => renderSlate(ctx),
  tickAgencyRail,
  setProduct:    (id) => setProduct(id),
  setContext:    (id) => setContext(id),
  onTileClick:   (tile, isRefused) => onTileClick(tile, isRefused, ctx),
  onTileRemove:  (tile) => onTileRemove(tile, ctx),
  appendAudit,
  undo:          () => popUndo({ ...ctx, renderSlate: () => renderSlate(ctx), renderTray: () => renderTray(ctx) }),
};

/* ─── pre-staged tiles · the killing feature on boot ─────────────── */

const PRESTAGED_TILES = {
  personal: {
    /* canonical thread boots with the term sheet + investor call + values doc */
    founding_close_decision: ["term_sheet_doc", "investor_granola", "values_doc_jan"],
  },
  team: {
    brian_eng: ["brian_commits_21d", "brian_prior_w1"],
  },
  business: {
    ci_analyst_insider_threat: ["case_file_S", "access_log_21d", "peer_baseline"],
  },
};

function prestage(productId, contextId) {
  const ids = PRESTAGED_TILES[productId]?.[contextId];
  if (!ids) return;
  if (!slated[productId][contextId]) slated[productId][contextId] = new Set();
  const set = slated[productId][contextId];
  if (set.size > 0) return;
  ids.forEach(id => set.add(id));
  if (auditRows[productId].length === 0) {
    const t0 = new Date();
    ids.forEach((id, i) => {
      const stamp = `${String(t0.getHours()).padStart(2,"0")}:${String(t0.getMinutes()-i).padStart(2,"0")}:00`;
      auditRows[productId].push({ time: stamp, event: `drop · ${id.replace(/_/g," ")} → slate`, refused: false });
    });
  }
}

/* ─── product/context navigation ─────────────────────────────────── */

function setProduct(productId) {
  setActiveProductId(productId);
  document.body.dataset.product = productId;
  document.querySelectorAll(".product-tab").forEach(el => {
    el.classList.toggle("is-active", el.dataset.product === productId);
  });

  if (productId === "personal") {
    setActiveContextId((PERSONAL_THREADS.find(t => t.canonical) ?? PERSONAL_THREADS[0]).id);
    renderPersonalRail();
    document.getElementById("sm-banner").textContent =
      PERSONAL_OPERATOR.role + " · " + PERSONAL_OPERATOR.unit;
  } else if (productId === "team") {
    setActiveContextId("brian_eng");
    renderTeamRail();
    document.getElementById("sm-banner").textContent =
      "Manager · " + (TEAM_SUBJECTS.find(s => s.id === "brian_eng")?.role ?? "");
  } else {
    setActiveContextId("ci_analyst_insider_threat");
    renderBusinessRail();
    document.getElementById("sm-banner").textContent =
      BUSINESS_OPERATOR.label + " · " + BUSINESS_OPERATOR.role + " · " + BUSINESS_OPERATOR.clearance.toUpperCase() + "-cleared";
  }

  prestage(activeProductId, activeContextId);
  setContext(activeContextId);
}

function setContext(id) {
  setActiveContextId(id);
  prestage(activeProductId, activeContextId);
  document.getElementById("dispo-artifact").hidden = true;
  resetAgencyState(AGENT_FLAT);
  highlightLeftRail();
  renderSlateHeader();
  renderTray(ctx);
  renderSlate(ctx);
  renderAuditRibbon();
  setDispositionLabels();
  document.getElementById("vault-count").textContent = vaultCount[activeProductId];
  tickAgencyRail();
  startAgencyTicker(3500);
  /* re-render annotations on context switch · DOM reflows move targets */
  if (document.body.classList.contains("notes-on")) {
    requestAnimationFrame(renderAnnotations);
  }
}

/* ─── three rails · subjects · cases · threads ───────────────────── */

function renderPersonalRail() {
  document.getElementById("rail-l-label").textContent = "Active reads";
  document.getElementById("rail-l-meta").textContent = PERSONAL_THREADS.length + " · self";
  const list = document.getElementById("rail-l-list");
  list.innerHTML = "";
  PERSONAL_THREADS.forEach(thread => {
    const item = document.createElement("button");
    item.className = "subject-item";
    item.dataset.id = thread.id;
    item.innerHTML = `
      <div class="subject-row1">
        <span class="si-name">${thread.label}</span>
        ${thread.drift_state === "deciding" ? '<span class="drift-dot"></span>' : ''}
      </div>
      <div class="subject-row2">${thread.eyebrow.toUpperCase()}</div>
      <div class="consent-chip is-mutual">
        <span class="lock">◇</span>${thread.tile_count} tiles · ${thread.last_touched}
      </div>
    `;
    item.addEventListener("click", () => setContext(thread.id));
    list.appendChild(item);
  });
}

function renderTeamRail() {
  document.getElementById("rail-l-label").textContent = "Subjects";
  document.getElementById("rail-l-meta").textContent = TEAM_SUBJECTS.length + " · with consent";
  const list = document.getElementById("rail-l-list");
  list.innerHTML = "";
  TEAM_SUBJECTS.forEach(s => {
    const cc = CONSENT_CLASSES[s.consent_class];
    const item = document.createElement("button");
    item.className = "subject-item";
    item.dataset.id = s.id;
    item.innerHTML = `
      <div class="subject-row1">
        <span class="si-name">${s.label}</span>
        ${s.drift_state === "drifting" ? '<span class="drift-dot"></span>' : ''}
      </div>
      <div class="subject-row2">${s.role.toUpperCase()}</div>
      <div class="consent-chip ${s.consent_class === "mutual-cofounder" ? "is-mutual" : ""}">
        <span class="lock">⌥</span>${cc?.label ?? s.consent_class}
      </div>
    `;
    item.addEventListener("click", () => setContext(s.id));
    list.appendChild(item);
  });
}

function renderBusinessRail() {
  document.getElementById("rail-l-label").textContent = "Queue";
  document.getElementById("rail-l-meta").textContent = BUSINESS_SCENARIOS.length + " · routed";
  const list = document.getElementById("rail-l-list");
  list.innerHTML = "";
  BUSINESS_SCENARIOS.forEach(s => {
    const item = document.createElement("button");
    item.className = "case-item";
    item.dataset.id = s.id;
    item.innerHTML = `
      <div class="subject-row1">
        <span class="si-name">${s.label}</span>
      </div>
      <div class="subject-row2">${(s.operator ?? "").split("·")[0].toUpperCase()}</div>
      <div class="consent-chip">
        <span class="lock">⌥</span>${s.in_lane ? "in-lane" : "intake"}
      </div>
    `;
    item.addEventListener("click", () => setContext(s.id));
    list.appendChild(item);
  });
}

function highlightLeftRail() {
  document.querySelectorAll(".subject-item, .case-item").forEach(el => {
    el.classList.toggle("is-active", el.dataset.id === activeContextId);
  });
}

/* ─── modal · preview-subject view (Team + Business only) ────────── */

function wirePreviewSubject() {
  document.getElementById("preview-sub")?.addEventListener("click", () => {
    if (activeProductId === "personal") return; // hidden anyway
    const overlay = document.getElementById("modal-overlay");
    const sCount = getSlatedSet().size;
    const auditList = auditRows[activeProductId];
    if (activeProductId === "team") {
      const s = getActiveSubject();
      document.getElementById("modal-title").textContent = `${s.label}'s view · what they would see`;
      document.getElementById("modal-tag").textContent = "Subject view";
      document.getElementById("modal-label-1").textContent = `What was read against ${s.label}`;
      document.getElementById("modal-content-1").innerHTML =
        `<em>Operator: Kriti · Manager.</em> ${sCount} tile${sCount===1?"":"s"} on the slate. ${getSlatedSet().size} of ${(TEAM_TILES_FOR_SUBJECT[s.id] ?? []).length} available source-types used. Consent class: <em>${CONSENT_CLASSES[s.consent_class]?.label}</em>. Window: ${s.window_days} days.`;
    } else {
      const c = getActiveCase();
      document.getElementById("modal-title").textContent = `Subject view · ${c.label}`;
      document.getElementById("modal-tag").textContent = "§552a(d) release";
      document.getElementById("modal-label-1").textContent = "What was composed against the subject";
      document.getElementById("modal-content-1").innerHTML =
        `<em>Operator: ${BUSINESS_OPERATOR.label} · ${BUSINESS_OPERATOR.role} · ${BUSINESS_OPERATOR.clearance}-cleared.</em> ${sCount} tile${sCount===1?"":"s"} on the slate. Composed at ${BUSINESS_OPERATOR.unit}. Privacy Act §552a(d) reciprocity active · subject can request this chain at any moment.`;
    }
    const chainEl = document.getElementById("modal-chain");
    chainEl.innerHTML = "";
    if (auditList.length === 0) {
      chainEl.innerHTML = `<div class="chain-event"><span class="ce-time">·</span><span class="ce-event">no events yet · drag tiles onto the slate</span></div>`;
    } else {
      auditList.forEach(row => {
        const div = document.createElement("div");
        div.className = "chain-event";
        div.innerHTML = `<span class="ce-time">${row.time}</span><span class="ce-event ${row.refused?"refused":""}">${row.event}</span>`;
        chainEl.appendChild(div);
      });
    }
    overlay.classList.add("is-open");
  });
  document.getElementById("modal-close")?.addEventListener("click", () => {
    document.getElementById("modal-overlay").classList.remove("is-open");
  });
  document.getElementById("modal-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "modal-overlay") {
      document.getElementById("modal-overlay").classList.remove("is-open");
    }
  });
}

/* ─── slate-canvas + tray-panel drop wiring ──────────────────────── */

function wireDropTargets() {
  const slateCanvas = document.getElementById("slate-canvas");
  slateCanvas.addEventListener("dragover", (ev) => {
    if (!ev.dataTransfer.types.includes("text/liminal-tile") &&
        !ev.dataTransfer.types.includes("Files") &&
        !ev.dataTransfer.types.includes("text/uri-list")) return;
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
    slateCanvas.classList.add("is-drop-hover");
  });
  slateCanvas.addEventListener("dragleave", (ev) => {
    if (ev.target === slateCanvas) slateCanvas.classList.remove("is-drop-hover");
  });
  slateCanvas.addEventListener("drop", (ev) => {
    ev.preventDefault();
    slateCanvas.classList.remove("is-drop-hover");
    const tileId = ev.dataTransfer.getData("text/liminal-tile");
    if (tileId) {
      const tiles = getTilesForActive();
      const tile = tiles.find(t => t.id === tileId);
      if (tile) onTileClick(tile, tileIsRefused(tile), ctx);
      return;
    }
    if (ev.dataTransfer.files.length > 0 || ev.dataTransfer.types.includes("text/uri-list")) {
      const captureLabel = ev.dataTransfer.files.length > 0
        ? `Captured file · ${ev.dataTransfer.files[0].name}`
        : `Captured URL · ${ev.dataTransfer.getData("text/uri-list").split("\n")[0]}`;
      appendAudit(`drop · ${captureLabel} → slate · vault commit`);
      showToast(`Captured to vault · ${captureLabel}`);
    }
  });

  const trayPanel = document.getElementById("tray-panel");
  trayPanel.addEventListener("dragover", (ev) => {
    if (!ev.dataTransfer.types.includes("Files") &&
        !ev.dataTransfer.types.includes("text/uri-list") &&
        !ev.dataTransfer.types.includes("text/plain")) return;
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
    trayPanel.classList.add("is-drop-hover");
  });
  trayPanel.addEventListener("dragleave", (ev) => {
    if (ev.target === trayPanel) trayPanel.classList.remove("is-drop-hover");
  });
  trayPanel.addEventListener("drop", (ev) => {
    ev.preventDefault();
    trayPanel.classList.remove("is-drop-hover");
    if (ev.dataTransfer.files.length > 0 || ev.dataTransfer.types.includes("text/uri-list")) {
      const captureLabel = ev.dataTransfer.files.length > 0
        ? `Captured file · ${ev.dataTransfer.files[0].name}`
        : `Captured URL · ${ev.dataTransfer.getData("text/uri-list").split("\n")[0]}`;
      appendAudit(`capture · ${captureLabel} → tray · vault commit`);
      showToast(`Captured to vault · ${captureLabel}`);
    }
  });
}

/* ─── boot · staged reveal · canonical glow · session flag ───────── */

function boot() {
  /* product tab clicks · single source · CSS toggles via .is-active */
  document.querySelectorAll(".product-tab").forEach(el => {
    el.addEventListener("click", () => setProduct(el.dataset.product));
  });

  /* tray pill toggle */
  document.getElementById("tray-pill")?.addEventListener("click", toggleTray);

  /* keyboard · pass ctx so the layer can call our setProduct/setContext */
  wireKeyboard(ctx);

  /* marginalia toggle button + resize re-render · marginalia.js */
  wireMarginaliaToggle();

  /* disposition + handoff buttons */
  wireDisposition(ctx);

  /* preview subject modal */
  wirePreviewSubject();

  /* drop targets · slate + tray */
  wireDropTargets();

  /* version pin already wired via _devMode block above */

  /* staged boot moment · once per session · honors prefers-reduced-motion */
  if (/[?&]reset\b/.test(location.search)) {
    sessionStorage.removeItem("liminal-booted");
  }
  const _hasBooted = sessionStorage.getItem("liminal-booted") === "1";
  const _reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const _stageBoot = !_hasBooted && !_reduceMotion;

  if (_stageBoot) document.body.dataset.boot = "staged";

  setProduct("team");

  /* mark the canonical row in the left rail · per surface */
  function markCanonical() {
    let canonicalId;
    if (activeProductId === "personal") {
      canonicalId = (PERSONAL_THREADS.find(t => t.canonical) ?? PERSONAL_THREADS[0])?.id;
    } else if (activeProductId === "team") {
      canonicalId = "brian_eng";
    } else {
      canonicalId = "ci_analyst_insider_threat";
    }
    document.querySelectorAll(".subject-item, .case-item").forEach(el => {
      el.classList.toggle("is-canonical", _stageBoot && el.dataset.id === canonicalId);
    });
  }
  markCanonical();

  function openTrayForDemo() {
    document.querySelector(".stage").classList.add("tray-open");
    document.getElementById("tray-panel").setAttribute("aria-hidden", "false");
  }

  if (_stageBoot) {
    setTimeout(() => {
      openTrayForDemo();
      document.body.removeAttribute("data-boot");
      document.querySelectorAll(".subject-item.is-canonical, .case-item.is-canonical")
        .forEach(el => el.classList.remove("is-canonical"));
      sessionStorage.setItem("liminal-booted", "1");
    }, 1500);
  } else {
    openTrayForDemo();
  }
}

boot();
