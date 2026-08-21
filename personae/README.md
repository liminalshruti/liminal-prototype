# Demo personas

Every person who appears in a demo cut is fictional. This note says who they are,
so the next editor uses the existing cast instead of inventing one — or worse,
reaching for a real name because it was close to hand.

## The cast

| persona | role in the demos | where it appears |
|---|---|---|
| **Maia** | the operator — the person whose vault it is, who reads and corrects | `data/team.js` (`maia_corrections`, `maia_obsidian`), cut 04 licence card, cut 10, `embed-agent-hack.html` seal |
| **Rafe** | cofounder, mutual/symmetric consent class | `data/team.js` (`rafe_cofounder` and its source tiles) |
| **Devon** | direct report, pattern-baseline-only consent | `data/team.js` (`devon_eng`) |
| **Priya** | direct report, calendar-attendance-only consent | `data/team.js` (`priya_design`) |
| **Janice** | advisor, meeting-summaries-only consent | `data/team.js` (`janice_advisor`) |

`Maia` is the operator persona for the whole prototype. Where a surface needs to
show who signed, whose vault it is, or who holds a read, it is Maia.

## The rule

**No real person's name goes into a demo surface.** Not the founder's, not a
teammate's, not a counterparty's — and not in an HTML comment, an element id, or a
`<title>`, which are the three places it has actually happened.

Three fixes on 2026-08-20 exist because this was not written down:

- **PR #103** — the team surface read on the real cofounder by name, with the
  operator tile labelled with the real founder's name, next to panels marked
  "out of consent · gated". Read cold, that is a founder running repeated coherence
  and drift reads on a named real person, on a public URL.
- **PR #104** — the founder's own first name, lowercase, in an embed seal
  (`signed · <name>`). Survived #103 because that sweep's file list missed the
  embed *and* matched a capitalised pattern a lowercase name never hits. Redacted
  even here: a doc explaining the rule is a poor place to break it.
- **PR #108** — a counterparty and their fund in a page `<title>`, plus the same
  name in a shared JS module every stitched surface loads.

The pattern across all three: identifying details spread along *dependency* lines,
not page lines. Sweep the libs a surface imports, not just the surface.

## Why the full persona package is not in this repo

A richer Maia package exists off-repo (identity registry, demo script, entity
constraints). It is deliberately **not** published here, and should not be moved in
wholesale.

It is a *protective* document — its purpose is to specify what must never leak into
a persona — which means it necessarily names the real details it is protecting, the
real employers it forbids reusing, and the technique used to break correlation with
real records. Publishing the rulebook on a public GitHub Pages repo would disclose
exactly what it exists to conceal, and would hand anyone reading it the method for
inverting it. It also carries a local filesystem path that identifies the machine
account.

If the persona package is ever wanted in a public repo, it needs a de-identified
derivative — the cast and the constraints, without the real-world referents that
make the constraints meaningful. That is a rewrite, not a move.

*The full package lived on branch `docs/maia-move`, deleted 2026-08-21 after the
founder ruled that this note covers the operational need. It is not lost — the
branch tip is `ffc94958e8410117a0388ecad656384c30c1247e`, restorable with:*

```
git push origin ffc94958e8410117a0388ecad656384c30c1247e:refs/heads/docs/maia-move
```

*Recorded here rather than only in a commit message, because the reason to go
looking for it — wanting the richer persona public — is the same reason someone
would be reading this file.*
