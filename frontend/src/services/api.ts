import axios from 'axios';
import { Service, Incident, Organization } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Services API
export const servicesApi = {
  getAll: () => api.get<Service[]>('/services').then(res => res.data),
  getByOrganization: (orgId: string) => 
    api.get<Service[]>(`/services/organization/${orgId}`).then(res => res.data),
  create: (data: { name: string; organizationId: string; status?: string }) =>
    api.post<Service>('/services', data).then(res => res.data),
  updateStatus: (id: string, status: string) =>
    api.patch<Service>(`/services/${id}/status`, { status }).then(res => res.data),
  update: (id: string, data: { name?: string; status?: string }) =>
    api.put<Service>(`/services/${id}`, data).then(res => res.data),
  delete: (id: string) => api.delete(`/services/${id}`),
};

// Incidents API
export const incidentsApi = {
  getAll: () => api.get<Incident[]>('/incidents').then(res => res.data),
  getByOrganization: (orgId: string) =>
    api.get<Incident[]>(`/incidents/organization/${orgId}`).then(res => res.data),
  create: (data: { title: string; description: string; serviceId: string; organizationId: string; status?: string }) =>
    api.post<Incident>('/incidents', data).then(res => res.data),
  updateStatus: (id: string, status: string) =>
    api.patch<Incident>(`/incidents/${id}/status`, { status }).then(res => res.data),
  update: (id: string, data: { title?: string; description?: string; status?: string }) =>
    api.put<Incident>(`/incidents/${id}`, data).then(res => res.data),
  delete: (id: string) => api.delete(`/incidents/${id}`),
};

// Organizations API
export const organizationsApi = {
  getAll: () => api.get<Organization[]>('/organizations').then(res => res.data),
  getById: (id: string) => api.get<Organization>(`/organizations/${id}`).then(res => res.data),
  create: (data: { name: string }) =>
    api.post<Organization>('/organizations', data).then(res => res.data),
  update: (id: string, data: { name: string }) =>
    api.put<Organization>(`/organizations/${id}`, data).then(res => res.data),
  delete: (id: string) => api.delete(`/organizations/${id}`),
};

export default api;
