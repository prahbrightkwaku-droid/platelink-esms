import { OperationalDataEntry } from '@/types/esms';
import { StatusBadge } from '@/components/workflow/StatusBadge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, Edit, MoreHorizontal, X } from 'lucide-react';
import { format } from 'date-fns';

interface DataTableProps {
  data: OperationalDataEntry[];
  onApprove: (entry: OperationalDataEntry) => void;
  onReject: (entry: OperationalDataEntry) => void;
  onEdit: (entry: OperationalDataEntry) => void;
}

export function DataTable({ data, onApprove, onReject, onEdit }: DataTableProps) {
  const canApprove = (status: string) =>
    status === 'pending_superintendent' || status === 'superintendent_approved';
  
  const canEdit = (status: string) => status === 'draft';

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">Date</TableHead>
              <TableHead className="text-muted-foreground font-medium">Site</TableHead>
              <TableHead className="text-muted-foreground font-medium">Indicator</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Value</TableHead>
              <TableHead className="text-muted-foreground font-medium">Status</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((entry) => (
              <TableRow
                key={entry.id}
                className="border-border hover:bg-secondary/50 transition-colors"
              >
                <TableCell className="font-medium">
                  {format(new Date(entry.date), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  <span className="text-sm">{entry.siteName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{entry.indicator}</span>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {entry.value.toLocaleString()} <span className="text-muted-foreground text-xs">{entry.unit}</span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={entry.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {canEdit(entry.status) && (
                        <DropdownMenuItem onClick={() => onEdit(entry)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      {canApprove(entry.status) && (
                        <>
                          <DropdownMenuItem onClick={() => onApprove(entry)} className="text-success">
                            <Check className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onReject(entry)} className="text-destructive">
                            <X className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                      {!canEdit(entry.status) && !canApprove(entry.status) && (
                        <DropdownMenuItem disabled>
                          No actions available
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No entries found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
