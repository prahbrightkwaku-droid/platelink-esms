import { OperationalDataEntry, User, DashboardMetrics, BulkIndicator, ActivityItem } from '@/types/esms';

export const mockUser: User = {
  id: 'user-001',
  name: 'John Mitchell',
  role: 'operations_superintendent',
  email: 'j.mitchell@platelink.com',
};

export const mockOperationalData: OperationalDataEntry[] = [
  {
    id: 'entry-001',
    date: '2025-01-30',
    siteName: 'North Field Platform A',
    indicator: 'CO2 Emissions',
    value: 245.8,
    unit: 'tonnes',
    status: 'draft',
    createdBy: 'Sarah Chen',
    createdAt: '2025-01-30T08:30:00Z',
    updatedAt: '2025-01-30T08:30:00Z',
    notes: 'Routine monitoring',
  },
  {
    id: 'entry-002',
    date: '2025-01-29',
    siteName: 'South Terminal B',
    indicator: 'Water Discharge',
    value: 1250,
    unit: 'm³',
    status: 'pending_superintendent',
    createdBy: 'Mike Rodriguez',
    createdAt: '2025-01-29T14:15:00Z',
    updatedAt: '2025-01-29T16:45:00Z',
  },
  {
    id: 'entry-003',
    date: '2025-01-28',
    siteName: 'Central Processing Hub',
    indicator: 'Flare Gas Volume',
    value: 89.2,
    unit: 'MCF',
    status: 'superintendent_approved',
    createdBy: 'Lisa Park',
    createdAt: '2025-01-28T09:00:00Z',
    updatedAt: '2025-01-29T11:30:00Z',
  },
  {
    id: 'entry-004',
    date: '2025-01-27',
    siteName: 'East Compression Station',
    indicator: 'NOx Emissions',
    value: 12.4,
    unit: 'kg',
    status: 'approved',
    createdBy: 'David Kim',
    createdAt: '2025-01-27T10:20:00Z',
    updatedAt: '2025-01-28T08:00:00Z',
  },
  {
    id: 'entry-005',
    date: '2025-01-26',
    siteName: 'North Field Platform A',
    indicator: 'Waste Generated',
    value: 3.5,
    unit: 'tonnes',
    status: 'rejected',
    createdBy: 'Sarah Chen',
    createdAt: '2025-01-26T11:45:00Z',
    updatedAt: '2025-01-27T09:15:00Z',
    notes: 'Values need verification',
  },
  {
    id: 'entry-006',
    date: '2025-01-25',
    siteName: 'West Pipeline Junction',
    indicator: 'Methane Leakage',
    value: 0.08,
    unit: 'tonnes',
    status: 'pending_superintendent',
    createdBy: 'Tom Wilson',
    createdAt: '2025-01-25T13:00:00Z',
    updatedAt: '2025-01-25T15:30:00Z',
  },
  {
    id: 'entry-007',
    date: '2025-01-24',
    siteName: 'South Terminal B',
    indicator: 'Energy Consumption',
    value: 4520,
    unit: 'MWh',
    status: 'approved',
    createdBy: 'Mike Rodriguez',
    createdAt: '2025-01-24T08:00:00Z',
    updatedAt: '2025-01-25T17:00:00Z',
  },
  {
    id: 'entry-008',
    date: '2025-01-23',
    siteName: 'Central Processing Hub',
    indicator: 'Oil Spill Volume',
    value: 0,
    unit: 'liters',
    status: 'approved',
    createdBy: 'Lisa Park',
    createdAt: '2025-01-23T07:30:00Z',
    updatedAt: '2025-01-24T09:45:00Z',
    notes: 'Zero spill reported',
  },
];

export const mockDashboardMetrics: DashboardMetrics = {
  pendingApprovals: 3,
  totalIncidents: 2,
  complianceRate: 94.5,
  totalEntries: 156,
  approvedThisMonth: 45,
  rejectedThisMonth: 4,
};

export const siteNames = [
  'North Field Platform A',
  'South Terminal B',
  'Central Processing Hub',
  'East Compression Station',
  'West Pipeline Junction',
];

export const indicators = [
  'CO2 Emissions',
  'Water Discharge',
  'Flare Gas Volume',
  'NOx Emissions',
  'Waste Generated',
  'Methane Leakage',
  'Energy Consumption',
  'Oil Spill Volume',
];

export const units: Record<string, string> = {
  'CO2 Emissions': 'tonnes',
  'Water Discharge': 'm³',
  'Flare Gas Volume': 'MCF',
  'NOx Emissions': 'kg',
  'Waste Generated': 'tonnes',
  'Methane Leakage': 'tonnes',
  'Energy Consumption': 'MWh',
  'Oil Spill Volume': 'liters',
};

// Bulk Data Entry Mock Data
export const mockBulkIndicators: BulkIndicator[] = [
  { id: 'ind-001', name: 'Diesel', icon: 'Fuel', period: 'Dec 2025', value: null, unit: 'L', status: 'draft', hasEvidence: false },
  { id: 'ind-002', name: 'Petrol', icon: 'Fuel', period: 'Dec 2025', value: 1250, unit: 'L', status: 'draft', hasEvidence: true },
  { id: 'ind-003', name: 'Electricity', icon: 'Zap', period: 'Dec 2025', value: 4500, unit: 'MWh', status: 'approved', hasEvidence: true },
  { id: 'ind-004', name: 'Natural Gas', icon: 'Flame', period: 'Dec 2025', value: null, unit: 'MCF', status: 'not_started', hasEvidence: false },
  { id: 'ind-005', name: 'Water Consumption', icon: 'Droplets', period: 'Dec 2025', value: 890, unit: 'm³', status: 'pending_superintendent', hasEvidence: true },
  { id: 'ind-006', name: 'Waste (Hazardous)', icon: 'Trash2', period: 'Dec 2025', value: 2.5, unit: 'TONS', status: 'draft', hasEvidence: false },
  { id: 'ind-007', name: 'Waste (Non-Hazardous)', icon: 'Trash', period: 'Dec 2025', value: null, unit: 'TONS', status: 'not_started', hasEvidence: false },
  { id: 'ind-008', name: 'CO2 Emissions', icon: 'Cloud', period: 'Dec 2025', value: 156.8, unit: 'TONS', status: 'superintendent_approved', hasEvidence: true },
  { id: 'ind-009', name: 'Methane Emissions', icon: 'Wind', period: 'Dec 2025', value: null, unit: 'TONS', status: 'not_started', hasEvidence: false },
  { id: 'ind-010', name: 'Flare Gas', icon: 'Flame', period: 'Dec 2025', value: 89.2, unit: 'MCF', status: 'rejected', hasEvidence: true },
];

// Activity Feed Mock Data
export const mockActivityItems: ActivityItem[] = [
  { id: 'act-001', action: 'Submitted', user: 'Sarah Chen', target: 'CO2 Emissions Report', timestamp: '2 min ago', status: 'pending' },
  { id: 'act-002', action: 'Approved', user: 'John Mitchell', target: 'Energy Consumption Q4', timestamp: '15 min ago', status: 'success' },
  { id: 'act-003', action: 'Rejected', user: 'Lisa Park', target: 'Waste Report - Nov', timestamp: '1 hour ago', status: 'error' },
  { id: 'act-004', action: 'Created', user: 'Mike Rodriguez', target: 'Water Discharge Log', timestamp: '2 hours ago', status: 'success' },
  { id: 'act-005', action: 'Updated', user: 'David Kim', target: 'Methane Leakage Data', timestamp: '3 hours ago', status: 'success' },
];
