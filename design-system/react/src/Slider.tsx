import * as React from 'react';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Slider — range input with continuous value selection.
 *
 * A native `<input type="range">` styled with the `.sld` class.
 * Arrow keys adjust the value; the slider thumb is styled with accent color.
 * Maps to `.sld` class from `components/selection-controls.css`.
 *
 * @example
 * <Slider min="0" max="100" defaultValue="50" />
 * <Slider min="0" max="255" step="1" />
 * <Slider disabled />
 */
export function Slider({
  className,
  ...rest
}: SliderProps) {
  const cls = ['sld', className || ''].filter(Boolean).join(' ');

  return <input type="range" className={cls} {...rest} />;
}

export default Slider;
