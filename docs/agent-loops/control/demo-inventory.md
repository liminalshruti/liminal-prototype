---
id: liminal-prototype.control.demo-inventory
type: loop.control
status: active
owner: (TBD — will be assigned when launched)
created: 2026-06-30
class: control
priority: P1
---

# Loop: demo-inventory

## Strategic alignment

- Super Goal:      (define per founder)
- Objective / OKR: (define per founder)
- Key Result:      (define per founder)
- Workstream:      liminal-prototype / public-demo / readiness
- Priority:        P1
- Class:           control (read-only)

## Objective

Catalog all live demos in liminal-prototype, verify they load and render without errors, identify stale or partial implementations, and assess demo readiness for external showcasing.

## Repos / directories in scope

- Allowed repo: `liminal-prototype` only
- Allowed directories: `cuts/`, `index.html`, `_scratch/` (reference only, not public)
- Read-only sources: `design-tokens.css`, all `.html` files, `package.json`
- Write targets: `reports/demo-inventory.md` only

## Explicit non-goals

This loop must NOT: rewrite any HTML/CSS · change design tokens · invent feature requests · modify unrelated files · touch main directly · assess product strategy beyond demo readiness.

## Required inputs (read FIRST)

1. `index.html` (entry point)
2. `cuts/` directory (all demo files)
3. `design-tokens.css` (tokens used by demos)
4. `README.md` (what demos claim to show)

## Required output artifacts

1. `reports/demo-inventory.md` — catalog of all demos with status (green / yellow / red), blocker list, ready-to-showcase assessment

## Acceptance criteria (done ONLY if all true)

- [x] Every demo file in `cuts/` is cataloged with name and purpose
- [x] Each demo assessed for: loads without error, renders correctly, all tokens resolve
- [x] Stale/partial implementations identified and severity assigned
- [x] One overall readiness verdict: ready-for-showcase / needs-fixes / blocked
- [x] All blockers listed with reproduction steps
- [x] All changed files listed (should be none — control loop)
- [x] Verification commands run or explicitly marked unavailable
- [x] Remaining gaps documented

## Verification

Run (in `liminal-prototype/`):

```bash
npm run build
npx http-server . -p 8000
# Open http://localhost:8000 in browser
# Test each demo in cuts/ for:
#   - Page loads without console errors
#   - Design tokens load
#   - Layout / typography renders as expected
#   - Interactive elements (if any) respond correctly
```

On failure, document: demo name · failure mode · likely cause · whether pre-existing or introduced by this loop.

## Stop condition

Stop when: all demos cataloged and assessed, OR a scope blocker prevents completion, OR assessment would require code changes.

## Final report format

See `~/liminal/founder-brain/ops/strategy-control-plane/07_LOOP_SPEC_TEMPLATE.md` — § Final report format (8 items: summary, files read, files changed, acceptance checklist, verification, risks, risk level, recommended next loop).

---

## Loop preamble (REQUIRED — use verbatim in the loop prompt)

```txt
Do not optimize for seeming productive. Optimize for convergence. If the task is ambiguous, produce a
plan and stop. If implementation would require changing scope, stop and explain. Do not create new
architecture unless required by acceptance criteria. Do not invent evidence. Do not touch unrelated files.
```
