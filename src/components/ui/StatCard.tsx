import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  accent = 'primary',
}: {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  accent?: 'primary' | 'emerald' | 'amber' | 'rose';
}) {
  const accentColors: Record<string, string> = {
    primary: 'bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400',
  };

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{value}</p>
          {change && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{change}</p>}
        </div>
        <div className={cn('p-2 rounded-xl', accentColors[accent])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
