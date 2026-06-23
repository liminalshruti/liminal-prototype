import * as React from 'react';

export interface SegmentedItem {
  /** Unique identifier for the button (used for `.is-active` matching). */
  id: string;
  /** Button label (text, icon, or ReactNode). */
  label: React.ReactNode;
}

export interface SegmentedProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'onSelect'
  > {
  /** Array of segmented control items. */
  items: SegmentedItem[];
  /** ID of the currently active item. */
  active?: string;
  /** Callback when an item is selected. */
  onSelect?: (id: string) => void;
}

/**
 * Segmented — compact radio-button-like control group.
 *
 * A density-sensitive alternative to Tabs with rounded background container.
 * The active item receives the `.is-active` class. Maps to `.segmented` container
 * and `<button>` children from `components/tabs-segmented-nav.css`.
 *
 * @example
 * <Segmented
 *   items={[
 *     { id: 'grid', label: '▦' },
 *     { id: 'list', label: '≡' }
 *   ]}
 *   active="grid"
 *   onSelect={(id) => setView(id)}
 * />
 */
export function Segmented({
  items,
  active,
  onSelect,
  className,
  ...rest
}: SegmentedProps) {
  const cls = ['segmented', className || ''].filter(Boolean).join(' ');

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

export default Segmented;
