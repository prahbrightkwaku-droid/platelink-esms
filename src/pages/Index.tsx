import { useState } from 'react';
import { ViewType } from '@/types/esms';
import { AppShell } from '@/components/layout/AppShell';
import { DataLogView } from '@/components/views/DataLogView';
import { EntryFormView } from '@/components/views/EntryFormView';
import { DashboardView } from '@/components/views/DashboardView';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('data-log');

  const renderView = () => {
    switch (currentView) {
      case 'data-log':
        return <DataLogView />;
      case 'entry-form':
        return <EntryFormView />;
      case 'dashboard':
        return <DashboardView />;
      default:
        return <DataLogView />;
    }
  };

  return (
    <AppShell currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </AppShell>
  );
};

export default Index;
