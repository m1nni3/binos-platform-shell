import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { maintenanceJobs } from '../../data/mockData';

const priorityVariant: Record<string, 'danger' | 'warning' | 'success'> = {
  High: 'danger',
  Medium: 'warning',
  Low: 'success',
};

export function MaintenanceCentreView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Maintenance Centre</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Work orders, contractors, quotes, and invoices</p>
      </div>

      <Card>
        <DataTable
          caption="Jobs"
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'title', label: 'Title' },
            { key: 'priority', label: 'Priority', render: (r) => <Badge variant={priorityVariant[r.priority] || 'default'}>{r.priority}</Badge> },
            { key: 'status', label: 'Status', render: (r) => <Badge variant={r.status === 'Open' ? 'warning' : r.status === 'Completed' ? 'success' : 'info'}>{r.status}</Badge> },
            { key: 'contractor', label: 'Contractor' },
            { key: 'due', label: 'Due' },
          ]}
          rows={maintenanceJobs}
        />
      </Card>
    </div>
  );
}
