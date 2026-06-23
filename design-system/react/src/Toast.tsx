import * as React from 'react';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Leading glyph (icon or emoji). Rendered in `.t-glyph` span. */
  glyph?: React.ReactNode;
  /** Optional trailing metadata (timestamp, status). Rendered in `.t-meta` span. */
  meta?: React.ReactNode;
}

/**
 * Toast — ephemeral notification in fixed/floating position.
 *
 * A compact, consumer-timed notification overlay. Maps to `.toast`, `.t-glyph`,
 * and `.t-meta` classes from `components/banners-toasts-alerts.css`. The consumer
 * manages positioning, duration, and dismissal.
 *
 * @example
 * <Toast glyph="✓">Saved to vault</Toast>
 * <Toast glyph="⚠" meta="2m ago">Review needed</Toast>
 * <Toast meta="Dismissible">Quick notification</Toast>
 */
export function Toast({
  glyph,
  meta,
  className,
  children,
  ...rest
}: ToastProps) {
  const cls = ['toast', className || '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} {...rest}>
      {glyph && <span className="t-glyph">{glyph}</span>}
      <div>
        {children}
        {meta && <span className="t-meta">{meta}</span>}
      </div>
    </div>
  );
}

export default Toast;
