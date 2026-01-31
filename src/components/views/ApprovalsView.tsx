import { useState } from 'react';
import { OperationalDataEntry } from '@/types/esms';
import { mockOperationalData } from '@/data/mockData';
import { StatusBadge } from '@/components/workflow/StatusBadge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Eye, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ApprovalsView() {
  const [data] = useState<OperationalDataEntry[]>(
    mockOperationalData.filter(d => 
      d.status === 'pending_superintendent' || d.status === 'superintendent_approved'
    )
  );
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  const filteredData = data.filter(entry => 
    statusFilter === 'all' || entry.status === statusFilter
  );

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(filteredData.map(d => d.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleBulkApprove = () => {
    const payload = {
      action: 'bulk_approve',
      entryIds: Array.from(selectedRows),
      timestamp: new Date().toISOString(),
    };
    console.log('OnSelect Event - Bulk Approve:', JSON.stringify(payload, null, 2));
    toast({
      title: 'Entries Approved',
      description: `${selectedRows.size} entries have been approved.`,
    });
    setSelectedRows(new Set());
  };

  const handleBulkReject = () => {
    const payload = {
      action: 'bulk_reject',
      entryIds: Array.from(selectedRows),
      timestamp: new Date().toISOString(),
    };
    console.log('OnSelect Event - Bulk Reject:', JSON.stringify(payload, null, 2));
    toast({
      title: 'Entries Rejected',
      description: `${selectedRows.size} entries have been rejected.`,
      variant: 'destructive',
    });
    setSelectedRows(new Set());
  };

  const allSelected = filteredData.length > 0 && selectedRows.size === filteredData.length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Pending Approvals</h2>
          <p className="text-sm text-muted-foreground">Review and approve submitted entries</p>
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pending</SelectItem>
              <SelectItem value="pending_superintendent">Pending Review</SelectItem>
              <SelectItem value="superintendent_approved">Supt. Approved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedRows.size > 0 && (
        <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <span className="text-sm font-medium text-foreground">
            {selectedRows.size} item(s) selected
          </span>
          <div className="flex gap-2 ml-auto">
            <Button size="sm" variant="outline" onClick={handleBulkReject}>
              <X className="h-4 w-4 mr-2" />
              Reject Selected
            </Button>
            <Button size="sm" onClick={handleBulkApprove}>
              <Check className="h-4 w-4 mr-2" />
              Approve Selected
            </Button>
          </div>
        </div>
      )}

      {/* Approvals Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
          <div className="col-span-1 flex items-center">
            <Checkbox 
              checked={allSelected} 
              onCheckedChange={handleSelectAll}
            />
          </div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Site</div>
          <div className="col-span-2">Indicator</div>
          <div className="col-span-2">Value</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border">
          {filteredData.map((entry) => (
            <div 
              key={entry.id}
              className={`grid grid-cols-12 gap-4 px-4 py-3 items-center transition-colors ${
                selectedRows.has(entry.id) ? 'bg-primary/5' : 'hover:bg-muted/30'
              }`}
            >
              {/* Checkbox */}
              <div className="col-span-1">
                <Checkbox 
                  checked={selectedRows.has(entry.id)}
                  onCheckedChange={(checked) => handleSelectRow(entry.id, checked as boolean)}
                />
              </div>

              {/* Date */}
              <div className="col-span-2 text-sm text-foreground">
                {new Date(entry.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>

              {/* Site */}
              <div className="col-span-2 text-sm text-foreground truncate">
                {entry.siteName}
              </div>

              {/* Indicator */}
              <div className="col-span-2 text-sm text-foreground">
                {entry.indicator}
              </div>

              {/* Value */}
              <div className="col-span-2 text-sm font-medium text-foreground">
                {entry.value} {entry.unit}
              </div>

              {/* Status */}
              <div className="col-span-2">
                <StatusBadge status={entry.status} />
              </div>

              {/* Actions */}
              <div className="col-span-1 flex justify-end">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="px-4 py-12 text-center text-muted-foreground">
              No pending approvals found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
