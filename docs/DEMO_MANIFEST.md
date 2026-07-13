# Demo manifest — canonical paths (2026-07-13)

The two demo paths Shruti records and investors receive. Everything else in
`cuts/` is secondary exploration ("Explore the prototype" on the front door).

Claim vocabulary used here and on the surfaces:
**LIVE** (running against real services) · **DOGFOOD** (we use it ourselves) ·
**RECEIPT** (verified artifact of a past event) · **DETERMINISTIC FIXTURE**
(recorded/authored data, same result every run) · **PROTOTYPE** (interaction
choreography, not shipped product) · **DESIGN INTENT** · **ROADMAP**.
Product truth lives in `liminal-desktop`; nothing here claims shipped behavior.

---

## P0 · Cut 11 — Govern (the commercial wedge)

| | |
|---|---|
| **URL** | `cuts/11-govern.html?subject=spend&beat=loop&run=govern-run.json` |
| **Purpose** | Investor/customer proof: governing Opus 4.8 spend against company goals while preserving disagreement, correction, provenance, and the judgment record |
| **Audience** | Investors, design-partner prospects |
| **Fixture** | `cuts/govern-run.json` (`meta.mode: demonstration`; emitted by liminal-agents `govern:emit`) |
| **Claims** | PROTOTYPE choreography · DETERMINISTIC FIXTURE data · RECEIPT: registry attestation demonstrated at Berlin on Algorand TestNet · ROADMAP: product on-chain anchoring · log anchors are illustrative (labeled in-surface) |
| **Guards** | Run badge can never render "live/real run" from fixture metadata; double-ratify closed on button/tab-hop/palette paths; missing fixture falls back to inline demo; visible ↺ restart (also ⌥R / `0`) |
| **Readiness** | **GREEN** (Playwright 14/14 + this session's live verification; founder visual review pending → confirm before first external send) |

## P1 · Cut 01 — Slate & tray (the core mechanic)

| | |
|---|---|
| **URL** | `cuts/01-slate-tray.html` |
| **Purpose** | Canonical front-door mechanic: capture → bounded read with dissent → operator decision → sealed record → re-entry |
| **Audience** | Everyone entering from the front door |
| **Fixture** | Inline scenario substrate ("Founding round · close decision"); vault writes are REAL and device-local (IndexedDB) |
| **Claims** | PROTOTYPE · DETERMINISTIC FIXTURE narrative · artifact hash labeled "Anchor" (illustrative) · vault persistence real, device-local · tray computer-use is ROADMAP (labeled in the embed) |
| **Guards** | Single seal path (double vault write fixed 2026-07-13); vault count monotonic; Defer + re-enter + "Next · govern spend ›" handoff to P0 |
| **Readiness** | **GREEN** (same basis as P0; founder visual review pending) |

## Front door · `index.html`

| | |
|---|---|
| **Purpose** | 10-second orientation for a cold investor + one primary action |
| **Path** | Hero → "See the judgment loop →" (cut 01) → artifact hands off to cut 11; second lead card goes to cut 11 directly |
| **Readiness** | **GREEN** (smoke-tested, zero console errors; favicon added) |

## Readiness matrix (session scope)

| Surface | Functional | Claim-safe | Tests | Founder review | Overall |
|---|---|---|---|---|---|
| Cut 11 canonical | ✅ verified twice-through | ✅ register pass 2026-07-13 | ✅ 14/14 | ⬜ pending | **GREEN**\* |
| Cut 01 canonical | ✅ confirm/defer/handoff | ✅ register pass 2026-07-13 | ✅ | ⬜ pending | **GREEN**\* |
| index.html | ✅ | ✅ orientation + chips | ✅ smoke | ⬜ pending | **GREEN**\* |
| Other cuts / embeds | not audited this session | spot-fixed previously | ✖ none | — | **YELLOW** |

\* GREEN is provisional on founder visual review (the last gate per the
acceptance criteria). Run `npm test` before any recording session.

---

## 90-second narration + click path

Timings assume the recorded take starts on the front door. Total ≈ 85s.

1. **(0:00 · front door)** "Liminal is the judgment layer for AI-assisted
   work — agents read, the accountable human decides, and the decision leaves
   a record you can inspect later." *Click **See the judgment loop →***
2. **(0:10 · cut 01)** "Here's the mechanic. A real decision — closing a
   funding round — lands on the slate. Bounded agents read it: the strategist
   argues take it, the contrarian pushes back. Nothing here pretends to be an
   answer machine." *Let the orbital read run (~10s).*
3. **(0:30)** "I decide. Confirm." *Click **Confirm**.* "The decision seals —
   with the dissent, the correction, and a next action preserved. The vault is
   real: it's writing to this browser, on this device."
4. **(0:40)** "Now the same loop pointed at something a CFO cares about."
   *Click **Next · govern spend ›** on the artifact.*
5. **(0:45 · cut 11)** "A recorded governance run: this team spends $13k a
   month on AI; $4.5k is Opus 4.8. Four registers read the fleet against
   company OKRs." *Point at the reads as they stagger in.*
6. **(1:00)** "Watch the boundary: Diligence refused to read the team's
   content — it audits configuration, never messages. And the adversarial
   reviewer dropped $162 of claimed savings because PR evidence contradicted
   it. Naïve $486 becomes verified $324."
7. **(1:10)** "I disagree with one finding — so I correct it, typed, signed."
   *Expand a finding → **Correct this finding** → pick a kind → sign.*
8. **(1:15)** "Then I ratify. Opus 4.8 can't do calendar work anymore; a
   registry-verified agent takes it at a tenth the cost. The policy is now an
   append-only, hash-linked entry — with my correction in it." *Click
   **Sign & hand off**; show the log tab (`7`).*
9. **(1:25 · close)** "The model gave a read. The system caught an
   overclaim. A human made the call. And the record proves all three."

## Failure recovery (during a take)

- **Cut 11, any misclick / wrong state** → click **↺ restart** (top bar, or
  ⌥R / `0`): clean opening state, deterministic re-run.
- **Cut 11 fixture 404** (URL typo'd) → surface still boots into the inline
  demo loop with the refusal intact; badge stays `demo`. Fix the URL, reload.
- **Cut 01 stale vault count** (prior takes inflate it) → ⌘⇧R clears
  IndexedDB (built-in), reload for the fixture count.
- **Cut 01 entry overlay re-appears** → it's sessionStorage-gated; either
  click through it on camera (it's presentable) or dismiss before recording.
- **General** → both canonical URLs are direct links; a reload never loses
  more than the current take's state.
