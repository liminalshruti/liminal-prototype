/* global React, Frame, StepRail, Tray, ThreeAgents */

// ─── 01 · Pilot key ─────────────────────────────────────────
//
// CANONICAL: per docs/distribution-and-onboarding-v0.1.md, v0.1 ships only
// to the founder + 2-3 design-partner founders. There is no public signup,
// no email verification, no federated identity. You install the app and
// paste a pilot key the founder gave you. Lifetime: ~6 weeks.

function S01_PilotKey() {
  return (
    <Frame step={1} crumb="pilot · v0.1">
      <section className="stage-area">
        <div className="stage-eyebrow"><span className="dot"></span>Begin · day 0</div>
        <h1 className="display">
          A workspace for the<br/>
          <em>correction stream.</em>
        </h1>

        <div className="split">
          <div>
            <p className="lede">
              Liminal records the gap between what you said and what
              actually happened — corrections, surprises, agent reads
              you disagreed with. Over weeks, the stream becomes a
              record sharper than memory. Local-first; nothing leaves
              this machine without your signature.
            </p>

            <div style={{maxWidth: 380}}>
              <label className="fld">Pilot key</label>
              <input className="input mono" defaultValue="LMNL-PILOT-7F2E-9C1A-B6D4" />
              <div className="meter-label" style={{marginTop:6}}>
                Issued to <span style={{color:"var(--clarity)"}}>Shruti</span> · 6-week pilot · expires 2026-06-08
              </div>
            </div>

            <div className="footnote">
              <span className="lock"></span>
              v0.1 is an invite-only pilot · 3 design partners · no public signup
            </div>
          </div>

          <div className="pane-r">
            <div className="pull-quote" style={{fontStyle:"normal", fontFamily:"var(--sans)"}}>
              <div style={{fontSize:11, letterSpacing:".14em", textTransform:"uppercase", color:"var(--text-dim)", marginBottom:14}}>
                What this is not
              </div>
              <ul style={{listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:10, fontSize:13.5, lineHeight:1.5, color:"var(--text)"}}>
                <li>— not a journal app</li>
                <li>— not a coach</li>
                <li>— not a productivity tool</li>
                <li>— not a wellness product</li>
              </ul>
              <div style={{height:18, borderTop:"1px solid var(--card-border)", margin:"22px 0 16px"}}></div>
              <div style={{fontSize:11, letterSpacing:".14em", textTransform:"uppercase", color:"var(--text-dim)", marginBottom:14}}>
                What it is
              </div>
              <div style={{fontSize:13.5, lineHeight:1.55, color:"var(--text)"}}>
                A signed event log of your reads, your corrections,
                and three bounded agents that disagree with each other
                in writing.
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <button className="btn btn-primary">Continue <span className="kbd">↵</span></button>
          <button className="btn btn-ghost">I don't have a key</button>
        </div>
      </section>
      <StepRail step={1} />
    </Frame>
  );
}

// ─── 02 · Vault (passphrase) ────────────────────────────────
//
// Canon: vault.db is a SQLite file at ~/Library/Application Support/Liminal/.
// Encrypted at rest with a passphrase the user owns. First write is the
// genesis event — no mythologizing.

