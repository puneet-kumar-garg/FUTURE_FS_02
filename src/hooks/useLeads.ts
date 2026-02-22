import { useState, useCallback, useMemo } from 'react';
import type { Lead, LeadFormData, LeadStatus, FollowUpNote } from '@/types/lead';

const n = (text: string, daysAgo: number): FollowUpNote => ({
  text,
  createdAt: new Date(Date.now() - daysAgo * 86400000).toISOString(),
});

// Mock data for demo - replace with actual API calls when backend is ready
const INITIAL_LEADS: Lead[] = [
  { _id: '1', name: 'Sarah Johnson', email: 'sarah@techcorp.com', phone: '+1 555-0101', source: 'Website', status: 'New', notes: [n('Interested in premium plan', 1)], createdAt: '2026-02-20T10:30:00Z' },
  { _id: '2', name: 'Michael Chen', email: 'mchen@startup.io', phone: '+1 555-0102', source: 'LinkedIn', status: 'Contacted', notes: [n('Called on Feb 18', 4), n('Scheduled demo for next week', 2)], createdAt: '2026-02-18T14:15:00Z' },
  { _id: '3', name: 'Emily Rodriguez', email: 'emily.r@designhub.com', phone: '+1 555-0103', source: 'Referral', status: 'Converted', notes: [n('Signed up for annual plan', 5)], createdAt: '2026-02-15T09:00:00Z' },
  { _id: '4', name: 'David Kim', email: 'dkim@enterprise.co', phone: '+1 555-0104', source: 'Google Ads', status: 'New', notes: [], createdAt: '2026-02-21T16:45:00Z' },
  { _id: '5', name: 'Priya Patel', email: 'priya@cloudsoft.in', phone: '+91 98765-43210', source: 'Website', status: 'Contacted', notes: [n('Sent proposal', 3)], createdAt: '2026-02-19T11:20:00Z' },
  { _id: '6', name: 'James Wilson', email: 'jwilson@media.com', phone: '+1 555-0106', source: 'Facebook', status: 'Converted', notes: [n('Upgraded to business tier', 10)], createdAt: '2026-02-10T08:30:00Z' },
  { _id: '7', name: 'Ana Martinez', email: 'ana@shopwave.com', phone: '+1 555-0107', source: 'Referral', status: 'New', notes: [], createdAt: '2026-02-22T07:00:00Z' },
  { _id: '8', name: 'Tom Baker', email: 'tbaker@logisticspro.com', phone: '+1 555-0108', source: 'Website', status: 'Contacted', notes: [n('Follow up needed', 5)], createdAt: '2026-02-17T13:10:00Z' },
];

let nextId = 9;

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | ''>('');

  const addLead = useCallback((data: LeadFormData) => {
    const newLead: Lead = {
      _id: String(nextId++),
      ...data,
      status: 'New',
      notes: [],
      createdAt: new Date().toISOString(),
    };
    setLeads(prev => [newLead, ...prev]);
  }, []);

  const updateStatus = useCallback((id: string, status: LeadStatus) => {
    setLeads(prev => prev.map(l => l._id === id ? { ...l, status } : l));
  }, []);

  const addNote = useCallback((id: string, note: string) => {
    const newNote: FollowUpNote = { text: note, createdAt: new Date().toISOString() };
    setLeads(prev => prev.map(l => l._id === id ? { ...l, notes: [...l.notes, newNote] } : l));
  }, []);

  const deleteLead = useCallback((id: string) => {
    setLeads(prev => prev.filter(l => l._id !== id));
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = !searchQuery ||
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  const stats = useMemo(() => ({
    total: leads.length,
    new: leads.filter(l => l.status === 'New').length,
    contacted: leads.filter(l => l.status === 'Contacted').length,
    converted: leads.filter(l => l.status === 'Converted').length,
  }), [leads]);

  return {
    leads: filteredLeads,
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
