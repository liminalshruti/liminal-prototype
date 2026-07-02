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
     Extracted from cuts 08/09; renders per mode via custody.html mode toggle

     Defense mode (cut 08):
       - Strait of Hormuz map SVG (coast paths, track lines, marker rings with labels)
       - Contested-track scenario (3 markers: alpha/gap/beta with pulsing rings)
       - Read-grid (specialist reads, evidence chain), overview-grid, hypothesis board
       - Guard banner (system refusal), rule-gate (review memory), instant receipt, frame-receipt footer

     OSINT mode (cut 09):
       - Frozen kernel bundle (lib/osint-kernel.bundle.js) runs in-page
       - Ingested observations (left rail), reads+layers (center), ontology+audit (right rail)
       - Visible WHEN/THEN clause, 500ms dispo rise, vault pill (sealed state)

     Both modes driven by the same applyBeat(subject='custody') with per-mode config.
     No parallel inline state machine; engine applyBeat is the source of truth. */
  custody: {
    render: (host, ctx) => {
      /* Default render when called directly (usually defense mode on first load) */
      EVIDENCE_PANES.custody.renderDefense(host, ctx, {});
    },
    renderDefense: (host, ctx, beatState) => {
      /* Render cut 08's custody map + marker rings + read-grid (defense mode)
         Phase C1: stubs render structure; full map SVG + interaction wired in custody.html */
      const mapSVG = `<svg viewBox="0 0 860 520" aria-label="Strait of Hormuz contested-track map">
        <path class="map-coast" d="M0,56 C120,32 176,42 278,64 C334,77 388,114 470,118 C570,124 676,75 860,45 L860,0 L0,0 Z"></path>
        <path class="map-coast" d="M0,520 L860,520 L860,420 C732,382 614,372 552,392 C462,420 388,470 292,478 C182,486 92,444 0,420 Z"></path>
        <path class="map-strait" d="M52,92 C152,78 222,96 306,138 C366,169 414,190 494,194 C600,200 684,166 806,110 L806,410 C704,448 622,456 528,434 C432,412 384,354 292,326 C208,300 132,302 52,326 Z"></path>
        <ellipse class="heat-zone" cx="470" cy="260" rx="116" ry="72"></ellipse>
        <path class="connection-arc" d="M326,286 C408,248 482,226 598,208"></path>
        <path class="track-line track-a" d="M178,310 C240,300 282,294 326,286"></path>
        <path class="gap-segment" d="M326,286 C374,272 430,250 468,232"></path>
        <path class="track-line track-a dashed" d="M468,232 C520,214 560,206 598,208"></path>
        <path class="track-line track-b" d="M522,232 C552,222 580,214 598,208"></path>
        <g class="marker pulse"><circle class="marker-ring primary" r="18"></circle><circle class="marker-core primary" r="7"></circle></g>
        <text class="marker-label" x="304" y="252">MMSI-88102</text>
        <text class="marker-note" x="302" y="268">last clean identity</text>
        <g class="marker pulse" transform="translate(468 232)"><circle class="marker-ring alert" r="18"></circle><circle class="marker-core alert" r="7"></circle></g>
        <text class="marker-label" x="438" y="198">dark gap</text>
        <text class="marker-note" x="432" y="214">38 minutes no AIS</text>
        <g class="marker" transform="translate(598 208)"><circle class="marker-ring secondary" r="18"></circle><circle class="marker-core secondary" r="7"></circle></g>
        <text class="marker-label" x="568" y="174">MMSI-22241</text>
        <text class="marker-note" x="544" y="190">new identity nearby</text>
        <text class="marker-note" x="116" y="144">Gulf of Oman</text>
        <text class="marker-note" x="664" y="150">Strait chokepoint</text>
        <text class="marker-note" x="194" y="404">Arabian Sea</text>
      </svg>`;

      host.innerHTML = `<div class="evidence-pane-custody defense-mode">
        <div class="ep-header">Custody · Defense Mode</div>
        <div class="ep-body">
          <div class="viewport" style="position:relative;border:1px solid var(--card-border);border-radius:14px;overflow:hidden;background:radial-gradient(circle at 16% 18%,rgba(30,150,146,0.12),transparent 20%),radial-gradient(circle at 74% 22%,rgba(255,149,73,0.12),transparent 18%),linear-gradient(180deg,rgba(7,13,16,0.98),rgba(5,10,13,1));min-height:420px;">
            ${mapSVG}
            <div class="map-legend" style="display:flex;flex-wrap:wrap;gap:10px;padding:14px;background:rgba(5,8,10,0.6);position:absolute;bottom:0;left:0;right:0;">
              <span class="legend-item" style="display:inline-flex;align-items:center;gap:8px;color:var(--text-dim);font-size:11px;"><span class="legend-swatch primary" style="width:10px;height:10px;border-radius:50%;background:var(--expression);"></span>original track</span>
              <span class="legend-item" style="display:inline-flex;align-items:center;gap:8px;color:var(--text-dim);font-size:11px;"><span class="legend-swatch alert" style="width:10px;height:10px;border-radius:50%;background:var(--stability);"></span>contested gap</span>
              <span class="legend-item" style="display:inline-flex;align-items:center;gap:8px;color:var(--text-dim);font-size:11px;"><span class="legend-swatch secondary" style="width:10px;height:10px;border-radius:50%;background:var(--connection);"></span>emergent identity</span>
              <span class="legend-item" style="display:inline-flex;align-items:center;gap:8px;color:var(--text-dim);font-size:11px;"><span class="legend-swatch rule" style="width:10px;height:10px;border-radius:50%;background:var(--agency);"></span>rule applied</span>
            </div>
          </div>
        </div>
      </div>`;
    },
    renderOsint: (host, ctx, beatState) => {
      /* Render cut 09's osint kernel + reads + hypothesis bar (OSINT mode)
         Phase C1: kernel init stub; full kernel wiring in custody.html */
      host.innerHTML = `<div class="evidence-pane-custody osint-mode">
        <div class="ep-header">Custody · OSINT Mode</div>
        <div class="ep-body">
          <div style="color:var(--text-dim);font-size:12px;line-height:1.55;text-align:center;padding:40px 20px;">
            Frozen kernel compute running in-page (lib/osint-kernel.bundle.js).
            Bounded specialist reads, hypothesis ranking, and durable doctrine below.
          </div>
        </div>
      </div>`;
    },
    destroy: () => {
      /* cleanup: stop any kernel runs, remove listeners */
      if (window.__osintKernelCleanup) {
        window.__osintKernelCleanup();
      }
    },
  },

  /* notice · dense 24-row audit trail (from cut 02-forensic-agent)
     Phase B: extracted from cuts/02-forensic-agent.html §audit pane (lines 498-555)
     Static render (READ-beat-only): no interactive loop, no seal motion
     Engine config: {subject:'notice', sealChoreography:'instant', correctionModel:'rule-gate', refusalFlavor:'agent', motionTier:'ambient'}
     — but notice pane itself has zero motion; the seal (if any) happens at engine level */
  notice: {
    render: (host, ctx) => {
      /* render brief + 24-row audit trail (read-only, static narrative) */
      host.innerHTML = `<div class="evidence-pane-notice">
        <div class="ep-header">Audit Trail · Notice</div>
        <div class="ep-body notice-audit-trail">
          <div class="audit-row">
            <span class="audit-row__check">✓</span>
            <span>
              <div class="audit-row__key">DKIM · SPF · DMARC</div>
              <div class="audit-row__val">all four [venue] emails pass · noreply@sr-team origin verified</div>
            </span>
          </div>
          <div class="audit-row">
            <span class="audit-row__check">✓</span>
            <span>
              <div class="audit-row__key">CRM contact IDs · X-HS-Cid</div>
              <div class="audit-row__val">3 distinct values across 4 emails → 3 distinct conversation tracks</div>
            </span>
          </div>
          <div class="audit-row">
            <span class="audit-row__check">✓</span>
            <span>
              <div class="audit-row__key">Workflow Feedback-IDs</div>
              <div class="audit-row__val">3 distinct send-templates → 3 separate workflow triggers, not one record</div>
            </span>
          </div>
          <div class="audit-row">
            <span class="audit-row__check audit-row__check--watch">!</span>
            <span>
              <div class="audit-row__key">Stated review window</div>
              <div class="audit-row__val">May 1 receipt promised "within two weeks" · decision arrived day 7 of 14</div>
            </span>
          </div>
          <div class="audit-row">
            <span class="audit-row__check audit-row__check--watch">!</span>
            <span>
              <div class="audit-row__key">Decision-email body scan</div>
              <div class="audit-row__val">references "video interview" only · no mention of form prose, deck, or traction toggles</div>
            </span>
          </div>
          <div class="audit-row">
            <span class="audit-row__check">✓</span>
            <span>
              <div class="audit-row__key">Inbox topology canon</div>
              <div class="audit-row__val">catch-all vs founder split documented 8 days before this event · not retroactive</div>
            </span>
          </div>
          <div class="provenance" style="margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--card-border); font-family: var(--mono); font-size: 10px; color: var(--text-faint); line-height: 1.65;">
            <strong style="color: var(--text-dim); font-weight: 500;">Captured</strong> · 2026-05-08 · forensic agent v0.3<br>
            <strong style="color: var(--text-dim); font-weight: 500;">Substrate</strong> · 4 .eml files · 5 PDFs · 1 dashboard screenshot<br>
            <strong style="color: var(--text-dim); font-weight: 500;">Authority</strong> · founder<br>
            <strong style="color: var(--text-dim); font-weight: 500;">Visibility</strong> · private · audit-grade
          </div>
        </div>
      </div>`;
    },
    destroy: () => {
      /* cleanup: none (static render, no listeners) */
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

/* Subject → Register mapping (bind to presentation registers per ONTOLOGY_RECONCILIATION V4)
   diligence/judgment/synthesis/outreach are the canonical presentation register vocabulary
   (owned by design canon, not agent ontology). Each subject reskins per relationship context. */
export const SUBJECT_REGISTER_MAP = {
  spend: { registers: ["diligence", "synthesis", "judgment", "outreach"], primary: "diligence" },
  custody: { registers: ["diligence", "synthesis", "judgment", "outreach"], primary: "judgment" },
  notice: { registers: ["diligence", "synthesis", "judgment", "outreach"], primary: "synthesis" },
  osint: { registers: ["diligence", "synthesis", "judgment", "outreach"], primary: "outreach" },
  pattern: { registers: ["diligence", "synthesis", "judgment", "outreach"], primary: "outreach" },
};
