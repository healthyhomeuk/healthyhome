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
 * @file core/comms/Packet.h
 */

#ifndef CORE_COMMS_PACKET_H
#define CORE_COMMS_PACKET_H

#include <cstdint>

#include <core/defs.h>

namespace Core::Comms {

    /**
     * @brief An interface for a data structure containing information
     *        for a hardware-based communication.
     * @headerfile core/comms/Packet.h <core/comms/Packet.h>
     *
     * Example:
     * @code{.cpp}
     * class TemperaturePacket : Core::Packet {
     * public:
     *     float temperature;
     *
     *     size_t getBufferSize() override {
     *         return sizeof(temperature); // 4 bytes
     *     }
     *
     *     Core::StatusCode deserialize(const uint8_t *buffer) override {
     *         // buffer is 4 bytes as per getSize()
     *         // MSB[0]...LSB[3]
     *         uint32_t tmp = 0;
     *         tmp |= buffer[0] << 24;
     *         tmp |= buffer[1] << 16;
     *         tmp |= buffer[2] << 8;
     *         tmp |= buffer[3];
     *         temperature = *reinterpret_cast<float*>(&tmp);
     *
     *         return Core::SUCCESS;
     *     }
     *
     *     Core::StatusCode serialize(uint8_t *buffer) override {
     *         // buffer is 4 bytes as per getSize()
     *         // MSB[0]...LSB[3]
     *         uint32_t tmp = *reinterpret_cast<uint32_t*>(&temperature);
     *         buffer[0] = tmp >> 24 & 0xFF;
     *         buffer[1] = tmp >> 16 & 0xFF;
     *         buffer[2] = tmp >> 8 & 0xFF;
     *         buffer[3] = tmp & 0xFF;
     *     }
     * };
     * @endcode
     */
    class Packet {
    public:

        /**
         * @brief Buffer size
         *
         * The buffer size required for the deserialization/serialization
         * process of the Packet. In other words, the number of bytes
         * that are required to read/write the whole Packet.
         *
         * @return The size of the buffer in bytes.
         */
        virtual size_t getBufferSize() = 0;

        /**
         * @brief Deserialization method
         *
         * This method is meant to deserialize a Packet from a given
         * buffer of size given by the getter getBufferSize().
         *
         * For example if the Packet represents temperature data
         * represented by a IEEE 754 single-precision floating point
         * number, the buffer could be 4-bytes-long containing the
         * number split in bytes in a known endianness.
         *
         * @param buffer The buffer to deserialize the Packet from.
         */
        virtual StatusCode deserialize(const uint8_t *buffer) = 0;

        /**
         * @brief Serialization method
         *
         * This method is meant to serialize a Packet to a given
         * buffer of size given by the getter getBufferSize().
         *
         * For example if the Packet represents temperature data
         * represented by a IEEE 754 single-precision floating point
         * number, the buffer could be 4-bytes-long containing the
         * number split in bytes in a known endianness.
         *
         * @param buffer The buffer to serialize the Packet to.
         */
        virtual StatusCode serialize(uint8_t *buffer) = 0;

        /**
         * @brief Default deconstructor
         */
        virtual ~Packet() = default;
    };

}

#endif // CORE_COMMS_PACKET_H