function S02_Vault() {
  return (
    <Frame step={2} crumb="vault · passphrase">
      <section className="stage-area">
        <div className="stage-eyebrow"><span className="dot"></span>Vault</div>

        <div className="split">
          <div>
            <h1 className="display">One file. <em>This machine.</em></h1>
            <p className="lede">
              Every read, correction, and agent response is appended to
              a single SQLite file on this disk. The passphrase encrypts
              it at rest. We cannot recover it for you — that is the
              point. If you forget it, the record is gone.
            </p>

            <label className="fld">Passphrase</label>
            <input className="input mono" type="password" defaultValue="••••••••••••••••••" />
            <div className="meter">
              <span className="on"></span><span className="on"></span><span className="on"></span>
              <span className="on"></span><span></span><span></span>
            </div>
            <div className="meter-label">Strong · 4 of 6</div>

            <div style={{height: 18}}></div>
            <label className="fld">Confirm</label>
            <input className="input mono" type="password" defaultValue="••••••••••••••••••" />

            <div className="footnote">
              <span className="lock"></span>
              Passphrase stored in macOS keychain · vault.db on local disk only
            </div>
          </div>

          <div className="pane-r">
            <div className="vault">
              <div className="hdr">
                <span>~/Library/Application Support/Liminal</span>
                <span>local</span>
              </div>
              <div className="vault-block">
                <div className="row-l hl"><span className="ico">▸</span><span className="nm">vault.db</span><span className="sz">pending</span></div>
                <div className="row-l"><span className="ico">·</span><span className="nm">events/</span><span className="sz">empty</span></div>
                <div className="row-l"><span className="ico">·</span><span className="nm">attachments/</span><span className="sz">empty</span></div>
                <div className="row-l"><span className="ico">·</span><span className="nm">keys/</span><span className="sz">empty</span></div>
                <div className="row-l"><span className="ico">·</span><span className="nm">config.toml</span><span className="sz">2 KB</span></div>
                <div className="row-l"><span className="ico">·</span><span className="nm">daemon.log</span><span className="sz">empty</span></div>
              </div>
            </div>

            <p style={{marginTop: 14, fontFamily:"var(--sans)", fontSize:12.5, lineHeight:1.55, color:"var(--text-dim)"}}>
              On <span className="kbd" style={{background:"rgba(255,255,255,0.06)"}}>⌘↵</span>, Liminal creates
              <span style={{color:"var(--clarity)"}}> vault.db</span> and writes
              event #1 (<span className="mono" style={{color:"var(--text)"}}>vault.created</span>).
              Every subsequent event references the previous by hash.
            </p>
          </div>
        </div>

        <div className="row">
          <button className="btn btn-primary">Create vault <span className="kbd">⌘↵</span></button>
          <button className="btn btn-ghost">What if I forget?</button>
        </div>
      </section>
      <StepRail step={2} />
    </Frame>
  );
}

// ─── 03 · Identity key ──────────────────────────────────────
//
// Canon: Ed25519 keypair, private key in macOS keychain, public key written
// to vault.db. Every event is signed. This is the substrate of PPA #5
// (the record verifies itself).

function S03_Identity() {
  return (
    <Frame step={3} crumb="vault · identity key">
      <section className="stage-area">
        <div className="stage-eyebrow"><span className="dot"></span>Identity key</div>
        <h1 className="display">Sign every event<br/>with <em>your key.</em></h1>
        <p className="lede">
          Liminal generated an Ed25519 keypair on this device. Every
          event the daemon writes — a captured signal, a correction,
          an agent read — is signed with the private key. Years from
          now, the record can prove it has not been tampered with.
        </p>

        <div className="fingerprint">
          <span className="lbl">Fingerprint</span>
          <span className="hex">ed25519 · 4f7c 8b2e 91a3 d6f0 · 22e8 1c4b 7a9d e305</span>
        </div>

        <div style={{maxWidth: 460, marginTop: 8}}>
          <label className="fld">Name this device</label>
          <input className="input" defaultValue="Mac Studio · home" />
        </div>

        <div className="footnote">
          <span className="lock"></span>
          Private key in <span style={{color:"var(--clarity)", marginLeft: 4}}>com.liminal.vault</span> · public key written to vault.db
        </div>

        <div className="row">
          <button className="btn btn-primary">Save key <span className="kbd">⌘↵</span></button>
          <button className="btn btn-ghost">Show recovery phrase</button>
        </div>
      </section>
      <StepRail step={3} />
    </Frame>
  );
}

// ─── 04 · Daemon ────────────────────────────────────────────
//
// Canon, replacing the "two anchors" frame: the daemon is a background
// process polling sources every ~5–10 min, writing signal events to
// vault.db. The user-facing surface is the global shortcut ⌘⇧L for
// on-demand reads. There are no scheduled invitations in v0.1.

