import { useState, useEffect } from 'react';
import { Service, Incident } from '@/types';
import { servicesApi, incidentsApi } from '@/services/api';
import { socketService } from '@/services/socket';
import { ServiceCard } from './ServiceCard';
import { IncidentCard } from './IncidentCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PublicStatusPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

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
    socketService.connect();

    // Listen for service status updates
    socketService.onServiceStatusUpdate((updatedService) => {
      setServices(prev => 
        prev.map(service => 
          service.id === updatedService.id ? updatedService : service
        )
      );
    });

    // Listen for incident updates
    socketService.onIncidentUpdate((updatedIncident) => {
      setIncidents(prev => 
        prev.map(incident => 
          incident.id === updatedIncident.id ? updatedIncident : incident
        )
      );
    });

    // Listen for new incidents
    socketService.onIncidentCreated((newIncident) => {
      setIncidents(prev => [newIncident, ...prev]);
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const operationalServices = services.filter(s => s.status === 'OPERATIONAL').length;
  const totalServices = services.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            System Status
          </h1>
          <p className="text-lg text-gray-600">
            Real-time status of our services and systems
          </p>
        </div>

        {/* Overall Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Overall System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-green-600">
                {operationalServices}/{totalServices}
              </div>
              <div>
                <p className="text-sm text-gray-600">Services Operational</p>
                <p className="text-xs text-gray-500">
                  {totalServices - operationalServices} service{totalServices - operationalServices !== 1 ? 's' : ''} experiencing issues
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Incidents */}
        {incidents.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Active Incidents</h2>
            <div className="space-y-4">
              {incidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          </div>
        )}

        {incidents.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-600">No active incidents at this time.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
