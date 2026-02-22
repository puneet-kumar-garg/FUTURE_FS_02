import axios from 'axios';
import type { Lead, LeadFormData, LeadStatus, AdminCredentials, AuthResponse } from '@/types/lead';

// Configure base URL - point this to your Express backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: async (credentials: AdminCredentials): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },
};

// Lead APIs
export const leadAPI = {
  getAll: async (params?: { search?: string; status?: LeadStatus | '' }): Promise<Lead[]> => {
    const { data } = await api.get('/leads', { params });
    return data;
  },

  create: async (lead: LeadFormData): Promise<Lead> => {
    const { data } = await api.post('/leads', lead);
    return data;
  },

  updateStatus: async (id: string, status: LeadStatus): Promise<Lead> => {
    const { data } = await api.patch(`/leads/${id}/status`, { status });
    return data;
  },

  addNote: async (id: string, note: string): Promise<Lead> => {
    const { data } = await api.post(`/leads/${id}/notes`, { note });
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/leads/${id}`);
  },
};

export default api;
