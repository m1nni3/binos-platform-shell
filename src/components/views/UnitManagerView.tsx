import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { InfoCard } from '../ui/InfoCard';
import { Modal } from '../ui/Modal';
import { Search, Plus, Trash2 } from 'lucide-react';
import { useBinos, dataStore } from '../../data/useBinos';
import { toast } from '../../lib/toast';

const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  Occupied: 'success',
  Vacant: 'warning',
  Maintenance: 'danger',
};

export function UnitManagerView() {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ unit: '', propertyId: '', status: 'Vacant', occupant: '', rent: '0', leaseEnd: '' });
  const { units, properties } = useBinos();
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
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search units..."
              className="pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Unit
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">No units match your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((u) => (
            <div key={u.id} className="relative">
              <InfoCard
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
              <button
                onClick={() => { dataStore.remove('units', u.id); toast('Unit removed', 'info'); }}
                className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                aria-label="Remove unit"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Unit">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Unit No.</label>
              <input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="A1" className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-field">
                <option>Vacant</option><option>Occupied</option><option>Maintenance</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Property</label>
            <select value={form.propertyId} onChange={(e) => setForm({ ...form, propertyId: e.target.value })} className="input-field">
              <option value="">—</option>
              {properties.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Rent (R)</label>
              <input type="number" value={form.rent} onChange={(e) => setForm({ ...form, rent: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Lease End</label>
              <input type="date" value={form.leaseEnd} onChange={(e) => setForm({ ...form, leaseEnd: e.target.value })} className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Occupant</label>
            <input value={form.occupant} onChange={(e) => setForm({ ...form, occupant: e.target.value })} placeholder="Tenant name" className="input-field" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={() => {
              if (!form.unit.trim()) { toast('Unit number is required', 'error'); return; }
              dataStore.add('units', { ...form, rent: Number(form.rent) || 0 });
              toast('Unit added'); setShowModal(false);
              setForm({ unit: '', propertyId: '', status: 'Vacant', occupant: '', rent: '0', leaseEnd: '' });
            }}>Save Unit</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
