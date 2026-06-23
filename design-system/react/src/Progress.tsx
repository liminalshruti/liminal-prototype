import * as React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Percentage value (0-100). Omit for indeterminate animation. */
  value?: number;
}

/**
 * Progress — determinate or indeterminate progress bar.
 *
 * Renders a `.progress` container with `.progress-bar` child. If `value`
 * is provided, sets `.is-determinate` with `--progress` CSS variable.
 * If omitted, renders `.is-indeterminate` with sliding animation.
 * Maps to `.progress` and `.progress-bar` classes from
 * `components/selection-controls.css`.
 *
 * @example
 * <Progress value={65} />
 * <Progress />
 * <Progress value={0} />
 */
export function Progress({
  value,
  className,
  ...rest
}: ProgressProps) {
  const isDeterminate = value !== undefined;
  const cls = [
    'progress',
    isDeterminate ? 'is-determinate' : 'is-indeterminate',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const barStyle = isDeterminate
    ? { ['--progress' as any]: `${value}%` }
    : undefined;

  return (
    <div className={cls} {...rest}>
      <div className="progress-bar" style={barStyle} />
    </div>
  );
}

export default Progress;
