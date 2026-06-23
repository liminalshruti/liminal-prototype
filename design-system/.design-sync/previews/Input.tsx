import { Input } from '@liminal/design-system';
import { Surface } from './_surface';

/** The canonical field: label + control + placeholder. */
export function Default() {
  return (
    <Surface>
      <div style={{ maxWidth: 320 }}>
        <Input label="Vault key" placeholder="enter key…" />
      </div>
    </Surface>
  );
}

/** Invalid state — error border + error-register hint. */
export function Invalid() {
  return (
    <Surface>
      <div style={{ maxWidth: 320 }}>
        <Input
          label="Email"
          defaultValue="not-an-email"
          invalid
          hint="Enter a valid address."
        />
      </div>
    </Surface>
  );
}

/** Disabled / read-only. */
export function Disabled() {
  return (
    <Surface>
      <div style={{ maxWidth: 320 }}>
        <Input label="Sealed field" value="read only · device-local" disabled />
      </div>
    </Surface>
  );
}

/** A small form column — the field group stacked. */
export function FieldGroup() {
  return (
    <Surface>
      <div style={{ maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input label="Subject" placeholder="founding round" />
        <Input label="Held for" defaultValue="2 days" hint="auto-re-read overnight" />
      </div>
    </Surface>
  );
}
