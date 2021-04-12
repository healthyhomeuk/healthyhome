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
 * @file core/comms/BytePacket.h
 */

#ifndef CORE_BYTE_PACKET_H
#define CORE_BYTE_PACKET_H

#include <core/comms/Packet.h>
#include <core/defs.h>

namespace Core::Comms {

/**
 * @brief Packet representing a byte.
 * @headerfile core/comms/BytePacket.h <core/comms/BytePacket.h>
 */
struct BytePacket : public Packet {
    uint8_t value; ///< Value

    /**
     * @brief Constructor
     */
    BytePacket() = default;

    /**
     * @brief Constructor
     * @param _value Value
     */
    explicit BytePacket(uint8_t _value) : value(_value) { }

    size_t getBufferSize() override
    {
        return sizeof value;
    }

    StatusCode deserialize(const uint8_t* buffer) override
    {
        value = *buffer;
        return SUCCESS;
    }

    StatusCode serialize(uint8_t* buffer) override
    {
        *buffer = value;
        return SUCCESS;
    }
};

}

#endif // CORE_BYTE_PACKET_H
