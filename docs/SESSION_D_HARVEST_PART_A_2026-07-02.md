---
id: ops.session-d-harvest-part-a-2026-07-02
type: ops.harvest
status: complete
owner: shruti
session: SESSION D (Opus wave-2)
created: 2026-07-02
---

# SESSION D — Close-out Harvest (Part A)

Durable findings from the terminal-state pass, beyond the mechanical ledger. Founder-facing.

## Decisions surfaced for the founder (no mid-loop pings — batched here)
1. **LIM-1135 Option 1 is FEASIBLE, and cheaper than the ticket assumed.** The ticket frames restore as "find a vanished repo." Reality: the verbatim `liminal-test/browser.ts` is gone (not on GitHub, no bundle backup), **but the kernel's actual source logic survives** in `liminal-natsec/app/src/lib/*` (actionRanking, reviewRulesStore, osintSignals, sourceFamilies, specialistReads, spineGraph). `browser.ts` was a thin browser-bundling wrapper. So Option 1 = re-vendor a small entrypoint over surviving natsec modules, not archaeology. **Your call** (natsec is archived + security-adjacent). If yes → cut-09 wording upgrades from "frozen artifact" back to "live reproducible kernel."
2. **cut-02 demo copy ("pending · dashboard live") — keep or soften?** Not a traction overclaim (not in the N=19/3,041 family), so I did NOT scrub it. It's diegetic — the forensic agent demonstrating on a sample record. Flagging only because a diligence reader skimming fast *could* misread it as a live-system claim. Low priority; your judgment.
3. **Three of these six repos are archived read-only** (natsec, intelligence, evermemos). The intelligence `.DS_Store` gitignore fix is committed locally but can't be PR'd until/unless you unarchive. If these are meant to stay archived, "local terminal-clean" is the real terminal state and no PR is owed.

## Reusable method (worth keeping)
- **Deploy-lag verify needs raw-HTML fetch, not WebFetch-markdown.** WebFetch's markdown conversion drops exact strings and its small model over-triggers on demo copy. For retired-cardinal scrubs, fetch raw HTML + regex (script at `scratchpad/live_scan.py`). Also: the sandbox strips PATH — `curl | head` silently no-ops (head not found → grep fallback lies "clean"). Always self-contained Python or `export PATH` + `command grep`. **This is the #1 false-PASS trap on demo-surface verification.**
- **Branch-merge classification collapses "24 scary branches" fast:** `git branch --merged main` vs `--no-merged main` + `git branch -r --contains <b>` separates captured-drop from unique-unpushed in two commands. Only 1 of prototype's 24 branches was genuinely at-risk.
- **The commit-guard hook resolves branch by the shell's cwd, which resets between Bash calls.** Use `git -C <repo>` for every git op so the hook sees the real feature branch, not a stale `main`.

## State handed off
- 6/6 repos terminal. prototype main untouched (`da5f04d`).
- READY PRs: #47 (agent-loops docs), #48 (this ledger).
- Local-only: intelligence `chore/gitignore-dsstore-2026-07-02` (archived remote blocks push).
- Preserved-in-place: prototype 2 stashes (superseded by main's `wireSubjectBar`), natsec 2 stashes (incl. co-founder WIP).
