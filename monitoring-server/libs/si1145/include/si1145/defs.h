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
 * @file si1145/defs.h
 */

#ifndef SI1145_DEFS_H
#define SI1145_DEFS_H

#include <core/Postman.h>
#include <core/Timer.h>
#include <core/comms/I2C.h>
#include <cstdint>

/**
 * @brief Namespace for the Silicon Labs SI1145 library.
 */
namespace SI1145 {

/// SI1145 device I2C Address
constexpr uint8_t I2C_ADDR = 0x60;

/// Interrupt configuration register address
constexpr uint8_t INT_CONFIG_REG_ADDR = 0x03;

/// Interrupt request enable register address
constexpr uint8_t IRQ_ENABLE_REG_ADDR = 0x04;
/// Interrupt request mode 1 register address
constexpr uint8_t IRQ_MODE1_REG_ADDR = 0x05;
/// Interrupt request mode 2 register address
constexpr uint8_t IRQ_MODE2_REG_ADDR = 0x06;
/// Interrupt request status register address
constexpr uint8_t IRQ_STATUS_REG_ADDR = 0x21;

/// HW Key register address
constexpr uint8_t HW_KEY_REG_ADDR = 0x07;

/**
 * @name UV Coefficients
 * @{
 */

/// UV coefficient address
constexpr uint8_t UV_COEFF_ADDR = 0x13;
/// UV coefficient value
constexpr uint32_t UV_COEFF = 0x00'01'6B'7B;

/**
 * @}
 *
 * @name Commands
 * @{
 */

/// Command register address
constexpr uint8_t COMMAND_REG_ADDR = 0x18;

/// Reset command
constexpr uint8_t COMMAND_RESET = 0x01;

/// Automatic ambient light sensor command
constexpr uint8_t COMMAND_ALS_AUTO = 0x0E;

/**
 * @}
 *
 * @name Data registers
 * @{
 */

/// Ambient light sensor visible light data register address
constexpr uint8_t ALSVISDATA_REG_ADDR = 0x22;

/// UV index data register address
constexpr uint8_t UVINDEX_REG_ADDR = 0x2C;

/**
 * @}
 *
 * @name SI1145 parameters
 * @{
 */

/// Command 'parameter set' flag
constexpr uint8_t PARAM_SET_FLAG = 0xA0;

/// Parameter write register address
constexpr uint8_t PARAM_WR_REG_ADDR = 0x17;
/// Parameter read register address
constexpr uint8_t PARAM_RD_REG_ADDR = 0x2E;

/// SI1145 parameters enumeration
enum Parameter : uint8_t {
    /// Sensor channel list parameter
    CHANNEL_LIST = 0x01,
    /// Ambient Light sensor visible light diode ADC recovery period parameter
    ALS_VIS_ADC_COUNTER = 0x10,
    /// Ambient light sensor visible light diode ADC gain parameter
    ALS_VIS_ADC_GAIN = 0x11,
    /// Ambient light sensor visible light diode ADC range parameter
    ALS_VIS_ADC_RANGE = 0x12,
};

/// Parameter value type
using ParameterValue = uint8_t;

/// Channel list parameter value flags enumeration
enum ChannelList : ParameterValue {
    /// Enable UV sensor flag
    ENABLE_UV = 0x80,
    /// Enable ambient light sensor visible light flag
    ENABLE_ALS_VISIBLE = 0x10,
};

/**
 * @}
 *
 * @name Measurement rates
 * @{
 */

/// Measurement rate LSB address
constexpr uint8_t MEASRATE_REG_ADDR = 0x08;

/**
 * @brief Measurement rate
 * Measurement rate in seconds divided by 31.25uS.
 */
constexpr uint16_t MEASRATE = 0x7D00; // 32,000 * 31.25uS = 1s

/**
 * @}
 */

/// Gain for visible light ADC
constexpr uint8_t GAIN = 4;
/// Gain mask for visible light ADC
constexpr uint8_t GAIN_MASK = 0b111;

/// Timer interval (in ms) for reading the sensor values.
constexpr int TIMER_INTERVAL = 1000;

/**
 * Sleep function pointer
 * @param delay sleep in microseconds
 */
using USleepFnPtr = std::function<void(int)>;

/**
 * @brief Configuration for the SI1145 Device.
 */
struct Configuration {
    Core::Comms::I2C& i2c;          ///< Reference to an I2C implementation.
    Core::Timer::Factory makeTimer; ///< Timer factory.
    Core::Postman& postman;         ///< Reference to the postman.
    USleepFnPtr usleep;             ///< Sleep function pointer.
};

}

#endif // SI1145_DEFS_H
