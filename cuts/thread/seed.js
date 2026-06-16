/*
 * seed.js · cuts/thread · render-truthful illustrative dataset
 * ──────────────────────────────────────────────────────────────────────────
 * RENDER-TRUTHFUL DISCIPLINE (repo standard — see recent "benchmark honesty" /
 * "render-truthful fidelity" commits): nothing here is read from a real inbox.
 * This is ONE fictional founder's week, hand-authored so the surfaces have
 * something concrete to render. Every cut shows the DISCLOSURE line so seeded
 * is never mistaken for live. The shapes match what the real extraction would
 * return (each item carries a receipt with a source + exact line).
 *
 * VOCAB: allowed terms only — open loops · receipts · owe / owed · what changed
 * · brief · catch / drop / slip. No banned Liminal nouns.
 *
 * SOURCES modeled: gmail · gcal (calendar) · granola (meeting transcript) ·
 * claude (local session log) · slack.
 */

export const DISCLOSURE =
  "Illustrative — one fictional founder's week. No accounts connected; nothing is read from a real inbox.";

const SRC = {
  gmail:   { glyph: "✉", name: "Gmail" },
  gcal:    { glyph: "▦", name: "Calendar" },
  granola: { glyph: "◍", name: "Granola" },
  claude:  { glyph: "◇", name: "Claude session" },
  slack:   { glyph: "▸", name: "Slack" },
};

const r = (src, thread, ago, quote, trace) => ({
  glyph: SRC[src].glyph,
  name: SRC[src].name,
  meta: `${thread} · ${ago}`,
  quote,
  trace,
});

/* ── Open loops · ranked · the first artifact ─────────────────────────────── */
export const openLoops = [
  {
    id: "ol-ana-dataroom",
    kind: "owe",
    title: "You told <b>Ana Okafor</b> you'd send the updated data room by Friday.",
    sub: "No send found in the thread since her ask. Friday is tomorrow.",
    age: "due in 1d",
    person: "Ana Okafor",
    receipt: r("gmail", "Vela · Series A", "6d ago",
      "Happy to take a closer look — could you get me <mark>the updated metrics and the data-room link by end of week?</mark>",
      "gmail/thread/19a2f · from ana@vela.vc · matched: commitment, no completion event"),
  },
  {
    id: "ol-marcus-offer",
    kind: "waiting",
    title: "<b>Marcus Reyes</b> hasn't replied to your offer follow-up.",
    sub: "You nudged once. He opened it twice; no answer in 4 days.",
    age: "waiting 4d",
    person: "Marcus Reyes",
    receipt: r("gmail", "Staff Eng · offer", "4d ago",
      "Wanted to make sure this landed — <mark>let me know if the equity split works or if you want to talk it through.</mark>",
      "gmail/thread/2b71c · to marcus.reyes@… · matched: outbound ask, no reply"),
  },
  {
    id: "ol-priya-intro",
    kind: "owe",
    title: "You promised <b>Priya Nair</b> a design-partner intro — and it's slipping.",
    sub: "Said \"this week\" in the kickoff. That was nine days ago.",
    age: "slipping · 9d",
    person: "Priya Nair",
    receipt: r("granola", "Northwind · pilot kickoff", "9d ago",
      "Yeah, I can connect you with someone who's shipped this before — <mark>let me make that intro this week.</mark>",
      "granola/2026-06-07-northwind · 00:41:18 · matched: spoken commitment, no follow-through"),
  },
  {
    id: "ol-devon-hiring",
    kind: "owe",
    title: "You owe <b>Devon</b> the hiring-plan numbers before the board update.",
    sub: "Board deck is due Thursday; this is the open blocker on it.",
    age: "due 2d",
    person: "Devon Lake",
    receipt: r("claude", "board-prep session", "1d ago",
      "Left a TODO in the session: <mark>\"send Devon the headcount + burn lines before Thu board update.\"</mark>",
      "claude/sessions/board-prep.jsonl · local file · matched: self-commitment"),
  },
  {
    id: "ol-northwind-moved",
    kind: "changed",
    title: "<b>Northwind</b> moved their pilot start to the 22nd.",
    sub: "Pushed a week. Your prep timeline still assumes the 15th.",
    age: "changed 2d",
    person: "Priya Nair",
    receipt: r("gmail", "Northwind · pilot", "2d ago",
      "Small change on our side — <mark>we'll need to push the kickoff to Monday the 22nd.</mark>",
      "gmail/thread/4c19e · from priya@northwind.io · matched: status change vs. prior plan"),
  },
  {
    id: "ol-sara-signoff",
    kind: "owed",
    title: "<b>Sara Kim</b> is waiting on your sign-off to ship the brand pass.",
    sub: "She's blocked. Two days, no decision from you.",
    age: "blocking · 2d",
    person: "Sara Kim",
    receipt: r("slack", "#brand", "2d ago",
      "These are ready whenever you are — <mark>just need a yes/no on the wordmark weight before I ship.</mark>",
      "slack/C03BR/p1718… · from sara · matched: inbound ask, no decision"),
  },
  {
    id: "ol-tomas-scope",
    kind: "waiting",
    title: "Waiting on <b>Tomas Vogel</b> for the Granola API scope.",
    sub: "Your integration plan can't close until this comes back.",
    age: "waiting 3d",
    person: "Tomas Vogel",
    receipt: r("slack", "Granola · partners", "3d ago",
      "Sounds good — <mark>I'll get you the scoped endpoints + rate limits by mid-week.</mark>",
      "slack/C07PT/p1718… · from tomas · matched: their commitment, now overdue"),
  },
  {
    id: "ol-investor-update",
    kind: "owe",
    title: "You said the monthly investor update would go out this week.",
    sub: "Not started. Three asks reference \"the next update\" already.",
    age: "due · this week",
    person: "—",
    receipt: r("gcal", "Investor update", "on your calendar",
      "Recurring hold: <mark>\"Send investor update — first business week.\"</mark> No draft found in Docs or mail.",
      "gcal/recurring/inv-update · matched: scheduled commitment, no artifact"),
  },
];

