// ESMS Platelink Type Definitions

export type WorkflowStatus = 'draft' | 'pending_superintendent' | 'superintendent_approved' | 'approved' | 'rejected' | 'not_started' | 'cancelled';

export type UserRole = 'operations_engineer' | 'operations_superintendent' | 'esg_superintendent';

export interface OperationalDataEntry {
  id: string;
  date: string;
  siteName: string;
  indicator: string;
  value: number;
  unit: string;
  status: WorkflowStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface DashboardMetrics {
  pendingApprovals: number;
  totalIncidents: number;
  complianceRate: number;
  totalEntries: number;
  approvedThisMonth: number;
  rejectedThisMonth: number;
}

export type ViewType = 'dashboard' | 'data-entry' | 'approvals';

export interface NavigationItem {
  id: ViewType;
  label: string;
  icon: string;
}

// Bulk Data Entry Types
export interface BulkIndicator {
  id: string;
  name: string;
  icon: string;
  period: string;
  value: number | null;
  unit: string;
  status: WorkflowStatus;
  hasEvidence: boolean;
}

export interface ActivityItem {
  id: string;
  action: string;
  user: string;
  target: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error';
}
