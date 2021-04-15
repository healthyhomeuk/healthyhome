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
#include <core/comms/BytePacket.h>
#include <core/comms/I2C.h>
#include <core/comms/WordPacket.h>
#include <core/exceptions.h>
#include <functional>
#include <si1145/Device.h>
#include <si1145/UVMessage.h>
#include <si1145/VisibleMessage.h>
#include <unistd.h>

using namespace SI1145;

ParameterValue Device::writeParameter(
    Core::Comms::I2C& i2c,
    Parameter addr,
    ParameterValue value)
{
    Core::Comms::BytePacket pck;

    // Write value to 'parameter write' register
    pck.value = value;
    i2c.write(I2C_ADDR, PARAM_WR_REG_ADDR, pck);

    // Write parameter with 'parameter set' flag set to command register
    pck.value = addr | PARAM_SET_FLAG;
    i2c.write(I2C_ADDR, COMMAND_REG_ADDR, pck);

    // Read value from 'parameter read' register
    i2c.read(I2C_ADDR, PARAM_RD_REG_ADDR, pck);
    return pck.value;
}

Core::StatusCode Device::setup()
{
    reset();

    uv.setup();

    writeParameter(config.i2c, CHANNEL_LIST, ENABLE_UV | ENABLE_ALS_VISIBLE);

    vis.setup();

    timer = config.makeTimer();
    timer->setInterval(TIMER_INTERVAL);
    timer->setCallback(std::bind(&Device::readSensor, this));
    return timer->setup();

    return Core::SUCCESS;
}

void Device::reset()
{
    Core::Comms::WordPacket pck { 0 };
    config.i2c.write(I2C_ADDR, MEASRATE_REG_ADDR, pck);

    Core::Comms::BytePacket pck2 { 0 };
    config.i2c.write(I2C_ADDR, IRQ_ENABLE_REG_ADDR, pck2);
    config.i2c.write(I2C_ADDR, IRQ_MODE1_REG_ADDR, pck2);
    config.i2c.write(I2C_ADDR, IRQ_MODE2_REG_ADDR, pck2);

    config.i2c.write(I2C_ADDR, INT_CONFIG_REG_ADDR, pck2);

    pck2.value = 0xFF;
    config.i2c.write(I2C_ADDR, IRQ_STATUS_REG_ADDR, pck2);

    pck2.value = COMMAND_RESET;
    config.i2c.write(I2C_ADDR, COMMAND_REG_ADDR, pck2);
    config.usleep(25000);

    pck2.value = 0x17;
    config.i2c.write(I2C_ADDR, HW_KEY_REG_ADDR, pck2);
    config.usleep(10000);
}

// Reads data from the sensor and performs required corrections to the raw data
Core::StatusCode Device::readSensor()
{
    uv.read();
    vis.read();

    UVMessage uvmsg { uv.getValue() };
    config.postman.advertise(uvmsg);

    VisibleMessage visiblemsg { vis.getValue() };
    config.postman.advertise(visiblemsg);

    return Core::SUCCESS;
}

Core::StatusCode Device::halt()
{
    return Core::SUCCESS;
}

std::unordered_map<std::string, Core::Sensor&> Device::getSensors()
{
    return {
        { "uv", uv },
        { "visible", vis },
    };
}

std::unique_ptr<Core::Message> Device::handleMessage(
    std::unique_ptr<Core::Message>)
{
    throw Core::Exception::NotFound { "the requested entity was not found" };
}

Device::Device(Configuration _config) :
    config(std::move(_config)), uv({ config }), vis({ config })
{
}

const char* Device::getName()
{
    return "si1145";
}