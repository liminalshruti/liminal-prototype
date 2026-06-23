import * as React from 'react';

export interface ClassificationStripProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * ClassificationStrip — clearance level label badge.
 *
 * A single-element badge for displaying classification or clearance level.
 * Use with meaningful text content (full names, not abbreviations).
 * Maps to `.classification-strip` class from `components/audit-classification.css`.
 *
 * @example
 * <ClassificationStrip>Restricted</ClassificationStrip>
 * <ClassificationStrip>Confidential</ClassificationStrip>
 */
export function ClassificationStrip({
  className,
  children,
  ...rest
}: ClassificationStripProps) {
  const cls = ['classification-strip', className || '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}

export default ClassificationStrip;
