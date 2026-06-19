/* sam-seed-loop.js · Loop 2 (Interaction) for the Sam-seed situation in cut 00
 *
 * Pure state machine over a validated SAM_SEED data object.
 * Drives: entry → capture → read → contradiction → reframe → resolution
 *
 * Exports:
 *   createSamSeedLoop(samSeedData) → { state, advance, dropTile, correct, getState }
 *   where state is the loop-state object consumed by Lane 3 rendering.
 *
 * Loop-state shape:
 *   { stage, trayTiles, slatedTiles, activeReads, contradictions,
 *     reframeFired, sealed, currentAgent, timestamp }
 */

// ─── Internal stub SAM_SEED (for standalone testing)
const DEFAULT_SAM_SEED = {
  id: "sam-seed-001",
  operator: {
    label: "Sam",
    role: "founder",
    tier: 1,
  },
  situation: {
    title: "Tariq flagged on budget overrun",
    crisis_summary: "Q2 spend variance +22% vs. forecast; CFO called a check-in.",
    stakes: "team trust, financial controls, board optics",
  },
  tray_tiles: [
    { id: "t-a", label: "Q2 Actual spend (accrual)", source: "finance", kind: "ledger" },
    { id: "t-b", label: "Tariq: weekly reqs log", source: "records", kind: "transcript" },
    { id: "t-c", label: "Q1 baseline (for compare)", source: "finance", kind: "ledger" },
    { id: "t-d", label: "Sam: budget approval memo", source: "email", kind: "document" },
  ],
  agent_reads: [
    {
      agent: "Strategist",
      register: "synthesis",
      read_text: "Overspend is Tariq's approval-churn pattern.",
      confidence: 0.8,
    },
    {
      agent: "Contrarian",
      register: "judgment",
      read_text: "Overspend traces to undefined scope in Q1 brief.",
      confidence: 0.75,
    },
    {
      agent: "Manager",
      register: "judgment",
      read_text: "Tariq was operating without updated guardrails.",
      confidence: 0.7,
    },
  ],
  contradictions: [
    {
      a: "Strategist",
      b: "Contrarian",
      on: "root cause: person vs. system",
    },
  ],
  reframe: {
    from: "Tariq broke the rules",
    to: "The budget system lacks clarity under scope churn",
    copy: "This is a system tuning moment, not a performance issue.",
  },
  resolution: {
    copy: "Define approval gates per tier; Sam + Tariq align on Q3 guardrails.",
    feeling: "both move forward with clarity; no bridge burned",
  },
};

// ─── Stage lifecycle
const STAGES = ["entry", "capture", "read", "contradiction", "reframe", "resolution"];

// ─── Loop-state factory
function createLoopState(samSeed) {
  return {
    stage: "entry",
    samSeed,
    trayTiles: samSeed.tray_tiles,
    slatedTiles: [],
    activeReads: [],
    contradictions: [],
    reframeFired: false,
    sealed: false,
    currentAgent: null,
    currentReadIndex: 0,
    timestamp: new Date().toISOString(),
  };
}

// ─── Main loop controller
export function createSamSeedLoop(samSeedData = DEFAULT_SAM_SEED) {
  const loopState = createLoopState(samSeedData);

  // ─── Advance: next stage, OR within-stage rotation (e.g., read→read with new agent)
  function advance(stayInReadStage = false) {
    const currentIndex = STAGES.indexOf(loopState.stage);

    // If in read stage and stayInReadStage is true, rotate agents without advancing
    if (loopState.stage === "read" && stayInReadStage && currentIndex >= 0) {
      rotateReadAgent();
    } else if (currentIndex < STAGES.length - 1) {
      // Otherwise, advance to next stage
      const nextStage = STAGES[currentIndex + 1];
      transitionTo(nextStage);
    }
    loopState.timestamp = new Date().toISOString();
    return loopState;
  }

  // ─── Rotate to next agent reading (within read stage)
  function rotateReadAgent() {
    if (loopState.slatedTiles.length > 0 && loopState.currentReadIndex < samSeedData.agent_reads.length) {
      const nextAgent = samSeedData.agent_reads[loopState.currentReadIndex];
      loopState.currentAgent = nextAgent.agent;
      loopState.activeReads.push({
        agent: nextAgent.agent,
        register: nextAgent.register,
        read_text: nextAgent.read_text,
        confidence: nextAgent.confidence,
        timestamp: new Date().toISOString(),
      });
      loopState.currentReadIndex++;
    }
  }

  // ─── Stage transition logic
  function transitionTo(stage) {
    const prevStage = loopState.stage;
    loopState.stage = stage;

    if (stage === "entry") {
      // Entry: Sam enters, no team yet. UI shows the situation title + crisis summary.
      loopState.slatedTiles = [];
      loopState.activeReads = [];
      loopState.contradictions = [];
      loopState.reframeFired = false;
      loopState.sealed = false;
      loopState.currentAgent = null;
    } else if (stage === "capture") {
      // Capture: tiles appear in tray, ready to be dragged to slate.
      // No reads yet, no contradictions.
      loopState.trayTiles = samSeedData.tray_tiles;
    } else if (stage === "read") {
      // Read: agents examine the slated tiles and produce reads.
      // Read stage is entered; tiles may be added later via dropTile().
      // The first agent read will be triggered when tiles are actually on slate.
      // No-op on entry; rotateReadAgent() is called explicitly or via advance(true).
    } else if (stage === "contradiction") {
      // Contradiction: agents disagree. Surface the contradiction pair.
      if (samSeedData.contradictions.length > 0) {
        loopState.contradictions = samSeedData.contradictions.map(c => ({
          agent_a: c.a,
          agent_b: c.b,
          on: c.on,
          timestamp: new Date().toISOString(),
        }));
      }
    } else if (stage === "reframe") {
      // Reframe: the turn. The read flips from "indicting Tariq" to "tuning the system".
      // Fire the reframe; show the turn.
      loopState.reframeFired = true;
      loopState.reframeData = {
        from: samSeedData.reframe.from,
        to: samSeedData.reframe.to,
        copy: samSeedData.reframe.copy,
        timestamp: new Date().toISOString(),
      };
    } else if (stage === "resolution") {
      // Resolution: Sam corrects, the decision seals, the "path that doesn't burn bridges".
      loopState.sealed = true;
      loopState.resolutionData = {
        copy: samSeedData.resolution.copy,
        feeling: samSeedData.resolution.feeling,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // ─── Drop a tile from tray to slate
  function dropTile(tileId) {
    const tile = loopState.trayTiles.find(t => t.id === tileId);
    if (tile && !loopState.slatedTiles.find(t => t.id === tileId)) {
      loopState.slatedTiles.push(tile);
      // If we're in read stage and this is the first tile, trigger first agent read
      if (loopState.stage === "read" && loopState.activeReads.length === 0) {
        rotateReadAgent();
      }
      loopState.timestamp = new Date().toISOString();
    }
    return loopState;
  }

  // ─── Correct a read (amend / user correction)
  function correct(readIndex, newText) {
    if (loopState.activeReads[readIndex]) {
      loopState.activeReads[readIndex].corrected_text = newText;
      loopState.activeReads[readIndex].is_corrected = true;
      loopState.timestamp = new Date().toISOString();
    }
    return loopState;
  }

  // ─── Get current state
  function getState() {
    return JSON.parse(JSON.stringify(loopState));
  }

  return {
    state: loopState,
    advance,
    dropTile,
    correct,
    getState,
  };
}

// ─── Export DEFAULT_SAM_SEED for testing
export { DEFAULT_SAM_SEED };
