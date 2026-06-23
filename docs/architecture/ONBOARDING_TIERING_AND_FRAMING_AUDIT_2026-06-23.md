# Onboarding tiering + brand↔product↔demo framing audit

*2026-06-23 · decision substrate for Thread 1 (onboarding entry tiering) + Thread 2 (framing reconciliation).*
*Canon-grounded: every on/off-thesis call cites `founder-brain/` with a date. Analysis only — no edits made by this doc. Gates the edits.*

> **Read order this was built from:** `founder-brain/meta/CORPUS_MAP.md` → `strategy/CANONICAL_POSITIONING_FRAME_2026-05-04.md` → `strategy/HARMONIZED_FRAME_AGENT_PROVENANCE_2026-06-12.md` → `liminal-ip/THESIS.md` → `liminal-ip/ARCHITECTURE_CONCEPT_RECONCILIATION_2026-06-17.md` → `decisions/2026-06-22-lift-company-scale-external-gate.md` → the prototype cuts + `liminal-agents/lib/govern/`.

---

## 0. Current canon (the yardstick) — quote + date

| Layer | Canonical NOW | Source + date |
|---|---|---|
| **Operational positioning (leads everywhere)** | "Liminal turns diffuse context into the next move." | `CANONICAL_POSITIONING_FRAME_2026-05-04.md` |
| **Category (externally usable since 2026-06-22)** | "companies at agentic scale" — founders are the *wedge*, this is the *category* | `HARMONIZED_FRAME_2026-06-12.md` (ratified 6-17); gate lifted `decisions/2026-06-22-lift-company-scale-external-gate.md` |
| **Senior investor frame** | Agent-work provenance + privacy invariant: "justify how and why agents did what they did, *without surveilling the human*" | `HARMONIZED_FRAME_2026-06-12.md` |
| **Moat** | Correction-stream (non-convergent, first-party, bounded agents that disagree + refuse-as-routing) | `THESIS.md` §3.3 |
| **Brand register (RESTRICTED USE)** | "Liminal gives form to inner life." — **slide-1 / close brand moment ONLY**, not daily product positioning | `CANONICAL_POSITIONING_FRAME` §public-story principle |
| **Refusal-as-boundary negation** | "Liminal is NOT a wellness app / companion AI / mood tracker" — **this negation move is CANONICAL**, each with its structural reason | `THESIS.md` §"What Liminal Refuses" L357-359 |

**Explicitly retired (off-thesis on current surfaces):**
- "inner-life-led" as the *primary product story* (vs brand-moment use) — `ARCHITECTURE_CONCEPT_RECONCILIATION_2026-06-17.md` §0: re-anchored inner-life-led → operational-wedge-led
- "solo-personal" as the *only* frame (no team/agent-provenance/company-scale dimension)
- "high-stakes operators" as the **category** — SUPERSEDED by "companies at agentic scale" (6-17)
- Banned words (CLAUDE.md): transformation, journey, companion, unlock, manifest, healing, optimize, breakthrough, flourishing, wellness, emotional intelligence, empathic

---

## PART A — THREAD 1: the 7-screen plugin-vs-desktop survival map

**The framing premise to resolve:** the thread asks "is `04-onboarding` the desktop *land*-tier flow, and should the seed be a *new* plugin-first cut (G1)?" But the converged spec already answered the *narrative* side: `SITUATION_PERSONA_TIER_CUT_MATRIX.md` (B1) + `REFACTOR_PLAN_sam-seed-fold.md` (G1) cast `04` as **the plugin first-run entry in Sam's seed sequence** (`04→01→02→10`), and G1 ("plugin surface") as a **new parameter of `00-agency`, not an orphan cut.**

The screen-map below is the *implementation* test the spec didn't run: **which of 04's 7 screens even exist when the surface is a Claude Code plugin** (a terminal flow), not a desktop app?

