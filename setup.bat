@echo off
REM CRM Application - Automatic Setup Script for Windows

echo ================================
echo CRM MERN Application Setup
echo ================================

REM Backend Setup
echo.
echo Setting up Backend...
cd backend
call npm install
copy .env.example .env
echo ✓ Backend dependencies installed
echo ⚠️  Please edit backend\.env with your MongoDB connection string

REM Frontend Setup
cd ..\frontend
call npm install
copy .env.example .env
echo ✓ Frontend dependencies installed
echo.
echo ================================
echo Setup Complete!
echo ================================
echo.
echo Next Steps:
echo 1. Start MongoDB: mongod
echo 2. Start Backend Terminal: cd backend ^&^& npm run dev
echo 3. Start Frontend Terminal: cd frontend ^&^& npm start
echo.
echo Access the application at: http://localhost:3000
echo.
pause
