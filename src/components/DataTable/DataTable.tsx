import styles from './DataTable.module.css';

export interface DataColumn {
  key: string;
  label: string;
  align?: 'left' | 'right';
}

export interface DataRow {
  id: string;
  values: Record<string, string | number>;
}

export interface DataTableProps {
  caption: string;
  columns: DataColumn[];
  rows: DataRow[];
  loading?: boolean;
  emptyMessage?: string;
  errorMessage?: string;
  sortedBy?: string;
  sortDirection?: 'asc' | 'desc';
  stackedOnMobile?: boolean;
}

export function DataTable({
  caption,
  columns,
  rows,
  loading = false,
  emptyMessage = 'No rows available.',
  errorMessage,
  sortedBy,
  sortDirection = 'asc',
  stackedOnMobile = false,
}: DataTableProps) {
  if (errorMessage) {
    return (
      <div className={styles.errorPanel} role="alert">
        {errorMessage}
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loadingPanel} aria-busy="true" aria-label="Loading table rows">
        Loading table rows...
      </div>
    );
  }

  if (!rows.length) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <div className={stackedOnMobile ? styles.mobileStacked : ''}>
      <table className={styles.table}>
        <caption className={styles.caption}>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => {
              const isSorted = sortedBy === column.key;
              const sortLabel = isSorted ? (sortDirection === 'asc' ? ' ascending' : ' descending') : '';

              return (
                <th
                  key={column.key}
                  scope="col"
                  className={column.align === 'right' ? styles.alignRight : ''}
                  aria-sort={isSorted ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  {column.label}
                  <span className="srOnly">{sortLabel}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={`${row.id}-${column.key}`} data-label={column.label} className={column.align === 'right' ? styles.alignRight : ''}>
                  {row.values[column.key] ?? '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