function S04_Daemon() {
  return (
    <Frame step={4} crumb="daemon · background process">
      <section className="stage-area">
        <div className="stage-eyebrow"><span className="dot"></span>Daemon</div>
        <h1 className="display">The daemon runs<br/><em>quietly.</em></h1>
        <p className="lede">
          A background process polls the sources you connect, writes
          signal events to <span className="mono" style={{color:"var(--text)"}}>vault.db</span>,
          and stays out of your way. There are no notifications and
          no scheduled prompts. You read the stream when you want it,
          via the global shortcut.
        </p>

        <div className="vault" style={{padding:"14px 16px"}}>
          <div className="hdr"><span>Polling cadence</span><span>can change later</span></div>
          <div className="row-l">
            <span className="ico">·</span>
            <span className="nm">How often the daemon checks connected sources</span>
            <span className="sz">5 min · <span style={{color:"var(--clarity)"}}>10 min</span> · 30 min · hourly</span>
          </div>
          <div className="row-l">
            <span className="ico">·</span>
            <span className="nm">Pause polling when on battery below 20%</span>
            <span className="sz" style={{color:"var(--clarity)"}}>on</span>
          </div>
        </div>

        <div style={{height: 16}}></div>

        <div className="vault" style={{padding:"14px 16px"}}>
          <div className="hdr"><span>Global shortcut</span><span>configurable</span></div>
          <div className="row-l">
            <span className="ico">⌘</span>
            <span className="nm">Open the read pane from any app</span>
            <span className="sz">
              <span className="kbd" style={{background:"rgba(255,255,255,0.06)"}}>⌘</span>
              {" "}<span className="kbd" style={{background:"rgba(255,255,255,0.06)"}}>⇧</span>
              {" "}<span className="kbd" style={{background:"rgba(255,255,255,0.06)"}}>L</span>
            </span>
          </div>
          <div className="row-l">
            <span className="ico">⌘</span>
            <span className="nm">Quick-capture a correction inline</span>
            <span className="sz">
              <span className="kbd" style={{background:"rgba(255,255,255,0.06)"}}>⌘</span>
              {" "}<span className="kbd" style={{background:"rgba(255,255,255,0.06)"}}>⇧</span>
              {" "}<span className="kbd" style={{background:"rgba(255,255,255,0.06)"}}>'</span>
            </span>
          </div>
        </div>

        <div className="footnote" style={{marginTop:18}}>
          <span className="lock"></span>
          Daemon binary: <span className="mono" style={{color:"var(--text)"}}>liminald</span> · launchd agent · logs to daemon.log
        </div>

        <div className="row">
          <button className="btn btn-primary">Continue <span className="kbd">↵</span></button>
          <button className="btn btn-ghost">Skip — set this later</button>
        </div>
      </section>
      <StepRail step={4} />
    </Frame>
  );
}

// ─── 05 · Connect a source ──────────────────────────────────
//
// Canon: per PRODUCT_DATA_MODEL.md, v0.1 supports a small set of local
// signal sources (calendar, screen activity, manual capture). The
// daemon needs at least one before the stream has anything in it.

function S05_Source() {
  return (
    <Frame step={5} crumb="signal · sources">
      <section className="stage-area">
        <div className="stage-eyebrow"><span className="dot"></span>Sources</div>
        <h1 className="display">Connect at least <em>one source.</em></h1>
        <p className="lede">
          The daemon reads from sources you authorize. Everything stays
          local — Liminal never proxies your data through a server. Pick
          one to start; you can add or remove sources any time.
        </p>

        <div className="anchors">
          <div className="anchor-card sel">
            <div className="hd">
              <span className="name">macOS Calendar</span>
              <span className="when">read-only</span>
            </div>
            <div style={{padding:"14px 18px 16px", fontSize:13, lineHeight:1.5, color:"var(--text-dim)"}}>
              Events, durations, attendees (names hashed).
              No event bodies. <span style={{color:"var(--clarity)"}}>Selected.</span>
            </div>
          </div>
          <div className="anchor-card">
            <div className="hd">
              <span className="name">Screen activity</span>
              <span className="when">app-level only</span>
            </div>
            <div style={{padding:"14px 18px 16px", fontSize:13, lineHeight:1.5, color:"var(--text-dim)"}}>
              Frontmost app + idle windows. No keystrokes,
              no screenshots, no window titles.
            </div>
          </div>
          <div className="anchor-card">
            <div className="hd">
              <span className="name">Manual capture</span>
              <span className="when">always on</span>
            </div>
            <div style={{padding:"14px 18px 16px", fontSize:13, lineHeight:1.5, color:"var(--text-dim)"}}>
              <span className="kbd" style={{background:"rgba(255,255,255,0.06)"}}>⌘⇧'</span> from any app to write a correction
              into the stream by hand.
            </div>
          </div>
        </div>

        <div className="footnote" style={{marginTop:22}}>
          <span className="lock"></span>
          Each source is a separate macOS permission grant · revocable in System Settings
        </div>

        <div className="row">
          <button className="btn btn-primary">Authorize Calendar <span className="kbd">⌘↵</span></button>
          <button className="btn btn-ghost">Skip — manual capture only</button>
        </div>
      </section>
      <StepRail step={5} />
    </Frame>
  );
}

