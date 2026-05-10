import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  icon?: ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  iconOnly = false,
  icon,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <button
      type="button"
      className={[
        styles.button,
        styles[variant],
        fullWidth ? styles.fullWidth : '',
        iconOnly ? styles.iconOnly : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      {iconOnly ? <span className="srOnly">{children}</span> : <span>{children}</span>}
    </button>
  );
}
