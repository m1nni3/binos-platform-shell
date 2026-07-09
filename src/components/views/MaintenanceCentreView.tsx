import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { InfoCard } from '../ui/InfoCard';
import { Modal } from '../ui/Modal';
import { Plus, Trash2 } from 'lucide-react';
import { useBinos, dataStore } from '../../data/useBinos';
import { toast } from '../../lib/toast';

export function MaintenanceCentreView() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', propertyId: '', unitId: '', priority: 'Medium', contractor: '', due: '' });
  const { maintenanceJobs, units, properties } = useBinos();

  const priorityVariant: Record<string, 'danger' | 'warning' | 'success'> = {
    High: 'danger',
    Medium: 'warning',
    Low: 'success',
  };

  const statusVariant: Record<string, 'warning' | 'success' | 'info'> = {
    Open: 'warning',
    Completed: 'success',
    Scheduled: 'info',
  };

  const unitLabel = (pid?: string, uid?: string) => {
    const u = units.find((x) => x.id === uid);
    const p = properties.find((x) => x.id === pid);
    return [p?.name, u ? `Unit ${u.unit}` : null].filter(Boolean).join(' • ') || '—';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Maintenance Centre</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Work orders, contractors, quotes, and invoices</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" /> Raise Work Order
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {maintenanceJobs.map((job) => (
          <div key={job.id} className="relative">
            <InfoCard
              icon="🔧"
              title={job.title}
              badge={<Badge variant={statusVariant[job.status] || 'info'}>{job.status}</Badge>}
              fields={[
                { label: 'Location', value: unitLabel(job.propertyId, job.unitId) },
                { label: 'Priority', value: <Badge variant={priorityVariant[job.priority] || 'warning'}>{job.priority}</Badge> },
                { label: 'Contractor', value: job.contractor || '—' },
                { label: 'Due', value: job.due || '—' },
              ]}
              footer={
                <button
                  onClick={() => {
                    dataStore.update('maintenanceJobs', job.id, { status: job.status === 'Completed' ? 'Open' : 'Completed' });
                    toast(job.status === 'Completed' ? 'Work order reopened' : 'Work order completed', 'info');
                  }}
                  className="btn-secondary w-full"
                >
                  {job.status === 'Completed' ? 'Reopen' : 'Mark Done'}
                </button>
              }
            />
            <button
              onClick={() => { dataStore.remove('maintenanceJobs', job.id); toast('Work order removed', 'info'); }}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
              aria-label="Remove work order"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Raise Work Order">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Leaking geyser" className="input-field" />
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
              <select value={form.unitId} onChange={(e) => setForm({ ...form, unitId: e.target.value })} className="input-field">
                <option value="">—</option>
                {units.filter((u) => !form.propertyId || u.propertyId === form.propertyId).map((u) => <option key={u.id} value={u.id}>{u.unit}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Priority</label>
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="input-field">
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Due</label>
              <input type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Contractor</label>
            <input value={form.contractor} onChange={(e) => setForm({ ...form, contractor: e.target.value })} placeholder="e.g. QuickFix Plumbers" className="input-field" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={() => {
              if (!form.title.trim()) { toast('Title is required', 'error'); return; }
              dataStore.add('maintenanceJobs', { ...form, status: 'Open' });
              toast('Work order raised'); setShowModal(false);
              setForm({ title: '', propertyId: '', unitId: '', priority: 'Medium', contractor: '', due: '' });
            }}>Save Work Order</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
