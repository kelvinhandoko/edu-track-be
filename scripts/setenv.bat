@echo off
REM Read .env file and set environment variables

for /f "usebackq tokens=*" %%a in (`.env`) do (
    REM Skip lines starting with '#'
    echo %%a | findstr /B /R "[^#]" >nul
    if not errorlevel 1 (
        REM Set environment variable
        SET %%a
    )
)
