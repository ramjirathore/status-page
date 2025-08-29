import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { incidentUpdatesApi } from '@/services/api';

interface IncidentUpdateFormProps {
  incidentId: string;
  onUpdateAdded: () => void;
  onCancel: () => void;
}

export function IncidentUpdateForm({ incidentId, onUpdateAdded, onCancel }: IncidentUpdateFormProps) {
  const [update, setUpdate] = useState({
    message: '',
    status: 'OPEN'
  });

  const handleSubmit = async () => {
    try {
      await incidentUpdatesApi.create({
        incidentId,
        message: update.message,
        status: update.status
      });
      setUpdate({ message: '', status: 'OPEN' });
      onUpdateAdded();
    } catch (error) {
      console.error('Error adding update:', error);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Add Update</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Update message"
          value={update.message}
          onChange={(e) => setUpdate(prev => ({ ...prev, message: e.target.value }))}
        />
        <Select
          value={update.status}
          onValueChange={(value) => setUpdate(prev => ({ ...prev, status: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
            <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button onClick={handleSubmit} disabled={!update.message.trim()}>
            Add Update
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
