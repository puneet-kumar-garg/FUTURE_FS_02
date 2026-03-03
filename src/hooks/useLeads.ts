import { useState, useCallback, useMemo, useEffect } from 'react';
import { leadAPI } from '@/services/api';
import type { Lead, LeadFormData, LeadStatus } from '@/types/lead';

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | ''>('');

  const fetchLeads = useCallback(async () => {
    try {
      const data = await leadAPI.getAll({ search: searchQuery, status: statusFilter });
      setLeads(data);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    }
  }, [searchQuery, statusFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const addLead = useCallback(async (data: LeadFormData) => {
    try {
      await leadAPI.create(data);
      fetchLeads();
    } catch (error) {
      console.error('Failed to add lead:', error);
    }
  }, [fetchLeads]);

  const updateStatus = useCallback(async (id: string, status: LeadStatus) => {
    try {
      await leadAPI.updateStatus(id, status);
      fetchLeads();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  }, [fetchLeads]);

  const addNote = useCallback(async (id: string, note: string) => {
    try {
      await leadAPI.addNote(id, note);
      fetchLeads();
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  }, [fetchLeads]);

  const deleteLead = useCallback(async (id: string) => {
    try {
      await leadAPI.delete(id);
      fetchLeads();
    } catch (error) {
      console.error('Failed to delete lead:', error);
    }
  }, [fetchLeads]);

  const stats = useMemo(() => ({
    total: leads.length,
    new: leads.filter(l => l.status === 'New').length,
    contacted: leads.filter(l => l.status === 'Contacted').length,
    converted: leads.filter(l => l.status === 'Converted').length,
  }), [leads]);

  return {
    leads,
    allLeads: leads,
    stats,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    addLead,
    updateStatus,
    addNote,
    deleteLead,
  };
};
