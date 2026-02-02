@echo off
echo ========================================
echo    CivicTrack Frontend Server
echo ========================================
echo.
echo Starting Frontend Development Server...
echo Frontend will be available at: http://localhost:5173
echo Backend should be running at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
cd frontend
npm run dev
pause