/* vault-store.js · IndexedDB persistence layer
 * ────────────────────────────────────────────────────────────────────
 * Per UI_GAP_SPEC §3.2 · "Persistence is now a category-credibility
 * blocker. Under founder-OS framing, a vault that vanishes on reload
 * is not credible."
 *
 * What persists:
 *   · every correction (agent, tag, note, scenario, timestamp)
 *   · every decision/disposition (surface, kind, hash, payload)
 *   · every vault entry the user produces during a session
 *
 * What does NOT persist:
 *   · scroll positions · UI hover state · scenario clicks
 *   · tab changes · keyboard help open/closed · entry overlay state
 *   This is for the RECORD, not for analytics.
 *
 * Storage: browser IndexedDB · localised to the device · no server.
 *   DB:    "liminal-vault" · version 1
 *   stores: corrections (autoIncrement id) · decisions (autoIncrement id) ·
 *           meta (key, value)
 *
 * Schema versioning: the store carries `schema_version: 1` on every row.
 * Schema bumps require an upgrade path · don't migrate tables mid-session.
 *
 * Public API (all return Promises):
 *   init()                    open + migrate · idempotent
 *   appendCorrection(entry)   write · returns id
 *   appendDecision(entry)     write · returns id
 *   read(opts?)               read corrections · {surface?, limit?, since?}
 *   readDecisions(opts?)      read decisions · same shape
 *   count(surface?)           total corrections · optionally per-surface
 *   countDecisions(surface?)  total decisions
 *   clear()                   wipe both stores · the "Reset vault" affordance
 *   isAvailable()             does IDB work in this context (returns bool)
 *
 * The 9-tag correction taxonomy is the canonical taxonomy from
 * liminal-agents/lib/correction-tags.js · validated on write.
 */

const DB_NAME = "liminal-vault";
const DB_VERSION = 1;
const STORE_CORRECTIONS = "corrections";
const STORE_DECISIONS = "decisions";
const STORE_META = "meta";

/* the 9-tag canon · mirror of liminal-agents/lib/correction-tags.js
   per cuts/CONTRIBUTING.md rule about not redefining canon · this is
   a pure mirror · MUST stay in sync if the agents repo changes the list */
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

/* ─── IDB internals ─────────────────────────────────────────────── */

let _dbPromise = null;

