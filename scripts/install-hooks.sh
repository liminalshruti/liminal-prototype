#!/bin/bash
# Install the v2-vocab pre-commit gate (LIM-1799). Run once per clone/worktree.
set -euo pipefail
HOOK="$(git rev-parse --git-path hooks)/pre-commit"
printf '#!/bin/sh\nnode scripts/v2-vocab-gate.mjs\n' > "$HOOK"
chmod +x "$HOOK"
echo "installed: $HOOK"
