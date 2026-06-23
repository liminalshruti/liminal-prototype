import * as React from 'react';

export interface ModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Modal heading (renders in an `<h3>`). */
  title?: React.ReactNode;
  /** Button/action footer content (renders in `.modal-actions`). */
  actions?: React.ReactNode;
}

/**
 * Modal — centered dialog for critical decision moments.
 *
 * A card container with optional header, body content, and action footer.
 * Maps to `.modal-frame` and `.modal-actions` classes from
 * `components/modals-drawers.css`. Consumer manages visibility, scrim,
 * and focus trapping.
 *
 * @example
 * <Modal
 *   title="Confirm deletion"
 *   actions={
 *     <>
 *       <Button variant="secondary">Cancel</Button>
 *       <Button variant="destructive">Delete</Button>
 *     </>
 *   }
 * >
 *   This action cannot be undone.
 * </Modal>
 */
export function Modal({
  title,
  actions,
  className,
  children,
  ...rest
}: ModalProps) {
  const cls = ['modal-frame', className || ''].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>
      {title && <h3>{title}</h3>}
      <div className="body-content">{children}</div>
      {actions && <div className="modal-actions">{actions}</div>}
    </div>
  );
}

export default Modal;
