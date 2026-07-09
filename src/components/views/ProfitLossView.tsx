import { useMemo, useState } from 'react';
import { Card, StatCard, Badge, DataTable, Modal } from '../ui';
import { BarChart3, PieChart, Receipt, TrendingUp, TrendingDown, Scale, Plus, Trash2 } from 'lucide-react';
import { useBinos, dataStore } from '../../data/useBinos';
import { api } from '../../data/api';
import { toast } from '../../lib/toast';

const fmt = (n: number) =>
  'R ' + Number(n || 0).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type Tab = 'budgets' | 'monthly' | 'entries';

export function ProfitLossView() {
  const { plBudgets, plMonthly, plEntries, properties } = useBinos();
  const [tab, setTab] = useState<Tab>('budgets');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ category: 'Income', amount: '', description: '', property_id: '', deducted_expenses: false });

  const entries = plEntries;

  const propName = (id?: string | number) =>
    properties.find((p) => String(p.id) === String(id))?.name || (id ? `Property ${id}` : 'All');

  // Budget summary: split categories into income vs operating expense.
  const budgetSummary = useMemo(() => {
    const income = plBudgets
      .filter((b) => /income|rental/i.test(b.category))
      .reduce((s, b) => s + Number(b.amount || 0), 0);
    const expenses = plBudgets
      .filter((b) => !/income|rental/i.test(b.category))
      .reduce((s, b) => s + Number(b.amount || 0), 0);
    return { income, expenses, net: income - expenses };
  }, [plBudgets]);

  // Entries summary.
  const entrySummary = useMemo(() => {
    const income = entries.filter((e) => e.category === 'Income').reduce((s, e) => s + Number(e.amount || 0), 0);
    const expenses = entries.filter((e) => e.category === 'Expense').reduce((s, e) => s + Number(e.amount || 0), 0);
    return { income, expenses, net: income - expenses };
  }, [entries]);

  const tabs: { id: Tab; label: string; icon: typeof BarChart3 }[] = [
    { id: 'budgets', label: 'Budgets', icon: PieChart },
    { id: 'monthly', label: 'Monthly', icon: BarChart3 },
    { id: 'entries', label: 'Entries', icon: Receipt },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-black dark:text-white">Profit &amp; Loss</h1>
        <p className="text-sm text-neutral-slate dark:text-neutral-gray">Budgeted and actual P&amp;L across the portfolio</p>
      </div>

      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                active
                  ? 'border-brand-blue text-brand-blue dark:text-brand-blue'
                  : 'border-transparent text-neutral-slate dark:text-neutral-gray hover:text-neutral-black dark:hover:text-white'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === 'budgets' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="Budgeted Income" value={fmt(budgetSummary.income)} icon={TrendingUp} accent="properties" />
            <StatCard title="Budgeted Expenses" value={fmt(budgetSummary.expenses)} icon={TrendingDown} accent="maintenance" />
            <StatCard title="Budgeted Net" value={fmt(budgetSummary.net)} icon={Scale} accent="finance" />
          </div>
          <Card title="P&amp;L Budgets" right={<Badge variant="outline">{plBudgets.length}</Badge>}>
            <DataTable
              columns={[
                { key: 'property_id', label: 'Property', render: (r) => propName(r.property_id) },
                { key: 'category', label: 'Category', render: (r) => <Badge variant={/income|rental/i.test(r.category) ? 'success' : 'danger'}>{r.category}</Badge> },
                { key: 'amount', label: 'Amount', render: (r) => fmt(r.amount) },
              ]}
              rows={plBudgets}
              empty={<div className="p-8 text-center text-sm text-neutral-slate dark:text-neutral-gray">No budgets configured.</div>}
            />
          </Card>
        </div>
      )}

      {tab === 'monthly' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="Total Income" value={fmt(plMonthly.reduce((s, m) => s + Number(m.income || 0), 0))} icon={TrendingUp} accent="properties" />
            <StatCard title="Total Expenses" value={fmt(plMonthly.reduce((s, m) => s + Number(m.expenses || 0), 0))} icon={TrendingDown} accent="maintenance" />
            <StatCard title="Net Profit" value={fmt(plMonthly.reduce((s, m) => s + Number(m.amount || 0), 0))} icon={Scale} accent="finance" />
          </div>
          <Card title="Monthly P&amp;L" right={<Badge variant="outline">{plMonthly.length}</Badge>}>
            <DataTable
              columns={[
                { key: 'property_id', label: 'Property', render: (r) => propName(r.property_id) },
                { key: 'category', label: 'Category' },
                { key: 'month', label: 'Month', render: (r) => `${r.month} ${r.year}` },
                { key: 'income', label: 'Income', render: (r) => fmt(r.income) },
                { key: 'expenses', label: 'Expenses', render: (r) => fmt(r.expenses) },
                { key: 'amount', label: 'Net', render: (r) => <span className={Number(r.amount) >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{fmt(r.amount)}</span> },
              ]}
              rows={plMonthly}
              empty={<div className="p-8 text-center text-sm text-neutral-slate dark:text-neutral-gray">No monthly figures yet.</div>}
            />
          </Card>
        </div>
      )}

      {tab === 'entries' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              <StatCard title="Income" value={fmt(entrySummary.income)} icon={TrendingUp} accent="properties" />
              <StatCard title="Expenses" value={fmt(entrySummary.expenses)} icon={TrendingDown} accent="maintenance" />
              <StatCard title="Net" value={fmt(entrySummary.net)} icon={Scale} accent="finance" />
            </div>
            <button className="btn-primary self-start" onClick={() => setShowModal(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add Entry
            </button>
          </div>
          <Card title="P&amp;L Entries" right={<Badge variant="outline">{entries.length}</Badge>}>
            <DataTable
              columns={[
                { key: 'date', label: 'Date' },
                { key: 'category', label: 'Type', render: (r) => <Badge variant={r.category === 'Income' ? 'success' : 'danger'}>{r.category}</Badge> },
                { key: 'description', label: 'Description' },
                { key: 'property_id', label: 'Property', render: (r) => propName(r.property_id) },
                { key: 'deducted_expenses', label: 'Exp. Deducted', render: (r) => (r.deducted_expenses ? <Badge variant="warning">Yes</Badge> : <Badge variant="outline">No</Badge>) },
                { key: 'amount', label: 'Amount', render: (r) => fmt(r.amount) },
                {
                  key: 'actions',
                  label: '',
                  render: (r) => (
                    <button
                      onClick={() => { dataStore.remove('plEntries', r.id); toast('Entry removed', 'info'); }}
                      className="text-red-600 hover:underline text-xs"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ),
                },
              ]}
              rows={entries}
              empty={<div className="p-8 text-center text-sm text-neutral-slate dark:text-neutral-gray">No entries yet.</div>}
            />
          </Card>
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add P&amp;L Entry">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">Type</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">Amount (R)</label>
              <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0.00" className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">Description</label>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="e.g. July rent - Rosewood A1" className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">Property</label>
              <select value={form.property_id} onChange={(e) => setForm({ ...form, property_id: e.target.value })} className="input-field">
                <option value="">—</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-slate dark:text-neutral-gray mb-1">Expenses Deducted</label>
              <select value={String(form.deducted_expenses)} onChange={(e) => setForm({ ...form, deducted_expenses: e.target.value === 'true' })} className="input-field">
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button
              className="btn-primary"
              onClick={async () => {
                const entry = {
                  date: new Date().toISOString().slice(0, 10),
                  category: form.category,
                  description: form.description,
                  amount: Number(form.amount) || 0,
                  property_id: form.property_id || null,
                  deducted_expenses: form.deducted_expenses ? 1 : 0,
                };
                dataStore.add('plEntries', entry);
                try {
                  await api.createPLEntry(entry);
                  toast('P&L entry saved');
                } catch {
                  toast('Saved locally (backend unavailable)', 'error');
                }
                setShowModal(false);
                setForm({ category: 'Income', amount: '', description: '', property_id: '', deducted_expenses: false });
              }}
            >
              Save Entry
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
