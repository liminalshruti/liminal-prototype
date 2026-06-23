import { AuditRibbon } from '@liminal/design-system';
import { Surface } from './_surface';

/** Custody chain from submission to vault. */
export function CustodyChain() {
  return (
    <Surface>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
          Entry custody
        </p>
        <AuditRibbon
          label="Chain"
          rows={[
            { text: 'Submitted', time: '9:14am' },
            { text: 'Analyzed', time: '9:15am' },
            { text: 'Sealed', time: '9:16am' }
          ]}
        />
      </div>
    </Surface>
  );
}

/** Audit trail with a refusal event. */
export function WithRefusal() {
  return (
    <Surface>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
          Decision audit
        </p>
        <AuditRibbon
          label="Trail"
          rows={[
            { text: 'Proposed', time: '2m ago' },
            { text: 'Flagged', time: '1m ago' },
            { text: 'Refused', time: 'now', refused: true }
          ]}
        />
      </div>
    </Surface>
  );
}
