// v2-vocab-gate spec (LIM-1799): the disclosure boundary runs with the suite.
// Positive: the repo at HEAD is clean. Negative: a planted banned term IS
// caught (term assembled by concatenation so this file stays clean itself).
const { test, expect } = require('@playwright/test');
const { execSync } = require('node:child_process');
const { writeFileSync, mkdirSync, rmSync } = require('node:fs');

test('v2-vocab-gate: tracked repo is clean', () => {
  execSync('node scripts/v2-vocab-gate.mjs', { stdio: 'pipe' });
});

test('v2-vocab-gate: a planted banned term is caught (negative proof via --check-file)', () => {
  const term = ['BINDS', 'TO'].join('_');
  mkdirSync('_scratch', { recursive: true });
  const planted = '_scratch/vocab-gate-negative-proof.md';
  writeFileSync(planted, 'edge type: ' + term + '\n');
  try {
    let failed = false;
    try {
      execSync(`node scripts/v2-vocab-gate.mjs --check-file ${planted}`, { stdio: 'pipe' });
    } catch (error) {
      failed = true;
      expect(String(error.stderr)).toContain(planted);
    }
    expect(failed).toBe(true);
    // And the default (tracked-files) mode must NOT flag the untracked scratch file:
    execSync('node scripts/v2-vocab-gate.mjs', { stdio: 'pipe' });
  } finally {
    rmSync(planted, { force: true });
  }
});
