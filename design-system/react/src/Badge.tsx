import * as React from 'react';

export type BadgeVariant = 'accent' | 'good' | 'amber' | 'red' | 'judgment';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Semantic register for classification metadata.
   * - `accent` — clarity primary
   * - `good` — connection/success
   * - `amber` — watch/caution
   * - `red` — alarm/error
   * - `judgment` — verdict/secondary brand
   */
  variant?: BadgeVariant;
}

/**
 * Badge — rectangular metadata badge for classification.
 *
 * A small, non-interactive chip that carries metadata (a security tier,
 * a classification level) without taking action. Distinct from the Tag
 * component — uses `.tag-base` + `.is-{variant}` classes from
 * `components/avatars-badges.css`.
 *
 * @example
 * <Badge>public</Badge>
 * <Badge variant="good">verified</Badge>
 * <Badge variant="red">blocked</Badge>
 * <Badge variant="judgment">restricted</Badge>
 */
export function Badge({
  variant,
  className,
  children,
  ...rest
}: BadgeProps) {
  const cls = [
    'tag-base',
    variant ? `is-${variant}` : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  );
}

export default Badge;
