@echo off
cls
echo *************************************
echo *************Information*************
echo *************************************
echo Dirver Installer v1.0

for /f %%i in ('ver^|find "5.0."') do echo Win NT && set osrecognized=1
for /f %%i in ('ver^|find "5.1."') do echo Win XP && set osrecognized=1
for /f %%i in ('ver^|find "5.2."') do echo Win 2003 && set osrecognized=1
for /f %%i in ('ver^|find "6.0."') do echo Win Vista && set osrecognized=1
for /f %%i in ('ver^|find "6.1."') do echo Win 7 && set osrecognized=1
for /f %%i in ('ver^|find "6.2."') do echo Win 8 && set osrecognized=1
for /f %%i in ('ver^|find "6.3."') do echo Win 8.1 && set osrecognized=1

if not defined osrecognized goto NotSupport

@set PLATFORM=x86
@if "%processor_architecture%"=="x86" (set PLATFORM=%cd%/SmartPhoneDriver/x86) ^
else (set PLATFORM=%cd%/SmartPhoneDriver/x64)

echo %PLATFORM%
@echo.
@echo.



echo *********************************************
echo **********Uninstall SP unsigned inf**********
echo *********************************************
"%PLATFORM%/DPInst.exe" /U "%PLATFORM%\Unsigned infs\android_winusb.inf" /SW /D
"%PLATFORM%/DPInst.exe" /U "%PLATFORM%\Unsigned infs\cdc-acm.inf" /SW /D
"%PLATFORM%/DPInst.exe" /U "%PLATFORM%\Unsigned infs\tetherxp.inf" /SW /D
"%PLATFORM%/DPInst.exe" /U "%PLATFORM%\Unsigned infs\wpdmtp.inf" /SW /D
echo Uninstall complete!
@echo.
@echo.


echo *******************************************
echo **********Uninstall SP signed inf**********
echo *******************************************
"%PLATFORM%/DPInst.exe" /U "%PLATFORM%\Infs\usbvcom.inf" /SW /D
"%PLATFORM%/DPInst.exe" /U "%PLATFORM%\Infs\usbvcom_brom.inf" /SW /D
echo Uninstall complete!
@echo.
@echo.



goto end

:NotSupport
echo Do Not support Win NT earlier version

:end
pause