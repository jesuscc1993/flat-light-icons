@echo off
setlocal enabledelayedexpansion

for /r "%CD%\SVG" %%F in (*.svg) do (
  set "icodir=%%~dpF"
  set "icodir=!icodir:\SVG\=\ICO\!"
  set "ico=!icodir!%%~nF.ico"

  if not exist "!icodir!" mkdir "!icodir!"

  if not exist "!ico!" (
    magick -background none -density 300 "%%F" -define icon:auto-resize=256,48,32,24,16 "!ico!"
    echo Created !ico!
  )
)

node "%~dp0demo\update-files-map.js"

pause
