import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { notifications } from '../../data/mockData';

export function NotificationsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Notifications</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Alerts, tasks, payments, and system messages</p>
      </div>

      <Card>
        <DataTable
          caption="Notifications"
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'title', label: 'Title' },
            { key: 'description', label: 'Description' },
            { key: 'read', label: 'Status', render: (r) => <Badge variant={r.read ? 'success' : 'warning'}>{r.read ? 'Read' : 'Unread'}</Badge> },
          ]}
          rows={notifications}
        />
      </Card>
    </div>
  );
}
