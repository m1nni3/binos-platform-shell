import { Card } from '../ui';
import { DataTable } from '../ui/DataTable';
import { Badge } from '../ui/Badge';
import { transactions } from '../../data/mockData';

export function FinancialCentreView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Financial Centre</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Ledgers, reconciliation, statements, and cash flow</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card title="Transactions" right={<Badge variant="outline">Recent</Badge>}>
          <DataTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'type', label: 'Type', render: (r) => <Badge variant={r.type === 'Income' ? 'success' : 'danger'}>{r.type}</Badge> },
              { key: 'category', label: 'Category' },
              { key: 'amount', label: 'Amount', render: (r) => `R${r.amount.toLocaleString()}` },
              { key: 'date', label: 'Date' },
              { key: 'status', label: 'Status', render: (r) => <Badge variant={r.status === 'Cleared' ? 'success' : 'warning'}>{r.status}</Badge> },
            ]}
            rows={transactions}
          />
        </Card>

        <Card title="Outstanding Amounts" right={<span className="text-xs text-slate-500">Summary</span>}>
          <div className="space-y-3">
            {[
              { title: 'Outstanding Rentals', amount: 'R28,500', trend: '-3%' },
              { title: 'Outstanding Levies', amount: 'R14,200', trend: '+1%' },
              { title: 'Outstanding Municipal', amount: 'R6,700', trend: '-2%' },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.title}</div>
                  <div className="text-xs text-slate-500">Last 30 days</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.amount}</div>
                  <div className="text-xs text-slate-500">{item.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
