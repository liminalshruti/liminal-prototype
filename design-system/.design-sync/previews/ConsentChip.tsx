import { ConsentChip } from '@liminal/design-system';
import { Surface } from './_surface';

/** Mutual vs. unilateral consent states. */
export function Variants() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <ConsentChip lock="🔐" mutual>Mutual</ConsentChip>
        <ConsentChip lock="🔓">Unilateral</ConsentChip>
      </div>
    </Surface>
  );
}

/** In context: read consent row. */
export function ReadContext() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>Decision consent</div>
        <ConsentChip lock="🔐" mutual>Mutual</ConsentChip>
        <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>Both parties agree</span>
      </div>
    </Surface>
  );
}
