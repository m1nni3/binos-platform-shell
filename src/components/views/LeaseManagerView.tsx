import { Badge } from '../ui/Badge';
import { InfoCard } from '../ui/InfoCard';
import { useBinos, dataStore } from '../../data/useBinos';
import { toast } from '../../lib/toast';

export function LeaseManagerView() {
  const { leases, tenants, units } = useBinos();

  const tenantName = (id?: string) => tenants.find((t) => t.id === id)?.name ?? id ?? '—';
  const unitLabel = (id?: string) => {
    const u = units.find((x) => x.id === id);
    return u ? `Unit ${u.unit}` : (id ?? '—');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Lease Manager</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Lease lifecycle, renewals, deposits, and terms</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {leases.map((l) => (
          <InfoCard
            key={l.id}
            icon="📄"
            title={tenantName(l.tenantId)}
            badge={<Badge variant={l.status === 'Active' ? 'success' : 'warning'}>{l.status}</Badge>}
            fields={[
              { label: 'Lease', value: l.id.toUpperCase() },
              { label: 'Unit', value: unitLabel(l.unitId) },
              { label: 'Start', value: l.start },
              { label: 'End', value: l.end },
              { label: 'Rent', value: `R${l.rent.toLocaleString()}` },
            ]}
            footer={
              <button
                className="btn-secondary w-full"
                onClick={() => {
                  dataStore.update('units', l.unitId, { status: 'Vacant', occupant: '' });
                  toast('Lease ended — unit marked vacant', 'info');
                }}
              >
                End Lease
              </button>
            }
          />
        ))}
      </div>
    </div>
  );
}
