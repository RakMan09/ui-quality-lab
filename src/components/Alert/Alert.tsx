import styles from './Alert.module.css';

export type AlertTone = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  title?: string;
  message: string;
  tone?: AlertTone;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function Alert({ title, message, tone = 'info', dismissible = false, onDismiss }: AlertProps) {
  return (
    <div className={[styles.alert, styles[tone]].join(' ')} role="status" aria-live="polite">
      <div className={styles.content}>
        {title ? <h4 className={styles.title}>{title}</h4> : null}
        <p className={styles.message}>{message}</p>
      </div>
      {dismissible ? (
        <button type="button" className={styles.dismiss} onClick={onDismiss} aria-label="Dismiss alert">
          ×
        </button>
      ) : null}
    </div>
  );
}
