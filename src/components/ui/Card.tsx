import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export function Card({ title, right, children, className }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn('card p-5', className)}>
      {(title || right) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>}
          {right && <div>{right}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
