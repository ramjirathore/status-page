# Status Page API Testing Collection

## 🚀 Quick Start
1. Copy the JSON collection below
2. Open Postman
3. Click "Import" → Paste the JSON → Import
4. All requests will be ready to test!

## 📋 API Endpoints Overview

### Health Check
- `GET /health` - Server health status

### Services API
- `GET /api/services` - Get all services
- `GET /api/services/organization/:orgId` - Get services by organization
- `POST /api/services` - Create new service
- `PATCH /api/services/:id/status` - Update service status
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Incidents API
- `GET /api/incidents` - Get all incidents
- `GET /api/incidents/organization/:orgId` - Get incidents by organization
- `POST /api/incidents` - Create new incident
- `PATCH /api/incidents/:id/status` - Update incident status
- `PUT /api/incidents/:id` - Update incident
- `DELETE /api/incidents/:id` - Delete incident

### Organizations API
- `GET /api/organizations` - Get all organizations
- `GET /api/organizations/:id` - Get organization by ID
- `POST /api/organizations` - Create new organization
- `PUT /api/organizations/:id` - Update organization
- `DELETE /api/organizations/:id` - Delete organization

### Users API (NEW)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Team Management API (NEW)
- `GET /api/members/organization/:orgId` - Get organization members
- `GET /api/members/user/:userId` - Get user's organizations
- `POST /api/members` - Add member to organization
- `PUT /api/members/:id` - Update member role
- `DELETE /api/members/:id` - Remove member from organization

### Incident Updates API (NEW)
- `GET /api/incident-updates/incident/:incidentId` - Get incident updates
- `POST /api/incident-updates` - Add update to incident
- `PUT /api/incident-updates/:id` - Update incident update
- `DELETE /api/incident-updates/:id` - Delete incident update

---

## 🔧 Individual curl Commands

### Health Check
```bash
curl -X GET http://localhost:3001/health
```

### Services API

#### Get All Services
```bash
curl -X GET http://localhost:3001/api/services
```

#### Get Services by Organization
```bash
curl -X GET http://localhost:3001/api/services/organization/YOUR_ORG_ID
```

#### Create New Service
```bash
curl -X POST http://localhost:3001/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Service",
    "organizationId": "YOUR_ORG_ID",
    "status": "OPERATIONAL"
  }'
```

#### Update Service Status
```bash
curl -X PATCH http://localhost:3001/api/services/SERVICE_ID/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "DEGRADED"
  }'
```

#### Update Service
```bash
curl -X PUT http://localhost:3001/api/services/SERVICE_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Service Name",
    "status": "OPERATIONAL"
  }'
```

#### Delete Service
```bash
curl -X DELETE http://localhost:3001/api/services/SERVICE_ID
```

### Incidents API

#### Get All Incidents
```bash
curl -X GET http://localhost:3001/api/incidents
```

#### Get Incidents by Organization
```bash
curl -X GET http://localhost:3001/api/incidents/organization/YOUR_ORG_ID
```

#### Create New Incident
```bash
curl -X POST http://localhost:3001/api/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Incident",
    "description": "Incident description",
    "serviceId": "SERVICE_ID",
    "organizationId": "YOUR_ORG_ID",
    "status": "OPEN"
  }'
```

#### Update Incident Status
```bash
curl -X PATCH http://localhost:3001/api/incidents/INCIDENT_ID/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "RESOLVED"
  }'
```

#### Update Incident
```bash
curl -X PUT http://localhost:3001/api/incidents/INCIDENT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Incident Title",
    "description": "Updated description",
    "status": "OPEN"
  }'
```

#### Delete Incident
```bash
curl -X DELETE http://localhost:3001/api/incidents/INCIDENT_ID
```

### Organizations API

#### Get All Organizations
```bash
curl -X GET http://localhost:3001/api/organizations
```

#### Get Organization by ID
```bash
curl -X GET http://localhost:3001/api/organizations/ORG_ID
```

#### Create New Organization
```bash
curl -X POST http://localhost:3001/api/organizations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Organization"
  }'
```

#### Update Organization
```bash
curl -X PUT http://localhost:3001/api/organizations/ORG_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Organization Name"
  }'
```

#### Delete Organization
```bash
curl -X DELETE http://localhost:3001/api/organizations/ORG_ID
```

### Users API (NEW)

#### Get All Users
```bash
curl -X GET http://localhost:3001/api/users
```

#### Get User by ID
```bash
curl -X GET http://localhost:3001/api/users/USER_ID
```

#### Create New User
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe"
  }'
```

#### Update User
```bash
curl -X PUT http://localhost:3001/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "email": "updated@example.com",
    "name": "John Smith"
  }'
```

#### Delete User
```bash
curl -X DELETE http://localhost:3001/api/users/USER_ID
```

### Team Management API (NEW)

#### Get Organization Members
```bash
curl -X GET http://localhost:3001/api/members/organization/ORG_ID
```

#### Get User's Organizations
```bash
curl -X GET http://localhost:3001/api/members/user/USER_ID
```

#### Add Member to Organization
```bash
curl -X POST http://localhost:3001/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "organizationId": "ORG_ID",
    "role": "member"
  }'
