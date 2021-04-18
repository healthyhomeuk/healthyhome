---
title: Parameter Guide
category: System Overview
order: 2
---

The details of each of the parameters measured by healthyhome is explained in this page. The feedback on the quality of the measured parameters is also laid out in the tables below. The parameters have been grouped according to which sensor detects them. The quality of the IAQ values is based on ratings from the [BME680 datasheet](https://www.bosch-sensortec.com/products/environmental-sensors/gas-sensors/bme680/). The quality of the other of the parameters is based on data from [IAQUK](http://www.iaquk.org.uk/ESW/Files/IAQ_Rating_Index.pdf).

The ambient light level is not associated with colours. This is because it is not as straightforward to quantify the quality of luminous flux (lux). However, it can be said that light in room which is considered to be normally lit (e.g., in an office) should measure at approximately 500 lux. This value is based on data from the [National Optical Astronomy Observatory](https://www.noao.edu/education/QLTkit/ACTIVITY_Documents/Safety/LightLevels_outdoor+indoor.pdf).

- [BME680](#bme680)
	* [Indoor Air Quality](#indoor-air-quality)
	* [CO2e](#co2e)
	* [Humidity](#humidity)
	* [Temperature](#temperature)
- [SN-GCJA5](#sn-gcja5)
	* [PM2.5 Particle Count](#pm25-particle-count)
	* [PM10 Particle Count](#pm10-particle-count)
	* [PM2.5 and PM10 Density](#pm25-and-pm10-density)
- [SI1145](#si1145)
	* [UV Index](#uv-index)
- [References](#references)

## BME680

### Indoor Air Quality

The indoor air quality (IAQ) is a measure of the presence of gases in the air other than those which make up air. It is calculated by the monitoring server. It uses measurements of VOCs (volatile organic compounds) in an algorithm within the BSEC library.

This is one of the most important measurements made by the system as the IAQ determines the overall safety of the air indoors and whether it is polluted.

<table> 
  <thead>
    <th align="center" width="30%">Value Range</th>
    <th> Quality Level</th>
    <th align="center" width="20%"></th>
  </thead>
  <tbody>
    <tr>
      <td>0 - 50</td>
      <td>Excellent</td>
      <td bgColor="green"></td>
    </tr>
	<tr>
	  <td>51 - 100</td>
      <td>Good</td>
      <td bgColor="yellowgreen"></td>
	</tr>
	<tr>
	  <td>101 - 150</td>
      <td>Fair</td>
      <td bgColor="yellow"></td>
	</tr>
	<tr>
	  <td>151 - 200</td>
      <td>Poor</td>
      <td bgColor="orange"></td>
	</tr>
	<tr>
	  <td>201 - 250</td>
      <td>Bad</td>
      <td bgColor="red"></td>
	</tr>
	<tr>
	  <td>251 - 350</td>
      <td>Very Bad</td>
      <td bgColor="purple"></td>
	</tr>
	<tr>
	  <td>351 - 500</td>
      <td>Severe</td>
      <td bgColor="brown"></td>
	</tr>
  </tbody>
</table>

### CO2e

The carbon dioxide equivalent (CO2e) is a measure of the presence of carbon dioxide (CO2) and other gases which contribute to the greenhouse effect (e.g. methane).[^1] This measurement helps users further understand the quality of their indoor air.

<table>
  <thead>
    <th align="center" width="30%">Value Range (ppm)</th>
    <th> Quality Level</th>
    <th align="center" width="20%"></th>
  </thead>
  <tbody>
    <tr>
      <td>0 - 599</td>
      <td>Excellent</td>
      <td bgColor="green"></td>
    </tr>
	<tr>
	  <td>600 - 799</td>
      <td>Good</td>
      <td bgColor="yellowgreen"></td>
	</tr>
	<tr>
	  <td>800 - 1499</td>
      <td>Fair</td>
      <td bgColor="yellow"></td>
	</tr>
	<tr>
	  <td>1500 - 1799</td>
      <td>Poor</td>
      <td bgColor="orange"></td>
	</tr>
	<tr>
	  <td>>1800</td>
      <td>Bad</td>
      <td bgColor="red"></td>
	</tr>
  </tbody>
</table>

### Humidity

The type of humidity which is being measured by the system is relative humidity (rH). Relative humidity is a ratio of the current absolute humidity (the mass of water vapour/the mass of dry air (g/m3)) against the highest possible absolute humidity.[^2]

The value of relative humidity is important in determining how comfortable people feel in an indoor environment. If the rH value is high, the large presence of water vapour in the air makes it difficult for precipitation to evaporate, making people feel very warm. If it is too low, people will feel much cooler than the actual temperature because the precipitation evaporates very easily.[^2]

The relative humidity, if high, can also affect buildings by increasing the effects of any water damage since the water cannot evaporate as easily.[^2]

<table>
  <thead>
    <th align="center" width="30%">Value Range (%rH)</th>
    <th> Quality Level</th>
    <th align="center" width="20%"></th>
  </thead>
  <tbody>
    <tr>
      <td>40 - 59</td>
      <td>Excellent</td>
      <td bgColor="green"></td>
    </tr>
	<tr>
	  <td>30 - 39 or 60 - 69</td>
      <td>Good</td>
      <td bgColor="yellowgreen"></td>
	</tr>
	<tr>
	  <td>20 - 29 or 70 - 79</td>
      <td>Fair</td>
      <td bgColor="yellow"></td>
	</tr>
	<tr>
	  <td>10 - 19 or 80 - 89</td>
      <td>Poor</td>
      <td bgColor="orange"></td>
	</tr>
	<tr>
	  <td><10 or >90</td>
      <td>Bad</td>
      <td bgColor="red"></td>
	</tr>
  </tbody>
</table>

### Temperature

A cool temperature is important in allowing the human body to function normally. Temperatures which are too low or high can worsen chronic conditions and help with the transmission of diseases.[^3]

<table>
  <thead>
    <th align="center" width="30%">Value Range (°C)</th>
    <th> Quality Level</th>
    <th align="center" width="20%"></th>
  </thead>
  <tbody>
    <tr>
      <td>18 - 21</td>
      <td>Excellent</td>
      <td bgColor="green"></td>
    </tr>
	<tr>
	  <td>17 or 22</td>
      <td>Good</td>
      <td bgColor="yellowgreen"></td>
	</tr>
	<tr>
	  <td>16 or 23</td>
      <td>Fair</td>
      <td bgColor="yellow"></td>
	</tr>
	<tr>
	  <td>15 or 24</td>
      <td>Poor</td>
      <td bgColor="orange"></td>
	</tr>
	<tr>
	  <td><14 or >25</td>
      <td>Bad</td>
      <td bgColor="red"></td>
	</tr>
  </tbody>
</table>

## SN-GCJA5

### PM2.5 Particle Count

The PM2.5 particle count is a measure of liquid and solid particles present in the air which are at a diameter of between 1 and 2.5µm. 

It is important to understand the levels of particulates in the air as they are easily able to penetrate sensitive parts within the human body and cause respiratory diseases and heart attacks.[^4]

<table>
  <thead>
    <th align="center" width="30%">Value Range (ppm)</th>
    <th> Quality Level</th>
    <th align="center" width="20%"></th>
  </thead>
  <tbody>
    <tr>
      <td>0 - 545</td>
      <td>Excellent</td>
      <td bgColor="green"></td>
    </tr>
	<tr>
	  <td>546 - 1362</td>
      <td>Fair</td>
      <td bgColor="yellow"></td>
	</tr>
	<tr>
	  <td>>1363</td>
      <td>Bad</td>
      <td bgColor="red"></td>
	</tr>
  </tbody>
</table>

### PM10 Particle Count

The PM10 particle count is a measure of liquid and solid particles present in the air which are at a diameter of between 7.5 and 10µm.

<table>
  <thead>
    <th align="center" width="30%">Value Range (ppm)</th>
    <th> Quality Level</th>
    <th align="center" width="20%"></th>
  </thead>
  <tbody>
    <tr>
      <td>0 - 68</td>
      <td>Excellent</td>
      <td bgColor="green"></td>
    </tr>
	<tr>
	  <td>69 - 170</td>
      <td>Fair</td>
      <td bgColor="yellow"></td>
	</tr>
	<tr>
	  <td>>170</td>
      <td>Bad</td>
      <td bgColor="red"></td>
	</tr>
  </tbody>
</table>

### PM2.5 and PM10 Density

The SN-GCJA5 also measures the density of PM2.5 and PM10 particulates.

<table>
  <thead>
    <th align="center" width="30%">Value Range (µg/m3)</th>
    <th> Quality Level</th>
    <th align="center" width="20%"></th>
  </thead>
  <tbody>
    <tr>
      <td>0 - 23</td>
      <td>Excellent</td>
      <td bgColor="green"></td>
    </tr>
	<tr>
	  <td>24 - 41</td>
      <td>Good</td>
      <td bgColor="yellowgreen"></td>
	</tr>
	<tr>
	  <td>42 - 53</td>
      <td>Fair</td>
      <td bgColor="yellow"></td>
	</tr>
	<tr>
	  <td>54 - 64</td>
      <td>Poor</td>
      <td bgColor="orange"></td>
	</tr>
	<tr>
	  <td>>65</td>
      <td>Bad</td>
      <td bgColor="red"></td>
	</tr>
  </tbody>
</table>

## SI1145

### UV Index

The UV index is a measure of the strength of the UV radiation from the sun. Sunlight with a high UV index can cause sunburn. There is a risk of developing skin cancer if exposed to sunlight with high UV index levels over a period of time.

<table>
  <thead>
    <th align="center" width="30%">Value Range</th>
    <th> Quality Level</th>
    <th align="center" width="20%"></th>
  </thead>
  <tbody>
    <tr>
      <td>0 - 2</td>
      <td>Good</td>
      <td bgColor="yellowgreen"></td>
    </tr>
	<tr>
	  <td>3 - 5</td>
      <td>Fair</td>
      <td bgColor="yellow"></td>
	</tr>
	<tr>
	  <td>6 - 7</td>
      <td>Poor</td>
      <td bgColor="orange"></td>
	</tr>
	<tr>
	  <td>8 - 10</td>
      <td>Bad</td>
      <td bgColor="red"></td>
	</tr>
	<tr>
	  <td>>11</td>
      <td>Very Bad</td>
      <td bgColor="purple"></td>
	</tr>
  </tbody>
</table>

## References

[^1]: Rabo, Olga (2020) [Cooler Future](https://coolerfuture.com/en/blog/co2e). *What is CO2e and how is it calculated?*. [Accessed 18/04/21]
[^2]: Vanvuren, Christina (2018) [MOLEKULE](https://molekule.science/what-is-relative-humidity/). *What Is Relative Humidity, and What’s an Ideal Level for Your Home?*. [Accessed 18/04/21]
[^3]: [World Health Organisation](https://www.who.int/globalchange/publications/heat-and-health/en/#:~:text=Even%20small%20differences%20from%20seasonal,has%20important%20indirect%20health%20effects.), *Information and public health advice: heat and health*. [Accessed 18/04/21]
[^4]: [United States Environmental Protection Agency](https://www.epa.gov/pm-pollution/health-and-environmental-effects-particulate-matter-pm), *Health and Environmental Effects of Particulate Matter (PM)*. [Accessed 18/04/21]
