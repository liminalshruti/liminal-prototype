/*
 * seed-intel.js · cuts/thread · render-truthful datasets for the intelligence cuts
 * ──────────────────────────────────────────────────────────────────────────
 * Extends seed.js (the same fictional founder's week) with the data the
 * higher-order surfaces need: told-them contradictions, the precision/learning
 * curve, and the proactive insight feed. Same RENDER-TRUTHFUL discipline —
 * fictional, disclosed, hand-authored; receipts carry a source + exact line.
 *
 * Grounding:
 *   · told-them    → liminal-desktop OPERATIONAL_PICTURE_V0_PR_PATH.md §Told-Them Register
 *   · precision    → LIMINAL_RECOVERY_PLAN_DIFFUSE_CONTEXT_2026-06-12 §"precision on the tin"
 *   · insights     → liminal-desktop UI_CONTRACT.md §insight-feed (5 frozen types)
 *
 * VOCAB: allowed terms only.
 */

const SRC = {
  gmail:   { glyph: "✉", name: "Gmail" },
  gcal:    { glyph: "▦", name: "Calendar" },
  granola: { glyph: "◍", name: "Granola" },
  claude:  { glyph: "◇", name: "Claude session" },
  slack:   { glyph: "▸", name: "Slack" },
};
const r = (src, thread, ago, quote, trace) => ({
  glyph: SRC[src].glyph, name: SRC[src].name, meta: `${thread} · ${ago}`, quote, trace,
});

/* ── Told-them register · say-with-care · contradiction detection ──────────── */
export const toldThem = [
  {
    topic: "Q2 revenue",
    status: "conflict",
    flag: "Two different numbers for the same metric, four days apart.",
    claims: [
      { to: "Ana Okafor · Vela", value: "$42k MRR", when: "6d ago",
        receipt: r("gmail","Vela · Series A","6d ago","Quick update on traction — <mark>we're at about $42k MRR</mark>, up from $31k last quarter.","gmail/thread/19a2f · outbound") },
      { to: "the board", value: "$55k MRR", when: "2d ago",
        receipt: r("claude","board deck draft","2d ago","Slide 4 metrics line: <mark>\"MRR $55k (incl. two annual prepays amortized).\"</mark>","claude/sessions/board-prep.jsonl · matched: same metric, different value") },
    ],
  },
  {
    topic: "Northwind pilot start",
    status: "conflict",
    flag: "Your team still has the old date — they're prepping to the 15th.",
    claims: [
      { to: "your team · standup", value: "starts the 15th", when: "3d ago",
        receipt: r("slack","#team","3d ago","<mark>\"Northwind kicks off the 15th — let's have the env ready by then.\"</mark>","slack/C01TEAM/p171… · outbound") },
      { to: "Priya · Northwind", value: "moved to the 22nd", when: "2d ago",
        receipt: r("gmail","Northwind · pilot","2d ago","<mark>\"Works for us — the 22nd it is.\"</mark>","gmail/thread/4c19e · matched: same event, newer date") },
    ],
  },
  {
    topic: "Hiring plan · Q3",
    status: "consistent",
    flag: "Consistent across both — no action needed.",
    claims: [
      { to: "Devon", value: "2 eng hires this quarter", when: "5d ago",
        receipt: r("claude","planning session","5d ago","<mark>\"Plan: 2 eng hires in Q3, hold the GTM hire.\"</mark>","claude/sessions/planning.jsonl") },
      { to: "the board deck", value: "2 eng hires this quarter", when: "1d ago",
        receipt: r("claude","board deck draft","1d ago","Hiring slide: <mark>\"+2 engineering, Q3.\"</mark>","claude/sessions/board-prep.jsonl · matched: same plan, same value") },
    ],
  },
];

