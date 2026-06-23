import { Banner } from '@liminal/design-system';
import { Surface } from './_surface';

/** Every register a banner carries. */
export function Variants() {
  return (
    <Surface>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520 }}>
        <Banner glyph="◇"><strong>Sealed.</strong> The read is in the vault, device-local.</Banner>
        <Banner variant="good" glyph="●"><strong>Calibrated.</strong> 7 of 9 decisions tracked this cycle.</Banner>
        <Banner variant="amber" glyph="◍"><strong>Held.</strong> One outcome is due to close — 27 days.</Banner>
        <Banner variant="red" glyph="✕"><strong>Out of lane.</strong> Outreach refused: that's a Judgment call.</Banner>
        <Banner variant="accent" glyph="◆"><strong>Re-entry.</strong> Three things came back overnight.</Banner>
      </div>
    </Surface>
  );
}
