import { mockDashboardMetrics, mockOperationalData } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WorkflowStepper } from '@/components/workflow/WorkflowStepper';
import {
  Clock,
  AlertTriangle,
  TrendingUp,
  FileCheck,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const metrics = mockDashboardMetrics;

// Sample chart data
const trendData = [
  { month: 'Aug', value: 32 },
  { month: 'Sep', value: 45 },
  { month: 'Oct', value: 38 },
  { month: 'Nov', value: 52 },
  { month: 'Dec', value: 48 },
  { month: 'Jan', value: 56 },
];

const statusDistribution = [
  { name: 'Approved', value: 45, color: 'hsl(142, 76%, 36%)' },
  { name: 'Pending', value: 12, color: 'hsl(38, 92%, 50%)' },
  { name: 'Draft', value: 8, color: 'hsl(215, 35%, 20%)' },
  { name: 'Rejected', value: 4, color: 'hsl(0, 72%, 51%)' },
];

export function DashboardView() {
  const recentPending = mockOperationalData.filter(
    (e) => e.status === 'pending_superintendent' || e.status === 'superintendent_approved'
  ).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Pending Approvals"
          value={metrics.pendingApprovals}
          icon={Clock}
          trend="+2 from yesterday"
          accentColor="text-warning"
        />
        <MetricCard
          title="Total Incidents"
          value={metrics.totalIncidents}
          icon={AlertTriangle}
          trend="This month"
          accentColor="text-destructive"
        />
        <MetricCard
          title="Compliance Rate"
          value={`${metrics.complianceRate}%`}
          icon={TrendingUp}
          trend="+1.2% from last month"
          accentColor="text-success"
        />
        <MetricCard
          title="Total Entries"
          value={metrics.totalEntries}
          icon={FileCheck}
          trend="All time"
          accentColor="text-primary"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Trend Chart */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              Monthly Entry Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(197, 100%, 47%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(197, 100%, 47%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(215, 35%, 25%)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(215, 20%, 55%)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(215, 20%, 55%)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(215, 55%, 16%)',
                      border: '1px solid hsl(215, 35%, 25%)',
                      borderRadius: '8px',
                      color: 'hsl(210, 40%, 98%)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(197, 100%, 47%)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(215, 55%, 16%)',
                      border: '1px solid hsl(215, 35%, 25%)',
                      borderRadius: '8px',
                      color: 'hsl(210, 40%, 98%)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {statusDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Approval Stats and Recent Pending */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* This Month Stats */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              This Month's Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="font-medium text-foreground">Approved</span>
              </div>
              <span className="text-2xl font-bold text-success">
                {metrics.approvedThisMonth}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-destructive" />
                <span className="font-medium text-foreground">Rejected</span>
              </div>
              <span className="text-2xl font-bold text-destructive">
                {metrics.rejectedThisMonth}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Pending Items */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              Pending Your Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentPending.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No items pending review
              </p>
            ) : (
              recentPending.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary border border-border"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {entry.indicator}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.siteName}
                    </p>
                  </div>
                  <WorkflowStepper status={entry.status} compact />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: typeof Clock;
  trend: string;
  accentColor: string;
}

function MetricCard({ title, value, icon: Icon, trend, accentColor }: MetricCardProps) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={`text-3xl font-bold mt-1 ${accentColor}`}>{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{trend}</p>
          </div>
          <div className={`p-3 rounded-lg bg-secondary ${accentColor}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
