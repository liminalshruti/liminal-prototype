import * as React from 'react';

export type SkeletonLineWidth = 'short' | 'mid' | 'long';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of skeleton lines to render (cycles through widths). */
  lines?: number;
  /** Single line width preset ('short' 40%, 'mid' 70%, 'long' 100%). */
  line?: SkeletonLineWidth;
}

/**
 * Skeleton — shimmer placeholder during content loading.
 *
 * Renders either a block `.skeleton` or multiple `.skeleton-line` elements
 * with varied widths (short/mid/long). Useful for showing placeholder content
 * while data loads. Maps to `.skeleton` and `.skeleton-line` + `.is-{width}`
 * classes from `components/empty-loading-skeleton.css`.
 *
 * @example
 * <Skeleton />
 * <Skeleton lines={3} />
 * <Skeleton line="short" />
 * <Skeleton line="mid" />
 */
export function Skeleton({
  lines,
  line,
  className,
  ...rest
}: SkeletonProps) {
  const cls = ['skeleton', className || ''].filter(Boolean).join(' ');

  if (lines && lines > 0) {
    const widths: SkeletonLineWidth[] = ['short', 'mid', 'long'];
    return (
      <div {...rest}>
        {Array.from({ length: lines }).map((_, i) => {
          const width = widths[i % widths.length];
          const lineClass = [
            'skeleton-line',
            `is-${width}`,
          ].join(' ');
          return <div key={i} className={lineClass} />;
        })}
      </div>
    );
  }

  if (line) {
    const lineClass = ['skeleton-line', `is-${line}`]
      .filter(Boolean)
      .join(' ');
    return <div className={lineClass} {...rest} />;
  }

  return <div className={cls} {...rest} />;
}

export default Skeleton;
