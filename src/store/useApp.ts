import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

export interface AppState {
  theme: Theme;
  sidebarCollapsed: boolean;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  toggleSidebar: () => void;
}

export const useApp = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      sidebarCollapsed: false,
      toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    { name: 'binos-shell-state' }
  )
);
