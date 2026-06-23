import * as React from 'react';

export interface AuditRibbonRow {
  /** Row text content. */
  text: React.ReactNode;
  /** Optional timestamp or metadata. Rendered in `.time` span. */
  time?: React.ReactNode;
  /** If true, applies `.is-refused` class (judgment red styling). */
  refused?: boolean;
}

export interface AuditRibbonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional label rendered in `.ar-label`. */
  label?: React.ReactNode;
  /** Array of audit entry rows. */
  rows: AuditRibbonRow[];
}

/**
 * AuditRibbon — chain-of-custody or audit log entry breadcrumb.
 *
 * A horizontal strip displaying a series of audit entries with optional
 * timestamps and refusal status. Each row is an inline-flex entry.
 * Maps to `.audit-ribbon-frame`, `.ar-label`, `.ar-row`, `.is-refused`,
 * and `.time` classes from `components/audit-classification.css`.
 *
 * @example
 * <AuditRibbon
 *   label="Audit trail"
 *   rows={[
 *     { text: 'Sealed', time: '2m ago' },
 *     { text: 'Reviewed', time: '1m ago' },
 *     { text: 'Denied', time: 'now', refused: true }
 *   ]}
 * />
 */
export function AuditRibbon({
  label,
  rows,
  className,
  ...rest
}: AuditRibbonProps) {
  const cls = ['audit-ribbon-frame', className || '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} {...rest}>
      {label && <span className="ar-label">{label}</span>}
      {rows.map((row, i) => (
        <span
          key={i}
          className={['ar-row', row.refused ? 'is-refused' : '']
            .filter(Boolean)
            .join(' ')}
        >
          {row.text}
          {row.time && <span className="time">{row.time}</span>}
        </span>
      ))}
    </div>
  );
}

export default AuditRibbon;
