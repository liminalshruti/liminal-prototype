import * as React from 'react';

export interface ConsentChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Mutual consent indicator. If true, applies `.is-mutual` class. */
  mutual?: boolean;
  /** Lock icon or glyph. Renders in `.lock` span. */
  lock?: React.ReactNode;
}

/**
 * ConsentChip — badge for consent state (mutual vs. unilateral).
 *
 * A small inline chip with optional lock icon. Apply `.is-mutual` for
 * bilateral consent styling. Maps to `.consent-chip` + `.is-mutual` and
 * `.lock` classes from `components/audit-classification.css`.
 *
 * @example
 * <ConsentChip lock="🔐" mutual>Mutual</ConsentChip>
 * <ConsentChip lock="🔓">Unilateral</ConsentChip>
 */
export function ConsentChip({
  mutual = false,
  lock,
  className,
  children,
  ...rest
}: ConsentChipProps) {
  const cls = [
    'consent-chip',
    mutual ? 'is-mutual' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={cls} {...rest}>
      {lock && <span className="lock">{lock}</span>}
      {children}
    </span>
  );
}

export default ConsentChip;
