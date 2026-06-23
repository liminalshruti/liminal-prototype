import * as React from 'react';

export type TagVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Semantic register. Variants reuse the canon `--ui-state-*` tokens so they
   * track the design system.
   * @default 'default'
   */
  variant?: TagVariant;
  /** Render a leading status dot colored by the variant. */
  dot?: boolean;
}

/**
 * Tag — a small, non-interactive classification chip.
 *
 * The mono-cased pill that carries metadata (a status, a register, a source)
 * without taking an action. Maps to the canon `.tag` + `.tag-{variant}`
 * classes. If a chip must be clickable or removable, use a Button instead.
 *
 * @example
 * <Tag>draft</Tag>
 * <Tag variant="success" dot>sealed</Tag>
 * <Tag variant="error" dot>rejected</Tag>
 * <Tag variant="warning">pending review</Tag>
 * <Tag variant="info" dot>analyst</Tag>
 */
export function Tag({
  variant = 'default',
  dot = false,
  className,
  children,
  ...rest
}: TagProps) {
  const cls = [
    'tag',
    variant !== 'default' ? `tag-${variant}` : '',
    dot ? 'tag-dot' : '',
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

export default Tag;
