<p align="center"></p>

<h1 align="center">
<img width="64" src="docs/images/logo.svg">
  HealthyHome
  <br>
  <a href="https://github.com/healthyhomeuk/healthyhome/issues"><img src="https://img.shields.io/github/issues/healthyhomeuk/healthyhome" alt="GitHub Issues"></a>
  <a href="https://github.com/healthyhomeuk/healthyhome/pulls"><img src="https://img.shields.io/github/issues-pr/healthyhomeuk/healthyhome" alt="GitHub Pull Requests"></a>
  <a href="https://www.gnu.org/licenses/gpl-3.0.en.html"><img src="https://img.shields.io/github/license/healthyhomeuk/healthyhome" alt="License"></a>
  <br>
  <a href="https://www.facebook.com/ukhealthyhome"><img width="32" hspace="5" src="docs/images/facebook.svg"></img></a>
  <a href="https://www.instagram.com/healthyhome_uk/"><img width="32" hspace="5" src="docs/images/instagram.svg"></img></a>
  <a href="https://twitter.com/healthyhome_uk"><img width="32" hspace="5" src="docs/images/twitter.svg"></img></a>
  <a href="https://healthyho.me.uk"><img width="32" hspace="5" src="docs/images/world-wide-web.svg"></img></a>
</h1> 
<!--Icons made by https://www.freepik.com Freepik from "https://www.flaticon.com/-->

## Overview

HealthyHome is an open-source project centred around a smart home device which monitors the indoor environment conditions of a user's home and helps them make better decisions to improve it! 🏡 Checkout the documentation on our [website!](https://healthyho.me.uk/)

### Objectives

-   To measure important parameters of an indoor home environment 🌿
-   Provide easy access to this information through an app for smartphones 📱

### Features

-   Monitors the concentration of particles in the air, UV index, relative humidity and ambient temperature
-   Calculates the indoor air quality (IAQ) index
-   Provides real-time measurements for the user to view on a smart phone

## Prototype Hardware

-   [Panasonic SN-GCJA5](https://na.industrial.panasonic.com/products/sensors/air-quality-gas-flow-sensors/lineup/laser-type-pm-sensor/series/123557/model/123559) - A particulate matter sensor which measures the concentration and density of particles in the air. Particles with a diammeter between 1-2.5µm (PM2.5) and 7.5-10µm (PM10) can be measured using this sensor.

-   [Bosch Sensortec BME680](https://www.bosch-sensortec.com/products/environmental-sensors/gas-sensors/bme680/) - A 4-in-1 sensor which measures ambient temperature, relative humidity, barometric pressure and biogenic volaltile organic compounds (bVOC).

-   [Silicon Labs Si1145](https://www.silabs.com/sensors/optical/si114x) - A UV index and ambient light sensor which measures the local UV index and ambient light levels (in luminous flux).

-   [RaspberryPi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) - A single board computer which will be used to control the sensors and manage their data.

## Quick Start

This section provides instructions on how you can recreate the project!

### Hardware ⚙️

1. Connect the power supply to the RaspberryPi and insert the microSD card. Startup the RaspberryPi. If this is your first time using your RaspberryPi, setup the operating system.

2. Connect the SN-GCJA5, SI1145 and the BME680 to the RaspberryPi's 3V3 power supply and I2C connections.

### Software 💻

1. Enable I2C on the RPi:
```bash
sudo raspi-config
```
2. [Install Node.js version >=12 if required.](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)

3. Download the `monitd` and `mgmtd` packages from the Releases tab of GitHub and install as follows:
```bash
sudo dpkg -i monitd-1.0.0.armhf.deb
sudo dpkg -i mgmtd-1.0.0.all.deb
```
4. Enable services and start:
```bash
sudo systemctl enable monitd
sudo systemctl enable mgmtd
sudo systemctl start monitd
sudo systemctl start mgmtd
```

5. Download [Expo](https://expo.io/) on your mobile phone.

6. Scan the QR code on our [Expo page](https://expo.io/@healthyhomeuk/projects/healthyhome) and the app should download onto your phone.

Now you are good to go! We hope you enjoy using HealthyHome! 😃

## Project Structure

The project is made up of several software components that are placed in the repository in the following structure:

-   `monitoring-server/`: the monitoring server that collects and processes all the data from the server
-   `management-server/`: the data management server which keeps track of the real-time data, builds statistics and pushes notifications to the user
-   `mobile-app/`: a mobile application for phones which interfaces the user with the smart device

## Contributing

Please follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) for any contribution.