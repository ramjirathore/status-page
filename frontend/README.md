# Status Page Frontend

A modern React application for displaying and managing service status and incidents with real-time updates. This application provides a comprehensive status page solution with both public-facing status display and administrative management capabilities.

## 🌐 Live Demo

**Frontend Deployment**: [https://status-page-gamma-three.vercel.app/](https://status-page-gamma-three.vercel.app/)

**Backend API**: [https://status-page-bx79.onrender.com/api](https://status-page-bx79.onrender.com/api)

## ✨ What This Service Includes

### Core Features
- **Real-time Status Monitoring**: Live updates of service status and incidents using Socket.IO
- **Public Status Page**: Clean, professional status page for end users
- **Admin Dashboard**: Comprehensive management interface for administrators
- **Multi-organization Support**: Manage multiple organizations and their services
- **Incident Management**: Full incident lifecycle management with updates
- **Team Management**: User roles and permissions system
- **Service Health Tracking**: Monitor service status with visual indicators

### Technical Features
- **Real-time Updates**: Instant synchronization across all connected clients
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Modern UI/UX**: Built with shadcn/ui components
- **API Integration**: RESTful API with comprehensive endpoints
- **Database Integration**: PostgreSQL with Prisma ORM

## 🚀 Features

### Public Status Page
- **Overall System Status**: Real-time summary of operational vs. non-operational services
- **Service Cards**: Individual service status with visual indicators and incident counts
- **Active Incidents**: Live list of current incidents with detailed information
- **Real-time Updates**: Instant updates when status changes occur
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices

### Admin Dashboard
- **Service Management**: Full CRUD operations for services
- **Incident Management**: Create, update, and resolve incidents
- **Incident Updates**: Add progress updates to ongoing incidents
- **User Management**: Manage users and their roles
- **Organization Management**: Handle multiple organizations
- **Team Management**: Assign users to organizations with specific roles
- **Real-time Collaboration**: See changes immediately across all connected clients

### Status Indicators
- 🟢 **Operational** - Service is working normally
- 🟡 **Degraded** - Service is experiencing performance issues
- 🟠 **Partial Outage** - Service is partially unavailable
- 🔴 **Major Outage** - Service is completely unavailable
- 🟣 **Maintenance** - Service is under scheduled maintenance

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui components
- **Real-time Communication**: Socket.IO Client
- **HTTP Client**: Axios for API communication
- **State Management**: React hooks and context
- **Type Safety**: TypeScript throughout the application
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React icons

## 📋 Prerequisites

- **Node.js**: Version 18 or higher
- **npm or yarn**: Package manager
- **Backend Server**: Running backend API (see backend README)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ramjirathore/status-page.git
cd status-page/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the frontend root directory:

```env
# API Configuration
VITE_API_URL="https://status-page-bx79.onrender.com/api"

# Socket.IO Configuration
VITE_SOCKET_URL="https://status-page-bx79.onrender.com"

# For local development, use:
# VITE_API_URL="http://localhost:3001/api"
# VITE_SOCKET_URL="http://localhost:3001"
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   └── textarea.tsx
│   │   ├── AdminDashboard.tsx      # Admin management interface
│   │   ├── IncidentCard.tsx        # Incident display component
│   │   ├── IncidentUpdateForm.tsx  # Incident update form
│   │   ├── LoginForm.tsx           # Authentication form
│   │   ├── PublicStatusPage.tsx    # Public status display
│   │   └── ServiceCard.tsx         # Service display component
│   ├── services/           # API and Socket services
│   │   ├── api.ts          # API client and endpoints
│   │   └── socket.ts       # Socket.IO client service
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # Application types
│   ├── lib/                # Utility functions
│   │   └── utils.ts        # Common utilities
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🧪 Testing

### Manual Testing

#### 1. Public Status Page Testing

1. **Navigate to Public Status**:
   - Open the application
   - Click "Public Status" in the navigation

2. **Verify Service Display**:
   - Check that all services are displayed with correct status
   - Verify status indicators (colored dots) match the status
   - Confirm incident count is shown for services with active incidents

3. **Test Real-time Updates**:
   - Login and open the admin dashboard in another tab
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
   fetch('https://status-page-bx79.onrender.com/api/services')
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
curl https://status-page-bx79.onrender.com/api/services

# Test incidents endpoint
curl https://status-page-bx79.onrender.com/api/incidents

# Create a test service
curl -X POST https://status-page-bx79.onrender.com/api/services \
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
   const socket = io('https://status-page-bx79.onrender.com');
   
   socket.on('connect', () => {
     console.log('Connected to server');
   });
   
   socket.on('service_status_updated', (service) => {
     console.log('Service updated:', service);
   });
   ```

## 🚀 Deployment

### Vercel Deployment

The application is deployed on Vercel at: [https://status-page-gamma-three.vercel.app/](https://status-page-gamma-three.vercel.app/)

#### Deployment Steps:

1. **Connect Repository**:
   - Connect your GitHub repository to Vercel
   - Set the root directory to `frontend`

2. **Environment Variables**:
   ```env
   VITE_API_URL="https://status-page-bx79.onrender.com/api"
   VITE_SOCKET_URL="https://status-page-bx79.onrender.com"
   ```

3. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Other Deployment Options

#### Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

#### GitHub Pages
```bash
# Add to package.json
npm install --save-dev gh-pages

# Add scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

## 🔧 Development Commands

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

## 🌍 Environment Variables

| Variable | Description | Default | Production |
|----------|-------------|---------|------------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3001/api` | `https://status-page-bx79.onrender.com/api` |
| `VITE_SOCKET_URL` | Socket.IO server URL | `http://localhost:3001` | `https://status-page-bx79.onrender.com` |

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**:
   - Ensure backend server is running
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

## ⚡ Performance Optimization

1. **Code Splitting**: Components are lazy-loaded where appropriate
2. **Memoization**: React.memo used for performance-critical components
3. **Efficient Re-renders**: Proper dependency arrays in useEffect hooks
4. **Bundle Optimization**: Vite provides optimized builds
5. **Real-time Updates**: Efficient Socket.IO event handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Live Demo**: [https://status-page-gamma-three.vercel.app/](https://status-page-gamma-three.vercel.app/)
- **Backend API**: [https://status-page-bx79.onrender.com/api](https://status-page-bx79.onrender.com/api)
- **GitHub Repository**: https://github.com/ramjirathore/status-page
---

**Built with ❤️ using React, TypeScript, and Socket.IO**
