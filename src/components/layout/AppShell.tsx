import { useState } from 'react';
import { ViewType } from '@/types/esms';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { mockUser } from '@/data/mockData';

interface AppShellProps {
  children: React.ReactNode;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function AppShell({ children, currentView, onViewChange }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-full w-full overflow-hidden">
      <Sidebar
        currentView={currentView}
        onViewChange={onViewChange}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex flex-1 flex-col min-w-0">
        <Header 
          user={mockUser} 
          currentView={currentView}
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
