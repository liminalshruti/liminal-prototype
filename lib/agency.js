/* agency.js · the right-rail agency console
 *
 * 12 agents in 4 registers · one is "currently reading" at a time, rotating
 * every 3.5s when there are non-refused tiles on the slate. Disagreement
 * edge draws between Strategist + Contrarian when 2+ tiles are slated.
 *
 * Pure rendering · imports state from state.js, mutates agentState/readTimes
 * via that module. Exposes start/stop ticker so boot.js controls timing.
 */
import {
  activeProductId,
  agentState, readTimes,
  getDisagreementPair, setDisagreementPair,
  getSlatedSet, getTilesForActive, tileIsRefused,
} from "./state.js";

export const REGISTERS = ["diligence", "outreach", "synthesis", "judgment"];
/* Agent roster · Witness joins Diligence per SCENARIO_SPEC §8.3
   · Witness reads what is materially / somatically true of an artifact
   · the creative ICP recognition cue ("technically right, somatically wrong")
   · matches `liminal-agents/lib/agents/witness.js` already on disk */
export const REGISTER_AGENTS = {
  diligence: ["Operator", "Synthesizer", "Witness"],
  outreach:  ["Planner", "SDR"],
  synthesis: ["Strategist", "Editor"],
  judgment:  ["Contrarian", "Manager"],
};
export const AGENT_FLAT = REGISTERS.flatMap(reg =>
  REGISTER_AGENTS[reg].map(n => ({ name: n, reg }))
);

let agencyTimer = null;

function nowStamp() {
  const t = new Date();
  return `${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`;
}

function detailFor(name) {
  const s = agentState[name];
  /* Personal · agents read against the operator's own baseline · copy
     reflects the inward register · "reading you", "diverged on your read",
     "off-baseline" instead of consent-vocabulary */
  if (activeProductId === "personal") {
    if (s === "reading")    return "reading you…";
    if (s === "disagreed")  return "diverged";
    if (s === "refused-by") return "off-baseline";
    if (s === "read")       return readTimes[name] ?? "read";
    return "idle";
  }
  if (s === "reading")     return "reading…";
  if (s === "disagreed")   return "disagreed";
  if (s === "refused-by")  return "refused";
  if (s === "read")        return readTimes[name] ?? "read";
  return "idle";
}

function classFor(name) {
  return "is-" + (agentState[name] ?? "idle");
}

export function tickAgencyRail() {
  const slatedSet = getSlatedSet();
  const tiles = getTilesForActive();
  const refusedOnSlate = [...slatedSet]
    .map(id => tiles.find(t => t.id === id))
    .filter(t => t && tileIsRefused(t));
  const nonRefusedCount = [...slatedSet]
    .map(id => tiles.find(t => t.id === id))
    .filter(t => t && !tileIsRefused(t)).length;

  /* agents whose state is "reading" become "read" with a timestamp */
  AGENT_FLAT.forEach(a => {
    if (agentState[a.name] === "reading") {
      agentState[a.name] = "read";
      readTimes[a.name] = nowStamp();
    }
  });

  if (refusedOnSlate.length > 0) {
    ["Manager", "Contrarian"].forEach(n => {
      if (agentState[n] !== "refused-by") agentState[n] = "refused-by";
    });
  }

  if (nonRefusedCount > 0) {
    const eligible = ["diligence", "synthesis", "judgment"];
    const candidates = AGENT_FLAT
      .filter(a => eligible.includes(a.reg))
      .filter(a => agentState[a.name] !== "refused-by");
    if (candidates.length > 0) {
      const pick = candidates[Math.floor(Math.random() * candidates.length)].name;
      agentState[pick] = "reading";
    }
  }

  /* disagreement pair appears at 2+ non-refused tiles · canonical pair
     is Strategist (synthesis) vs Contrarian (judgment) */
  const currentPair = getDisagreementPair();
  if (nonRefusedCount >= 2 && !currentPair) {
    setDisagreementPair(["Strategist", "Contrarian"]);
    agentState["Strategist"] = "disagreed";
    agentState["Contrarian"] = "disagreed";
  } else if (nonRefusedCount < 2) {
    setDisagreementPair(null);
  }

  renderConsole();
  refreshSlateReaderChips();
}

