import { Modal, Button } from '@liminal/design-system';
import { Surface } from './_surface';

/** Confirmation modal for a critical decision. */
export function ConfirmDeletion() {
  return (
    <Surface>
      <Modal
        title="Remove from vault?"
        actions={
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Button variant="secondary">Keep</Button>
            <Button variant="destructive">Remove</Button>
          </div>
        }
      >
        <div style={{ lineHeight: 1.6 }}>
          This entry will be permanently removed from the vault. You cannot undo this action.
        </div>
      </Modal>
    </Surface>
  );
}

/** Success confirmation modal. */
export function EntrySealed() {
  return (
    <Surface>
      <Modal
        title="Entry sealed"
        actions={
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Button variant="primary">Done</Button>
          </div>
        }
      >
        <div style={{ lineHeight: 1.6 }}>
          Your decision is now locked in the vault—device-local, attributed, and re-enterable.
        </div>
      </Modal>
    </Surface>
  );
}
