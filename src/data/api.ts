// API client for the binos-api Cloudflare Worker (backed by live binos D1).
const API_BASE = import.meta.env.VITE_API_BASE || 'https://binos-api.dawson-edc.workers.dev';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`Request failed (${res.status}) for ${path}`);
  return res.json();
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed (${res.status}) for ${path}`);
  return res.json() as Promise<T>;
}

export interface PettyCashEntry {
  type: string;
  amount: number;
  description: string;
  category: string;
  property_id: string | null;
  date: string;
}

export interface PLEntry {
  date: string;
  category: string;
  description: string;
  amount: number;
  property_id: string | null;
  deducted_expenses: number;
}

export const api = {
  dashboard: () => get<Record<string, unknown>>('/api/dashboard'),
  properties: () => get<{ items: any[] }>('/api/properties'),
  units: () => get<{ items: any[] }>('/api/units'),
  tenants: () => get<{ items: any[] }>('/api/tenants'),
  contacts: () => get<{ items: any[] }>('/api/contacts'),
  maintenance: () => get<{ items: any[] }>('/api/maintenance'),
  tasks: () => get<{ items: any[] }>('/api/tasks'),
  ledger: () => get<{ items: any[] }>('/api/ledger'),
  pettyCash: async () => {
    // Live worker stores income + expenses under /petty-cash/<type>.
    const [income, expenses] = await Promise.all([
      get<any[]>('/api/petty-cash/income'),
      get<any[]>('/api/petty-cash/expenses'),
    ]);
    return [...income, ...expenses];
  },
  createPettyCash: (entry: PettyCashEntry) =>
    // Worker derives `type` from the URL path; body carries the rest.
    post<{ id: number }>(`/api/petty-cash/${entry.type}`, {
      amount: entry.amount,
      description: entry.description,
      category: entry.category,
      property_id: entry.property_id,
      date: entry.date,
    }),
  pl: () => get<any[]>('/api/pl'),
  plMonthly: () => get<any[]>('/api/pl-monthly'),
  plEntries: () => get<any[]>('/api/pl-entries'),
  createPLEntry: (entry: PLEntry) =>
    post<{ id: number }>('/api/pl-entries', {
      date: entry.date,
      category: entry.category,
      description: entry.description,
      amount: entry.amount,
      property_id: entry.property_id,
      deducted_expenses: entry.deducted_expenses,
    }),
};
