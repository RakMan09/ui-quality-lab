import { type ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  footer?: ReactNode;
  hoverable?: boolean;
  loading?: boolean;
  empty?: boolean;
  dense?: boolean;
  error?: boolean;
}

export function Card({
  title,
  subtitle,
  children,
  footer,
  hoverable = false,
  loading = false,
  empty = false,
  dense = false,
  error = false,
}: CardProps) {
  return (
    <article
      className={[
        styles.card,
        hoverable ? styles.hoverable : '',
        dense ? styles.dense : '',
        error ? styles.error : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-busy={loading || undefined}
    >
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </header>

      {loading ? (
        <div className={styles.skeletonGroup} aria-hidden="true">
          <span className={styles.skeletonLine} />
          <span className={styles.skeletonLine} />
          <span className={styles.skeletonLineShort} />
        </div>
      ) : null}

      {!loading && empty ? (
        <p className={styles.emptyState}>No content is available for this panel yet.</p>
      ) : null}

      {!loading && !empty ? <div className={styles.content}>{children}</div> : null}

      {footer ? <footer className={styles.footer}>{footer}</footer> : null}
    </article>
  );
}
