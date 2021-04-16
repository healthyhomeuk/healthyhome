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
 * @file bme680/CO2eMessage.h
 */

#ifndef BME680_CO2E_MESSAGE_H
#define BME680_CO2E_MESSAGE_H

#include <bme680/BSECSensorMessage.h>
#include <core/Device.h>
#include <core/Message.h>

/**
 * @brief Namespace for the Bosch Sensortec BME680 library.
 */
namespace BME680 {

/**
 * @brief Message carrying the CO2e sensor values
 * @headerfile bme680/CO2eMessage.h <bme680/CO2eMessage.h>
 */
struct CO2eMessage : public BSECSensorMessage {
    /// Sets entity
    SET_ENTITY = SENSOR_ENTITY("co2e");
    /// Sets subject
    SET_SUBJECT = "update";
    /// Common Message codebase
    MAKE_MESSAGE(CO2eMessage);
    /// Static deserializer codebase
    STATIC_DESERIALIZER(CO2eMessage);
    /// Static serializer codebase
    STATIC_SERIALIZER(CO2eMessage);

    /**
     * Constructor
     * @return C02 message
     */
    static std::unique_ptr<BSECSensorMessage> bsecSensorFactory()
    {
        return std::make_unique<CO2eMessage>();
    }
};

}

#endif // BME680_CO2E_MESSAGE_H
