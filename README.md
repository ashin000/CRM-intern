# CRM MERN Stack Application

A complete Mini CRM application built with MERN stack (MongoDB, Express, React, Node.js).

## Features

✅ User Authentication (JWT & bcrypt)
✅ Lead Management (CRUD, Search, Filter, Pagination, Soft Delete)
✅ Company Management
✅ Task Management with Authorization
✅ Dashboard with Statistics
✅ Protected Routes
✅ Clean Code Structure
✅ MUI Components
✅ Error Handling
✅ Environment Variables
✅ Axios Interceptors

## Tech Stack

### Backend
- **Node.js** - JavaScript Runtime
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password Hashing

### Frontend
- **React** - UI Library
- **React Router v6** - Routing
- **Material UI (MUI v5)** - UI Components
- **Axios** - HTTP Client

## Project Structure

```
CRM-application/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Lead.js
│   │   ├── Company.js
│   │   └── Task.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── leadController.js
│   │   ├── companyController.js
│   │   ├── taskController.js
│   │   └── dashboardController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── leadRoutes.js
│   │   ├── companyRoutes.js
│   │   ├── taskRoutes.js
│   │   └── dashboardRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── config/
│   │   └── database.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── pages/
    │   │   ├── LoginPage.js
    │   │   ├── RegisterPage.js
    │   │   ├── DashboardPage.js
    │   │   ├── LeadsPage.js
    │   │   ├── CompaniesPage.js
    │   │   ├── CompanyDetailPage.js
    │   │   └── TasksPage.js
    │   ├── components/
    │   │   └── ProtectedRoute.js
    │   ├── layouts/
    │   │   └── MainLayout.js
    │   ├── services/
    │   │   ├── api.js
    │   │   └── index.js
    │   ├── hooks/
    │   │   └── useProtectedRoute.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── App.js
    │   ├── index.js
    │   ├── package.json
    │   └── .env.example
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/auth/me` - Get Current User (Protected)

### Leads
- `POST /api/leads` - Create Lead (Protected)
- `GET /api/leads?page=1&limit=10&search=&status=` - Get Leads with Pagination, Search, Filter (Protected)
- `GET /api/leads/:id` - Get Lead Detail (Protected)
- `PUT /api/leads/:id` - Update Lead (Protected)
- `DELETE /api/leads/:id` - Soft Delete Lead (Protected)

### Companies
- `POST /api/companies` - Create Company (Protected)
- `GET /api/companies?page=1&limit=10` - Get Companies (Protected)
- `GET /api/companies/:id` - Get Company Detail with Associated Leads (Protected)
- `PUT /api/companies/:id` - Update Company (Protected)
- `DELETE /api/companies/:id` - Delete Company (Protected)

### Tasks
- `POST /api/tasks` - Create Task (Protected)
- `GET /api/tasks?page=1&limit=10&status=` - Get Tasks (Protected)
- `GET /api/tasks/:id` - Get Task Detail (Protected)
- `PUT /api/tasks/:id` - Update Task (Only Assigned User) (Protected)
- `DELETE /api/tasks/:id` - Delete Task (Only Assigned User) (Protected)

### Dashboard
- `GET /api/dashboard/stats` - Get Dashboard Statistics (Protected)

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure .env:**
   ```
   MONGODB_URI=mongodb://localhost:27017/crm-db
   JWT_SECRET=8f3h9k2m7p1q5r8x2c9v3b6n1m4w7z9y0j5k8l2p9x4c6v8b1n3m6p9z2x5c7v9b
   JWT_EXPIRE=7d
   PORT=5000
   CLIENT_URL=http://localhost:3000
   ```

5. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

6. **Run the backend server:**
   ```bash
   npm run dev
   ```

   Backend will run on: `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure .env:**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the React development server:**
   ```bash
   npm start
   ```

   Frontend will run on: `http://localhost:3000`

## Running the Application

### Development

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Building for Production

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```

## Default Login Credentials

For testing, you can use:
- **Email:** test@example.com
- **Password:** password123

Or register a new account.

## Database Schema

### User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin/user),
  createdAt: Date,
  updatedAt: Date
}
```

### Lead
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  status: String (New/Contacted/Lost),
  assignedTo: ObjectId (User ref),
  company: ObjectId (Company ref),
  isDeleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Company
```javascript
{
  _id: ObjectId,
  name: String,
  industry: String,
  location: String,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  lead: ObjectId (Lead ref),
  assignedTo: ObjectId (User ref),
  dueDate: Date,
  status: String (Pending/Completed),
  createdAt: Date,
  updatedAt: Date
}
```

## Key Features

### Authentication
- User registration and login
- JWT token generation and validation
- Password hashing with bcrypt
- Protected routes with middleware
- Token stored in localStorage
- Axios interceptor for token attachment

### Leads Management
- Create, read, update, soft delete (isDeleted flag)
- Pagination support
- Search by name and email
- Filter by status
- Regex-based search
- Always exclude soft-deleted leads

### Companies Management
- Create, read, update, delete companies
- View company details with associated leads
- Pagination support

### Tasks Management
- Create, read, update, delete tasks
- Assign tasks to users
- Only assigned user can update/delete
- Filter by status
- Due date tracking

### Dashboard
- Total leads count
- Qualified leads (Contacted status)
- Lost leads
- Completed tasks
- Tasks due today
- Tasks by status
- Leads by status

## Error Handling

- Custom error handler middleware
- Validation on backend and frontend
- Proper HTTP status codes
- User-friendly error messages
- 401 error redirects to login

## Security Features

- JWT authentication
- bcrypt password hashing
- Protected routes
- CORS enabled
- Authorization checks
- Input validation

## Deployment

### Backend Deployment (Render/Railway)

1. Push code to GitHub
2. Connect to Render/Railway
3. Set environment variables
4. Deploy

### Frontend Deployment (Netlify/Vercel)

1. Build: `npm run build`
2. Deploy the build folder to Netlify/Vercel
3. Set environment variables

## Future Enhancements

- Add email notifications
- Add file attachments for leads
- Add activity tracking
- Add multiple team support
- Add advanced analytics
- Add data export functionality
- Add socket.io for real-time updates
- Add payment integration
- Add calendar view for tasks
- Add notes/comments on leads

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in .env
- Verify database name

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: Use different port with: `PORT=3001 npm start`

### CORS Errors
- Check CLIENT_URL in backend .env
- Ensure frontend URL matches

### Token Issues
- Clear localStorage and login again
- Check JWT_SECRET in .env
- Verify token expiration

## Support

For issues or questions, please refer to the code comments or create an issue.

## License

ISC
