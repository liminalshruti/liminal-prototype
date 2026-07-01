---
id: liminal-prototype.write-queue
type: repo.write-queue
status: active
owner: shruti
created: 2026-06-30
---

# Write Queue — liminal-prototype

This is the serialized list of `build` loops (write operations) ready to run on liminal-prototype. **Rule: exactly one build loop runs at a time on this repo.** Claim the top unblocked item, run it to completion, merge/checkpoint, then move to the next.

The repo is lower-stakes than liminal-desktop or liminal-agents-v1, so build items are **founder-defined** rather than agent-invented. No build loop should invent work; this queue is maintained by the founder.

---

## Current queue

| # | Build loop | Status | Blocker | Sean-adjacent | Notes |
|---|------------|--------|---------|---------------|-------|
| 1 | (Founder-defined) | TBD | — | No | No build items queued yet. Founder to populate as needed. |

---

## Blocked items (held pending founder decision)

None.

---

## How to use this queue

1. **Claim the top unblocked item.** Note the loop name and create a branch: `git checkout -b feat/<loop-name>-<date>`.
2. **Run the loop to acceptance criteria.** Use the loop spec in `control/` as the contract.
3. **Commit and verify.** Merge to main or checkpoint on the feature branch.
4. **Mark complete.** Update this queue (move item to history, mark status = completed).
5. **Move to next.** Claim the next unblocked item.

---

## History (completed builds)

None yet.

---

## Notes

- **Public surface:** Build items must not expose private/internal information.
- **Design tokens:** Changes to design-tokens.css require alignment with the canonical upstream (liminal-creative/canon/DESIGN_SYSTEM.md).
- **Sean-adjacent coordination:** This repo has no shared spine files with Sean's active work (liminal-desktop / liminal-agents-v1), so no Sean coordination needed unless future items surface.
- **Lower-stakes:** This is a reference/demo surface, not a production code repo. Build items are typically polish, doc updates, or design-token syncs.
