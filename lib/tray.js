/* tray.js · the palette/inkwell-rail · tile catalog per active context
 *
 * Renders tiles from getTilesForActive(). Wires drag handlers (HTML5
 * draggable) and tap-to-add (forwards to ctx.onTileClick). Drop handlers
 * on the tray panel itself live in boot.js where they can spawn ad-hoc
 * captured tiles via the OS file/url drop path.
 */
import {
  activeProductId,
  getSlatedSet, getTilesForActive, getOperatorClearanceLevel,
} from "./state.js";
import { PREVIEWS } from "./previews.js";

export function tilePreviewHTML(tile, isRefused) {
  if (isRefused) {
    return `
      <div class="tile-preview refused">
        <div class="tr-lock">⌥</div>
        <div class="tr-msg">${tile.refused_reason ?? "out of consent"}</div>
      </div>
    `;
  }
  const html = PREVIEWS[tile.id];
  if (!html || html === "REFUSED") {
    return `
      <div class="tile-preview refused">
        <div class="tr-lock">⌥</div>
        <div class="tr-msg">${tile.refused_reason ?? "out of consent · gated"}</div>
      </div>`;
  }
  return html;
}

export function renderTray(ctx) {
  const tiles = getTilesForActive();
  const tray = document.getElementById("tray-tiles");
  if (!tray) return;
  tray.innerHTML = "";
  const slatedSet = getSlatedSet();
  const opLevel = getOperatorClearanceLevel();
  let availableCount = 0;
  let refusedCount = 0;
  let liveCount = 0;

  /* drop-hint at top · explains the tray's role to first-timers */
  const hint = document.createElement("div");
  hint.className = "tray-drop-hint";
  hint.innerHTML = `
    <strong>Drop window here</strong>
    Any browser or app window dragged into the tray becomes a Playwright-style live session under Liminal's view · scoped to that one window only · vaulted as it streams.
  `;
  tray.appendChild(hint);

  tiles.forEach(tile => {
    const isRefused = tile.requires_level > opLevel;
    const isOnSlate = slatedSet.has(tile.id);
    const isLive = !isRefused && tile.kind !== "vault";
    if (isRefused) refusedCount++;
    else availableCount++;
    if (isLive) liveCount++;

    const el = document.createElement("div");
    el.className = "tile";
    if (isOnSlate) el.classList.add("is-on-slate");
    if (isRefused) el.classList.add("is-refused");
    if (tile.kind === "vault") el.classList.add("is-vault");
    if (tile.kind === "classified") el.classList.add("is-classified");
    el.dataset.id = tile.id;

    /* meta line varies by surface · Personal has no consent gate so suppress
       the consent line; Team shows consent level; Business shows classification */
    let metaLine = "";
    if (activeProductId === "team" || activeProductId === "sam-seed") {
      metaLine = `<span class="tm-consent ${isRefused ? "required" : ""}">consent · lvl ${tile.requires_level}</span>`;
    } else if (activeProductId === "business") {
      const cls = tile.kind === "classified"
        ? (tile.requires_level >= 4 ? "TS / SCI" : tile.requires_level >= 3 ? "TOP SECRET" : "SECRET")
        : tile.kind === "evidence" || tile.kind === "case"
          ? "FOUO"
          : "UNCLASS";
      metaLine = `<span class="tm-classification">${cls}</span>`;
    }
    /* Personal gets no metaLine · the operator IS the subject */
    const noteLine = tile.note ? `<span class="tm-note">${tile.note}</span>` : "";

    el.innerHTML = `
      <div class="tile-bar">
        <div class="tb-lights">
          <span class="tb-light ${isLive ? "is-active" : ""}"></span>
          <span class="tb-light"></span>
          <span class="tb-light"></span>
        </div>
        <span class="tb-source">${tile.source}</span>
        <span class="tb-live">${isLive ? "live" : isRefused ? "refused" : tile.kind === "vault" ? "vault" : "static"}</span>
      </div>
      <div class="tile-window">
        <div class="tile-label">${tile.label}</div>
        ${tilePreviewHTML(tile, isRefused)}
        ${(metaLine || noteLine) ? `<div class="tile-meta">${metaLine}${noteLine}</div>` : ""}
      </div>
    `;

    if (!isOnSlate) {
      el.addEventListener("click", () => ctx.onTileClick(tile, isRefused));
      el.setAttribute("draggable", "true");
      el.addEventListener("dragstart", (ev) => {
        ev.dataTransfer.setData("text/liminal-tile", tile.id);
        ev.dataTransfer.effectAllowed = "copy";
        el.classList.add("is-dragging");
      });
      el.addEventListener("dragend", () => el.classList.remove("is-dragging"));
    }
    tray.appendChild(el);
  });

  /* panel header copy · per-surface vocabulary */
  const tpaTitle = document.getElementById("tpa-title");
  const tpaSub = document.getElementById("tpa-sub");
  if (tpaTitle) {
    tpaTitle.textContent =
      activeProductId === "personal" ? "Tray · your work surfaces" :
      activeProductId === "team"     ? "Tray · live windows" :
      activeProductId === "sam-seed" ? "Tray · the evidence" :
                                       "Tray · cleared sources";
  }
  if (tpaSub) {
    tpaSub.innerHTML =
      activeProductId === "personal"
        ? "Each tile is a window from your own work · Granola, Slack, Linear, Obsidian, calendar, git. Liminal reads what you compose · stored locally · no one else sees this read."
        : activeProductId === "team"
          ? "Each window in the tray is a live session under Liminal's view. Liminal reads what you do in it · vaulted locally · employer EDR sees you using the source app, not the read."
          : activeProductId === "sam-seed"
            ? "Each tile is a source on the failing triage · scanner output, process gaps, tenure, the agentic shift. Which ones you slate decides whether the read indicts a person or tunes a system. Nothing private is read · pattern-only on the people."
            : "Each tile is a cleared source under Playwright-style view. Liminal composes evidence from these · audit chain logs every read · subject can request §552a(d) release.";
  }
  document.getElementById("tpa-live-count").textContent = liveCount;
  document.getElementById("tpa-meta-detail").textContent =
    `${availableCount} avail · ${refusedCount} refused`;
  document.getElementById("tp-count-strong").textContent = liveCount;
}

/* tray pill toggle · public so keyboard.js can call via ctx.toggleTray */
export function toggleTray() {
  const open = document.querySelector(".stage").classList.toggle("tray-open");
  document.getElementById("tray-panel").setAttribute("aria-hidden", open ? "false" : "true");
}
