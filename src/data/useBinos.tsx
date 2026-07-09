import { createContext, useContext, ReactNode } from 'react';
import { api } from './api';
import { useDataStore, useStoreVersion, dataStore } from '../store/dataStore';

export interface Task {
  id: string;
  title: string;
  due: string;
  status: string;
  priority: string;
  assignee?: string;
}

export interface BinosData {
  dashboard: Record<string, unknown> | null;
  properties: any[];
  units: any[];
  tenants: any[];
  contacts: any[];
  maintenanceJobs: any[];
  tasks: any[];
  transactions: any[];
  leases: any[];
  calendarEvents: any[];
  documents: any[];
  notifications: any[];
  auditLog: any[];
  pettyCash: any[];
  plBudgets: any[];
  plMonthly: any[];
  plEntries: any[];
  loading: boolean;
  error: string | null;
}

const defaultValue: BinosData = {
  dashboard: null,
  properties: [],
  units: [],
  tenants: [],
  contacts: [],
  maintenanceJobs: [],
  tasks: [],
  transactions: [],
  leases: [],
  calendarEvents: [],
  documents: [],
  notifications: [],
  auditLog: [],
  pettyCash: [],
  plBudgets: [],
  plMonthly: [],
  plEntries: [],
  loading: true,
  error: null,
};

const BinosContext = createContext<BinosData>(defaultValue);

function deriveLeases(units: any[]) {
  return units
    .filter((u) => u.occupant)
    .map((u) => ({
      id: u.id,
      unitId: u.unit,
      propertyId: u.propertyId,
      tenant: u.occupant,
      rent: u.rent,
      end: u.leaseEnd,
      status: u.leaseEnd ? 'Active' : 'Open',
    }));
}

// Build the context value from the persisted store + derived calendar events.
function buildData(): BinosData {
  const s = dataStore.getState();
  const calendarEvents = [
    ...s.maintenanceJobs.map((m) => ({ id: `c-m-${m.id}`, title: `${m.title}`, date: m.due ?? m.date ?? '', type: 'Maintenance' })),
    ...s.tasks.map((t) => ({ id: `c-t-${t.id}`, title: t.title, date: t.due ?? '', type: 'Task' })),
    ...s.leases.map((l) => ({ id: `c-l-${l.id}`, title: `Lease end - ${l.tenant}`, date: l.end ?? '', type: 'Lease' })),
  ].filter((e) => e.date);

  return {
    dashboard: null,
    properties: s.properties,
    units: s.units,
    tenants: s.tenants,
    contacts: s.contacts,
    maintenanceJobs: s.maintenanceJobs,
    tasks: s.tasks,
    transactions: s.transactions,
    leases: deriveLeases(s.units),
    calendarEvents,
    documents: s.documents,
    notifications: s.notifications,
    auditLog: s.auditLog,
    pettyCash: s.pettyCash,
    plBudgets: s.plBudgets,
    plMonthly: s.plMonthly,
    plEntries: s.plEntries,
    loading: false,
    error: null,
  };
}

export function DataProvider({ children }: { children: ReactNode }) {
  // Subscribe to store version so context updates on ANY collection change.
  useStoreVersion();
  return <BinosContext.Provider value={buildData()}>{children}</BinosContext.Provider>;
}

export function useBinos() {
  return useContext(BinosContext);
}

// Re-export the store so views can mutate collections directly.
export { dataStore };
