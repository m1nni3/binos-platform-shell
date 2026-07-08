import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { InfoCard } from '../ui/InfoCard';
import { Search } from 'lucide-react';
import { units, properties } from '../../data/mockData';

const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  Occupied: 'success',
  Vacant: 'warning',
  Maintenance: 'danger',
};

export function UnitManagerView() {
  const [query, setQuery] = useState('');
  const propertyName = (id?: string) => properties.find((p) => p.id === id)?.name ?? '—';

  const filtered = units.filter((u) =>
    [u.unit, u.status, u.occupant || '', propertyName(u.propertyId)].join(' ').toLowerCase().includes(query.toLowerCase())
  );

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
            className="pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">No units match your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((u) => (
            <InfoCard
              key={u.id}
              icon="🚪"
              title={`Unit ${u.unit}`}
              badge={<Badge variant={statusVariant[u.status] || 'default'}>{u.status}</Badge>}
              fields={[
                { label: 'Property', value: propertyName(u.propertyId) },
                { label: 'Occupant', value: u.occupant ?? '—' },
                { label: 'Rent', value: `R${u.rent.toLocaleString()}` },
                { label: 'Lease End', value: u.leaseEnd ?? '—' },
              ]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
