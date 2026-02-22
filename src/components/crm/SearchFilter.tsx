import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { LeadStatus } from '@/types/lead';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: LeadStatus | '';
  onStatusChange: (value: LeadStatus | '') => void;
}

const SearchFilter = ({ searchQuery, onSearchChange, statusFilter, onStatusChange }: SearchFilterProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={statusFilter || 'all'} onValueChange={v => onStatusChange(v === 'all' ? '' : v as LeadStatus)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SlidersHorizontal className="mr-2 h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="Filter status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Contacted">Contacted</SelectItem>
          <SelectItem value="Converted">Converted</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilter;
