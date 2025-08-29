import axios from 'axios';
import { Service, Incident, Organization, User, OrganizationMember, IncidentUpdate } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://status-page-bx79.onrender.com/api';

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

// Users API
export const usersApi = {
  getAll: () => api.get<User[]>('/users').then(res => res.data),
  getById: (id: string) => api.get<User>(`/users/${id}`).then(res => res.data),
  create: (data: { email: string; name?: string }) =>
    api.post<User>('/users', data).then(res => res.data),
  update: (id: string, data: { email?: string; name?: string }) =>
    api.put<User>(`/users/${id}`, data).then(res => res.data),
  delete: (id: string) => api.delete(`/users/${id}`),
};

// Team Management API
export const membersApi = {
  getByOrganization: (orgId: string) => 
    api.get<OrganizationMember[]>(`/members/organization/${orgId}`).then(res => res.data),
  getByUser: (userId: string) => 
    api.get<OrganizationMember[]>(`/members/user/${userId}`).then(res => res.data),
  create: (data: { userId: string; organizationId: string; role: string }) =>
    api.post<OrganizationMember>('/members', data).then(res => res.data),
  update: (id: string, data: { role: string }) =>
    api.put<OrganizationMember>(`/members/${id}`, data).then(res => res.data),
  delete: (id: string) => api.delete(`/members/${id}`),
};

// Incident Updates API
export const incidentUpdatesApi = {
  getByIncident: (incidentId: string) => 
    api.get<IncidentUpdate[]>(`/incident-updates/incident/${incidentId}`).then(res => res.data),
  create: (data: { incidentId: string; message: string; status: string }) =>
    api.post<IncidentUpdate>('/incident-updates', data).then(res => res.data),
  update: (id: string, data: { message?: string; status?: string }) =>
    api.put<IncidentUpdate>(`/incident-updates/${id}`, data).then(res => res.data),
  delete: (id: string) => api.delete(`/incident-updates/${id}`),
};

export default api;
