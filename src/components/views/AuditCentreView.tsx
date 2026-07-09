import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { useBinos } from '../../data/useBinos';

export function AuditCentreView() {
  const { auditLog } = useBinos();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Audit Centre</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Activity logs, user actions, financial changes, and security events</p>
      </div>

      <Card>
        <DataTable
          caption="Audit Log"
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'action', label: 'Action' },
            { key: 'entity', label: 'Entity' },
            { key: 'user', label: 'User' },
            { key: 'timestamp', label: 'Timestamp' },
          ]}
          rows={auditLog}
        />
      </Card>
    </div>
  );
}
