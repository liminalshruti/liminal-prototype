import { Button } from '@liminal/design-system';
import { Surface } from './_surface';

/** All five variants, in the registers a founder actually triggers. */
export function Variants() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="primary">Seal entry</Button>
        <Button variant="secondary">Branch</Button>
        <Button variant="destructive">Delete vault entry</Button>
        <Button variant="ghost">Defer</Button>
        <Button variant="icon" aria-label="Settings">⚙</Button>
      </div>
    </Surface>
  );
}

/** The states a button moves through, statically renderable. */
export function States() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="primary">Idle</Button>
        <Button variant="primary" loading>Sealing…</Button>
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="primary" joint>Joint correction</Button>
      </div>
    </Surface>
  );
}

/** A real toolbar row — primary advance + parallel + defer. */
export function ActionRow() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Button variant="primary">Open the read →</Button>
        <Button variant="secondary">Sign &amp; hand off</Button>
        <Button variant="ghost">Defer 2d</Button>
      </div>
    </Surface>
  );
}
