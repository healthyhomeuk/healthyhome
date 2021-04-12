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

#include <core/comms/BytePacket.h>
#include <core/comms/WordPacket.h>
#include <core/exceptions.h>
#include <si1145/UVCoefficientPacket.h>
#include <si1145/UVSensor.h>

using namespace SI1145;
using Core::Comms::BytePacket;

void UVSensor::read()
{
    Core::Comms::WordPacket pck;
    config.i2c.read(I2C_ADDR, UVINDEX_REG_ADDR, pck);
    value = pck.value / 100.0;
}

Core::StatusCode UVSensor::setup()
{
    UVCoefficientPacket pck { UV_COEFF };
    config.i2c.write(I2C_ADDR, UV_COEFF_ADDR, pck);
    return Core::SUCCESS;
}

Core::StatusCode UVSensor::halt()
{
    return Core::SUCCESS;
}

const char* UVSensor::getName()
{
    return "uv";
}

std::unique_ptr<Core::Message> UVSensor::handleMessage(
    std::unique_ptr<Core::Message>)
{
    throw Core::Exception::NotFound { "the requested message was not found" };
}

double UVSensor::getValue() const
{
    return value;
}
