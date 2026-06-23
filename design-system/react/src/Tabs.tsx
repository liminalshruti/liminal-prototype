import * as React from 'react';

export interface TabsItem {
  /** Unique identifier for the tab (used for `.is-active` matching). */
  id: string;
  /** Tab label (text, icon, or ReactNode). */
  label: React.ReactNode;
}

export interface TabsProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'onSelect'
  > {
  /** Array of tab items. */
  items: TabsItem[];
  /** ID of the currently active tab. */
  active?: string;
  /** Callback when a tab is selected. */
  onSelect?: (id: string) => void;
}

/**
 * Tabs — traditional horizontal tablist for document-like structures.
 *
 * A bordered container with full-width buttons. The active tab receives
 * the `.is-active` class. Maps to `.tabs` container and `<button>` children
 * from `components/tabs-segmented-nav.css`.
 *
 * @example
 * <Tabs
 *   items={[
 *     { id: 'overview', label: 'Overview' },
 *     { id: 'details', label: 'Details' }
 *   ]}
 *   active="overview"
 *   onSelect={(id) => setActive(id)}
 * />
 */
export function Tabs({
  items,
  active,
  onSelect,
  className,
  ...rest
}: TabsProps) {
  const cls = ['tabs', className || ''].filter(Boolean).join(' ');

  return (
    <div className={cls} role="tablist" {...rest}>
      {items.map((item) => (
        <button
          key={item.id}
          className={active === item.id ? 'is-active' : ''}
          onClick={() => onSelect?.(item.id)}
          role="tab"
          aria-selected={active === item.id}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
