import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { InfoCard } from '../ui/InfoCard';
import { Modal } from '../ui/Modal';
import { Search, Plus, Trash2 } from 'lucide-react';
import { useBinos, dataStore } from '../../data/useBinos';
import { toast } from '../../lib/toast';

export function TenantCentreView() {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', propertyId: '', unitId: '', balance: '0' });
  const { tenants, properties } = useBinos();
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
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tenants..."
              className="pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Tenant
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">No tenants match your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <div key={t.id} className="relative">
              <InfoCard
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
              <button
                onClick={() => { dataStore.remove('tenants', t.id); toast('Tenant removed', 'info'); }}
                className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                aria-label="Remove tenant"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Tenant">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Full Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Jane Doe" className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Property</label>
              <select value={form.propertyId} onChange={(e) => setForm({ ...form, propertyId: e.target.value })} className="input-field">
                <option value="">—</option>
                {properties.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Unit</label>
              <input value={form.unitId} onChange={(e) => setForm({ ...form, unitId: e.target.value })} placeholder="A1" className="input-field" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={() => {
              if (!form.name.trim()) { toast('Name is required', 'error'); return; }
              dataStore.add('tenants', { ...form, balance: Number(form.balance) || 0 });
              toast('Tenant added'); setShowModal(false);
              setForm({ name: '', email: '', phone: '', propertyId: '', unitId: '', balance: '0' });
            }}>Save Tenant</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
