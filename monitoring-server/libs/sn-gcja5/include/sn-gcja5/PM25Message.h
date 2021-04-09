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
 * @file libs/sn-gcja5/include/sn-gcja5/PM25Message.h
 */

#ifndef SNGCJA5_PM25_MESSAGE_H
#define SNGCJA5_PM25_MESSAGE_H

#include <core/Device.h>
#include <core/Message.h>

/**
 * @brief Namespace for the Panasonic SN-GCJA5 library.
 */
namespace SNGCJA5 {

/**
 * @brief Message carrying the PM2.5 sensor values
 * @headerfile sn-gcja5/PM25Message.h <sn-gcja5/PM25Message.h>
 */
struct PM25Message : public Core::Message {
    /// Sets entity
    SET_ENTITY = SENSOR_ENTITY("pm25");
    /// Sets subject
    SET_SUBJECT = "update";
    /// Common Message codebase
    MAKE_MESSAGE(PM25Message);
    /// Static deserializer codebase
    STATIC_DESERIALIZER(PM25Message);
    /// Static serializer codebase
    STATIC_SERIALIZER(PM25Message);

    /**
     * @brief Constructor
     * @param _density PM2.5 density value
     * @param _count PM2.5 count value
     */
    PM25Message(float _density, int _count) :
        density(_density), particleCount(_count)
    {
    }

    float density;     ///< Density value
    int particleCount; ///< Particle count value
};

}

#endif // SNGCJA5_PM25_MESSAGE_H
