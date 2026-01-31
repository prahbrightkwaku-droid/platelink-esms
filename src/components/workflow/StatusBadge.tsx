import { cn } from '@/lib/utils';
import { WorkflowStatus } from '@/types/esms';
import { Check, Clock, FileEdit, ShieldCheck, X } from 'lucide-react';

interface StatusBadgeProps {
  status: WorkflowStatus;
  showIcon?: boolean;
}

const statusConfig: Record<WorkflowStatus, {
  label: string;
  icon: typeof Check;
  className: string;
}> = {
  draft: {
    label: 'Draft',
    icon: FileEdit,
    className: 'bg-muted text-muted-foreground',
  },
  pending_superintendent: {
    label: 'Pending Review',
    icon: Clock,
    className: 'bg-warning/20 text-warning border-warning/30',
  },
  superintendent_approved: {
    label: 'Supt. Approved',
    icon: Check,
    className: 'bg-primary/20 text-primary border-primary/30',
  },
  approved: {
    label: 'Approved',
    icon: ShieldCheck,
    className: 'bg-success/20 text-success border-success/30',
  },
  rejected: {
    label: 'Rejected',
    icon: X,
    className: 'bg-destructive/20 text-destructive border-destructive/30',
  },
};

export function StatusBadge({ status, showIcon = true }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        config.className
      )}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </span>
  );
}
