import { useState } from 'react';
import { Card, StatCard } from '../ui';
import { DataTable } from '../ui/DataTable';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Search, MapPin, SlidersHorizontal, LayoutGrid, Table as TableIcon, Plus, Trash2 } from 'lucide-react';
import { useBinos, dataStore } from '../../data/useBinos';
import { toast } from '../../lib/toast';

const propertyIcons: Record<string, string> = {
  Residential: '🏘️',
  'Mixed-Use': '🏢',
  Commercial: '🏬',
};

export function PropertyCentreView() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const { properties } = useBinos();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', city: '', province: '', type: 'Residential', status: 'Active', units: '0', occupancy: '0' });
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
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Property
          </button>
          <div className="flex items-center rounded-xl border border-neutral-light overflow-hidden">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 transition-colors ${viewMode === 'cards' ? 'bg-brand-blue text-white' : 'text-neutral-slate hover:bg-surface-50 dark:hover:bg-neutral-800'}`}
              title="Card view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 transition-colors ${viewMode === 'table' ? 'bg-brand-blue text-white' : 'text-neutral-slate hover:bg-surface-50 dark:hover:bg-neutral-800'}`}
              title="Table view"
            >
              <TableIcon className="w-4 h-4" />
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

      {viewMode === 'table' ? (
        <Card title="All Properties" right={<Badge variant="outline">{filtered.length}</Badge>}>
          <DataTable
            columns={[
              { key: 'name', label: 'Name', render: (p) => <span className="font-medium text-neutral-black dark:text-white">{p.name}</span> },
              { key: 'type', label: 'Type' },
              { key: 'city', label: 'City' },
              { key: 'province', label: 'Province' },
              { key: 'status', label: 'Status', render: (p) => <Badge variant={p.status === 'Active' ? 'success' : 'warning'}>{p.status}</Badge> },
              { key: 'units', label: 'Units' },
              { key: 'occupancy', label: 'Occupancy', render: (p) => `${p.occupancy}%` },
              { key: 'actions', label: '', render: (p) => (
                <button onClick={() => { dataStore.remove('properties', p.id); toast('Property removed', 'info'); }} className="text-red-600 hover:underline text-xs"><Trash2 className="w-4 h-4" /></button>
              ) },
            ]}
            rows={filtered}
            empty={<div className="p-8 text-center text-sm text-neutral-slate dark:text-neutral-gray">No properties match your search.</div>}
          />
        </Card>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className="panel text-left hover:-translate-y-0.5 transition-transform hover:shadow-primary dark:hover:shadow-purple-dark"
            >
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <Badge variant={p.status === 'Active' ? 'success' : 'warning'}>{p.status}</Badge>
                  <span className="text-lg">{propertyIcons[p.type] || '🏠'}</span>
                </div>
                <div className="mt-3">
                  <div className="font-semibold text-neutral-black dark:text-white">{p.name}</div>
                  <div className="text-xs text-neutral-slate dark:text-neutral-gray">{p.type} • {p.city}</div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-center">
                  <span className="flex-1 rounded-xl bg-surface-50 dark:bg-neutral-900 px-2 py-2 border border-neutral-light">
                    <span className="block text-xs text-neutral-slate dark:text-neutral-gray">Units</span>
                    <span className="font-semibold text-neutral-black dark:text-white">{p.units}</span>
                  </span>
                  <span className="flex-1 rounded-xl bg-surface-50 dark:bg-neutral-900 px-2 py-2 border border-neutral-light">
                    <span className="block text-xs text-neutral-slate dark:text-neutral-gray">Occupancy</span>
                    <span className="font-semibold text-neutral-black dark:text-white">{p.occupancy}%</span>
                  </span>
                  <span className="flex-1 rounded-xl bg-surface-50 dark:bg-neutral-900 px-2 py-2 border border-neutral-light">
                    <span className="block text-xs text-neutral-slate dark:text-neutral-gray">Province</span>
                    <span className="font-semibold text-neutral-black dark:text-white truncate">{p.province}</span>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
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

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Property">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Rosewood Estate" className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">City</label>
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">Province</label>
              <input value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} className="input-field" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field">
                <option>Residential</option><option>Commercial</option><option>Mixed-Use</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-field">
                <option>Active</option><option>Under Review</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">Units</label>
              <input type="number" value={form.units} onChange={(e) => setForm({ ...form, units: e.target.value })} className="input-field" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={() => {
              if (!form.name.trim()) { toast('Name is required', 'error'); return; }
              dataStore.add('properties', { ...form, units: Number(form.units) || 0, occupancy: Number(form.occupancy) || 0 });
              toast('Property added'); setShowModal(false);
              setForm({ name: '', city: '', province: '', type: 'Residential', status: 'Active', units: '0', occupancy: '0' });
            }}>Save Property</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
