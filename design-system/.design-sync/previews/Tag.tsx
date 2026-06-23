import { Tag } from '@liminal/design-system';
import { Surface } from './_surface';

/** Every semantic register, with status dots. */
export function Variants() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <Tag>draft</Tag>
        <Tag variant="success" dot>sealed</Tag>
        <Tag variant="error" dot>rejected</Tag>
        <Tag variant="warning" dot>pending</Tag>
        <Tag variant="info" dot>analyst</Tag>
      </div>
    </Surface>
  );
}

/** With and without the leading dot. */
export function Dot() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <Tag variant="success">no dot</Tag>
        <Tag variant="success" dot>with dot</Tag>
      </div>
    </Surface>
  );
}

/** A real classification row off a read — lane + status chips together. */
export function OnARead() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <Tag>Founding round</Tag>
        <Tag variant="warning" dot>Almost ready</Tag>
        <Tag variant="info">in-lane · Judgment</Tag>
      </div>
    </Surface>
  );
}
