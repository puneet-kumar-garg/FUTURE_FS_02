export type LeadStatus = 'New' | 'Contacted' | 'Converted';

export interface FollowUpNote {
  text: string;
  createdAt: string;
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: LeadStatus;
  notes: FollowUpNote[];
  createdAt: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  source: string;
}

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  admin: {
    id: string;
    email: string;
  };
}

export interface DashboardStats {
  total: number;
  new: number;
  contacted: number;
  converted: number;
}
