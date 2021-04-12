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
 * @file si1145/UVSensor.h
 */
#ifndef SI1145_VISIBLE_SENSOR_H
#define SI1145_VISIBLE_SENSOR_H

#include <core/Sensor.h>
#include <si1145/defs.h>

/**
 * @brief Namespace for the Panasonic SI1145 library.
 */
namespace SI1145 {

/**
 * @brief Sensor class representing the visible sensor
 * @headerfile si1145/VisibleSensor.h <si1145/VisibleSensor.h>
 */
class VisibleSensor : public Core::Sensor {
    uint16_t value;
    Configuration& config;

public:
    /**
     * @brief Constructor
     * @param _config SI1145 configuration
     */
    explicit VisibleSensor(Configuration& _config) : config(_config) { }

    /**
     * @brief Getter for the visible light reading
     *
     * @warning Use the getter after the values have been read,
     * otherwise it returns the last read value if any.
     *
     * @return visible light
     */
    uint16_t getValue() const;

    Core::StatusCode setup() override;
    Core::StatusCode halt() override;
    std::unique_ptr<Core::Message> handleMessage(
        std::unique_ptr<Core::Message> message) override;
    const char* getName() override;

    /**
     * @brief Read values from the sensor
     */
    void read();
};

}

#endif // SI1145_VISIBLE_SENSOR_H
