import { useState } from 'react';
import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { Search } from 'lucide-react';
import { tenants } from '../../data/mockData';

export function TenantCentreView() {
  const [query, setQuery] = useState('');
  const filtered = tenants.filter((t) => [t.name, t.email, t.phone].join(' ').toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Tenant Centre</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Directory, profiles, and lease history</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tenants..."
            className="pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
      </div>

      <Card>
        <DataTable
          caption="Tenants"
          columns={[
            { key: 'name', label: 'Tenant' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'balance', label: 'Balance', render: (r) => r.balance ? `R${r.balance.toLocaleString()}` : '—' },
            { key: 'name', label: 'Status', render: () => <Badge variant="success">Active</Badge> },
          ]}
          rows={filtered}
        />
      </Card>
    </div>
  );
}
