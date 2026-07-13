/* lib/demo-restart.js · shared ↺ restart affordance (drift-matrix row 3)
   ──────────────────────────────────────────────────────────────────────
   Injects one visible "↺ restart" chip into the cut's title bar so a
   presenter (or a misclicking viewer) can always return to a clean opening
   state without hunting for a keyboard shortcut.

   Contract: if the cut defines window.__demoReset (a stateful reset that
   preserves fixture data), the chip calls it; otherwise it reloads — an
   honest reset for choreography-only surfaces. Cuts with their own wired
   restart control (cut 11's #reset-demo) skip injection automatically. */
(function () {
  function inject() {
    if (document.getElementById("reset-demo") || document.getElementById("demo-restart")) return;
    var bar = document.querySelector(".rb-top") || document.querySelector(".titlebar");
    if (!bar) return;
    var btn = document.createElement("button");
    btn.id = "demo-restart";
    btn.className = "demo-restart";
    btn.type = "button";
    btn.title = "Restart the demo from a clean opening state";
    btn.textContent = "↺ restart";
    btn.addEventListener("click", function () {
      if (typeof window.__demoReset === "function") window.__demoReset();
      else location.reload();
    });
    bar.appendChild(btn);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
