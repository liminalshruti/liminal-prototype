// Golden path · cut 01 (P1): boot → capture surface → decide → DIVERGENCE →
// sealed artifact → vault preserved (single write) → guided next action to cut 11.
//
// 2026-07-29 · the Decide stage gained the DECIDING beat's divergence pane, so
// Confirm is now two presses: the first opens the split, the second seals through
// it. The single-write invariant this test exists to guard is unchanged — and the
// gate is now asserted alongside it, because a gate that accidentally sealed on
// the first press would reintroduce exactly the double-write regression below.
import { test, expect } from "@playwright/test";
import {
  CUT_01_CANONICAL,
  trackConsoleErrors,
  skipEntryOverlay,
} from "./helpers.js";

test("confirm seals once, count stays monotonic, handoff to govern shows", async ({
  page,
}) => {
  const errors = trackConsoleErrors(page);
  await page.goto(CUT_01_CANONICAL);
  await skipEntryOverlay(page);

  // boot: slate + disposition visible
  const confirm = page.locator("#dispo-primary");
  await expect(confirm).toBeVisible();
  const before = Number(await page.locator("#vault-count").textContent());

  const artifact = page.locator("#dispo-artifact");
  const pane = page.locator("#divergence-pane");

  // FIRST press · opens the split and seals NOTHING
  await confirm.click();
  await expect(pane).toBeVisible();
  await expect(pane.locator(".dvg-col")).toHaveCount(3);
  await expect(artifact).toBeHidden();
  await expect(page.locator("#vault-count")).toHaveText(String(before));

  // the three reads never merge · one is a typed refusal, not an empty slot
  await expect(pane.locator(".dvg-col.is-refused")).toHaveCount(1);
  await expect(pane.locator(".dvg-terminal-kind")).toContainText("refused");

  // the ontology is real, not decorative: typed nodes and typed edges with
  // confidence on the EDGE (graph-spine EdgeProvenance), and every read's chain
  // walks the canonical spine
  await expect(pane.locator('.dvg-node[data-node-type="claim"]')).toHaveCount(3);
  await expect(pane.locator('.dvg-node[data-node-type="actionOption"]')).toHaveCount(2);
  // the claim→action edge stays visible in the collapsed (stacked) state
  await expect(
    pane.locator('.dvg-edge-step[data-edge-to="actionOption"] .dvg-edge-type').first()
  ).toHaveText("TRIGGERS");

  // SECOND press · seals through the split
  await confirm.click();

  // sealed artifact with the honest anchor label
  await expect(artifact).toBeVisible();
  await expect(page.locator(".da-hash-label")).toHaveText("Anchor");

  // vault count bumps by exactly one and never drops (fresh profile per test)
  await expect(page.locator("#vault-count")).toHaveText(String(before + 1));

  // exactly ONE decision record in the store (the double-write regression)
  const records = await page.evaluate(async () => {
    const vs = await import("/lib/vault-store.js");
    return vs.countDecisions(document.body.dataset.product || "personal");
  });
  expect(records).toBe(1);

  // clear next action: re-enter affordance + guided handoff to the P0 proof
  await expect(page.locator("#da-reenter")).toBeVisible();
  const next = page.locator("#da-govern-next");
  await expect(next).toBeVisible();
  await expect(next).toHaveAttribute(
    "href",
    "11-govern.html?subject=spend&beat=loop&run=govern-run.json"
  );

  expect(errors, "console errors").toEqual([]);
});

