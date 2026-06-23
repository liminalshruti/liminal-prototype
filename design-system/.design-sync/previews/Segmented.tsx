import { Segmented } from '@liminal/design-system';
import { Surface } from './_surface';

/** Three-option view selector — common density-compact control. */
export function ViewSelector() {
  return (
    <Surface>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
            View mode
          </p>
          <Segmented
            items={[
              { id: 'grid', label: '▦' },
              { id: 'list', label: '≡' },
              { id: 'detail', label: '◨' }
            ]}
            active="grid"
          />
        </div>
      </div>
    </Surface>
  );
}

/** Filter preset selection. */
export function FilterPresets() {
  return (
    <Surface>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
          Show
        </p>
        <Segmented
          items={[
            { id: 'all', label: 'All entries' },
            { id: 'sealed', label: 'Sealed' },
            { id: 'open', label: 'Open' }
          ]}
          active="sealed"
        />
      </div>
    </Surface>
  );
}
