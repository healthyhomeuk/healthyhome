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
 * @file libs/sn-gcja5/include/sn-gcja5/ParticleCountPacket.h
 */

#ifndef SNGCJA5_PARTICLE_COUNT_PACKET_H
#define SNGCJA5_PARTICLE_COUNT_PACKET_H

#include <core/defs.h>
#include <cstdint>
#include <cstring>

/**
 * @brief Namespace for the Panasonic SN-GCJA5 library.
 */
namespace SNGCJA5 {

/**
 * @brief I2C packet for reading count values from the sensor
 * @headerfile sn-gcja5/ParticleCountPacket.h <sn-gcja5/ParticleCountPacket.h>
 */
struct ParticleCountPacket : public Core::Comms::Packet {
    uint16_t count = 0; ///< Count value

    size_t getBufferSize() override
    {
        return sizeof count;
    }

    Core::StatusCode deserialize(const uint8_t* buffer) override
    {
        std::memcpy(&count, buffer, sizeof count);
        return Core::SUCCESS;
    }

    Core::StatusCode serialize(uint8_t*) override
    {
        return Core::SUCCESS;
    }
};

}

#endif // SNGCJA5_PARTICLE_COUNT_PACKET_H
