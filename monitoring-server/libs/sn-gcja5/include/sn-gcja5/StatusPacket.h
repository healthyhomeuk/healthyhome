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
 * @file libs/sn-gcja5/include/sn-gcja5/StatusPacket.h
 */

#ifndef SNGCJA5_STATUS_PACKET_H
#define SNGCJA5_STATUS_PACKET_H

#include <core/defs.h>
#include <cstdint>
#include <sn-gcja5/defs.h>

/**
 * @brief Namespace for the Panasonic SN-GCJA5 library.
 */
namespace SNGCJA5 {

/**
 * @brief I2C packet for reading sensor status
 * @headerfile sn-gcja5/StatusPacket.h <sn-gcja5/StatusPacket.h>
 */
struct StatusPacket : public Core::Comms::Packet {
    SensorStatus sensor; ///< Sensor status value
    PDLDStatus pd;       ///< PD status value
    PDLDStatus ld;       ///< LD status value
    FanStatus fan;       ///< Fan status value

    size_t getBufferSize() override
    {
        return sizeof(uint8_t);
    }

    Core::StatusCode deserialize(const uint8_t* buffer) override
    {
        sensor = static_cast<SensorStatus>((*buffer >> 6) & 3);
        pd     = static_cast<PDLDStatus>((*buffer >> 4) & 3);
        ld     = static_cast<PDLDStatus>((*buffer >> 2) & 3);
        fan    = static_cast<FanStatus>(*buffer & 3);

        return Core::SUCCESS;
    }

    Core::StatusCode serialize(uint8_t*) override
    {
        return Core::SUCCESS;
    }
};

}

#endif // SNGCJA5_STATUS_PACKET_H
