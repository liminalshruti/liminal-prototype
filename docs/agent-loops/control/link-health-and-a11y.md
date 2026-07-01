---
id: liminal-prototype.control.link-health-and-a11y
type: loop.control
status: active
owner: (TBD — will be assigned when launched)
created: 2026-06-30
class: control
priority: P1
---

# Loop: link-health-and-a11y

## Strategic alignment

- Super Goal:      (define per founder)
- Objective / OKR: (define per founder)
- Key Result:      (define per founder)
- Workstream:      liminal-prototype / demo-quality / link + accessibility
- Priority:        P1
- Class:           control (read-only)

## Objective

Verify all links in demos resolve (no dead links, redirects, timeouts), and audit all HTML for baseline accessibility compliance: alt text on images, aria labels on interactive elements, color contrast ratios, heading hierarchy, and form labels.

## Repos / directories in scope

- Allowed repo: `liminal-prototype` only
- Allowed directories: all `.html` in cuts/, index.html, external resources linked from demos
- Read-only sources: all HTML markup, CSS (for color/contrast check)
- Write targets: `reports/link-health-and-a11y.md` only

## Explicit non-goals

This loop must NOT: modify any HTML/CSS · fix accessibility issues (that's build-loop work) · assess design aesthetics · touch main directly · mandate compliance beyond baseline standards (WCAG 2.1 Level A).

## Required inputs (read FIRST)

1. All `.html` files in cuts/ and index.html
2. CSS files (for color contrast analysis)
3. README.md (context on demo intent)
4. External resources linked from demos (for reachability)

## Required output artifacts

1. `reports/link-health-and-a11y.md` — link health + a11y audit, all issues with severity, remediation guidance

## Acceptance criteria (done ONLY if all true)

- [x] Every link in demos tested for reachability (live / dead / redirect)
- [x] All images audited for alt text presence and quality
- [x] All interactive elements (buttons, links, form inputs) checked for labels / aria attributes
- [x] Heading hierarchy verified (no skipped levels, logical flow)
- [x] Color contrast ratios sampled (text on background, foreground on background)
- [x] Form labels present and associated with inputs
- [x] Each issue assigned severity (critical / high / medium / low)
- [x] One overall a11y status: accessible / needs-fixes / blocked
- [x] All changed files listed (should be none — control loop)
- [x] Verification commands run or explicitly marked unavailable
- [x] Remaining gaps documented

## Verification

Run (in `liminal-prototype/`):

```bash
# Find all links
grep -oE "href=['\"]([^'\"]+)['\"]" cuts/*.html index.html | cut -d'"' -f2 | cut -d"'" -f2 | sort | uniq > /tmp/links.txt

# Check for dead links (sample; full sweep may require browser automation)
while IFS= read -r link; do
  if [[ $link == http* ]]; then
    echo -n "Testing $link ... "
    curl -s -o /dev/null -w "%{http_code}\n" "$link" 2>/dev/null || echo "FAIL"
  fi
done < /tmp/links.txt

# Find all images without alt text
grep -oE "<img[^>]*>" cuts/*.html index.html | grep -v "alt=" | head -20

# Find form inputs without labels
grep -oE "<(input|select|textarea)[^>]*>" cuts/*.html | grep -v "aria-label" | grep -v "id=" | head -20
```

On failure, document: issue · finding · pre-existing vs introduced by this loop.

## Stop condition

Stop when: link and a11y audit complete with severity levels assigned, OR a scope blocker prevents completion, OR audit would require code changes.

## Final report format

See `~/liminal/founder-brain/ops/strategy-control-plane/07_LOOP_SPEC_TEMPLATE.md` — § Final report format (8 items: summary, files read, files changed, acceptance checklist, verification, risks, risk level, recommended next loop).

---

## Loop preamble (REQUIRED — use verbatim in the loop prompt)

```txt
Do not optimize for seeming productive. Optimize for convergence. If the task is ambiguous, produce a
plan and stop. If implementation would require changing scope, stop and explain. Do not create new
architecture unless required by acceptance criteria. Do not invent evidence. Do not touch unrelated files.
```
