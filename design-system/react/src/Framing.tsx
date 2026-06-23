import * as React from 'react';

export type FramingRegister = 'serif' | 'mono';

export interface FramingProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Voice of the framing block.
   * - `serif` (`.seam`) — founder-facing (L1–L2): warm, editorial italic.
   * - `mono` (`.thesis-line`) — operator / high-stakes (L3): austere, precise.
   * @default 'serif'
   */
  register?: FramingRegister;
  /** The quiet setup line (the lead). */
  lead?: React.ReactNode;
  /** The bold payload, rendered in `<b>` (the claim). */
  payload?: React.ReactNode;
}

/**
 * Framing — a framing block: a quiet setup line plus a bold payload, set off
 * by a register-colored left rule.
 *
 * Two voices, same job. `serif` renders the `.seam` pattern (founder register);
 * `mono` renders the `.thesis-line` pattern (operator register). Promoted to
 * canon from the prototype cuts where it carried the wedge→infra thesis.
 *
 * @example
 * <Framing register="serif"
 *   lead="We started where the founder already lives —"
 *   payload="the daily decisions nobody else sees." />
 * @example
 * <Framing register="mono"
 *   lead="Agent-trust is not a feature. It is the substrate."
 *   payload="Every action is sealed, attributed, and re-enterable." />
 */
export function Framing({
  register = 'serif',
  lead,
  payload,
  className,
  children,
  ...rest
}: FramingProps) {
  const base = register === 'mono' ? 'thesis-line' : 'seam';
  const cls = [base, className || ''].filter(Boolean).join(' ');
  return (
    <p className={cls} {...rest}>
      {lead}
      {/* serif (.seam b) is display:block so it breaks; mono (.thesis-line b)
          is inline, so insert a separating space when both are present */}
      {lead != null && payload != null && register === 'mono' ? ' ' : null}
      {payload != null ? <b>{payload}</b> : null}
      {children}
    </p>
  );
}

export default Framing;
