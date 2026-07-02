/* evidence-panes.js · subject-specific evidence rendering
 *
 * Exported: EVIDENCE_PANES = { spend, custody, notice, osint, pattern }
 *
 * Each pane is a {render, destroy} adapter that:
 *   - Calls existing slate.js exports to populate the center pane
 *   - Wraps subject-specific HTML (alloc bar, map, audit trail, etc.)
 *   - Wires subject-specific interactions (marker click, hypothesis bar hover, etc.)
 *
 * Phase A: stubs with documented contracts
 * Phase B: real extraction from cuts 11, 08, 09, 02, 00
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

  /* custody · geographic map + marker rings (cut 08) OR layered reads + hypothesis bar (cut 09)
     Phase B will extract both modes and wire mode toggle */
  custody: {
    render: (host, ctx) => {
      /* Phase A stub: render brief + mode indicator */
      host.innerHTML = `<div class="evidence-pane-custody">
        <div class="ep-header">Custody <span class="ep-mode">[mode: defense]</span></div>
        <div class="ep-body">
          <!-- map SVG + marker rings (cut 08 defense) OR -->
          <!-- layers + hyp-bar (cut 09 osint) will be wired in Phase B -->
        </div>
      </div>`;
    },
    destroy: () => {
      /* cleanup */
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
     Phase B will extract kernel init + layered-read renderer */
  osint: {
    render: (host, ctx) => {
      /* Phase A stub: render brief + kernel placeholder */
      host.innerHTML = `<div class="evidence-pane-osint">
        <div class="ep-header">OSINT</div>
        <div class="ep-body">
          <!-- kernel bundle load (osint-kernel.bundle.js) + layers will be in Phase B -->
        </div>
      </div>`;
    },
    destroy: () => {
      /* cleanup: stop kernel compute if running */
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
