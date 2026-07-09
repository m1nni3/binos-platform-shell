// Persisted, in-memory single source of truth for all portal collections.
// Seeds from mock data on first load, then writes through to localStorage so
// user edits (add / update / delete) survive reloads — making the portal
// genuinely "live" and interactive.

import * as mock from '../data/mockData';

const STORAGE_KEY = 'binos-portal-data-v1';

export interface CollectionState {
  properties: any[];
  units: any[];
  tenants: any[];
  contacts: any[];
  maintenanceJobs: any[];
  tasks: any[];
  transactions: any[];
  leases: any[];
  documents: any[];
  notifications: any[];
  auditLog: any[];
  pettyCash: any[];
  plBudgets: any[];
  plMonthly: any[];
  plEntries: any[];
}

function seed(): CollectionState {
  return {
    properties: mock.properties,
    units: mock.units,
    tenants: mock.tenants,
    contacts: mock.contacts,
    maintenanceJobs: mock.maintenanceJobs,
    tasks: mock.tasks,
    transactions: mock.transactions,
    leases: mock.leases,
    documents: mock.documents,
    notifications: mock.notifications,
    auditLog: mock.auditLog,
    pettyCash: mock.pettyCash,
    plBudgets: mock.plBudgets,
    plMonthly: mock.plMonthly,
    plEntries: mock.plEntries,
  };
}

function load(): CollectionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...seed(), ...JSON.parse(raw) };
  } catch {
    /* ignore corrupt storage */
  }
  return seed();
}

let state: CollectionState = load();
const listeners = new Set<(s: CollectionState) => void>();
let version = 0;

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage may be unavailable; in-memory still works */
  }
}

function emit() {
  version++;
  persist();
  listeners.forEach((l) => l(state));
}

export const dataStore = {
  getState: () => state,
  subscribe(fn: (s: CollectionState) => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  // Mutate one collection by replacing it entirely.
  set<K extends keyof CollectionState>(key: K, value: CollectionState[K]) {
    state = { ...state, [key]: value };
    emit();
  },
  // Append an item to a collection (auto-generates an id if missing).
  add<K extends keyof CollectionState>(key: K, item: any) {
    const id = item.id ?? `${key}-${Date.now()}`;
    const next = { ...item, id };
    (state[key] as any[]).unshift(next);
    emit();
    return next;
  },
  update<K extends keyof CollectionState>(key: K, id: string, patch: Record<string, any>) {
    state = {
      ...state,
      [key]: (state[key] as any[]).map((r) => (String(r.id) === String(id) ? { ...r, ...patch } : r)),
    };
    emit();
  },
  remove<K extends keyof CollectionState>(key: K, id: string) {
    state = {
      ...state,
      [key]: (state[key] as any[]).filter((r) => String(r.id) !== String(id)),
    };
    emit();
  },
  reset() {
    state = seed();
    emit();
  },
};

// React hook so components re-render on any store change.
import { useSyncExternalStore } from 'react';

export function useDataStore<K extends keyof CollectionState>(key: K): CollectionState[K] {
  return useSyncExternalStore(
    (cb) => dataStore.subscribe(cb),
    () => state[key],
    () => state[key]
  );
}

// Subscribes to the whole store and returns a monotonically increasing version
// so consumers re-render on ANY collection change.
export function useStoreVersion(): number {
  return useSyncExternalStore(
    (cb) => dataStore.subscribe(cb),
    () => version,
    () => version
  );
}
