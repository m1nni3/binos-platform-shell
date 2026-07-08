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
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, accent: 'brand-blue' },
  { to: '/properties', label: 'Property Centre', icon: Home, accent: 'brand-green' },
  { to: '/units', label: 'Unit Manager', icon: Boxes, accent: 'brand-green' },
  { to: '/tenants', label: 'Tenant Centre', icon: Users, accent: 'accent-teal' },
  { to: '/leases', label: 'Lease Manager', icon: FileText, accent: 'brand-blue' },
  { to: '/financials', label: 'Financial Centre', icon: Wallet, accent: 'brand-blue' },
  { to: '/maintenance', label: 'Maintenance', icon: Wrench, accent: 'brand-orange' },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare2, accent: 'accent-yellow' },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays, accent: 'brand-blue' },
  { to: '/documents', label: 'Documents', icon: FolderOpen, accent: 'accent-indigo' },
  { to: '/contacts', label: 'Contacts', icon: Contact2, accent: 'accent-teal' },
  { to: '/reports', label: 'Reports', icon: BarChart3, accent: 'brand-purple' },
  { to: '/notifications', label: 'Notifications', icon: Bell, accent: 'brand-pink' },
  { to: '/audit', label: 'Audit Centre', icon: Shield, accent: 'brand-purple' },
  { to: '/settings', label: 'Settings', icon: Settings2, accent: 'neutral-gray' },
];

const accentColorMap: Record<string, string> = {
  'brand-blue': '#1E88FF',
  'brand-green': '#43D000',
  'brand-orange': '#FF8A00',
  'brand-pink': '#FF2D95',
  'brand-purple': '#7A2CFF',
  'accent-teal': '#00BFA5',
  'accent-indigo': '#4B5BFF',
  'accent-yellow': '#FFD600',
  'neutral-gray': '#8A909C',
};

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useApp();

  return (
    <aside
      className={cn(
        'sidebar border-r border-neutral-800',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-neutral-800">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-blue text-white flex items-center justify-center text-sm font-bold shadow-primary">B</div>
            <span className="text-sm font-semibold text-white">Binos</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className={cn('w-4 h-4 transition-transform', sidebarCollapsed && 'rotate-180')} />
        </button>
      </div>

      <div className="px-3 py-3">
        {!sidebarCollapsed ? (
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/50" />
            <input
              placeholder="Search"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/10 text-sm outline-none focus:ring-2 focus:ring-brand-blue/50 text-white placeholder:text-white/40"
            />
          </div>
        ) : (
          <button className="w-full flex justify-center p-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/15 transition-colors">
            <Search className="w-4 h-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 space-y-1 scrollbar-thin">
        {nav.map((item) => {
          const accent = accentColorMap[item.accent] || '#1E88FF';
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn('sidebar-link', isActive && 'active')
              }
              style={
                ({ isActive }: { isActive: boolean }) =>
                  isActive ? { borderLeftColor: accent } : undefined
              }
              title={sidebarCollapsed ? item.label : undefined}
            >
              <item.icon className="w-4 h-4" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold text-white">
            JD
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <div className="text-sm font-medium text-white truncate">John Doe</div>
              <div className="text-xs text-white/60 truncate">Portfolio Manager</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
