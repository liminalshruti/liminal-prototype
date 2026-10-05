/* Archive notice (LIM-2218). Every page under cuts/_archive/ loads this one
   file, so a viewer who lands on an archived page sees that it is archived
   before anything else. The page itself is not otherwise edited.
   Colours and faces are canon values (design-tokens.css §5 and the frame
   tokens); the fallbacks match canon because archive pages do not all load
   the token sheet. */
(function () {
  var self = document.currentScript;
  var home = self ? new URL("../index.html", self.src).href : "/";

  function mount() {
    if (document.getElementById("archive-notice")) return;
    var bar = document.createElement("div");
    bar.id = "archive-notice";
    bar.setAttribute("role", "note");
    bar.style.cssText = [
      "position:fixed", "top:0", "left:0", "right:0", "z-index:2147483647",
      "display:flex", "flex-wrap:wrap", "gap:4px 12px", "align-items:center", "justify-content:center",
      "padding:6px 16px", "box-sizing:border-box",
      "background:var(--frame-bg, #0E0E11)", "border-bottom:1px solid var(--frame-border, #1F1F23)",
      "color:var(--text-mid, #C9C5BD)",
      'font:11px/1.4 "Space Mono", "Geist Mono", ui-monospace, monospace',
      "letter-spacing:.06em", "text-transform:uppercase", "text-align:center"
    ].join(";");
    var label = document.createElement("span");
    label.textContent = "Archived · not maintained · a past iteration, kept as a record";
    var link = document.createElement("a");
    link.href = home;
    link.textContent = "see the current prototype ↗";
    link.style.cssText = "color:inherit;text-decoration:underline;text-underline-offset:3px";
    bar.appendChild(label);
    bar.appendChild(link);
    document.body.insertBefore(bar, document.body.firstChild);
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
