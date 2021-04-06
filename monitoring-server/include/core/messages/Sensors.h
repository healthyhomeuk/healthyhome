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
 * @file core/messages/Sensors.h
 */

#ifndef CORE_MESSAGES_SENSORS_H
#define CORE_MESSAGES_SENSORS_H

#include <core/Message.h>
#include <core/Sensor.h>

namespace Core::Messages {

/**
 * @brief Sensors server request message
 */
struct Sensors : public Message {
    /// Sets entity
    SET_ENTITY = SERVER_ENTITY;
    /// Sets subject
    SET_SUBJECT = "sensors";
    /// Common Message codebase
    MAKE_MESSAGE(Sensors);
    /// Static deserializer codebase
    STATIC_DESERIALIZER(Sensors);
    /// Static serializer codebase
    STATIC_SERIALIZER(Sensors);

    /**
     * @name Response body
     * @{
     */

    /**
     * @brief List of sensor names
     */
    std::vector<std::string> sensorsNames;

    /**
     * @}
     */

    /**
     * @brief Constructor loading a map of sensors
     *
     * Constructs a Sensors message from a sensors map. It loads
     * all the sensors names from the map into Sensors::sensorsNames.
     *
     * @param sensors Sensors mapping
     */
    explicit Sensors(std::unordered_map<std::string, Sensor&>& sensors);
};

}

#endif // CORE_MESSAGES_SENSORS_H
