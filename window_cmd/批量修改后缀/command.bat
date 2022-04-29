@echo off&echo 批量修改后缀名
set dd=%~1
if "%~1"=="" set/p dd=输入要修改的后缀名
ren *. *."%dd%"
pause