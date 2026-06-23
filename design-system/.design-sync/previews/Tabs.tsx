import { Tabs } from '@liminal/design-system';
import { Surface } from './_surface';

/** Tabs: vault document sections. */
export function VaultTabs() {
  return (
    <Surface>
      <Tabs
        items={[
          { id: 'outcomes', label: 'Outcomes' },
          { id: 'agents', label: 'Agents' },
          { id: 'archive', label: 'Archive' },
        ]}
        active="outcomes"
      />
    </Surface>
  );
}

/** Tabs: decision tracking views. */
export function DecisionTabs() {
  return (
    <Surface>
      <Tabs
        items={[
          { id: 'active', label: 'In progress' },
          { id: 'held', label: 'Held (27 days)' },
          { id: 'sealed', label: 'Sealed' },
        ]}
        active="held"
      />
    </Surface>
  );
}
