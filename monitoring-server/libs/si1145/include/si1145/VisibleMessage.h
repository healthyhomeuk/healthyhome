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
 * @file si1145/VisibleMessage.h
 */

#ifndef SI1145_VISIBLE_MESSAGE_H
#define SI1145_VISIBLE_MESSAGE_H

#include <core/Device.h>
#include <core/Message.h>

/**
 * @brief Namespace for the Panasonic SI1145 library.
 */
namespace SI1145 {

/**
 * @brief Message carrying the visible light values
 * @headerfile si1145/VisibleMessage.h <si1145/VisibleMessage.h>
 */
struct VisibleMessage : public Core::Message {
    /// Sets entity
    SET_ENTITY = SENSOR_ENTITY("visible");
    /// Sets subject
    SET_SUBJECT = "update";
    /// Common Message codebase
    MAKE_MESSAGE(VisibleMessage);
    /// Static deserializer codebase
    STATIC_DESERIALIZER(VisibleMessage);
    /// Static serializer codebase
    STATIC_SERIALIZER(VisibleMessage);

    /**
     * @brief Constructor
     * @param _value Visible light value
     */
    VisibleMessage(uint16_t _value) : value(_value) { }

    uint16_t value; ///< Visible light value
};

}

#endif // SI1145_VISIBLE_MESSAGE_H
