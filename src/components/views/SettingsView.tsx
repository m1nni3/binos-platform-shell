import { Card } from '../ui';
import { useApp } from '../../store/useApp';

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? 'bg-brand-blue' : 'bg-neutral-300 dark:bg-neutral-700'}`}
    >
      <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
    </button>
  );
}

export function SettingsView() {
  const { theme, setTheme, notifications, toggleNotifications, sidebarCollapsed, toggleSidebar } = useApp();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Company, users, roles, themes, and integrations</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card title="Theme">
          <div className="space-y-3">
            <div className="text-sm text-slate-700 dark:text-slate-300">Current theme: <span className="font-medium">{theme}</span></div>
            <div className="flex gap-2">
              <button onClick={() => setTheme('light')} className={theme === 'light' ? 'btn-primary' : 'btn-secondary'}>Light</button>
              <button onClick={() => setTheme('dark')} className={theme === 'dark' ? 'btn-primary' : 'btn-secondary'}>Dark</button>
            </div>
          </div>
        </Card>

        <Card title="Preferences">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Notifications</div>
                <div className="text-xs text-slate-500">Show in-app alerts</div>
              </div>
              <Toggle on={notifications} onClick={toggleNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Collapse sidebar</div>
                <div className="text-xs text-slate-500">Hide the navigation rail</div>
              </div>
              <Toggle on={sidebarCollapsed} onClick={toggleSidebar} />
            </div>
          </div>
        </Card>

        <Card title="Company Information">
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div>Company Name: <span className="font-medium">Binos Property Group</span></div>
            <div>Registration: <span className="font-medium">2026/001234/07</span></div>
            <div>Address: <span className="font-medium">Cape Town, South Africa</span></div>
          </div>
        </Card>
      </div>
    </div>
  );
}
