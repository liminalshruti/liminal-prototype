/**
 * Scope a canon component sheet (design-system/components/*.css) so it can be injected beside
 * a desktop port on the same page without the two styling each other: every class selector
 * becomes `.ref-<name>` and every keyframe name gets the same prefix. Derived from the sheet
 * itself, so a new class in canon needs no edit here. `[a-z]` after the dot skips numeric
 * literals such as `1.6s`.
 */
export function scopeSheet(css: string, prefix = "ref-"): string {
  const keyframes = [...css.matchAll(/@keyframes\s+([A-Za-z_][\w-]*)/g)].map((m) => m[1]);
  let out = css.replace(/\.([a-z][\w-]*)/g, `.${prefix}$1`);
  for (const name of keyframes) out = out.replace(new RegExp(`\\b${name}\\b`, "g"), `${prefix}${name}`);
  return out;
}
