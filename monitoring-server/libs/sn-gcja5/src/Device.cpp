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

#include <bitset>
#include <core/comms/I2C.h>
#include <core/exceptions.h>
#include <sn-gcja5/Device.h>
#include <sn-gcja5/PM100Message.h>
#include <sn-gcja5/PM25Message.h>
#include <sn-gcja5/StatusMessage.h>
#include <sn-gcja5/StatusPacket.h>

using namespace SNGCJA5;

// Sets up a timer for the sensor
Core::StatusCode Device::setup()
{
    config.postman.registerMessageFactory(
        StatusMessage::IDENTITY,
        StatusMessage::factory);

    timer = config.makeTimer();
    timer->setInterval(TIMER_INTERVAL);
    timer->setCallback(std::bind(&Device::readSensor, this));
    return timer->setup();
}

// Reads data from the sensor's registers
Core::StatusCode Device::readSensor()
{
    StatusPacket pck;
    config.i2c.read(I2C_ADDR, STATUS_CMD, pck);

    sensorStatus = pck.sensor;
    ldStatus     = pck.ld;
    pdStatus     = pck.pd;
    fanStatus    = pck.fan;

    pm25.read();
    pm100.read();

    PM25Message pm25msg { pm25.getDensity(), pm25.getParticleCount() };
    config.postman.advertise(pm25msg);

    PM100Message pm100msg { pm100.getDensity(), pm100.getParticleCount() };
    config.postman.advertise(pm100msg);

    return Core::SUCCESS;
}

Core::StatusCode Device::halt()
{
    return Core::SUCCESS;
}

std::unordered_map<std::string, Core::Sensor&> Device::getSensors()
{
    return {
        { "pm25", pm25 },
        { "pm100", pm100 },
    };
}

Device::Device(Configuration _config) :
    config(std::move(_config)), pm25({ config }), pm100({ config })
{
}

const char* Device::getName()
{
    return "sn-gcja5";
}

std::unique_ptr<Core::Message> Device::handleMessage(
    std::unique_ptr<Core::Message> message)
{
    auto subject = message->getSubject();

    if (subject == StatusMessage::SUBJECT) {
        return std::make_unique<StatusMessage>(
            sensorStatus,
            pdStatus,
            ldStatus,
            fanStatus);
    }

    throw Core::Exception::NotFound { "the requested entity was not found" };
}
