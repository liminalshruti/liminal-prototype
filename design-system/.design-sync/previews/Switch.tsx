import { Switch } from '@liminal/design-system';
import { Surface } from './_surface';

/** Switch toggle: on and off states. */
export function Toggles() {
  return (
    <Surface>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Switch label="Notify on re-entry" defaultChecked />
        <Switch label="Archive completed outcomes" />
        <Switch label="Sync offline" disabled />
      </div>
    </Surface>
  );
}

/** Feature toggles in a settings context. */
export function Settings() {
  return (
    <Surface>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
        <div>
          <div style={{ fontSize: '0.875rem', marginBottom: 8, fontWeight: 600 }}>Sync</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: '0.875rem' }}>Device-local seal</span>
            <Switch defaultChecked />
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.875rem', marginBottom: 8, fontWeight: 600 }}>Tracking</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem' }}>Log judgment calls</span>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </Surface>
  );
}
