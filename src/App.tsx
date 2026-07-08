import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { DashboardView } from './components/views/DashboardView';
import { PropertyCentreView } from './components/views/PropertyCentreView';
import { UnitManagerView } from './components/views/UnitManagerView';
import { TenantCentreView } from './components/views/TenantCentreView';
import { LeaseManagerView } from './components/views/LeaseManagerView';
import { FinancialCentreView } from './components/views/FinancialCentreView';
import { MaintenanceCentreView } from './components/views/MaintenanceCentreView';
import { TaskCentreView } from './components/views/TaskCentreView';
import { CalendarView } from './components/views/CalendarView';
import { DocumentsView } from './components/views/DocumentsView';
import { ContactsView } from './components/views/ContactsView';
import { ReportsView } from './components/views/ReportsView';
import { NotificationsView } from './components/views/NotificationsView';
import { AuditCentreView } from './components/views/AuditCentreView';
import { SettingsView } from './components/views/SettingsView';
import { useApp } from './store/useApp';
import { useEffect } from 'react';

function ThemeSync() {
  const { theme } = useApp();
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  return null;
}

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <ThemeSync />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <TopNav />
          <div className="p-6">
            <Routes>
              <Route path="/" element={<DashboardView />} />
              <Route path="/properties" element={<PropertyCentreView />} />
              <Route path="/units" element={<UnitManagerView />} />
              <Route path="/tenants" element={<TenantCentreView />} />
              <Route path="/leases" element={<LeaseManagerView />} />
              <Route path="/financials" element={<FinancialCentreView />} />
              <Route path="/maintenance" element={<MaintenanceCentreView />} />
              <Route path="/tasks" element={<TaskCentreView />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/documents" element={<DocumentsView />} />
              <Route path="/contacts" element={<ContactsView />} />
              <Route path="/reports" element={<ReportsView />} />
              <Route path="/notifications" element={<NotificationsView />} />
              <Route path="/audit" element={<AuditCentreView />} />
              <Route path="/settings" element={<SettingsView />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
