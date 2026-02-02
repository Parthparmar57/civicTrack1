# Login Functionality Troubleshooting Guide

## Quick Start
1. **Start Backend**: Run `start-backend.bat` or `cd backend && npm run dev`
2. **Start Frontend**: Run `start-frontend.bat` or `cd frontend && npm run dev`
3. **Test Login**: Open http://localhost:5173 and try logging in

## Login Flow Verification ✅

### Frontend Components Status:
- ✅ Login.jsx - Proper form validation and submission
- ✅ AuthContext.jsx - Token management and user state
- ✅ api.js - Axios configuration with interceptors
- ✅ PrivateRoute.jsx - Route protection
- ✅ App.jsx - Proper routing setup

### Backend Components Status:
- ✅ auth.controller.js - Login/register/getMe endpoints
- ✅ auth.routes.js - Route definitions
- ✅ auth.middleware.js - JWT token validation
- ✅ auth.validation.js - Input validation schemas

### Configuration Status:
- ✅ Vite proxy: `/api` → `http://localhost:3000`
- ✅ CORS: Frontend origins allowed
- ✅ Environment: JWT_SECRET and MongoDB URI configured

## Common Issues & Solutions

### 1. "Network Error" or "Cannot connect"
**Cause**: Backend server not running
**Solution**: 
```bash
cd backend
npm install
npm run dev
```

### 2. "Invalid credentials" for valid users
**Cause**: Database connection issue or user doesn't exist
**Solution**: 
- Check MongoDB connection in backend logs
- Register a new user first
- Verify environment variables

### 3. "Token is not valid" errors
**Cause**: JWT_SECRET mismatch or expired tokens
**Solution**: 
- Clear localStorage: `localStorage.clear()`
- Restart backend server
- Check JWT_SECRET in .env file

### 4. Frontend not loading
**Cause**: Frontend server not running or build issues
**Solution**:
```bash
cd frontend
npm install
npm run dev
```

### 5. CORS errors
**Cause**: Frontend running on different port than expected
**Solution**: Update CORS origins in `backend/src/app.js`

## Test Login Credentials
Since this is a new system, you'll need to:
1. Go to `/register` first
2. Create a test account
3. Then use those credentials to login

## Manual Testing Steps
1. Open browser to http://localhost:5173
2. Click "Create Account" 
3. Register with: name, email, password
4. Go back to login page
5. Use the same email/password to login
6. Should redirect to `/dashboard`

## Debug Mode
To see detailed logs:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API calls
4. Backend logs will show in terminal

## API Endpoints
- POST `/api/auth/register` - Create account
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user (requires token)