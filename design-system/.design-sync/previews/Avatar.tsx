import { Avatar } from '@liminal/design-system';
import { Surface } from './_surface';

/** Variants sweep: default + accent + drift. */
export function Variants() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Avatar>SR</Avatar>
          <div style={{ fontSize: 12, marginTop: 8, color: 'var(--text-faint)' }}>default</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Avatar variant="accent">A</Avatar>
          <div style={{ fontSize: 12, marginTop: 8, color: 'var(--text-faint)' }}>accent</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Avatar variant="drift">J</Avatar>
          <div style={{ fontSize: 12, marginTop: 8, color: 'var(--text-faint)' }}>drift</div>
        </div>
      </div>
    </Surface>
  );
}

/** In context: founder agents row. */
export function AgentRow() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Avatar variant="accent">A</Avatar>
        <div style={{ fontSize: 14 }}>Analyst</div>
        <span style={{ marginLeft: 16, fontSize: 12, color: 'var(--text-faint)' }}>—</span>
        <Avatar variant="accent">S</Avatar>
        <div style={{ fontSize: 14 }}>SDR</div>
        <span style={{ marginLeft: 16, fontSize: 12, color: 'var(--text-faint)' }}>—</span>
        <Avatar variant="accent">D</Avatar>
        <div style={{ fontSize: 14 }}>Auditor</div>
      </div>
    </Surface>
  );
}