export function renderConsole() {
  const wrap = document.getElementById("register-blocks");
  if (!wrap) return;
  wrap.innerHTML = "";

  REGISTERS.forEach(reg => {
    const block = document.createElement("div");
    block.className = "register-block " + reg;

    const agents = REGISTER_AGENTS[reg];
    const anyReading   = agents.some(n => agentState[n] === "reading");
    const anyDisagreed = agents.some(n => agentState[n] === "disagreed");
    const anyRefused   = agents.some(n => agentState[n] === "refused-by");
    const allRead      = agents.every(n => agentState[n] === "read");

    let state = "idle", label = "IDLE";
    if (anyRefused) { state = "refused"; label = "ROUTED"; }
    else if (anyDisagreed) { state = "refused"; label = "DIVERGED"; }
    else if (anyReading)   { state = "active";  label = "READING"; }
    else if (allRead)      { state = "active";  label = "READ"; }

    block.innerHTML = `
      <div class="reg-head">
        <span class="reg-name-block">${reg}</span>
        <div class="reg-status">
          <span class="status ${state}">${label}</span>
        </div>
      </div>
      <div class="reg-agents" data-reg="${reg}">
        ${agents.map(name => `
          <div class="reg-agent ${classFor(name)}" data-agent="${name}">
            <span class="ra-name">${name}</span>
            <span class="ra-detail">${detailFor(name)}</span>
          </div>
        `).join("")}
      </div>
    `;
    wrap.appendChild(block);
  });

  const pair = getDisagreementPair();
  if (pair) {
    const [a, b] = pair;
    const aEl = wrap.querySelector(`.reg-agent[data-agent="${a}"]`);
    const bEl = wrap.querySelector(`.reg-agent[data-agent="${b}"]`);
    if (aEl && bEl) {
      const rail = aEl.closest(".rail-right") || wrap;
      const railRect = rail.getBoundingClientRect();
      const aRect = aEl.getBoundingClientRect();
      const bRect = bEl.getBoundingClientRect();
      const top = Math.min(aRect.top, bRect.top) + aRect.height / 2 - railRect.top;
      const bot = Math.max(aRect.bottom, bRect.bottom) - aRect.height / 2 - railRect.top;
      const edge = document.createElement("div");
      edge.className = "reg-edge";
      edge.style.top = `${top}px`;
      edge.style.height = `${bot - top}px`;
      rail.appendChild(edge);
    }
  }
}

/* swap reader chips in-place on slated tiles · derived from current
   agentState · avoids destroying .slated DOM nodes (which would re-fire
   arrival animations) */
export function refreshSlateReaderChips() {
  const slatedSet = getSlatedSet();
  const tiles = getTilesForActive();
  const reading = AGENT_FLAT.find(a => agentState[a.name] === "reading");
  const recents = AGENT_FLAT.filter(a => agentState[a.name] === "read").slice(0, 2);
  const chips = [];
  const seen = new Set();
  if (reading) { chips.push({ name: reading.name, cls: "is-reading" }); seen.add(reading.name); }
  for (const a of recents) {
    if (seen.has(a.name)) continue;
    chips.push({ name: a.name, cls: "" });
    seen.add(a.name);
    if (chips.length >= 3) break;
  }
  const html = chips.map(c =>
    `<span class="reader-chip ${c.cls}" title="${c.name}">${c.name[0]}</span>`
  ).join("");

  document.querySelectorAll(".slated.is-active").forEach(el => {
    const id = el.dataset.id;
    if (!slatedSet.has(id)) return;
    const tile = tiles.find(t => t.id === id);
    if (!tile || tileIsRefused(tile)) return;
    let host = el.querySelector(".slated-readers");
    if (!host) {
      host = document.createElement("div");
      host.className = "slated-readers";
      const x = el.querySelector(".slated-x");
      if (x) el.insertBefore(host, x);
      else el.appendChild(host);
    }
    host.innerHTML = html;
  });
}

export function startAgencyTicker(intervalMs = 3500) {
  stopAgencyTicker();
  agencyTimer = setInterval(tickAgencyRail, intervalMs);
}

export function stopAgencyTicker() {
  if (agencyTimer) {
    clearInterval(agencyTimer);
    agencyTimer = null;
  }
}
