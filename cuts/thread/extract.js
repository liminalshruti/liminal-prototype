/*
 * extract.js · cuts/thread · REAL client-side open-loop extraction
 * ──────────────────────────────────────────────────────────────────────────
 * Not seeded. This actually parses whatever text you drop — an .mbox/.eml mail
 * export, an .ics calendar, or plain text — and computes open loops in the
 * browser, no backend. Same render-truthful precedent as cut 09 (which runs the
 * real OSINT kernel client-side): the loops shown are derived from the bytes you
 * gave it, with each receipt pointing at the exact line it matched.
 *
 * Grounding · LIMINAL_RECOVERY_PLAN_DIFFUSE_CONTEXT_2026-06-12 §2
 *   v1 inputs: Gmail · Calendar · Granola · Claude session logs ("first artifact,
 *   first session, on their data"). This is the deterministic core of that.
 *
 * Heuristic, not an LLM: pattern-matched commitment / ask / their-commitment
 * detection over parsed messages. Honest about what it is (the cut discloses it).
 */

const COMMIT = /\b(i['’]?ll|i will|i can get|let me (send|get|put|share|make|follow|have|set|pull|draft|loop|circle|grab)|i['’]?m going to|i['’]?m gonna|we['’]?ll|we will|happy to (send|get|put|share|make|set up|intro)|will send you|will get you|i owe you|on it,)\b/i;
const DEADLINE = /\b(by\s+(end of (the )?(day|week)|eod|eow|tomorrow|today|mon(day)?|tue(s|sday)?|wed(nesday)?|thu(rs|rsday)?|fri(day)?|sat(urday)?|sun(day)?|next week|the \d{1,2}(st|nd|rd|th)?)|this week|by tomorrow|by today|by \d{1,2}\/\d{1,2})\b/i;
const ASK_TAIL = /\?\s*$/;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function detectFormat(text, filename = "") {
  const f = filename.toLowerCase();
  if (f.endsWith(".ics") || /^BEGIN:VCALENDAR/m.test(text)) return "ics";
  if (f.endsWith(".mbox") || /^From \S+@?\S* /m.test(text)) return "mbox";
  if (/^From:\s/m.test(text) || f.endsWith(".eml")) return "eml";
  return "text";
}

function header(block, name) {
  const m = block.match(new RegExp(`^${name}:\\s*(.+)$`, "im"));
  return m ? m[1].trim() : null;
}
function bodyOf(block) {
  const i = block.search(/\r?\n\r?\n/);
  return (i === -1 ? block : block.slice(i)).trim();
}
function addr(s) { const m = s && s.match(/[\w.+-]+@[\w.-]+/); return m ? m[0].toLowerCase() : (s || "").trim(); }

function parseMessages(text, fmt, filename) {
  const norm = text.replace(/\r\n/g, "\n");
  let blocks;
  if (fmt === "mbox") {
    blocks = norm.split(/\n(?=From \S+ )/).filter(b => b.trim());
  } else if (fmt === "eml") {
    blocks = norm.split(/\n\n(?=From:\s)/).filter(b => b.trim());
    if (blocks.length === 0) blocks = [norm];
  } else {
    // plain text / transcript: treat the whole thing as one "message"
    return [{ from: filename || "dropped text", to: "", subject: filename || "text", date: "", body: norm.trim() }];
  }
  return blocks.map(b => ({
    from: header(b, "from") || "unknown",
    to: header(b, "to") || "",
    subject: header(b, "subject") || "(no subject)",
    date: header(b, "date") || "",
    body: bodyOf(b),
  }));
}

function sentences(body) {
  return body
    .replace(/^>.*$/gm, "")            // drop quoted history
    .split(/(?<=[.!?])\s+|\n+/)
    .map(s => s.trim())
    .filter(s => s.length > 8 && s.length < 320);
}

function ownerOf(messages) {
  const counts = {};
  for (const m of messages) { const a = addr(m.from); counts[a] = (counts[a] || 0) + 1; }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
}

function shortDate(d) {
  if (!d) return "no date";
  const m = d.match(/(\d{1,2}\s+\w{3}\s+\d{4})|(\w{3},?\s+\d{1,2}\s+\w{3}\s+\d{4})|(\d{4}-\d{2}-\d{2})/);
  return m ? m[0] : d.slice(0, 24);
}

