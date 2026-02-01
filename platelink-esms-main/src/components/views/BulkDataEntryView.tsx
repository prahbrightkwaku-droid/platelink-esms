import { useState } from 'react';
import { BulkIndicator } from '@/types/esms';
import { mockBulkIndicators } from '@/data/mockData';
import { StatusBadge } from '@/components/workflow/StatusBadge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Fuel, 
  Zap, 
  Flame, 
  Droplets, 
  Trash2, 
  Trash, 
  Cloud, 
  Wind, 
  Paperclip, 
  MoreVertical,
  Save,
  Send
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const iconMap: Record<string, typeof Fuel> = {
  Fuel: Fuel,
  Zap: Zap,
  Flame: Flame,
  Droplets: Droplets,
  Trash2: Trash2,
  Trash: Trash,
  Cloud: Cloud,
  Wind: Wind,
};

export function BulkDataEntryView() {
  const [indicators, setIndicators] = useState<BulkIndicator[]>(mockBulkIndicators);
  const [modifiedRows, setModifiedRows] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleValueChange = (id: string, value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    setIndicators(prev => 
      prev.map(ind => 
        ind.id === id 
          ? { ...ind, value: numValue, status: ind.status === 'not_started' ? 'draft' : ind.status }
          : ind
      )
    );
    setModifiedRows(prev => new Set(prev).add(id));
  };

  const handleSaveDraft = () => {
    const modifiedData = indicators.filter(ind => modifiedRows.has(ind.id));
    const payload = {
      action: 'save_draft',
      data: modifiedData,
      timestamp: new Date().toISOString(),
    };
    console.log('OnSelect Event - Save Draft:', JSON.stringify(payload, null, 2));
    toast({
      title: 'Draft Saved',
      description: `${modifiedData.length} entries saved as draft.`,
    });
    setModifiedRows(new Set());
  };

  const handleSubmit = () => {
    const modifiedData = indicators.filter(ind => modifiedRows.has(ind.id));
    const payload = {
      action: 'submit',
      data: modifiedData,
      timestamp: new Date().toISOString(),
    };
    console.log('OnSelect Event - Submit:', JSON.stringify(payload, null, 2));
    toast({
      title: 'Data Submitted',
      description: `${modifiedData.length} entries submitted for approval.`,
    });
    setModifiedRows(new Set());
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Bulk Data Entry</h2>
          <p className="text-sm text-muted-foreground">Enter values for all indicators at once</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft} disabled={modifiedRows.size === 0}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handleSubmit} disabled={modifiedRows.size === 0}>
            <Send className="h-4 w-4 mr-2" />
            Submit
          </Button>
        </div>
      </div>

      {/* Modified count */}
      {modifiedRows.size > 0 && (
        <div className="text-sm text-primary">
          {modifiedRows.size} row(s) modified
        </div>
      )}

      {/* Bulk Entry Grid */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
          <div className="col-span-3">Indicator</div>
          <div className="col-span-2">Period</div>
          <div className="col-span-2">Value</div>
          <div className="col-span-1">Unit</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border">
          {indicators.map((indicator, index) => {
            const Icon = iconMap[indicator.icon] || Fuel;
            const isModified = modifiedRows.has(indicator.id);

            return (
              <div 
                key={indicator.id}
                className={`grid grid-cols-12 gap-4 px-4 py-3 items-center transition-colors ${
                  isModified ? 'bg-primary/5' : 'hover:bg-muted/30'
                }`}
              >
                {/* Indicator */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{indicator.name}</span>
                </div>

                {/* Period */}
                <div className="col-span-2 text-sm text-muted-foreground">
                  {indicator.period}
                </div>

                {/* Value Input */}
                <div className="col-span-2">
                  <input
                    type="number"
                    value={indicator.value ?? ''}
                    onChange={(e) => handleValueChange(indicator.id, e.target.value)}
                    placeholder="Enter value"
                    className="bulk-input"
                    tabIndex={index + 1}
                  />
                </div>

                {/* Unit */}
                <div className="col-span-1 text-sm text-muted-foreground font-medium">
                  {indicator.unit}
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <StatusBadge status={indicator.status} />
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${indicator.hasEvidence ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View History</DropdownMenuItem>
                      <DropdownMenuItem>Add Note</DropdownMenuItem>
                      <DropdownMenuItem>Upload Evidence</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Clear Value</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
