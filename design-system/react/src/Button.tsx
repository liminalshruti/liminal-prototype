import * as React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'ghost'
  | 'icon';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual + semantic register of the action.
   * - `primary` — the action that advances the flow (seal · save · ship). Hairline-bottom.
   * - `secondary` — a parallel action (branch · alternate path). Bordered.
   * - `destructive` — removes / discards. Bordered alarm register.
   * - `ghost` — low-emphasis nav that doesn't commit. Transparent.
   * - `icon` — square compact toolbar button. Requires `aria-label`.
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /** Shows an inline spinner and sets `aria-busy`. The label still renders. */
  loading?: boolean;
  /** Mutual-cofounder joint-correction register (primary only). */
  joint?: boolean;
  /** Render in the review-only (oversight) register: dimmed, non-interactive. */
  review?: boolean;
}

/**
 * Button — the primary user-facing decision surface.
 *
 * A native `<button>` styled by the Liminal canon. Variants map to the
 * design-system's real CSS classes (`.btn` + `.btn-{variant}`); the look,
 * states, and 5-axis relationship behavior live in `components/buttons.css`,
 * not here.
 *
 * @example
 * <Button variant="primary">Seal entry</Button>
 * <Button variant="secondary">Branch</Button>
 * <Button variant="destructive">Delete vault entry</Button>
 * <Button variant="primary" loading>Sealing…</Button>
 * <Button variant="icon" aria-label="Settings">⚙</Button>
 */
export function Button({
  variant = 'primary',
  loading = false,
  joint = false,
  review = false,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const cls = [
    'btn',
    variant === 'icon' ? 'btn-icon' : `btn-${variant}`,
    joint ? 'is-joint' : '',
    review ? 'is-review' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={cls}
      aria-busy={loading || undefined}
      disabled={disabled}
      {...rest}
    >
      {loading ? <span className="btn-spinner" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}

export default Button;
