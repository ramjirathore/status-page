import { useState, useEffect } from 'react';
import { Service, Incident, User, Organization, OrganizationMember } from '@/types';
import { servicesApi, incidentsApi, usersApi, organizationsApi, membersApi } from '@/services/api';
import { socketService } from '@/services/socket';
import { ServiceCard } from './ServiceCard';
import { IncidentCard } from './IncidentCard';
import { IncidentUpdateForm } from './IncidentUpdateForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type TabType = 'services' | 'incidents' | 'users' | 'organizations' | 'team';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('services');
  const [services, setServices] = useState<Service[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Service states
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ name: '', status: 'OPERATIONAL', organizationId: '' });
  
  // Incident states
  const [showAddIncident, setShowAddIncident] = useState(false);
  const [showAddUpdate, setShowAddUpdate] = useState<string | null>(null);
  const [newIncident, setNewIncident] = useState({ 
    title: '', 
    description: '', 
    serviceId: '', 
    status: 'OPEN' 
  });
  
  // User states
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', name: '' });
  
  // Organization states
  const [showAddOrganization, setShowAddOrganization] = useState(false);
  const [newOrganization, setNewOrganization] = useState({ name: '' });
  
  // Team management states
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({ userId: '', organizationId: '', role: 'member' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, incidentsData, usersData, organizationsData] = await Promise.all([
          servicesApi.getAll(),
          incidentsApi.getAll(),
          usersApi.getAll(),
          organizationsApi.getAll()
        ]);
        setServices(servicesData);
        setIncidents(incidentsData);
        setUsers(usersData);
        setOrganizations(organizationsData);
        
        // Fetch members for the first organization if available
        if (organizationsData.length > 0) {
          const membersData = await membersApi.getByOrganization(organizationsData[0].id);
          setMembers(membersData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Connect to socket for real-time updates
    const socket = socketService.connect();

    socketService.onServiceStatusUpdate((updatedService) => {
      setServices(prev => 
        prev.map(service => 
          service.id === updatedService.id ? updatedService : service
        )
      );
    });

    socketService.onIncidentUpdate((updatedIncident) => {
      setIncidents(prev => 
        prev.map(incident => 
          incident.id === updatedIncident.id ? updatedIncident : incident
        )
      );
    });

    socketService.onIncidentCreated((newIncident) => {
      setIncidents(prev => [newIncident, ...prev]);
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  // Service handlers
  const handleAddService = async () => {
    try {
      const service = await servicesApi.create({
        name: newService.name,
        organizationId: newService.organizationId || organizations[0]?.id || 'default',
        status: newService.status
      });
      setServices(prev => [...prev, service]);
      setNewService({ name: '', status: 'OPERATIONAL', organizationId: '' });
      setShowAddService(false);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleUpdateServiceStatus = async (serviceId: string, status: string) => {
    try {
      const updatedService = await servicesApi.updateStatus(serviceId, status);
      setServices(prev => 
        prev.map(service => 
          service.id === serviceId ? updatedService : service
        )
      );
    } catch (error) {
      console.error('Error updating service status:', error);
    }
  };

  // Incident handlers
  const handleAddIncident = async () => {
    try {
      const incident = await incidentsApi.create({
        title: newIncident.title,
        description: newIncident.description,
        serviceId: newIncident.serviceId,
        organizationId: services[0]?.organizationId || 'default',
        status: newIncident.status
      });
      setIncidents(prev => [incident, ...prev]);
      setNewIncident({ title: '', description: '', serviceId: '', status: 'OPEN' });
      setShowAddIncident(false);
    } catch (error) {
      console.error('Error adding incident:', error);
    }
  };

  const handleAddUpdate = (incidentId: string) => {
    setShowAddUpdate(incidentId);
  };

  const handleUpdateAdded = () => {
    setShowAddUpdate(null);
    incidentsApi.getAll().then(setIncidents);
  };

  // User handlers
  const handleAddUser = async () => {
    try {
      const user = await usersApi.create(newUser);
      setUsers(prev => [...prev, user]);
      setNewUser({ email: '', name: '' });
      setShowAddUser(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await usersApi.delete(userId);
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Organization handlers
  const handleAddOrganization = async () => {
    try {
      const organization = await organizationsApi.create(newOrganization);
      setOrganizations(prev => [...prev, organization]);
      setNewOrganization({ name: '' });
      setShowAddOrganization(false);
    } catch (error) {
      console.error('Error adding organization:', error);
    }
  };

  const handleDeleteOrganization = async (orgId: string) => {
    try {
      await organizationsApi.delete(orgId);
      setOrganizations(prev => prev.filter(org => org.id !== orgId));
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };

  // Team management handlers
  const handleAddMember = async () => {
    try {
      const member = await membersApi.create(newMember);
      setMembers(prev => [...prev, member]);
      setNewMember({ userId: '', organizationId: '', role: 'member' });
      setShowAddMember(false);
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleUpdateMemberRole = async (memberId: string, role: string) => {
    try {
      const updatedMember = await membersApi.update(memberId, { role });
      setMembers(prev => 
        prev.map(member => 
          member.id === memberId ? updatedMember : member
        )
      );
    } catch (error) {
      console.error('Error updating member role:', error);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      await membersApi.delete(memberId);
      setMembers(prev => prev.filter(member => member.id !== memberId));
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const tabs = [
    { id: 'services', label: 'Services' },
    { id: 'incidents', label: 'Incidents' },
    { id: 'users', label: 'Users' },
    { id: 'organizations', label: 'Organizations' },
    { id: 'team', label: 'Team Management' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage services, incidents, users, and team access
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id as TabType)}
              className="whitespace-nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Services</h2>
              <Button onClick={() => setShowAddService(true)}>Add Service</Button>
            </div>

            {showAddService && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Add New Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Service Name"
                    value={newService.name}
                    onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Select
                    value={newService.organizationId}
                    onValueChange={(value) => setNewService(prev => ({ ...prev, organizationId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizations.map((org) => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={newService.status}
                    onValueChange={(value) => setNewService(prev => ({ ...prev, status: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OPERATIONAL">Operational</SelectItem>
                      <SelectItem value="DEGRADED">Degraded</SelectItem>
                      <SelectItem value="PARTIAL_OUTAGE">Partial Outage</SelectItem>
                      <SelectItem value="MAJOR_OUTAGE">Major Outage</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button onClick={handleAddService}>Add Service</Button>
                    <Button variant="outline" onClick={() => setShowAddService(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <div key={service.id}>
                  <ServiceCard service={service} />
                  <div className="mt-2">
                    <Select
                      value={service.status}
                      onValueChange={(value) => handleUpdateServiceStatus(service.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OPERATIONAL">Operational</SelectItem>
                        <SelectItem value="DEGRADED">Degraded</SelectItem>
                        <SelectItem value="PARTIAL_OUTAGE">Partial Outage</SelectItem>
                        <SelectItem value="MAJOR_OUTAGE">Major Outage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Incidents Tab */}
        {activeTab === 'incidents' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Incidents</h2>
              <Button onClick={() => setShowAddIncident(true)}>Add Incident</Button>
            </div>

            {showAddIncident && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Add New Incident</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Incident Title"
                    value={newIncident.title}
                    onChange={(e) => setNewIncident(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Incident Description"
                    value={newIncident.description}
                    onChange={(e) => setNewIncident(prev => ({ ...prev, description: e.target.value }))}
                  />
                  <Select
                    value={newIncident.serviceId}
                    onValueChange={(value) => setNewIncident(prev => ({ ...prev, serviceId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button onClick={handleAddIncident}>Add Incident</Button>
                    <Button variant="outline" onClick={() => setShowAddIncident(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id}>
                  <IncidentCard 
                    incident={incident} 
                    showAddUpdate={true}
                    onAddUpdate={() => handleAddUpdate(incident.id)}
                  />
                  {showAddUpdate === incident.id && (
                    <IncidentUpdateForm
                      incidentId={incident.id}
                      onUpdateAdded={handleUpdateAdded}
                      onCancel={() => setShowAddUpdate(null)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Users</h2>
              <Button onClick={() => setShowAddUser(true)}>Add User</Button>
            </div>

            {showAddUser && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Add New User</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  />
                  <Input
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleAddUser}>Add User</Button>
                    <Button variant="outline" onClick={() => setShowAddUser(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Organizations</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name || 'N/A'}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {user.orgs?.map((org) => (
                              <Badge key={org.id} variant="secondary">
                                {org.organization.name} ({org.role})
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Organizations Tab */}
        {activeTab === 'organizations' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Organizations</h2>
              <Button onClick={() => setShowAddOrganization(true)}>Add Organization</Button>
            </div>

            {showAddOrganization && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Add New Organization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Organization Name"
                    value={newOrganization.name}
                    onChange={(e) => setNewOrganization(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleAddOrganization}>Add Organization</Button>
                    <Button variant="outline" onClick={() => setShowAddOrganization(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {organizations.map((org) => (
                <Card key={org.id}>
                  <CardHeader>
                    <CardTitle>{org.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Services:</strong> {org.services?.length || 0}</p>
                      <p><strong>Incidents:</strong> {org.incidents?.length || 0}</p>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteOrganization(org.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Team Management Tab */}
        {activeTab === 'team' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Team Management</h2>
              <Button onClick={() => setShowAddMember(true)}>Add Member</Button>
            </div>

            {showAddMember && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Add Member to Organization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    value={newMember.userId}
                    onValueChange={(value) => setNewMember(prev => ({ ...prev, userId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name || user.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={newMember.organizationId}
                    onValueChange={(value) => setNewMember(prev => ({ ...prev, organizationId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizations.map((org) => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={newMember.role}
                    onValueChange={(value) => setNewMember(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button onClick={handleAddMember}>Add Member</Button>
                    <Button variant="outline" onClick={() => setShowAddMember(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Organization Members</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>{member.user.name || member.user.email}</TableCell>
                        <TableCell>{member.organization.name}</TableCell>
                        <TableCell>
                          <Select
                            value={member.role}
                            onValueChange={(value) => handleUpdateMemberRole(member.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="member">Member</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
