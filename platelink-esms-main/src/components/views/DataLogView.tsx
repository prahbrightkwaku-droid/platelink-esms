import { useState, useMemo } from 'react';
import { OperationalDataEntry } from '@/types/esms';
import { mockOperationalData } from '@/data/mockData';
import { DataTable } from './DataTable';
import { DataCards } from './DataCards';
import { DataFilters } from './DataFilters';
import { useToast } from '@/hooks/use-toast';
import { LayoutGrid, Table } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DataLogView() {
  const [data] = useState<OperationalDataEntry[]>(mockOperationalData);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    site: 'all',
  });
  const { toast } = useToast();

  const filteredData = useMemo(() => {
    return data.filter((entry) => {
      const matchesSearch =
        filters.search === '' ||
        entry.siteName.toLowerCase().includes(filters.search.toLowerCase()) ||
        entry.indicator.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === 'all' || entry.status === filters.status;

      const matchesSite =
        filters.site === 'all' || entry.siteName === filters.site;

      return matchesSearch && matchesStatus && matchesSite;
    });
  }, [data, filters]);

  const handleApprove = (entry: OperationalDataEntry) => {
    const payload = {
      action: 'approve',
      entryId: entry.id,
      timestamp: new Date().toISOString(),
    };
    console.log('OnSelect Event - Approve:', payload);
    toast({
      title: 'Approval Submitted',
      description: `Entry ${entry.id} has been approved.`,
    });
  };

  const handleReject = (entry: OperationalDataEntry) => {
    const payload = {
      action: 'reject',
      entryId: entry.id,
      timestamp: new Date().toISOString(),
    };
    console.log('OnSelect Event - Reject:', payload);
    toast({
      title: 'Entry Rejected',
      description: `Entry ${entry.id} has been rejected.`,
      variant: 'destructive',
    });
  };

  const handleEdit = (entry: OperationalDataEntry) => {
    const payload = {
      action: 'edit',
      entryId: entry.id,
      timestamp: new Date().toISOString(),
    };
    console.log('OnSelect Event - Edit:', payload);
    toast({
      title: 'Edit Mode',
      description: `Opening entry ${entry.id} for editing.`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Header with filters and view toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <DataFilters
          filters={filters}
          onFiltersChange={setFilters}
        />
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
            className="gap-2"
          >
            <Table className="h-4 w-4" />
            <span className="hidden sm:inline">Table</span>
          </Button>
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
            className="gap-2"
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Cards</span>
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredData.length} of {data.length} entries
      </div>

      {/* Data display */}
      {viewMode === 'table' ? (
        <DataTable
          data={filteredData}
          onApprove={handleApprove}
          onReject={handleReject}
          onEdit={handleEdit}
        />
      ) : (
        <DataCards
          data={filteredData}
          onApprove={handleApprove}
          onReject={handleReject}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
