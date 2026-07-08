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
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const revenue = [
  { month: 'Jan', value: 420000 },
  { month: 'Feb', value: 435000 },
  { month: 'Mar', value: 410000 },
  { month: 'Apr', value: 445000 },
  { month: 'May', value: 460000 },
  { month: 'Jun', value: 450000 },
];

const recentActivity = [
  { id: 1, text: 'Lease signed for unit A1', time: '2 hours ago' },
  { id: 2, text: 'Maintenance job #293 completed', time: '4 hours ago' },
  { id: 3, text: 'Payment received - R18,500', time: 'Yesterday' },
  { id: 4, text: 'New tenant onboarding started', time: 'Yesterday' },
];

export function DashboardView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Portfolio overview and quick actions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Portfolio Revenue" value="R450,000" change="+2.4% vs last month" icon={DollarSign} accent="emerald" />
        <StatCard title="Properties" value="5" change="92% occupancy" icon={Home} accent="primary" />
        <StatCard title="Open Maintenance" value="12" change="3 urgent" icon={Wrench} accent="amber" />
        <StatCard title="Outstanding Levies" value="R24,500" change="Across 6 units" icon={AlertTriangle} accent="rose" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card title="Revenue Trend" className="xl:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5b6bf0" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#5b6bf0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#5b6bf0" fillOpacity={1} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Recent Activity" right={<Badge variant="outline">Today</Badge>}>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary-500" />
                <div>
                  <p className="text-sm text-slate-800 dark:text-slate-200">{item.text}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card title="Expiring Leases" className="xl:col-span-2">
          <DataTable
            caption="Next 90 days"
            columns={[
              { key: 'tenant', label: 'Tenant' },
              { key: 'unit', label: 'Unit' },
              { key: 'end', label: 'Expiry' },
              { key: 'status', label: 'Status', render: (r) => <Badge variant="warning">{r.status}</Badge> },
            ]}
            rows={[
              { tenant: 'Sarah Petersen', unit: 'Harbour 204', end: '2026-06-30', status: 'Expiring' },
              { tenant: 'Johan van der Berg', unit: 'Rosewood B1', end: '2026-09-30', status: 'On Track' },
            ]}
            empty={
              <div className="px-4 py-8 text-center text-sm text-slate-500">No leases expiring soon.</div>
            }
          />
        </Card>

        <Card title="Quick Actions" right={<span className="text-xs text-slate-500">Common</span>}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'New Lease', icon: FileText },
              { label: 'Add Property', icon: Home },
              { label: 'Schedule Inspection', icon: CalendarDays },
              { label: 'Raise Work Order', icon: Wrench },
            ].map((action) => (
              <button
                key={action.label}
                className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm"
              >
                <action.icon className="w-4 h-4 text-primary-600" />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
