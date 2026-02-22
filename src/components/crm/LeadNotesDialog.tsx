import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, MessageSquare, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lead } from '@/types/lead';

interface LeadNotesDialogProps {
  lead: Lead | null;
  onClose: () => void;
  onAddNote: (id: string, note: string) => void;
}

const formatRelativeTime = (dateStr: string) => {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const QUICK_NOTES = [
  'Interested in ₹20k package',
  'Follow up next week',
  'Sent proposal via email',
  'Requested callback',
  'Not interested right now',
  'Scheduled a demo',
];

const LeadNotesDialog = ({ lead, onClose, onAddNote }: LeadNotesDialogProps) => {
  const [note, setNote] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lead?.notes.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead || !note.trim()) return;
    onAddNote(lead._id, note.trim());
    setNote('');
  };

  const handleQuickNote = (text: string) => {
    if (!lead) return;
    onAddNote(lead._id, text);
  };

  return (
    <Dialog open={!!lead} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary text-xs font-bold text-white">
              {lead?.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div>
              <DialogTitle className="text-base">{lead?.name}</DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Follow-up Notes & History</p>
            </div>
          </div>
        </DialogHeader>

        {/* Notes timeline */}
        <div ref={scrollRef} className="max-h-64 space-y-3 overflow-y-auto pr-1 py-2">
          {lead?.notes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="rounded-full bg-muted p-3 mb-3">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-card-foreground">No follow-up notes yet</p>
              <p className="text-xs text-muted-foreground mt-1">Add a note or use a quick template below</p>
            </div>
          )}
          <AnimatePresence>
            {lead?.notes.map((n, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="group relative rounded-lg border border-border bg-muted/50 p-3"
              >
                <p className="text-sm text-card-foreground leading-relaxed">{n.text}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[11px] text-muted-foreground">{formatRelativeTime(n.createdAt)}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quick note templates */}
        <div className="flex flex-wrap gap-1.5">
          {QUICK_NOTES.map(qn => (
            <button
              key={qn}
              onClick={() => handleQuickNote(qn)}
              className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/30"
            >
              {qn}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            placeholder="Add a follow-up note..."
            value={note}
            onChange={e => setNote(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="flex-1 min-h-[44px] max-h-24 resize-none"
            rows={1}
          />
          <Button type="submit" size="icon" disabled={!note.trim()} className="self-end h-11 w-11">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadNotesDialog;
