# Status Page Application

A real-time status page application built with React, Node.js, and Socket.IO for monitoring services and incidents.

## Features

- **Public Status Page**: Real-time display of service status and active incidents
- **Admin Dashboard**: Manage services and incidents with CRUD operations
- **Real-time Updates**: Live updates using Socket.IO
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **TypeScript**: Full type safety for both frontend and backend

## Tech Stack

### Backend
- **Node.js** with Express
- **Prisma ORM** with SQLite database
- **Socket.IO** for real-time communication
- **TypeScript** for type safety

### Frontend
- **React** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Socket.IO Client** for real-time updates
- **Axios** for API communication

## Project Structure

```
status-page/
├── status-backend/          # Backend API server
│   ├── prisma/             # Database schema and migrations
│   ├── routes/             # API route handlers
│   ├── server.js           # Main server file
│   └── package.json
├── status-frontend/        # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API and Socket services
│   │   ├── types/          # TypeScript type definitions
│   │   └── App.tsx         # Main application component
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Demo Accounts

The application comes with pre-configured demo accounts:

- **Admin User**: `admin@techcorp.com` (Full admin access)
- **Member User**: `member@techcorp.com` (Limited access)
- **Password**: `admin123` or leave empty

**Note**: Only existing users can login. New user registration is not available in this demo version.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd status-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

4. Seed the database with sample data:
   ```bash
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be running on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd status-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be running on `http://localhost:5173`

## API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/organization/:orgId` - Get services by organization
- `POST /api/services` - Create new service
- `PATCH /api/services/:id/status` - Update service status
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Incidents
- `GET /api/incidents` - Get all incidents
- `GET /api/incidents/organization/:orgId` - Get incidents by organization
- `POST /api/incidents` - Create new incident
- `PATCH /api/incidents/:id/status` - Update incident status
- `PUT /api/incidents/:id` - Update incident
- `DELETE /api/incidents/:id` - Delete incident

### Organizations
- `GET /api/organizations` - Get all organizations
- `GET /api/organizations/:id` - Get organization by ID
- `POST /api/organizations` - Create new organization
- `PUT /api/organizations/:id` - Update organization
- `DELETE /api/organizations/:id` - Delete organization

## Real-time Events

The application uses Socket.IO for real-time updates:

- `service_status_updated` - Emitted when service status changes
- `incident_updated` - Emitted when incident is updated
- `incident_created` - Emitted when new incident is created

## Database Schema

The application uses the following main entities:

- **User**: System users
- **Organization**: Companies or organizations
- **Service**: Services being monitored
- **Incident**: Issues or maintenance events
- **OrganizationMember**: User-organization relationships

## Environment Variables

### Backend (.env)
```
DATABASE_URL="file:./dev.db"
FRONTEND_URL="http://localhost:5173"
```

### Frontend (.env)
```
VITE_API_URL="http://localhost:3001/api"
VITE_SOCKET_URL="http://localhost:3001"
```

## Development

### Backend Commands
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data
- `npx prisma studio` - Open Prisma Studio for database management

### Frontend Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Deployment

### Backend Deployment
1. Set up a production database (PostgreSQL recommended)
2. Update DATABASE_URL in environment variables
3. Run `npx prisma migrate deploy`
4. Deploy to your preferred platform (Railway, Render, etc.)

### Frontend Deployment
1. Update environment variables for production
2. Run `npm run build`
3. Deploy the `dist` folder to your preferred platform (Vercel, Netlify, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
