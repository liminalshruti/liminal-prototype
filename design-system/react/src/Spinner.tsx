import * as React from 'react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Spinner — inline rotating loader indicator.
 *
 * A simple 18px circular spinner with accent-colored top border.
 * Use with role="status" and aria-label for accessibility.
 * Maps to `.spinner` class from `components/empty-loading-skeleton.css`.
 *
 * @example
 * <div role="status">
 *   <Spinner />
 *   <span className="sr-only">Loading...</span>
 * </div>
 */
export function Spinner({
  className,
  ...rest
}: SpinnerProps) {
  const cls = ['spinner', className || ''].filter(Boolean).join(' ');

  return <div className={cls} {...rest} />;
}

export default Spinner;
