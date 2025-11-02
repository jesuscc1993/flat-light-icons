@echo off
setlocal

for /r "%CD%" %%F in (*.svg) do (
  set "png=%%~dpnF.png"
  set "ico=%%~dpnF.ico"

  if not exist "%%~dpnF.png" (
    magick -background none -density 300 "%%F" "%%~dpnF.png"
    echo Created %%~dpnF.png
  )

  if not exist "%%~dpnF.ico" (
    magick -background none -density 300 "%%F" -define icon:auto-resize=256,48,32,24,16 "%%~dpnF.ico"
    echo Created %%~dpnF.ico
  )
)

pause
