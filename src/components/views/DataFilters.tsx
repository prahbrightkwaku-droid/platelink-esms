import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { siteNames } from '@/data/mockData';

interface DataFiltersProps {
  filters: {
    search: string;
    status: string;
    site: string;
  };
  onFiltersChange: (filters: {
    search: string;
    status: string;
    site: string;
  }) => void;
}

export function DataFilters({ filters, onFiltersChange }: DataFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search entries..."
          value={filters.search}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value })
          }
          className="pl-9 bg-secondary border-border"
        />
      </div>

      {/* Status filter */}
      <Select
        value={filters.status}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, status: value })
        }
      >
        <SelectTrigger className="w-full sm:w-44 bg-secondary border-border">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="pending_superintendent">Pending Review</SelectItem>
          <SelectItem value="superintendent_approved">Supt. Approved</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      {/* Site filter */}
      <Select
        value={filters.site}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, site: value })
        }
      >
        <SelectTrigger className="w-full sm:w-52 bg-secondary border-border">
          <SelectValue placeholder="All Sites" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sites</SelectItem>
          {siteNames.map((site) => (
            <SelectItem key={site} value={site}>
              {site}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
