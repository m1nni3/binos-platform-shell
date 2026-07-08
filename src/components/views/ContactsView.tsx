import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { contacts } from '../../data/mockData';

export function ContactsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Contacts</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Owners, tenants, contractors, and emergency contacts</p>
      </div>

      <Card>
        <DataTable
          caption="Contacts"
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'category', label: 'Category', render: (r) => <Badge variant="info">{r.category}</Badge> },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
          ]}
          rows={contacts}
        />
      </Card>
    </div>
  );
}
