import { mockDashboardMetrics, mockActivityItems } from '@/data/mockData';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  Zap,
  Droplets,
  Flame
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const chartData = [
  { month: 'Jul', value: 120 },
  { month: 'Aug', value: 145 },
  { month: 'Sep', value: 138 },
  { month: 'Oct', value: 165 },
  { month: 'Nov', value: 152 },
  { month: 'Dec', value: 178 },
  { month: 'Jan', value: 156 },
];

const kpiCards = [
  {
    title: 'Total Energy',
    value: '4,520',
    unit: 'MWh',
    change: '+12.5%',
    trend: 'up',
    icon: Zap,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Water Usage',
    value: '1,250',
    unit: 'm³',
    change: '-8.2%',
    trend: 'down',
    icon: Droplets,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'CO2 Emissions',
    value: '245.8',
    unit: 'tonnes',
    change: '+3.1%',
    trend: 'up',
    icon: Flame,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    title: 'Pending Approvals',
    value: mockDashboardMetrics.pendingApprovals.toString(),
    unit: 'items',
    change: '',
    trend: 'neutral',
    icon: Clock,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
];

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="kpi-card">
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
                {card.change && (
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    card.trend === 'up' ? 'text-success' : card.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                  }`}>
                    {card.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {card.change}
                  </div>
                )}
              </div>
              <div className="mt-3">
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  {card.value}
                  <span className="text-sm font-normal text-muted-foreground ml-1">{card.unit}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Compliance Card */}
        <div className="kpi-card col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Compliance Rate</p>
              <p className="text-2xl font-semibold text-foreground">{mockDashboardMetrics.complianceRate}%</p>
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full bg-success rounded-full transition-all"
              style={{ width: `${mockDashboardMetrics.complianceRate}%` }}
            />
          </div>
        </div>

        {/* Total Entries */}
        <div className="kpi-card col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Entries</p>
              <p className="text-2xl font-semibold text-foreground">{mockDashboardMetrics.totalEntries}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-success">{mockDashboardMetrics.approvedThisMonth} approved</span>
            <span className="text-destructive">{mockDashboardMetrics.rejectedThisMonth} rejected</span>
          </div>
        </div>

        {/* Incidents */}
        <div className="kpi-card col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Incidents</p>
              <p className="text-2xl font-semibold text-foreground">{mockDashboardMetrics.totalIncidents}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">This month</p>
        </div>
      </div>

      {/* Chart and Activity */}
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Trend Chart */}
        <div className="kpi-card lg:col-span-3">
          <h3 className="text-sm font-medium text-foreground mb-4">Monthly Submissions</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(197, 100%, 47%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(197, 100%, 47%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(197, 100%, 47%)" 
                  strokeWidth={2}
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="kpi-card lg:col-span-2">
          <h3 className="text-sm font-medium text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {mockActivityItems.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className={`mt-1 h-2 w-2 rounded-full ${
                  item.status === 'success' ? 'bg-success' : 
                  item.status === 'pending' ? 'bg-warning' : 'bg-destructive'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">
                    <span className="font-medium">{item.user}</span>
                    {' '}{item.action.toLowerCase()}{' '}
                    <span className="text-muted-foreground">{item.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
