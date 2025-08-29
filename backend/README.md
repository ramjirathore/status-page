# Status Page Backend API

A comprehensive Node.js backend API for the status page application with real-time updates, user authentication, team management, and incident timeline features.

## 🚀 Features

- **Complete User Management**: User authentication and profile management
- **Team Management**: Role-based organization membership (admin/member)
- **Multi-tenant Organizations**: Support for multiple organizations
- **Service Management**: CRUD operations with real-time status updates
- **Incident Management**: Complete incident lifecycle with timeline updates
- **Real-time Updates**: Socket.IO integration for live status updates
- **Database Management**: Prisma ORM with SQLite (easily switchable to PostgreSQL)
- **Type Safety**: Full TypeScript support
- **Error Handling**: Comprehensive error handling and validation
- **CORS Support**: Configured for frontend integration

## 🛠 Tech Stack

- **Node.js** with Express
- **Prisma ORM** with SQLite database
- **Socket.IO** for real-time communication
- **TypeScript** for type safety
- **CORS** for cross-origin requests

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
FRONTEND_URL="http://localhost:5173"
PORT=3001
```

### 3. Database Setup

Initialize the database and run migrations:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database with sample data
npm run seed
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

## 📚 API Endpoints (32 Total)

### Health Check
- **GET** `/health` - Server health status

### Users API (5 endpoints)

#### Get All Users
```http
GET /api/users
```
**Response:**
```json
[
  {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "orgs": [
      {
        "id": "member_id",
        "role": "admin",
        "organization": { ... }
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get User by ID
```http
GET /api/users/:id
```

#### Create New User
```http
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "User Name"
}
```

#### Update User
```http
PUT /api/users/:id
Content-Type: application/json

{
  "email": "updated@example.com",
  "name": "Updated Name"
}
```

#### Delete User
```http
DELETE /api/users/:id
```

### Team Management API (5 endpoints)

#### Get Organization Members
```http
GET /api/members/organization/:orgId
```
**Response:**
```json
[
  {
    "id": "member_id",
    "userId": "user_id",
    "organizationId": "org_id",
    "role": "admin",
    "user": { ... },
    "organization": { ... },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get User's Organizations
```http
GET /api/members/user/:userId
```

#### Add Member to Organization
```http
POST /api/members
Content-Type: application/json

{
  "userId": "user_id",
  "organizationId": "org_id",
  "role": "member"
}
```

#### Update Member Role
```http
PUT /api/members/:id
Content-Type: application/json

{
  "role": "admin"
}
```

#### Remove Member from Organization
```http
DELETE /api/members/:id
```

### Organizations API (5 endpoints)

#### Get All Organizations
```http
GET /api/organizations
```

#### Get Organization by ID
```http
GET /api/organizations/:id
```

#### Create New Organization
```http
POST /api/organizations
Content-Type: application/json

{
  "name": "New Organization"
}
```

#### Update Organization
```http
PUT /api/organizations/:id
Content-Type: application/json

{
  "name": "Updated Organization Name"
}
```

#### Delete Organization
```http
DELETE /api/organizations/:id
```

### Services API (6 endpoints)

#### Get All Services
```http
GET /api/services
```
**Response:**
```json
[
  {
    "id": "service_id",
    "name": "Website",
    "status": "OPERATIONAL",
    "organizationId": "org_id",
    "organization": { ... },
    "incidents": [ ... ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Services by Organization
```http
GET /api/services/organization/:orgId
```

#### Create New Service
```http
POST /api/services
Content-Type: application/json

{
  "name": "New Service",
  "organizationId": "org_id",
  "status": "OPERATIONAL"
}
```

#### Update Service Status
```http
PATCH /api/services/:id/status
Content-Type: application/json

{
  "status": "DEGRADED"
}
```

#### Update Service
```http
PUT /api/services/:id
Content-Type: application/json

{
  "name": "Updated Service Name",
  "status": "OPERATIONAL"
}
```

#### Delete Service
```http
DELETE /api/services/:id
```

### Incidents API (6 endpoints)

#### Get All Incidents
```http
GET /api/incidents
```
**Response:**
```json
[
  {
    "id": "incident_id",
    "title": "Service Outage",
    "description": "Service is experiencing issues",
    "status": "OPEN",
    "serviceId": "service_id",
    "organizationId": "org_id",
    "service": { ... },
    "organization": { ... },
    "updates": [
      {
        "id": "update_id",
        "message": "Investigation in progress",
        "status": "OPEN",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Incidents by Organization
```http
GET /api/incidents/organization/:orgId
```

#### Create New Incident
```http
POST /api/incidents
Content-Type: application/json

{
  "title": "New Incident",
  "description": "Incident description",
  "serviceId": "service_id",
  "organizationId": "org_id",
  "status": "OPEN"
}
```

#### Update Incident Status
```http
PATCH /api/incidents/:id/status
Content-Type: application/json

{
  "status": "RESOLVED"
}
```

#### Update Incident
```http
PUT /api/incidents/:id
Content-Type: application/json

{
  "title": "Updated Incident Title",
  "description": "Updated description",
  "status": "OPEN"
}
```

#### Delete Incident
```http
DELETE /api/incidents/:id
```

### Incident Updates API (4 endpoints)

#### Get Incident Updates
```http
GET /api/incident-updates/incident/:incidentId
```
**Response:**
```json
[
  {
    "id": "update_id",
    "incidentId": "incident_id",
    "message": "Investigation in progress",
    "status": "OPEN",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Add Update to Incident
```http
POST /api/incident-updates
Content-Type: application/json

{
  "incidentId": "incident_id",
  "message": "Update message",
  "status": "OPEN"
}
```

#### Update Incident Update
```http
PUT /api/incident-updates/:id
Content-Type: application/json

{
  "message": "Updated message",
  "status": "RESOLVED"
}
```

#### Delete Incident Update
```http
DELETE /api/incident-updates/:id
```

## 🔄 Real-time Events (Socket.IO)

The backend emits the following real-time events:

### Service Events
- `service_status_updated` - Emitted when service status changes
  ```json
  {
    "id": "service_id",
    "name": "Service Name",
    "status": "DEGRADED",
    "organization": { ... },
    "incidents": [ ... ]
  }
  ```

### Incident Events
- `incident_created` - Emitted when new incident is created
- `incident_updated` - Emitted when incident is updated (includes timeline)
  ```json
  {
    "id": "incident_id",
    "title": "Incident Title",
    "description": "Description",
    "status": "OPEN",
    "service": { ... },
    "organization": { ... },
    "updates": [ ... ]
  }
  ```

## 🗄️ Database Schema

### Core Models

#### User
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  orgs      OrganizationMember[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Organization
```prisma
model Organization {
  id        String   @id @default(cuid())
  name      String
  members   OrganizationMember[]
  services  Service[]
  incidents Incident[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### OrganizationMember
```prisma
model OrganizationMember {
  id             String        @id @default(cuid())
  userId         String
  organizationId String
  role           String        // "admin" | "member"
  user           User          @relation(fields: [userId], references: [id])
  organization   Organization  @relation(fields: [organizationId], references: [id])
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt

  @@unique([userId, organizationId])
}
```

#### Service
```prisma
model Service {
  id             String        @id @default(cuid())
  name           String
  status         ServiceStatus @default(OPERATIONAL)
  organizationId String
  organization   Organization  @relation(fields: [organizationId], references: [id])
  incidents      Incident[]
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
}
```

#### Incident
```prisma
model Incident {
  id             String        @id @default(cuid())
  title          String
  description    String
  status         IncidentStatus @default(OPEN)
  serviceId      String
  organizationId String
  service        Service       @relation(fields: [serviceId], references: [id])
  organization   Organization  @relation(fields: [organizationId], references: [id])
  updates        IncidentUpdate[]
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
}
```

#### IncidentUpdate
```prisma
model IncidentUpdate {
  id         String   @id @default(cuid())
  incidentId String
  incident   Incident @relation(fields: [incidentId], references: [id], onDelete: Cascade)
  message    String
  status     IncidentStatus
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

### Enums

#### Service Status Enum
- `OPERATIONAL` - Service is working normally
- `DEGRADED` - Service is experiencing performance issues
- `PARTIAL_OUTAGE` - Service is partially unavailable
- `MAJOR_OUTAGE` - Service is completely unavailable

#### Incident Status Enum
- `OPEN` - Incident is active and being investigated
- `RESOLVED` - Incident has been resolved
- `MAINTENANCE` - Incident is scheduled maintenance

## 🧪 Testing the API

### Using curl

#### Test Health Endpoint
```bash
curl http://localhost:3001/health
```

#### Get All Users
```bash
curl http://localhost:3001/api/users
```

#### Create a New User
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User"
  }'
```

#### Add User to Organization
```bash
curl -X POST http://localhost:3001/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id",
    "organizationId": "org_id",
    "role": "member"
  }'
```

#### Get All Services
```bash
curl http://localhost:3001/api/services
```

#### Create a New Service
```bash
curl -X POST http://localhost:3001/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Service",
    "organizationId": "your_org_id",
    "status": "OPERATIONAL"
  }'
```

#### Update Service Status
```bash
curl -X PATCH http://localhost:3001/api/services/service_id/status \
  -H "Content-Type: application/json" \
  -d '{"status": "DEGRADED"}'
```

#### Create a New Incident
```bash
curl -X POST http://localhost:3001/api/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Incident",
    "description": "This is a test incident",
    "serviceId": "service_id",
    "organizationId": "org_id",
    "status": "OPEN"
  }'
```

#### Add Update to Incident
```bash
curl -X POST http://localhost:3001/api/incident-updates \
  -H "Content-Type: application/json" \
  -d '{
    "incidentId": "incident_id",
    "message": "Investigation in progress",
    "status": "OPEN"
  }'
```

### Using Postman

Import the complete API collection from the root `API_Testing_Collection.md` file, which includes all 32 endpoints with proper environment variables and sample data.

### Testing Real-time Events

1. Connect to Socket.IO:
```javascript
const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('service_status_updated', (service) => {
  console.log('Service updated:', service);
});

socket.on('incident_created', (incident) => {
  console.log('New incident:', incident);
});

socket.on('incident_updated', (incident) => {
  console.log('Incident updated:', incident);
});
```

## 🛠 Development Commands

```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed

# Open Prisma Studio (database GUI)
npx prisma studio

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset
```

## 📊 Sample Data

The seed script creates:

- **2 Users**: admin@techcorp.com, member@techcorp.com
- **1 Organization**: TechCorp Inc.
- **4 Services**: Website, API, Database, Email Service
- **2 Active Incidents**: With timeline updates
- **Team Members**: Admin and member roles assigned

## ⚠️ Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `204` - No Content (for DELETE operations)
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `file:./dev.db` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `PORT` | Server port | `3001` |

## 🚀 Production Deployment

1. **Database Setup**:
   - Use PostgreSQL for production
   - Update `DATABASE_URL` in environment variables
   - Run `npx prisma migrate deploy`

2. **Environment Variables**:
   - Set `NODE_ENV=production`
   - Configure production database URL
   - Set frontend URL for CORS

3. **Deployment Platforms**:
   - **Railway**: Connect GitHub repo and set environment variables
   - **Render**: Deploy from GitHub with build command `npm install && npx prisma migrate deploy`
   - **Heroku**: Add PostgreSQL addon and set environment variables

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Ensure SQLite file is writable
   - Check `DATABASE_URL` in `.env`

2. **CORS Errors**:
   - Verify `FRONTEND_URL` in environment variables
   - Check if frontend is running on correct port

3. **Socket.IO Connection Issues**:
   - Ensure frontend URL is correct
   - Check if server is running on expected port

4. **Migration Errors**:
   - Run `npx prisma migrate reset` to reset database
   - Ensure all migrations are applied

### Logs

Enable debug logging by setting:
```bash
DEBUG=* npm run dev
```

## 📈 API Statistics

- **Total Endpoints**: 32
- **Authentication**: User management system
- **Team Management**: Role-based access control
- **Real-time Events**: 3 Socket.IO events
- **Database Models**: 6 core models
- **Status Enums**: 2 enums with 7 total statuses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Documentation

- [Frontend README](../status-frontend/README.md)
- [API Testing Collection](../API_Testing_Collection.md)
- [Complete Project README](../README.md)