```

#### Update Member Role
```bash
curl -X PUT http://localhost:3001/api/members/MEMBER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "role": "admin"
  }'
```

#### Remove Member from Organization
```bash
curl -X DELETE http://localhost:3001/api/members/MEMBER_ID
```

### Incident Updates API (NEW)

#### Get Incident Updates
```bash
curl -X GET http://localhost:3001/api/incident-updates/incident/INCIDENT_ID
```

#### Add Update to Incident
```bash
curl -X POST http://localhost:3001/api/incident-updates \
  -H "Content-Type: application/json" \
  -d '{
    "incidentId": "INCIDENT_ID",
    "message": "Update message",
    "status": "OPEN"
  }'
```

#### Update Incident Update
```bash
curl -X PUT http://localhost:3001/api/incident-updates/UPDATE_ID \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Updated message",
    "status": "RESOLVED"
  }'
```

#### Delete Incident Update
```bash
curl -X DELETE http://localhost:3001/api/incident-updates/UPDATE_ID
```

---

## 📥 Postman Collection (JSON)

```json
{
  "info": {
    "name": "Status Page API",
    "description": "Complete API collection for Status Page application",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3001",
      "type": "string"
    }
  ],
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/health",
          "host": ["{{baseUrl}}"],
          "path": ["health"]
        }
      }
    },
    {
      "name": "Services",
      "item": [
        {
          "name": "Get All Services",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/services",
              "host": ["{{baseUrl}}"],
              "path": ["api", "services"]
            }
          }
        },
        {
          "name": "Get Services by Organization",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/services/organization/{{orgId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "services", "organization", "{{orgId}}"]
            }
          }
        },
        {
          "name": "Create New Service",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"New Service\",\n  \"organizationId\": \"{{orgId}}\",\n  \"status\": \"OPERATIONAL\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/services",
              "host": ["{{baseUrl}}"],
              "path": ["api", "services"]
            }
          }
        },
        {
          "name": "Update Service Status",
          "request": {
            "method": "PATCH",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"status\": \"DEGRADED\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/services/{{serviceId}}/status",
              "host": ["{{baseUrl}}"],
              "path": ["api", "services", "{{serviceId}}", "status"]
            }
          }
        },
        {
          "name": "Update Service",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Updated Service Name\",\n  \"status\": \"OPERATIONAL\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/services/{{serviceId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "services", "{{serviceId}}"]
            }
          }
        },
        {
          "name": "Delete Service",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/services/{{serviceId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "services", "{{serviceId}}"]
            }
          }
        }
      ]
    },
    {
      "name": "Incidents",
      "item": [
        {
          "name": "Get All Incidents",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/incidents",
              "host": ["{{baseUrl}}"],
              "path": ["api", "incidents"]
            }
          }
        },
        {
          "name": "Get Incidents by Organization",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/incidents/organization/{{orgId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "incidents", "organization", "{{orgId}}"]
            }
          }
        },
        {
          "name": "Create New Incident",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"New Incident\",\n  \"description\": \"Incident description\",\n  \"serviceId\": \"{{serviceId}}\",\n  \"organizationId\": \"{{orgId}}\",\n  \"status\": \"OPEN\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/incidents",
              "host": ["{{baseUrl}}"],
              "path": ["api", "incidents"]
            }
          }
        },
        {
          "name": "Update Incident Status",
          "request": {
            "method": "PATCH",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"status\": \"RESOLVED\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/incidents/{{incidentId}}/status",
              "host": ["{{baseUrl}}"],
              "path": ["api", "incidents", "{{incidentId}}", "status"]
            }
          }
        },
        {
          "name": "Update Incident",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Updated Incident Title\",\n  \"description\": \"Updated description\",\n  \"status\": \"OPEN\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/incidents/{{incidentId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "incidents", "{{incidentId}}"]
            }
          }
        },
        {
          "name": "Delete Incident",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/incidents/{{incidentId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "incidents", "{{incidentId}}"]
            }
          }
        }
      ]
    },
    {
      "name": "Organizations",
      "item": [
        {
          "name": "Get All Organizations",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/organizations",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations"]
            }
          }
        },
        {
          "name": "Get Organization by ID",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}"]
            }
          }
        },
        {
          "name": "Create New Organization",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"New Organization\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/organizations",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations"]
            }
          }
        },
        {
          "name": "Update Organization",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Updated Organization Name\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}"]
            }
          }
        },
        {
          "name": "Delete Organization",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}"]
            }
          }
        }
      ]
    },
    {
      "name": "Users",
      "item": [
        {
          "name": "Get All Users",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/users",
              "host": ["{{baseUrl}}"],
              "path": ["api", "users"]
            }
          }
        },
        {
          "name": "Get User by ID",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/users/{{userId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "users", "{{userId}}"]
            }
          }
        },
        {
          "name": "Create New User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"user@example.com\",\n  \"name\": \"John Doe\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/users",
              "host": ["{{baseUrl}}"],
              "path": ["api", "users"]
            }
          }
        },
        {
          "name": "Update User",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"updated@example.com\",\n  \"name\": \"John Smith\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/users/{{userId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "users", "{{userId}}"]
            }
          }
        },
        {
          "name": "Delete User",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/users/{{userId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "users", "{{userId}}"]
            }
          }
        }
      ]
    },
    {
      "name": "Team Management",
      "item": [
        {
          "name": "Get Organization Members",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/members/organization/{{orgId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "members", "organization", "{{orgId}}"]
            }
          }
        },
        {
          "name": "Get User's Organizations",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/members/user/{{userId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "members", "user", "{{userId}}"]
            }
          }
        },
        {
          "name": "Add Member to Organization",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"userId\": \"{{userId}}\",\n  \"organizationId\": \"{{orgId}}\",\n  \"role\": \"member\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/members",
              "host": ["{{baseUrl}}"],
              "path": ["api", "members"]
            }
          }
        },
        {
          "name": "Update Member Role",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"role\": \"admin\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/members/{{memberId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "members", "{{memberId}}"]
            }
          }
        },
        {
          "name": "Remove Member from Organization",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/members/{{memberId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "members", "{{memberId}}"]
            }
          }
        }
      ]
    },
    {
      "name": "Incident Updates",
      "item": [
        {
          "name": "Get Incident Updates",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/incident-updates/incident/{{incidentId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "incident-updates", "incident", "{{incidentId}}"]
            }
          }
        },
        {
          "name": "Add Update to Incident",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"incidentId\": \"{{incidentId}}\",\n  \"message\": \"Update message\",\n  \"status\": \"OPEN\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/incident-updates",
              "host": ["{{baseUrl}}"],
              "path": ["api", "incident-updates"]
            }
          }
        },
        {
          "name": "Update Incident Update",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"message\": \"Updated message\",\n  \"status\": \"RESOLVED\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/incident-updates/{{updateId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "incident-updates", "{{updateId}}"]
            }
          }
        },
        {
          "name": "Delete Incident Update",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/incident-updates/{{updateId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "incident-updates", "{{updateId}}"]
            }
          }
        }
      ]
    }
  ]
}
```

---

## 🔄 Environment Variables for Postman

Create a Postman environment with these variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `baseUrl` | `http://localhost:3001` | Base URL for all requests |
| `orgId` | `[Get from GET /api/organizations]` | Organization ID for testing |
| `serviceId` | `[Get from GET /api/services]` | Service ID for testing |
| `incidentId` | `[Get from GET /api/incidents]` | Incident ID for testing |
| `userId` | `[Get from GET /api/users]` | User ID for testing |
| `memberId` | `[Get from GET /api/members/organization/:orgId]` | Member ID for testing |
| `updateId` | `[Get from GET /api/incident-updates/incident/:incidentId]` | Update ID for testing |

