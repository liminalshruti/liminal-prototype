import * as React from 'react';

export type BannerVariant = 'accent' | 'good' | 'amber' | 'red';

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual state indicator.
   * - `accent` — primary attention (informational)
   * - `good` — success (connection green)
   * - `amber` — warning (watch gold)
   * - `red` — error (alarm red)
   * @default 'accent'
   */
  variant?: BannerVariant;
  /** Leading glyph (icon or emoji). Rendered in `.b-glyph` span. */
  glyph?: React.ReactNode;
}

/**
 * Banner — persistent inline alert that informs without blocking flow.
 *
 * Renders a full-width or inline alert with optional leading glyph and
 * semantic variant. Maps to `.banner` + `.is-{variant}` classes from
 * `components/banners-toasts-alerts.css`.
 *
 * @example
 * <Banner variant="good" glyph="✓">Entry sealed successfully</Banner>
 * <Banner variant="amber" glyph="⚠">Review pending</Banner>
 * <Banner variant="red" glyph="✕">Access denied</Banner>
 * <Banner>Informational message</Banner>
 */
export function Banner({
  variant = 'accent',
  glyph,
  className,
  children,
  ...rest
}: BannerProps) {
  const cls = [
    'banner',
    variant ? `is-${variant}` : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} {...rest}>
      {glyph && <span className="b-glyph">{glyph}</span>}
      <div>{children}</div>
    </div>
  );
}

export default Banner;
