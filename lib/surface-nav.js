/* surface-nav.js · the cross-cut tool shell (2026-06-02)
   ────────────────────────────────────────────────────────────────
   Injects a persistent left rail + ⌘K command palette into every live
   cut, turning the standalone cuts into one navigable app. Vanilla, no
   deps. Navigation = real page loads (no SPA router) — the "one tool"
   feel comes from the rail + palette being identical on every surface.

   Each cut links lib/surface-nav.css and this file; nothing else needed.
   Current surface is detected from the filename. Single source: edit the
   SURFACES list here and every cut picks it up on next load. */
(function () {
  "use strict";

  // when embedded in a stitch/sequence shell (?embed=1), the shell owns the
  // chrome; suppress the per-cut rail + palette so they don't stack.
  if (new URLSearchParams(location.search).get("embed") === "1") return;

  // The catalog's live surfaces, in sequence order. icon is a glyph (no
  // image deps); path is relative to a cut in cuts/.
  var SURFACES = [
    { id: "today",       label: "Today",       sub: "re-entry",    icon: "◷", path: "10-today.html" },
    { id: "read",        label: "Read",        sub: "workspace",   icon: "◇", path: "01-slate-tray.html" },
    { id: "forensic",    label: "Forensic",    sub: "diligence",   icon: "⊙", path: "02-forensic-agent.html" },
    { id: "calibration", label: "Calibration", sub: "the record",  icon: "▦", path: "03-calibration.html" },
    { id: "onboarding",  label: "Onboarding",  sub: "first run",   icon: "✦", path: "04-onboarding.html" },
    { id: "custody",     label: "Custody",     sub: "natsec",      icon: "⊞", path: "08-liminal-custody.html" }
  ];

  // Which surface is this page? Match by filename.
  function currentId() {
    var file = (location.pathname.split("/").pop() || "").toLowerCase();
    for (var i = 0; i < SURFACES.length; i++) {
      if (SURFACES[i].path.toLowerCase() === file) return SURFACES[i].id;
    }
    return null;
  }

  function go(path) { location.href = path; }

  // ── rail ──────────────────────────────────────────────────────
  function buildRail(curId) {
    var rail = document.createElement("nav");
    rail.className = "sn-rail";
    rail.setAttribute("aria-label", "Surfaces");

    var brand = document.createElement("div");
    brand.className = "sn-brand";
    brand.innerHTML = '<span class="sn-glyph">◇</span><span class="sn-name">Liminal</span>';
    rail.appendChild(brand);

    SURFACES.forEach(function (s) {
      var a = document.createElement("a");
      a.className = "sn-item" + (s.id === curId ? " is-current" : "");
      a.href = s.path;
      a.setAttribute("aria-current", s.id === curId ? "page" : "false");
      a.innerHTML =
        '<span class="sn-ico">' + s.icon + '</span>' +
        '<span class="sn-label">' + s.label + '</span>';
      rail.appendChild(a);
    });

    var spacer = document.createElement("div");
    spacer.className = "sn-spacer";
    rail.appendChild(spacer);

    var hint = document.createElement("div");
    hint.className = "sn-hint";
    hint.textContent = "⌘K";
    rail.appendChild(hint);

    return rail;
  }

  // ── ⌘K palette ────────────────────────────────────────────────
  function buildPalette(curId) {
    var pal = document.createElement("div");
    pal.className = "sn-palette";
    pal.setAttribute("role", "dialog");
    pal.setAttribute("aria-label", "Go to surface");
    pal.innerHTML =
      '<div class="sn-pal-box">' +
        '<input class="sn-pal-input" type="text" placeholder="Go to surface…" aria-label="Filter surfaces" />' +
        '<div class="sn-pal-list"></div>' +
      '</div>';

    var input = pal.querySelector(".sn-pal-input");
    var list = pal.querySelector(".sn-pal-list");
    var active = 0;

    function render(filter) {
      var q = (filter || "").trim().toLowerCase();
      var rows = SURFACES.filter(function (s) {
        return !q || s.label.toLowerCase().indexOf(q) >= 0 || s.sub.toLowerCase().indexOf(q) >= 0;
      });
      list.innerHTML = "";
      rows.forEach(function (s, i) {
        var row = document.createElement("div");
        row.className = "sn-pal-row" + (i === active ? " is-active" : "");
        row.dataset.path = s.path;
        row.innerHTML =
          '<span class="sn-ico">' + s.icon + '</span>' +
          '<span class="sn-pal-name">' + s.label + '</span>' +
          '<span class="sn-pal-sub">' + (s.id === curId ? "current" : s.sub) + '</span>';
        row.addEventListener("click", function () { go(s.path); });
        list.appendChild(row);
      });
      return rows;
    }

    var current = render("");

    function open() {
      pal.classList.add("is-open");
      active = 0; input.value = ""; current = render("");
      setTimeout(function () { input.focus(); }, 0);
    }
    function close() { pal.classList.remove("is-open"); }
    function isOpen() { return pal.classList.contains("is-open"); }

    input.addEventListener("input", function () { active = 0; current = render(input.value); });

    pal.addEventListener("click", function (e) { if (e.target === pal) close(); });

    // expose open/close for the global key handler
    pal._open = open; pal._close = close; pal._isOpen = isOpen;
    pal._move = function (d) {
      if (!current.length) return;
      active = (active + d + current.length) % current.length;
      render(input.value);
    };
    pal._choose = function () {
      var rows = list.querySelectorAll(".sn-pal-row");
      if (rows[active]) go(rows[active].dataset.path);
    };
    return pal;
  }

  function init() {
    if (document.querySelector(".sn-rail")) return; // idempotent
    var curId = currentId();
    document.body.appendChild(buildRail(curId));
    var pal = buildPalette(curId);
    document.body.appendChild(pal);

    document.addEventListener("keydown", function (e) {
      var meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        pal._isOpen() ? pal._close() : pal._open();
        return;
      }
      if (!pal._isOpen()) return;
      if (e.key === "Escape") { e.preventDefault(); pal._close(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); pal._move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); pal._move(-1); }
      else if (e.key === "Enter") { e.preventDefault(); pal._choose(); }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
