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
 * @file libs/sn-gcja5/include/sn-gcja5/PM100Message.h
 */

#ifndef SNGCJA5_PM100_MESSAGE_H
#define SNGCJA5_PM100_MESSAGE_H

#include <core/Device.h>
#include <core/Message.h>

/**
 * @brief Namespace for the Panasonic SN-GCJA5 library.
 */
namespace SNGCJA5 {

/**
 * @brief Message carrying the PM10 sensor values
 * @headerfile sn-gcja5/PM100Message.h <sn-gcja5/PM100Message.h>
 */
struct PM100Message : public Core::Message {
    /// Sets entity
    SET_ENTITY = SENSOR_ENTITY("pm100");
    /// Sets subject
    SET_SUBJECT = "update";
    /// Common Message codebase
    MAKE_MESSAGE(PM100Message);
    /// Static deserializer codebase
    STATIC_DESERIALIZER(PM100Message);
    /// Static serializer codebase
    STATIC_SERIALIZER(PM100Message);

    /**
     * @brief Constructor
     * @param _density PM10 density value
     * @param _count PM10 count value
     */
    PM100Message(float _density, int _count) :
        density(_density), particleCount(_count)
    {
    }

    float density;     ///< Density value
    int particleCount; ///< Particle count value
};

}

#endif // SNGCJA5_PM100_MESSAGE_H
