import { useState } from 'react';
import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { Search } from 'lucide-react';
import { units } from '../../data/mockData';

export function UnitManagerView() {
  const [query, setQuery] = useState('');
  const filtered = units.filter((u) => [u.unit, u.status, u.occupant || ''].join(' ').toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Unit Manager</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Track unit status, occupancy, and leases</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search units..."
            className="pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-slate-200"
          />
        </div>
      </div>

      <Card>
        <DataTable
          caption="Units"
          columns={[
            { key: 'unit', label: 'Unit' },
            { key: 'status', label: 'Status', render: (r) => <Badge variant={r.status === 'Occupied' ? 'success' : r.status === 'Vacant' ? 'warning' : 'danger'}>{r.status}</Badge> },
            { key: 'occupant', label: 'Occupant', render: (r) => r.occupant || '—' },
            { key: 'rent', label: 'Rent', render: (r) => `R${r.rent.toLocaleString()}` },
            { key: 'leaseEnd', label: 'Lease End', render: (r) => r.leaseEnd || '—' },
          ]}
          rows={filtered}
        />
      </Card>
    </div>
  );
}
