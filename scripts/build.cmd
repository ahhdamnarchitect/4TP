@echo off
REM Prepends Node to PATH for npm/next on this machine. Run from repo: scripts\build.cmd
set "PATH=C:\Users\e159305\node\node-v25.8.2-win-x64;%PATH%"
cd /d "%~dp0.."
npm run build
