import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { cn } from '../../utils/cn';
import { calendarEvents } from '../../data/mockData';

export function CalendarView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Calendar</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Inspections, meetings, rent due, and tasks</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card title="Upcoming" className="xl:col-span-2">
          <DataTable
            caption="Events"
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'title', label: 'Title' },
              { key: 'date', label: 'Date' },
              { key: 'type', label: 'Type', render: (r) => <Badge variant="info">{r.type}</Badge> },
            ]}
            rows={calendarEvents}
          />
        </Card>

        <Card title="Month View" right={<span className="text-xs text-slate-500 dark:text-slate-400">July 2026</span>}>
          <div className="grid grid-cols-7 gap-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-slate-600 dark:text-slate-400 p-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => {
              const date = i - 2;
              const isCurrentMonth = date >= 1 && date <= 31;
              return (
                <button
                  key={i}
                  className={cn(
                    'aspect-square rounded-lg text-xs font-medium transition-colors',
                    isCurrentMonth
                      ? 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-primary-50 dark:hover:bg-primary-950'
                      : 'text-slate-400 dark:text-slate-600'
                  )}
                >
                  {isCurrentMonth ? date : ''}
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
