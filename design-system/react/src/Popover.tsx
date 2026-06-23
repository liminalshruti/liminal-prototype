import * as React from 'react';

export interface PopoverProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Rich panel content (interactive, multi-line). */
  panel: React.ReactNode;
  /** The trigger element. */
  children: React.ReactNode;
}

/**
 * Popover — interactive anchored panel with content and optional actions.
 *
 * Wraps a trigger element in `.pop-host`. The `.popover` element is
 * positioned below the trigger and shown on click (consumer implements).
 * Maps to `.pop-host` and `.popover` classes from `components/tooltips-popovers.css`.
 *
 * @example
 * <Popover panel={<div><h4>Help</h4><p>Click to learn more</p></div>}>
 *   <button>?</button>
 * </Popover>
 */
export function Popover({
  panel,
  className,
  children,
  ...rest
}: PopoverProps) {
  const cls = ['pop-host', className || ''].filter(Boolean).join(' ');

  return (
    <span className={cls} {...rest}>
      {children}
      <span className="popover">{panel}</span>
    </span>
  );
}

export default Popover;
