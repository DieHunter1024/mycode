Driver_Auto_Installer_v1.1236.00

ReadMe.txt


[Smart phone]
This application will install USB com port driver for MediaTek's device those IDs are listed below:

1."VID_0E8D&PID_0003"       (FeaturePhone & Smartphone BootROM - MTK USB Port)
2."VID_0E8D&PID_0023&MI_00" (FeaturePhone - MTK USB Modem Port)
3."VID_0E8D&PID_0023&MI_02" (FeaturePhone - MTK USB Debug Port)
4."VID_0E8D&PID_2000"       (SmartPhone - Preloaer USB Port)
5."VID_0E8D&PID_2001"       (SmartPhone - DA USB Port)
6."Vid_0E8D&PID_2006&MI_02" (SmartPhone - Kernel Gadget USB port, Please customize your kernel VID/PID)
  "Vid_0E8D&PID_2007"
  "Vid_0E8D&PID_200a&MI_02" 

注意: 实际Meta Mode手机Kernel软件串口VID/PID是"Vid_0BB4&PID_0005&MI_02", 默认请使用Android Tool Package/driver(binary)中Android_Gadget_CDC_driver.inf PC驱动.
      如果需要使用本install tool, 请参考usb客制化文档调整为"Vid_0E8D&PID_2006&MI_02"才能使用本驱动包.
