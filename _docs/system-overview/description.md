---
title: System Description
category: System Overview
order: 1
---

There are various tasks which need to performed in order to realise this project. These tasks can be categorised by its function in relation to the project. So, the operation of the system has been split into three different segmants. In each of these segmants, tasks related to a specific function of the system are performed.  These segments are **Monitoring Server**, **Management Server** and the **Mobile App**.

<div align = "center">
<img src="/images/block-diagram.svg">
</div>
<a>
</a>

## Monitoring Server

The Monitoring Server is responsable for operatning the sensors and reading the data from them in real time. It reads and writes to the sensors via I2C by utilising the internal linux I2C driver on the RaspberryPi. Version 1.b of the [POSIX](https://standards.ieee.org/standard/1003_1b-1993.html) (Portable Operating System Interface) standards (the real-time extension) is used to create the timers needed to schedule the reading of the data from the sensors.

This server sets up the SN-GCJA5, SI1145, and the BME680 to prepare them for operation. It then reads sensor data from their I2C registers at a defined time interval - 1s for the SN-GCJA5, 500ms for the SI1145, and 3s for the BME680. This data is then saved and prepared for the management server.

[CMake](https://cmake.org/) is used to generate the build files for the server, and also to create tests needed to assess its functionality.

## Management Server

The Management Server is responsable for fetching the sensor data from the Monitoring Server and hosting it for the Mobile App.

## Mobile App

The Mobile App is responsable for retrieving the data from the Management Server and displaying it on a user interface in the form of a mobile application. The app sends a query to the management server to retrieve information about the sensors and their data. Once a response is receieved it fetches the data and displays it on the user interface through the use of coloured tiles. The colour of the tiles is dependant on the quality of the sensor data it receives from the management server. For example, if the app recieves a high humidity reading, the colour of the humidity tile will be red. 

For the Indoor Air Quality Index, the app creates a pointer on a scale which ranges from 0 to 500. The colour of the scale is also dependant on the desireability of the value.

The app then constantly pings the management server to recieve new data values to present to the user, and the colour of the tiles gets updated accordingly.

<div align = "center">
<img width="250" src="/images/app-iaq.jpg">
<img width="250" src="/images/app-parameters.jpg">
</div>
<a>
</a>