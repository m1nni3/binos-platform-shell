import { cn } from '../../utils/cn';

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center')}>
      {icon && <div className="mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 p-3 text-slate-400">{icon}</div>}
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      {description && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
