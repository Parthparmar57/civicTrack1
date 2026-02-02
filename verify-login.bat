@echo off
echo ========================================
echo    CivicTrack Login Verification
echo ========================================
echo.
echo This script will verify that login functionality is working properly.
echo.
echo Step 1: Checking if backend is running...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend server is running on port 3000
) else (
    echo ❌ Backend server is NOT running on port 3000
    echo Please run start-backend.bat first
    pause
    exit /b 1
)

echo.
echo Step 2: Checking if frontend is accessible...
curl -s http://localhost:5173 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend server is running on port 5173
) else (
    echo ❌ Frontend server is NOT running on port 5173
    echo Please run start-frontend.bat first
    pause
    exit /b 1
)

echo.
echo Step 3: Testing API endpoints...
echo Testing auth endpoints...
curl -s -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@test.com\",\"password\":\"123456\"}" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Auth API endpoint is accessible
) else (
    echo ❌ Auth API endpoint is not responding
)

echo.
echo ========================================
echo    Manual Testing Instructions
echo ========================================
echo.
echo 1. Open your browser to: http://localhost:5173
echo 2. Click "Create Account" to register a new user
echo 3. Fill in: Name, Email, Password (min 6 characters)
echo 4. After registration, go back to login page
echo 5. Use the same email/password to login
echo 6. You should be redirected to the dashboard
echo.
echo If you encounter issues, check LOGIN_TROUBLESHOOTING.md
echo.
pause