import { useMemo, useState } from 'react';
import { Card, StatCard, Badge, Modal } from '../ui';
import { DataTable } from '../ui/DataTable';
import { Wallet, Plus, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { useBinos, dataStore } from '../../data/useBinos';
import { api } from '../../data/api';
import { toast } from '../../lib/toast';

const fmt = (n: number) =>
  'R ' + Number(n || 0).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function PettyCashView() {
  const { pettyCash, properties } = useBinos();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: 'income', amount: '', description: '', category: '', property_id: '' });

  const totals = useMemo(() => {
    const income = pettyCash.filter((r) => r.type === 'income').reduce((s, r) => s + Number(r.amount || 0), 0);
    const expenses = pettyCash.filter((r) => r.type === 'expenses').reduce((s, r) => s + Number(r.amount || 0), 0);
    return { income, expenses, balance: income - expenses };
  }, [pettyCash]);

  const propName = (id?: string | number) =>
    properties.find((p) => String(p.id) === String(id))?.name || (id ? `Property ${id}` : '—');

  const rows = [...pettyCash].sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));

  const save = async () => {
    const entry = {
      type: form.type,
      amount: Number(form.amount) || 0,
      description: form.description,
      category: form.category,
      property_id: form.property_id || null,
      date: new Date().toISOString().slice(0, 10),
    };
    dataStore.add('pettyCash', entry);
    try {
      await api.createPettyCash(entry);
      toast('Petty cash entry saved');
    } catch {
      toast('Saved locally (backend unavailable)', 'error');
    }
    setShowModal(false);
    setForm({ type: 'income', amount: '', description: '', category: '', property_id: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-black dark:text-white">Petty Cash</h1>
          <p className="text-sm text-neutral-slate dark:text-neutral-gray">Day-to-day income and expense float per property</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Entry
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Income" value={fmt(totals.income)} icon={TrendingUp} accent="properties" />
        <StatCard title="Total Expenses" value={fmt(totals.expenses)} icon={TrendingDown} accent="maintenance" />
        <StatCard title="Balance" value={fmt(totals.balance)} icon={Wallet} accent="finance" />
      </div>

      <Card title="Petty Cash Ledger" right={<Badge variant="outline">{rows.length} entries</Badge>}>
        <DataTable
          columns={[
            { key: 'type', label: 'Type', render: (r) => <Badge variant={r.type === 'income' ? 'success' : 'danger'}>{r.type}</Badge> },
            { key: 'category', label: 'Category' },
            { key: 'description', label: 'Description' },
            { key: 'property_id', label: 'Property', render: (r) => propName(r.property_id) },
            { key: 'date', label: 'Date' },
            { key: 'amount', label: 'Amount', render: (r) => fmt(r.amount) },
            {
              key: 'actions',
              label: '',
              render: (r) => (
                <button
                  onClick={() => {
                    dataStore.remove('pettyCash', r.id);
                    toast('Entry removed', 'info');
                  }}
                  className="text-red-600 hover:underline text-xs"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              ),
            },
          ]}
          rows={rows}
          empty={<div className="p-8 text-center text-sm text-neutral-slate dark:text-neutral-gray">No petty cash entries yet.</div>}
        />
      </Card>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Petty Cash Entry">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field">
                <option value="income">Income</option>
                <option value="expenses">Expense</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">Amount (R)</label>
              <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0.00" className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">Description</label>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="e.g. Cleaning supplies" className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">Category</label>
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Supplies" className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">Property</label>
              <select value={form.property_id} onChange={(e) => setForm({ ...form, property_id: e.target.value })} className="input-field">
                <option value="">—</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={save}>Save Entry</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
