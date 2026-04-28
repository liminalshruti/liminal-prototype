/* previews.js · per-tile authentic source-app HTML
 *
 * Each tile id maps to a string of HTML that visually mimics what the
 * source app (git, slack, granola, calendar, obsidian, vault, evidence)
 * would render. Used by tray.js and slate.js. The literal "REFUSED"
 * marks tiles that should fall back to the refused-preview shape.
 */

export const PREVIEWS = {
      brian_commits_21d: `
        <div class="tile-preview git">
          <div class="tg-row"><span class="tg-hash">a3f2b1c</span><span class="tg-msg">refactor: extract pattern detector</span></div>
          <div class="tg-row"><span class="tg-stats">+47</span><span class="tg-stats del">-23</span><span class="tg-msg" style="font-size:9px;color:var(--text-faint)">main.ts · 6h ago</span></div>
          <div class="tg-row"><span class="tg-hash">9b4d2e1</span><span class="tg-msg">wip: token consolidation</span></div>
          <div class="tg-row"><span class="tg-stats">+12</span><span class="tg-stats del">-89</span><span class="tg-msg" style="font-size:9px;color:var(--text-faint)">utils.ts · 2d ago</span></div>
        </div>`,
      brian_calendar_21d: `
        <div class="tile-preview calendar">
          <div class="tc-event"><span class="tc-time">10:00</span><span>standup</span></div>
          <div class="tc-event muted"><span class="tc-time">14:00</span><span>1:1 · declined</span></div>
          <div class="tc-event"><span class="tc-time">16:30</span><span>eng review</span></div>
          <div class="tc-event muted"><span class="tc-time">tomorrow</span><span>retro · tentative</span></div>
        </div>`,
      brian_slack_texture: `
        <div class="tile-preview slack">
          <div class="ts-channel"># eng · 142 msgs · 21d window</div>
          <div class="ts-msg">
            <div class="ts-avatar">br</div>
            <div class="ts-msg-body"><strong>brian</strong>maybe we should hold the launch · I want to think more carefully about the rollout shape</div>
          </div>
          <div class="ts-msg">
            <div class="ts-avatar b">kr</div>
            <div class="ts-msg-body"><strong>kriti</strong>noted · let's pick this up in 1:1</div>
          </div>
        </div>`,
      brian_standups: `
        <div class="tile-preview calendar">
          <div class="tc-event"><span class="tc-time">mon</span><span>present · brief</span></div>
          <div class="tc-event muted"><span class="tc-time">tue</span><span>missed</span></div>
          <div class="tc-event muted"><span class="tc-time">wed</span><span>missed</span></div>
          <div class="tc-event"><span class="tc-time">thu</span><span>present · short</span></div>
        </div>`,
      brian_dms: "REFUSED",
      brian_prior_w1: `
        <div class="tile-preview vault">
          <div class="tv-meta">Q4 2024 · resolved</div>
          <div class="tv-summary">"Brian's drift was an academic-publication cleanup. Internal pattern returned to baseline within 4 days."</div>
        </div>`,
      brian_prior_w2: `
        <div class="tile-preview vault">
          <div class="tv-meta">Mar 2025 · resolved</div>
          <div class="tv-summary">"Family bereavement. Brian disclosed at week 2 of drift. Consent-class held."</div>
        </div>`,
      kriti_obsidian: `
        <div class="tile-preview obsidian">
          <span class="to-tag">brian/2025-04-23</span>
          <div class="to-line">noticed brian skipped tuesday standup</div>
          <div class="to-line">third one this month · check own pattern</div>
          <div class="to-line">am I reading him through my own stress</div>
        </div>`,
      sean_commits_17d: `
        <div class="tile-preview git">
          <div class="tg-row"><span class="tg-hash">d7f1a3e</span><span class="tg-msg">core/agent: bounded refusal contract</span></div>
          <div class="tg-row"><span class="tg-stats">+184</span><span class="tg-stats del">-42</span><span class="tg-msg" style="font-size:9px;color:var(--text-faint)">17d window</span></div>
          <div class="tg-row"><span class="tg-hash">8c2e9b4</span><span class="tg-msg">research: spike on local inference</span></div>
        </div>`,
      sean_granola_joint: `
        <div class="tile-preview granola">
          <div class="tg-line" data-speaker="SR">"the pivot question is real but I don't think we should decide it this week"</div>
          <div class="tg-line" data-speaker="SE">"agreed · let's let the contrarian read settle for two weekly cycles"</div>
        </div>`,
      sean_slack_thread: "REFUSED",
      sean_obsidian: "REFUSED",
      shruti_corrections: `
        <div class="tile-preview vault">
          <div class="tv-meta">4 prior reads · joint vault</div>
          <div class="tv-summary">"All 4 prior cofounder coherence windows resolved through normal cycle. Default: log-and-watch."</div>
        </div>`,
      maya_attendance: `
        <div class="tile-preview calendar">
          <div class="tc-event"><span class="tc-time">9:00</span><span>standup</span></div>
          <div class="tc-event"><span class="tc-time">11:00</span><span>design review</span></div>
          <div class="tc-event"><span class="tc-time">15:00</span><span>1:1 with kriti</span></div>
        </div>`,
      maya_slack_msgs: "REFUSED",
      maya_commits: "REFUSED",
      janice_granola: `
        <div class="tile-preview granola">
          <div class="tg-line" data-speaker="JT">"I want you to read me on cofounder dynamics first · the hire decision second"</div>
          <div class="tg-line" data-speaker="SR">"that's the order I had in mind too"</div>
        </div>`,
      janice_emails: "REFUSED",
      case_file_S: `
        <div class="tile-preview evidence">
          <div class="te-line"><strong>SUBJECT-S</strong> · cleared sysadmin</div>
          <div class="te-line">NSA Hawaii · CI Cell 4</div>
          <div class="te-line">year 4 of 5 · clearance cycle</div>
          <div class="te-stat">21d baseline drift detected</div>
        </div>`,
      access_log_21d: `
        <div class="tile-preview evidence">
          <div class="te-line">21d window · <strong>247 events</strong></div>
          <div class="te-line">after-hours access · 14 events</div>
          <div class="te-line">cross-compartment queries · 6</div>
          <div class="te-stat">92nd %ile vs cohort baseline</div>
        </div>`,
      peer_baseline: `
        <div class="tile-preview evidence">
          <div class="te-line"><strong>n=147</strong> cleared sysadmins</div>
          <div class="te-line">NSA Hawaii · same role</div>
          <div class="te-line">drift envelope · 99th %ile</div>
          <div class="te-stat">subject-s exceeds baseline</div>
        </div>`,
      forum_osint: `
        <div class="tile-preview evidence">
          <div class="te-line">public-domain · 12 posts · 90d</div>
          <div class="te-line">technical-blog · academic in tone</div>
          <div class="te-line">topic: post-quantum crypto</div>
          <div class="te-stat">consistent with academic interest</div>
        </div>`,
      tonality_drift: `
        <div class="tile-preview evidence">
          <div class="te-line">90d tonality · IM + email</div>
          <div class="te-line">sentiment shift <strong>-22%</strong></div>
          <div class="te-line">formality up · personal references down</div>
          <div class="te-stat">window aligns with access drift</div>
        </div>`,
      prior_case_2024: `
        <div class="tile-preview vault">
          <div class="tv-meta">vendor-Q · 2024 · resolved benign</div>
          <div class="tv-summary">"Similar shape · academic publication cleanup. Resolved within 8 weeks of intake."</div>
        </div>`,
      ts_sci_memo: "REFUSED",
      top_secret_intel: "REFUSED",
      subject_audit_chain: `
        <div class="tile-preview vault">
          <div class="tv-meta">§552a(d) release · 14 events</div>
          <div class="tv-summary">"Audit chain · subject-S can request this trail at any moment. Cryptographically signed."</div>
        </div>`,

      /* ─── Personal · founder-OS tile previews ─────────────────────── */
      term_sheet_doc: `
        <div class="tile-preview vault">
          <div class="tv-meta">Term sheet v3 · ${"signed-blue-pen-needed"} · 6 pages</div>
          <div class="tv-summary">"$8M @ $42M post · 2-yr runway · 2 board seats · option-pool reset to 12% pre-money"</div>
        </div>`,
      investor_granola: `
        <div class="tile-preview granola">
          <div class="tg-line" data-speaker="LI">"we're ready to move · I think you'll regret holding for the round you've been chasing"</div>
          <div class="tg-line" data-speaker="SR">"the round I'm chasing is six weeks out · it's not abstract"</div>
          <div class="tg-line" data-speaker="LI">"six weeks is a long time at your burn"</div>
        </div>`,
      advisor_thread: `
        <div class="tile-preview slack">
          <div class="ts-channel"># advisors · 8 msgs · today</div>
          <div class="ts-msg">
            <div class="ts-avatar">jt</div>
            <div class="ts-msg-body"><strong>janice</strong>take it · the round you want is theoretical · this round is real</div>
          </div>
          <div class="ts-msg">
            <div class="ts-avatar b">ka</div>
            <div class="ts-msg-body"><strong>kareem</strong>hold · you'll undervalue the company by 30% if you take this · it's noise</div>
          </div>
        </div>`,
      metrics_dashboard: `
        <div class="tile-preview vault">
          <div class="tv-meta">Runway · ARR · burn</div>
          <div class="tv-summary">"$48k MRR · 14% MoM · 14mo runway @ current burn · 22mo if you cut the second eng hire"</div>
        </div>`,
      values_doc_jan: `
        <div class="tile-preview obsidian">
          <span class="to-tag">founding/why-we-started.md · jan 14</span>
          <div class="to-line">build the thing only you can build</div>
          <div class="to-line">don't optimize for the round · optimize for the company</div>
          <div class="to-line">"speed is a tax on conviction" · sr quote</div>
        </div>`,
      founding_calendar: `
        <div class="tile-preview calendar">
          <div class="tc-event"><span class="tc-time">mon</span><span>3 investor meets</span></div>
          <div class="tc-event"><span class="tc-time">tue</span><span>2 + partner ref check</span></div>
          <div class="tc-event muted"><span class="tc-time">wed</span><span>nothing booked</span></div>
          <div class="tc-event"><span class="tc-time">thu</span><span>4 + 1 close call</span></div>
        </div>`,

      hire_loop_notes: `
        <div class="tile-preview obsidian">
          <span class="to-tag">hiring/q2.md · 3 finalists</span>
          <div class="to-line">A · craft, will execute on what you give</div>
          <div class="to-line">B · craft, slightly faster, less judgment</div>
          <div class="to-line">C · less craft, but reframes the problem</div>
        </div>`,
      candidate_a_granola: `
        <div class="tile-preview granola">
          <div class="tg-line" data-speaker="A">"I'd ship the migration the way you scoped it · 6 weeks, low risk"</div>
          <div class="tg-line" data-speaker="SR">"and if the scope is wrong?"</div>
          <div class="tg-line" data-speaker="A">"that's a product call · I'd flag it"</div>
        </div>`,
      candidate_b_granola: `
        <div class="tile-preview granola">
          <div class="tg-line" data-speaker="B">"the migration is the wrong shape · you'd be locking in a v1 that bottlenecks v3"</div>
          <div class="tg-line" data-speaker="SR">"what would you propose?"</div>
          <div class="tg-line" data-speaker="B">"a 2-week spike on the v3 model first · then decide"</div>
        </div>`,
      team_vote_thread: `
        <div class="tile-preview slack">
          <div class="ts-channel"># hiring-q2 · 14 msgs</div>
          <div class="ts-msg">
            <div class="ts-avatar b">se</div>
            <div class="ts-msg-body"><strong>sean</strong>B · we need someone who'll push back on me</div>
          </div>
          <div class="ts-msg">
            <div class="ts-avatar">ma</div>
            <div class="ts-msg-body"><strong>maya</strong>A · we need execution velocity right now</div>
          </div>
        </div>`,
      team_shape_doc: `
        <div class="tile-preview obsidian">
          <span class="to-tag">team/shape-18mo.md</span>
          <div class="to-line">eng of 4 by Q3 · two sr, one mid, one founding</div>
          <div class="to-line">if v3 model lands, hire C-shape next · else A-shape</div>
        </div>`,

      v2_migration_branch: `
        <div class="tile-preview git">
          <div class="tg-row"><span class="tg-hash">f72c1a4</span><span class="tg-msg">ds-v2: token migration · components</span></div>
          <div class="tg-row"><span class="tg-stats">+912</span><span class="tg-stats del">-403</span><span class="tg-msg" style="font-size:9px;color:var(--text-faint)">47 commits · 2wk in flight</span></div>
        </div>`,
      v2_audit_doc: `
        <div class="tile-preview evidence">
          <div class="te-line"><strong>DS-142</strong> · v2 migration audit</div>
          <div class="te-line">81 components · 64% migrated</div>
          <div class="te-stat">12 components blocked on v3 token shape</div>
        </div>`,
      design_review_granola: `
        <div class="tile-preview granola">
          <div class="tg-line" data-speaker="MA">"if we cut now we ship v1 + v2 in production · the inconsistency will look bad"</div>
          <div class="tg-line" data-speaker="SR">"if we finish in flight we're still cutting in 3 weeks · same problem"</div>
        </div>`,
      ds_v2_principles: `
        <div class="tile-preview obsidian">
          <span class="to-tag">ds-v2.md · principles</span>
          <div class="to-line">tokens are contracts · not suggestions</div>
          <div class="to-line">if v2 doesn't change behavior, don't ship v2</div>
          <div class="to-line">register-coded accents · per-surface modulation</div>
        </div>`,

      self_calendar_90d: `
        <div class="tile-preview calendar">
          <div class="tc-event"><span class="tc-time">90d</span><span>54% in meetings (was 38% in jan)</span></div>
          <div class="tc-event muted"><span class="tc-time">last 30d</span><span>only 4 long-write blocks (was 12)</span></div>
          <div class="tc-event"><span class="tc-time">today</span><span>0 long-write blocks</span></div>
        </div>`,
      commits_90d: `
        <div class="tile-preview git">
          <div class="tg-row"><span class="tg-hash">90d</span><span class="tg-msg">142 commits · across 6 repos</span></div>
          <div class="tg-row"><span class="tg-stats">82%</span><span class="tg-msg" style="font-size:9px;color:var(--text-faint)">small commits (was 45% in jan)</span></div>
          <div class="tg-row"><span class="tg-hash">30d</span><span class="tg-msg">no large refactors · all small fixes</span></div>
        </div>`,
};