// The divergence pane's substantive claim: WHERE you correct determines
// correction_kind. Position is the taxonomy — inner within a column, cross on the
// polarity edge, emergence on ground no agent produced. If this ever silently
// degrades to one undifferentiated "correction", the moat metric goes back to
// being a self-reported radio button.
test("correction kind is derived from position, not self-reported", async ({
  page,
}) => {
  await page.goto(CUT_01_CANONICAL);
  await skipEntryOverlay(page);

  await page.locator("#dispo-primary").click();
  const pane = page.locator("#divergence-pane");
  await expect(pane).toBeVisible();

  const ribbon = page.locator(".audit-ribbon");
  await expect(ribbon).toContainText("divergence · 3 reads");

  // inner · a claim that belongs to exactly one read's trace
  await pane.locator('[data-spine-id="claim:a"]').click();
  await expect(ribbon).toContainText("correction · inner");

  // cross · the divergence edge spans two claims in two different traces
  await pane.locator('[data-node="edge"]').click();
  await expect(ribbon).toContainText("correction · cross");

  // cross, again by geometry alone · a SHARED observation genuinely belongs to
  // two reads, so position — not a hardcoded rule — makes it cross.
  // Observations are collapsed by default in the stacked shell, so open the
  // provenance first; the correction semantics are independent of visibility.
  await pane.locator(".dvg-expand").first().click();
  await pane.locator('[data-spine-id="obs:comp"]').first().click();
  await expect(ribbon).toContainText("correction · cross");

  // emergence · the case root sits outside every trace (traceBack stops at
  // observation), so correcting it is ground no read produced
  await pane.locator('[data-node="ground"]').click();
  await expect(ribbon).toContainText("correction · emergence");

  // still unsealed · correcting is not deciding
  await expect(page.locator("#dispo-artifact")).toBeHidden();
});

// In the shell the pane is ~434px wide, so it stacks — and three full provenance
// chains stacked run past 1000px, which destroys the at-a-glance comparison the
// pane exists for. Collapsed-by-default keeps it scannable; the depth is one
// press away. Expanding is navigation and must NOT write a correction row.
test("stacked chains collapse by default and expand on request", async ({ page }) => {
  await page.goto(CUT_01_CANONICAL);
  await skipEntryOverlay(page);
  await page.locator("#dispo-primary").click();

  const pane = page.locator("#divergence-pane");
  await expect(pane).toBeVisible();

  // refused columns are short enough to never collapse → 2 expanders, not 3
  const expanders = pane.locator(".dvg-expand");
  await expect(expanders).toHaveCount(2);
  await expect(expanders.first()).toBeVisible();

  // collapsed: claim + action per unrefused read, plus the refused read's two
  const visibleNodes = pane.locator(".dvg-node:visible");
  await expect(visibleNodes).toHaveCount(6);

  // no edge may dangle above a hidden node
  await expect(pane.locator('.dvg-edge-step[data-edge-to="hypothesis"]:visible')).toHaveCount(0);

  const ribbonBefore = await page.locator(".audit-ribbon").textContent();
  await expanders.first().click();
  await expect(expanders.first()).toHaveAttribute("aria-expanded", "true");
  await expect(visibleNodes).toHaveCount(9);
  await expect(pane.locator('.dvg-node[data-node-type="observation"]:visible')).toHaveCount(1);

  // navigation, not correction
  expect(await page.locator(".audit-ribbon").textContent()).toBe(ribbonBefore);
  await expect(pane.locator(".dvg-expand.is-corrected")).toHaveCount(0);
});

