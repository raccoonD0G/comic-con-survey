@echo off
setlocal

:: 1) 관리자 권한 확인 → 아니면 자기 자신을 관리자 권한으로 재실행
net session >nul 2>&1
if %errorlevel% neq 0 (
  powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "Start-Process cmd -ArgumentList '/c \"\"%~f0\" %*\"' -Verb RunAs"
  exit /b
)

:: 2) 이 배치파일이 있는 폴더(=프로젝트 루트)로 이동
cd /d "%~dp0"

:: 3) npm 찾기 (관리자 PATH에 없을 수 있으므로 보강)
where npm >nul 2>&1
if %errorlevel% neq 0 (
  set "NPM_EXE=%ProgramFiles%\nodejs\npm.cmd"
) else (
  for /f "delims=" %%I in ('where npm') do (
    set "NPM_EXE=%%I"
    goto :gotnpm
  )
)
:gotnpm

if not exist "%NPM_EXE%" (
  echo [ERROR] npm을 찾을 수 없습니다. Node.js를 설치하거나 PATH에 추가하세요.
  pause
  exit /b 1
)

echo 현재 폴더: %cd%
echo 사용 npm: "%NPM_EXE%"
call "%NPM_EXE%" --version

:: 4) npm start 실행 (npm.cmd는 배치이므로 call 사용)
call "%NPM_EXE%" start

echo.
echo [INFO] 창이 바로 닫히지 않도록 일시정지합니다.
pause