/* ── Precision · the learning curve · dismiss-rate falls week-over-week ────── */
export const precision = {
  weeks: [
    { week: "Wk 1", surfaced: 24, dismissed: 9, rate: 0.38 },
    { week: "Wk 2", surfaced: 21, dismissed: 6, rate: 0.29 },
    { week: "Wk 3", surfaced: 19, dismissed: 4, rate: 0.21 },
    { week: "Wk 4", surfaced: 18, dismissed: 3, rate: 0.17 },
  ],
  log: [
    { when: "Wk 1", what: "Dismissed a newsletter \"re: your reply\" read as an ask.", learned: "Bulk-sender threads aren't open loops." },
    { when: "Wk 1", what: "Dismissed \"thanks!\" from Sara read as waiting-on-you.", learned: "One-word acknowledgements close a loop, not open one." },
    { when: "Wk 2", what: "Confirmed the Ana data-room loop as real and time-critical.", learned: "Investor commitments rank to the top." },
    { when: "Wk 2", what: "Dismissed a recurring standup as a commitment.", learned: "Calendar holds you own aren't commitments to others." },
    { when: "Wk 3", what: "Confirmed Marcus offer as a stuck loop after round 2.", learned: "Hiring threads escalate after a second unanswered nudge." },
    { when: "Wk 4", what: "Dismissed an auto-reply \"out of office\" read as a reply.", learned: "Auto-replies don't close a waiting-on-them loop." },
  ],
};

/* ── Insight feed · 5 frozen types · proactive · evidence-chained ──────────── */
export const insights = [
  {
    type: "clock_proximity",
    label: "Clock proximity",
    subject: "Vela data room",
    confidence: 0.91,
    narrative: "Due tomorrow — and Thursday's partner meeting depends on it. This is the closest clock to firing in your week.",
    evidence: [
      r("gmail","Vela · Series A","6d ago","<mark>the updated metrics and the data-room link by end of week</mark>","gmail/thread/19a2f"),
      r("gcal","Vela partner mtg","Thu 2:00pm","<mark>\"Vela full-partner review.\"</mark>","gcal/evt/vela-partners"),
    ],
  },
  {
    type: "stuck_loop",
    label: "Stuck loop",
    subject: "Marcus offer",
    confidence: 0.82,
    narrative: "The offer thread has gone three rounds with no resolution — twice-opened, unanswered four days. Threads that pass three rounds close far less often.",
    evidence: [
      r("gmail","Staff Eng · offer","4d ago","<mark>let me know if the equity split works</mark>","gmail/thread/2b71c"),
      r("gmail","Staff Eng · offer","18h ago","<mark>somewhere around 0.2% more?</mark>","gmail/thread/2b71c · 3rd round"),
    ],
  },
  {
    type: "assumption_drift",
    label: "Assumption drift",
    subject: "Northwind pilot",
    confidence: 0.76,
    narrative: "You're still prepping to the 15th; Priya moved it to the 22nd two days ago. The plan you're working from and the calendar no longer agree.",
    evidence: [
      r("slack","#team","3d ago","<mark>\"Northwind kicks off the 15th.\"</mark>","slack/C01TEAM"),
      r("gmail","Northwind · pilot","2d ago","<mark>push the kickoff to Monday the 22nd</mark>","gmail/thread/4c19e"),
    ],
  },
  {
    type: "cross_source_correlation",
    label: "Cross-source correlation",
    subject: "The investor update",
    confidence: 0.69,
    narrative: "Three separate threads reference \"the next update\" that hasn't gone out — Ana, the board, and a customer all expect it this week. One artifact closes all three.",
    evidence: [
      r("gmail","Vela","6d ago","<mark>\"look forward to the next update\"</mark>","gmail/thread/19a2f"),
      r("gcal","Investor update","this week","<mark>recurring hold, no draft found</mark>","gcal/recurring/inv-update"),
      r("slack","#board","4d ago","<mark>\"ping when the monthly's out\"</mark>","slack/C09BOARD"),
    ],
  },
  {
    type: "allocation_drift",
    label: "Allocation drift",
    subject: "Where your week is going",
    confidence: 0.64,
    narrative: "Seven of eight open loops are fundraise + hiring. Northwind — your only live customer — has one. Worth seeing before the week sets.",
    evidence: [
      r("claude","week review","today","<mark>\"fundraise: 4 loops · hiring: 3 · customer: 1\"</mark>","claude/sessions/week-review.jsonl · derived count"),
    ],
  },
];

export const INTEL_DISCLOSURE =
  "Illustrative — derived from one fictional founder's week. Nothing is read from a real account.";
