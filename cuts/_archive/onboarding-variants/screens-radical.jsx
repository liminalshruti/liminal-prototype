/* global React, Tray */

// ─── radical onboarding · 3 steps ────────────────────────────
//
// THESIS (per the founder-brain corpus + product canon):
//
//   Most onboarding asks the user to perform belonging — fill a form,
//   verify an email, configure a workspace — before delivering any value.
//   Liminal's primitive is the DELTA: the gap between what was said and
//   what actually happened. The radical version makes that primitive
//   the entire onboarding.
//
//   Three steps. Each one produces an artifact. The vault is created
//   as a side effect of the first interaction, not in preparation for one.
//
//     01 · A read       — the Witness agent writes a 2-sentence read
//                         of the moment of installation. it is partly
//                         wrong on purpose. the user's job is to read.
//     02 · A correction — the user redlines what's wrong. the
//                         correction is the artifact. no form. no field.
//     03 · A signature  — the corrected event is signed with a fresh
//                         Ed25519 key and written as event #1 of the
//                         vault. the tray icon lights one dot.
//
//   What's absent is the point: no email, no passphrase, no source list,
//   no instrument primer. v0.1 is invite-only — those settings are
//   pre-provisioned by the pilot key the user installed with. Onboarding
//   is the demo. The demo is the product. The first artifact lives
//   forever in the vault and verifies itself.

// ─── frame (3-step variant) ──────────────────────────────────

const STEPS3 = [
  { num: "01", nm: "A read" },
  { num: "02", nm: "A correction" },
  { num: "03", nm: "A signature" },
];