---

## 📝 Testing Workflow

### 1. Initial Setup
1. Import the JSON collection into Postman
2. Create environment variables
3. Run "Get All Organizations" to get `orgId`
4. Run "Get All Services" to get `serviceId`
5. Run "Get All Incidents" to get `incidentId`
6. Run "Get All Users" to get `userId`
7. Run "Get Organization Members" to get `memberId`

### 2. Test CRUD Operations
1. **Create**: Test creating new services, incidents, organizations, users
2. **Read**: Test getting all items and by ID
3. **Update**: Test updating status and details
4. **Delete**: Test deleting items

### 3. Test Team Management
1. **Add Members**: Test adding users to organizations
2. **Update Roles**: Test changing member roles
3. **Remove Members**: Test removing users from organizations

### 4. Test Incident Updates
1. **Add Updates**: Test adding updates to incidents
2. **View Timeline**: Test getting incident update history
3. **Update Messages**: Test modifying update messages

### 5. Test Real-time Features
- Use the frontend application to see real-time updates
- Open multiple browser tabs to test live updates

---

## 🎯 Sample Test Data

### Create User
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User"
  }'
```

### Add User to Organization
```bash
curl -X POST http://localhost:3001/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "YOUR_USER_ID",
    "organizationId": "YOUR_ORG_ID",
    "role": "member"
  }'
```

### Add Incident Update
```bash
curl -X POST http://localhost:3001/api/incident-updates \
  -H "Content-Type: application/json" \
  -d '{
    "incidentId": "YOUR_INCIDENT_ID",
    "message": "Investigation in progress",
    "status": "OPEN"
  }'
```

---

## ✅ Expected Responses

### Success Responses
- `200` - GET, PUT, PATCH operations
- `201` - POST operations (created)
- `204` - DELETE operations (no content)

### Error Responses
- `400` - Bad Request (invalid data)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

All responses include JSON data with the requested information or error messages.
