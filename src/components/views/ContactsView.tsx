import { useState } from 'react';
import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { InfoCard } from '../ui/InfoCard';
import { Modal } from '../ui/Modal';
import { Plus, Trash2 } from 'lucide-react';
import { useBinos, dataStore } from '../../data/useBinos';
import { toast } from '../../lib/toast';

const categoryIcon: Record<string, string> = {
  Tenant: '👤',
  Owner: '🏠',
  Contractor: '🔧',
  'Body Corporate': '🏢',
  Emergency: '🚨',
};

export function ContactsView() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', category: 'Contractor' });
  const { contacts } = useBinos();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Contacts</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Owners, tenants, contractors, and emergency contacts</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Contact
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {contacts.map((c) => (
          <div key={c.id} className="relative">
            <InfoCard
              icon={categoryIcon[c.category] || '👤'}
              title={c.name}
              badge={<Badge variant="info">{c.category}</Badge>}
              fields={[
                { label: 'Email', value: c.email },
                { label: 'Phone', value: c.phone },
              ]}
            />
            <button
              onClick={() => { dataStore.remove('contacts', c.id); toast('Contact removed', 'info'); }}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
              aria-label="Remove contact"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <Card title="Directory note">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing {contacts.length} saved contacts. Use categories to filter owners, tenants, contractors, and emergency numbers.
        </p>
      </Card>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Contact">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
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
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
              <option>Tenant</option><option>Owner</option><option>Contractor</option><option>Body Corporate</option><option>Emergency</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={() => {
              if (!form.name.trim()) { toast('Name is required', 'error'); return; }
              dataStore.add('contacts', { ...form });
              toast('Contact added'); setShowModal(false);
              setForm({ name: '', email: '', phone: '', category: 'Contractor' });
            }}>Save Contact</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
