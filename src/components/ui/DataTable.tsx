import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export function DataTable({
  columns,
  rows,
  caption,
  empty,
}: {
  columns: { key: string; label: string; width?: string; render?: (row: any) => ReactNode }[];
  rows: any[];
  caption?: string;
  empty?: ReactNode;
}) {
  if (!rows?.length && empty) return <>{empty}</>;
  if (!rows?.length) {
    return (
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800 overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-xs font-medium text-slate-500">No records</div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800 overflow-hidden">
      {caption && (
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-xs font-medium text-slate-500">{caption}</div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200/60 dark:border-slate-800">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400"
                  style={c.width ? { width: c.width } : undefined}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={cn(
                  'border-b border-slate-200/60 dark:border-slate-800 last:border-b-0',
                  'hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors'
                )}
              >
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 text-slate-700 dark:text-slate-200">
                    {c.render ? c.render(row) : (row[c.key] as ReactNode)}
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