// The pane's claim is that the rendered path is real structure, not a drawing.
// That rests on the ported graph-spine validators actually biting: a dangling
// edge, an unknown node type, or a missing provenance must throw at construction
// rather than render as a plausible-looking line.
test("spine schema rejects dishonest graphs", async ({ page }) => {
  await page.goto(CUT_01_CANONICAL);
  await skipEntryOverlay(page);

  const results = await page.evaluate(async () => {
    const { Graph } = await import("/lib/spine.js");
    const ok = (fn) => { try { fn(); return "no-throw"; } catch (e) { return e.message; } };
    const good = {
      created_at: "2026-07-29T12:00:00.000Z",
      created_by: "system",
      source_node_ids: ["n1"],
    };
    return {
      danglingEdge: ok(() => new Graph(
        [{ id: "n1", type: "claim", title: "a" }],
        [{ id: "e1", type: "SUPPORTS", from: "n1", to: "nope", provenance: good }],
      )),
      unknownNodeType: ok(() => new Graph([{ id: "n1", type: "vessel", title: "a" }])),
      unknownEdgeType: ok(() => new Graph(
        [{ id: "n1", type: "claim", title: "a" }, { id: "n2", type: "claim", title: "b" }],
        [{ id: "e1", type: "VIBES", from: "n1", to: "n2", provenance: good }],
      )),
      missingProvenance: ok(() => new Graph(
        [{ id: "n1", type: "claim", title: "a" }, { id: "n2", type: "claim", title: "b" }],
        [{ id: "e1", type: "SUPPORTS", from: "n1", to: "n2" }],
      )),
      confidenceOutOfRange: ok(() => new Graph(
        [{ id: "n1", type: "claim", title: "a" }, { id: "n2", type: "claim", title: "b" }],
        [{ id: "e1", type: "SUPPORTS", from: "n1", to: "n2",
           provenance: { ...good, confidence: 1.4 } }],
      )),
      // and the real scenario graph must build clean for every product
      scenariosBuild: await (async () => {
        const d = await import("/lib/divergence.js");
        return ["personal", "team", "business", "sam-seed"]
          .map((id) => ok(() => d.buildScenarioGraph(id)));
      })(),
    };
  });

  expect(results.danglingEdge).toMatch(/does not exist/);
  expect(results.unknownNodeType).toMatch(/Unsupported node type/);
  expect(results.unknownEdgeType).toMatch(/Unsupported edge type/);
  expect(results.missingProvenance).toMatch(/provenance is required/);
  expect(results.confidenceOutOfRange).toMatch(/between 0 and 1/);
  expect(results.scenariosBuild).toEqual([
    "no-throw", "no-throw", "no-throw", "no-throw",
  ]);
});

// The gate must re-arm after a seal. IDLE resets it, but the re-enter affordance
// only fires the re-surface preview and never returns the engine to IDLE — so a
// gate that armed once per page load would let every decision after the first
// seal without ever showing its split.
test("gate re-arms after sealing", async ({ page }) => {
  await page.goto(CUT_01_CANONICAL);
  await skipEntryOverlay(page);

  const confirm = page.locator("#dispo-primary");
  const pane = page.locator("#divergence-pane");
  const artifact = page.locator("#dispo-artifact");

  await confirm.click();                    // opens split
  await expect(pane).toBeVisible();
  await confirm.click();                    // seals
  await expect(artifact).toBeVisible();

  // the gate flag is the invariant · re-armed the moment the seal completes, so
  // the next decision cannot reach SEALING without its own DECIDING pass
  const seenAfterSeal = await page.evaluate(async () => {
    const d = await import("/lib/divergence.js");
    return d.isDivergenceSeen();
  });
  expect(seenAfterSeal, "gate must re-arm after sealing").toBe(false);

  // the split that produced this decision stays on screen · it is part of the record
  await expect(pane).toBeVisible();
});

// Every correction affordance must be reachable without a mouse — the pane is a
// decision gate, so keyboard users cannot be routed around it.
test("divergence affordances are keyboard-operable", async ({ page }) => {
  await page.goto(CUT_01_CANONICAL);
  await skipEntryOverlay(page);
  await page.locator("#dispo-primary").click();

  const pane = page.locator("#divergence-pane");
  const ground = pane.locator('[data-node="ground"]');
  await ground.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".audit-ribbon")).toContainText(
    "correction · emergence"
  );
  await expect(ground).toHaveClass(/is-corrected/);
});

test("defer works and materializes the slept-on artifact", async ({ page }) => {
  await page.goto(CUT_01_CANONICAL);
  await skipEntryOverlay(page);

  await page.locator("#dispo-defer").click();
  const artifact = page.locator("#dispo-artifact");
  await expect(artifact).toBeVisible();
  await expect(page.locator(".da-stamp")).toHaveText("Captured");
  await expect(page.locator("#da-title")).toContainText("Slept on");
});
