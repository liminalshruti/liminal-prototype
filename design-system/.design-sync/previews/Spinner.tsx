import { Spinner } from '@liminal/design-system';
import { Surface } from './_surface';

/** Inline spinner with loading label. */
export function InlineLoading() {
  return (
    <Surface>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Spinner />
        <span style={{ fontSize: 14 }}>Reconciling entries…</span>
      </div>
    </Surface>
  );
}
