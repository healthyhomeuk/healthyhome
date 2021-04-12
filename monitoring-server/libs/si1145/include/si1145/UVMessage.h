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
 * @file si1145/UVMessage.h
 */

#ifndef SI1145_UV_MESSAGE_H
#define SI1145_UV_MESSAGE_H

#include <core/Device.h>
#include <core/Message.h>

/**
 * @brief Namespace for the Panasonic SI1145 library.
 */
namespace SI1145 {

/**
 * @brief Message carrying the visible light values
 * @headerfile si1145/UVMessage.h <si1145/UVMessage.h>
 */
struct UVMessage : public Core::Message {
    /// Sets entity
    SET_ENTITY = SENSOR_ENTITY("uv");
    /// Sets subject
    SET_SUBJECT = "update";
    /// Common Message codebase
    MAKE_MESSAGE(UVMessage);
    /// Static deserializer codebase
    STATIC_DESERIALIZER(UVMessage);
    /// Static serializer codebase
    STATIC_SERIALIZER(UVMessage);

    /**
     * @brief Constructor
     * @param _value UV index value
     */
    UVMessage(double _value) : value(_value) { }

    double value; ///< UV index value
};

}

#endif // SI1145_UV_MESSAGE_H
