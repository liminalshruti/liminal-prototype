import { Popover } from '@liminal/design-system';
import { Surface } from './_surface';

/** Help button with rich panel content. */
export function HelpPanel() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <Popover
          panel={
            <div style={{ padding: '12px 0' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 8 }}>
                About sealing
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                A sealed entry is locked in the vault—device-local, attributed, re-enterable. Once sealed, the decision is immutable.
              </div>
            </div>
          }
        >
          <button
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              cursor: 'pointer',
              width: 28,
              height: 28,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ?
          </button>
        </Popover>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          click: ?
        </span>
      </div>
    </Surface>
  );
}

/** Options menu panel. */
export function OptionsMenu() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <Popover
          panel={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div
                style={{
                  padding: '8px 12px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  borderRadius: 4
                }}
              >
                Duplicate entry
              </div>
              <div
                style={{
                  padding: '8px 12px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  borderRadius: 4
                }}
              >
                Archive
              </div>
              <div
                style={{
                  padding: '8px 12px',
                  fontSize: '0.875rem',
                  color: 'var(--alarm)',
                  cursor: 'pointer',
                  borderRadius: 4
                }}
              >
                Remove
              </div>
            </div>
          }
        >
          <button
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              cursor: 'pointer',
              width: 28,
              height: 28,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ⋯
          </button>
        </Popover>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          click: ⋯
        </span>
      </div>
    </Surface>
  );
}
