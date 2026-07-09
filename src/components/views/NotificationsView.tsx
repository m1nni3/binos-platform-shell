import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { useBinos, dataStore } from '../../data/useBinos';
import { toast } from '../../lib/toast';
import { CheckCheck, X } from 'lucide-react';

export function NotificationsView() {
  const { notifications } = useBinos();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Notifications</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Alerts, tasks, payments, and system messages</p>
        </div>
        <button
          className="btn-secondary"
          onClick={() => {
            notifications.forEach((n) => dataStore.update('notifications', n.id, { read: true }));
            toast('All marked as read', 'info');
          }}
          disabled={unread === 0}
        >
          <CheckCheck className="w-4 h-4 mr-2" /> Mark all read
        </button>
      </div>

      <Card>
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">You're all caught up.</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-3 p-4 rounded-2xl border transition-colors ${
                  n.read ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900' : 'border-brand-blue/30 bg-primary-50 dark:bg-primary-950/40'
                }`}
              >
                <div className={`mt-1 h-2 w-2 rounded-full ${n.read ? 'bg-slate-300' : 'bg-brand-blue'} shrink-0`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{n.title}</p>
                    {!n.read && <Badge variant="info">New</Badge>}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{n.description}</p>
                </div>
                <button
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                  onClick={() => {
                    dataStore.remove('notifications', n.id);
                    toast('Notification dismissed', 'info');
                  }}
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
