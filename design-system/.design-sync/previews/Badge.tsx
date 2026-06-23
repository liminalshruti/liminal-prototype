import { Badge } from '@liminal/design-system';
import { Surface } from './_surface';

/** Semantic variants: default + good + amber + red + judgment. */
export function Variants() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <Badge>public</Badge>
        <Badge variant="good">verified</Badge>
        <Badge variant="amber">pending</Badge>
        <Badge variant="red">blocked</Badge>
        <Badge variant="judgment">restricted</Badge>
      </div>
    </Surface>
  );
}

/** Security tiers in a row. */
export function SecurityTiers() {
  return (
    <Surface>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <Badge variant="good">public vault</Badge>
        <Badge variant="amber">read-only</Badge>
        <Badge variant="judgment">confidential</Badge>
        <Badge variant="red">sealed</Badge>
      </div>
    </Surface>
  );
}
