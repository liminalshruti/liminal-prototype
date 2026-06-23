import { Checkbox } from '@liminal/design-system';
import { Surface } from './_surface';

/** Checkbox checked and unchecked states with label. */
export function Variants() {
  return (
    <Surface>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Checkbox label="Seal this outcome" />
        <Checkbox label="Confirmed by Auditor" defaultChecked />
        <Checkbox label="Offline · read-only" disabled />
      </div>
    </Surface>
  );
}

/** Multi-select: a small group of checkboxes in a field context. */
export function FieldGroup() {
  return (
    <Surface>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 280 }}>
        <div style={{ fontSize: '0.875rem', marginBottom: 8, color: 'var(--text-faint)' }}>
          Judgment registers to track:
        </div>
        <Checkbox label="Synthesis" defaultChecked />
        <Checkbox label="Outreach" defaultChecked />
        <Checkbox label="Diligence" />
        <Checkbox label="Watch" disabled />
      </div>
    </Surface>
  );
}