function FrameR({ step, crumb, children }) {
  return (
    <div className="frame" data-step={step}>
      <div className="frame-chrome">
        <span className="tl tl-r"></span>
        <span className="tl tl-y"></span>
        <span className="tl tl-g"></span>
        <span className="frame-title">Liminal — first read · v0.1 pilot</span>
      </div>
      <div className="frame-body">
        <header className="stage-head">
          <div className="bcrumb">
            <span className="brand">liminal</span>
            <span className="sep">/</span>
            <span className="crumb">{crumb}</span>
          </div>
          <div className="step-pill">
            <span className="acc">{STEPS3[step-1].num}</span> · {STEPS3[step-1].nm}
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}

function StepRail3({ step }) {
  return (
    <aside className="rail3">
      {STEPS3.map((s, i) => {
        const idx = i + 1;
        const state = idx < step ? "done" : idx === step ? "now" : "upcoming";
        return (
          <div key={s.num} className={"rail3-row " + state}>
            <span className="rail3-num">{s.num}</span>
            <span className="rail3-nm">{s.nm}</span>
            <span className="rail3-dot"></span>
          </div>
        );
      })}
    </aside>
  );
}

// ─── 01 · A read ─────────────────────────────────────────────
//
// The Witness agent observes the moment of installation. The
// observation is specific enough to feel uncanny, generic enough
// that a real founder will find at least one thing to correct.
// The "wrongness" is the hook into step 02. There is no other
// affordance on this page — read it, then correct it.

function R01_Read() {
  return (
    <FrameR step={1} crumb="event 0 · the first read">
      <section className="rstage">
        <div className="r-eyebrow">
          <span className="r-agent-tag witness">Witness</span>
          <span className="r-lane">observed behavior · 14:47 PST · sun</span>
        </div>

        <p className="r-read">
          You installed this on a Sunday afternoon, three weeks
          after your last <em>shipping</em> commit. The browser you used
          to download was open to a tab titled <em>"series A bridge
          term sheet — draft 4."</em> This is a tool you went looking for.
        </p>

        <div className="r-meta">
          <div className="r-meta-row">
            <span className="r-meta-tag">substrate</span>
            <span className="r-meta-text">macOS 14.4 · last commit timestamp · frontmost browser tab title</span>
          </div>
          <div className="r-meta-row">
            <span className="r-meta-tag">refused</span>
            <span className="r-meta-text">the question of whether you should have built this yourself</span>
          </div>
          <div className="r-meta-row">
            <span className="r-meta-tag">unsigned</span>
            <span className="r-meta-text">no key yet · this read does not bind to any record</span>
          </div>
        </div>

        <div className="r-row">
          <button className="btn btn-primary">This is partly wrong <span className="kbd">↵</span></button>
          <button className="btn btn-ghost">This is right</button>
        </div>

        <div className="r-foot">
          <span className="lock"></span>
          The vault does not exist yet. It will be created when you sign your first correction.
        </div>
      </section>
      <StepRail3 step={1} />
    </FrameR>
  );
}

// ─── 02 · A correction ───────────────────────────────────────
//
// The same read becomes editable. The user strikes through what's
// wrong and types a replacement inline. The correction is the
// artifact — there is no separate form, no fields. This is the
// product's actual primitive surface, encountered first.

function R02_Correction() {
  return (
    <FrameR step={2} crumb="event 0 · redline">
      <section className="rstage">
        <div className="r-eyebrow">
          <span className="r-agent-tag witness">Witness</span>
          <span className="r-lane">observed behavior · being corrected</span>
        </div>

        <p className="r-read editable">
          You installed this on a Sunday afternoon,{" "}
          <span className="strike">three weeks after your last <em>shipping</em> commit</span>{" "}
          <span className="redline">eleven days after a deploy I told the team was final</span>.
          {" "}The browser you used to download was open to a tab titled{" "}
          <span className="strike"><em>"series A bridge term sheet — draft 4."</em></span>{" "}
          <span className="redline"><em>"liminal — what is the simplest possible v0.1 — claude.ai"</em></span>.
          {" "}This is a tool you went looking for{" "}
          <span className="redline insert">because you stopped trusting your own narration of the week</span>.
        </p>

        <div className="r-redline-meta">
          <div className="r-rl-row">
            <span className="r-rl-num">3</span>
            <span className="r-rl-text">spans struck</span>
          </div>
          <div className="r-rl-row">
            <span className="r-rl-num">3</span>
            <span className="r-rl-text">replacements</span>
          </div>
          <div className="r-rl-row">
            <span className="r-rl-num">+1</span>
            <span className="r-rl-text">insertion at the end</span>
          </div>
          <div className="r-rl-row pending">
            <span className="r-rl-num">·</span>
            <span className="r-rl-text">unsigned · vault not yet created</span>
          </div>
        </div>

        <div className="r-row">
          <button className="btn btn-primary">Sign this correction <span className="kbd">⌘↵</span></button>
          <button className="btn btn-ghost">Keep editing</button>
        </div>

        <div className="r-foot">
          <span className="lock"></span>
          The redline becomes <span className="mono" style={{color:"var(--text)"}}>event #1</span> of your vault. Nothing else is logged.
        </div>
      </section>
      <StepRail3 step={2} />
    </FrameR>
  );
}

// ─── 03 · A signature ────────────────────────────────────────
//
// The signed correction is rendered as a record. The tray icon
// receives its first earned dot. Onboarding ends here — there is
// no "go to dashboard," no "complete your profile." The vault has
// one event in it; the next event is whatever the user does next.

function R03_Signature() {
  return (
    <FrameR step={3} crumb="event 1 · signed">
      <section className="rstage">
        <div className="r-eyebrow">
          <span className="r-agent-tag signed">Signed</span>
          <span className="r-lane">event #1 · vault.db · ed25519 4f7c</span>
        </div>

        <div className="r-record">
          <div className="r-record-hd">
            <span className="r-record-name">correction.0001</span>
            <span className="r-record-when">2026-04-26 14:48:13 PST</span>
          </div>

          <div className="r-record-body">
            <p>
              You installed this on a Sunday afternoon, eleven days
              after a deploy you told the team was final. The browser
              you used to download was open to a tab titled <em>"liminal —
              what is the simplest possible v0.1 — claude.ai."</em> This is
              a tool you went looking for because you stopped trusting
              your own narration of the week.
            </p>
          </div>

          <div className="r-record-fp">
            <span className="r-fp-lbl">signature</span>
            <span className="r-fp-hex">ed25519 · 4f7c 8b2e 91a3 d6f0 · 22e8 1c4b 7a9d e305</span>
          </div>
          <div className="r-record-fp">
            <span className="r-fp-lbl">parent</span>
            <span className="r-fp-hex">— · genesis · no prior event</span>
          </div>
          <div className="r-record-fp">
            <span className="r-fp-lbl">agent</span>
            <span className="r-fp-hex">witness · refused: structural pattern · redirected: architect</span>
          </div>
        </div>

        <div className="r-tray-row">
          <div className="r-tray-cell">
            <Tray stage={0} size={28} />
            <div className="r-tray-day">today</div>
          </div>
          <div className="r-tray-arrow">·</div>
          <div className="r-tray-text">
            <div className="r-tray-lead">your tray icon</div>
            <div className="r-tray-sub">one event in the vault. the sigil fills in over the next sixty days as the record accumulates.</div>
          </div>
        </div>

        <div className="r-row">
          <button className="btn btn-primary">Quit to tray <span className="kbd">⌘Q</span></button>
          <button className="btn btn-ghost">Show vault on disk</button>
        </div>

        <div className="r-foot">
          <span className="lock"></span>
          Onboarding ends here. There is no further setup. The daemon is live.
        </div>
      </section>
      <StepRail3 step={3} />
    </FrameR>
  );
}

window.ScreensRadical = {
  R01_Read, R02_Correction, R03_Signature,
};