/* Email/text → loops */
function extractMail(messages, filename) {
  const owner = ownerOf(messages);
  const loops = [];
  let scanned = 0;

  messages.forEach((msg, mi) => {
    const speaker = addr(msg.from);
    const isOwner = speaker === owner;
    const who = (msg.from.match(/^[^<]+/) || [speaker])[0].trim().replace(/"/g, "") || speaker;
    const recip = (msg.to.match(/^[^<]+/) || [addr(msg.to)])[0].trim().replace(/"/g, "") || addr(msg.to);

    for (const s of sentences(msg.body)) {
      scanned++;
      const isCommit = COMMIT.test(s);
      const isAsk = ASK_TAIL.test(s) && s.split(" ").length >= 4;
      if (!isCommit && !isAsk) continue;

      const dl = (s.match(DEADLINE) || [])[0];
      let kind, title, trace;

      if (isCommit && isOwner) {
        kind = "owe";
        title = `You told ${recip || "someone"} you'd follow through${dl ? ` — <b>${esc(dl)}</b>` : ""}.`;
        trace = `matched: first-person commitment${dl ? " + deadline" : ""} · your message`;
      } else if (isCommit && !isOwner) {
        kind = "waiting";
        title = `<b>${esc(who)}</b> said they'd get back to you${dl ? ` — ${esc(dl)}` : ""}.`;
        trace = `matched: their commitment${dl ? " + deadline" : ""} · inbound`;
      } else { // ask
        kind = isOwner ? "waiting" : "owed";
        title = isOwner
          ? `You asked ${recip || "someone"} a question — awaiting reply.`
          : `<b>${esc(who)}</b> asked you a question — needs an answer.`;
        trace = `matched: ${isOwner ? "outbound" : "inbound"} question`;
      }

      loops.push({
        kind,
        title,
        sub: `“${esc(s.length > 120 ? s.slice(0, 117) + "…" : s)}”`,
        age: dl ? esc(dl) : (kind === "owe" ? "open" : "waiting"),
        receipt: {
          glyph: "✉", name: "file", meta: `${esc(msg.subject)} · ${shortDate(msg.date)}`,
          quote: esc(s).replace(COMMIT, (m) => `<mark>${m}</mark>`),
          trace: `${esc(filename)} · msg ${mi + 1}/${messages.length} · ${trace}`,
        },
      });
    }
  });

  // rank: owe first, then waiting/owed; dedupe identical titles
  const seen = new Set();
  const order = { owe: 0, owed: 1, waiting: 2, changed: 3 };
  return loops
    .filter(l => { const k = l.title + l.sub; if (seen.has(k)) return false; seen.add(k); return true; })
    .sort((a, b) => (order[a.kind] - order[b.kind]))
    .slice(0, 12);
}

/* ICS → upcoming-meeting loops */
function extractIcs(text, filename) {
  const events = [...text.matchAll(/BEGIN:VEVENT([\s\S]*?)END:VEVENT/g)].map(m => m[1]);
  return events.map((ev, i) => {
    const sum = (ev.match(/SUMMARY:(.+)/) || [])[1]?.trim() || "(untitled event)";
    const dt = (ev.match(/DTSTART[^:]*:(.+)/) || [])[1]?.trim() || "";
    const date = dt.replace(/(\d{4})(\d{2})(\d{2}).*/, "$1-$2-$3");
    return {
      kind: "owe",
      title: `Prep for <b>${esc(sum)}</b>.`,
      sub: `Upcoming meeting — assemble what's open before it.`,
      age: esc(date || "upcoming"),
      receipt: { glyph: "▦", name: "file", meta: `${esc(filename)} · event ${i + 1}`,
        quote: `<mark>${esc(sum)}</mark> — ${esc(date)}`, trace: `${esc(filename)} · VEVENT ${i + 1}/${events.length}` },
    };
  }).slice(0, 12);
}

export function extractFromText(text, filename = "dropped.txt") {
  const fmt = detectFormat(text, filename);
  if (fmt === "ics") {
    const loops = extractIcs(text, filename);
    return { fmt, loops, stats: { units: loops.length, kind: "calendar events", source: filename } };
  }
  const messages = parseMessages(text, fmt, filename);
  const loops = extractMail(messages, filename);
  return { fmt, loops, stats: { units: messages.length, kind: fmt === "text" ? "text block" : "messages", source: filename } };
}
