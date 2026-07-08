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
          <h1 className="text-2xl font-semibold text-neutral-black dark:text-white">Property Centre</h1>
          <p className="text-sm text-neutral-slate dark:text-neutral-gray">Manage and monitor your entire portfolio</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-gray" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search properties..."
              className="pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-light text-sm outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue dark:text-white placeholder:text-neutral-gray"
            />
          </div>
          <button className="p-2 rounded-xl border border-neutral-light text-neutral-slate hover:bg-surface-50 dark:hover:bg-neutral-800 transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <div className="flex rounded-xl border border-neutral-light overflow-hidden">
            <button
              onClick={() => setGrid(true)}
              className={grid ? 'bg-surface-50 dark:bg-neutral-800 p-2' : 'p-2 text-neutral-gray'}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGrid(false)}
              className={grid ? 'p-2 text-neutral-gray' : 'bg-surface-50 dark:bg-neutral-800 p-2'}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Properties" value="5" icon={MapPin} accent="primary" />
        <StatCard title="Active" value="4" icon={MapPin} accent="properties" />
        <StatCard title="Under Review" value="1" icon={MapPin} accent="maintenance" />
        <StatCard title="Avg Occupancy" value="87%" icon={MapPin} accent="primary" />
      </div>

      {grid ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className="panel text-left hover:-translate-y-0.5 transition-transform hover:shadow-primary dark:hover:shadow-purple-dark"
            >
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{propertyIcons[p.type] || '🏠'}</span>
                    <div>
                      <div className="font-semibold text-neutral-black dark:text-white">{p.name}</div>
                      <div className="text-xs text-neutral-slate dark:text-neutral-gray">{p.type} • {p.city}</div>
                    </div>
                  </div>
                  <Badge variant={p.status === 'Active' ? 'success' : 'warning'}>{p.status}</Badge>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-surface-50 dark:bg-neutral-900 p-3 border border-neutral-light">
                    <div className="text-xs text-neutral-slate dark:text-neutral-gray">Units</div>
                    <div className="font-semibold text-neutral-black dark:text-white">{p.units}</div>
                  </div>
                  <div className="rounded-xl bg-surface-50 dark:bg-neutral-900 p-3 border border-neutral-light">
                    <div className="text-xs text-neutral-slate dark:text-neutral-gray">Occupancy</div>
                    <div className="font-semibold text-neutral-black dark:text-white">{p.occupancy}%</div>
                  </div>
                  <div className="rounded-xl bg-surface-50 dark:bg-neutral-900 p-3 border border-neutral-light">
                    <div className="text-xs text-neutral-slate dark:text-neutral-gray">Province</div>
                    <div className="font-semibold text-neutral-black dark:text-white truncate">{p.province}</div>
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
                <div className="text-xs text-neutral-slate dark:text-neutral-gray">Name</div>
                <div className="font-medium text-neutral-black dark:text-white">{properties.find((p) => p.id === selected)?.name}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-slate dark:text-neutral-gray">Status</div>
                <div className="font-medium text-neutral-black dark:text-white">{properties.find((p) => p.id === selected)?.status}</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-slate dark:text-neutral-gray mb-2">Description</div>
              <p className="text-sm text-neutral-slate dark:text-neutral-gray">This property includes multiple units with standard amenities, secure parking, and 24-hour access control.</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
