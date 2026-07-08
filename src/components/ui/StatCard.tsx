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
  accent?: 'primary' | 'properties' | 'finance' | 'maintenance' | 'communications' | 'analytics' | 'contacts' | 'documents' | 'tasks' | 'alerts';
}) {
  const accentColors: Record<string, string> = {
    primary: 'bg-primary-50 text-brand-blue dark:bg-primary-950/40 dark:text-brand-blue',
    properties: 'bg-card-properties text-brand-green dark:bg-green-950/40 dark:text-brand-green',
    finance: 'bg-card-finance text-brand-blue dark:bg-brand-blue/10 dark:text-brand-blue',
    maintenance: 'bg-card-maintenance text-brand-orange dark:bg-orange-950/40 dark:text-brand-orange',
    communications: 'bg-card-communications text-brand-pink dark:bg-pink-950/40 dark:text-brand-pink',
    analytics: 'bg-card-analytics text-brand-purple dark:bg-purple-950/40 dark:text-brand-purple',
    contacts: 'bg-card-contacts text-accent-teal dark:bg-teal-950/40 dark:text-accent-teal',
    documents: 'bg-card-documents text-accent-indigo dark:bg-indigo-950/40 dark:text-accent-indigo',
    tasks: 'bg-card-tasks text-accent-yellow dark:bg-yellow-950/40 dark:text-accent-yellow',
    alerts: 'bg-card-alerts text-accent-coral dark:bg-red-950/40 dark:text-accent-coral',
  };

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-neutral-slate dark:text-neutral-gray">{title}</p>
          <p className="mt-2 text-2xl font-bold text-neutral-black dark:text-white">{value}</p>
          {change && <p className="mt-1 text-xs text-neutral-slate dark:text-neutral-gray">{change}</p>}
        </div>
        <div className={cn('p-2 rounded-lg', accentColors[accent])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