/* ── Brief · three bands · ≤1 screen ──────────────────────────────────────── */
export const brief = {
  changed: [
    { title: "<b>Northwind</b> moved the pilot kickoff to the 22nd.", receipt: openLoops[4].receipt },
    { title: "<b>Marcus</b> countered on equity — same base, asked for 0.2% more.", receipt: r("gmail","Staff Eng · offer","18h ago","The base works. <mark>Would you have room to move on equity — somewhere around 0.2% more?</mark>","gmail/thread/2b71c · matched: change in an open negotiation") },
    { title: "Your <b>Vela</b> partner meeting is confirmed for Thursday.", receipt: r("gcal","Vela partner mtg","yesterday","Calendar accepted: <mark>\"Vela full-partner review — Thu 2:00pm.\"</mark>","gcal/evt/vela-partners · matched: new event on a tracked thread") },
  ],
  owe: [
    { title: "Data room → <b>Ana Okafor</b>.", meta: "due in 1d", receipt: openLoops[0].receipt },
    { title: "Hiring-plan numbers → <b>Devon</b>.", meta: "due 2d", receipt: openLoops[3].receipt },
    { title: "Design-partner intro → <b>Priya</b>.", meta: "slipping 9d", receipt: openLoops[2].receipt },
  ],
  risk: [
    { title: "Investor update not started — and Thursday's partner meeting will ask for it.", meta: "this week", receipt: openLoops[7].receipt },
    { title: "Granola integration blocked on <b>Tomas</b>'s scope.", meta: "3d", receipt: openLoops[6].receipt },
    { title: "<b>Marcus</b> offer cooling — twice-opened, unanswered 4d.", meta: "4d", receipt: openLoops[1].receipt },
  ],
};

/* ── Prep · upcoming events → one-card briefs ─────────────────────────────── */
export const events = [
  {
    id: "ev-ana",
    time: "Today · 10:00",
    who: "Ana Okafor",
    role: "Partner, Vela Capital · Series A",
    touches: [
      { when: "12d ago", what: "Intro call (warm, via Devon). She asked to see the deck." },
      { when: "6d ago",  what: "You sent the deck + a short note." },
      { when: "6d ago",  what: "She replied: wants the updated metrics + data-room link by Friday." },
    ],
    open: [
      { mk: "you owe", what: "Updated data-room link — due today." },
      { mk: "you owe", what: "Q2 metrics one-pager." },
      { mk: "owed to you", what: "Her read after the Thursday partner meeting." },
    ],
    bring: [
      { what: "The data room, live and shared (close the open loop in the room)." },
      { what: "Q2 numbers — net revenue retention is the line she circled." },
      { what: "The 3 logos closed since the intro call." },
    ],
  },
  {
    id: "ev-marcus",
    time: "Today · 13:30",
    who: "Marcus Reyes",
    role: "Staff Engineer candidate · offer stage",
    touches: [
      { when: "11d ago", what: "Final loop — strong; team wants him." },
      { when: "5d ago",  what: "You sent the offer." },
      { when: "18h ago", what: "He countered: base fine, asked for ~0.2% more equity." },
    ],
    open: [
      { mk: "you owe", what: "A decision on the equity counter." },
      { mk: "owed to you", what: "His verbal yes once the number lands." },
    ],
    bring: [
      { what: "Your real equity band — know the ceiling before the call." },
      { what: "The vesting + refresh story (it's what he's actually asking about)." },
    ],
  },
  {
    id: "ev-priya",
    time: "Today · 16:00",
    who: "Priya Nair",
    role: "Head of Ops, Northwind · pilot",
    touches: [
      { when: "9d ago", what: "Kickoff. You promised a design-partner intro \"this week.\"" },
      { when: "2d ago", what: "She moved the pilot start to the 22nd." },
      { when: "1d ago", what: "Her ops lead asked about the success metrics doc." },
    ],
    open: [
      { mk: "you owe", what: "The design-partner intro (9 days late — lead with this)." },
      { mk: "you owe", what: "Success-metrics one-pager for her ops lead." },
    ],
    bring: [
      { what: "The intro, actually sent before the call — don't promise it again." },
      { what: "A revised timeline anchored to the 22nd, not the 15th." },
    ],
  },
];

