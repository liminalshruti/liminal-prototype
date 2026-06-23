import { EmptyState } from '@liminal/design-system';
import { Surface } from './_surface';

/** Empty vault: no entries yet. */
export function NoEntries() {
  return (
    <Surface>
      <EmptyState glyph="📭" title="No entries">
        Create your first read to begin tracking decisions
      </EmptyState>
    </Surface>
  );
}

/** Empty search results. */
export function NoResults() {
  return (
    <Surface>
      <EmptyState glyph="🔍" title="No matches">
        Try adjusting your search or filter criteria
      </EmptyState>
    </Surface>
  );
}
