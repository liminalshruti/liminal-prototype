import * as React from 'react';

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Emoji or icon for the empty state. Rendered in `.glyph` span. */
  glyph?: React.ReactNode;
  /** Heading text (renders in `.es-title`). */
  title?: React.ReactNode;
}

/**
 * EmptyState — message + icon container for empty content areas.
 *
 * Displays a centered glyph, title, and body content. Use when a container
 * has no data. Maps to `.empty-state`, `.glyph`, `.es-title`, and `.es-body`
 * classes from `components/empty-loading-skeleton.css`.
 *
 * @example
 * <EmptyState glyph="📭" title="No entries">
 *   Create your first entry to get started
 * </EmptyState>
 * <EmptyState title="No results" glyph="🔍">
 *   Try adjusting your search criteria
 * </EmptyState>
 */
export function EmptyState({
  glyph,
  title,
  className,
  children,
  ...rest
}: EmptyStateProps) {
  const cls = ['empty-state', className || ''].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>
      {glyph && <div className="glyph">{glyph}</div>}
      {title && <div className="es-title">{title}</div>}
      {children && <div className="es-body">{children}</div>}
    </div>
  );
}

export default EmptyState;
