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
 * @file libs/sn-gcja5/include/sn-gcja5/defs.h
 * @headerfile sn-gcja5/defs.h <sn-gcja5/defs.h>
 */

#ifndef SNGCJA5_DEFS_H
#define SNGCJA5_DEFS_H

#include <core/Postman.h>
#include <core/Timer.h>
#include <core/comms/I2C.h>

/**
 * @brief Namespace for the Panasonic SN-GCJA5 library.
 */
namespace SNGCJA5 {

/// Device I2C address constant
constexpr uint8_t I2C_ADDR = 0x33;

/// Sensor status register constant
constexpr uint8_t STATUS_CMD = 0x26;

/// PM2.5 density register address constant
constexpr uint8_t PM25_DENSITY_CMD = 0x04;
/// PM10 density register address constant
constexpr uint8_t PM100_DENSITY_CMD = 0x08;

/// PM2.5 count register address constant
constexpr uint8_t PM25_COUNT_CMD = 0x10;
/// PM10 count register address constant
constexpr uint8_t PM100_COUNT_CMD = 0x18;

/// Constant for a thousand, used for density correction.
constexpr float MILLI = 1000;

/// Timer interval (in ms) for reading the sensor values.
constexpr int TIMER_INTERVAL = 1000;

/// Filter value for density data
constexpr float DENSITY_LIMIT = 100.0;

/// Filter value for count data
constexpr int COUNT_LIMIT = 30000;

/**
 * @brief Enumerator for the PDLD status.
 */
enum PDLDStatus {
    NORMAL      = 0, ///< Normal status
    NORMAL_SW   = 1, ///< Normal status, with S/W correction
    ABNORMAL    = 2, ///< Abnormal status, loss of function
    ABNORMAL_SW = 3, ///< Abnormal status, with S/W correction
};

/**
 * @brief Enumerator for the sensor status.
 */
enum SensorStatus {
    NO_OPERATION = 0, ///< No operation
    FAN_ON       = 1, ///< Fan operating
    LD_FAN_ON    = 2, ///< LD operating
    PD_LD_FAN_ON = 3, ///< PD operating
};

/**
 * @brief Enumerator for the fan status.
 */
enum FanStatus {
    NORM        = 0, ///< Normal status
    NORM_SW     = 1, ///< Normal status (1,000rpm or more), with S/W correction
    CALIBRATION = 2, ///< In initial calibration
    ABNORM      = 3, ///< Abnormal (below 1,000rpm), out of control
};

/**
 * @brief Configuration for the SN-GCJA5 Device.
 */
struct Configuration {
    Core::Comms::I2C& i2c;          ///< Reference to an I2C implementation.
    Core::Timer::Factory makeTimer; ///< Timer factory.
    Core::Postman& postman;         ///< Reference to the postman.
};

}

#endif // SNGCJA5_DEFS_H