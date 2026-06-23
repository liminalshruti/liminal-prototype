import { ClassificationStrip } from '@liminal/design-system';
import { Surface } from './_surface';

/** Clearance levels. */
export function Clearance() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <ClassificationStrip>Public</ClassificationStrip>
        <ClassificationStrip>Confidential</ClassificationStrip>
        <ClassificationStrip>Restricted</ClassificationStrip>
      </div>
    </Surface>
  );
}
