import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional uppercase mono label rendered above the control. */
  label?: string;
  /** Helper or error text rendered below the control. */
  hint?: string;
  /** Marks the field invalid: error border + `aria-invalid`, and renders `hint` in the error register. */
  invalid?: boolean;
}

/**
 * Input — single-line text entry.
 *
 * The quiet surface where the operator speaks back to the system. Wraps a
 * native `<input>` styled by the canon (`.input`), optionally inside a
 * `.field` group with a `.field-label` and a `.field-hint`. Sizing comes
 * from `--density-scale` on the body, not a prop.
 *
 * @example
 * <Input label="Vault key" placeholder="enter key…" />
 * <Input label="Email" defaultValue="not-an-email" invalid hint="Enter a valid address." />
 * <Input label="Locked" value="read only" disabled />
 */
export function Input({
  label,
  hint,
  invalid = false,
  className,
  id,
  ...rest
}: InputProps) {
  const inputId = id || (label ? `f-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const hintId = hint && inputId ? `${inputId}-hint` : undefined;
  const control = (
    <input
      id={inputId}
      className={['input', className || ''].filter(Boolean).join(' ')}
      aria-invalid={invalid || undefined}
      aria-describedby={hintId}
      {...rest}
    />
  );

  if (!label && !hint) return control;

  return (
    <div className="field">
      {label ? (
        <label className="field-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      {control}
      {hint ? (
        <span
          id={hintId}
          className={['field-hint', invalid ? 'is-error' : ''].filter(Boolean).join(' ')}
        >
          {hint}
        </span>
      ) : null}
    </div>
  );
}

export default Input;
