@echo off&echo 批量删除相同文件
if "%~1"=="" set/p dd=输入或拖入要删除的文件夹

cd/d "%dd%"

del /s gitkeep.txt

pause