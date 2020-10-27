@ECHO OFF

set device_name=Xiaomi MIX 3
set rec_name=TWRP
set rec_ver=3.3.1-1030
set rec_auth=
set rec_team=
set rec_date=2018.12.05
set rec_img=recovery-TWRP-3.3.1-1030-XIAOMI_MIX3-CN-wzsx150.img

TITLE %device_name% һ��ˢ��recovery���� 
color 3f

:LOGO
CLS
ECHO.
ECHO.         %device_name% һ��ˢ��recovery����
ECHO.***********************************************
ECHO.              RECOVERY������Ϣ
ECHO.
ECHO.              REC���� ��%rec_name%
ECHO.              REC�汾 ��%rec_ver%
ECHO.              ������ͣ�%device_name%
ECHO.              ����ʱ�䣺%rec_date%
ECHO.           
ECHO.     ��֧�ֿ���״̬ˢ���fastbootģʽˢ�룩    
ECHO.***********************************************
ECHO.
ECHO.�����������...
pause>nul

:MENU
CLS
ECHO.
ECHO.         %device_name% һ��ˢ��recovery����
ECHO.***********************************************
ECHO.             ���ֻ��ĵ�ǰ״̬��
ECHO.
ECHO.              1.����״̬
ECHO.
ECHO.              2.fastbootģʽ
ECHO.
ECHO.              3.����״̬
ECHO.
ECHO.
ECHO.***********************************************
ECHO.
set choice=
set /p choice=��ֱ�������Ӧ���ֻس���
if not "%choice%"=="" set choice=%choice:~0,1%
if /i "%choice%"=="1" goto IN_SYSTEM
if /i "%choice%"=="2" goto FASTBOOT_MODE
if /i "%choice%"=="3" goto OTHERS
ECHO.
ECHO.������Ч������������...
timeout /t 2 /nobreak >NUL
ECHO.
goto MENU


:OTHERS
CLS
ECHO.
ECHO.         %device_name% һ��ˢ��recovery����
ECHO.***********************************************
ECHO.             ���Ƚ��ֻ�����
ECHO.
ECHO.               ������״̬��
ECHO.                  ����
ECHO.             ��fastbootģʽ��
ECHO.
ECHO.��������������ϼ��˵������޲�����6����Զ����أ�
ECHO.***********************************************
ECHO.
timeout /t 6 >nul
echo.
goto MENU


:IN_SYSTEM
CLS
ECHO.
ECHO.         %device_name% һ��ˢ��recovery����
ECHO.***********************************************
ECHO.          �������ֻ���ȷ���ӵ����ԣ�
ECHO.
ECHO.            ��ȷ����
ECHO.      ��1.�ֻ�bootloaderδ����
ECHO.      ��2.�ֻ����ڿ���״̬��
ECHO.      ��3.�ֻ�����USB���ԡ�
ECHO.      ��4.�������Ѿ���ȷ��װ������
ECHO.      ��5.�ֻ���ʾUSB������Ȩʱ��ѡʼ�յ����Ȩ��
ECHO.
ECHO.            �����������������
ECHO.***********************************************
ECHO.
pause>nul
ECHO.        ���ڼ���豸�Ƿ���������...
ECHO.
ECHO.   ������ʱ��ͣ���ڴ˽��棬�����������
ECHO.           ���������ù��ߣ�
ECHO.***********************************************
ECHO.
timeout /t 2 /nobreak >NUL
adb.exe wait-for-device >NUL 2>NUL

CLS
ECHO.
ECHO.         %device_name% һ��ˢ��recovery����
ECHO.***********************************************
ECHO.
ECHO.
ECHO.             �ֻ�������...
ECHO.
ECHO.
ECHO.***********************************************
ECHO.
ECHO.   ������ʱ��ͣ���ڴ˽��棬�������ù��ߣ�
ECHO.
adb.exe reboot bootloader >NUL 2>NUL
timeout /t 3 /nobreak >NUL
goto FLASHING


:FASTBOOT_MODE
CLS
ECHO.
ECHO.         %device_name% һ��ˢ��recovery����
ECHO.***********************************************
ECHO.          �������ֻ���ȷ���ӵ����ԣ�
ECHO.
ECHO.          ��ȷ����
ECHO.        ��1.�ֻ�bootloaderδ����
ECHO.        ��2.�ֻ�����fastbootģʽ��
ECHO.        ��3.�������Ѿ���ȷ��װ������
ECHO.
ECHO.            �����������������
ECHO.***********************************************
ECHO.
pause>nul
goto FLASHING


:FLASHING
CLS
ECHO.
ECHO.         %device_name% һ��ˢ��recovery����
ECHO.***********************************************
ECHO.
ECHO.          ���ڼ���豸�Ƿ���������...
ECHO.
ECHO.
ECHO.      �������ʱ��ͣ���ڴ˽��棬���飺��
ECHO.
ECHO.      ��1.USB���Ƿ���ȷ���ӡ�
ECHO.      ��2.���������Ƿ���ȷ��װ��ʶ��
ECHO.      ��3.�ֻ��Ƿ����fastbootģʽ��
ECHO.
ECHO.             ���������ù��ߣ�
ECHO.***********************************************
timeout /t 2 /nobreak >NUL
fastboot.exe wait-for-device >NUL 2>NUL

CLS
ECHO.
ECHO.         %device_name% һ��ˢ��recovery����
ECHO.***********************************************
ECHO.
ECHO.
ECHO.             ����ˢ��recovery...
ECHO.
ECHO.
ECHO.***********************************************
ECHO.
ECHO.      �������� OKAY ˢ��ɹ�������ʧ�ܣ�
ECHO.
ECHO.    ������ʱ��ͣ���ڴ˽��棬�������ù��ߣ�
ECHO.
fastboot.exe flash recovery "%rec_img%" || goto FLASH_FAILED
fastboot.exe flash misc misc.bin >NUL 2>NUL
timeout /t 6 /nobreak >NUL
goto FLASH_OVER


:FLASH_FAILED
ECHO.
ECHO. ����������
timeout /t 6 /nobreak >NUL
CLS
ECHO.
ECHO.         %device_name% һ��ˢ��recovery����
ECHO.***********************************************
ECHO.
ECHO.                   ˢ��ʧ�ܣ�
ECHO.
ECHO.           1.�����ֻ��ͺ��Ƿ���ȷ
ECHO.           2.��ȷ��fastboot�Ƿ�����
ECHO.           3.��ѹ���������б�����
ECHO.             �������ɹ�������ϵ����
ECHO.
ECHO.           %rec_auth%��л��ʹ�ñ�����
ECHO.
ECHO.            ����������˳�����
ECHO.***********************************************
ECHO.
timeout /t 1 /nobreak >NUL
pause >NUL
EXIT


:FLASH_OVER
CLS
ECHO.
ECHO.         %device_name% һ��ˢ��recovery����
ECHO.***********************************************
ECHO.
ECHO.             ˢдrecovery���
ECHO.
ECHO.
ECHO.        �ֻ�����������%rec_name%��recģʽ
ECHO.            �����ܻ�����1-2�Σ�
ECHO.
ECHO.
ECHO.           %rec_auth%��л��ʹ�ñ�����
ECHO.
ECHO.           ����������رմ˴��ڣ�
ECHO.***********************************************
ECHO.
fastboot.exe reboot
pause >NUL

EXIT


