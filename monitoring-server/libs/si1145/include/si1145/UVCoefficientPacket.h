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
 * @file si1145/UVCoefficientPacket.h
 */

#ifndef SI1145_UV_COEFFICIENT_PACKET_H
#define SI1145_UV_COEFFICIENT_PACKET_H

#include <core/comms/Packet.h>
#include <core/defs.h>
#include <cstring>

/**
 * @brief Namespace for the Panasonic SI1145 library.
 */
namespace SI1145 {

/**
 * @brief Packet representing a UV coefficient.
 * @headerfile si1145/UVCoefficientPacket.h <si1145/UVCoefficientPacket.h>
 */
struct UVCoefficientPacket : public Core::Comms::Packet {
    uint32_t value; ///< UV coefficient values

    /**
     * @brief Constructor
     * @param _value UV coefficient values
     */
    UVCoefficientPacket(uint32_t _value) : value(_value) { }

    size_t getBufferSize() override
    {
        return sizeof value;
    }

    Core::StatusCode deserialize(const uint8_t* buffer) override
    {
        memcpy(&value, buffer, getBufferSize());
        return Core::SUCCESS;
    }

    Core::StatusCode serialize(uint8_t* buffer) override
    {
        memcpy(buffer, &value, getBufferSize());
        return Core::SUCCESS;
    }
};

}

#endif // SI1145_UV_COEFFICIENT_PACKET_H
