xcopy "C:\Program Files" "D:\Program Files\" /E /H /K /X /Y /C
xcopy "C:\Program Files (x86)" "D:\Program Files (x86)\" /E /H /K /X /Y /C
rmdir /s /q "C:\Program Files"
rmdir /s /q "C:\Program Files (x86)"
mklink /J "C:\Program Files" "D:\Program Files"
mklink /J "C:\Program Files (x86)" "D:\Program Files (x86)"