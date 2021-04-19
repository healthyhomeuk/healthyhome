---
title: System Description
category: System Overview
order: 1
---

There are various tasks which need to be performed in order to realise this project. These tasks can be categorised by its function in relation to the project goals. So, the operation of the system has been split into three different segments. In each of these segments, tasks related to a specific function of the system are performed.  These segments are **[Monitoring Server](#monitoring-server)**, **[Management Server](#management-server)** and the **[Mobile App](#mobile-app)**.

<div align = "center">
<img src="/images/block-diagram.svg">
<br>
<b>System Block Diagram</b>
</div>
## Monitoring Server

The **monitoring server** is responsible for operating the sensors and reading the data from them in real time. It reads and writes to the sensors via I2C by utilising the internal Linux I2C driver on the RaspberryPi. Version 1.b of the [POSIX](https://standards.ieee.org/standard/1003_1b-1993.html) (Portable Operating System Interface) standards (the real-time extension) is used to create the timers needed to schedule the reading of the data from the sensors.

This server sets up the SN-GCJA5, SI1145, and the BME680 to prepare them for operation. It then reads sensor data from their I2C registers at a defined time interval - 1s for the SN-GCJA5, 500ms for the SI1145, and 3s for the BME680. This data is then saved and sent to the management server along with information about the sensors. This is done using [ZeroMQ](https://zeromq.org/).

[CMake](https://cmake.org/) is used to generate the build files for the server, and also to create tests needed to assess its functionality.

## Management Server

The **management server** retrieves information about the sensors and the parameter values from the monitoring server. 
It then organises this information to ensure the sensor data and values are associated with each other correctly. It also assess the quality of the values.

It hosts a GraphQL web server to interact to interact with the mobile app. It also sends notifications to the app when the quality of the values become poor.

## Mobile App

The **mobile app** subscribes to the management server to receive real-time updates from the sensors and displays them on a user interface in the form of coloured tiles.

The colour of the tiles is dependent on the quality of the sensor data it receives. For example, if the app receives a bad humidity reading, the colour of the humidity tile will be red. For the indoor air quality index, the app creates a pointer on a scale which ranges from 0 to 500. The colour of the scale is also dependant on the desirability of the value.



<div align = "center">
<img width="250" src="/images/app-iaq.jpg">
<img width="250" src="/images/app-parameters.jpg">
<br>
<b>Screenshot of the App's Home Screen</b>
</div>
