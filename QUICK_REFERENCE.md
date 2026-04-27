# 🎯 Quick Reference Card

## Three Simple Steps to Deploy

### 1️⃣ Deploy Backend (Render.com)
```
1. Go to render.com → Sign up with GitHub
2. New Web Service → Select CRM-intern repo
3. Root directory: "backend"
4. Environment variables (copy/paste from DEPLOYMENT_CHECKLIST.md)
5. Create Web Service
6. SAVE the URL: https://crm-backend-xxx.onrender.com
```

### 2️⃣ Deploy Frontend (Netlify)
```
1. Go to netlify.com → Login/Sign up
2. Add new site → Import existing project
3. Select CRM-intern → Frontend folder
4. Build: npm run build
5. SAVE the URL: https://your-site.netlify.app
```

### 3️⃣ Connect Them Together
```
1. Netlify: Add REACT_APP_API_URL = render_backend_url/api
2. Render: Update CLIENT_URL = netlify_frontend_url
3. Netlify: Trigger redeploy
4. DONE! ✅
```

---

## Environment Variables Quick Copy

**For Render Backend:**
```
MONGODB_URI=mongodb+srv://ashindb:ashin2007@ashin.2cko1rx.mongodb.net/crm-db?retryWrites=true&w=majority&appName=Ashin
JWT_SECRET=8f3h9k2m7p1q5r8x2c9v3b6n1m4w7z9y0j5k8l2p9x4c6v8b1n3m6p9z2x5c7v9b
PORT=3000
CLIENT_URL=https://your-netlify-url.netlify.app
USE_MEMORY_DB=false
```

**For Netlify Frontend:**
```
REACT_APP_API_URL=https://your-render-backend-url.onrender.com/api
```

---

## Test Credentials

```
Email: test@example.com
Password: password123
```

Or register new account in the app.

---

## URLs You'll Have After Deployment

```
GitHub:  https://github.com/ashin000/CRM-intern
Frontend: https://your-site.netlify.app
Backend:  https://crm-backend-xxx.onrender.com
```

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Backend won't deploy | Set root directory to `backend` in Render |
| Frontend can't connect | Check REACT_APP_API_URL in Netlify |
| Login fails | Verify JWT_SECRET matches in all places |
| Variables not working | Redeploy after updating env variables |
| Page keeps redirecting | Clear browser cache (Ctrl+Shift+Delete) |

---

## Support Links

- DEPLOYMENT_CHECKLIST.md - Step by step guide
- SUBMISSION_NOTES.md - Full deployment info
- README.md - Project overview
- INSTALLATION_GUIDE.md - Local setup help
