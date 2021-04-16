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

#include <core/exceptions.h>
#include <sn-gcja5/DensityPacket.h>
#include <sn-gcja5/PMSensor.h>
#include <sn-gcja5/ParticleCountPacket.h>

using namespace SNGCJA5;

void PMSensor::read()
{
    DensityPacket densityPacket;
    ParticleCountPacket particlePacket;

    config.i2c.read(I2C_ADDR, densityRegister, densityPacket);
    config.i2c.read(I2C_ADDR, particleCountRegister, particlePacket);

    if (densityPacket.density < DENSITY_LIMIT) {
        density = densityPacket.density;
    }

    if (particlePacket.count < COUNT_LIMIT) {
        particleCount = particlePacket.count
    }
}

Core::StatusCode PMSensor::setup()
{
    return Core::SUCCESS;
}

Core::StatusCode PMSensor::halt()
{
    return Core::SUCCESS;
}

const char* PMSensor::getName()
{
    return sensorName;
}

std::unique_ptr<Core::Message> PMSensor::handleMessage(
    std::unique_ptr<Core::Message>)
{
    throw Core::Exception::NotFound { "the requested message was not found" };
}

uint16_t PMSensor::getParticleCount() const
{
    return particleCount;
}
float PMSensor::getDensity() const
{
    return density;
}
