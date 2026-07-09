export const properties = [
  { id: 'p1', name: 'Rosewood Estate', status: 'Active', type: 'Residential', units: 24, occupancy: 92, city: 'Cape Town', province: 'Western Cape' },
  { id: 'p2', name: 'Harbour View Complex', status: 'Active', type: 'Mixed-Use', units: 48, occupancy: 87, city: 'Durban', province: 'KwaZulu-Natal' },
  { id: 'p3', name: 'Maple Grove', status: 'Under Review', type: 'Residential', units: 12, occupancy: 75, city: 'Johannesburg', province: 'Gauteng' },
  { id: 'p4', name: 'Ocean Breeze Villas', status: 'Active', type: 'Residential', units: 8, occupancy: 100, city: 'Cape Town', province: 'Western Cape' },
  { id: 'p5', name: 'Central Park Offices', status: 'Active', type: 'Commercial', units: 16, occupancy: 81, city: 'Johannesburg', province: 'Gauteng' },
];

export const units = [
  { id: 'u1', propertyId: 'p1', unit: 'A1', status: 'Occupied', occupant: 'Thandi M.', rent: 18500, leaseEnd: '2026-12-31' },
  { id: 'u2', propertyId: 'p1', unit: 'A2', status: 'Vacant', occupant: null, rent: 19500, leaseEnd: null },
  { id: 'u3', propertyId: 'p1', unit: 'B1', status: 'Occupied', occupant: 'Johan V.', rent: 21000, leaseEnd: '2026-09-30' },
  { id: 'u4', propertyId: 'p2', unit: '102', status: 'Occupied', occupant: 'Sarah P.', rent: 12500, leaseEnd: '2026-06-30' },
  { id: 'u5', propertyId: 'p2', unit: '204', status: 'Maintenance', occupant: 'Mark R.', rent: 13500, leaseEnd: '2027-01-15' },
];

export const tenants = [
  { id: 't1', name: 'Thandi Mokoena', email: 'thandi@example.com', phone: '072-123-4567', propertyId: 'p1', unitId: 'u1', balance: 0 },
  { id: 't2', name: 'Johan van der Berg', email: 'johan@example.com', phone: '082-765-4321', propertyId: 'p1', unitId: 'u3', balance: 350 },
  { id: 't3', name: 'Sarah Petersen', email: 'sarah@example.com', phone: '071-555-1234', propertyId: 'p2', unitId: 'u4', balance: 0 },
];

export const leases = [
  { id: 'l1', tenantId: 't1', unitId: 'u1', propertyId: 'p1', start: '2025-01-01', end: '2026-12-31', rent: 18500, status: 'Active' },
  { id: 'l2', tenantId: 't2', unitId: 'u3', propertyId: 'p1', start: '2025-04-01', end: '2026-09-30', rent: 21000, status: 'Active' },
  { id: 'l3', tenantId: 't3', unitId: 'u4', propertyId: 'p2', start: '2025-07-01', end: '2026-06-30', rent: 12500, status: 'Active' },
];

export const transactions = [
  { id: 'tx1', propertyId: 'p1', type: 'Income', category: 'Rental', amount: 18500, date: '2026-07-01', status: 'Cleared' },
  { id: 'tx2', propertyId: 'p1', type: 'Expense', category: 'Maintenance', amount: 4200, date: '2026-06-28', status: 'Paid' },
  { id: 'tx3', propertyId: 'p2', type: 'Income', category: 'Rental', amount: 12500, date: '2026-07-02', status: 'Pending' },
  { id: 'tx4', propertyId: 'p1', type: 'Expense', category: 'Municipal', amount: 3400, date: '2026-06-25', status: 'Paid' },
];

export const maintenanceJobs = [
  { id: 'm1', propertyId: 'p1', unitId: 'u3', title: 'Geyser replacement', priority: 'High', status: 'Open', contractor: 'QuickFix Plumbing', due: '2026-07-10' },
  { id: 'm2', propertyId: 'p2', unitId: 'u4', title: 'Garden clean-up', priority: 'Medium', status: 'Scheduled', contractor: 'GreenScapes', due: '2026-07-12' },
  { id: 'm3', propertyId: 'p1', unitId: 'u1', title: 'Leaking tap', priority: 'Low', status: 'Completed', contractor: 'QuickFix Plumbing', due: '2026-06-20' },
];

export const tasks = [
  { id: 'ta1', title: 'Review Q2 financials', assignee: 'You', due: '2026-07-09', status: 'In Progress', priority: 'High' },
  { id: 'ta2', title: 'Follow up lease renewal', assignee: 'Lerato K.', due: '2026-07-11', status: 'Todo', priority: 'Medium' },
  { id: 'ta3', title: 'Prepare board pack', assignee: 'You', due: '2026-07-14', status: 'Todo', priority: 'High' },
];

