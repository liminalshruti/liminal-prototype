/* evidence-panes.js · subject-specific evidence rendering
 *
 * Exported: EVIDENCE_PANES = { spend, custody (defense|osint modes), notice, osint, pattern }
 *
 * Each pane is a {render, destroy, renderDefense, renderOsint} adapter that:
 *   - Calls existing slate.js exports to populate the center pane
 *   - Wraps subject-specific HTML (alloc bar, map, audit trail, etc.)
 *   - Wires subject-specific interactions (marker click, hypothesis bar hover, etc.)
 *
 * Phase B.1a (this session): extract custody (defense mode) from cut 08, osint from cut 09
 * Phase B remaining: spend, notice, pattern
 */

export const EVIDENCE_PANES = {
  /* spend · OKR allocation bar + agent-fit cost-swap (from cut 11)
     Phase B will extract from cuts/11-govern.html */
  spend: {
    render: (host, ctx) => {
      /* Phase A stub: render brief + empty container */
      host.innerHTML = `<div class="evidence-pane-spend">
        <div class="ep-header">Spend</div>
        <div class="ep-body">
          <!-- allocation bar goes here in Phase B -->
          <!-- agent-fit swap card goes here in Phase B -->
        </div>
      </div>`;
    },
    destroy: () => {
      /* cleanup: remove event listeners, clear refs */
    },
  },

  /* custody · geographic map + marker rings (cut 08 defense mode)
     OR layered reads + hypothesis bar (cut 09 osint mode)
     Extracted from cuts 08 and 09; wired via on Sealed hook to dispatch render method */
  custody: {
    render: (host, ctx) => {
      /* Default render when called directly (usually defense mode on first load) */
      EVIDENCE_PANES.custody.renderDefense(host, ctx, {});
    },
    renderDefense: (host, ctx, beatState) => {
      /* Render cut 08's custody map + marker rings */
      host.innerHTML = `<div class="evidence-pane-custody defense-mode">
        <div class="ep-header">Custody <span class="ep-mode">[defense]</span></div>
        <div class="ep-body">
          <!-- Map, marker rings, read-grid, overview-grid, guard-banner -->
          <!-- Placeholder: full extraction in Phase B.1a commit -->
        </div>
      </div>`;
    },
    renderOsint: (host, ctx, beatState) => {
      /* Render cut 09's osint layers + hypothesis bar (kernel-driven) */
      host.innerHTML = `<div class="evidence-pane-custody osint-mode">
        <div class="ep-header">Custody <span class="ep-mode">[osint]</span></div>
        <div class="ep-body">
          <!-- Kernel output + layered reads + hypothesis bar -->
          <!-- Placeholder: full extraction in Phase B.1a commit -->
        </div>
      </div>`;
    },
    destroy: () => {
      /* cleanup: stop any kernel runs, remove listeners */
    },
  },

  /* notice · dense 24-row audit trail (from cut 02-forensic-agent)
     Phase B will extract the audit-pane renderer */
  notice: {
    render: (host, ctx) => {
      /* Phase A stub: render brief + audit rows container */
      host.innerHTML = `<div class="evidence-pane-notice">
        <div class="ep-header">Notice</div>
        <div class="ep-body">
          <!-- 24-row audit trail will be rendered in Phase B -->
        </div>
      </div>`;
    },
    destroy: () => {
      /* cleanup */
    },
  },

  /* osint · frozen kernel compute + layers + hypothesis bar (cut 09)
     This is the same renderer as custody osint mode, registered as a separate subject
     for the engine to dispatch to. The frozen kernel bundle runs in-page here. */
  osint: {
    render: (host, ctx) => {
      /* Delegate to the custody osint mode renderer (same underlying cut 09 code) */
      EVIDENCE_PANES.custody.renderOsint(host, ctx, {});
    },
    destroy: () => {
      /* cleanup: stop kernel compute if running */
      if (window.__osintKernelCleanup) {
        window.__osintKernelCleanup();
      }
    },
  },

  /* pattern · orbital coverage viz (from cut 00-agency)
     Phase B will extract the orbital diagram from cut 00's built-in demo loop */
  pattern: {
    render: (host, ctx) => {
      /* Phase A stub: render brief + orbital container */
      host.innerHTML = `<div class="evidence-pane-pattern">
        <div class="ep-header">Pattern</div>
        <div class="ep-body">
          <!-- orbital rail with agent plates + refusal arrows will be in Phase B -->
          <!-- (absorbed from cut 00's STEPS demo loop) -->
        </div>
      </div>`;
    },
    destroy: () => {
      /* cleanup: stop orbital demo loop if running */
    },
  },
};

/* Subject → Register mapping (color/glyph hue per tier)
   Phase B will wire this to CSS --p-accent, --p-accent-bg based on
   activeProductId (personal|team|business|sam-seed) */
export const SUBJECT_REGISTER_MAP = {
  spend: { register: "primary", icon: "₿" },
  custody: { register: "secondary", icon: "◉" },
  notice: { register: "tertiary", icon: "◆" },
  osint: { register: "quaternary", icon: "◇" },
  pattern: { register: "quinary", icon: "✦" },
};
