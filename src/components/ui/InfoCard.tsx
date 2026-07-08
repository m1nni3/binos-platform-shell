import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type InfoField = {
  label: string;
  value: ReactNode;
};

export function InfoCard({
  title,
  badge,
  icon,
  onClick,
  footer,
  fields,
  className,
}: {
  title?: ReactNode;
  badge?: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  footer?: ReactNode;
  fields: InfoField[];
  className?: string;
}) {
  const Wrapper = onClick ? 'button' : 'div';
  return (
    <Wrapper
      onClick={onClick}
      className={cn(
        'card text-left',
        'border border-neutral-200/70 dark:border-neutral-800',
        'flex flex-col',
        onClick && 'hover:-translate-y-0.5 hover:shadow-primary dark:hover:shadow-purple-dark transition-all',
        className
      )}
    >
      {(title || badge) && (
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            {icon && <span className="text-lg leading-none">{icon}</span>}
            {title && <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">{title}</h3>}
          </div>
          {badge}
        </div>
      )}

      <dl className="grid grid-cols-1 gap-x-4 gap-y-2.5">
        {fields.map((field, idx) => (
          <div key={idx} className="flex items-baseline justify-between gap-3 min-w-0">
            <dt className="text-xs uppercase tracking-wide text-neutral-slate dark:text-neutral-gray shrink-0">
              {field.label}
            </dt>
            <dd className="text-sm font-medium text-slate-700 dark:text-slate-200 text-right truncate">
              {field.value}
            </dd>
          </div>
        ))}
      </dl>

      {footer && <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">{footer}</div>}
    </Wrapper>
  );
}
