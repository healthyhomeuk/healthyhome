<p align="center"><img width=30% src="docs/images/logo.svg"></p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

# HealthyHome

[![GitHub Issues](https://img.shields.io/github/issues/healthyhomeuk/healthyhome)](https://github.com/healthyhomeuk/healthyhome/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/healthyhomeuk/healthyhome)](https://github.com/healthyhomeuk/healthyhome/pulls)
[![License](https://img.shields.io/github/license/healthyhomeuk/healthyhome)](https://www.gnu.org/licenses/gpl-3.0.en.html)

## Overview

HealthyHome is an open-source project centred around a smart home device which monitors the indoor environment conditions of a user's home and helps them make better decisions to improve it! 🏡

### Objectives

-   To measure important parameters of an indoor home environment 🌿
-   Provide easy access to this information through an app for smartphones 📱

### Features

-   Monitors the concentration of particles in the air, UV index, relative humidity and ambient temperature
-   Calculates the indoor air quality (IAQ) index
-   Provides both real-time and historical measurements for the user to view on a smart phone

## Quick Start

This section will provide instructions on how you can recreate the project! It will be updated as development of the project continues. 🤓

## Prototype Hardware

-   [Panasonic SN-GCJA5](https://na.industrial.panasonic.com/products/sensors/air-quality-gas-flow-sensors/lineup/laser-type-pm-sensor/series/123557/model/123559): A particulate matter sensor which measures the concentration of particles in the air
-   [Bosch Sensortec BME680](https://www.bosch-sensortec.com/products/environmental-sensors/gas-sensors/bme680/): A 4-in-1 sensor which measures ambient temperature, relative humidity, barometric pressure, and volatile organic compounds (VOC).
-   [Silicon Labs Si1145](https://www.silabs.com/sensors/optical/si114x): A UV index and ambient light sensor which measures the local UV index and ambient light levels
-   [Raspberry Pi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/): A single board computer which will be used to control the sensors and manage the data	

## Project Structure

The project is made up of several software components that are placed in the repository in the following structure:

-   `monitoring-server/`: the monitoring server that collects and processes all the data from the server
-   `management-server/`: the data management server which keeps track of the real-time data, builds statistics and pushes notifications to the user
-   `mobile-app/`: a mobile application for phones which interfaces the user with the smart device

## Contributing

Please follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) for any contribution.