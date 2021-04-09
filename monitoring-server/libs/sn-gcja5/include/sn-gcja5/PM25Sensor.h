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
 * @file libs/sn-gcja5/include/sn-gcja5/PM25Sensor.h
 */

#ifndef SNGCJA5_PM25_SENSOR_H
#define SNGCJA5_PM25_SENSOR_H

#include <sn-gcja5/PMSensor.h>

/**
 * @brief Namespace for the Panasonic SN-GCJA5 library.
 */
namespace SNGCJA5 {

/**
 * @brief Performs I2C read of PM2.5 count and density from the sensor
 * @headerfile sn-gcja5/PM25Sensor.h <sn-gcja5/PM25Sensor.h>
 */
class PM25Sensor : public PMSensor {
public:
    /**
     * @brief Constructor
     * @param _config SN-GCJA5 configuration
     */
    explicit PM25Sensor(Configuration& _config) :
        PMSensor("pm25", _config, PM25_COUNT_CMD, PM25_DENSITY_CMD)
    {
    }
};

}

#endif // SNGCJA5_PM25_SENSOR_H
