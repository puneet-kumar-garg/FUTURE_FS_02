import { useAuth } from '@/contexts/AuthContext';
import { useLeads } from '@/hooks/useLeads';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { LogOut, Moon, Sun, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import StatsCards from '@/components/crm/StatsCards';
import LeadChart from '@/components/crm/LeadChart';
import SearchFilter from '@/components/crm/SearchFilter';
import LeadTable from '@/components/crm/LeadTable';
import AddLeadDialog from '@/components/crm/AddLeadDialog';

const Dashboard = () => {
  const { logout, adminEmail } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const {
    leads,
    allLeads,
    stats,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    addLead,
    updateStatus,
    addNote,
    deleteLead,
  } = useLeads();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/60 glass-effect">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary shadow-[0_0_15px_hsl(173,58%,45%,0.2)]">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-none">LeadFlow</h1>
              <p className="text-[11px] text-muted-foreground">Lead Management CRM</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground sm:inline mr-1">{adminEmail}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="h-9 w-9"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={logout} title="Logout" className="h-9 w-9">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <StatsCards stats={stats} />
        </motion.div>

        <LeadChart leads={allLeads} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
          <AddLeadDialog onAdd={addLead} />
        </motion.div>

        <LeadTable
          leads={leads}
          onStatusChange={updateStatus}
          onAddNote={addNote}
          onDelete={deleteLead}
        />
      </main>
    </div>
  );
};

export default Dashboard;
