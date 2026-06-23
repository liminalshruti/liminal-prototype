import * as React from 'react';

export type AvatarVariant = 'accent' | 'drift';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant.
   * - `accent` — accent brand color
   * - `drift` — judgment color with status dot
   */
  variant?: AvatarVariant;
}

/**
 * Avatar — circular identity indicator.
 *
 * Renders a 32px circular avatar for user initials or identity glyphs.
 * Maps to `.avatar-base` + `.is-{variant}` classes from
 * `components/avatars-badges.css`.
 *
 * @example
 * <Avatar>SR</Avatar>
 * <Avatar variant="accent">A</Avatar>
 * <Avatar variant="drift">J</Avatar>
 */
export function Avatar({
  variant,
  className,
  children,
  ...rest
}: AvatarProps) {
  const cls = [
    'avatar-base',
    variant ? `is-${variant}` : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}

export default Avatar;
