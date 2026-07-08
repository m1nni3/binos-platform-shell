import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { tasks } from '../../data/mockData';

const priorityVariant: Record<string, 'danger' | 'warning' | 'success'> = {
  High: 'danger',
  Medium: 'warning',
  Low: 'success',
};

export function TaskCentreView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Task Centre</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Personal, team, and overdue task management</p>
      </div>

      <Card>
        <DataTable
          caption="Tasks"
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'title', label: 'Title' },
            { key: 'assignee', label: 'Assignee' },
            { key: 'due', label: 'Due' },
            { key: 'priority', label: 'Priority', render: (r) => <Badge variant={priorityVariant[r.priority] || 'default'}>{r.priority}</Badge> },
            { key: 'status', label: 'Status', render: (r) => <Badge variant={r.status === 'Todo' ? 'default' : 'info'}>{r.status}</Badge> },
          ]}
          rows={tasks}
        />
      </Card>
    </div>
  );
}
