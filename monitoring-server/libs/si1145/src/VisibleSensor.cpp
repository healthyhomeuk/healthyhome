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
#include <core/defs.h>
#include <core/exceptions.h>
#include <si1145/Device.h>

using namespace SI1145;
using Core::Comms::BytePacket;
using Core::Comms::WordPacket;

void VisibleSensor::read()
{
    WordPacket visible;

    config.i2c.read(I2C_ADDR, ALSVISDATA_REG_ADDR, visible);

    value = visible.value;
}

Core::StatusCode VisibleSensor::setup()
{
    Device::writeParameter(config.i2c, ALS_VIS_ADC_GAIN, GAIN);
    Device::writeParameter(
        config.i2c,
        ALS_VIS_ADC_COUNTER,
        ((~GAIN) & GAIN_MASK) << 4);

    Device::writeParameter(config.i2c, ALS_VIS_ADC_RANGE, 0x00);

    WordPacket pck { MEASRATE };
    config.i2c.write(I2C_ADDR, MEASRATE_REG_ADDR, pck);
    BytePacket pck2 { COMMAND_ALS_AUTO };
    config.i2c.write(I2C_ADDR, COMMAND_REG_ADDR, pck2);

    return Core::SUCCESS;
}

Core::StatusCode VisibleSensor::halt()
{
    return Core::SUCCESS;
}

const char* VisibleSensor::getName()
{
    return "visible";
}

std::unique_ptr<Core::Message> VisibleSensor::handleMessage(
    std::unique_ptr<Core::Message>)
{
    throw Core::Exception::NotFound { "the requested message was not found" };
}

uint16_t VisibleSensor::getValue() const
{
    return value;
}