export const calendarEvents = [
  { id: 'c1', title: 'Inspection - Rosewood A1', date: '2026-07-09', type: 'Inspection' },
  { id: 'c2', title: 'Lease expiry - Sarah P.', date: '2026-06-30', type: 'Lease' },
  { id: 'c3', title: 'Board Meeting', date: '2026-07-15', type: 'Meeting' },
];

export const documents = [
  { id: 'd1', name: 'Lease - A1.pdf', type: 'Lease', propertyId: 'p1', date: '2026-01-01', size: '1.2 MB' },
  { id: 'd2', name: 'Insurance Policy.pdf', type: 'Insurance', propertyId: 'p1', date: '2025-06-15', size: '3.4 MB' },
  { id: 'd3', name: 'Financials Q1.pdf', type: 'Financial', propertyId: 'p1', date: '2026-04-30', size: '2.1 MB' },
];

export const contacts = [
  { id: 'ct1', name: 'Thandi Mokoena', category: 'Tenant', email: 'thandi@example.com', phone: '072-123-4567' },
  { id: 'ct2', name: 'QuickFix Plumbing', category: 'Contractor', email: 'info@quickfix.example', phone: '021-555-0123' },
  { id: 'ct3', name: 'Body Corporate', category: 'Body Corporate', email: 'bc@rosewood.example', phone: '021-777-8899' },
];

export const notifications = [
  { id: 'n1', title: 'Lease expiring soon', description: 'Sarah Petersen lease expires on 2026-06-30.', read: false },
  { id: 'n2', title: 'Maintenance overdue', description: 'Geyser replacement is past target start.', read: false },
  { id: 'n3', title: 'Payment received', description: 'R18,500 rental payment received.', read: true },
];

export const auditLog = [
  { id: 'a1', action: 'Lease Updated', entity: 'Lease l1', user: 'Lerato K.', timestamp: '2026-07-08 09:12' },
  { id: 'a2', action: 'Payment Created', entity: 'Transaction tx1', user: 'You', timestamp: '2026-07-08 08:45' },
  { id: 'a3', action: 'Document Uploaded', entity: 'Document d1', user: 'You', timestamp: '2026-07-07 16:20' },
];

// Fallback data for the Petty Cash and Profit & Loss modules carried over from the
// older Binos Prop portal (audit/verify). Used when the live API returns nothing.
export const pettyCash = [
  { id: 'pc1', type: 'income', amount: 1200, description: 'Tenant parking fee', property_id: 'p1', date: '2026-07-03', category: 'Fees' },
  { id: 'pc2', type: 'expenses', amount: 340, description: 'Cleaning supplies', property_id: 'p1', date: '2026-07-05', category: 'Supplies' },
  { id: 'pc3', type: 'expenses', amount: 890, description: 'Garden service', property_id: 'p2', date: '2026-07-06', category: 'Maintenance' },
  { id: 'pc4', type: 'income', amount: 540, description: 'Laundry refund reclaim', property_id: 'p2', date: '2026-07-07', category: 'Fees' },
];

export const plBudgets = [
  { id: 'plb1', property_id: 'p1', category: 'Rental Income', amount: 222000 },
  { id: 'plb2', property_id: 'p1', category: 'Operating Expenses', amount: 96000 },
  { id: 'plb3', property_id: 'p2', category: 'Rental Income', amount: 576000 },
  { id: 'plb4', property_id: 'p2', category: 'Operating Expenses', amount: 210000 },
];

export const plMonthly = [
  { id: 'plm1', property_id: 'p1', category: 'Net', month: '2026-05', year: 2026, income: 18500, expenses: 7800, amount: 10700 },
  { id: 'plm2', property_id: 'p1', category: 'Net', month: '2026-06', year: 2026, income: 18500, expenses: 8200, amount: 10300 },
  { id: 'plm3', property_id: 'p2', category: 'Net', month: '2026-05', year: 2026, income: 48000, expenses: 17500, amount: 30500 },
  { id: 'plm4', property_id: 'p2', category: 'Net', month: '2026-06', year: 2026, income: 48000, expenses: 19000, amount: 29000 },
];

export const plEntries = [
  { id: 'ple1', date: '2026-07-01', category: 'Income', description: 'July rent - Rosewood A1', amount: 18500, property_id: 'p1', deducted_expenses: 0 },
  { id: 'ple2', date: '2026-07-02', category: 'Expense', description: 'Municipal rates', amount: 3400, property_id: 'p1', deducted_expenses: 1 },
  { id: 'ple3', date: '2026-07-03', category: 'Income', description: 'July rent - Harbour 102', amount: 12500, property_id: 'p2', deducted_expenses: 0 },
  { id: 'ple4', date: '2026-07-05', category: 'Expense', description: 'Geyser repair', amount: 4200, property_id: 'p1', deduced_expenses: 0, deducted_expenses: 1 },
];
