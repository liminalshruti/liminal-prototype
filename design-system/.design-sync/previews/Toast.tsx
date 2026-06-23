import { Toast } from '@liminal/design-system';
import { Surface } from './_surface';

/** Status toasts with glyph + optional metadata. */
export function Variants() {
  return (
    <Surface>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Toast glyph="✓">Sealed to vault</Toast>
        <Toast glyph="↻" meta="syncing…">Reconciling reads</Toast>
        <Toast glyph="⚠" meta="1 issue">Review needed</Toast>
        <Toast glyph="◇" meta="2m ago">Entry accepted</Toast>
      </div>
    </Surface>
  );
}

/** Metadata only (no leading glyph). */
export function MetadataOnly() {
  return (
    <Surface>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Toast meta="Dismissible">Changes saved</Toast>
        <Toast meta="auto-close in 4s">Judgment logged</Toast>
      </div>
    </Surface>
  );
}
