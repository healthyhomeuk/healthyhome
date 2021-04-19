---
title: Software
category: System Setup
order: 1
---

This section will provide instructions on how to setup the software required for HealthyHome.

- [Quick Start](#quick-start)
- [Monitoring Server](#monitoring-server)
- [Management Server](#management-server)
- [Mobile App](#mobile-app)

## Quick Start
Enable I2C on the RPi:
```bash
sudo raspi-config
```
[Install Node.js version >=12 if required.](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)

Download the `monitd` and `mgmtd` packages from the Releases tab of GitHub and install as follows:
```bash
sudo dpkg -i monitd-1.0.0.armhf.deb
sudo dpkg -i mgmtd-1.0.0.all.deb
```
Enable services and start:
```bash
sudo systemctl enable monitd
sudo systemctl enable mgmtd
sudo systemctl start monitd
sudo systemctl start mgmtd
```

Download [Expo](https://expo.io/) on your mobile phone.

Scan the QR code on our [Expo page](https://expo.io/@healthyhomeuk/projects/healthyhome) and the app should download onto your phone.

## Monitoring Server

### Pre-requirements
In order for the monitoring server to operate on the Raspberry Pi, the I2C interface must be enabled first, you can do this through the convenient CLI tool by running the following tool:
```bash
sudo raspi-config
```
### Install from the debian package...
Grab the latest debian package release from the Releases tab, and install it like so:
```bash
sudo dpkg -i monitd-1.0.0.armhf.deb
```
This will install the monitoring server globally and as a service.
### ...or build from the source code
The monitoring server software stack requires the following libraries and toolchains to be installed in the system:

- GNU GCC toolchain, Makefile
  `sudo apt-get install build-essential`
- CMake (version >=3.13)
  `sudo apt-get install cmake`
- Cppzmq, [build instructions](https://github.com/zeromq/cppzmq#build-instructions)
- [Bosch Sensortech BSEC library](https://www.bosch-sensortec.com/software-tools/software/bsec/)

Start by cloning the repository:
```bash
git clone https://github.com/healthyhome/healthyhome.git
```
The software stack makes use of two Git dependencies, these must be downloaded as follows:
```bash
git submodule update --init
```
To start building we must change the current working directory to the monitoring server's:
```bash
cd monitoring-server # change working directory to monitoring-server
cmake -Bbuild        # prepare the build system
cd build             # change working directory to build
make healthyhome-rpi # build the monitoring server
sudo make install.   # install the monitoring server
```
### Post-installation
To enable the monitoring server to run at every start up run:
```bash
sudo systemctl enable monitd
```
Finally, to start it you can run the following command:
```
sudo systemctl start monitd
```

## Management Server

### Requirements
The management server runs on Node.js, the minimum version required is 12. You can grab it by following [these instructions](https://github.com/nodesource/distributions/blob/master/README.md#debinstall).
### Install from the debian package (recommended)
The easiest way to get the management server running is through the pre-built Debian package you can find in the Releases section of GitHub.
```bash
sudo dpkg -i mgmtd-1.0.0.all.deb
```
This will install the management server globally and as a service. To enable the management server to run at every start up run:
```bash
sudo systemctl enable mgmtd
```
Finally, to start it you can run the following command:
```bash
sudo systemctl start mgmtd
```
### Instructions to run the server from source code
If you prefer to run the server manually you may clone the repository:
```bash
git clone https://github.com/healthyhomeuk/healthyhome
```
Change the working directory to the management server from the repository:
```
cd management-server
```
Before running the server, some environment variables are required to be set. You can place them in a `.env` file in the same directory if you prefer. These will be automatically be picked up. The required variables are the following:
```bash
# monitoring server broadcast socket, given is the default address of the systemctl service
MONITD_BROADCAST_ADDRESS=ipc:///var/run/monitd/broadcast.sock
# monitoring server endpoint socket, given is the default address of the systemctl service
MONITD_ENDPOINT_ADDRES=ipc:///var/run/monitd/endpoint.sock
# folder where to store the user settings, . will store them in the current folder
SETTINGS_FILEPATH=.
# folder where to store the document stores, . will store them in the current folder. As of version 1.0.0, this is required but not used as not supported
DOCSTORE_FILEPATH=./dist
```
Finally, run the following commands to run the server:
```bash
npm install   # install dependencies
npm run build # transcompile TypeScript to JavaScript
npm run start # run the server
```

## Mobile App

Download [Expo](https://expo.io/) on your mobile phone.

Scan the QR code on our [Expo page](https://expo.io/@healthyhomeuk/projects/healthyhome) and the app should download onto your phone.