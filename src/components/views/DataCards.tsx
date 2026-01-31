import { OperationalDataEntry } from '@/types/esms';
import { StatusBadge } from '@/components/workflow/StatusBadge';
import { WorkflowStepper } from '@/components/workflow/WorkflowStepper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Check, Edit, MapPin, X, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

interface DataCardsProps {
  data: OperationalDataEntry[];
  onApprove: (entry: OperationalDataEntry) => void;
  onReject: (entry: OperationalDataEntry) => void;
  onEdit: (entry: OperationalDataEntry) => void;
}

export function DataCards({ data, onApprove, onReject, onEdit }: DataCardsProps) {
  const canApprove = (status: string) =>
    status === 'pending_superintendent' || status === 'superintendent_approved';
  
  const canEdit = (status: string) => status === 'draft';

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        No entries found matching your filters.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((entry) => (
        <Card
          key={entry.id}
          className="data-card border-border bg-card transition-all duration-200 hover:border-primary/50"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground leading-tight">
                  {entry.indicator}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {entry.siteName}
                </div>
              </div>
              <StatusBadge status={entry.status} showIcon={false} />
            </div>
          </CardHeader>

          <CardContent className="pb-3">
            {/* Value display */}
            <div className="mb-4 rounded-lg bg-secondary p-3 text-center">
              <span className="text-2xl font-bold text-foreground">
                {entry.value.toLocaleString()}
              </span>
              <span className="ml-1 text-sm text-muted-foreground">{entry.unit}</span>
            </div>

            {/* Metadata */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {format(new Date(entry.date), 'MMM d, yyyy')}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                {entry.createdBy}
              </div>
            </div>

            {/* Workflow stepper */}
            <div className="mt-4">
              <WorkflowStepper status={entry.status} compact />
            </div>
          </CardContent>

          <CardFooter className="border-t border-border pt-3 gap-2">
            {canEdit(entry.status) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(entry)}
                className="flex-1"
              >
                <Edit className="mr-1.5 h-3.5 w-3.5" />
                Edit
              </Button>
            )}
            {canApprove(entry.status) && (
              <>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onApprove(entry)}
                  className="flex-1"
                >
                  <Check className="mr-1.5 h-3.5 w-3.5" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReject(entry)}
                  className="flex-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="mr-1.5 h-3.5 w-3.5" />
                  Reject
                </Button>
              </>
            )}
            {!canEdit(entry.status) && !canApprove(entry.status) && (
              <span className="text-xs text-muted-foreground w-full text-center">
                No actions available
              </span>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