function _open() {
  if (_dbPromise) return _dbPromise;
  if (!("indexedDB" in window)) {
    _dbPromise = Promise.reject(new Error("IndexedDB not available"));
    return _dbPromise;
  }
  _dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (ev) => {
      const db = ev.target.result;
      if (!db.objectStoreNames.contains(STORE_CORRECTIONS)) {
        const s = db.createObjectStore(STORE_CORRECTIONS, { keyPath: "id", autoIncrement: true });
        s.createIndex("surface", "surface", { unique: false });
        s.createIndex("agent", "agent", { unique: false });
        s.createIndex("tag", "tag", { unique: false });
        s.createIndex("ts", "ts", { unique: false });
      }
      if (!db.objectStoreNames.contains(STORE_DECISIONS)) {
        const s = db.createObjectStore(STORE_DECISIONS, { keyPath: "id", autoIncrement: true });
        s.createIndex("surface", "surface", { unique: false });
        s.createIndex("kind", "kind", { unique: false });
        s.createIndex("ts", "ts", { unique: false });
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META, { keyPath: "key" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return _dbPromise;
}

function _tx(stores, mode = "readonly") {
  return _open().then(db => db.transaction(stores, mode));
}

function _put(storeName, value) {
  return _tx([storeName], "readwrite").then(tx => new Promise((resolve, reject) => {
    const req = tx.objectStore(storeName).add(value);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }));
}

function _getAll(storeName, query = null, count = undefined) {
  return _tx([storeName]).then(tx => new Promise((resolve, reject) => {
    const req = tx.objectStore(storeName).getAll(query, count);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }));
}

/* ─── public API ────────────────────────────────────────────────── */

export function isAvailable() {
  return typeof window !== "undefined" && "indexedDB" in window;
}

export async function init() {
  if (!isAvailable()) return false;
  try {
    await _open();
    return true;
  } catch (e) {
    console.warn("[vault-store] init failed", e);
    return false;
  }
}

/**
 * Append a correction to the vault.
 * @param {Object} entry
 * @param {string} entry.surface  · "personal" · "team" · "business"
 * @param {string} entry.agent    · agent name (e.g., "Synthesizer")
 * @param {string} entry.tag      · one of the 9 canon tags · null/undefined for free-form
 * @param {string} [entry.note]   · optional free-text rationale
 * @param {string} [entry.scenario] · canonical context (e.g., "brian_eng" · "founding_close_decision")
 * @param {Object} [entry.context] · arbitrary structured payload
 * @returns {Promise<number>} new entry id
 */
export async function appendCorrection(entry) {
  if (!isAvailable()) throw new Error("IndexedDB not available");
  if (!entry || !entry.surface || !entry.agent) {
    throw new Error("appendCorrection requires { surface, agent }");
  }
  if (entry.tag != null && !isValidTag(entry.tag)) {
    throw new Error(`appendCorrection: invalid tag "${entry.tag}" · must be one of ${CORRECTION_TAGS.join(", ")}`);
  }
  const row = {
    schema_version: 1,
    ts: Date.now(),
    surface: entry.surface,
    agent: entry.agent,
    tag: entry.tag ?? null,
    note: entry.note ?? null,
    scenario: entry.scenario ?? null,
    context: entry.context ?? null,
  };
  return _put(STORE_CORRECTIONS, row);
}

/**
 * Append a decision/disposition artifact.
 */
export async function appendDecision(entry) {
  if (!isAvailable()) throw new Error("IndexedDB not available");
  if (!entry || !entry.surface || !entry.kind) {
    throw new Error("appendDecision requires { surface, kind }");
  }
  const row = {
    schema_version: 1,
    ts: Date.now(),
    surface: entry.surface,
    kind: entry.kind,             // "primary" · "defer"
    hash: entry.hash ?? null,
    payload: entry.payload ?? null,
  };
  return _put(STORE_DECISIONS, row);
}

/**
 * Read corrections · optionally filtered.
 * @param {Object} [opts]
 * @param {string} [opts.surface]  · filter by surface
 * @param {number} [opts.since]    · only entries with ts >= since (epoch ms)
 * @param {number} [opts.limit]    · max results (most recent first)
 */
export async function read(opts = {}) {
  if (!isAvailable()) return [];
  const all = await _getAll(STORE_CORRECTIONS);
  let rows = all;
  if (opts.surface) rows = rows.filter(r => r.surface === opts.surface);
  if (opts.since) rows = rows.filter(r => r.ts >= opts.since);
  rows.sort((a, b) => b.ts - a.ts);
  if (opts.limit) rows = rows.slice(0, opts.limit);
  return rows;
}

export async function readDecisions(opts = {}) {
  if (!isAvailable()) return [];
  const all = await _getAll(STORE_DECISIONS);
  let rows = all;
  if (opts.surface) rows = rows.filter(r => r.surface === opts.surface);
  if (opts.since) rows = rows.filter(r => r.ts >= opts.since);
  rows.sort((a, b) => b.ts - a.ts);
  if (opts.limit) rows = rows.slice(0, opts.limit);
  return rows;
}

export async function count(surface) {
  const rows = await read(surface ? { surface } : {});
  return rows.length;
}

export async function countDecisions(surface) {
  const rows = await readDecisions(surface ? { surface } : {});
  return rows.length;
}

export async function clear() {
  if (!isAvailable()) return;
  const tx = await _tx([STORE_CORRECTIONS, STORE_DECISIONS, STORE_META], "readwrite");
  await Promise.all([
    new Promise((res, rej) => {
      const r = tx.objectStore(STORE_CORRECTIONS).clear();
      r.onsuccess = res; r.onerror = () => rej(r.error);
    }),
    new Promise((res, rej) => {
      const r = tx.objectStore(STORE_DECISIONS).clear();
      r.onsuccess = res; r.onerror = () => rej(r.error);
    }),
    new Promise((res, rej) => {
      const r = tx.objectStore(STORE_META).clear();
      r.onsuccess = res; r.onerror = () => rej(r.error);
    }),
  ]);
}
