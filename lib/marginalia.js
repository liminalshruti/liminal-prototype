/* marginalia.js · Caveat editor's-notes overlay
 *
 * Founder's hand on the build · 9 hand-authored notes anchored to v0.6
 * vocabulary (slate, tray, agency, audit ribbon). Toggle via .notes-toggle
 * button (bottom-left) or ⌘N. Notes adopt active register accent.
 *
 * Imports nothing from state · pure DOM annotation. Consumers (boot.js)
 * wire the keyboard binding and register a re-render hook on product
 * switch since DOM reflows move targets.
 */

const ANNOTATIONS = [
  {
    target: "product-row",
    pattern: "inline",
    side: "below",
    text: "three reads of one substrate. apr 25 10:14pm locked the fork.",
    sig: "· sr",
  },
  {
    target: "tab-team",
    pattern: "inline",
    side: "below",
    text: "ships first. brian DRIFT is the demo bridge into xtech.",
    sig: "· sr",
  },
  {
    target: "tab-business",
    pattern: "inline",
    side: "below",
    text: "snowden/hansen-class. classification ladder is the consent contract here.",
    sig: "· sr",
  },
  {
    target: "slate-canvas",
    pattern: "inline",
    side: "right",
    text: "composition surface, not a feed. the act of placing tiles is the agency move.",
    sig: "· sr",
  },
  {
    target: "tray",
    pattern: "inline",
    side: "left",
    text: "palette. inkwell. mixing plate. live windows under the liminal view · what makes this not a webpage.",
    sig: "· sr",
  },
  {
    target: "agency-rail",
    pattern: "inline",
    side: "left",
    text: "12 bounded co-workers · not jungian archetypes. apr 21 rule.",
    sig: "· sr",
  },
  {
    target: "audit-ribbon",
    pattern: "inline",
    side: "above",
    text: "the disagreement is the signal. correction stream is the moat.",
    sig: "· sr",
  },
  {
    target: "vault-pill",
    pattern: "inline",
    side: "below",
    text: "encrypted local. one consent primitive. two contracts (interpersonal · institutional).",
    sig: "· sr",
  },
  {
    pattern: "corner",
    corner: "br",
    text: "spec → config → shell. one source of truth, evolving in tandem. v0.3.9 · v0.7.0.",
    sig: "· sr",
  },
];

function positionInlineNote(noteEl, target, side) {
  const rect = target.getBoundingClientRect();
  const noteW = 230;
  const margin = 14;
  let top, left;
  const sx = window.scrollX, sy = window.scrollY;
  if (side === "below") {
    top  = rect.bottom + sy + 4;
    left = rect.left + sx + Math.min(24, rect.width / 4);
  } else if (side === "above") {
    top  = rect.top + sy - 32;
    left = rect.left + sx + 24;
  } else if (side === "left") {
    top  = rect.top + sy + 6;
    left = rect.left + sx - noteW - margin;
  } else {
    top  = rect.top + sy + 4;
    left = Math.min(rect.right + sx + margin, window.innerWidth - noteW - 12);
  }
  if (left < 8) left = 8;
  noteEl.style.top  = `${top}px`;
  noteEl.style.left = `${left}px`;
}

export function renderAnnotations() {
  document.querySelectorAll(".ed-note").forEach(n => n.remove());
  for (const note of ANNOTATIONS) {
    const el = document.createElement("div");
    el.className = `ed-note ${note.pattern}` + (note.corner ? ` ${note.corner}` : "");
    const sigHtml = note.sig ? `<span class="ed-sig">${note.sig}</span>` : "";
    el.innerHTML = `${note.text}${sigHtml}`;
    if (note.pattern === "corner") {
      document.body.appendChild(el);
    } else if (note.pattern === "inline" && note.target) {
      const target = document.querySelector(`[data-annotation="${note.target}"]`);
      if (!target || (target.offsetParent === null && target.tagName !== "BODY")) continue;
      document.body.appendChild(el);
      positionInlineNote(el, target, note.side || "right");
    }
  }
}

export function clearAnnotations() {
  document.querySelectorAll(".ed-note").forEach(n => n.remove());
}

export function wireMarginaliaToggle() {
  const notesToggleEl = document.getElementById("notes-toggle");
  if (!notesToggleEl) return;
  notesToggleEl.addEventListener("click", () => {
    document.body.classList.toggle("notes-on");
    notesToggleEl.classList.toggle("is-on");
    if (document.body.classList.contains("notes-on")) renderAnnotations();
    else clearAnnotations();
  });
  let resizeTimer;
  window.addEventListener("resize", () => {
    if (!document.body.classList.contains("notes-on")) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderAnnotations, 80);
  });
}
