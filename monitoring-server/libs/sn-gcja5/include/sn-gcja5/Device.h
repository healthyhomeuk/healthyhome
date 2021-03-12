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
 * @file sn-gcja5/Device.h
 */

#ifndef SNGCJA5_DEVICE_H
#define SNGCJA5_DEVICE_H

#include <core/Device.h>
#include <core/comms/I2C.h>

/**
 * @brief Namespace for the Panasonic SN-GCJA5 library.
 */
namespace SNGCJA5 {
/**
 * @brief Concrete class for the  Panasonic SN-GCJA5 device.
 * @headerfile sn-gcja5/Device.h <sn-gcja5/Device.h>
 */
class Device : public Core::Device {
public:
    /**
     * @brief Configuration for the SN-GCJA5 Device.
     */
    struct Configuration {
        Core::Comms::I2C* i2c; ///< Reference to an I2C implementation.
    };

    Device() = default;

    /**
     * @brief Constructor for a SN-GCJA5 Device.
     * @param config configuration data structure.
     */
    explicit Device(Configuration config);

    const char* getName() override;

private:
    Configuration config;
};

}

#endif // SNGCJA5_DEVICE_H
