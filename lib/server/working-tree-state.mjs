/* working-tree-state.mjs · read-only git working-tree introspection
 * ────────────────────────────────────────────────────────────────────
 * Extracted from server.mjs 2026-06-18 (Stage 2, candidate #3) per
 * docs/architecture/PORTABILITY_BACKLOG.md (Tier 1, working-tree-state).
 *
 * Surfaces what the Substrate Console needs to be parallel-session-aware:
 * which files are dirty (so two sessions on main can see each other's
 * in-flight work) and whether local is ahead/behind origin. Never mutates
 * anything; on any failure returns a degraded shape so the console renders
 * without git rather than erroring.
 *
 * Portable: the repo root is a PARAMETER, so another server can reuse this
 * module WITHOUT editing it — pass your own root to workingTreeState(root).
 * Node-only (uses node:child_process); no browser/runtime UI dependency.
 */
import { execFile } from 'node:child_process';

/* run a git subcommand read-only · returns trimmed stdout, or null on any
   error (so callers degrade gracefully instead of throwing) */
function git(args, cwd) {
  return new Promise((resolve) => {
    execFile('git', args, { cwd, timeout: 4000 }, (err, stdout) => {
      resolve(err ? null : stdout.trimEnd());
    });
  });
}

/**
 * Read-only working-tree state for the given repo root.
 * @param {string} root · the repository working directory (cwd for git)
 * @returns {Promise<{git:boolean, branch:?string, ahead:number, behind:number, dirty:Array, reason?:string}>}
 */
export async function workingTreeState(root) {
  const [statusRaw, branchRaw] = await Promise.all([
    git(['status', '--porcelain=v1'], root),
    git(['status', '-sb'], root),
  ]);

  if (statusRaw === null) {
    return { git: false, reason: 'not a git repo or git unavailable', dirty: [], branch: null, ahead: 0, behind: 0 };
  }

  // Porcelain v1: "XY path" per line. We only need the path + whether it's dirty.
  const dirty = statusRaw
    .split('\n')
    .filter(Boolean)
    .map((line) => ({ code: line.slice(0, 2).trim(), path: line.slice(3) }));

  // First line of -sb is e.g. "## main...origin/main [ahead 1, behind 2]"
  const head = (branchRaw || '').split('\n')[0] || '';
  const branch = (head.match(/^## ([^.\s]+)/) || [])[1] || null;
  const ahead = Number((head.match(/ahead (\d+)/) || [])[1] || 0);
  const behind = Number((head.match(/behind (\d+)/) || [])[1] || 0);

  return { git: true, branch, ahead, behind, dirty };
}
