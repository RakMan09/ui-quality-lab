import { useId } from 'react';
import styles from './FormField.module.css';

export type FormFieldState = 'default' | 'success' | 'invalid';

export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'search';
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string | undefined;
  successText?: string | undefined;
  errorText?: string | undefined;
  autoFocus?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  required = false,
  disabled = false,
  helperText,
  successText,
  errorText,
  autoFocus = false,
  onChange,
}: FormFieldProps) {
  const generatedId = useId();
  const inputId = `${name}-${generatedId}`;
  const helperId = `${inputId}-helper`;
  const status: FormFieldState = errorText ? 'invalid' : successText ? 'success' : 'default';

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required ? <span className={styles.required}>*</span> : null}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        className={[styles.input, styles[status]].join(' ')}
        placeholder={placeholder}
        value={value}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
        onChange={onChange}
        readOnly={Boolean(value !== undefined && !onChange)}
        aria-invalid={Boolean(errorText)}
        aria-describedby={helperText || successText || errorText ? helperId : undefined}
      />
      {helperText || successText || errorText ? (
        <p id={helperId} className={[styles.meta, errorText ? styles.metaError : '', successText ? styles.metaSuccess : ''].join(' ')}>
          {errorText ?? successText ?? helperText}
        </p>
      ) : null}
    </div>
  );
}
