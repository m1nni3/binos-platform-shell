import { useState } from 'react';
import { Card, StatCard } from '../ui';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { Modal } from '../ui/Modal';
import { Search, MapPin, SlidersHorizontal, Grid3x3, List } from 'lucide-react';
import { properties } from '../../data/mockData';

const propertyIcons: Record<string, string> = {
  Residential: '🏘️',
  'Mixed-Use': '🏢',
  Commercial: '🏬',
};

export function PropertyCentreView() {
  const [query, setQuery] = useState('');
  const [grid, setGrid] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = properties.filter((p) =>
    [p.name, p.city, p.type, p.status].join(' ').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Property Centre</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage and monitor your entire portfolio</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search properties..."
              className="pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-slate-200"
            />
          </div>
          <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <button
              onClick={() => setGrid(true)}
              className={grid ? 'bg-slate-100 dark:bg-slate-800 p-2' : 'p-2 text-slate-400'}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGrid(false)}
              className={grid ? 'p-2 text-slate-400' : 'bg-slate-100 dark:bg-slate-800 p-2'}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Properties" value="5" icon={MapPin} accent="primary" />
        <StatCard title="Active" value="4" icon={MapPin} accent="emerald" />
        <StatCard title="Under Review" value="1" icon={MapPin} accent="amber" />
        <StatCard title="Avg Occupancy" value="87%" icon={MapPin} accent="primary" />
      </div>

      {grid ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className="card text-left hover:-translate-y-0.5 transition-transform"
            >
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{propertyIcons[p.type] || '🏠'}</span>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{p.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{p.type} • {p.city}</div>
                    </div>
                  </div>
                  <Badge variant={p.status === 'Active' ? 'success' : 'warning'}>{p.status}</Badge>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                    <div className="text-xs text-slate-500">Units</div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{p.units}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                    <div className="text-xs text-slate-500">Occupancy</div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{p.occupancy}%</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                    <div className="text-xs text-slate-500">Province</div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100 truncate">{p.province}</div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <Card>
          <DataTable
            columns={[
              { key: 'name', label: 'Property' },
              { key: 'type', label: 'Type' },
              { key: 'units', label: 'Units' },
              { key: 'occupancy', label: 'Occupancy', render: (r) => `${r.occupancy}%` },
              { key: 'city', label: 'City' },
              { key: 'status', label: 'Status', render: (r) => <Badge variant={r.status === 'Active' ? 'success' : 'warning'}>{r.status}</Badge> },
            ]}
            rows={filtered}
          />
        </Card>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Property Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-500">Name</div>
                <div className="font-medium text-slate-900 dark:text-slate-100">{properties.find((p) => p.id === selected)?.name}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Status</div>
                <div className="font-medium text-slate-900 dark:text-slate-100">{properties.find((p) => p.id === selected)?.status}</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-2">Description</div>
              <p className="text-sm text-slate-700 dark:text-slate-300">This property includes multiple units with standard amenities, secure parking, and 24-hour access control.</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
