@echo off
set "ROOT=%~dp0"
set "SYS=%ROOT%system"
set "APP=%SYS%\app.py"
set "MON=%SYS%\monitor.bat"

if not exist "%APP%" (
    echo ERROR: app.py was not found.
    pause
    exit /b 1
)

powershell -NoProfile -Command "Start-Process python -ArgumentList 'app.py' -WorkingDirectory '%SYS%' -WindowStyle Hidden"

if exist "%MON%" (
    start "Passport Monitor" /min cmd /c ""%MON%""
) else (
    echo WARNING: monitor.bat was not found.
)

:waitloop
timeout /t 1 >nul
curl -s http://127.0.0.1:5000 >nul 2>&1
if errorlevel 1 goto waitloop

start http://127.0.0.1:5000
