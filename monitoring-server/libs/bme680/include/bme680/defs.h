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
 * @file bme680/defs.h
 */

#ifndef BME680_DEFS_H
#define BME680_DEFS_H

#include <bme68x_defs.h>
#include <bsec_datatypes.h>
#include <core/Postman.h>
#include <core/Timer.h>
#include <core/comms/I2C.h>
#include <cstdint>

/**
 * @brief Namespace for the Bosch Sensortec BME680 library.
 */
namespace BME680 {

/**
 * @brief Enumerator for the BME680 device I2C addresses
 */
enum I2CAddress : uint8_t {
    PRIMARY   = 0x76, ///< Primary I2C address
    SECONDARY = 0x77, ///< Secondary I2C address
};

/// Timer interval (in ms) for reading the sensor values.
constexpr float SAMPLE_RATE = BSEC_SAMPLE_RATE_LP;

/// Forced operation mode command for the BME680
constexpr uint8_t OPERATION_MODE = BME68X_FORCED_MODE;

/// Interval (in ms) for waiting until sensor data is able to be read
constexpr int WAIT_UNTIL_READY_INTERVAL = 5;

/// Interval (in ms) for saving the sensor samples
constexpr int SAVE_INTERVAL = 100;

/// Number of virtual outputs from the BME680
const uint8_t VIRTUAL_SENSORS_SIZE = 4;

/// Configures the virtual outputs from the BME680
const bsec_sensor_configuration_t VIRTUAL_SENSORS[VIRTUAL_SENSORS_SIZE]
    = { {
            SAMPLE_RATE,
            BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_TEMPERATURE,
        },
        {
            SAMPLE_RATE,
            BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_HUMIDITY,
        },
        { SAMPLE_RATE, BSEC_OUTPUT_IAQ },
        {
            SAMPLE_RATE,
            BSEC_OUTPUT_CO2_EQUIVALENT,
        } };

/**
 * @brief Enumerator for sensor states
 */
enum SensorState {
    TRIGGER_MEASUREMENT, ///< Trigger measurement state
    WAIT_UNTIL_READY,    ///< Wait until sensor is ready state
    READ_NEW_DATA,       ///< Read new data state
    PROCESS_DATA,        ///< Process data state
    SAVE_STATE,          ///< Save state
};

/**
 * @brief Enumerator for sensor value accuracies
 */
enum SensorValueAccuracy : uint8_t {
    UNRELIABLE      = 0, ///< Sensor value is unreliable
    LOW_ACCURACY    = 1, ///< Sensor value is of low accuracy
    MEDIUM_ACCURACY = 2, ///< Sensor value is of medium accuracy
    HIGH_ACCURACY   = 3, ///< Sensor value is of high accuracy
};

/**
 * BSEC state load function pointer
 * @param buffer buffer to load the state in
 * @param bufferSize maximum size of the buffer
 */
using LoadBSECStateFnPtr
    = std::function<size_t(uint8_t* buffer, size_t bufferSize)>;

/**
 * BSEC state save function pointer
 * @param state array containing the state
 * @param stateSize size of the state
 */
using SaveBSECStateFnPtr
    = std::function<void(const uint8_t* state, size_t stateSize)>;

/**
 * Get timestamp in nanoseconds
 * @return current timestamp in nanoseconds
 */
using GetTimestampFnPtr = std::function<int64_t()>;

/**
 * @brief Configuration for the BME680 Device.
 */
struct Configuration {
    I2CAddress i2cAddr; ///< BME680 I2C address

    float temperatureOffset; ///< Ambient temperature offset

    uint8_t* bsecConfig;     ///< BSEC configuration
    size_t bsecConfigLength; ///< BSEC configuration length

    bme68x_delay_us_fptr_t delay_us; ///< Function pointer to a sleep function

    /// Function pointer to a load state function
    LoadBSECStateFnPtr loadBSECState;

    /// Function pointer to a save state function
    SaveBSECStateFnPtr saveBSECState;

    /// Function pointer to a get timestamp function
    GetTimestampFnPtr getTimestamp;

    Core::Comms::I2C& i2c;          ///< Reference to an I2C implementation.
    Core::Timer::Factory makeTimer; ///< Timer factory.
    Core::Postman& postman;         ///< Reference to the postman.
};

}

#endif // BME680_DEFS_H