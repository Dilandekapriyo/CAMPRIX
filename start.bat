@echo off
REM This script starts both the backend and frontend servers for development

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║   CAMPRIX - Frontend & Backend Setup                        ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

echo Checking prerequisites...
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo ✗ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js found: %((node -v))

REM Check if MySQL is accessible (optional check)
echo.
echo Checking MySQL connection...
REM This is a basic check - you may need to adjust based on your setup
tasklist | find "mysqld" >nul
if errorlevel 1 (
    echo ⚠ Warning: MySQL process not found. Make sure MySQL is running.
    echo.
) else (
    echo ✓ MySQL appears to be running
)

echo.
echo ════════════════════════════════════════════════════════════
echo Setup Options:
echo ════════════════════════════════════════════════════════════
echo 1. Install dependencies (run once)
echo 2. Start backend only (port 3000)
echo 3. Start frontend only (port 5173)
echo 4. Start both backend and frontend
echo 5. Setup database (initialize tables)
echo 6. Exit
echo.

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" (
    call :install_deps
) else if "%choice%"=="2" (
    call :start_backend
) else if "%choice%"=="3" (
    call :start_frontend
) else if "%choice%"=="4" (
    call :start_both
) else if "%choice%"=="5" (
    call :setup_db
) else if "%choice%"=="6" (
    exit /b 0
) else (
    echo Invalid choice. Please try again.
    timeout /t 2
    goto start
)

pause
exit /b 0

REM ====================================
REM Install dependencies
REM ====================================
:install_deps
cls
echo.
echo Installing backend dependencies...
cd backend
call npm install
echo.
echo Installing frontend dependencies...
cd ..\frontend
call npm install
cd ..
echo.
echo ✓ Dependencies installed successfully!
goto end

REM ====================================
REM Start backend only
REM ====================================
:start_backend
cls
echo.
echo Starting backend server on http://localhost:3000
echo Press Ctrl+C to stop
echo.
cd backend
call npm start
goto end

REM ====================================
REM Start frontend only
REM ====================================
:start_frontend
cls
echo.
echo Starting frontend server on http://localhost:5173
echo Press Ctrl+C to stop
echo.
cd frontend
call npm run dev
goto end

REM ====================================
REM Start both backend and frontend
REM ====================================
:start_both
cls
echo.
echo ════════════════════════════════════════════════════════════
echo Starting both servers...
echo ════════════════════════════════════════════════════════════
echo.
echo Backend will run on: http://localhost:3000
echo Frontend will run on: http://localhost:5173
echo.
echo Note: You need to open this in 2 terminals or use a terminal
echo multiplexer. Starting backend first...
echo.
echo Press any key to start backend, then open another terminal
echo to start the frontend.
echo.
pause
echo.
echo Starting backend...
start cmd /k "cd backend && npm start"
echo.
echo ════════════════════════════════════════════════════════════
echo Backend started in new window. Now open another terminal and run:
echo   cd frontend
echo   npm run dev
echo ════════════════════════════════════════════════════════════
goto end

REM ====================================
REM Setup database
REM ====================================
:setup_db
cls
echo.
echo Setting up database...
cd backend
call npm run setup
cd ..
echo.
echo ✓ Database setup complete!
goto end

:end
