---
title: Hardware
category: System Setup
order: 1
---

## 1. Prototype Hardware

The hardware which we have been using for this project is as follows:
-   [Panasonic SN-GCJA5](https://na.industrial.panasonic.com/products/sensors/air-quality-gas-flow-sensors/lineup/laser-type-pm-sensor/series/123557/model/123559) - A particulate matter sensor which measures the concentration and density of particles in the air. Particles with a diameter between 1-2.5µm,(PM2.5) and 7.5-10µm (PM10) can be measured using this sensor.

-   [Bosch Sensortec BME680](https://www.bosch-sensortec.com/products/environmental-sensors/gas-sensors/bme680/) - A 4-in-1 sensor which measures ambient temperature, relative humidity, barometric pressure and biogenic volatile organic compounds (bVOC).

-   [Silicon Labs Si1145](https://www.silabs.com/sensors/optical/si114x) - A UV index and ambient light sensor which measures the local UV index and ambient light levels (in luminous flux).

-   [RaspberryPi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) - A single board computer which will be used to control the sensors and manage their data.
	- You will also need the microSD card and power adaptor.
	- The later 4 model B can also be used.
	- To control the RaspberryPi, you can either setup a secure shell connection using your own computer or use the GUI by connecting a monitor via HDMI and a mouse via USB.

<div align = "center">
<img src="/images/DSCF1502_square.jpg">
<br>
<a> <b>The Hardware</b> </a>
</div>
<a>
</a>

## 2. Setup Instructions

1. Connect the power supply to the RaspberryPi and insert the microSD card. Start-up the RaspberryPi. If this is your first time using your RaspberryPi, setup the operating system.

2. Connect the SDA (pin 2), SCL (pin 3), Vdd (pin 5) and GND (pin 4) pins of the sn-gcja 5 to GPIO 2 (pin 3), GPIO 3 (pin 5), 3v3 Power (pin 1) and a ground pin (e.g. pin 9) of the raspberry pi respectively.

3. Connect the SDA (pin 1), SCL (pin 2), Vdd (pin 3) and GND (pin 8) pins of the si1145 to GPIO 2, GPIO 3, 5V (pin 2) Power and a ground pin of the raspberry pi respectively.

4. Connect the SDA (pin 3), SCL (pin 4), Vdd (pin 8) and GND (pin 1) pins of the bme680 to GPIO 2, GPIO 3, 3v3 Power and a ground pin of the raspberry pi respectively.

For help with the RaspberryPi pinouts checkout [pinout.xyz](https://pinout.xyz/).

You can use a breadboard or a Veroboard to help with the placement and connections of the sensor boards.

<div align = "center">
<img src="/images/DSCF1505_square.jpg">
<br>
<a> <b>The Hardware Connected Together</b> </a>
</div>
<a>
</a>
