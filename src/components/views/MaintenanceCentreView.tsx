import { Badge } from '../ui/Badge';
import { InfoCard } from '../ui/InfoCard';
import { maintenanceJobs, units, properties } from '../../data/mockData';

const priorityVariant: Record<string, 'danger' | 'warning' | 'success'> = {
  High: 'danger',
  Medium: 'warning',
  Low: 'success',
};

const statusVariant: Record<string, 'warning' | 'success' | 'info'> = {
  Open: 'warning',
  Completed: 'success',
  Scheduled: 'info',
};

const unitLabel = (pid?: string, uid?: string) => {
  const u = units.find((x) => x.id === uid);
  const p = properties.find((x) => x.id === pid);
  return [p?.name, u ? `Unit ${u.unit}` : null].filter(Boolean).join(' • ') || '—';
};

export function MaintenanceCentreView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Maintenance Centre</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Work orders, contractors, quotes, and invoices</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {maintenanceJobs.map((job) => (
          <InfoCard
            key={job.id}
            icon="🔧"
            title={job.title}
            badge={<Badge variant={statusVariant[job.status] || 'info'}>{job.status}</Badge>}
            fields={[
              { label: 'Location', value: unitLabel(job.propertyId, job.unitId) },
              { label: 'Priority', value: <Badge variant={priorityVariant[job.priority] || 'default'}>{job.priority}</Badge> },
              { label: 'Contractor', value: job.contractor },
              { label: 'Due', value: job.due },
            ]}
          />
        ))}
      </div>
    </div>
  );
}
