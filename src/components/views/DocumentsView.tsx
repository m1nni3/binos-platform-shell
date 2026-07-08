import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { documents } from '../../data/mockData';

export function DocumentsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Documents</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Folders, previews, version history, and tags</p>
      </div>

      <Card>
        <DataTable
          caption="Documents"
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'type', label: 'Type', render: (r) => <Badge variant="default">{r.type}</Badge> },
            { key: 'size', label: 'Size' },
            { key: 'date', label: 'Date' },
          ]}
          rows={documents}
        />
      </Card>
    </div>
  );
}
