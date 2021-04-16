/*
 * This file is part of the HealthyHome project monitoring server
 * available at <https://www.github.com/healthyhomeuk/healthyhome>.
 *
 * Copyright (C) 2021 the authors of the HealthyHome project.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * @file bme680/Device.h
 */

#ifndef BME680_DEVICE_H
#define BME680_DEVICE_H

extern "C" {
#include <bme68x.h>
}

#include <bme680/BSECSensor.h>
#include <bme680/CO2eMessage.h>
#include <bme680/HumidityMessage.h>
#include <bme680/IAQMessage.h>
#include <bme680/TemperatureMessage.h>
#include <bme680/defs.h>
#include <bsec_interface.h>
#include <core/Device.h>
#include <core/Sensor.h>
#include <core/Timer.h>
#include <core/comms/I2C.h>

/**
 * @brief Namespace for the Bosch Sensortec BME680 library.
 */
namespace BME680 {

/**
 * @brief Concrete class for the BME680 device.
 * @headerfile bme680/Device.h <bme680/Device.h>
 */
class Device : public Core::Device {
public:
    /**
     * @brief Constructor for a BME680 Device.
     * @param config configuration data structure.
     */
    explicit Device(Configuration config);

    const char* getName() override;
    Core::StatusCode setup() override;
    Core::StatusCode halt() override;
    std::unordered_map<std::string, Core::Sensor&> getSensors() override;
    std::unique_ptr<Core::Message> handleMessage(
        std::unique_ptr<Core::Message> message) override;

private:
    Configuration config;

    BSECSensor tempSensor
        = BSECSensor { "temp", &TemperatureMessage::bsecSensorFactory };
    BSECSensor humSensor
        = BSECSensor { "hum", &HumidityMessage::bsecSensorFactory };
    BSECSensor iaqSensor = BSECSensor { "iaq", &IAQMessage::bsecSensorFactory };
    BSECSensor co2eSensor
        = BSECSensor { "co2e", &CO2eMessage::bsecSensorFactory };

    Core::StatusCode triggerMeasurement();
    Core::StatusCode waitUntilReady();
    Core::StatusCode readNewData();
    Core::StatusCode processData();
    Core::StatusCode saveBSECState();

    void addBSECInput(uint8_t sensorId, float signal);
    int getNextCallTimeout();
    Core::StatusCode nextStep(SensorState nextState, int timeout = 1);

    static BME68X_INTF_RET_TYPE i2cWrite(
        uint8_t reg_addr,
        const uint8_t* reg_data,
        uint32_t length,
        void* intf_ptr);

    static BME68X_INTF_RET_TYPE i2cRead(
        uint8_t reg_addr,
        uint8_t* reg_data,
        uint32_t length,
        void* intf_ptr);

    uint8_t bsecState[BSEC_MAX_STATE_BLOB_SIZE];

    bsec_input_t inputs[BSEC_MAX_PHYSICAL_SENSOR];
    uint8_t inputsLength;

    bsec_output_t outputs[BSEC_NUMBER_OUTPUTS];
    uint8_t outputsLength;

    std::unique_ptr<Core::Timer> timer;
    bme68x_dev device;

    bme68x_conf sensorConfiguration;
    bsec_bme_settings_t desiredConfig;
    int64_t lastTimestamp;

    int unsavedSamples;
};

}

#endif // BME680_DEVICE_H
