/*
 * recall.js · cuts/thread · REAL client-side recall over the thread corpus
 * ──────────────────────────────────────────────────────────────────────────
 * Not seeded results — a real index + ranker over the week's records (open loops,
 * subject histories, told-them claims, insights). Mirrors the desktop recall
 * contract (UI_CONTRACT §1): a query returns ranked, receipted hits with the
 * matched terms highlighted. bm25-flavoured: term frequency × inverse doc
 * frequency, title-weighted, light recency boost.
 *
 * Honest scope: lexical (term) search over the in-memory corpus — the desktop
 * ships FTS5 + an embedding-hybrid; this is the lexical half, real and local.
 */

import { openLoops, threads, subjects } from "./seed.js";
import { toldThem, insights } from "./seed-intel.js";

const strip = (s) => (s || "").replace(/<[^>]+>/g, "");
const tokens = (s) => strip(s).toLowerCase().match(/[a-z0-9$%.]+/g) || [];

// recency weight from a loose "Nd ago" / "today" string
function recencyBoost(meta = "") {
  if (/today|now|18h|yesterday/i.test(meta)) return 1.2;
  const m = meta.match(/(\d+)\s*d/);
  if (m) return 1 + Math.max(0, (14 - Math.min(14, +m[1])) / 60);
  return 1;
}

/* Build a flat corpus from the week's records. */
function buildCorpus() {
  const docs = [];
  const push = (kind, subject, title, body, receipt) =>
    docs.push({ kind, subject, title: strip(title), body: strip(body), receipt });

  for (const l of openLoops)
    push("open loop", l.person, l.title, `${l.sub} ${l.receipt.quote}`, l.receipt);

  for (const key of Object.keys(threads)) {
    const t = threads[key];
    for (const e of t.entries)
      push("history", t.subject, `${t.subject} — ${e.tag}`, `${e.what} ${e.receipt.quote}`, e.receipt);
  }

  for (const topic of toldThem)
    for (const c of topic.claims)
      push("told-them", topic.topic, `${topic.topic} — told ${c.to}`, `${c.value} ${c.receipt.quote}`, c.receipt);

  for (const ins of insights)
    push("insight", ins.subject, `${ins.label}: ${ins.subject}`, ins.narrative, ins.evidence[0]);

  return docs;
}

const CORPUS = buildCorpus();

// inverse-document-frequency over the corpus
const DF = {};
for (const d of CORPUS) for (const t of new Set([...tokens(d.title), ...tokens(d.body), ...tokens(d.subject)])) DF[t] = (DF[t] || 0) + 1;
const N = CORPUS.length;
const idf = (t) => Math.log(1 + N / (1 + (DF[t] || 0)));

export const corpusSize = N;

function highlight(text, qtokens) {
  let out = strip(text);
  // longest first so multi-char terms win
  [...qtokens].sort((a, b) => b.length - a.length).forEach((q) => {
    if (q.length < 2) return;
    out = out.replace(new RegExp(`\\b(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\w*)`, "ig"), "<mark>$1</mark>");
  });
  return out;
}

function snippet(body, qtokens) {
  const words = strip(body).split(/\s+/);
  const lc = words.map((w) => w.toLowerCase());
  let hit = lc.findIndex((w) => qtokens.some((q) => w.includes(q)));
  if (hit === -1) hit = 0;
  const start = Math.max(0, hit - 7);
  const seg = words.slice(start, start + 22).join(" ");
  return (start > 0 ? "… " : "") + seg + (start + 22 < words.length ? " …" : "");
}

export function search(query, limit = 8) {
  const q = [...new Set(tokens(query))].filter((t) => t.length >= 2);
  if (!q.length) return [];
  const scored = CORPUS.map((d) => {
    const tt = tokens(d.title), bt = tokens(d.body), st = tokens(d.subject);
    let score = 0, matched = 0;
    for (const term of q) {
      const inT = tt.filter((w) => w.includes(term)).length;
      const inB = bt.filter((w) => w.includes(term)).length;
      const inS = st.filter((w) => w.includes(term)).length;
      if (inT + inB + inS > 0) matched++;
      score += idf(term) * (inT * 3 + inS * 2 + inB);
    }
    score *= (matched / q.length) * recencyBoost(d.receipt?.meta);
    return { ...d, score, snippet: highlight(snippet(d.body, q), q), titleHi: highlight(d.title, q) };
  });
  return scored.filter((d) => d.score > 0).sort((a, b) => b.score - a.score).slice(0, limit);
}

/* Suggested queries — the three weekly jobs from the plan, as one-click prompts. */
export const suggestions = [
  "what do we know about Vela",
  "what changed with Northwind",
  "what do I owe before Thursday",
  "marcus equity",
];