/* ── Threads · one subject's receipted history → the open loop ─────────────── */
export const threads = {
  ana: {
    subject: "Ana Okafor",
    label: "Vela Capital · Series A",
    entries: [
      { kind: "decide", when: "12d ago", tag: "intro", what: "Warm intro from <b>Devon</b>. Ana asked to see the deck.", receipt: r("granola","Devon 1:1","12d ago","Devon: <mark>\"I'll loop you in with Ana at Vela — she's the right partner for this.\"</mark>","granola/2026-06-04-devon · 00:12:40") },
      { kind: "commit", when: "6d ago", tag: "you sent", what: "You sent the deck and said the data room would follow.", receipt: r("gmail","Vela · Series A","6d ago","Deck attached — <mark>I'll get you the data room and updated metrics shortly.</mark>","gmail/thread/19a2f · outbound") },
      { kind: "change", when: "6d ago", tag: "she asked", what: "Ana asked for <b>updated metrics + data-room link by Friday</b>.", receipt: openLoops[0].receipt },
      { kind: "change", when: "yesterday", tag: "moved", what: "Partner meeting confirmed for <b>Thursday</b> — the data room needs to be in before it.", receipt: r("gcal","Vela partner mtg","yesterday","<mark>\"Vela full-partner review — Thu 2:00pm.\"</mark>","gcal/evt/vela-partners") },
      { kind: "open", when: "now", tag: "open loop", what: "You owe the <b>data room</b> — due tomorrow, ahead of Thursday.", receipt: openLoops[0].receipt },
    ],
  },
  northwind: {
    subject: "Priya Nair",
    label: "Northwind · pilot",
    entries: [
      { kind: "decide", when: "16d ago", tag: "signed", what: "Northwind signed the pilot.", receipt: r("gmail","Northwind · pilot","16d ago","<mark>\"We're in — let's get the pilot scheduled.\"</mark>","gmail/thread/4c19e") },
      { kind: "commit", when: "9d ago", tag: "you said", what: "At kickoff you promised a <b>design-partner intro</b> \"this week.\"", receipt: openLoops[2].receipt },
      { kind: "change", when: "2d ago", tag: "moved", what: "Priya <b>moved the kickoff to the 22nd</b>.", receipt: openLoops[4].receipt },
      { kind: "open", when: "now", tag: "open loop", what: "Intro still owed (9d) + success-metrics doc requested.", receipt: openLoops[2].receipt },
    ],
  },
  marcus: {
    subject: "Marcus Reyes",
    label: "Staff Eng · offer",
    entries: [
      { kind: "decide", when: "11d ago", tag: "loop", what: "Final loop — strong. Team wants him.", receipt: r("granola","debrief","11d ago","<mark>\"Unanimous — let's get him an offer out.\"</mark>","granola/2026-06-05-debrief · 00:03:10") },
      { kind: "commit", when: "5d ago", tag: "you sent", what: "You sent the offer.", receipt: r("gmail","Staff Eng · offer","5d ago","<mark>\"Thrilled to put this in front of you — offer attached.\"</mark>","gmail/thread/2b71c · outbound") },
      { kind: "change", when: "18h ago", tag: "countered", what: "He countered: base fine, <b>~0.2% more equity</b>.", receipt: brief.changed[1].receipt },
      { kind: "open", when: "now", tag: "open loop", what: "Your move — decide the equity number; he's twice-opened, unanswered 4d.", receipt: openLoops[1].receipt },
    ],
  },
};

export const subjects = [
  { key: "ana", who: "Ana Okafor", label: "Vela · Series A", state: "you owe · due 1d" },
  { key: "northwind", who: "Priya Nair", label: "Northwind · pilot", state: "you owe · slipping 9d" },
  { key: "marcus", who: "Marcus Reyes", label: "Staff Eng · offer", state: "your move · 4d" },
];
