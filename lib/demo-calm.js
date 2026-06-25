/* lib/demo-calm.js · loads + toggles the presentation legibility layer
   ──────────────────────────────────────────────────────────────────────
   Adds body.demo-calm ON by default (the demo wants the legible version),
   and binds the "D" key to flip it off/on live · so if anything looks off in
   the room, one keystroke returns the exact verified original. ?calm=0 starts
   it off. The CSS is scoped under body.demo-calm, so off = original render. */

(function () {
  // inject the stylesheet (path is relative to the cut; cuts/ uses ../lib,
  // cuts/thread/ uses ../../lib · match the script's own src directory)
  var me = document.currentScript;
  var libDir = me && me.src ? me.src.replace(/[^/]*$/, '') : '../lib/';
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = libDir + 'demo-calm.css';
  document.head.appendChild(link);

  var params = new URLSearchParams(location.search);
  var startOff = params.get('calm') === '0';
  if (!startOff) document.body.classList.add('demo-calm');

  document.addEventListener('keydown', function (e) {
    // plain "d" (no modifier) toggles calm mode; ignore when typing in a field
    if (e.key === 'd' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      var t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      e.preventDefault();
      document.body.classList.toggle('demo-calm');
    }
  });
})();
