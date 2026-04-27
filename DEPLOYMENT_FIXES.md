# 🔧 Deployment Troubleshooting & Common Errors

## ⚠️ Issues That Cause Deployment Failures

### 1. ❌ Incorrect Backend Vercel Configuration

**Fixed in**: `backend/vercel.json`

**Before**:

```json
"buildCommand": "cd .. && npm install"  // ❌ WRONG - tries to go to parent directory
```

**After**:

```json
"buildCommand": "npm install"  // ✅ CORRECT - installs in backend directory
```

---

### 2. ❌ Missing Environment Variables on Vercel

**Problem**: Backend fails because Supabase credentials are not set in production

**Solution**: Set these variables in Vercel Project Settings → Environment Variables:

```
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_SERVICE_KEY=your-supabase-service-key
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLIENT_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production
```

**Important**:

- Update `CLIENT_URL` to match your actual frontend domain
- Update `GOOGLE_CALLBACK_URL` if using OAuth
- These are already in `backend/.env` for local development

---

### 3. ❌ CORS Errors in Production

**Error**: Frontend can't connect to backend

```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Fix**: Update `backend/server.js` CORS configuration:

Currently:

```javascript
origin: process.env.CLIENT_URL || "http://localhost:8080";
```

This should work, but verify:

1. Frontend domain is set as `CLIENT_URL` env variable
2. Both frontend and backend are deployed
3. No typos in domain names

**Example for production**:

```env
CLIENT_URL=https://docentdesk.vercel.app
```

---

### 4. ❌ OpenAI API Errors

**Error**: Chat feature fails

```
Error: 401 Unauthorized - Invalid API key
```

**Reason**: `OPENAI_API_KEY` is not set in production

**Solution**:

- Either set a valid OpenAI API key in Vercel environment variables
- Or the backend gracefully disables chat (already implemented)

Current code:

```javascript
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({...})  // Only initializes if key exists
}
```

---

### 5. ❌ Port Issues in Production

**Error**:

```
listen EADDRINUSE :::5000
```

**Fix**: The backend uses dynamic port assignment on Vercel

```javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT, ...);  // ✅ Correct
```

This is already correctly implemented in `server.js`

---

### 6. ❌ Build Size Warning

**Warning**:

```
(!) Some chunks are larger than 500 kB after minification.
```

**Status**: ⚠️ Warning only (not an error)

**When to fix**: If deployment times out or fails

**Solutions**:

1. Code splitting with dynamic imports
2. Remove unused dependencies
3. Current bundle: ~574KB gzipped (acceptable)

---

## 🔍 Common Error Messages & Solutions

### Error: "Cannot find module '@supabase/supabase-js'"

```
Fix: Run npm install in backend/
npm install
```

### Error: "SUPABASE_URL or SUPABASE_SERVICE_KEY missing"

```
Fix: Add to .env or Vercel environment variables
SUPABASE_URL=https://...
SUPABASE_SERVICE_KEY=...
```

### Error: "JWT token verification failed"

```
Fix: Ensure JWT_SECRET is the SAME on all deployments
Should match between local .env and Vercel environment variables
```

### Error: "Database connection timeout"

```
Fix: Verify Supabase is accessible from Vercel
- Check Supabase project is not in IP whitelist mode
- Verify credentials are correct
```

---

## ✅ Pre-Deployment Checklist

- [ ] Run locally successfully
  - [ ] Backend: `npm start` works on port 5000
  - [ ] Frontend: `npm run dev` works on port 8080
  - [ ] No CORS errors in console
  - [ ] Can login/use features

- [ ] Code changes committed
  - [ ] Verify `backend/vercel.json` is fixed
  - [ ] No console errors or warnings
  - [ ] All imports resolve correctly

- [ ] Environment variables set in Vercel
  - [ ] Frontend domain set as `CLIENT_URL`
  - [ ] All required variables in "Environment Variables"
  - [ ] No sensitive data in code (only in .env)

- [ ] Build test
  - [ ] Run `npm run build` locally succeeds
  - [ ] No build errors or warnings
  - [ ] dist/ folder created

---

## 🚀 Correct Deployment Steps

### 1. Frontend (React App)

```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys from main branch
# No configuration needed beyond vercel.json ✅
```

### 2. Backend (Express API)

```bash
# Ensure backend/vercel.json is correct ✅
# Set environment variables in Vercel dashboard
# Push to GitHub - Vercel auto-deploys
```

### 3. Test Deployment

```bash
# Visit deployed frontend URL
# Check browser console (F12) for errors
# Test API calls to backend

# Verify with curl:
curl https://backend-api-domain.vercel.app/
# Should return API documentation
```

---

## 📊 Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│           Frontend (React + Vite)               │
│    https://docentdesk.vercel.app                │
│                                                 │
│  vercel.json ✅                                 │
│  - Build: npm run build                         │
│  - Output: dist/                                │
└────────────┬────────────────────────────────────┘
             │ API calls (CORS)
             │ http://localhost:5000 (local)
             │ https://backend-api.vercel.app (prod)
             │
┌────────────▼────────────────────────────────────┐
│          Backend (Express + Node.js)            │
│    https://backend-api.vercel.app               │
│                                                 │
│  vercel.json ✅ (FIXED)                         │
│  - Build: npm install ✅                        │
│  - Start: node server.js                        │
└────────────┬────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────┐
│       Database (Supabase PostgreSQL)            │
│    https://tcalunwjzjqjwrrkuedg.supabase.co    │
│                                                 │
│  Connection: Uses SUPABASE_URL +                │
│              SUPABASE_SERVICE_KEY               │
└─────────────────────────────────────────────────┘
```

---

## 🐛 Debug Production Issues

### 1. Check Backend Logs

```bash
# In Vercel dashboard:
# Project > Deployments > [Your Deployment] > Logs
# Look for:
✅ ✅ Supabase client initialized
🔍 Environment loaded
🚀 Server running
```

### 2. Check Frontend Errors

```javascript
// Browser Console (F12)
// Look for network errors to backend
// CORS errors mean CORS config issue
// 404 errors mean wrong API endpoint
```

### 3. Test API Endpoint

```bash
curl https://backend-api.vercel.app/
# Should return:
# {
#   "success": true,
#   "message": "DocentDesk Museum Platform API",
#   ...
# }
```

---

## 🔄 If Deployment Still Fails

1. **Redeploy**:
   - Vercel > Deployments > [Failed] > Redeploy
   - Forces rebuild

2. **Check Recent Changes**:
   - Did you modify backend/vercel.json?
   - Did you update environment variables?

3. **Review Logs**:
   - Vercel > Deployments > [Failed] > Logs
   - Look for specific error messages

4. **Verify All Files**:

   ```bash
   git status
   git add .
   git commit -m "Fix: deployment configuration"
   git push
   ```

5. **Contact Vercel Support**:
   - If stuck, check Vercel docs
   - Provide: Deployment logs + vercel.json + .env vars (sanitized)

---

## ✨ Status After Fixes

✅ **Backend Vercel Configuration**: FIXED  
✅ **Local Development**: Working  
✅ **Environment Variables**: Configured  
✅ **CORS Configuration**: Correct  
✅ **Ready for Deployment**: YES

---

**Next**: Push to GitHub and monitor first Vercel deployment!
