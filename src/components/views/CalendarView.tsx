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

        <Card title="Month View" right={<span className="text-xs text-slate-500">July 2026</span>}>
          <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const hasEvent = [9, 15, 30].includes(day);
              return (
                <div
                  key={day}
                  className={cn('py-2 rounded-xl text-sm', hasEvent ? 'bg-primary-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200')}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
