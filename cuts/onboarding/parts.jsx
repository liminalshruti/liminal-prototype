/* global React */
const { useState } = React;

// ─── chrome ──────────────────────────────────────────────────

const STEPS = [
  { num: "01", nm: "Pilot key" },
  { num: "02", nm: "Vault" },
  { num: "03", nm: "Identity key" },
  { num: "04", nm: "Daemon" },
  { num: "05", nm: "Connect a source" },
  { num: "06", nm: "The three reads" },
  { num: "07", nm: "Day 1" },
];

function Frame({ step, crumb, children }) {
  return (
    <div className="stage">
      <div className="frame">
        <header className="titlebar">
          <div className="lights">
            <span className="light r"></span>
            <span className="light y"></span>
            <span className="light g"></span>
          </div>
          <div className="title-row">
            <span className="diamond">◇</span>
            <span className="brand">Liminal · Onboarding</span>
            <span className="crumb-sep">·</span>
            <span className="crumb">{crumb}</span>
          </div>
          <div className="step-pill">
            <span className="acc">{STEPS[step-1].num}</span> · {STEPS[step-1].nm}
          </div>
        </header>

        <nav className="product-row">
          <button className="product-tab is-active" data-product="personal">
            <span className="pt-glyph"></span>personal<span className="pt-shape">self-read</span>
          </button>
          <button className="product-tab is-locked" disabled>
            <span className="pt-glyph"></span>team<span className="pt-shape">peer-read</span>
          </button>
          <button className="product-tab is-locked" disabled>
            <span className="pt-glyph"></span>business<span className="pt-shape">institutional-read</span>
          </button>
          <div className="surface-meta">
            <span className="sm-banner">first-run · day 0</span>
          </div>
        </nav>

        <main className="main">
          {children}
        </main>
      </div>
    </div>
  );
}

function StepRail({ step }) {
  return (
    <aside className="steprail">
      <div className="sr-title">Onboarding</div>
      <div className="sr-list">
        {STEPS.map((s, i) => {
          const idx = i + 1;
          const cls = idx < step ? "done" : idx === step ? "now" : "";
          return (
            <div key={s.num} className={"sr-item " + cls}>
              <span className="num">{s.num}</span>
              <span className="nm">{s.nm}</span>
            </div>
          );
        })}
      </div>
      <div className="sr-foot">
        Local-first vault<br/>
        Signed event log<br/>
        ⌘⇧L from any app
      </div>
    </aside>
  );
}

// ─── tray icon evolution (the only ornament beyond chrome) ──

function Tray({ stage, size = 28 }) {
  const dim = "rgba(122, 122, 130, 0.55)";
  const acc = "var(--clarity)";
  const dots = (n, opts={}) => {
    const r = 8.4; const cx = 12, cy = 12;
    return Array.from({length: 7}, (_, i) => {
      const a = (i / 7) * Math.PI * 2 - Math.PI/2;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      const sz = opts.varied ? 0.85 + ((i*0.27) % 1.3) : 1;
      return <circle key={i} cx={x} cy={y} r={1.2 * sz}
        fill={i < n ? acc : "transparent"}
        opacity={opts.faint ? 0.55 : 1}/>;
    });
  };
  const ring = <circle cx="12" cy="12" r="10.5" fill="none" stroke={dim} strokeWidth="1"/>;
  const ringL = <circle cx="12" cy="12" r="10.5" fill="none" stroke={acc} strokeWidth="1"/>;

  if (stage === 0) return <svg width={size} height={size} viewBox="0 0 24 24">{ringL}<text x="12" y="16" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill={acc}>◇</text></svg>;
  if (stage === 1) return <svg width={size} height={size} viewBox="0 0 24 24">{ring}{dots(7,{faint:true})}</svg>;
  if (stage === 2) return <svg width={size} height={size} viewBox="0 0 24 24">{ring}{dots(7,{varied:true})}</svg>;
  if (stage === 3) return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {ring}
      <path d="M12 2 L21 9 L18 21 L6 21 L3 9 Z" fill="none" stroke={dim} strokeWidth="0.6" opacity="0.65"/>
      {dots(7,{varied:true})}
    </svg>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <radialGradient id={"sigil-"+size} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#b59bff"/>
          <stop offset="100%" stopColor="#553AB1"/>
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="10.5" fill={"url(#sigil-"+size+")"} opacity="0.92"/>
      {dots(7,{varied:true})}
    </svg>
  );
}

// ─── the three bounded agents (replaces 7-factor body map) ───
//
// MVP scope per PRODUCT_DATA_MODEL.md v0.1 + decisions/2026-04-21-agents-as-worker-personas.md:
// three agents, three lanes, refusal-as-routing. Each agent has a domain
// and an anti-domain; out-of-lane requests are refused and redirected by
// name. This is PPA #4 (bounded refusal) made visible.

const AGENTS = [
  {
    key: "architect",
    name: "Architect",
    lane: "structure",
    reads: "the constraint, loop, or incentive producing the state",
    refuses: "feeling, somatic, what's underneath",
    redirect: "→ Witness",
  },
  {
    key: "witness",
    name: "Witness",
    lane: "observed behavior",
    reads: "what the signal stream shows — tone, timing, attention",
    refuses: "structural pattern, missing interface",
    redirect: "→ Architect",
  },
  {
    key: "contrarian",
    name: "Contrarian",
    lane: "inversion",
    reads: "if the obvious reading is X, what would Y look like",
    refuses: "endorsement, agreement, summary",
    redirect: "→ Architect or Witness",
  },
];

function ThreeAgents() {
  return (
    <div className="agents">
      {AGENTS.map(a => (
        <div key={a.key} className="agent">
          <div className="a-hd">
            <span className="a-name">{a.name}</span>
            <span className="a-lane">{a.lane}</span>
          </div>
          <div className="a-reads">
            <span className="a-tag reads">reads</span>
            <span className="a-text">{a.reads}</span>
          </div>
          <div className="a-reads">
            <span className="a-tag refuses">refuses</span>
            <span className="a-text">{a.refuses}</span>
          </div>
          <div className="a-redirect">{a.redirect}</div>
        </div>
      ))}
    </div>
  );
}

window.Frame = Frame;
window.StepRail = StepRail;
window.Tray = Tray;
window.ThreeAgents = ThreeAgents;
