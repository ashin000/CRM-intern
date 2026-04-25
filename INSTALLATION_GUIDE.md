# Complete Installation & Troubleshooting Guide

## 📥 Installation Steps

### Prerequisites
- Node.js v14+ (Download from nodejs.org)
- MongoDB (Local or Atlas account)
- Git (Optional but recommended)
- Code editor (VSCode recommended)

### Step 1: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Windows
# 1. Download MongoDB from mongodb.com/download/community
# 2. Install with default settings
# 3. MongoDB starts as a service automatically

# Mac
brew install mongodb-community
brew services start mongodb-community

# Linux (Ubuntu)
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create new project
4. Create cluster (M0 free tier)
5. Get connection string
6. Whitelist your IP

---

### Step 2: Backend Installation

```bash
# Navigate to backend
cd backend

# Create .env file
cp .env.example .env

# Edit .env
MONGODB_URI=mongodb://localhost:27017/crm-db
JWT_SECRET=your_secret_key_here_12345
JWT_EXPIRE=7d
PORT=5000
CLIENT_URL=http://localhost:3000

# Install dependencies
npm install

# Install nodemon for development (optional but recommended)
npm install --save-dev nodemon

# Start server
npm run dev
```

**Expected Output:**
```
MongoDB Connected: localhost:27017
Server running on port 5000
```

---

### Step 3: Frontend Installation

```bash
# Open new terminal, navigate to frontend
cd frontend

# Create .env file
cp .env.example .env

# Edit .env
REACT_APP_API_URL=http://localhost:5000/api

# Install dependencies
npm install

# Start development server
npm start
```

**Expected Output:**
```
Compiled successfully!

Local:        http://localhost:3000
On Your Network: http://192.168.x.x:3000
```

---

## 🔐 Creating Test Account

### Via Registration Page
1. Go to http://localhost:3000/register
2. Create account with any credentials
3. Will be automatically logged in

### Via Login (Pre-configured)
- Email: test@example.com
- Password: password123

**Note:** If test account doesn't exist, register first.

---

## ⚠️ Common Issues & Solutions

### ❌ "MongoDB connection failed"

**Solution 1: Start MongoDB**
```bash
# Windows (if not auto-starting)
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

**Solution 2: Check connection string**
- In backend/.env, verify MONGODB_URI
- For local: `mongodb://localhost:27017/crm-db`
- For Atlas: Check connection string format

**Solution 3: MongoDB Atlas issues**
- Ensure IP is whitelisted in Atlas
- Check username/password in connection string
- Verify cluster is running

---

### ❌ "Port 5000 already in use"

```bash
# Find and kill process on Windows
netstat -ano | findstr :5000
taskkill /PID <processid> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm run dev
```

---

### ❌ "Port 3000 already in use"

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <processid> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

---

### ❌ "Cannot find module" error

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Or use yarn
yarn install --fresh
```

---

### ❌ "CORS error" or "Request blocked"

**Error Message:** 
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution:**
1. Check REACT_APP_API_URL in frontend/.env
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

2. Check CLIENT_URL in backend/.env
   ```
   CLIENT_URL=http://localhost:3000
   ```

3. Clear browser cache and reset frontend
   ```bash
   # In frontend directory
   npm start
   ```

---

### ❌ "Login page appears but can't login"

**Solution 1: Check backend is running**
- Verify Terminal 1 shows "Server running on port 5000"
- Verify "MongoDB Connected" message

**Solution 2: Check test credentials**
- Email: test@example.com
- Password: password123
- Or register new account

**Solution 3: Check browser console**
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab to see API calls

---

### ❌ "White screen / Nothing loads"

**Solution 1: Check browser console**
- Open DevTools (F12)
- Look for error messages

**Solution 2: Clear cache**
```bash
# Windows
npm cache clean --force

# Mac/Linux
npm cache clean --force
```

**Solution 3: Restart frontend**
```bash
# Stop server (Ctrl+C)
# Run again
npm start
```

---

### ❌ "API returns 401 Unauthorized"

**Error Message:**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**Solution:**
1. Token missing or expired
2. Login again at http://localhost:3000/login
3. Check localStorage in DevTools
   - Open DevTools → Application → Local Storage
   - Should have `token` key

---

### ❌ "Leads table shows 'No leads found'"

**Possible Causes:**
1. Need to create company first
2. Need to create leads
3. Leads were deleted

**Solution:**
1. Go to Companies page
2. Create a new company
3. Go to Leads page
4. Click "Add Lead"
5. Select the company you just created
6. Click Save

---

### ❌ "Dashboard shows 0 for all stats"

**Possible Causes:**
- No data created yet
- API not returning data

**Solution:**
1. Create test data:
   - Add 2-3 companies
   - Add 5-10 leads with different statuses
   - Add 3-5 tasks
2. Refresh dashboard page
3. Stats should update

---

### ❌ "Axios/npm install fails"

```bash
# Try these solutions in order

