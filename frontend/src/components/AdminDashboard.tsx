import { useState, useEffect } from 'react';
import { Service, Incident } from '@/types';
import { servicesApi, incidentsApi } from '@/services/api';
import { socketService } from '@/services/socket';
import { ServiceCard } from './ServiceCard';
import { IncidentCard } from './IncidentCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function AdminDashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddService, setShowAddService] = useState(false);
  const [showAddIncident, setShowAddIncident] = useState(false);
  const [newService, setNewService] = useState({ name: '', status: 'OPERATIONAL' });
  const [newIncident, setNewIncident] = useState({ 
    title: '', 
    description: '', 
    serviceId: '', 
    status: 'OPEN' 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, incidentsData] = await Promise.all([
          servicesApi.getAll(),
          incidentsApi.getAll()
        ]);
        setServices(servicesData);
        setIncidents(incidentsData);
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

  const handleAddService = async () => {
    try {
      const service = await servicesApi.create({
        name: newService.name,
        organizationId: services[0]?.organizationId || 'default',
        status: newService.status
      });
      setServices(prev => [...prev, service]);
      setNewService({ name: '', status: 'OPERATIONAL' });
      setShowAddService(false);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage services and incidents
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button onClick={() => setShowAddService(true)}>
            Add Service
          </Button>
          <Button onClick={() => setShowAddIncident(true)}>
            Add Incident
          </Button>
        </div>

        {/* Add Service Modal */}
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

        {/* Add Incident Modal */}
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

        {/* Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Services</h2>
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

        {/* Incidents */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">All Incidents</h2>
          <div className="space-y-4">
            {incidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
