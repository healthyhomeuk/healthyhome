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
 * @file libs/sn-gcja5/include/sn-gcja5/Device.h
 */

#ifndef SNGCJA5_DEVICE_H
#define SNGCJA5_DEVICE_H

#include <core/Device.h>
#include <core/Sensor.h>
#include <core/Timer.h>
#include <core/comms/I2C.h>
#include <sn-gcja5/PM100Sensor.h>
#include <sn-gcja5/PM25Sensor.h>

/**
 * @brief Namespace for the Panasonic SN-GCJA5 library.
 */
namespace SNGCJA5 {
/**
 * @brief Concrete class for the  Panasonic SN-GCJA5 device.
 * @headerfile sn-gcja5/Device.h <sn-gcja5/Device.h>
 */
class Device : public Core::Device {
public:
    /**
     * @brief Constructor for a SN-GCJA5 Device.
     * @param config configuration data structure.
     */
    explicit Device(Configuration config);

    const char* getName() override;
    Core::StatusCode setup() override;
    Core::StatusCode halt() override;
    std::unordered_map<std::string, Core::Sensor&> getSensors() override;
    std::unique_ptr<Core::Message> handleMessage(
        std::unique_ptr<Core::Message> message) override;

private:
    Configuration config;

    Core::StatusCode readSensor();

    std::unique_ptr<Core::Timer> timer;

    SensorStatus sensorStatus;
    PDLDStatus pdStatus;
    PDLDStatus ldStatus;
    FanStatus fanStatus;

    PM25Sensor pm25;
    PM100Sensor pm100;
};

}

#endif // SNGCJA5_DEVICE_H
