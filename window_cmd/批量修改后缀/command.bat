@echo off&echo �����޸ĺ�׺��
set dd=%~1
if "%~1"=="" set/p dd=����Ҫ�޸ĵĺ�׺��
ren *. *."%dd%"
pause