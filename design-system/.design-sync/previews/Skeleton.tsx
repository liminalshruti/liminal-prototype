import { Skeleton } from '@liminal/design-system';
import { Surface } from './_surface';

/** Skeleton: multi-line placeholder. */
export function MultiLine() {
  return (
    <Surface>
      <div style={{ maxWidth: 280 }}>
        <Skeleton lines={3} />
      </div>
    </Surface>
  );
}

/** Skeleton: single line variations. */
export function SingleLines() {
  return (
    <Surface>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 280 }}>
        <div>
          <div style={{ fontSize: '0.875rem', marginBottom: 6, color: 'var(--text-faint)' }}>
            Short label
          </div>
          <Skeleton line="short" />
        </div>
        <div>
          <div style={{ fontSize: '0.875rem', marginBottom: 6, color: 'var(--text-faint)' }}>
            Medium content block
          </div>
          <Skeleton line="mid" />
        </div>
        <div>
          <div style={{ fontSize: '0.875rem', marginBottom: 6, color: 'var(--text-faint)' }}>
            Full-width entry
          </div>
          <Skeleton line="long" />
        </div>
      </div>
    </Surface>
  );
}
