@echo off
setlocal enabledelayedexpansion

for /r "%CD%" %%F in (*.svg) do (
  set "ico=%%~dpnF.ico"

  if not exist "!ico!" (
    magick -background none -density 300 "%%F" -define icon:auto-resize=256,48,32,24,16 "!ico!"
    echo Created !ico!
  )
)

pause
