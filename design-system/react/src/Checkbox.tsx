import * as React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text rendered after the checkbox box. */
  label?: React.ReactNode;
}

/**
 * Checkbox — multi-select control with check-mark indicator.
 *
 * A native `<input type="checkbox">` hidden with label wrapper `.ck`.
 * The styled `.ck-box` span provides visual feedback. Maps to `.ck` and
 * `.ck-box` classes from `components/selection-controls.css`.
 *
 * @example
 * <Checkbox label="I agree to the terms" />
 * <Checkbox label="Verified" defaultChecked />
 * <Checkbox label="Disabled" disabled />
 */
export function Checkbox({
  label,
  className,
  ...rest
}: CheckboxProps) {
  const cls = ['ck', className || ''].filter(Boolean).join(' ');

  return (
    <label className={cls}>
      <input type="checkbox" {...rest} />
      <span className="ck-box" />
      {label}
    </label>
  );
}

export default Checkbox;
