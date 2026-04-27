# MERN Stack Mini CRM Application - Submission Notes

## GitHub Repository
**Repository Link:** https://github.com/ashin000/CRM-intern

**Contains:**
- Complete Backend (Node.js + Express + MongoDB)
- Complete Frontend (React + Material UI)
-  All 58 files properly organized
-  Documentation and setup guides
-  Environment configuration templates

---

##  Authorization Logic Explained

### Authentication Flow

#### 1. **User Registration**
- User provides: name, email, password
- Password is **hashed using bcrypt** (10 salt rounds) before storage
- New user automatically logged in with JWT token
- Route: `POST /api/auth/register`

```
User Input (plain password) 
    ↓
bcrypt.hash(password, 10)
    ↓
Store hashed password in MongoDB
    ↓
Generate JWT token
    ↓
Return token to frontend (stored in localStorage)
```

#### 2. **User Login**
- User provides: email, password
- System retrieves user from DB by email
- **Password comparison using bcrypt** (`bcrypt.compare()`)
- If valid: JWT token generated with 7-day expiration
- Route: `POST /api/auth/login`

```
User Input (email + plain password)
    ↓
Find user by email in DB
    ↓
bcrypt.compare(inputPassword, storedHashedPassword)
    ↓
If match: Generate JWT token with userId payload
    ↓
Return token (user stores in localStorage)
```

### JWT Token Structure

```javascript
// Token payload
{
  userId: "user_id_from_database",
  iat: 1234567890,           // issued at
  exp: 1234567890 + (7*24*60*60)  // expires in 7 days
}
```

**JWT Secret:** Stored in `.env` file (unique per environment)

### Protected Routes Middleware

#### Request Flow
```
1. Frontend sends request with Authorization header
   ├─ Header: "Authorization: Bearer <JWT_TOKEN>"
   └─ Request goes through protect() middleware

2. Middleware verifies JWT token
   ├─ Extracts token from Authorization header
   ├─ Verifies signature using JWT_SECRET
   └─ Decodes to get userId

3. If valid:
   ├─ Attaches user object to req.user
   └─ Proceeds to controller

4. If invalid:
   ├─ Returns 401 Unauthorized
   └─ Frontend redirects to /login
```

### Authorization Levels

#### Middleware: `auth.js`

**1. protect() - Authentication Check**
```javascript
// Verifies JWT token is valid
// All protected routes use this
exports.protect = async (req, res, next) => {
  // Extract token from Authorization header
  // Verify token using JWT_SECRET
  // Decode to get userId
  // Attach user to req.user
}
```

**2. authorize(...roles) - Role-Based Access Control**
```javascript
// Checks if user has required role
// Currently: admin or user role
exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Not authorized' })
  }
}
```

### Protected Routes

**Backend Routes Structure:**
```
Routes Requiring Authentication (protect middleware):
├─ GET    /api/leads           → fetch all leads
├─ POST   /api/leads           → create new lead
├─ GET    /api/leads/:id       → fetch single lead
├─ PUT    /api/leads/:id       → update lead
├─ DELETE /api/leads/:id       → soft delete lead
│
├─ GET    /api/companies       → fetch all companies
├─ POST   /api/companies       → create company
├─ GET    /api/companies/:id   → fetch company with leads
├─ PUT    /api/companies/:id   → update company
├─ DELETE /api/companies/:id   → delete company
│
├─ GET    /api/tasks           → fetch tasks
├─ POST   /api/tasks           → create task (auto-assigns to user)
├─ PUT    /api/tasks/:id       → update (only assigned user)
├─ DELETE /api/tasks/:id       → delete (only assigned user)
│
└─ GET    /api/dashboard/stats → get dashboard statistics

Public Routes (No Authentication):
├─ POST /api/auth/register     → new user registration
├─ POST /api/auth/login        → user login
└─ GET  /api/auth/me           → get current user info (protected)
```

### Frontend Authorization (Client-Side)

