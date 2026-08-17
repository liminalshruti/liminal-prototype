#!/usr/bin/env sh
# Local lockstep guard — run tokens:check before pushing, so a drifted token copy
# can't reach the remote silently. Opt-in (CI was skipped: canon is a private
# sibling repo, cross-repo CI checkout needs a secret — see _scratch/PORT_RECONCILIATION_SCOPE).
#
# Install once:
#   ln -sf ../../scripts/tokens/pre-push-check.sh .git/hooks/pre-push
#   chmod +x .git/hooks/pre-push
#
# Behaviour: if canon (../liminal-creative) is present, verify byte-equality and
# BLOCK the push on drift. If canon is absent (clone-alone), it no-ops + allows
# the push (the committed copy is what the site serves either way).

if [ -f ../liminal-creative/tokens/design-tokens.css ]; then
  if ! node scripts/tokens/sync-upstream.mjs --check; then
    echo "✗ push blocked — token copy drifted from canon. Run: npm run tokens:sync" >&2
    exit 1
  fi
else
  echo "tokens pre-push: canon sibling absent — skipping drift check (committed copy is authoritative)" >&2
fi

# ── DESIGN.md tier ────────────────────────────────────────────────────────────
# Runs UNCONDITIONALLY — note the missing `if canon is present` above it.
#
# design:check derives from this repo's own committed token copy (which the
# check above separately proves equal to canon), so it needs no sibling and has
# no reason to be skipped. That is the whole difference between the two tiers:
# the token guard is opt-in and skippable, which is survivable because a drifted
# token file is loud. The DESIGN.md tier had no guard at all, which is why canon
# §5 moved on 2026-07-29 and every DESIGN.md kept declaring the superseded faces
# for three months while `impeccable` read them as locked truth.
#
# Being hermetic also means this one can move into CI, which tokens:check cannot.
if ! node scripts/design/gen-design-md.mjs --check; then
  echo "✗ push blocked — DESIGN.md drifted from the token file. Run: npm run design:gen" >&2
  exit 1
fi
