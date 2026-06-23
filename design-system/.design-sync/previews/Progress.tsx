import { Progress } from '@liminal/design-system';
import { Surface } from './_surface';

/** Progress: determinate bar showing completion. */
export function Determinate() {
  return (
    <Surface>
      <div style={{ maxWidth: 280 }}>
        <div style={{ fontSize: '0.875rem', marginBottom: 8, color: 'var(--text-faint)' }}>
          Outcomes tracked this cycle: 7 of 9
        </div>
        <Progress value={77} />
      </div>
    </Surface>
  );
}

/** Progress: indeterminate animation during processing. */
export function Indeterminate() {
  return (
    <Surface>
      <div style={{ maxWidth: 280 }}>
        <div style={{ fontSize: '0.875rem', marginBottom: 8, color: 'var(--text-faint)' }}>
          Syncing decisions to vault…
        </div>
        <Progress />
      </div>
    </Surface>
  );
}
