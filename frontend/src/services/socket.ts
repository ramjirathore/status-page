import { io, Socket } from 'socket.io-client';
import { Service, Incident } from '@/types';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://status-page-bx79.onrender.com';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL);
      
      this.socket.on('connect', () => {
        console.log('Connected to server');
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onServiceStatusUpdate(callback: (service: Service) => void) {
    if (this.socket) {
      this.socket.on('service_status_updated', callback);
    }
  }

  onIncidentUpdate(callback: (incident: Incident) => void) {
    if (this.socket) {
      this.socket.on('incident_updated', callback);
    }
  }

  onIncidentCreated(callback: (incident: Incident) => void) {
    if (this.socket) {
      this.socket.on('incident_created', callback);
    }
  }

  off(event: string) {
    if (this.socket) {
      this.socket.off(event);
    }
  }
}

export const socketService = new SocketService();
export default socketService;
