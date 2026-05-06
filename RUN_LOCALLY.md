# 🚀 Run MERN CRM Locally

This guide shows you how to run the complete MERN Stack CRM application on your machine.

---

## Prerequisites

- **Node.js** installed (v14+) - [Download](https://nodejs.org)
- **MongoDB Atlas account** (free) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** installed - [Download](https://git-scm.com)

---

## 📥 Step 1: Clone & Install

```bash
# Clone repository (if not already downloaded)
git clone https://github.com/ashin000/CRM-intern.git
cd "CRM intern"

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## ⚙️ Step 2: Configure Environment

### Backend Configuration

**File:** `backend/.env`

```
MONGODB_URI=mongodb+srv://ashindb:ashin2007@ashin.2cko1rx.mongodb.net/crm-db?retryWrites=true&w=majority&appName=Ashin
JWT_SECRET=8f3h9k2m7p1q5r8x2c9v3b6n1m4w7z9y0j5k8l2p9x4c6v8b1n3m6p9z2x5c7v9b
JWT_EXPIRE=7d
PORT=5000
CLIENT_URL=http://localhost:3000
USE_MEMORY_DB=true
```

### Frontend Configuration

**File:** `frontend/.env`

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🎯 Step 3: Run the Application

**Open TWO separate terminals:**

### Terminal 1 - Start Backend Server
```bash
cd "CRM intern/backend"
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB Connected (In-Memory): mongodb://127.0.0.1:54321/
```

### Terminal 2 - Start Frontend Development Server
```bash
cd "CRM intern/frontend"
npm start
```

Expected output:
```
You can now view crm-frontend in the browser.
Local: http://localhost:3000
```

---

## 🌐 Access the Application

Open your browser and go to:
```
http://localhost:3000
```

---

## 🔐 Login Credentials

**Test Account:**
- Email: `test@example.com`
- Password: `password123`

**Or register a new account** on the login page.

---

## 📱 Features to Test

1. **Dashboard** - View CRM statistics
2. **Leads** - Create, edit, delete, search leads
3. **Companies** - Manage companies
4. **Tasks** - Create and manage tasks
5. **Authentication** - Login, register, logout

---

## 🛑 Stop the Application

- Backend: Press `Ctrl + C` in Terminal 1
- Frontend: Press `Ctrl + C` in Terminal 2

---

## 📊 Folder Structure

```
CRM intern/
├── backend/
│   ├── config/           (Database config)
│   ├── models/           (MongoDB schemas)
│   ├── controllers/      (Business logic)
│   ├── routes/           (API endpoints)
│   ├── middleware/       (Auth & error handling)
│   ├── server.js         (Main entry point)
│   └── .env              (Environment variables)
│
└── frontend/
    ├── src/
    │   ├── pages/        (React pages)
    │   ├── components/   (Reusable components)
    │   ├── services/     (API calls)
    │   ├── context/      (Auth context)
    │   └── App.js        (Main app)
    └── .env              (Environment variables)
```

---

## 🔧 Troubleshooting

### Backend won't start
- Check MongoDB URI is correct
- Verify PORT 5000 is not in use
- Check .env file exists with all variables

### Frontend won't load
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in `.env`
- Clear browser cache (Ctrl+Shift+Delete)

### Login/Register fails
- Check backend logs for errors
- Verify JWT_SECRET is set correctly
- Make sure MongoDB connection is working

---

## 🚀 Deploy to Production

For deployment instructions, see:
- Frontend: Deploy to **Netlify**
- Backend: Deploy to **Render.com**

---

## 📚 Tech Stack

- **Frontend:** React 18 + React Router v6 + Material UI v5 + Axios
- **Backend:** Node.js + Express.js + MongoDB + Mongoose
- **Authentication:** JWT + bcrypt
- **Database:** MongoDB with in-memory option for local dev

---

## 📞 Support

- Check GitHub repo: https://github.com/ashin000/CRM-intern
- Review README.md for project overview
