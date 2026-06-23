import { Tooltip } from '@liminal/design-system';
import { Surface } from './_surface';

/** Icon button with passive hover tip. */
export function IconButtonTip() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Tooltip tip="Seal this entry">
          <button
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text)',
              cursor: 'pointer',
              fontSize: '1.25rem',
              padding: '4px 8px'
            }}
          >
            ◆
          </button>
        </Tooltip>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          hover: ◆
        </span>
      </div>
    </Surface>
  );
}

/** Link-adjacent tooltip on focus. */
export function LinkTip() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Tooltip tip="Read the audit trail for this decision">
          <a
            href="#"
            style={{
              color: 'var(--text)',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
            onClick={(e) => e.preventDefault()}
          >
            audit log
          </a>
        </Tooltip>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          hover/focus: audit log
        </span>
      </div>
    </Surface>
  );
}
