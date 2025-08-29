import { Incident } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface IncidentCardProps {
  incident: Incident;
  showAddUpdate?: boolean;
  onAddUpdate?: () => void;
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

export function IncidentCard({ incident, showAddUpdate, onAddUpdate }: IncidentCardProps) {
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
        
        {/* Incident Updates */}
        {incident.updates && incident.updates.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-medium mb-2">Recent Updates</h4>
            <div className="space-y-2">
              {incident.updates.slice(0, 2).map((update) => (
                <div key={update.id} className="text-xs bg-muted p-2 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline" className="text-xs">
                      {update.status}
                    </Badge>
                    <span className="text-muted-foreground">
                      {new Date(update.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{update.message}</p>
                </div>
              ))}
              {incident.updates.length > 2 && (
                <p className="text-xs text-muted-foreground">
                  +{incident.updates.length - 2} more updates
                </p>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Service: {incident.service.name}</span>
          <span>{new Date(incident.createdAt).toLocaleDateString()}</span>
        </div>
        
        {showAddUpdate && onAddUpdate && (
          <div className="mt-3 pt-3 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onAddUpdate}
              className="w-full"
            >
              Add Update
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
