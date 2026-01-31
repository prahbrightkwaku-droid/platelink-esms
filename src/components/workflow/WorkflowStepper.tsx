import { cn } from '@/lib/utils';
import { WorkflowStatus } from '@/types/esms';
import { Check, Clock, FileEdit, UserCheck, ShieldCheck, X } from 'lucide-react';

interface WorkflowStepperProps {
  status: WorkflowStatus;
  compact?: boolean;
}

const steps = [
  { id: 'draft', label: 'Draft', icon: FileEdit },
  { id: 'pending_superintendent', label: 'Pending Review', icon: Clock },
  { id: 'superintendent_approved', label: 'Supt. Approved', icon: UserCheck },
  { id: 'approved', label: 'Final Approved', icon: ShieldCheck },
];

const statusIndex: Record<WorkflowStatus, number> = {
  draft: 0,
  pending_superintendent: 1,
  superintendent_approved: 2,
  approved: 3,
  rejected: -1,
};

export function WorkflowStepper({ status, compact = false }: WorkflowStepperProps) {
  const currentIndex = statusIndex[status];
  const isRejected = status === 'rejected';

  if (isRejected) {
    return (
      <div className={cn(
        'flex items-center gap-2 rounded-full px-3 py-1.5',
        'bg-destructive/20 text-destructive'
      )}>
        <X className="h-4 w-4" />
        <span className="text-sm font-medium">Rejected</span>
      </div>
    );
  }

  if (compact) {
    const currentStep = steps[currentIndex];
    const Icon = currentStep?.icon || FileEdit;
    
    return (
      <div className={cn(
        'flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium',
        currentIndex === 3 && 'bg-success/20 text-success',
        currentIndex === 2 && 'bg-primary/20 text-primary',
        currentIndex === 1 && 'bg-warning/20 text-warning',
        currentIndex === 0 && 'bg-muted text-muted-foreground'
      )}>
        <Icon className="h-4 w-4" />
        <span>{currentStep?.label}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        
        return (
          <div key={step.id} className="flex items-center">
            {/* Step circle */}
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300',
                isCompleted && 'bg-success text-success-foreground',
                isCurrent && 'bg-primary text-primary-foreground ring-2 ring-primary/30',
                !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
              )}
            >
              {isCompleted ? (
                <Check className="h-4 w-4" />
              ) : (
                <Icon className="h-4 w-4" />
              )}
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-0.5 w-8 transition-all duration-300',
                  index < currentIndex ? 'bg-success' : 'bg-muted'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
