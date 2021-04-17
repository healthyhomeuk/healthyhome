---
title: Parameter Guide
category: System Overview
order: 2
---

The feedback on the quality of the measured parameters is explained in further detail in the tables below. The parameters have been grouped according to which sensor detects them. The quality of the IAQ values is based on ratings from the [BME680 datasheet](https://www.bosch-sensortec.com/products/environmental-sensors/gas-sensors/bme680/). The quality of the rest of the parameters is based on data from [IAQUK](http://www.iaquk.org.uk/ESW/Files/IAQ_Rating_Index.pdf).

The ambient light level is not associated with colours. This is because it is not as straightforward to quantify the quality of luminous flux (lux). However, it can be said that light in room which is considered to be normally lit (e.g. in an office) should measure at approximately 500 lux. This value is based on data from the [National Optical Astronomy Observatory](https://www.noao.edu/education/QLTkit/ACTIVITY_Documents/Safety/LightLevels_outdoor+indoor.pdf).

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

## BME680

### Indoor Air Quality

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

<table>
  <thead>
    <th align="center" width="30%">Value Range</th>
    <th> Quality Level</th>
    <th align="center" width="20%"></th>
  </thead>
  <tbody>
    <tr>
      <td>0 - 2</td>
      <td>Excellent</td>
      <td bgColor="green"></td>
    </tr>
	<tr>
	  <td>3 - 5</td>
      <td>Good</td>
      <td bgColor="yellowgreen"></td>
	</tr>
	<tr>
	  <td>6 - 7</td>
      <td>Fair</td>
      <td bgColor="yellow"></td>
	</tr>
	<tr>
	  <td>8 - 10</td>
      <td>Poor</td>
      <td bgColor="orange"></td>
	</tr>
	<tr>
	  <td>>11</td>
      <td>Bad</td>
      <td bgColor="red"></td>
	</tr>
  </tbody>
</table>

