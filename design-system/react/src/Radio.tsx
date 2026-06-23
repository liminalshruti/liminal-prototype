import * as React from 'react';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text rendered after the radio circle. */
  label?: React.ReactNode;
}

/**
 * Radio — single-select control with dot indicator.
 *
 * A native `<input type="radio">` hidden with label wrapper `.rd`.
 * The styled `.rd-circle` span provides visual feedback. Maps to `.rd` and
 * `.rd-circle` classes from `components/selection-controls.css`.
 *
 * @example
 * <Radio name="view" label="Grid view" value="grid" />
 * <Radio name="view" label="List view" value="list" defaultChecked />
 * <Radio name="view" label="Disabled" value="disabled" disabled />
 */
export function Radio({
  label,
  className,
  ...rest
}: RadioProps) {
  const cls = ['rd', className || ''].filter(Boolean).join(' ');

  return (
    <label className={cls}>
      <input type="radio" {...rest} />
      <span className="rd-circle" />
      {label}
    </label>
  );
}

export default Radio;
