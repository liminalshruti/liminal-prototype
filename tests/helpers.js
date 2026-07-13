// Shared helpers for the demo-lock specs.

export const CUT_11_CANONICAL =
  "/cuts/11-govern.html?subject=spend&beat=loop&run=govern-run.json";
export const CUT_01_CANONICAL = "/cuts/01-slate-tray.html";

/** Collect console errors for the page's lifetime. Call early, assert late. */
export function trackConsoleErrors(page) {
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  return errors;
}

/** Dismiss cut 01's entry overlay if it is showing. */
export async function skipEntryOverlay(page) {
  const skip = page.getByText(/skip · go straight/i).first();
  try {
    await skip.click({ timeout: 5_000 });
  } catch {
    /* overlay already dismissed (sessionStorage flag) — fine */
  }
}
