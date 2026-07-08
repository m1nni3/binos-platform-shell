import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useApp } from '../../store/useApp';
import {
  LayoutDashboard,
  Home,
  Boxes,
  Users,
  FileText,
  Wallet,
  Wrench,
  CheckSquare2,
  CalendarDays,
  FolderOpen,
  Contact2,
  BarChart3,
  Bell,
  Shield,
  Settings2,
  Search,
  ChevronLeft,
} from 'lucide-react';

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/properties', label: 'Property Centre', icon: Home },
  { to: '/units', label: 'Unit Manager', icon: Boxes },
  { to: '/tenants', label: 'Tenant Centre', icon: Users },
  { to: '/leases', label: 'Lease Manager', icon: FileText },
  { to: '/financials', label: 'Financial Centre', icon: Wallet },
  { to: '/maintenance', label: 'Maintenance', icon: Wrench },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare2 },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/documents', label: 'Documents', icon: FolderOpen },
  { to: '/contacts', label: 'Contacts', icon: Contact2 },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/audit', label: 'Audit Centre', icon: Shield },
  { to: '/settings', label: 'Settings', icon: Settings2 },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useApp();

  return (
    <aside
      className={cn(
        'h-screen sticky top-0 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-200',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-primary-600 text-white flex items-center justify-center text-sm font-bold shadow-primary dark:shadow-primary-dark">B</div>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Binos</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft className={cn('w-4 h-4 transition-transform', sidebarCollapsed && 'rotate-180')} />
        </button>
      </div>

      <div className="px-2 py-3">
        {!sidebarCollapsed ? (
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              placeholder="Search"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>
        ) : (
          <button className="w-full flex justify-center p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Search className="w-4 h-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 space-y-1 scrollbar-thin">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn('sidebar-link', isActive && 'active')
            }
            title={sidebarCollapsed ? item.label : undefined}
          >
            <item.icon className="w-4 h-4" />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-semibold text-slate-600 dark:text-slate-400">
            JD
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">John Doe</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">Portfolio Manager</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
