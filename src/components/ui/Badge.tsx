import { cn } from '../../utils/cn';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
type BadgeSize = 'sm' | 'md';

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
  danger: 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300',
  info: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
  outline: 'bg-transparent border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg font-medium',
        variantStyles[variant],
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
        className
      )}
    >
      {children}
    </span>
  );
}
