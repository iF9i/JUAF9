@echo off
cd /d "%~dp0"

if not exist "monitor.ps1" (
    echo ERROR: monitor.ps1 was not found.
    pause
    exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0monitor.ps1"
