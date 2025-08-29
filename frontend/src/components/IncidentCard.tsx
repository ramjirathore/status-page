import { Incident } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface IncidentCardProps {
  incident: Incident;
}

const getStatusColor = (status: Incident['status']) => {
  switch (status) {
    case 'OPEN':
      return 'bg-red-500';
    case 'RESOLVED':
      return 'bg-green-500';
    case 'MAINTENANCE':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusText = (status: Incident['status']) => {
  switch (status) {
    case 'OPEN':
      return 'Open';
    case 'RESOLVED':
      return 'Resolved';
    case 'MAINTENANCE':
      return 'Maintenance';
    default:
      return 'Unknown';
  }
};

export function IncidentCard({ incident }: IncidentCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{incident.title}</CardTitle>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(incident.status)}`} />
            <Badge variant="secondary" className="text-xs">
              {getStatusText(incident.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{incident.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Service: {incident.service.name}</span>
          <span>{new Date(incident.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
