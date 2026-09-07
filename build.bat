@echo off
setlocal enabledelayedexpansion

for /r "%CD%\SVG" %%F in (*.svg) do (
  set "ico_dir=%%~dpF"
  set "ico_dir=!ico_dir:\SVG\=\ICO\!"
  set "ico=!ico_dir!%%~nF.ico"

  if not exist "!ico_dir!" mkdir "!ico_dir!"

  set "should_build="
  if not exist "!ico!" set "should_build=1"
  if not defined should_build for %%D in ("!ico!") do if "%%~tF" GTR "%%~tD" set "should_build=1"

  if defined should_build (
    magick -background none -density 300 "%%F" -define icon:auto-resize=256,48,32,24,16 "!ico!"
    echo Created !ico!
  )
)

node "%~dp0demo\update-files-map.js"
git add *.svg *.ico demo\files.js
git commit
git push

@REM start "" "%~dp0demo\index.html"
