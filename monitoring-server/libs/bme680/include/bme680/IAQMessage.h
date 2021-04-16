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
 * @file bme680/IAQMessage.h
 */

#ifndef BME680_IAQ_MESSAGE_H
#define BME680_IAQ_MESSAGE_H

#include <bme680/BSECSensorMessage.h>
#include <core/Device.h>
#include <core/Message.h>

/**
 * @brief Namespace for the Bosch Sensortec BME680 library.
 */
namespace BME680 {

/**
 * @brief Message carrying the IAQ sensor values
 * @headerfile bme680/IAQMessage.h <bme680/IAQMessage.h>
 */
struct IAQMessage : public BSECSensorMessage {
    /// Sets entity
    SET_ENTITY = SENSOR_ENTITY("iaq");
    /// Sets subject
    SET_SUBJECT = "update";
    /// Common Message codebase
    MAKE_MESSAGE(IAQMessage);
    /// Static deserializer codebase
    STATIC_DESERIALIZER(IAQMessage);
    /// Static serializer codebase
    STATIC_SERIALIZER(IAQMessage);

    /**
     * Constructor
     * @return IAQ message
     */
    static std::unique_ptr<BSECSensorMessage> bsecSensorFactory()
    {
        return std::make_unique<IAQMessage>();
    }
};

}

#endif // BME680_IAQ_MESSAGE_H
