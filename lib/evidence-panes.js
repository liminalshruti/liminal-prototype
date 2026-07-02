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
     Renders: OKR frame (product % / security %) + agent-fit swap (current → suggested route) */
  spend: {
    render: (host, ctx) => {
      /* spend evidence pane: allocation bar + agent-fit marketplace comparison */
      const allocHTML = `
        <div class="allocbar">
          <div class="p" style="width:60%">product 60%</div>
          <div class="s" style="width:40%">security 40%<span class="ghost"></span></div>
        </div>`;

      const swapHTML = `
        <div class="swap">
          <div class="side cur">
            <span class="ro">black-box team</span>
            <div class="ag">pen-test fleet</div>
            <div class="co">setup unauditable · output unverified</div>
            <span class="bd">observe + tune</span>
          </div>
          <div class="arrow">→</div>
          <div class="side sug">
            <span class="ro">calendar leak</span>
            <div class="ag">CalendarOps</div>
            <div class="co">~10% · scoped · verified</div>
            <span class="bd">route</span>
          </div>
        </div>`;

      host.innerHTML = `<div class="evidence">
        <div class="ev-h">Evidence · fleet spend vs OKR<span class="tag">$4,500 Opus · 4 teams</span></div>
        <div class="ev-body">${allocHTML}${swapHTML}</div>
      </div>`;
    },
    destroy: () => {
      /* cleanup: no persistent state or listeners */
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
     Renders: orbital diagram (4 registers as arcs) + refusal arrows (what each read refused)
     Used as the evidence pane for the personal/pattern subject */
  pattern: {
    render: (host, ctx) => {
      /* pattern evidence pane: orbital coverage visualization */
      const registers = ['Diligence', 'Synthesis', 'Judgment', 'Outreach'];
      const cx = 85, cy = 85, rad = 60;

      /* arc path generator for orbital rings (one per register, 80° spans) */
      const arcPath = (i) => {
        const a0 = (i * 90 - 40) * Math.PI / 180;
        const a1 = (i * 90 + 40) * Math.PI / 180;
        const x0 = cx + rad * Math.cos(a0);
        const y0 = cy + rad * Math.sin(a0);
        const x1 = cx + rad * Math.cos(a1);
        const y1 = cy + rad * Math.sin(a1);
        return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${rad} ${rad} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
      };

      /* label positions (register name glyphs) */
      const labelX = (i) => cx + (rad + 13) * Math.cos(i * 90 * Math.PI / 180);
      const labelY = (i) => cy + (rad + 13) * Math.sin(i * 90 * Math.PI / 180);

      /* refusal arrow positions (inward-pointing dashes from arc midpoint) */
      const refusalX = (i) => cx + (rad - 16) * Math.cos(i * 90 * Math.PI / 180);
      const refusalY = (i) => cy + (rad - 16) * Math.sin(i * 90 * Math.PI / 180);
      const arcX = (i) => cx + rad * Math.cos(i * 90 * Math.PI / 180);
      const arcY = (i) => cy + rad * Math.sin(i * 90 * Math.PI / 180);

      const orbitSVG = `<svg class="orbit" viewBox="0 0 170 170">
        <circle class="core" cx="${cx}" cy="${cy}" r="30"/>
        <text x="${cx}" y="${cy - 2}" text-anchor="middle" class="glyph" style="fill:var(--text-faint)">pattern</text>
        <text x="${cx}" y="${cy + 8}" text-anchor="middle" class="glyph" style="fill:var(--text-mute);font-size:6px">subject</text>
        ${registers.map((nm, i) => `<g class="ag r${i}" data-ag="${i}">
          <path class="arc r${i}" d="${arcPath(i)}"/>
          <line class="refuse" x1="${arcX(i).toFixed(1)}" y1="${arcY(i).toFixed(1)}" x2="${refusalX(i).toFixed(1)}" y2="${refusalY(i).toFixed(1)}"/>
          <text class="glyph" x="${labelX(i).toFixed(1)}" y="${(labelY(i) + 2).toFixed(1)}" text-anchor="middle">${nm.slice(0, 4)}</text>
        </g>`).join('')}
      </svg>`;

      host.innerHTML = `<div class="evidence">
        <div class="ev-h">Evidence · the week, as coverage<span class="tag">your signals</span></div>
        <div class="ev-body">
          <div class="orbital-pane">
            ${orbitSVG}
            <p class="orb-note">Four registers traversed the same week from different positions. Diligence read the facts; Synthesis found the shape; Judgment named the open loop and <em>refused to pathologize it</em>. The coverage is what was read · the gaps are what was refused.</p>
          </div>
        </div>
      </div>`;
    },
    destroy: () => {
      /* cleanup: no persistent state */
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