**Context API: `AuthContext.js`**
```javascript
// Global auth state management
const AuthContext = createContext()

// Provides:
- user: current logged-in user
- token: JWT token
- isAuthenticated: boolean
- login(): authenticate user
- register(): create new account
- logout(): clear token and user
```

**Route Protection: `ProtectedRoute.js`**
```javascript
// ProtectedRoute - Redirect unauthenticated to /login
<ProtectedRoute>
  <Dashboard /> → if not auth, redirect to /login
</ProtectedRoute>

// PublicRoute - Redirect authenticated to /dashboard
<PublicRoute>
  <Login /> → if auth, redirect to /dashboard
</PublicRoute>
```

**Axios Interceptors: `api.js`**
```javascript
// Request Interceptor
- Automatically attach JWT token to Authorization header
- Reads token from localStorage
- Format: "Authorization: Bearer <token>"

// Response Interceptor
- If 401 (Unauthorized): 
  - Clear localStorage (token + user)
  - Redirect to /login
```

### Security Features

**Password Security**
- Bcrypt hashing with 10 salt rounds
- Passwords never stored in plain text
- Passwords selected out by default in DB queries (select: false)

✅ **Token Security**
- JWT signed with secret key
- 7-day expiration
- HttpOnly flag available (configurable for cookies)

✅ **Data Protection**
- Soft delete for leads (not permanently removed)
- User can only modify own tasks
- All sensitive operations require authentication

✅ **CORS Protection**
- Backend only accepts requests from frontend URL
- CLIENT_URL: http://localhost:3000 (configurable)

---

## Deployment Instructions (Complete Guide)

### STEP 1: Deploy Backend to Render.com

#### 1a. Create Render Account
1. Go to https://render.com
2. Click **"Sign up"**
3. Choose **"Sign up with GitHub"**
4. Authorize Render to access your GitHub account

#### 1b. Create Web Service on Render
1. In Render dashboard, click **"New +"** button (top right)
2. Select **"Web Service"**
3. Connect GitHub repository:
   - Find and click `ashin000/CRM-intern`
   - Click **"Connect"**
4. Configure Service:
   - **Name:** `crm-backend`
   - **Root Directory:** `backend` ⭐ (IMPORTANT!)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm run dev` (or `node server.js`)

#### 1c. Add Environment Variables
1. Scroll down to **"Environment"** section
2. Click **"Add Environment Variable"** and add these:

```
MONGODB_URI=mongodb+srv://ashindb:ashin2007@ashin.2cko1rx.mongodb.net/crm-db?retryWrites=true&w=majority&appName=Ashin

JWT_SECRET=8f3h9k2m7p1q5r8x2c9v3b6n1m4w7z9y0j5k8l2p9x4c6v8b1n3m6p9z2x5c7v9b

PORT=3000

CLIENT_URL=https://your-netlify-url.netlify.app

USE_MEMORY_DB=false
```

⚠️ **Note:** You'll update `CLIENT_URL` with actual Netlify URL after frontend is deployed

#### 1d. Deploy
1. Click **"Create Web Service"** at bottom
2. Wait for deployment (2-5 minutes)
3. You'll see a green checkmark when done
4. **Copy your backend URL** - looks like: `https://crm-backend-xxx.onrender.com`

---

### STEP 2: Deploy Frontend to Netlify

#### 2a. Connect GitHub to Netlify
1. Go to https://app.netlify.com
2. Click **"Add new site"**
3. Choose **"Import an existing project"**
4. Click **"GitHub"**
5. Find and select `ashin000/CRM-intern`

#### 2b. Configure Build Settings
1. **Base directory:** `frontend`
2. **Build command:** `npm run build`
3. **Publish directory:** `frontend/build`
4. Click **"Deploy"**
5. Wait for build to complete (~3-5 minutes)
6. You'll get a URL like: `https://xxx.netlify.app`

---

### STEP 3: Link Frontend to Backend

