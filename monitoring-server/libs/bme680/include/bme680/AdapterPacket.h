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
 * @file bme680/AdapterPacket.h
 */

#ifndef BME680_ADAPTER_PACKET_H
#define BME680_ADAPTER_PACKET_H

#include <core/comms/Packet.h>
#include <core/defs.h>
#include <cstdint>
#include <cstring>

namespace BME680 {

/**
 * @brief I2C packet which adapts Core::Comms::I2C for the bme68x library
 * @headerfile bme680/AdapterPacket.h <bme680/AdapterPacket.h>
 */
struct AdapterPacket : public Core::Comms::Packet {
    uint8_t* readBuffer;        ///< Read buffer
    const uint8_t* writeBuffer; ///< Write buffer
    size_t size;                ///< Size of the buffer

    AdapterPacket(uint8_t* _buffer, size_t _size) :
        readBuffer(_buffer), size(_size)
    {
    }

    AdapterPacket(const uint8_t* _buffer, size_t _size) :
        writeBuffer(_buffer), size(_size)
    {
    }

    size_t getBufferSize() override
    {
        return size;
    }

    Core::StatusCode deserialize(const uint8_t* sourceBuffer) override
    {
        std::memcpy(readBuffer, sourceBuffer, size);
        return Core::SUCCESS;
    }

    Core::StatusCode serialize(uint8_t* targetBuffer) override
    {
        std::memcpy(targetBuffer, writeBuffer, size);
        return Core::SUCCESS;
    }
};

}

#endif // BME680_ADAPTER_PACKET_H
