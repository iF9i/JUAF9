@echo off
cd /d "%~dp0system"

echo ============================================
echo Passport System - Install Requirements
echo ============================================
echo.

python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not added to PATH.
    echo Please install Python 3.10 or newer, then run this file again.
    pause
    exit /b 1
)

echo Python found.
python --version
echo.

if not exist "requirements.txt" (
    echo ERROR: requirements.txt was not found in system folder.
    pause
    exit /b 1
)

if exist "libs" (
    dir /b "libs\*.whl" >nul 2>&1
    if not errorlevel 1 (
        echo Trying offline install from libs...
        pip install --no-index --find-links="libs" -r requirements.txt
        if not errorlevel 1 (
            echo.
            echo Install completed successfully from libs.
            pause
            exit /b 0
        )
        echo.
        echo Offline install failed. Trying online install...
        echo.
    )
)

echo Installing requirements from internet...
pip install -r requirements.txt
if errorlevel 1 (
    echo.
    echo ERROR: Install failed.
    echo Check internet connection or Python/pip setup.
    pause
    exit /b 1
)

echo.
echo Install completed successfully.
pause
