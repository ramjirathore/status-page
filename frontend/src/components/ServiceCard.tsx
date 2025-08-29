import { Service } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  service: Service;
}

const getStatusColor = (status: Service['status']) => {
  switch (status) {
    case 'OPERATIONAL':
      return 'bg-green-500';
    case 'DEGRADED':
      return 'bg-yellow-500';
    case 'PARTIAL_OUTAGE':
      return 'bg-orange-500';
    case 'MAJOR_OUTAGE':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusText = (status: Service['status']) => {
  switch (status) {
    case 'OPERATIONAL':
      return 'Operational';
    case 'DEGRADED':
      return 'Degraded Performance';
    case 'PARTIAL_OUTAGE':
      return 'Partial Outage';
    case 'MAJOR_OUTAGE':
      return 'Major Outage';
    default:
      return 'Unknown';
  }
};

export function ServiceCard({ service }: ServiceCardProps) {
  const activeIncidents = service.incidents.filter(incident => incident.status === 'OPEN');

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{service.name}</CardTitle>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`} />
            <Badge variant="secondary" className="text-xs">
              {getStatusText(service.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {activeIncidents.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {activeIncidents.length} active incident{activeIncidents.length !== 1 ? 's' : ''}
            </p>
            {activeIncidents.slice(0, 2).map((incident) => (
              <div key={incident.id} className="p-2 bg-muted rounded-md">
                <p className="text-sm font-medium">{incident.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(incident.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
            {activeIncidents.length > 2 && (
              <p className="text-xs text-muted-foreground">
                +{activeIncidents.length - 2} more incident{activeIncidents.length - 2 !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
