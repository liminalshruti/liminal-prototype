import * as React from 'react';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text rendered after the switch track. */
  label?: React.ReactNode;
}

/**
 * Switch — binary toggle control with track and animated thumb.
 *
 * A native `<input type="checkbox">` hidden with label wrapper `.sw`.
 * The styled `.sw-track` span provides the track and sliding thumb.
 * Maps to `.sw` and `.sw-track` classes from `components/selection-controls.css`.
 *
 * @example
 * <Switch label="Enable notifications" />
 * <Switch label="Dark mode" defaultChecked />
 * <Switch label="Disabled" disabled />
 */
export function Switch({
  label,
  className,
  ...rest
}: SwitchProps) {
  const cls = ['sw', className || ''].filter(Boolean).join(' ');

  return (
    <label className={cls}>
      <input type="checkbox" {...rest} />
      <span className="sw-track" />
      {label}
    </label>
  );
}

export default Switch;
