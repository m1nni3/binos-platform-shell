import { Card } from '../ui';

export function ReportsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Reports</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Portfolio, financial, maintenance, and custom reports</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {[
          'Portfolio Report',
          'Financial Report',
          'Maintenance Report',
          'Occupancy Report',
          'Vacancy Report',
          'Rental Report',
        ].map((report) => (
          <Card key={report} title={report} className="hover:-translate-y-0.5 transition-transform">
            <p className="text-sm text-slate-500 dark:text-slate-400">Generated report placeholder for {report.toLowerCase()}.</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
