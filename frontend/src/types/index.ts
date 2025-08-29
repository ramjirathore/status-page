export interface Service {
  id: string;
  name: string;
  status: 'OPERATIONAL' | 'DEGRADED' | 'PARTIAL_OUTAGE' | 'MAJOR_OUTAGE';
  organizationId: string;
  organization: Organization;
  incidents: Incident[];
  createdAt: string;
  updatedAt: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'RESOLVED' | 'MAINTENANCE';
  serviceId: string;
  organizationId: string;
  service: Service;
  organization: Organization;
  updates: IncidentUpdate[];
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  services: Service[];
  incidents: Incident[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  orgs: OrganizationMember[];
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationMember {
  id: string;
  userId: string;
  organizationId: string;
  role: string;
  user: User;
  organization: Organization;
  createdAt: string;
  updatedAt: string;
}

export interface IncidentUpdate {
  id: string;
  incidentId: string;
  message: string;
  status: 'OPEN' | 'RESOLVED' | 'MAINTENANCE';
  createdAt: string;
  updatedAt: string;
}
