import { useState } from 'react';
import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { cn } from '../../utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBinos } from '../../data/useBinos';

const TYPE_VARIANT: Record<string, 'info' | 'warning' | 'success' | 'danger'> = {
  Maintenance: 'warning',
  Task: 'info',
  Lease: 'success',
  Inspection: 'danger',
};

export function CalendarView() {
  const { calendarEvents } = useBinos();
  const today = new Date(2026, 6, 9); // portal "today" baseline
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const monthName = cursor.month === today.getMonth() && cursor.year === today.getFullYear()
    ? 'July 2026'
    : new Date(cursor.year, cursor.month, 1).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' });

  // Build a lookup of day-of-month -> events.
  const eventsByDay: Record<number, any[]> = {};
  calendarEvents.forEach((e) => {
    if (!e.date) return;
    const d = new Date(e.date);
    if (d.getFullYear() === cursor.year && d.getMonth() === cursor.month) {
      (eventsByDay[d.getDate()] ||= []).push(e);
    }
  });

  const firstWeekday = new Date(cursor.year, cursor.month, 1).getDay();
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const shift = (delta: number) => {
    const m = cursor.month + delta;
    setCursor({ year: cursor.year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 });
  };

  const sorted = [...calendarEvents].sort((a, b) => String(a.date).localeCompare(String(b.date)));

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
              { key: 'date', label: 'Date' },
              { key: 'title', label: 'Title' },
              { key: 'type', label: 'Type', render: (r) => <Badge variant={TYPE_VARIANT[r.type] || 'info'}>{r.type}</Badge> },
            ]}
            rows={sorted}
            empty={<div className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">No events scheduled.</div>}
          />
        </Card>

        <Card
          title="Month View"
          right={
            <div className="flex items-center gap-1">
              <button onClick={() => shift(-1)} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{monthName}</span>
              <button onClick={() => shift(1)} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"><ChevronRight className="w-4 h-4" /></button>
            </div>
          }
        >
          <div className="grid grid-cols-7 gap-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-slate-600 dark:text-slate-400 p-2">{d}</div>
            ))}
            {cells.map((day, i) => {
              if (day === null) return <div key={i} />;
              const dayEvents = eventsByDay[day] || [];
              const isToday = day === today.getDate() && cursor.month === today.getMonth() && cursor.year === today.getFullYear();
              return (
                <button
                  key={i}
                  className={cn(
                    'aspect-square rounded-lg text-xs font-medium transition-all flex flex-col items-center justify-start pt-1 relative',
                    isToday
                      ? 'bg-brand-blue text-white'
                      : dayEvents.length
                      ? 'bg-primary-50 dark:bg-primary-950 text-slate-900 dark:text-slate-100 hover:ring-2 hover:ring-brand-blue/40'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-primary-50 dark:hover:bg-primary-950'
                  )}
                >
                  {day}
                  {dayEvents.length > 0 && (
                    <span className="mt-0.5 flex gap-0.5">
                      {dayEvents.slice(0, 3).map((_, idx) => (
                        <span key={idx} className={cn('h-1 w-1 rounded-full', isToday ? 'bg-white' : 'bg-brand-blue')} />
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
