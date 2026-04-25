# MERN CRM Application - Quick Start Guide

## Prerequisites
- Node.js v14+ and npm installed
- MongoDB (local or MongoDB Atlas)
- An IDE (VSCode recommended)

## Quick Setup (5 minutes)

### Step 1: Start MongoDB

**If using MongoDB locally:**
```bash
mongod
```

**If using MongoDB Atlas (Cloud):**
- Create account at mongodb.com/cloud/atlas
- Create a cluster and copy connection string

---

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit .env file:**
```
MONGODB_URI=mongodb://localhost:27017/crm-db
JWT_SECRET=your_secret_key_12345
JWT_EXPIRE=7d
PORT=5000
CLIENT_URL=http://localhost:3000
```

**Start backend:**
```bash
npm run dev
```

✅ Backend running at: http://localhost:5000

---

### Step 3: Frontend Setup (New Terminal)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit .env file:**
```
REACT_APP_API_URL=http://localhost:5000/api
```

**Start frontend:**
```bash
npm start
```

✅ Frontend running at: http://localhost:3000

---

## Login

**Test Account:**
- Email: test@example.com
- Password: password123

**Or create a new account** using the Register page

---

## Project Structure

```
CRM-application/
├── backend/              # Node.js + Express + MongoDB
│   ├── models/          # Database schemas
│   ├── controllers/      # Business logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & error handling
│   └── server.js        # Main file
│
└── frontend/            # React + MUI + Axios
    ├── src/pages/       # Page components
    ├── src/components/  # Reusable components
    ├── src/services/    # API calls
    ├── src/layouts/     # Layout components
    └── src/context/     # Auth context
```

---

## API Endpoints

### Public Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Protected Endpoints
- **Leads:** `/api/leads` (GET, POST, PUT, DELETE)
- **Companies:** `/api/companies` (GET, POST, PUT, DELETE)
- **Tasks:** `/api/tasks` (GET, POST, PUT, DELETE)
- **Dashboard:** `/api/dashboard/stats`

---

## Features Ready to Use

✅ User Authentication (Login/Register)
✅ Lead Management (Create, Read, Update, Delete)
✅ Company Management
✅ Task Assignment & Management
✅ Search & Filter
✅ Pagination
✅ Dashboard with Statistics
✅ Protected Routes
✅ Error Handling

---

## Troubleshooting

### Port 5000 Already in Use
```bash
# Use different port
PORT=5001 npm run dev
```

### Port 3000 Already in Use
```bash
# Use different port
PORT=3001 npm start
```

### MongoDB Connection Error
- Check MongoDB is running: `mongod`
- Verify connection string in .env
- If using Atlas, ensure IP whitelist includes your IP

### CORS Error
- Check REACT_APP_API_URL in .env matches backend
- Ensure CLIENT_URL in backend .env is correct

### Dependencies Not Installing
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

---

## Build for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

---

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/crm-db
JWT_SECRET=your_unique_secret_key
JWT_EXPIRE=7d
PORT=5000
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Key Technologies

**Backend:**
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- bcrypt - Password hashing

**Frontend:**
- React - UI library
- React Router v6 - Navigation
- Material UI - Components
- Axios - HTTP client

---

## Next Steps

1. ✅ Start both servers
2. ✅ Create a test account or login
3. ✅ Add companies first
4. ✅ Add leads (assign to companies)
5. ✅ Create and manage tasks
6. ✅ Check dashboard for statistics

---

## Deployment

### Deploy Backend (Render/Railway)
1. Push to GitHub
2. Connect repository
3. Set environment variables
4. Deploy

### Deploy Frontend (Netlify/Vercel)
1. Run: `npm run build`
2. Deploy the `build` folder
3. Set REACT_APP_API_URL to production backend URL

---

**Happy Coding!** 🚀
