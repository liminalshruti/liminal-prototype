# Maia Founder-OS — Demo Flow Scripts

**Persona:** Maia (founder-operator ICP), Veridian.
**Subject of demo:** Devon DRIFT — Maia reading her part-time cofounder Devon's commit cadence over the past six weeks.
**Cross-checked against:** `identity.json` `_critical_DO_NOTS` (line 129–138), `README.md` (line 105–112 audience matrix).

This file documents three durations of the *same* demo session. The vault state, agent reads, and correction stream do not change between durations — only the framing and which beats are foregrounded.

The architectural fidelity is constant. The wedge phrasing matches the room.

---

## Why Devon DRIFT (not Granola teardown) is the demo's centerpiece

Devon DRIFT shows Liminal's most adversarial pattern in its most legible form:

- **The operator is reading a teammate without surveilling them.** The four-view matrix at `liminal-prototype/design-system/docs/relationship-axis.md` is operationalized: Maia (operator) sees the pattern; Devon (subject) sees his own audit chain; a peer (Sam) sees nothing about Devon; oversight sees the read happened but not the content. This is the architecture-as-ethics claim made visible.
- **It captures the relationship density that drives Liminal's category claim.** Founder + part-time technical cofounder + asynchronous Slack + occasional video co-founder dailies — the substrate density Liminal's bounded-agent architecture is built for, made narratively concrete.
- **It demonstrates the correction-stream-as-moat in one beat.** When Maia disagrees with the AI's first read (which is the literal moment that produces a Tier 1 correction), the disagreement enters the vault and sharpens future reads. This is the moat in action, in one screen-recording-able moment.

Granola teardown is the warm-up. Devon DRIFT is the closer.

---

## Stable session anchor (used in all three durations)

**Calendar:** Tuesday afternoon, ~3:42pm local (Austin).
**Session context:** Maia opened Veridian to check the day's reads before her 4pm cofounder daily with Devon. She'd skipped Monday's daily.
**Recalibration counter:** 3 pending corrections from last week's reads.
**Vault state at open:** 12 events ingested, 3 active reads, last surfacing event 14 minutes ago.
**Daemon mode:** passive · ingest only.

**Ingest signals visible in the rail:**
1. Granola — "Coffee with Maya · Northstar" (2h ago · 2.1k words) [Note: "Maya" here is a contact in Maia's professional network, not the persona — verifying this isn't broken canon, the contact is a non-Liminal-team named entity local to this synthetic event]
2. Obsidian — `research/competitors/granola-teardown.md` (4h ago · 612 words)
3. Apple Reminders — "Tuesday · investor call prep" (scheduled · pending)
4. Claude Code — `user_message · IL-12 application draft` (today · 28 min total)
5. Git — `feat: bounded refusal in agent prompts` (3h ago · 124 lines · authored by **Devon**)
6. Linear — `commits/devon · 6-week sparkline` (continuously ingested)

The Linear sparkline is the *foreground* substrate for Devon DRIFT. Maia clicks it.

---

## What Maia sees in the Devon DRIFT tile

The Devon DRIFT tile is the canonical *sparkline-with-disposition* primitive (see `liminal-prototype/design-system/docs/relationship-axis.md:150-154` Operator view).

The tile shows:

