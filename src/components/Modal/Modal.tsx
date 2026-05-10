import { useEffect, useId } from 'react';
import { Button } from '../Button';
import styles from './Modal.module.css';

export type ModalTone = 'default' | 'confirmation' | 'destructive';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  tone?: ModalTone;
  mobileLayout?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
}

export function Modal({
  isOpen,
  title,
  description,
  tone = 'default',
  mobileLayout = false,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
  children,
}: ModalProps) {
  const headingId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <section
        className={[styles.modal, styles[tone], mobileLayout ? styles.mobileLayout : ''].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-describedby={description ? descriptionId : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h3 id={headingId} className={styles.title}>
            {title}
          </h3>
          {description ? (
            <p id={descriptionId} className={styles.description}>
              {description}
            </p>
          ) : null}
        </header>

        <div className={styles.content}>{children}</div>

        <footer className={styles.actions}>
          <Button variant="secondary" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button variant={tone === 'destructive' ? 'danger' : 'primary'} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </footer>
      </section>
    </div>
  );
}
