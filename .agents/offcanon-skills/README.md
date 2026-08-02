# Off-canon skills (quarantined, not deleted)

These nine skills were installed under `.agents/skills/` and, per the Claude
Code usage counter, **every one of them had never been invoked**. That is the
finding, not the problem — they went unused for a good reason, and this
directory records it so they don't get re-enabled on the assumption that unused
means overlooked.

## Why they're out

Liminal has a **locked** design canon: a 12-wheel color system (7 factors + 5
ornaments × 10-stop tonal scales), a named type stack, and a register
vocabulary bound to hues by indirection. Every surface consumes one token file.

These skills are *aesthetic-imposing*: each arrives with its own palette, its
own type stack, and its own layout law, and instructs the agent to apply them.
Against a codebase with no design system that is useful. Against a locked canon
it is a competing authority, and the agent has no way to know which to obey.

| Skill | What it mandates | Conflict |
|---|---|---|
| `minimalist-ui` | warm monochrome + muted pastel accents; SF Pro / Switzer | Canon is a dark void substrate with ten saturated registers |
| `industrial-brutalist-ui` | hazard red `#E61919`, Neue Haas / Archivo Black, zero border-radius | Neither the hue nor the faces are canon; canon has a 5-step radius scale |
| `high-end-visual-design` | "Vanguard_UI_Architect" persona, Clash Display / PP Editorial | Competing type stack |
| `gpt-taste` | GSAP + AIDA section structure, Awwwards register | Prescribes page architecture; product surfaces aren't landing pages |
| `design-taste-frontend` | Tailwind v4 + Phosphor icons + three-dial variance system | Desktop is SolidJS + Panda; prototype is buildless CSS. Neither uses Tailwind |
| `design-taste-frontend-v1` | as above, superseded by its own v2 | Same, plus duplication |
| `brandkit` | image-gen brand boards, nine visual modes | Overlaps `brand-creative-direction` + `brand-builder`, which are canon-aware and actually used |
| `redesign-existing-projects` | stack-agnostic audit + "upgrade" replacements | Its upgrades (glassmorphism, spotlight borders, variable-font animation) are on canon's explicit Don't list |
| `full-output-enforcement` | bans truncation, forces exhaustive output | Not a design skill; no canon conflict, but no demonstrated use either |

The sharpest example: `redesign-existing-projects` recommends glassmorphism and
gradient treatments as premium upgrades, while `DESIGN.md`'s Don't list rejects
glassmorphism by name. An agent holding both is being told opposite things by
two files that each present themselves as authoritative.

## What stayed live

| Skill | Why |
|---|---|
| `impeccable` | Liminal-native, 18 sub-commands, its own `scripts/` and `reference/`. The one in real use. Reads `DESIGN.md` — which is now generated from tokens, so it is finally briefed off canon rather than off a stale copy |
| `image-to-code`, `imagegen-frontend-web`, `imagegen-frontend-mobile` | Produce *reference imagery*, not code, so they cannot inject off-canon values into a shipped surface. Useful while the visual register is FLUID (2026-07-03 ruling). Each carries a canon preamble |
| `stitch-design-taste` | Kept for its `DESIGN.md` schema, which the generator follows. Not intended for invocation |

## Reversing this

Nothing was deleted; `git mv` preserves history.

```sh
git mv .agents/offcanon-skills/<name> .agents/skills/<name>
```

If you re-enable one, give it a canon preamble first (see the top of
`.agents/skills/image-to-code/SKILL.md` for the pattern) — otherwise it will
confidently propose a palette and a type stack that are not Liminal's.
