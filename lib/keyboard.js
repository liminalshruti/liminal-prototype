/* keyboard.js · unified keyboard shortcut layer + help overlay
 *
 * ⌘. tray · ⌘N notes · ⌘Z undo · ⌘Enter confirm · ⌘D defer
 * ⌘1/⌘2/⌘3 surface · ⌘[/⌘] prev/next context · ⌘? help · Esc close
 *
 * Consumers pass a ctx object with the actions this layer triggers.
 * No state imports needed except activeProductId for the prev/next sibling lookup.
 */
import {
  TEAM_SUBJECTS, BUSINESS_SCENARIOS, PERSONAL_THREADS,
} from "../v0_3_config.js";
import { activeProductId, activeContextId } from "./state.js";

function siblingContexts() {
  if (activeProductId === "personal") return PERSONAL_THREADS.map(t => t.id);
  if (activeProductId === "team")     return TEAM_SUBJECTS.map(s => s.id);
  if (activeProductId === "business") return BUSINESS_SCENARIOS.map(s => s.id);
  return [];
}

export function openKbdHelp() {
  document.getElementById("kbd-help").hidden = false;
}
export function closeKbdHelp() {
  document.getElementById("kbd-help").hidden = true;
}

export function wireKeyboard(ctx) {
  /* help overlay close affordances */
  document.getElementById("kbd-close")?.addEventListener("click", closeKbdHelp);
  document.getElementById("kbd-hint")?.addEventListener("click", openKbdHelp);
  document.getElementById("kbd-help")?.addEventListener("click", (ev) => {
    if (ev.target.id === "kbd-help") closeKbdHelp();
  });

  /* tray toggle · ⌘. or Ctrl+. · also Esc closes tray when open */
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === ".") {
      e.preventDefault();
      ctx.toggleTray();
    }
    if (e.key === "Escape" && document.querySelector(".stage").classList.contains("tray-open")) {
      ctx.toggleTray();
    }
  });

  /* notes toggle · ⌘N */
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "n" && !e.shiftKey) {
      e.preventDefault();
      document.getElementById("notes-toggle")?.click();
    }
  });

  /* main shortcut layer */
  document.addEventListener("keydown", (e) => {
    if (e.target.matches?.("input, textarea, [contenteditable='true']")) return;

    const meta = e.metaKey || e.ctrlKey;
    const k = e.key;

    /* ⌘? · open keyboard help · also Esc closes */
    if (meta && (k === "?" || (e.shiftKey && k === "/"))) {
      e.preventDefault();
      const help = document.getElementById("kbd-help");
      if (help.hidden) openKbdHelp();
      else closeKbdHelp();
      return;
    }
    if (k === "Escape" && !document.getElementById("kbd-help").hidden) {
      e.preventDefault();
      closeKbdHelp();
      return;
    }

    if (!meta) return;

    if (k.toLowerCase() === "z" && !e.shiftKey) {
      e.preventDefault();
      ctx.undo();
      return;
    }

    if (k === "Enter") {
      const briefVisible = !document.getElementById("brief-area").hidden;
      if (!briefVisible) return;
      e.preventDefault();
      document.getElementById("dispo-primary").click();
      return;
    }

    if (k.toLowerCase() === "d") {
      const briefVisible = !document.getElementById("brief-area").hidden;
      if (!briefVisible) return;
      e.preventDefault();
      document.getElementById("dispo-defer").click();
      return;
    }

    if (k === "1") { e.preventDefault(); ctx.setProduct("personal"); return; }
    if (k === "2") { e.preventDefault(); ctx.setProduct("team");     return; }
    if (k === "3") { e.preventDefault(); ctx.setProduct("business"); return; }

    if (k === "[" || k === "]") {
      e.preventDefault();
      const ids = siblingContexts();
      if (ids.length === 0) return;
      const i = Math.max(0, ids.indexOf(activeContextId));
      const delta = k === "[" ? -1 : +1;
      const next = ids[(i + delta + ids.length) % ids.length];
      if (next !== activeContextId) ctx.setContext(next);
    }
  });
}
