# PMS-2025

PMS-2025 is a Project Management System designed to manage companies, projects, tasks, and users efficiently. It provides authentication, role-based access control, and CRUD operations for various entities.

## Features

- **Authentication**: Login, registration, and token-based authentication using JWT.
- **Role-Based Access Control**: Admin, Manager, and Member roles with specific permissions.
- **Company Management**: Register and manage companies.
- **Project Management**: Create, update, delete, and list projects.
- **Task Management**: Assign tasks to users, update task statuses, and manage tasks.
- **User Management**: Create, update, delete, and list users.
- **Validation**: Input validation using `express-validator`.
- **Rate Limiting**: Protect APIs from abuse using rate limiting.
- **Error Handling**: Centralized error handling middleware.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/pms-2025.git
   cd pms-2025

2. npm install

3. Create a .env file in the root directory and configure the following environment variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/PMS-DATA
   JWT_SECRET="your_jwt_secret"
   JWT_REFRESH_SECRET="your_refresh_secret"
   JWT_EXPIRY=15m
   JWT_REFRESH_EXPIRY=30d
   RATE_LIMIT=100
   RATE_LIMIT_WINDOW_MS=900000
   ```
4. Start the application:
Development mode: npm run dev
Production mode:
npm start


API Endpoints
Authentication
POST /api/auth/login: Login a user.
POST /api/auth/register: Register a new user.
POST /api/auth/refresh-token: Refresh access token.



User Management
POST /api/user/create: Create a new user (Admin only).
GET /api/user/getAll: Get all users (Admin only).
GET /api/user/get/:id: Get user by ID (Admin only).
PUT /api/user/update/:id: Update user details (Admin only).
DELETE /api/user/delete/:id: Delete a user (Admin only).



Company Management
POST /api/company/register: Register a new company.
Project Management
POST /api/project: Create a new project.
GET /api/project: List all projects.
PUT /api/project/:id: Update a project.
DELETE /api/project/:id: Delete a project.



Task Management
POST /api/task: Create a new task.
GET /api/task: List all tasks.
PUT /api/task/:id: Update a task.
DELETE /api/task/:id: Delete a task.

Testing
Run tests using Jest: npm test
Technologies Used
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: JWT
Validation: express-validator
Testing: Jest, Supertest


Technologies Used
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: JWT
Validation: express-validator
Testing: Jest, Supertest

