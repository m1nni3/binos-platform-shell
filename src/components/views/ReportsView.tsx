import { useMemo, useState } from 'react';
import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { FileDown, Printer } from 'lucide-react';
import { useBinos } from '../../data/useBinos';
import { toast } from '../../lib/toast';

const fmt = (n: number) => 'R ' + Number(n || 0).toLocaleString('en-ZA', { maximumFractionDigits: 0 });

type ReportKey = 'financial' | 'occupancy' | 'maintenance' | 'portfolio';

const REPORTS: { key: ReportKey; title: string; desc: string }[] = [
  { key: 'financial', title: 'Financial Report', desc: 'Income vs expenses, balances, and arrears by property.' },
  { key: 'occupancy', title: 'Occupancy Report', desc: 'Occupancy and vacancy rates across the portfolio.' },
  { key: 'maintenance', title: 'Maintenance Report', desc: 'Open, scheduled, and completed work orders with spend.' },
  { key: 'portfolio', title: 'Portfolio Report', desc: 'Per-property summary of units, value, and status.' },
];

export function ReportsView() {
  const { properties, units, tenants, transactions, maintenanceJobs, plEntries } = useBinos();
  const [active, setActive] = useState<ReportKey>('financial');
  const [filter, setFilter] = useState('');

  const rows = useMemo(() => {
    if (active === 'financial') {
      const byProp = new Map<string, { name: string; income: number; expense: number; balance: number }>();
      properties.forEach((p) => byProp.set(String(p.id), { name: p.name, income: 0, expense: 0, balance: 0 }));
      plEntries.forEach((e) => {
        const key = String(e.property_id);
        const row = byProp.get(key);
        if (row) {
          if (e.category === 'Income') row.income += Number(e.amount || 0);
          else row.expense += Number(e.amount || 0);
        }
      });
      return [...byProp.values()].map((r) => ({ ...r, balance: r.income - r.expense }));
    }
    if (active === 'occupancy') {
      return properties.map((p) => {
        const u = units.filter((x) => x.propertyId === p.id);
        const occ = u.filter((x) => x.status === 'Occupied').length;
        return {
          name: p.name,
          units: u.length,
          occupied: occ,
          vacant: u.length - occ,
          rate: u.length ? Math.round((occ / u.length) * 100) : 0,
        };
      });
    }
    if (active === 'maintenance') {
      return maintenanceJobs.map((m) => ({
        name: m.title,
        status: m.status,
        priority: m.priority,
        contractor: m.contractor || '—',
        due: m.due || '—',
      }));
    }
    return properties.map((p) => ({
      name: p.name,
      type: p.type,
      status: p.status,
      units: p.units,
      value: p.value,
    }));
  }, [active, properties, units, plEntries, maintenanceJobs]);

  const filtered = rows.filter((r) => JSON.stringify(r).toLowerCase().includes(filter.toLowerCase()));

  const columns = useMemo(() => {
    if (active === 'financial') return [
      { key: 'name', label: 'Property' },
      { key: 'income', label: 'Income', render: (r: any) => fmt(r.income) },
      { key: 'expense', label: 'Expense', render: (r: any) => fmt(r.expense) },
      { key: 'balance', label: 'Balance', render: (r: any) => <span className={r.balance >= 0 ? 'text-green-600' : 'text-red-600'}>{fmt(r.balance)}</span> },
    ];
    if (active === 'occupancy') return [
      { key: 'name', label: 'Property' },
      { key: 'units', label: 'Units' },
      { key: 'occupied', label: 'Occupied' },
      { key: 'vacant', label: 'Vacant' },
      { key: 'rate', label: 'Rate', render: (r: any) => <Badge variant={r.rate >= 80 ? 'success' : r.rate >= 50 ? 'warning' : 'danger'}>{r.rate}%</Badge> },
    ];
    if (active === 'maintenance') return [
      { key: 'name', label: 'Work Order' },
      { key: 'status', label: 'Status', render: (r: any) => <Badge variant="info">{r.status}</Badge> },
      { key: 'priority', label: 'Priority', render: (r: any) => <Badge variant={r.priority === 'High' ? 'danger' : 'warning'}>{r.priority}</Badge> },
      { key: 'contractor', label: 'Contractor' },
      { key: 'due', label: 'Due' },
    ];
    return [
      { key: 'name', label: 'Property' },
      { key: 'type', label: 'Type' },
      { key: 'status', label: 'Status', render: (r: any) => <Badge variant="success">{r.status}</Badge> },
      { key: 'units', label: 'Units' },
      { key: 'value', label: 'Value', render: (r: any) => fmt(r.value) },
    ];
  }, [active]);

  const exportCsv = () => {
    const headers = columns.map((c) => c.label);
    const body = filtered.map((r) => columns.map((c) => String((r as any)[c.key] ?? '')).join(','));
    const csv = [headers.join(','), ...body].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${active}-report.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Report exported');
  };

  const current = REPORTS.find((r) => r.key === active)!;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Reports</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Generate live reports from your portfolio data</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary" onClick={exportCsv}><FileDown className="w-4 h-4 mr-2" /> Export CSV</button>
          <button className="btn-secondary" onClick={() => window.print()}><Printer className="w-4 h-4 mr-2" /> Print</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {REPORTS.map((r) => (
          <button
            key={r.key}
            onClick={() => setActive(r.key)}
            className={`text-left ${active === r.key ? 'ring-2 ring-brand-blue rounded-2xl' : ''}`}
          >
            <Card title={r.title} className="hover:-translate-y-0.5 transition-transform">
              <p className="text-sm text-slate-500 dark:text-slate-400">{r.desc}</p>
            </Card>
          </button>
        ))}
      </div>

      <Card title={current.title} right={<Badge variant="outline">{filtered.length} rows</Badge>}>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter report..."
          className="input-field mb-4 max-w-xs"
        />
        <DataTable columns={columns as any} rows={filtered as any} empty={<div className="p-8 text-center text-sm text-slate-500">No data.</div>} />
      </Card>
    </div>
  );
}
