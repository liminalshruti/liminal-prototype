import { Drawer } from '@liminal/design-system';
import { Surface } from './_surface';

/** Settings panel drawer. */
export function SettingsPanel() {
  return (
    <Surface>
      <div style={{ position: 'relative', height: 300, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
        <Drawer open={true}>
          <div style={{ padding: '20px' }}>
            <h4 style={{ marginTop: 0, marginBottom: 16, fontSize: '1rem' }}>Settings</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Vault visibility
                </label>
                <div style={{ fontSize: '0.9375rem', marginTop: 4 }}>Device-local only</div>
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Agent trust level
                </label>
                <div style={{ fontSize: '0.9375rem', marginTop: 4 }}>High</div>
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Sync
                </label>
                <div style={{ fontSize: '0.9375rem', marginTop: 4 }}>Off</div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </Surface>
  );
}

/** Filter/search drawer. */
export function FilterDrawer() {
  return (
    <Surface>
      <div style={{ position: 'relative', height: 280, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
        <Drawer open={true}>
          <div style={{ padding: '20px' }}>
            <h4 style={{ marginTop: 0, marginBottom: 16, fontSize: '1rem' }}>Filters</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ fontSize: '0.875rem', marginBottom: 8 }}>Status</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <label style={{ fontSize: '0.8125rem' }}>
                    <input type="checkbox" defaultChecked /> Sealed
                  </label>
                  <label style={{ fontSize: '0.8125rem' }}>
                    <input type="checkbox" /> Open
                  </label>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', marginBottom: 8 }}>Type</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <label style={{ fontSize: '0.8125rem' }}>
                    <input type="checkbox" defaultChecked /> Decision
                  </label>
                  <label style={{ fontSize: '0.8125rem' }}>
                    <input type="checkbox" /> Action
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </Surface>
  );
}
