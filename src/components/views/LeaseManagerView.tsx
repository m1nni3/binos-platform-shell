import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { leases } from '../../data/mockData';

export function LeaseManagerView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Lease Manager</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Lease lifecycle, renewals, deposits, and terms</p>
      </div>

      <Card>
        <DataTable
          caption="Leases"
          columns={[
            { key: 'id', label: 'Lease' },
            { key: 'tenantId', label: 'Tenant' },
            { key: 'unitId', label: 'Unit' },
            { key: 'start', label: 'Start' },
            { key: 'end', label: 'End' },
            { key: 'rent', label: 'Rent', render: (r) => `R${r.rent.toLocaleString()}` },
            { key: 'status', label: 'Status', render: (r) => <Badge variant="success">{r.status}</Badge> },
          ]}
          rows={leases}
        />
      </Card>
    </div>
  );
}
