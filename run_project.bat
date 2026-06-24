@echo off
title Pro Hoop Training App Runner
echo ===================================================
echo   KHOI DONG DU AN BASKETBALL TRAINING APP (Pro Hoop Training)
echo ===================================================

echo.
echo [1/3] Dang khoi dong Backend Server (FastAPI)...
start /B cmd /c "cd Backend && .\venv\Scripts\uvicorn.exe main:app --host 127.0.0.1 --port 8000"

echo.
echo [2/3] Dang khoi dong Frontend Server (Vite + React)...
start /B cmd /c "cd Frontend && npm run dev"

echo.
echo [3/3] Cho he thong khoi tao trong 3 giay...
timeout /t 3 /nobreak >nul

echo.
echo [OK] Dang tu dong mo ung dung tren trinh duyet...
start http://localhost:5173

echo.
echo ---------------------------------------------------
echo Ung dung dang chay! Ban co the truy cap tai: http://localhost:5173
echo De dung ung dung, hay dong cua so terminal nay lai.
echo ---------------------------------------------------
echo.
pause
