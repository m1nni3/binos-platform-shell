import { Bell, Moon, Sun, Command, Settings } from 'lucide-react';
import { useApp } from '../../store/useApp';
import { useNavigate } from 'react-router-dom';

export function TopNav() {
  const { theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200/60 dark:border-slate-800 sticky top-0 z-40">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/settings')}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs">
            <Command className="w-3 h-3" />
            <span>Quick Actions</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
