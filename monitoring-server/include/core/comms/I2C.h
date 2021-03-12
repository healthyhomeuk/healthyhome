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
 * @file core/comms/I2C.h
 */

#ifndef CORE_COMMS_I2C_H
#define CORE_COMMS_I2C_H

#include <core/comms/Packet.h>
#include <core/defs.h>

namespace Core::Comms {

/**
 * @brief Communication interface for I2C.
 * @headerfile core/comms/I2C.h <core/comms/I2C.h>
 */
class I2C {
public:
    /**
     * @brief Method for reading a block of data.
     * @param deviceId I2C Device 7-bit identifier
     * @param command I2C Command 8-bit identifier
     * @param packet A reference to the packet to read.
     * @return Status operation code.
     */
    virtual StatusCode read(
        unsigned char deviceId,
        unsigned char command,
        Packet& packet)
        = 0;

    /**
     * @brief Method for writing a block of data.
     * @param deviceId I2C Device 7-bit identifier
     * @param command I2C Register 8-bit identifier
     * @param packet A reference to the packet to write.
     * @return Status operation code.
     */
    virtual StatusCode write(
        unsigned char deviceId,
        unsigned char command,
        Packet& packet)
        = 0;

    /**
     * @brief Default deconstructor
     */
    virtual ~I2C() = default;
};

}

#endif // CORE_COMMS_I2C_H
