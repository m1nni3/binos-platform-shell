import { cn } from '../../utils/cn';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
type BadgeSize = 'sm' | 'md';

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface-100 text-neutral-slate dark:bg-neutral-800 dark:text-white',
  success: 'bg-card-properties text-green-700 dark:bg-green-950/60 dark:text-green-300',
  warning: 'bg-card-tasks text-yellow-700 dark:bg-yellow-950/60 dark:text-yellow-300',
  danger: 'bg-card-alerts text-red-700 dark:bg-red-950/60 dark:text-red-300',
  info: 'bg-card-finance text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
  outline: 'bg-transparent border border-neutral-light text-neutral-slate dark:border-neutral-700 dark:text-white',
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
