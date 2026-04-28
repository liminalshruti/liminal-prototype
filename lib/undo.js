/* undo.js · ⌘Z reverses last slate action (last 5 entries deep)
 *
 * The undo stack lives in state.js · this module wires the surface-hop
 * side effect (if the entry's product/context differs from active, the
 * UI hops there before performing the inverse).
 *
 * Consumers pass a ctx object so undo doesn't need to import the whole
 * boot graph: { setProduct, setContext, appendAudit, showToast,
 * renderTray, renderSlate, tickAgencyRail }.
 */
import {
  popUndoEntry,
  slated, setActiveProductId, setActiveContextId,
  setLastLandedId,
  activeProductId, activeContextId,
} from "./state.js";

export function popUndo(ctx) {
  const entry = popUndoEntry();
  if (!entry) {
    ctx.showToast("Nothing to undo");
    return;
  }
  /* hop to the entry's surface if it lives elsewhere · keeps ⌘Z honest
     across surface switches */
  if (entry.product !== activeProductId) {
    setActiveProductId(entry.product);
    document.body.dataset.product = entry.product;
    document.querySelectorAll(".product-tab").forEach(el => {
      el.classList.toggle("is-active", el.dataset.product === entry.product);
    });
  }
  if (entry.context !== activeContextId) {
    setActiveContextId(entry.context);
  }
  const set = (slated[entry.product][entry.context] ??= new Set());
  if (entry.kind === "add") {
    set.delete(entry.tileId);
    ctx.appendAudit(`undo · removed ${entry.label}`);
  } else {
    set.add(entry.tileId);
    setLastLandedId(entry.tileId);
    ctx.appendAudit(`undo · restored ${entry.label}`);
  }
  ctx.renderTray();
  ctx.renderSlate();
  ctx.tickAgencyRail();
  ctx.showToast(`Undid · ${entry.kind === "add" ? "drop" : "remove"} of ${entry.label}`);
}
