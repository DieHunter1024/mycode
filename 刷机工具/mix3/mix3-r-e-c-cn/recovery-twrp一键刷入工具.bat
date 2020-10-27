@ECHO OFF

set device_name=Xiaomi MIX 3
set rec_name=TWRP
set rec_ver=3.3.1-1030
set rec_auth=
set rec_team=
set rec_date=2018.12.05
set rec_img=recovery-TWRP-3.3.1-1030-XIAOMI_MIX3-CN-wzsx150.img

TITLE %device_name% 一键刷入recovery工具 
color 3f

:LOGO
CLS
ECHO.
ECHO.         %device_name% 一键刷入recovery工具
ECHO.***********************************************
ECHO.              RECOVERY基本信息
ECHO.
ECHO.              REC名称 ：%rec_name%
ECHO.              REC版本 ：%rec_ver%
ECHO.              适配机型：%device_name%
ECHO.              编译时间：%rec_date%
ECHO.           
ECHO.     （支持开机状态刷入和fastboot模式刷入）    
ECHO.***********************************************
ECHO.
ECHO.按任意键继续...
pause>nul

:MENU
CLS
ECHO.
ECHO.         %device_name% 一键刷入recovery工具
ECHO.***********************************************
ECHO.             您手机的当前状态：
ECHO.
ECHO.              1.开机状态
ECHO.
ECHO.              2.fastboot模式
ECHO.
ECHO.              3.其他状态
ECHO.
ECHO.
ECHO.***********************************************
ECHO.
set choice=
set /p choice=请直接输入对应数字回车：
if not "%choice%"=="" set choice=%choice:~0,1%
if /i "%choice%"=="1" goto IN_SYSTEM
if /i "%choice%"=="2" goto FASTBOOT_MODE
if /i "%choice%"=="3" goto OTHERS
ECHO.
ECHO.输入无效，请重新输入...
timeout /t 2 /nobreak >NUL
ECHO.
goto MENU


:OTHERS
CLS
ECHO.
ECHO.         %device_name% 一键刷入recovery工具
ECHO.***********************************************
ECHO.             请先将手机处于
ECHO.
ECHO.               【开机状态】
ECHO.                  或者
ECHO.             【fastboot模式】
ECHO.
ECHO.（按任意键返回上级菜单，若无操作则6秒后自动返回）
ECHO.***********************************************
ECHO.
timeout /t 6 >nul
echo.
goto MENU


:IN_SYSTEM
CLS
ECHO.
ECHO.         %device_name% 一键刷入recovery工具
ECHO.***********************************************
ECHO.          请您将手机正确连接到电脑：
ECHO.
ECHO.            请确保：
ECHO.      【1.手机bootloader未锁】
ECHO.      【2.手机处于开机状态】
ECHO.      【3.手机开启USB调试】
ECHO.      【4.电脑上已经正确安装驱动】
ECHO.      【5.手机提示USB调试授权时勾选始终点击授权】
ECHO.
ECHO.            （按下任意键继续）
ECHO.***********************************************
ECHO.
pause>nul
ECHO.        正在检查设备是否正常连接...
ECHO.
ECHO.   （若长时间停留在此界面，请检查上述几项）
ECHO.           （并重启该工具）
ECHO.***********************************************
ECHO.
timeout /t 2 /nobreak >NUL
adb.exe wait-for-device >NUL 2>NUL

CLS
ECHO.
ECHO.         %device_name% 一键刷入recovery工具
ECHO.***********************************************
ECHO.
ECHO.
ECHO.             手机重启中...
ECHO.
ECHO.
ECHO.***********************************************
ECHO.
ECHO.   （若长时间停留在此界面，请重启该工具）
ECHO.
adb.exe reboot bootloader >NUL 2>NUL
timeout /t 3 /nobreak >NUL
goto FLASHING


:FASTBOOT_MODE
CLS
ECHO.
ECHO.         %device_name% 一键刷入recovery工具
ECHO.***********************************************
ECHO.          请您将手机正确连接到电脑：
ECHO.
ECHO.          请确保：
ECHO.        【1.手机bootloader未锁】
ECHO.        【2.手机处于fastboot模式】
ECHO.        【3.电脑上已经正确安装驱动】
ECHO.
ECHO.            （按下任意键继续）
ECHO.***********************************************
ECHO.
pause>nul
goto FLASHING


:FLASHING
CLS
ECHO.
ECHO.         %device_name% 一键刷入recovery工具
ECHO.***********************************************
ECHO.
ECHO.          正在检查设备是否正常连接...
ECHO.
ECHO.
ECHO.      （如果长时间停留在此界面，请检查：）
ECHO.
ECHO.      【1.USB线是否正确连接】
ECHO.      【2.电脑驱动是否正确安装并识别】
ECHO.      【3.手机是否进入fastboot模式】
ECHO.
ECHO.             （并重启该工具）
ECHO.***********************************************
timeout /t 2 /nobreak >NUL
fastboot.exe wait-for-device >NUL 2>NUL

CLS
ECHO.
ECHO.         %device_name% 一键刷入recovery工具
ECHO.***********************************************
ECHO.
ECHO.
ECHO.             正在刷入recovery...
ECHO.
ECHO.
ECHO.***********************************************
ECHO.
ECHO.      （若出现 OKAY 刷入成功，否则失败）
ECHO.
ECHO.    （若长时间停留在此界面，请重启该工具）
ECHO.
fastboot.exe flash recovery "%rec_img%" || goto FLASH_FAILED
fastboot.exe flash misc misc.bin >NUL 2>NUL
timeout /t 6 /nobreak >NUL
goto FLASH_OVER


:FLASH_FAILED
ECHO.
ECHO. ！！出错！！
timeout /t 6 /nobreak >NUL
CLS
ECHO.
ECHO.         %device_name% 一键刷入recovery工具
ECHO.***********************************************
ECHO.
ECHO.                   刷入失败！
ECHO.
ECHO.           1.请检查手机型号是否正确
ECHO.           2.请确认fastboot是否正常
ECHO.           3.解压后重新运行本程序，
ECHO.             若还不成功，请联系作者
ECHO.
ECHO.           %rec_auth%感谢您使用本工具
ECHO.
ECHO.            （按任意键退出程序）
ECHO.***********************************************
ECHO.
timeout /t 1 /nobreak >NUL
pause >NUL
EXIT


:FLASH_OVER
CLS
ECHO.
ECHO.         %device_name% 一键刷入recovery工具
ECHO.***********************************************
ECHO.
ECHO.             刷写recovery完成
ECHO.
ECHO.
ECHO.        手机将重启进入%rec_name%的rec模式
ECHO.            （可能会重启1-2次）
ECHO.
ECHO.
ECHO.           %rec_auth%感谢您使用本工具
ECHO.
ECHO.           （按任意键关闭此窗口）
ECHO.***********************************************
ECHO.
fastboot.exe reboot
pause >NUL

EXIT


