/*
 * seed-ops.js · cuts/thread · render-truthful datasets for the operational cuts
 * ──────────────────────────────────────────────────────────────────────────
 * Same fictional founder's week, the data the operational surfaces need:
 *   · weekUpdate  → the Receipted Update (closed/new/moved/stalled + bracketed
 *                   unsupported-claim questions). Source: OPERATIONAL_PICTURE_V0_PR_PATH §Receipted Update
 *   · eventLog    → the append-only, receipted, hash-linked event stream the
 *                   metrics are queries over. Source: plan §6 (event-model metrics)
 *   · team        → the chief-of-staff view: cross-person loops (who owes whom).
 *                   Source: plan §wedge (secondary ICP + $100 CoS tier)
 * Fictional, disclosed, allowed-vocab only.
 */

const SRC = { gmail:{glyph:"✉",name:"Gmail"}, gcal:{glyph:"▦",name:"Calendar"}, granola:{glyph:"◍",name:"Granola"}, claude:{glyph:"◇",name:"Claude session"}, slack:{glyph:"▸",name:"Slack"} };
const r = (src, thread, ago, quote, trace) => ({ glyph:SRC[src].glyph, name:SRC[src].name, meta:`${thread} · ${ago}`, quote, trace });

/* ── The Receipted Update · what actually changed this week ─────────────────── */
export const weekUpdate = {
  period: "Week of Jun 8 · Northstar",
  sections: [
    { key:"closed", label:"Closed", items:[
      { text:"<b>Northwind</b> signed the pilot.", receipt:r("gmail","Northwind","5d ago","<mark>\"We're in — let's get the pilot scheduled.\"</mark>","gmail/thread/4c19e") },
      { text:"<b>Sara</b> shipped the brand pass after your sign-off.", receipt:r("slack","#brand","1d ago","<mark>\"Shipped — wordmark at the heavier weight.\"</mark>","slack/C03BR") },
    ]},
    { key:"new", label:"New", items:[
      { text:"<b>Vela</b> moved to a full-partner review — Thursday.", receipt:r("gcal","Vela partner mtg","yesterday","<mark>\"Vela full-partner review — Thu 2:00pm.\"</mark>","gcal/evt/vela-partners") },
      { text:"<b>Tomas (Granola)</b> scoping the API integration.", receipt:r("slack","Granola · partners","3d ago","<mark>\"I'll get you the scoped endpoints + rate limits.\"</mark>","slack/C07PT") },
    ]},
    { key:"moved", label:"Moved", items:[
      { text:"<b>Northwind</b> pilot kickoff → the 22nd (was the 15th).", receipt:r("gmail","Northwind · pilot","2d ago","<mark>push the kickoff to Monday the 22nd</mark>","gmail/thread/4c19e") },
    ]},
    { key:"stalled", label:"Stalled", items:[
      { text:"<b>Marcus</b> offer — countered on equity, unanswered 4d.", receipt:r("gmail","Staff Eng · offer","18h ago","<mark>somewhere around 0.2% more?</mark>","gmail/thread/2b71c") },
    ]},
  ],
  // claims the draft wants to make but the record can't cleanly back → bracketed questions
  unsupported: [
    { bracket: "which MRR — $42k or $55k?", note: "The record has both: $42k told to Ana (6d ago), $55k in the board draft (2d ago). Reconcile before this goes out." },
    { bracket: "is the design-partner intro done?", note: "Promised to Priya 9 days ago; no send found. Don't claim it's handled." },
  ],
};

/* ── The event log · append-only · receipted · metrics are queries over it ──── */
export const eventLog = [
  { seq: 148, type: "loop.confirmed", subject: "Vela data room", when: "today · 09:12", hash: "a1f3c9", prev: "f70d22", receipt: r("gmail","Vela · Series A","6d ago","<mark>data-room link by end of week</mark>","gmail/thread/19a2f") },
  { seq: 147, type: "loop.dismissed", subject: "Newsletter \"re: your reply\"", when: "today · 08:41", hash: "f70d22", prev: "9c2b07", note: "trained — bulk-sender threads aren't asks" },
  { seq: 146, type: "loop.edited", subject: "Devon hiring numbers", when: "yesterday · 17:02", hash: "9c2b07", prev: "4b8801", note: "deadline corrected → before Thu board" },
  { seq: 145, type: "context.ingested", subject: "founder-sent.mbox · 5 messages", when: "yesterday · 16:50", hash: "4b8801", prev: "2e6644", note: "6 loops extracted, locally" },
  { seq: 144, type: "loop.confirmed", subject: "Marcus offer · stuck", when: "yesterday · 11:20", hash: "2e6644", prev: "c10f93" },
  { seq: 143, type: "told.flagged", subject: "Q2 revenue · $42k vs $55k", when: "2d ago · 09:30", hash: "c10f93", prev: "88a1d0", note: "contradiction surfaced" },
  { seq: 142, type: "loop.dismissed", subject: "Recurring standup", when: "2d ago · 09:02", hash: "88a1d0", prev: "5577ab", note: "trained — your own holds aren't commitments" },
];

/* ── The team thread · chief-of-staff view · cross-person loops ─────────────── */
export const team = {
  members: [
    { id: "sam", name: "Sam (you)", role: "CEO" },
    { id: "devon", name: "Devon", role: "COO" },
    { id: "maia", name: "Maia", role: "Chief of Staff" },
  ],
  loops: [
    { from: "Sam", to: "Devon", kind: "owe", title: "Hiring-plan numbers for the board update.", age: "due 2d",
      receipt: r("claude","board-prep","1d ago","<mark>\"send Devon the headcount + burn lines before Thu.\"</mark>","claude/sessions/board-prep.jsonl") },
    { from: "Devon", to: "Sam", kind: "waiting", title: "Updated burn model — you're waiting on it.", age: "waiting 1d",
      receipt: r("slack","#finance","1d ago","<mark>\"burn model refresh coming tomorrow.\"</mark>","slack/C04FIN") },
    { from: "Maia", to: "Sam", kind: "owed", title: "Needs your sign-off on the Northwind SOW.", age: "blocking · 2d",
      receipt: r("slack","#ops","2d ago","<mark>\"SOW ready — need your yes to send.\"</mark>","slack/C05OPS") },
    { from: "Sam", to: "Ana · Vela", kind: "owe", title: "Data room.", age: "due 1d",
      receipt: r("gmail","Vela · Series A","6d ago","<mark>data-room link by end of week</mark>","gmail/thread/19a2f") },
    { from: "Maia", to: "Priya · Northwind", kind: "owe", title: "Design-partner intro (on your behalf).", age: "slipping 9d",
      receipt: r("granola","Northwind kickoff","9d ago","<mark>\"let me make that intro this week.\"</mark>","granola/2026-06-07-northwind") },
    { from: "Devon", to: "Tomas · Granola", kind: "waiting", title: "API scope — Devon's waiting to close the plan.", age: "waiting 3d",
      receipt: r("slack","Granola · partners","3d ago","<mark>\"scoped endpoints by mid-week.\"</mark>","slack/C07PT") },
  ],
};

export const OPS_DISCLOSURE = "Illustrative — one fictional founder's (and team's) week. Nothing is read from a real account.";
