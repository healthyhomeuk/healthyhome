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
 * @file libs/sn-gcja5/include/sn-gcja5/PMSensor.h
 */

#ifndef SNGCJA5_PM_SENSOR_H
#define SNGCJA5_PM_SENSOR_H

#include <core/Sensor.h>
#include <cstdint>
#include <sn-gcja5/defs.h>

/**
 * @brief Namespace for the Panasonic SN-GCJA5 library.
 */
namespace SNGCJA5 {

/**
 * @brief Generic Sensor class representing any PM sensor
 * @headerfile sn-gcja5/PMSensor.h <sn-gcja5/PMSensor.h>
 */
class PMSensor : public Core::Sensor {
public:
    /**
     * Constructor
     * @param name name of the PM sensor
     * @param _config SN-GCJA5 configuration
     * @param _particleCountRegister register address for the particle count
     * @param _densityRegister register address for the density
     */
    explicit PMSensor(
        const char* name,
        Configuration& _config,
        uint8_t _particleCountRegister,
        uint8_t _densityRegister) :
        config(_config),
        particleCountRegister(_particleCountRegister),
        densityRegister(_densityRegister), sensorName(name)
    {
    }

    Core::StatusCode setup() override;
    Core::StatusCode halt() override;
    std::unique_ptr<Core::Message> handleMessage(
        std::unique_ptr<Core::Message> message) override;
    const char* getName() override;

    /**
     * @brief Read values from the sensor
     */
    void read();

    /**
     * @brief Getter for the particle count
     *
     * @warning Use the getter after the values have been read,
     *   otherwise it returns the last read value if any.
     *
     * @return particle count
     */
    uint16_t getParticleCount() const;

    /**
     * @brief Getter for the density
     *
     * @warning Use the getter after the values have been read,
     *   otherwise it returns the last read value if any.
     *
     * @return density
     */
    float getDensity() const;

private:
    Configuration& config;
    const uint8_t particleCountRegister;
    const uint8_t densityRegister;
    const char* sensorName;

    uint16_t particleCount;
    float density;
};

}

#endif // SNGCJA5_PM_SENSOR_H
