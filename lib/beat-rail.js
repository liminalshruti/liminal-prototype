/* lib/beat-rail.js · the demo spine · Lan Wu stitched walkthrough 2026-06-25
   ──────────────────────────────────────────────────────────────────────
   Injects ONE persistent beat rail (1·FEEL 2·UNDERSTAND 3·PRICE 4·PROVE,
   current beat lit) as a fixed top-center overlay, so the four demo surfaces
   read as one journey instead of four destinations.

   Opt-in per cut, two lines:
     <body data-beat="1" ...>                          (beat index 1-4)
     <script src="../lib/beat-rail.js" defer></script> (or ../../lib/ from cuts/thread/)

   Structurally independent of each cut's chrome (the cuts don't share one
   titlebar structure), so the SAME rail frames every page. Clicking a label
   jumps to that beat. Beat 4 opens the deployed walkthrough in a new tab.
   Offline-safe: pure DOM + the canon tokens already loaded by each cut.
   Veracity: no em dashes, no emojis, no banned strings. */

(function () {
  // when embedded in the stitch shell (?embed=1), the shell owns the one master
  // rail; suppress the per-cut rail so they don't stack.
  if (new URLSearchParams(location.search).get('embed') === '1') return;
  var beat = parseInt(document.body.getAttribute('data-beat'), 10);
  if (!beat || beat < 1 || beat > 4) return; // no data-beat => no rail (e.g. the linker home)

  // each cut declares how to reach the others. open-loops lives in cuts/thread/
  // (one level deeper), so it needs an extra ../ on the sibling-cut links.
  // a cut sets data-beat-base to the path prefix that reaches the cuts/ dir.
  var base = document.body.getAttribute('data-beat-base');
  if (base == null) base = './'; // default: we're already in cuts/

  var BEATS = [
    { n: 1, arc: 'FEEL',       href: base + 'thread/open-loops.html' },
    { n: 2, arc: 'UNDERSTAND', href: base + '01-slate-tray.html' },
    { n: 3, arc: 'PRICE',      href: base + '11-govern.html?subject=spend' },
    { n: 4, arc: 'PROVE',      href: 'https://liminalshruti.github.io/algorand-berlin-2026/walkthrough.html', external: true }
  ];

  var home = base + '_demo-lan.html';

  // ── styles (scoped, token-aware, no redefines of canon) ──
  var css = document.createElement('style');
  css.textContent = [
    '#beat-rail{position:fixed;top:0;left:0;right:0;z-index:9999;display:flex;justify-content:center;',
    '  gap:0;pointer-events:none;font-family:var(--font-mono,"Geist Mono",monospace);}',
    '#beat-rail .rail-inner{pointer-events:auto;display:flex;align-items:stretch;gap:2px;',
    '  margin-top:8px;padding:4px;border:1px solid var(--card-border,#232327);border-radius:999px;',
    '  background:rgba(10,10,11,0.86);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);',
    '  box-shadow:0 4px 20px rgba(0,0,0,0.45);}',
    '#beat-rail a.br-home{display:flex;align-items:center;justify-content:center;width:26px;',
    '  color:var(--cerulean,#197EEB);text-decoration:none;font-size:13px;border-radius:999px;',
    '  transition:background 180ms;}',
    '#beat-rail a.br-home:hover{background:var(--hover,rgba(255,255,255,0.06));}',
    '#beat-rail a.br-beat{display:flex;align-items:center;gap:7px;text-decoration:none;',
    '  padding:5px 13px;border-radius:999px;color:var(--text-faint,#6B6862);font-size:11px;',
    '  letter-spacing:.08em;transition:color 180ms,background 180ms;white-space:nowrap;}',
    '#beat-rail a.br-beat .num{font-weight:600;opacity:.8;}',
    '#beat-rail a.br-beat:hover{color:var(--text-dim,#9a968e);background:var(--hover,rgba(255,255,255,0.05));}',
    '#beat-rail a.br-beat.on{color:var(--bg,#0A0A0B);background:var(--cerulean,#197EEB);}',
    '#beat-rail a.br-beat.on .num{opacity:1;}',
    '#beat-rail a.br-beat .ext{font-size:9px;opacity:.7;letter-spacing:.04em;}',
    '#beat-rail a.br-sub{display:flex;align-items:center;text-decoration:none;font-size:9px;',
    '  letter-spacing:.1em;text-transform:uppercase;color:var(--text-faint,#6B6862);',
    '  padding:5px 9px;margin-left:-1px;border-radius:999px;transition:color 180ms,background 180ms;}',
    '#beat-rail a.br-sub::before{content:"\\21C4";margin-right:4px;opacity:.6;}',
    '#beat-rail a.br-sub:hover{color:var(--cerulean,#197EEB);background:var(--hover,rgba(255,255,255,0.05));}',
    '@media (max-width:680px){#beat-rail a.br-beat .arc{display:none;} #beat-rail a.br-beat{padding:5px 10px;} #beat-rail a.br-sub{display:none;}}'
  ].join('');
  document.head.appendChild(css);

  // ── markup ──
  var rail = document.createElement('nav');
  rail.id = 'beat-rail';
  rail.setAttribute('aria-label', 'Demo beats');

  // which spend cut are we on? beat 3 has two views: govern (cut 11, default)
  // and the cleaner agency view (cut 00). the sub-link toggles to the other one.
  var onAgency = /00-agency\.html/.test(location.pathname);
  var spendAlt = onAgency
    ? { href: base + '11-govern.html?subject=spend', label: 'govern' }
    : { href: base + '00-agency.html', label: 'agency' };

  var inner = '<div class="rail-inner">';
  inner += '<a class="br-home" href="' + home + '" title="Demo home (beat 0)" aria-label="Demo home">◇</a>';
  BEATS.forEach(function (b) {
    var on = b.n === beat ? ' on' : '';
    var attrs = b.external ? ' target="_blank" rel="noopener"' : '';
    var ext = b.external ? '<span class="ext">tab</span>' : '';
    var current = b.n === beat ? ' aria-current="step"' : '';
    inner += '<a class="br-beat' + on + '" href="' + b.href + '"' + attrs + current +
      '><span class="num">' + b.n + '</span><span class="arc">' + b.arc + '</span>' + ext + '</a>';
    // beat 3 carries a small sub-link to the alternate spend view (govern <-> agency)
    if (b.n === 3) {
      inner += '<a class="br-sub" href="' + spendAlt.href + '" title="Beat 3 alternate spend view">' +
        spendAlt.label + '</a>';
    }
  });
  inner += '</div>';
  rail.innerHTML = inner;

  // insert as the first body child so it overlays cleanly
  document.body.insertBefore(rail, document.body.firstChild);

  // reserve vertical space so the fixed rail never sits on top of a cut's own
  // titlebar/chrome. push the page down by the rail's height + a little air.
  // cuts that vertically-center their shell (e.g. govern) already clear it, but
  // the offset is harmless there and fixes the cuts whose chrome hugs the top.
  function reserveSpace() {
    var r = rail.getBoundingClientRect();
    var pad = Math.ceil(r.height) + 12;
    var cur = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
    if (cur < pad) document.body.style.paddingTop = pad + 'px';
  }
  reserveSpace();
  window.addEventListener('resize', reserveSpace);
})();