### What the plugin actually is today (ground truth from code)
- `liminal-agents/.claude-plugin/plugin.json` — `defaultEnabled:false`, ships 3 agents (analyst/auditor/sdr), commands, skills, a SessionStart hook.
- `bin/liminal-plugin-onboard.js` — the SessionStart install moment: a **terminal text beat** that offers the DMG (if built) or the live govern cockpit (`liminal-govern-cockpit.vercel.app`), then points at `/try-liminal`.
- `scripts/setup.js` — `liminal setup`: creates the (SQLCipher) vault, scans candidate streams, prints "→ `npm run govern`".
- **The plugin has NO:** menubar tray, owned background daemon, macOS keychain/permission UI, persistent global `⌘⇧L`, Calendar/screen-activity grant flow. Those are **desktop-app affordances.**

### CORRECTION (2026-06-23, post-investigation of the onboard logic): the plugin onboarding is ALREADY BUILT

The first screen-map pass reasoned only from the plugin's *surface affordances* (no tray/daemon/keychain). That was right but incomplete — it missed that `liminal-agents` ships **two complete onboarding flows** that do the *job* of cut 04's ceremony through different mechanics. Read in full: `lib/onboard/swarm.js` (20KB), `commands/{onboard-swarm,try-liminal}.md`, `skills/{onboard-swarm,try-liminal}/SKILL.md`.

