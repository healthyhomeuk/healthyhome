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
 * @file bme680/BSECSensor.h
 */

#ifndef BME680_BSEC_SENSOR_H
#define BME680_BSEC_SENSOR_H

#include <bme680/BSECSensorMessage.h>
#include <bme680/defs.h>
#include <core/Sensor.h>
#include <cstdint>

/**
 * @brief Namespace for the Bosch Sensortec BME680 library.
 */
namespace BME680 {

/**
 * @brief Generic Sensor class representing any BSEC sensor
 * @headerfile bme680/BSECSensor.h <bme680/BSECSensor.h>
 */
class BSECSensor : public Core::Sensor {
public:
    /**
     * Constructor
     * @param _name name of the BSEC sensor
     */
    explicit BSECSensor(const char* _name, BSECSensorMessage::Factory factory) :
        name(_name), messageFactory(std::move(factory))
    {
    }

    Core::StatusCode setup() override;
    Core::StatusCode halt() override;
    std::unique_ptr<Core::Message> handleMessage(
        std::unique_ptr<Core::Message> message) override;
    const char* getName() override;

    void setValue(float value);
    void setValueAccuracy(SensorValueAccuracy accuracy);

    std::unique_ptr<Core::Message> generateMessage();

private:
    const char* name;
    BSECSensorMessage::Factory messageFactory;

    float value;
    SensorValueAccuracy accuracy;
};

}

#endif // BME680_BSEC_SENSOR_H
