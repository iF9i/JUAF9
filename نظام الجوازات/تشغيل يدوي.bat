@echo off
cd /d "%~dp0system"

echo ============================================
echo Passport System
echo ============================================
echo.

python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not added to PATH.
    echo Please install Python first, then run install.bat.
    pause
    exit /b 1
)

if not exist "app.py" (
    echo ERROR: app.py was not found in system folder.
    pause
    exit /b 1
)

echo Starting server...
echo Open this link if the browser does not open:
echo http://127.0.0.1:5000
echo.
echo Press CTRL+C to stop the server.
echo.

start "" cmd /c "timeout /t 2 >nul && start http://127.0.0.1:5000"

python app.py

echo.
echo Server stopped.
pause