#### 3a. Update Netlify Environment Variables
1. Go to your Netlify site settings
2. Click **"Site settings"** → **"Build & deploy"** → **"Environment"**
3. Click **"Edit variables"**
4. Add or update:
   ```
   REACT_APP_API_URL=https://crm-backend-xxx.onrender.com/api
   ```
   (Replace `xxx` with your actual Render backend URL)

#### 3b. Update Railway/Render Backend with Frontend URL
1. Go back to Render dashboard
2. Select your `crm-backend` service
3. Go to **"Environment"**
4. Update `CLIENT_URL`:
   ```
   CLIENT_URL=https://your-netlify-url.netlify.app
   ```
   (Replace with actual Netlify URL)

#### 3c. Redeploy Frontend
1. Go to Netlify dashboard
2. Click **"Deployments"**
3. Click **"Trigger deploy"** button
4. Wait for build to complete

---

### STEP 4: Verify Everything Works

1. **Visit your Netlify frontend URL:** `https://your-site.netlify.app`
2. **Try to register:**
   - Name: `Test User`
   - Email: `test2@example.com`
   - Password: `password123`
3. **Or login with existing credentials:**
   - Email: `test@example.com`
   - Password: `password123`
4. **Check Dashboard** - should show statistics
5. **Test Leads page** - create a new lead

**If login/register fails:**
- Open browser DevTools (F12)
- Go to **Console** tab
- Look for error messages
- Check if `REACT_APP_API_URL` is correctly pointing to backend

---

### Quick Reference URLs

Once deployed, you'll have:

**Backend URL (from Render):**
```
https://crm-backend-xxx.onrender.com
API calls to: https://crm-backend-xxx.onrender.com/api
```

**Frontend URL (from Netlify):**
```
https://your-site.netlify.app
```

**GitHub Repository:**
```
https://github.com/ashin000/CRM-intern
```

---

## Submission Checklist

- [x] GitHub repository created: https://github.com/ashin000/CRM-intern
- [x] All source code pushed to GitHub
- [x] Frontend and backend properly organized
- [x] .env files NOT committed (in .gitignore)
- [x] README.md with setup instructions
- [x] Authorization logic implemented (JWT + bcrypt)
- [ ] **STEP 1:** Backend deployed to Render.com (Set root directory to `backend`)
- [ ] **STEP 2:** Frontend deployed to Netlify (Build settings configured)
- [ ] **STEP 3:** Frontend `REACT_APP_API_URL` updated to Render backend URL
- [ ] **STEP 4:** Backend `CLIENT_URL` updated to Netlify frontend URL
- [ ] **STEP 5:** Redeploy frontend (trigger deploy in Netlify)
- [ ] **STEP 6:** Test login/register on live app
- [ ] **STEP 7:** Collect final URLs for submission

---

##  Final Submission Requirements

**After completing deployment, submit the following:**

1. **GitHub Repository Link:**
   ```
   https://github.com/ashin000/CRM-intern
   ```

2. **Live Frontend Application URL (Netlify):**
   ```
   https://your-netlify-site.netlify.app
   ```

3. **Live Backend API URL (Render):**
   ```
   https://crm-backend-xxx.onrender.com
   ```

**All three URLs required for complete submission!**

---

##  Test Credentials

**Login with existing test user:**
- Email: `test@example.com`
- Password: `password123`

**Or register a new account** in the application

---

##  Tech Stack Summary

| Component | Technology |
|-----------|------------|
| Frontend | React 18.2 + React Router v6 + Material UI v5 + Axios |
| Backend | Node.js + Express.js 4.18 |
| Database | MongoDB + Mongoose 7.0 |
| Authentication | JWT (jsonwebtoken 9.0) |
| Security | bcrypt 5.1 (password hashing) |
| CORS | cors 2.8 |

---

##  Support

For setup issues, refer to:
- `QUICK_START.md` - Quick start guide
- `INSTALLATION_GUIDE.md` - Detailed installation
- `DATABASE_SETUP.md` - Database configuration
- `README.md` - Project overview
