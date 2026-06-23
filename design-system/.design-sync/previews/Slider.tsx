import { Slider } from '@liminal/design-system';
import { Surface } from './_surface';

/** Slider: confidence/percentage range. */
export function Confidence() {
  return (
    <Surface>
      <div style={{ maxWidth: 320 }}>
        <div style={{ fontSize: '0.875rem', marginBottom: 12, color: 'var(--text-faint)' }}>
          Confidence in outcome
        </div>
        <Slider min="0" max="100" defaultValue="66" />
      </div>
    </Surface>
  );
}

/** Slider: day range for holding period. */
export function HoldingPeriod() {
  return (
    <Surface>
      <div style={{ maxWidth: 320 }}>
        <div style={{ fontSize: '0.875rem', marginBottom: 12, color: 'var(--text-faint)' }}>
          Holding period (days)
        </div>
        <Slider min="0" max="90" step="1" defaultValue="14" />
      </div>
    </Surface>
  );
}
