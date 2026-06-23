import { Tile } from '@liminal/design-system';
import { Surface } from './_surface';

/** Tile in vault state — accent tint, fully sealed. */
export function VaultEntry() {
  return (
    <Surface>
      <Tile
        state="vault"
        label="User Session State"
        snippet="{ id: 'sess_8f2k9', duration: 1847, events: 23 }"
        bar={{
          lights: [
            { active: true },
            { active: true },
            { active: false }
          ],
          source: 'system.session',
          live: 'live'
        }}
      />
    </Surface>
  );
}

/** Tile in refused state — boundary violation in judgment red. */
export function RefusedEntry() {
  return (
    <Surface>
      <Tile
        state="refused"
        label="Outreach Decision"
        snippet="{ contact: 'external', type: 'cold_pitch' }"
        bar={{
          lights: [
            { active: true },
            { active: false },
            { active: false }
          ],
          source: 'user.outreach',
          live: 'paused'
        }}
      />
    </Surface>
  );
}

/** Tile on slate — dimmed when placed on slate background. */
export function OnSlateEntry() {
  return (
    <Surface>
      <Tile
        state="on-slate"
        label="Decision Draft"
        snippet="{ status: 'pending', reason: 'pending_context' }"
        bar={{
          lights: [
            { active: false },
            { active: false },
            { active: false }
          ],
          source: 'user.draft',
          live: 'draft'
        }}
      />
    </Surface>
  );
}