- **Header:** "Devon · cofounder · 6-week pattern read"
- **Sparkline:** Six weekly bars — commit count by week. Weeks 1–4 are baseline (8–11 commits/week). Week 5 drops to 4. Week 6 drops to 2.
- **Eyebrow disposition (AI's read):** "narrowing — not stopping"
- **Three bounded reads, surfaced as disagreement:**
  - **Architect** read: "Devon's pace has narrowed but the commits that landed are higher-scope (refactor in `agents/bounded.js`, schema bump). Pattern shape is *focusing*, not *fading*."
  - **Witness** read: "Two consecutive weeks of >50% reduction in commit cadence is significant. If this were any other contractor, you'd ask why. The relationship shape (cofounder, part-time at fintech) is the reason you haven't."
  - **Contrarian** read: "The Architect is reading code-shape; the Witness is reading cadence-shape. Both are correct. The disposition shouldn't try to reconcile them. The disposition is: *ask Devon at 4pm what changed five weeks ago.*"

This is the load-bearing beat. The three agents do not agree, and the correct disposition is *not the synthesis*. It's the question the operator should ask.

---

## 90-second cut — Speedrun / video upload register

**Purpose:** Single-take screen recording for partner-walkthrough video, deploy-form preview, conference lightning slot.
**Tagline mode:** Speedrun register — "An inner workspace for solo operators running agentic teams."
**Audience expectation:** They've seen 50 AI demos this month. They want to see one architectural commitment, not a feature tour.

### Beat sheet (cuts are seconds since record-start)

- **0:00–0:08 — Open vault. Speak over the daemon.**
  > "It's Tuesday. I have a 4pm cofounder daily in fifteen minutes. I haven't read his commits in a week."
- **0:08–0:18 — Click the Devon sparkline tile.**
  > "Veridian's been watching Devon's commit cadence for six weeks. Three agents read it. They disagree."
- **0:18–0:45 — Surface the three reads.** Architect, Witness, Contrarian text in sequence. Pause for half a beat between reads. No music.
  > "Architect says: narrowing, not fading. Witness says: this is a real drop. Contrarian says: don't reconcile — ask him."
- **0:45–0:60 — Surface the disposition card.**
  > "The system doesn't tell me what to think. It tells me what to ask."
- **0:60–0:75 — Maia types into the correction stream:** "Devon's MICRO submission deadline is Apr 28. Of course he's narrowing." Hit `↵ keep`.
  > "I just disagreed with the AI. That disagreement entered the vault. Next week's read will know."
- **0:75–0:88 — Beat of silence on the disposition tile, now stamped *corrected · entered vault*.**
- **0:88–0:90 — Close.**
  > "This is how Veridian stays sharp."

**What this 90 seconds does not show:** any agent's reasoning chain past the surface read; the audit-chain hash; the four-view matrix breakdown; the packet artifact. Those are downstream of the 90-second hook. The hook is: agents disagree, the operator decides, the disagreement is the moat.

**Voiceover discipline:**
- No filler ("you can see here", "as you can tell").
- No category words ("transformation", "journey", "intelligence layer" — though "operational knowledge layer" is on-brand).
- No tagline-of-the-quarter ("AI that works for you", etc.). The system's behavior IS the pitch.

---

## 5-minute cut — Landing page demo / cold partner preview register

**Purpose:** Embedded video on `theliminalspace.io/demo`, partner async preview, asynchronous channel send.
**Tagline mode:** Primary — "Operational knowledge layer for solo operators running agentic teams."
**Audience expectation:** They want enough to decide whether to take a 30-minute live walkthrough.

### Three-act structure

#### Act 1 — Substrate density (0:00–1:30)

Open vault. Maia narrates the ingest rail.

> "Six different surfaces have produced typed events for me today. A coffee transcript. A competitive teardown I drafted last night. An investor-prep reminder. A Claude Code session on my IL-12 application. A Git commit Devon landed three hours ago. And a continuously-ingested commit pattern from Devon's GitHub.
>
> Each one is a *typed event*. The vault knows what shape it is. The agents know what they're allowed to read."

This is the YC #4 / #15 architectural-layer claim made visible: not search, not chatbots — typed event log + bounded specialists.

Foreground: the *recalibration in 3* counter at the top. Maia points to it.

> "Three corrections from last week are waiting for me to resolve. The system doesn't move on without me."

#### Act 2 — Devon DRIFT (1:30–4:00)

Click the Devon sparkline tile. Hold on the disposition.

> "Devon's my cofounder. He's part-time — staff eng at a regulated fintech. He committed to Veridian on April 21st. He's been ramping; I've been pulling.
>
> Veridian's been watching the shape of his commits — not the content. *Cadence and scope.* Three agents read the same six-week window."

Surface Architect → Witness → Contrarian reads one at a time. Pause on the disagreement frame.

> "Two of my agents disagree with each other and the third one refuses to synthesize them. This is the system telling me: there isn't a right answer. There's a right question.
>
> The disposition is: *ask Devon what changed five weeks ago.*"

Open the audit-chain pane briefly. Show the four-view matrix surface:

> "Three things matter about this read. One — Devon can see his own audit chain. Two — Sam, on my team, sees nothing about Devon. Three — if oversight ever checks, they see *that I read* but not *what I learned*.
>
> This is how Liminal stays a *reading tool*, not a *surveillance tool*. The shape of the relationship is the shape of the read."

#### Act 3 — The correction enters the vault (4:00–5:00)

Maia types into the correction stream.

> "Devon's distributed-systems paper has a submission deadline on April 28th. He's been narrowing on the paper. The Witness's read isn't *wrong* — it's *uncalibrated*. So I'm telling the vault: this five-week-ago window had a known stressor."

Hit `↵ keep`. The disposition tile flips to `corrected · entered vault`. The recalibration counter drops to 2.

> "I just made the system smarter. Not by tuning a model. By disagreeing with it on the record. Every correction sharpens every future read. That's the moat."

Close on the vault summary.

> "Twelve events ingested today. Three reads surfaced. One correction landed. One question to bring into the 4pm daily.
>
> This is Veridian."

**What the 5-minute cut does not show:** the deliberation interior (the agents' full reasoning chains); the packet artifact (Board Decision Packet — that's for the YC longform); the full IL-12 application flow. Those are for the 15-minute walkthrough.

---

## 15-minute cut — Live partner walkthrough register

**Purpose:** Cold partner walkthrough (Inflection Lab partner, YC partner, journalist). Maia screen-shares Veridian and runs a real session.
**Tagline mode:** Chooses the right register for the room. YC partner → "Company Brain for the founder before the company exists." Inflection Lab → "Inner workspace for solo operators running agentic teams." Journalist → primary tagline.
**Audience expectation:** They want to understand the architectural commitment AND see the packet artifact AND have time to ask three questions.

### Six-beat shape

Beats 1–4 are the 5-minute cut, walked through more slowly with the partner. Beats 5–6 are net new for the 15-minute register.

#### Beat 1 — Substrate density (2:00)

Same as 5-minute Act 1. Slow down. Partners interrupt with "what's that?" → the answer is *"a typed event from `<source>` with `<schema_version>`. Want to see the schema?"* Always say yes; clicking through to the JSON-Schema file in the vault is a 10-second beat that lands the "the substrate is inspectable" claim.

#### Beat 2 — The three corrections waiting (2:00)

Pull up the recalibration pane. Three corrections from last week.

> "I haven't resolved these. Until I do, the system won't move on. This is the part that's different — the system doesn't *converge* on me. It waits."

This is the load-bearing differentiation from RAG / chatbots / personalization layers. *The system pauses for the human's calibration.* Read each correction's substrate and walk the partner through one resolution in real time.

#### Beat 3 — Devon DRIFT (3:00)

Same as 5-minute Act 2. Pause longer on the disagreement panel. If the partner asks "is this two LLMs prompted differently?" the answer is *"three bounded specialists with anti-domains — Architect can't read cadence, Witness can't read code-shape, Contrarian's job is to refuse synthesis when the disagreement is load-bearing. Each one is one prompt + one anti-domain + one set of evidence anchors. The prompts are in `lib/agents/*` in the open-source repo if you want to read them."*

#### Beat 4 — Correction enters the vault (1:30)

Same as 5-minute Act 3. Slow the keep-in-vault beat. Hit the audit-chain expand.

> "This correction is now SHA-256 anchored against the read it disagreed with. If you ever need to verify what I knew when — when I decided to extend Devon's runway, when I priced the friend's-equity ask — this anchor chain is the receipt. Local-first. Encrypted. Mine."

#### Beat 5 — The Board Decision Packet (3:30) **[NEW IN 15-MINUTE CUT]**

This is the deliverable Veridian charges $49 for, or unlimited via Founder OS subscription (per identity.json line 70).

Generate the Board Decision Packet for today's session. The packet is the bridge between substrate (correction stream + bounded agents + vault) and deliverable (what the user pays for) — per `liminal-ip/06-evidence/INVENTIONS.md` §10.

Walk through the packet structure: eyebrow + title + disposition · the single decision · twelve bounded reads · refusals (with named-route) · disagreements (with evidence anchors) · the correction taxonomy applied · audit chain · outcome strip.

> "I send this packet to my advisor before tomorrow's call. He can verify every read against the underlying event. He doesn't have to trust my summary. He can read the receipt."

This is the moment where partners realize Veridian is shipping a *thing* the buyer can hold, not a feature.

#### Beat 6 — Architecture-as-ethics close (3:00) **[NEW IN 15-MINUTE CUT]**

Click into the four-view matrix demo (`liminal-prototype/design-system/docs/relationship-axis.md`).

> "Four views of the same read. Operator view is what I just walked you through. Subject view — Devon's view — shows him *that I read* and *the audit chain*, but not *which agent flagged what*. Peer view — Sam, on my team — shows nothing. Devon's not exposed laterally. Oversight view — if Veridian were ever subpoenaed — shows *that I read* but not *content*.
>
> This isn't a privacy feature. It's the *shape of legibility* the architecture commits to. Reading without surveilling. The four views are not skins on the data — they're four projections from the same access-control substrate.
>
> If you read the open-source liminal-agents code, you can verify this. The view-projections are in `cuts/`. The vault schema is locked. Nothing about this is brittle."

Close on a single line:

> "Veridian is what Liminal looks like at the solo-operator scale. The same architecture scales to companies. The wedge is the founder, because the substrate density is the same architectural load."

**Three-question budget (15-minute register):**
- Q1: "How does this differ from `<competitor>`?" → "They build one of these primitives. We integrate four — typed event log + bounded specialists + correction stream + four-view matrix. The integration is the moat."
- Q2: "Why local-first?" → "Three reasons: compliance signal for the regulated buyer; correction-stream IP stays with the operator not the vendor; offline is a feature for founders on planes and in coffee shops."
- Q3: "How big is the team?" → "Solo founder + part-time technical cofounder. Devon's papers are in distributed systems, mine's in the open-source repo. The architecture is small enough to read in an afternoon. That's the point."

---

## Voiceover discipline (applies across all three cuts)

**Use:**
- "ingested", "typed", "bounded", "refused", "named-route", "disposition", "audit chain", "correction", "recalibration", "evidence anchor", "vault", "rail", "sparkline".
- "Maia / Devon / Veridian / Inflection Lab / AgentScale / Argus" — all synthetic, all in identity.json.
- "Three agents read your state. They disagree." — direct echo of the liminal-agents brand voice.

**Don't use:**
- "AI companion", "intelligence layer that learns about you", "personalized", "transformation", "journey", "unlock", "wellness", "emotional intelligence" (banned via `~/.claude/hooks/banned-words.sh`).
- "Liminal gives form to inner life" — Liminal's real one-line pitch. Veridian's tagline is structurally different. (`_critical_DO_NOTS` line 136.)
- Any real venture name (a16z, YC, Speedrun, Anthropic, OpenAI, Sequoia). (`_critical_DO_NOTS` line 131.)
- Any real partner name. (`_critical_DO_NOTS` line 132.)
- Any real company name where Shruti or Shayaun worked (Asana, Cloudflare, Robinhood, Ancestry, Rubrik, etc.). (`_critical_DO_NOTS` line 133.)
- "Heron" — Liminal's real paper. Veridian's paper is *Argus*. (`_critical_DO_NOTS` line 134.)

**Tone:**
- Short declaratives.
- No hedging ("we think", "it might").
- No qualifying disclaimers ("of course, real founders have different needs").
- The system's behavior is the pitch; the voiceover names what's happening, doesn't sell it.

---

## What still needs to be built before any of these cuts can record

- `snapshots/` — the six typed event files (.eml × 2, meeting-transcript × 1, PR thread × 1, paper-draft preamble × 1, application-draft × 1) the demo session ingests
- `corrections/trail.jsonl` — the correction stream the session reads from (3 pending entries) and writes to (1 new entry mid-session)
- `corrections/decisions.jsonl` — the Tier 1/2 substrate-correction decisions log
- `expected-vault-state.jsonl` — post-session vault state for verification

The cuts above describe the *shape* of the demo. The substrate that makes them screen-recordable is the next construction milestone.

---

## Versioning + cross-reference

- This document is `demo-script.md` in `personae/maia-founder-os/`. The README at line 137 names it as expected.
- The four-view matrix it references is canonical at `liminal-prototype/design-system/docs/relationship-axis.md:150-154` (Maia/Devon/Sam line).
- The packet abstraction it ships in Beat 5 is canonical at `founder-brain/liminal-ip/06-evidence/INVENTIONS.md` §10.
- The Devon DRIFT scenario IDs (`devon_eng`, `manager_devon_drift`) are canonical in `liminal-prototype/v0_3_config.js`.
- Canon entry for the rename that produced this persona shape: `~/.claude/projects/-Users-shrutirajagopal-liminal/memory/project_demo_pseudonyms_canonical_2026-05-13.md`.

When any of those upstream sources change, this script must be re-checked. The script does not own the substrate; it ships it.
