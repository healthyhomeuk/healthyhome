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
 * @file core/Sensor.h
 */

#ifndef CORE_SENSOR_H
#define CORE_SENSOR_H

#include <core/defs.h>
#include <core/Message.h>

namespace Core {

    /**
     * @brief Interface for a sensor
     */
    class Sensor {
    public:
        /**
         * @brief Sets the sensor up for operation
         * @return Operation status code
         */
        virtual StatusCode setup() = 0;

        /**
         * @brief Halts the sensor for operation
         * @return Operation status ode
         */
        virtual StatusCode halt() = 0;

        /**
         * @brief Getter for the sensor identifier.
         * @return The sensor identifier.
         */
        virtual const char *getName() = 0;

        /**
         * @brief Callback for incoming messages
         * @param message Reference to the message to handle
         * @return Operation status code
         */
        virtual StatusCode handleMessage(Message &message) = 0;

        /**
         * @brief Default deconstructor
         */
        virtual ~Sensor() = default;
    };
}

#endif // CORE_SENSOR_H