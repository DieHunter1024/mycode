@echo off&echo ���ҿ��ļ���

set dd=%~1

if "%~1"=="" set/p dd=���������Ҫ���ҵ����ļ��У�

cd/d "%dd%"

for /f "delims=" %%a in ('dir/b/s/ad')do (

  dir/a/s/b "%%a"|find/v "">nul||(set/a "fn+=1"&echo.·�� %%a �ļ����� %%~nxa&type nul>>%%a\.gitkeep))

if defined fn (echo ���ҵ� %fn% �����ļ��У��Ѵ���gitkeep���ļ�)else echo û�ҵ����ļ���

pause 