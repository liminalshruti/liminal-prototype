---
id: liminal-prototype.control.public-safety-scan
type: loop.control
status: active
owner: (TBD — will be assigned when launched)
created: 2026-06-30
class: control
priority: P1
---

# Loop: public-safety-scan

## Strategic alignment

- Super Goal:      (define per founder)
- Objective / OKR: (define per founder)
- Key Result:      (define per founder)
- Workstream:      liminal-prototype / public-surface / data-safety
- Priority:        P1
- Class:           control (read-only)

## Objective

Scan the public demo surface (liminal-prototype) for any content that should NOT be publicly visible: internal file paths, unreleased product information, private email addresses, founder-only research, confidential positioning, credentials, or any other PII / proprietary data. Catalog all findings with exposure severity.

## Repos / directories in scope

- Allowed repo: `liminal-prototype` only
- Allowed directories: `index.html`, `cuts/`, `docs/`, `README.md`, `.html` / `.css` / `.js` files in the public tree
- Read-only sources: all HTML/CSS/JS on the public surface, README/docs
- Write targets: `reports/public-safety-scan.md` only

## Explicit non-goals

This loop must NOT: modify any files · remove public content (that's a founder decision) · assess product positioning · touch main directly · invent security requirements beyond PII/credentials/proprietary data.

## Required inputs (read FIRST)

1. All `.html` files in the public tree (index.html, cuts/)
2. All `.css` / `.js` files (for embedded data)
3. `README.md` and public docs
4. Reference: `~/liminal/founder-brain/meta/SHARED_CONTEXT.md` (what IS and IS NOT public positioning)

## Required output artifacts

1. `reports/public-safety-scan.md` — full safety audit, all flagged content with severity, remediation guidance

## Acceptance criteria (done ONLY if all true)

- [x] Full sweep of all public HTML/CSS/JS completed
- [x] Every suspicious pattern checked (email, path, API key, test data, internal naming)
- [x] All findings listed with: location · exact content · exposure type (PII / credentials / proprietary / positioning)
- [x] Each finding assigned severity (critical / high / medium / low)
- [x] One overall ready-to-ship verdict: safe-to-publish / needs-review / blocked
- [x] Remediation guidance provided for all findings
- [x] All changed files listed (should be none — control loop)
- [x] Verification commands run or explicitly marked unavailable
- [x] Remaining gaps documented

## Verification

Run (in `liminal-prototype/`):

```bash
# Search for common PII patterns
grep -rE "([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})" cuts/ index.html docs/ --include="*.html" --include="*.js" --include="*.css" 2>/dev/null | grep -v "placeholder@example.com"

# Search for file paths (internal structure exposure)
grep -rE "/(Users|home|var|opt|usr)/" cuts/ index.html --include="*.html" --include="*.js"

# Search for API keys / credentials patterns
grep -rE "(api[_-]?key|token|secret|password)" cuts/ index.html --include="*.html" --include="*.js" -i

# Search for test data
grep -rE "(test|debug|staging|qa)" cuts/ index.html --include="*.html" --include="*.js" -i | head -20
```

On failure, document: pattern · finding · false-positive assessment · whether pre-existing or introduced by this loop.

## Stop condition

Stop when: full sweep completed and all findings cataloged with severity, OR a scope blocker prevents completion, OR scan would require file modifications.

## Final report format

See `~/liminal/founder-brain/ops/strategy-control-plane/07_LOOP_SPEC_TEMPLATE.md` — § Final report format (8 items: summary, files read, files changed, acceptance checklist, verification, risks, risk level, recommended next loop).

---

## Loop preamble (REQUIRED — use verbatim in the loop prompt)

```txt
Do not optimize for seeming productive. Optimize for convergence. If the task is ambiguous, produce a
plan and stop. If implementation would require changing scope, stop and explain. Do not create new
architecture unless required by acceptance criteria. Do not invent evidence. Do not touch unrelated files.
```
