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
 * @file linux-i2c/Driver.h
 */

#ifndef LINUX_I2C_DRIVER_H
#define LINUX_I2C_DRIVER_H

#include <core/comms/I2C.h>
#include <core/defs.h>

namespace LinuxI2C {

    /**
     * @brief Interface to use the Linux I2C device driver
     */
    class Driver : public Core::Comms::I2C {
        /**
         * @brief File descriptor
         */
        int fd = -1;
    public:
        /**
         * @brief Opens an I/O stream to an I2C device
         *
         * This function is essential so that the I2C operations can be performed.
         * It opens a I/O stream to a Linux I2C device file of the name `/dev/i2c-X`,
         * where X represents the deviceId.
         *
         * @param deviceId The device id of the I2C device.
         * @return Operation status code
         */
        Core::StatusCode open(int deviceId);

        Core::StatusCode read(unsigned char deviceId, unsigned char command, Core::Comms::Packet &packet) override;
        Core::StatusCode write(unsigned char deviceId, unsigned char command, Core::Comms::Packet &packet) override;

        ~Driver() override;
    };

}

#endif // LINUX_I2C_DRIVER_H
