import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { InfoCard } from '../ui/InfoCard';
import { Search } from 'lucide-react';
import { tenants, properties } from '../../data/mockData';

export function TenantCentreView() {
  const [query, setQuery] = useState('');
  const propertyName = (id?: string) => properties.find((p) => p.id === id)?.name ?? '—';

  const filtered = tenants.filter((t) =>
    [t.name, t.email, t.phone, propertyName(t.propertyId)].join(' ').toLowerCase().includes(query.toLowerCase())
  );

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

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">No tenants match your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <InfoCard
              key={t.id}
              icon="👤"
              title={t.name}
              badge={<Badge variant="success">Active</Badge>}
              fields={[
                { label: 'Property', value: propertyName(t.propertyId) },
                { label: 'Unit', value: t.unitId?.toUpperCase() ?? '—' },
                { label: 'Email', value: t.email },
                { label: 'Phone', value: t.phone },
                { label: 'Balance', value: t.balance ? `R${t.balance.toLocaleString()}` : '—' },
              ]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
