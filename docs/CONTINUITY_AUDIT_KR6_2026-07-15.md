---
id: kr6-continuity-audit
type: audit
krs: [KR6]
date: 2026-07-15
audit_date: 2026-07-15
pin: d0c81dc
prototype_hash: e7e5386
status: complete
result: ZERO_CONTRADICTIONS_EVIDENCED
---

# KR6 Continuity Audit — Demo-to-Product Alignment

**Period:** 2026-07-15
**Pin (desktop):** `d0c81dc` ("Make the update check manual-only…", ancestor of `liminal-desktop` origin/main)
**Prototype HEAD:** `e7e5386` ("fix(index): retire control-plane framing…")
**Build bar:** every capability presented as **NOW** in prototype cut-11 is present in the pinned pilot build `d0c81dc`; fixture/vision beats remain labeled and never badged as a live run.

> **Verification note (orchestrator pass, 2026-07-15):** an earlier draft of this audit
> concluded KR6 was satisfied *vacuously* — "cut-11 makes zero NOW claims, so the desktop
> comparison is N/A." That reasoning was wrong: cut-11 asserts one capability in the present
> tense as **real** (device-local vault sealing / outcome recording). The desktop comparison
> was therefore required and has now been performed against `d0c81dc`. KR6 still passes — but
> because the one real claim is **backed in the pinned build**, not because there was nothing
> to check. The verdict is unchanged; the evidence is now real.

---

## Executive Summary

**RESULT: ZERO CONTRADICTIONS (evidenced against `d0c81dc`)** ✓

Cut-11 (`cuts/11-govern.html`, the commercial-wedge demo, P0) presents capabilities in three
registers, and the KR6-relevant distinction is which register each sits in:

- **PROTOTYPE choreography** — interaction shape, not a shipped-product claim (agent reads,
  correction affordance, sign-and-hand-off motion).
- **DETERMINISTIC FIXTURE / RECEIPT** — recorded or authored data, correctly labeled as such
  (the `$13,045 → $4,500` reconciliation, the E14/PR-103 `$162` adversarial catch, the
  Algorand TestNet proof).
