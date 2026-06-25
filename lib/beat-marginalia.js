/* lib/beat-marginalia.js · presenter aid for the Lan demo · 2026-06-25
   ──────────────────────────────────────────────────────────────────────
   ONE fresh founder note per beat, in the Caveat editor's-hand register.
   Toggle with ✎ (bottom-left) or ⌘N. The note for the current beat is read
   from <body data-beat="N">.

   VERACITY: this file does NOT import lib/marginalia.js. That engine's
   ANNOTATIONS array still carries retired/real-name strings; we author NEW
   notes here. No em dashes, no emojis, no banned strings. The notes below
   are the four authored in the build spec, one per beat. */

(function () {
  // in the stitch shell the per-cut note would float inside the iframe; let the
  // shell own the presenter note instead (skip when embedded).
  if (new URLSearchParams(location.search).get('embed') === '1') return;
  var beat = parseInt(document.body.getAttribute('data-beat'), 10);
  if (!beat || beat < 1 || beat > 4) return;

  // fresh founder notes (build spec) · one per beat, veracity-clean
  var NOTES = {
    1: 'receipted to the exact source. dismiss a wrong one, it learns your line.',
    2: 'the disagreement is the signal. i correct the read, i stay in command. local-first, signed.',
    3: 'spend is the wedge. judgment is the company. same loop, every subject.',
    4: 'refusal with receipts. notarized on a public ledger. verifiable today.'
  };
  var note = NOTES[beat];
  if (!note) return;

  var css = document.createElement('style');
  css.textContent = [
    '#beat-note{position:fixed;left:18px;bottom:60px;z-index:9998;max-width:280px;',
    '  font-family:"Caveat",var(--font-serif,cursive);font-size:21px;line-height:1.25;',
    '  color:var(--cerulean,#197EEB);background:rgba(10,10,11,0.92);',
    '  border-left:2px solid var(--cerulean,#197EEB);border-radius:0 8px 8px 0;',
    '  padding:11px 15px;box-shadow:0 6px 22px rgba(0,0,0,0.5);',
    '  opacity:0;transform:translateY(6px);transition:opacity 260ms,transform 260ms;pointer-events:none;}',
    'body.beat-note-on #beat-note{opacity:1;transform:none;}',
    '#beat-note .sig{display:block;margin-top:5px;font-size:14px;color:var(--text-faint,#6B6862);}',
    '#beat-note-toggle{position:fixed;left:18px;bottom:18px;z-index:9999;',
    '  font-family:var(--font-mono,"Geist Mono",monospace);font-size:12px;',
    '  display:flex;align-items:center;gap:7px;cursor:pointer;',
    '  color:var(--text-faint,#6B6862);background:rgba(10,10,11,0.86);',
    '  border:1px solid var(--card-border,#232327);border-radius:999px;padding:6px 13px;',
    '  transition:color 180ms,border-color 180ms;}',
    '#beat-note-toggle:hover{color:var(--text-dim,#9a968e);}',
    'body.beat-note-on #beat-note-toggle{color:var(--cerulean,#197EEB);border-color:var(--cerulean,#197EEB);}',
    '#beat-note-toggle .pen{font-size:13px;}'
  ].join('');
  document.head.appendChild(css);

  var noteEl = document.createElement('div');
  noteEl.id = 'beat-note';
  noteEl.innerHTML = note + '<span class="sig">· sr</span>';

  var toggle = document.createElement('button');
  toggle.id = 'beat-note-toggle';
  toggle.setAttribute('aria-label', 'Toggle founder note');
  toggle.innerHTML = '<span class="pen">✎</span><span class="lbl">note</span><span class="key">' +
    ' ⌘N</span>';

  function toggleNote() {
    document.body.classList.toggle('beat-note-on');
  }
  toggle.addEventListener('click', toggleNote);
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'n' || e.key === 'N')) {
      e.preventDefault();
      toggleNote();
    }
  });

  document.body.appendChild(noteEl);
  document.body.appendChild(toggle);
})();
