---
id: liminal-prototype.control.design-token-drift-check
type: loop.control
status: active
owner: (TBD — will be assigned when launched)
created: 2026-06-30
class: control
priority: P1
---

# Loop: design-token-drift-check

## Strategic alignment

- Super Goal:      (define per founder)
- Objective / OKR: (define per founder)
- Key Result:      (define per founder)
- Workstream:      liminal-prototype / design-system / canonical tokens
- Priority:        P1
- Class:           control (read-only)

## Objective

Audit `design-tokens.css` in liminal-prototype for drift vs. the canonical design system defined in `liminal-creative/canon/DESIGN_SYSTEM.md`. Flag out-of-alignment tokens, missing token definitions, and deprecated values still in use. Verify all consumers (.html + .css files) correctly reference canonical tokens.

## Repos / directories in scope

- Allowed repos: `liminal-prototype` + `liminal-creative` (read-only reference)
- Allowed directories: `design-tokens.css`, all `.css` + `.html` in liminal-prototype consuming tokens, `~/liminal/liminal-creative/canon/DESIGN_SYSTEM.md`
- Read-only sources: design-tokens.css, DESIGN_SYSTEM.md, all `.css` / `.html` in cuts/
- Write targets: `reports/design-token-drift-check.md` only

## Explicit non-goals

This loop must NOT: modify design-tokens.css · rewrite DESIGN_SYSTEM.md · change any HTML/CSS · invent new tokens · touch main directly · assess product features beyond token alignment.

## Required inputs (read FIRST)

1. `~/liminal/liminal-creative/canon/DESIGN_SYSTEM.md` (canonical source)
2. `design-tokens.css` (this repo's current tokens)
3. All `.css` / `.html` files consuming tokens (identify drift in usage)
4. `README.md` context (tokens are canonical until reorg moves them upstream)

## Required output artifacts

1. `reports/design-token-drift-check.md` — drift audit with severity, alignment matrix, recommended fixes

## Acceptance criteria (done ONLY if all true)

- [x] Canonical token set from DESIGN_SYSTEM.md extracted and listed
- [x] All tokens in `design-tokens.css` cross-checked against canonical set
- [x] Drift points identified: missing, deprecated, misnamed, wrong-value tokens
- [x] Each drift point assigned severity (critical / high / medium / low)
- [x] All files consuming tokens audited for correct usage
- [x] Ready-to-edit decision made (ready / needs-fixes)
- [x] All changed files listed (should be none — control loop)
- [x] Verification commands run or explicitly marked unavailable
- [x] Remaining gaps documented

## Verification

Run (in `liminal-prototype/`):

```bash
# Extract canonical tokens from DESIGN_SYSTEM.md
grep -E "^\s*--" ~/liminal/liminal-creative/canon/DESIGN_SYSTEM.md | sort > /tmp/canonical-tokens.txt

# Extract tokens from design-tokens.css
grep -E "^\s*--" design-tokens.css | sort > /tmp/actual-tokens.txt

# Compare
diff /tmp/canonical-tokens.txt /tmp/actual-tokens.txt

# Check for hardcoded color/size values in .html files (should use tokens)
grep -rE "#[0-9a-fA-F]{6}|px" cuts/*.html | grep -v "design-tokens" || echo "No hardcoded values found"
```

On failure, document: drift point · likely cause · whether pre-existing or introduced by this loop.

## Stop condition

Stop when: drift audit complete and severity levels assigned, OR a scope blocker prevents completion, OR audit would require code changes.

## Final report format

See `~/liminal/founder-brain/ops/strategy-control-plane/07_LOOP_SPEC_TEMPLATE.md` — § Final report format (8 items: summary, files read, files changed, acceptance checklist, verification, risks, risk level, recommended next loop).

---

## Loop preamble (REQUIRED — use verbatim in the loop prompt)

```txt
Do not optimize for seeming productive. Optimize for convergence. If the task is ambiguous, produce a
plan and stop. If implementation would require changing scope, stop and explain. Do not create new
architecture unless required by acceptance criteria. Do not invent evidence. Do not touch unrelated files.
```