# 1. Clear npm cache
npm cache clean --force

# 2. Update npm
npm install -g npm@latest

# 3. Delete package-lock.json
rm package-lock.json

# 4. Try installing again
npm install

# 5. If still failing, use yarn
npm install -g yarn
yarn install
```

---

## 🔧 Verification Checklist

### Backend
- [ ] Navigate to backend: `cd backend`
- [ ] Install dependencies: `npm install`
- [ ] Create .env file with MongoDB URI
- [ ] Start server: `npm run dev`
- [ ] See message: "MongoDB Connected" and "Server running on port 5000"

### Frontend
- [ ] Navigate to frontend: `cd frontend`
- [ ] Install dependencies: `npm install`
- [ ] Create .env with API URL
- [ ] Start app: `npm start`
- [ ] See "Compiled successfully!"
- [ ] Browser opens http://localhost:3000

### Application
- [ ] Can access login page
- [ ] Can register new account
- [ ] Can login
- [ ] Can see dashboard
- [ ] Can navigate to Leads page
- [ ] Can access Companies page
- [ ] Can create/view/edit/delete data

---

## 📊 Testing the API

### Using Postman or Insomnia

**1. Register User**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@myemail.com",
  "password": "password123"
}
```

**2. Login**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@myemail.com",
  "password": "password123"
}
```

Save the token from response.

**3. Create Company** (Use token in header)
```
POST http://localhost:5000/api/companies
Headers:
  Authorization: Bearer {token}
  Content-Type: application/json

Body:
{
  "name": "My Company",
  "industry": "Technology",
  "location": "New York"
}
```

---

## 🛠️ Development Tips

### 1. Using DevTools

**Chrome DevTools (F12):**
- Console: See JS errors
- Network: See API calls
- Application → Local Storage: See tokens
- Application → Cookies: Check session data

### 2. Debugging React

**Add console.log:**
```javascript
useEffect(() => {
  console.log("Component mounted");
  console.log("User:", user);
}, [user]);
```

**Use React DevTools browser extension:**
- View component props
- Track state changes
- Profile performance

### 3. Debugging Express

**Add console.log to controllers:**
```javascript
exports.getLeads = async (req, res, next) => {
  console.log("User ID:", req.user.id);
  console.log("Query params:", req.query);
  // ... rest of code
};
```

### 4. MongoDB Debugging

**Use MongoDB Compass (GUI):**
1. Download from mongodb.com/products/compass
2. Connect to your MongoDB
3. Browse collections
4. View documents
5. Create test data manually

---

## 🚀 Performance Tips

1. **Use pagination** - Don't load all records at once
2. **Add search** - Filter before fetching
3. **Lazy load** - Load images only when visible
4. **Minify code** - `npm run build` for production
5. **Monitor console** - Fix warnings and errors
6. **Use DevTools** - Check for slow requests

---

## 📝 Logging Setup

### Add logging to backend:

```javascript
// In server.js or before routes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});
```

### View logs:
- Backend: Check terminal/console
- Frontend: Open DevTools Console (F12)
- MongoDB: Check MongoDB logs

---

## 🔄 Restart Procedures

### Full Restart (Complete Reset)

```bash
# Terminal 1 - Stop and restart backend
cd backend
# Press Ctrl+C to stop
npm run dev

# Terminal 2 - Stop and restart frontend
cd frontend
# Press Ctrl+C to stop
npm start

# Terminal 3 - Restart MongoDB (if needed)
mongod
```

### Full Reset (Clear Data)

```bash
# Warning: This deletes all data!

# Delete MongoDB database
# In MongoDB:
use crm-db
db.dropDatabase()

# Clear browser data
# DevTools → Application → Clear Site Data

# Restart applications
```

---

## 📞 Getting Help

### Error Message Format
When reporting issues, include:
1. Error message (exact text)
2. What were you trying to do
3. Terminal/Browser output
4. Screenshots if helpful

### Common Resources
- Node.js: nodejs.org/docs
- Express: expressjs.com
- React: react.dev
- MongoDB: mongodb.com/docs
- MUI: mui.com/material-ui/getting-started

---

## ✅ Final Verification

Before considering setup complete:

1. **Backend:**
   - `npm run dev` shows "MongoDB Connected"
   - `npm run dev` shows "Server running on port 5000"

2. **Frontend:**
   - `npm start` shows "Compiled successfully"
   - Browser opens automatically
   - No errors in DevTools Console

3. **Application:**
   - Login page loads
   - Can register new account
   - Can login
   - Dashboard displays with data
   - Can create leads, companies, tasks

4. **Database:**
   - MongoDB is running
   - Can connect from backend
   - Can see collections in MongoDB Compass

---

**🎉 If you get here, your application is ready to use!**

For additional help, refer to:
- README.md - Full documentation
- QUICK_START.md - Quick reference
- API_DOCUMENTATION.md - API details
- DATABASE_SETUP.md - Database guide
