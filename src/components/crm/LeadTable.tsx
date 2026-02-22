import { useState } from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, MessageSquarePlus, Trash2, ExternalLink } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { Lead, LeadStatus } from '@/types/lead';
import LeadNotesDialog from './LeadNotesDialog';

interface LeadTableProps {
  leads: Lead[];
  onStatusChange: (id: string, status: LeadStatus) => void;
  onAddNote: (id: string, note: string) => void;
  onDelete: (id: string) => void;
}

const statusBadgeClasses: Record<LeadStatus, string> = {
  New: 'bg-info/15 text-info border-info/30',
  Contacted: 'bg-warning/15 text-warning border-warning/30',
  Converted: 'bg-success/15 text-success border-success/30',
};

const statusDotClasses: Record<LeadStatus, string> = {
  New: 'bg-info',
  Contacted: 'bg-warning',
  Converted: 'bg-success',
};

const LeadTable = ({ leads, onStatusChange, onAddNote, onDelete }: LeadTableProps) => {
  const [notesLead, setNotesLead] = useState<Lead | null>(null);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (leads.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-20"
      >
        <div className="rounded-full bg-muted p-4 mb-4">
          <ExternalLink className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium text-card-foreground">No leads found</p>
        <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters</p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="overflow-hidden rounded-xl border border-border bg-card shadow-card"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border">
              <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Lead</TableHead>
              <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground hidden md:table-cell">Contact</TableHead>
              <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Source</TableHead>
              <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</TableHead>
              <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Date</TableHead>
              <TableHead className="w-[60px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead, i) => (
              <motion.tr
                key={lead._id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                className="group border-b border-border/50 transition-colors hover:bg-muted/20"
              >
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">
                      {getInitials(lead.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-card-foreground truncate">{lead.name}</p>
                      <p className="text-xs text-muted-foreground truncate md:hidden">{lead.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="space-y-0.5">
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                    <p className="text-xs text-muted-foreground/70">{lead.phone}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {lead.source}
                  </span>
                </TableCell>
                <TableCell>
                  <Select value={lead.status} onValueChange={(v) => onStatusChange(lead._id, v as LeadStatus)}>
                    <SelectTrigger className="h-7 w-[130px] border-0 p-0 shadow-none focus:ring-0">
                      <Badge variant="outline" className={`${statusBadgeClasses[lead.status]} cursor-pointer gap-1.5`}>
                        <span className={`inline-block h-1.5 w-1.5 rounded-full ${statusDotClasses[lead.status]}`} />
                        {lead.status}
                      </Badge>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Converted">Converted</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm hidden sm:table-cell">
                  {formatDate(lead.createdAt)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setNotesLead(lead)}>
                        <MessageSquarePlus className="mr-2 h-4 w-4" />
                        Notes
                        {lead.notes.length > 0 && (
                          <span className="ml-auto rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                            {lead.notes.length}
                          </span>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(lead._id)} className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>

        {/* Table footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3 bg-muted/20">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-semibold text-card-foreground">{leads.length}</span> leads
          </p>
        </div>
      </motion.div>

      <LeadNotesDialog
        lead={notesLead}
        onClose={() => setNotesLead(null)}
        onAddNote={onAddNote}
      />
    </>
  );
};

export default LeadTable;
