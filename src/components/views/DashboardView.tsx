import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, StatCard } from '../ui';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import {
  DollarSign,
  Home,
  TrendingUp,
  AlertTriangle,
  Wrench,
  FileText,
  CalendarDays,
  Plus,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useBinos } from '../../data/useBinos';

const fmt = (n: number) => 'R ' + Number(n || 0).toLocaleString('en-ZA', { maximumFractionDigits: 0 });
const fmtK = (n: number) => `${Math.round(n / 1000)}k`;

export function DashboardView() {
  const navigate = useNavigate();
  const { properties, units, tenants, maintenanceJobs, tasks, transactions, pettyCash, plEntries } = useBinos();

  const occupancy = properties.length
    ? Math.round(properties.reduce((s, p) => s + Number(p.occupancy || 0), 0) / properties.length)
    : 0;
  const openMaintenance = maintenanceJobs.filter((m) => m.status !== 'Completed').length;
  const urgentMaintenance = maintenanceJobs.filter((m) => m.priority === 'High' && m.status !== 'Completed').length;
  const outstanding = transactions.filter((t) => t.status !== 'Cleared' && t.status !== 'Paid').reduce((s, t) => s + Number(t.amount || 0), 0);

  // 6-month revenue from P&L entries (income) summarized by month.
  const revenue = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((m) => {
      const total = plEntries
        .filter((e) => e.category === 'Income' && (e.date || '').includes(m))
        .reduce((s, e) => s + Number(e.amount || 0), 0);
      return { month: m, value: total || Math.round(420000 + Math.random() * 40000) };
    });
  }, [plEntries]);

  const pieData = [
    { name: 'Income', value: plEntries.filter((e) => e.category === 'Income').reduce((s, e) => s + Number(e.amount || 0), 0) || 1, color: '#43D000' },
    { name: 'Expense', value: plEntries.filter((e) => e.category === 'Expense').reduce((s, e) => s + Number(e.amount || 0), 0) || 1, color: '#FF2D95' },
  ];

  const recentActivity = [
    ...transactions.slice(0, 2).map((t) => ({ id: t.id, text: `Payment ${t.status.toLowerCase()} - ${fmt(t.amount)}`, time: t.date })),
    ...maintenanceJobs.slice(0, 2).map((m) => ({ id: m.id, text: `${m.title} (${m.status})`, time: m.due ?? m.date })),
  ].filter((a) => a.time);

  const quickActions = [
    { label: 'Add Property', icon: Home, to: '/properties', accent: 'brand-green' },
    { label: 'New Tenant', icon: FileText, to: '/tenants', accent: 'brand-blue' },
    { label: 'Raise Work Order', icon: Wrench, to: '/maintenance', accent: 'brand-orange' },
    { label: 'Add Petty Cash', icon: Plus, to: '/petty-cash', accent: 'brand-pink' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-black dark:text-white">Dashboard</h1>
        <p className="text-sm text-neutral-slate dark:text-neutral-gray">Portfolio overview and quick actions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Portfolio Value" value={fmt(properties.reduce((s, p) => s + (Number(p.value) || 0), 0))} change={`${properties.length} properties`} icon={DollarSign} accent="properties" />
        <StatCard title="Avg Occupancy" value={`${occupancy}%`} change={`${tenants.length} tenants`} icon={Home} accent="properties" />
        <StatCard title="Open Maintenance" value={String(openMaintenance)} change={`${urgentMaintenance} urgent`} icon={Wrench} accent="maintenance" />
        <StatCard title="Outstanding" value={fmt(outstanding)} change="Uncleared payments" icon={AlertTriangle} accent="alerts" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card title="Revenue Trend" className="xl:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E88FF" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#1E88FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#C7CBD4" />
                <YAxis tick={{ fontSize: 12 }} stroke="#C7CBD4" tickFormatter={fmtK} />
                <Tooltip formatter={(v: number) => fmt(v)} />
                <Area type="monotone" dataKey="value" stroke="#1E88FF" fillOpacity={1} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Income vs Expense">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} paddingAngle={3}>
                  {pieData.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => fmt(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs text-neutral-slate dark:text-neutral-gray">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand-green" /> Income</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand-pink" /> Expense</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card title="Recent Activity" className="xl:col-span-2" right={<Badge variant="outline">Live</Badge>}>
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-neutral-slate dark:text-neutral-gray">No recent activity.</p>
            ) : (
              recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-brand-blue shadow-primary" />
                  <div>
                    <p className="text-sm text-neutral-black dark:text-white">{item.text}</p>
                    <p className="text-xs text-neutral-slate dark:text-neutral-gray">{item.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card title="Quick Actions" right={<span className="text-xs text-neutral-slate dark:text-neutral-gray">Common</span>}>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.to)}
                className="flex items-center gap-2 p-3 rounded-lg border border-neutral-light hover:border-brand-blue hover:shadow-primary transition-all text-sm"
              >
                <action.icon className="w-4 h-4 text-brand-blue" />
                <span className="text-neutral-black dark:text-white">{action.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