- **`/onboard-swarm` — "beat cold-start" (the seed-the-vault flow).** Each bounded agent reads its canonical source **in parallel**, owned by lane: `git`+`claude-code` → **Analyst**, `granola` → **SDR**, `calendar` → **SDR** (stubbed, honestly held `pending`), `cross-stream` → **Auditor** (goes live only at ≥2 streams). Each posts ONE candidate (the fact/commitment/risk worth acting on). Read-only (does NOT write the vault — that's the daemon), LLM-optional (Opus live, else labeled fixture), partial-result-safe (`Promise.allSettled`). This is the **inverse** of cut 04's S05: instead of granting macOS permissions, it reads what's already on the machine.
- **`/try-liminal` — "the loop in 60s" (the taste flow).** Three agents read one brief, the in-lane one works, the others **refuse verbatim and name the right agent**, the user **corrects one read** via the canonical 9-tag taxonomy (`lib/correction-tags.js`), correction becomes the record. Writes a **throwaway taste vault**, not a real one.

### The map

| # | Screen (cut 04) | What it does | Plugin context | Where it lives in the SHIPPED plugin |
|---|---|---|---|---|
| **S01** | Pilot key | Enter invite key; "what it is / is not" | **REPLACED** | Plugin *enable* IS the consent gate (`defaultEnabled:false`). No key. The "what it is" concept survives as the `/try-liminal` framing. |
| **S02** | Vault (passphrase) | macOS keychain + `vault.db` on local disk | **DESKTOP-ONLY** | `setup.js` creates the SQLCipher vault non-interactively — no passphrase-ceremony UI in a terminal plugin. Desktop owns the keychain step. |
| **S03** | Identity key | Ed25519 keypair, name-this-device | **DESKTOP-ONLY** | Device-identity ceremony is the persistent-install story. Plugin session is ephemeral. |
| **S04** | Daemon | launchd background process, polling cadence | **DESKTOP-ONLY** | `bin/liminal-substrated.js` is the daemon; the plugin does not run launchd. The always-on retention surface. |
| **S05** | Connect a source | Calendar / screen-activity / manual capture, macOS permission grants | **REPLACED & INVERTED** | **`/onboard-swarm`** — reads `git`/`claude-code`/`granola` already on the machine, each owned by its lane agent, instead of granting OS permissions. This is *better* than S05: no permission ceremony, immediate signal. |
| **S06** | The three reads | Analyst/SDR/Auditor lanes, refusal-as-routing | **SHIPPED CORE** | **`/try-liminal`** — fully built, with live correction-capture via the 9-tag taxonomy. This IS the plugin's whole value. |
| **S07** | Day 1 | Empty vault, tray-sigil-over-time | **PARTIAL** | "Install the desktop app to keep your vault" close line is in both skills + the SessionStart hook. The **tray-sigil-over-time** is a desktop-menubar artifact — no tray in a plugin. |

### Survival rollup (corrected)
- **Shipped as the plugin core:** S06 (`/try-liminal`) + S05's *job* done inverted (`/onboard-swarm`).
- **Replaced by a different mechanic:** S01 (enable=consent), S07-persist (install-offer hook).
- **Desktop-only ceremony (4 of 7):** S02 vault-passphrase, S03 identity-key, S04 daemon, S07-tray.

**Corrected implication:** G1 (the plugin-surface cut in the prototype) is **not a thing to invent and not a port of 04** — it is a thing to **render**. The plugin onboarding *already exists and is on-thesis*: enable → `/onboard-swarm` reads your streams (agents post candidates) → `/try-liminal` shows the disagreement + refusal → correct one read → "install the desktop app to keep the vault." A faithful G1 cut is a **screencap of shipped behavior**, which makes it canon-safe by construction (it inherits the agent-work-provenance framing the plugin already has). The earlier "thin entry beat to design" framing under-counted what's built.

### Lane vocabulary: traced — intentional altitude difference, NOT drift

The thread-adjacent worry was that the plugin and cut 04 label the three agents' lanes differently. Traced to ground (`agents/*.md`, `lib/govern/deliberate.js`, `lib/onboard/swarm.js`, cut 04 S06, cut 00-agency):

| Layer | Vocabulary | Source of truth? | Where |
|---|---|---|---|
| **Agent behavior** (canonical) | "your domain: structured analysis…" — described *behaviorally*, no register noun | **YES — the agents carry no `register` field** | `agents/liminal-{analyst,sdr,auditor}.md` |
| **Deliberation register** (display) | **Diligence / Outreach / Judgment** — the *kind of thinking* | decoration | `lib/govern/deliberate.js:79,87,93`; cut 04 S06 (`a-lane`); cut 00-agency |
| **Swarm extraction** (display) | **facts / commitments / risks** — *what each agent pulls from a source* | decoration | `lib/onboard/swarm.js:27-29` |

These are the **same lane at three altitudes**: behavior → register → extraction-output. Diligence *produces* facts; outreach *produces* commitments-as-next-moves; judgment *produces* risk-flags. **They don't compete** — they describe different *moments* of the loop. Cut 04 and cut 00-agency both use the register layer (matching the deliberation). **Verdict: consistent.**

**The G1 build rule that falls out:** label the **onboard-swarm** beat with the *extraction* vocabulary (facts/commitments/risks) and the **try-liminal** deliberation beat with the *register* vocabulary (diligence/outreach/judgment) — because that's exactly how the shipped flows label themselves. Mixing the two in one screen would be the only way to *create* drift.

**Two real findings (not drift, but flag them):**
1. **`granola → SDR` semantic squint (LOW).** The swarm feeds `granola` (meeting notes) and `calendar` to the **SDR**, whose register is "Outreach." A meeting note is a *commitments* source (the swarm's word), which reads fine in the swarm's extraction vocabulary but oddly against "outreach." No fix needed — it's correct in the swarm layer — but G1 must use the swarm's word ("commitments") here, never "outreach," to avoid the squint.
2. **Source-register residue `register: "inner"` (LOW, agents-repo internal).** `lib/sources/granola.js:21` and `lib/sources/claude-code.js:9` tag their source register as `"inner"` — a residue of the retired inner-life framing (`git`=`operational`, `ai-spend`=`governance`). Internal-only, never user-surfaced, so low severity — but it's the one place the retired register still lives in `liminal-agents`. Candidate cleanup for a future agents-repo pass (out of prototype scope).

### What this means for the founder decision (04's role) — revised

| Option | What it implies | Evidence verdict |
|---|---|---|
| **A · 04 = desktop land; G1 RENDERS the shipped plugin flow** | Keep 04 as the desktop install ceremony (refresh expired key). Build G1 as a `00-agency` pane that *depicts the already-built* enable→swarm→try-liminal→install flow — a screencap of shipped behavior, not a new design. | **STRONGEST FIT.** Matches code reality (plugin onboarding exists + is on-thesis), matches REFACTOR_PLAN (G1 = pane of `00-agency`), and is the *smallest, safest* build — it renders truth rather than inventing UI. |
| **B · Reframe 04 itself into the plugin seed** | Strip 04 down. | **WEAK.** Throws away the desktop install ceremony the *desktop* land-tier (B2) still needs; and 04's screens don't match the plugin's actual mechanics anyway. |
| **C · 04 stays desktop, no G1 build now** | Defer the plugin cut. | Viable if the demo doesn't need to *show* the plugin entry. But B1 (Sam seed) opens on the plugin surface, and the flow is already built — rendering it is low-cost, so deferring loses more than it saves. |

> **Recommendation: Option A (strengthened).** Because the plugin onboarding is already built and already on-thesis, G1 is the **cheapest and safest** of the three threads' builds — render the shipped `enable → /onboard-swarm → /try-liminal → install` flow as a `00-agency` pane (`subject=sam-seed`, `surface=plugin`), labeled by the shipped vocabularies (swarm=facts/commitments/risks; deliberation=diligence/outreach/judgment). 04 stays the desktop land-tier; **refresh its expired pilot key** (`expires 2026-06-08` → forward date) regardless.

---

## PART B — THREAD 2: framing reconciliation diff (adjudicated)

Source: full grep sweep of `cuts/` + `lib/` + `onboarding/` + `liminal-agents/lib/govern/`. **Every raw hit was re-checked against canon** — 2 raw findings were FALSE POSITIVES (the negation move and the entry brand-moment are canonical). Adjudicated calls below.

### B.1 — GENUINE off-thesis (recommend fix)

| # | File:line | Verbatim | Issue | Canon basis | Sev | Proposed fix |
|---|---|---|---|---|---|---|
| 1 | `cuts/00-agency.html:280` | "one high-stakes partner call" | "high-stakes" as positioning, era-mixing (line 370 same cut uses canonical "companies at agentic scale") | category superseded 6-17 | MED | "one high-context partner call" or just "one partner call" |
| 2 | `cuts/08-liminal-custody.html:12,20`, `09-osint-custody.html:12,21`, `_template.html:12`, `_console.html:522` | "L3-high-stakes" altitude name | internal taxonomy carries the *retired category noun* | category superseded 6-17 | LOW | Rename altitude token (e.g. `L3-institutional` or `L3-depth-proof`). **Coordinated rename across all 6 — verify no JS keys depend on the string first.** |
| 3 | `cuts/10-today.html:20` (comment) | "backbone journey is Capture→…" | banned word "journey" | CLAUDE.md banned list | LOW | "backbone loop is Capture→…" |
| 4 | `lib/surface-nav.js:14` (comment) | "in journey order" | banned word "journey" | CLAUDE.md banned list | LOW | "in sequence order" |
| 5 | `lib/slate.js:298` | quoted: "don't optimize for the round" | banned word "optimize" — **but it's a QUOTED fictional values-doc**, arguably character voice | CLAUDE.md banned list | LOW | Likely LEAVE (in-quote demo content). Founder call. |
| 6 | `cuts/08-liminal-custody.html:2132` | "Save the rule to unlock CASE-015" | banned word "unlock" (UI verb) | CLAUDE.md banned list | LOW | "Save the rule to open CASE-015" |
| 7 | `cuts/01-slate-tray.html:189` (comment) | "self-healing state" | banned word "healing" (technical CSS comment) | CLAUDE.md banned list | LOW | "self-recovering state" |

### B.2 — FALSE POSITIVES (recommend NO change — flagged by raw sweep, adjudicated on-thesis)

| File:line | Verbatim | Why it's actually ON-thesis |
|---|---|---|
| `cuts/01-slate-tray.html:726` | "Liminal · gives form to inner life." | This is the **entry overlay** (`first-session only`) with an explicit **"Brand-first" register toggle** (L729) and the **on-thesis wedge directly below** (L727: "control plane for companies at agentic scale"). This is precisely the *allowed* slide-1/brand-moment use. The brand line PAIRED WITH the operational wedge is canon-correct. **DO NOT strip** unless founder wants the entry to lead operational-first. |
| `cuts/04-onboarding.html:217-220` | "not a journal app / not a coach / not a productivity tool / not a wellness product" | The **negation-as-boundary move is CANONICAL** (`THESIS.md` §"What Liminal Refuses" L357-359 uses the identical pattern). Cut comment L206 shows it was a deliberate "lead with WHAT IT IS, demote the negations" edit. **This is on-thesis.** |
| `lib/previews.js:174,222`, `lib/slate.js:12` | "journal submission / journalism source / captured journal entry" | "journal" as *factual case-evidence* or an *artifact-type name*, not product positioning. Benign. |
| all `liminal-agents/lib/govern/*.js` | (clean) | The govern pipeline is **fully on-thesis** — AI-spend governance, Analyst/SDR/Auditor, refusal-as-routing. This is the agent-provenance buyer-#1 story. **No drift.** |

### B.3 — The 04-onboarding SOLO-PERSONAL question (the thread's real Thread-2 target)

The thread names 04's "solo-personal" register as off-thesis. **Adjudication: it's scoped-correct, not off-thesis** — *if* 04 stays the **desktop personal-tier** flow (Option A/C above). The desktop app's L1-founder tier IS the personal surface; "your reads, your corrections, local-first vault" is the **privacy-invariant / sovereignty register**, which is *canonical* (`CANONICAL_POSITIONING_FRAME` §sovereignty). The genuine risk is only if 04 is the **sole/primary** onboarding with **no agent-provenance or company-scale dimension visible anywhere** — but S06 (three bounded agents) already carries the agent dimension, and the desktop app is explicitly the founder-*wedge* surface, with team/govern (cut 11) carrying company-scale.

> **Verdict:** 04's personal framing is **on-thesis as the desktop founder-tier**, provided the catalog as a whole shows the company-scale/agent-provenance dimension (it does: `11-govern`, `00-agency`, the slate entry wedge). No reframe of 04's *core* register needed. The only 04 edits: (a) refresh expired pilot key; (b) the LOW banned-word items if any appear in 04 (none found beyond the canonical negations).

---

## PART C — sequencing + branch plan (confirmed with founder)

Founder decisions (2026-06-23): **(1)** decide 04's role after seeing this screen-map; **(2)** demo imminent → Thread 1 build is the priority; **(3)** full prototype sweep for Thread 2.

Resolved order:
1. **This doc** (T1 screen-map + T2 sweep) → founder picks 04's-role option (A/B/C) + approves the B.1 fix list.
2. **Thread 1 build** (gated on #1) — fresh branch off `prototype/main`. Under Option A this is now the *smallest* build: render the shipped plugin flow as a `00-agency` pane + refresh 04's expired key.
3. **Thread 3** (token upstream fix) — DONE: liminal-creative PR #11, fresh branch off main, does NOT touch the parallel `creative-session` worktree.
4. **Thread 2 edits** — folded into Thread 1's branch where they touch cut 04; the non-04 B.1 items (high-stakes rename, banned words) as a **separate PR by concern** off `prototype/main`.

**Branch hygiene note:** every thread starts on its OWN fresh branch off `main`, per the ground rules.

---

## Open questions for founder
1. **04's role:** Option A (recommended — 04=desktop land; G1 *renders the already-built* plugin flow as a `00-agency` pane), B, or C? *(Note: G1 is now known to be a render-the-shipped-flow job, not a design-from-scratch — smaller and canon-safe by construction.)*
2. **Entry brand-moment (`01:726`):** keep "gives form to inner life" as the brand-first entry (canon-allowed), or switch the entry to lead operational-first? (Recommend KEEP — it's the sanctioned brand moment.)
3. **B.1 fix list:** approve all, or hold any (esp. #5 in-quote "optimize", #2 altitude rename which needs a JS-key safety check)?
4. **(new, optional) Source-register residue:** the `register:"inner"` tags on `granola`/`claude-code` sources in `liminal-agents` are retired-framing residue (internal-only). Sweep them in a future agents-repo pass, or leave? (Recommend: note + defer — out of prototype/demo scope.)
