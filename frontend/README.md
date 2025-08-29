# Status Page Frontend

A modern React application for displaying and managing service status and incidents with real-time updates.

## Features

- **Public Status Page**: Real-time display of all services and active incidents
- **Admin Dashboard**: Full CRUD operations for managing services and incidents
- **Real-time Updates**: Live updates using Socket.IO
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-friendly interface
- **Status Indicators**: Visual status indicators for services and incidents

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Socket.IO Client** for real-time updates
- **Axios** for API communication

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running (see backend README)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_URL="http://localhost:3001/api"
VITE_SOCKET_URL="http://localhost:3001"
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── ServiceCard.tsx  # Service display component
│   ├── IncidentCard.tsx # Incident display component
│   ├── PublicStatusPage.tsx # Public status page
│   └── AdminDashboard.tsx # Admin dashboard
├── services/            # API and Socket services
│   ├── api.ts          # API client and endpoints
│   └── socket.ts       # Socket.IO client
├── types/              # TypeScript type definitions
│   └── index.ts        # Application types
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Application Features

### Public Status Page

The public status page displays:
- **Overall System Status**: Summary of operational vs. non-operational services
- **Service Cards**: Individual service status with visual indicators
- **Active Incidents**: List of current incidents with details
- **Real-time Updates**: Live updates when status changes

#### Service Status Indicators

- 🟢 **Operational** - Service is working normally
- 🟡 **Degraded** - Service is experiencing performance issues
- 🟠 **Partial Outage** - Service is partially unavailable
- 🔴 **Major Outage** - Service is completely unavailable

### Admin Dashboard

The admin dashboard provides:
- **Service Management**: Add, edit, and update service status
- **Incident Management**: Create and manage incidents
- **Real-time Updates**: See changes immediately across all connected clients
- **Status Controls**: Dropdown selectors for quick status updates

## Testing the Application

### Manual Testing

#### 1. Public Status Page Testing

1. **Navigate to Public Status**:
   - Open `http://localhost:5173`
   - Click "Public Status" in the navigation

2. **Verify Service Display**:
   - Check that all services are displayed with correct status
   - Verify status indicators (colored dots) match the status
   - Confirm incident count is shown for services with active incidents

3. **Test Real-time Updates**:
   - Open the admin dashboard in another tab
   - Change a service status
   - Verify the change appears immediately on the public page

#### 2. Admin Dashboard Testing

1. **Navigate to Admin Dashboard**:
   - Click "Admin Dashboard" in the navigation

2. **Test Service Management**:
   - Click "Add Service" button
   - Fill in service name and select status
   - Click "Add Service" to create
   - Verify the service appears in the list

3. **Test Status Updates**:
   - Use the dropdown on any service card
   - Change the status
   - Verify the change is reflected immediately

4. **Test Incident Management**:
   - Click "Add Incident" button
   - Fill in incident details (title, description, service)
   - Click "Add Incident" to create
   - Verify the incident appears in the list

### Automated Testing

#### Using Browser Developer Tools

1. **Console Testing**:
   ```javascript
   // Check if Socket.IO is connected
   // Open browser console and verify no connection errors
   
   // Test API endpoints
   fetch('http://localhost:3001/api/services')
     .then(res => res.json())
     .then(data => console.log('Services:', data));
   ```

2. **Network Tab Testing**:
   - Open Developer Tools → Network tab
   - Perform actions in the app
   - Verify API calls are made correctly
   - Check response status codes

#### Using Postman or curl

Test the backend API directly:

```bash
# Test services endpoint
curl http://localhost:3001/api/services

# Test incidents endpoint
curl http://localhost:3001/api/incidents

# Create a test service
curl -X POST http://localhost:3001/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Service",
    "organizationId": "your_org_id",
    "status": "OPERATIONAL"
  }'
```

### Real-time Testing

1. **Open Multiple Tabs**:
   - Open the application in multiple browser tabs
   - Navigate to different views (public/admin)

2. **Test Real-time Updates**:
   - Make changes in the admin dashboard
   - Verify changes appear immediately in other tabs
   - Test both service status and incident updates

3. **Socket Connection Testing**:
   ```javascript
   // In browser console
   const socket = io('http://localhost:3001');
   
   socket.on('connect', () => {
     console.log('Connected to server');
   });
   
   socket.on('service_status_updated', (service) => {
     console.log('Service updated:', service);
   });
   ```

## Component Testing

### ServiceCard Component

```typescript
// Test different service statuses
const testService = {
  id: '1',
  name: 'Test Service',
  status: 'OPERATIONAL' as const,
  organizationId: 'org1',
  organization: { id: 'org1', name: 'Test Org' },
  incidents: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Test with incidents
const serviceWithIncidents = {
  ...testService,
  incidents: [
    {
      id: 'inc1',
      title: 'Test Incident',
      description: 'Test description',
      status: 'OPEN' as const,
      serviceId: '1',
      organizationId: 'org1',
      service: testService,
      organization: { id: 'org1', name: 'Test Org' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
};
```

### IncidentCard Component

```typescript
// Test different incident statuses
const testIncident = {
  id: '1',
  title: 'Test Incident',
  description: 'Test description',
  status: 'OPEN' as const,
  serviceId: '1',
  organizationId: 'org1',
  service: { id: '1', name: 'Test Service' },
  organization: { id: 'org1', name: 'Test Org' },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Lint code
npm run lint
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3001/api` |
| `VITE_SOCKET_URL` | Socket.IO server URL | `http://localhost:3001` |

## Troubleshooting

### Common Issues

1. **API Connection Errors**:
   - Ensure backend server is running on port 3001
   - Check `VITE_API_URL` in environment variables
   - Verify CORS is configured on backend

2. **Socket.IO Connection Issues**:
   - Check `VITE_SOCKET_URL` in environment variables
   - Ensure backend Socket.IO server is running
   - Check browser console for connection errors

3. **Build Errors**:
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run type-check`
   - Verify all dependencies are installed

4. **Styling Issues**:
   - Ensure Tailwind CSS is properly configured
   - Check if shadcn/ui components are installed
   - Verify CSS imports in main.tsx

### Debug Mode

Enable debug logging:

```bash
# Set debug environment variable
DEBUG=* npm run dev
```

### Browser Compatibility

The application supports:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Optimization

1. **Code Splitting**: Components are lazy-loaded where appropriate
2. **Memoization**: React.memo used for performance-critical components
3. **Efficient Re-renders**: Proper dependency arrays in useEffect hooks
4. **Bundle Optimization**: Vite provides optimized builds

## Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

### Deployment Platforms

1. **Vercel**:
   - Connect GitHub repository
   - Set environment variables
   - Deploy automatically

2. **Netlify**:
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **GitHub Pages**:
   - Add `gh-pages` package
   - Configure deployment in package.json

### Environment Variables for Production

```env
VITE_API_URL="https://your-backend-url.com/api"
VITE_SOCKET_URL="https://your-backend-url.com"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
