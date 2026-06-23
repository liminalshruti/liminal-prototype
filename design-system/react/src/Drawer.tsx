import * as React from 'react';

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the drawer panel is visible. */
  open?: boolean;
}

/**
 * Drawer — edge-anchored panel for auxiliary content.
 *
 * A static open panel is rendered for preview purposes. The consumer manages
 * the `open` state and transform/animation. Maps to `.drawer-host` and
 * `.drawer-panel` classes from `components/modals-drawers.css`.
 *
 * @example
 * <Drawer open={true}>
 *   <h4>Settings</h4>
 *   <p>Drawer content here</p>
 * </Drawer>
 */
export function Drawer({
  open = true,
  className,
  children,
  ...rest
}: DrawerProps) {
  const cls = ['drawer-host', className || ''].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>
      <div className="drawer-panel">{children}</div>
    </div>
  );
}

export default Drawer;
