import { useState } from 'react';
import { ViewType } from '@/types/esms';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardView } from '@/components/views/DashboardView';
import { BulkDataEntryView } from '@/components/views/BulkDataEntryView';
import { ApprovalsView } from '@/components/views/ApprovalsView';
import { ThemeProvider } from '@/contexts/ThemeContext';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'data-entry':
        return <BulkDataEntryView />;
      case 'approvals':
        return <ApprovalsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <ThemeProvider>
      <AppShell currentView={currentView} onViewChange={setCurrentView}>
        {renderView()}
      </AppShell>
    </ThemeProvider>
  );
};

export default Index;
