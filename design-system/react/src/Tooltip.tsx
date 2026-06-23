import * as React from 'react';

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tooltip text content (passive, single-line). */
  tip: React.ReactNode;
  /** The trigger element (button, link, icon, etc.). */
  children: React.ReactNode;
}

/**
 * Tooltip — passive hover callout with no interactivity.
 *
 * Wraps a trigger element in `.tooltip-host`. The `.tooltip` element is
 * shown on hover/focus via CSS. Maps to `.tooltip-host` and `.tooltip`
 * classes from `components/tooltips-popovers.css`.
 *
 * @example
 * <Tooltip tip="Save your work">
 *   <button>Save</button>
 * </Tooltip>
 * <Tooltip tip="Delete permanently">
 *   <span role="img" aria-label="delete">🗑</span>
 * </Tooltip>
 */
export function Tooltip({
  tip,
  className,
  children,
  ...rest
}: TooltipProps) {
  const cls = ['tooltip-host', className || ''].filter(Boolean).join(' ');

  return (
    <span className={cls} {...rest}>
      {children}
      <span className="tooltip">{tip}</span>
    </span>
  );
}

export default Tooltip;
