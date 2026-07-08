import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { InfoCard } from '../ui/InfoCard';
import { contacts } from '../../data/mockData';

const categoryIcon: Record<string, string> = {
  Tenant: '👤',
  Owner: '🏠',
  Contractor: '🔧',
  'Body Corporate': '🏢',
  Emergency: '🚨',
};

export function ContactsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Contacts</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Owners, tenants, contractors, and emergency contacts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {contacts.map((c) => (
          <InfoCard
            key={c.id}
            icon={categoryIcon[c.category] || '👤'}
            title={c.name}
            badge={<Badge variant="info">{c.category}</Badge>}
            fields={[
              { label: 'Email', value: c.email },
              { label: 'Phone', value: c.phone },
            ]}
          />
        ))}
      </div>

      <Card title="Directory note">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing {contacts.length} saved contacts. Use categories to filter owners, tenants, contractors, and emergency numbers.
        </p>
      </Card>
    </div>
  );
}