// ─── 06 · The three reads ───────────────────────────────────
//
// Canon, replacing 7-factor body map: per
// decisions/2026-04-21-agents-as-worker-personas.md, v0.1 ships three
// bounded agents — Architect, Witness, Contrarian — each with a
// declared lane and an explicit anti-domain. Out-of-lane requests are
// refused and redirected by name. This is PPA #4 made tangible.

function S06_ThreeReads() {
  return (
    <Frame step={6} crumb="the three reads">
      <section className="stage-area">
        <div className="stage-eyebrow"><span className="dot"></span>The instrument</div>

        <div style={{maxWidth: 760}}>
          <h1 className="display">Three agents.<br/><em>One refuses each thing.</em></h1>
          <p className="lede">
            Most assistants try to help with everything. These three
            don't. Each has a lane, and explicitly refuses what isn't
            in it — redirecting you, by name, to whichever agent does
            handle that. The disagreement is the feature. The refusal
            is the routing.
          </p>
        </div>

        <div style={{height: 8}}></div>

        <ThreeAgents />

        <div className="footnote" style={{marginTop:22}}>
          <span className="lock"></span>
          Reads are written to vault.db as signed events · ⌘⇧L from any app to invoke
        </div>

        <div className="row">
          <button className="btn btn-primary">Try one read now <span className="kbd">↵</span></button>
          <button className="btn btn-ghost">Tomorrow morning</button>
        </div>
      </section>
      <StepRail step={6} />
    </Frame>
  );
}

// ─── 07 · Day 1 ──────────────────────────────────────────────
//
// Canon kept: PPA #6 (earned expressiveness). New users see structure
// only; the tray icon fills in over the first ~60 days as the vault
// accumulates events. No two users' icons end up identical.

function S07_Day1() {
  return (
    <Frame step={7} crumb="day 1 · the empty workspace">
      <section className="stage-area">
        <div className="stage-eyebrow"><span className="dot"></span>Day 1</div>
        <h1 className="display">The vault is <em>empty.</em><br/>That is correct.</h1>
        <p className="lede">
          The daemon is running. Calendar is connected. The three
          agents are loaded. What remains is the practice — corrections,
          captures, reads — and the vault filling out as it goes. Your
          tray icon is a sigil-in-progress.
        </p>

        <div className="welcome-mark">
          <div className="seal"></div>
          <div>
            <div className="nm">Mac Studio · home</div>
            <div className="desc">vault.db · 1 event · ed25519 4f7c · daemon: live</div>
          </div>
        </div>

        <div style={{height: 16}}></div>

        <div className="vault">
          <div className="hdr">
            <span>Your tray icon, over time</span>
            <span>earned expressiveness</span>
          </div>
          <div className="tray-evo">
            <div className="cell now">
              <Tray stage={0} size={32} />
              <div className="day">Day 1 · today</div>
            </div>
            <div className="cell">
              <Tray stage={1} size={32} />
              <div className="day">Day 7</div>
            </div>
            <div className="cell">
              <Tray stage={2} size={32} />
              <div className="day">Day 14</div>
            </div>
            <div className="cell">
              <Tray stage={3} size={32} />
              <div className="day">Day 30</div>
            </div>
            <div className="cell">
              <Tray stage={4} size={32} />
              <div className="day">Day 60</div>
            </div>
          </div>
        </div>

        <div className="row">
          <button className="btn btn-primary">Take the first read <span className="kbd">⌘⇧L</span></button>
          <button className="btn btn-ghost">Quit to tray</button>
        </div>
      </section>
      <StepRail step={7} />
    </Frame>
  );
}

window.Screens = {
  S01_Welcome:    S01_PilotKey,
  S02_Verify:     S02_Vault,
  S03_Passphrase: S03_Identity,
  S04_Keys:       S04_Daemon,
  S05_Anchor:     S05_Source,
  S06_Primer:     S06_ThreeReads,
  S07_Day1:       S07_Day1,
};
