import { Radio } from '@liminal/design-system';
import { Surface } from './_surface';

/** Radio group: single-select options for decision state. */
export function DecisionState() {
  return (
    <Surface>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 280 }}>
        <div style={{ fontSize: '0.875rem', marginBottom: 4, color: 'var(--text-faint)' }}>
          Current outcome:
        </div>
        <Radio name="decision-state" label="Held · tracking" value="held" defaultChecked />
        <Radio name="decision-state" label="Sealed · in vault" value="sealed" />
        <Radio name="decision-state" label="Closed" value="closed" />
      </div>
    </Surface>
  );
}

/** Radio group: view mode selection. */
export function ViewMode() {
  return (
    <Surface>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 280 }}>
        <div style={{ fontSize: '0.875rem', marginBottom: 4, color: 'var(--text-faint)' }}>
          Vault view:
        </div>
        <Radio name="view-mode" label="Decisions · timeline" value="decisions" defaultChecked />
        <Radio name="view-mode" label="Agents · by role" value="agents" />
        <Radio name="view-mode" label="Archive" value="archive" />
      </div>
    </Surface>
  );
}