- **ROADMAP** — forward-looking, labeled in-surface (on-chain anchoring; registry attestation).
- **NOW / present-tense capability claim** — asserted as a real product property. There is
  **exactly one**: device-local vault sealing + outcome recording ("vault persistence real,
  device-local"; user-facing "sealed to vault · device-local"; "makes the vault's calibration
  real"). This is the only claim that KR6's build bar puts under test — and it is present in
  `d0c81dc` (see the continuity table below).

The claim-register lock (lines 1295–1340 in `cuts/11-govern.html`) additionally guarantees the
run badge can never render "live"/"real" from fixture metadata — it renders only "demo",
"demonstration run", or "recorded run · fixture". That lock keeps the *fixture* beats honest;
it is separate from the present-tense *capability* claim audited above.

---

## Capabilities Inventory (Cut 11)

| Capability | Register in Cut 11 | Explicit label / copy | Desktop check @ `d0c81dc` |
|---|---|---|---|
| **Agent reads** (4 registers: Diligence, Outreach, Synthesis, Judgment) | PROTOTYPE choreography | line 12: "PROTOTYPE choreography" | Not a NOW claim — choreography only |
| **Correction flow** ("Amend read", correct findings) | PROTOTYPE choreography | line 12 | Not a NOW claim — choreography only |
| **Sealing/ratification** motion (Sign & hand off) | PROTOTYPE choreography | line 12 | Not a NOW claim — choreography only |
| **Vault persistence / outcome sealing (device-local)** | **NOW — asserted "real"** | line 35 "vault persistence real, device-local"; lines 899/987/989 user copy "sealed to vault · device-local"; line 977 "makes the vault's calibration real" | **PRESENT** — `src-tauri/src/commands/vault.rs`, `src-tauri/src/commands/outcomes.rs`, migration `src-tauri/src/db/migrations/024_packet_outcomes.sql`, `src-tauri/tests/vault_sqlcipher_integration.rs` (encrypted device-local), `src-tauri/tests/vault_integration.rs`, `docs/testing/restart-persistence-wsc155.md`. `DegradedBanner` ("we are NOT writing the real vault") confirms an explicit real-vault write path + fallback. **CONSISTENT** |
| **OKR allocation bar** | FIXTURE (inline) | labeled demo | Fixture — no NOW claim |
| **Spending reconciliation** ($13,045 → $4,500) | DETERMINISTIC FIXTURE | "Fixture figures from the recorded liminal-govern run" | Fixture — no NOW claim |
| **Adversarial reviewer catch** (E14/PR-103 $162 drop) | RECEIPT (recorded artifact) | lines 15–16 | Receipt — no NOW claim |
| **Registry** (verified agents + reputation) | ROADMAP + PROTOTYPE | line 1141 | Roadmap — labeled forward-looking |
| **Decision log** (hash-linked, append-only, on-chain anchor) | ROADMAP (anchoring) | line 1146 "anchors shown are illustrative (deterministic fixture); the product chain anchors with SHA-256"; run receipts read "local · local-first (not yet on-chain)" | Roadmap — on-chain anchoring honestly deferred; **CONSISTENT** |
| **Verification badges** (Algorand TestNet proof) | RECEIPT + ROADMAP | line 1141 "receipt: demonstrated at Berlin on Algorand TestNet · product anchoring is roadmap" | Receipt/roadmap — no NOW claim |

---

## Continuity Table: present-tense claims → desktop presence

KR6's build bar tests capabilities presented as NOW. There is one:

| Capability asserted NOW in cut-11 | Cut-11 evidence | Present in `d0c81dc`? | Verdict |
|---|---|---|---|
| Device-local vault sealing + outcome recording is real | line 35; user copy lines 899/987/989/977 | **Yes** — `commands/vault.rs` + `commands/outcomes.rs` + migration `024_packet_outcomes.sql` + `vault_sqlcipher_integration.rs` (encrypted, device-local) + `restart-persistence-wsc155.md` | **CONSISTENT** |
| On-chain anchoring (decision-log chain) | line 1146; receipts "not yet on-chain" | Labeled ROADMAP in-surface, not asserted NOW | **CONSISTENT (correctly deferred)** |

**Contradictions found: 0** — the single present-tense capability claim is backed by shipped
code at the pin; the one deferred capability (on-chain anchoring) is labeled roadmap, not NOW.

---

## Claim-Register Lock Verification

The prototype enforces the claim-register lock at lines 1295–1340 of `cuts/11-govern.html`:

```javascript
// claim register: every ?run= payload is a recorded artifact — the badge may never
// render "live"/"real" regardless of what the fixture's meta.mode claims.
const RUN_LABELS={demo:'demo',demonstration:'demonstration run',recorded:'recorded run · fixture'};
function runLabel(){return RUN_LABELS[RUN_MODE]||RUN_LABELS.recorded;}
```

**Impact:** no user interaction with cut-11 can produce a run badge that says "live" or "real".
The badge renders only `demo`, `demonstration run`, or `recorded run · fixture`.

**Gate:** ✓ LOCKED — the `runLabel()` machinery was left unmodified by this audit (it is a
product-safety wall; only individual claim *copy* is in scope for KR6 remediation, and none
needed changing).

---

## KR6 Build-Bar Checklist

✓ **Every capability presented as NOW in prototype cut-11 is present in the pinned pilot build `d0c81dc`**
  - NOW-claim capabilities identified: 1 (device-local vault sealing / outcome recording)
  - Present at pin: 1 / 1 (`vault.rs`, `outcomes.rs`, migration `024`, sqlcipher integration test)
  - Contradictions: 0
  - Status: **PASS (evidenced)**

✓ **Fixture/vision beats remain labeled and never badged as a live run**
  - Claim-register lock enforced (lines 1295–1340); on-chain anchoring labeled roadmap
  - Run-badge lock confirmed by Playwright (14/14, zero "live"/"real" badges)
  - Status: PASS

◻ **Interface bar: stage-1 screen share → stage-2 install preserves vocabulary, correction terms, design canon, comparable polish**
  - This is a founder visual/interface judgment, not a code check — **FOUNDER-GATED, not cleared by this audit**
  - Status: PENDING MANUAL REVIEW (exec:shruti)

---

## Playwright Test Results (KR3 supporting evidence)

All 14 Playwright tests pass consecutively on cold starts (2 runs, `CI=1`):

**Run 1:** `golden-cut01.spec.js` 2/2 ✓ · `golden-cut11.spec.js` 2/2 ✓ · `smoke.spec.js` 10/10 ✓ — total 14/14 ✓
**Run 2:** `golden-cut01.spec.js` 2/2 ✓ · `golden-cut11.spec.js` 2/2 ✓ · `smoke.spec.js` 10/10 ✓ — total 14/14 ✓

**Consistency:** both cold-start runs passed; the suite is deterministic. This satisfies the
KR3 build-bar reliability condition ("passes twice consecutively from cold start"). The KR3
interface bar (founder visual acceptance) remains a separate manual gate.

---

## Five-Step vs Six-Step Naming Discrepancy (KR3 Note)

`okrs/2026-Q3.md` line 117 refers to "the canonical six-step demo", but the implementation
(`cuts/01-slate-tray.html`, line 1164) defines a **five-step** cycle:

1. **scan** — slate + disposition visible
2. **diligence-cascade** — agent reads cascade in
3. **outreach-refuses** — refusal arrows visible
4. **judgment-converges** — convergence state
5. **rest** — sealed state distinguished

The investor hero in `index.html` splits the sealed beat into two (transaction + acknowledgment
ceremony), which is the most likely origin of the "six" count. This is a **naming discrepancy**
(OKR language vs. implementation), not a functional gap. Flagged for founder resolution: either
the OKR should read "five-step", or the sealed beat should be split in cut-01 to match the hero.

---

## Desktop Source of Truth (`d0c81dc`) — files checked

Read-only against the pin (no desktop changes; `git show d0c81dc:<path>`):

- `src-tauri/src/commands/vault.rs` — vault command surface
- `src-tauri/src/commands/outcomes.rs` — outcome recording surface
- `src-tauri/src/db/migrations/024_packet_outcomes.sql` — outcomes persistence schema
- `src-tauri/tests/vault_sqlcipher_integration.rs` — encrypted (device-local) vault persistence test
- `src-tauri/tests/vault_integration.rs` — vault integration test
- `docs/testing/restart-persistence-wsc155.md` — restart-persistence evidence
- `.design-sync/previews/DegradedBanner.tsx` — explicit "NOT writing the real vault" degraded state (confirms the real write path)

---

## Remediation Summary

**Prototype-side contradictions found:** 0 — no relabeling needed. The single present-tense
capability claim (device-local vault sealing) is truthful against `d0c81dc`; the one deferred
capability (on-chain anchoring) is already labeled roadmap.

**Desktop-side gaps flagged for Sean:** None. Every capability cut-11 asserts as real exists in
the pinned build; every capability not yet in the build is labeled roadmap/fixture in the demo.

**Founder-gated items (NOT cleared by this audit):**
- KR3 interface bar: founder visual acceptance for cut-01 and cut-11 design canon.
- KR6 interface bar: stage-1 screen-share → stage-2 install continuity judgment (vocabulary,
  correction terms, design canon, comparable polish) — a felt-quality review only the founder
  can clear.
- Five/six-step naming resolution (above).

---

## Audit Methodology

1. Enumerated cut-11 capabilities from feature copy + user interactions.
2. Classified each into register (NOW / FIXTURE / RECEIPT / ROADMAP / PROTOTYPE) by reading the
   *user-facing copy*, not only comment labels (the earlier draft's error was trusting the label
   over the copy; line 35's "real" is the copy that flips vault-sealing into a NOW claim).
3. For the one NOW claim, checked presence in `d0c81dc` read-only via `git show` / `ls-tree`.
4. Verified the claim-register lock enforces no "live"/"real" run badge.
5. Ran the Playwright suite twice from cold start (14/14 both runs).

---

## Conclusion

**KR6 STATUS: GREEN ✓ (evidenced, not vacuous)**

Cut-11 asserts one capability in the present tense — device-local vault sealing / outcome
recording — and it is present in the pinned build `d0c81dc` (`vault.rs`, `outcomes.rs`,
migration `024`, sqlcipher integration test). All other capabilities are correctly labeled
fixture/receipt/roadmap, and the claim-register lock prevents any fixture from badging itself
live. Zero contradictions.

**Not cleared here (founder-gated):** KR3 + KR6 interface-bar visual acceptance, and the
five/six-step naming resolution. These require the founder's eyes before any external use.

**Date audited:** 2026-07-15
