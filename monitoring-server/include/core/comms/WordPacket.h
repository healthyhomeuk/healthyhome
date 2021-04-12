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
 * @file core/comms/WordPacket.h
 */

#ifndef CORE_WORD_PACKET_H
#define CORE_WORD_PACKET_H

#include <core/comms/Packet.h>
#include <core/defs.h>
#include <cstring>

namespace Core::Comms {

/**
 * @brief Packet representing a word.
 * @headerfile core/comms/WordPacket.h <core/comms/WordPacket.h>
 */
struct WordPacket : public Packet {
    uint16_t value; ///< Value

    /**
     * @brief Constructor
     */
    WordPacket() = default;

    /**
     * @brief Constructor
     * @param _value Value
     */
    explicit WordPacket(uint16_t _value) : value(_value) { }

    size_t getBufferSize() override
    {
        return sizeof value;
    }

    StatusCode deserialize(const uint8_t* buffer) override
    {
        memcpy(&value, buffer, getBufferSize());
        return SUCCESS;
    }

    StatusCode serialize(uint8_t* buffer) override
    {
        memcpy(buffer, &value, getBufferSize());
        return SUCCESS;
    }
};

}

#endif // CORE_WORD_PACKET_H
