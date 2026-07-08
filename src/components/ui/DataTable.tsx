import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export function DataTable({
  caption,
  columns,
  rows,
  empty,
}: {
  caption?: string;
  columns: { key: string; label: string; render?: (row: any) => ReactNode }[];
  rows: any[];
  empty?: ReactNode;
}) {
  if (!rows.length && empty) {
    return <div className="card">{empty}</div>;
  }

  return (
    <div className="card">
      {caption && (
        <div className="mb-3 text-xs font-medium text-neutral-slate dark:text-neutral-gray">{caption}</div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="table-header">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-slate dark:text-neutral-gray">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="table-row">
                {columns.map((col) => (
                  <td key={col.key} className="table-cell">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
