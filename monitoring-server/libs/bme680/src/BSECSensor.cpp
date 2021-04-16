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

#include <bme680/BSECSensor.h>
#include <core/exceptions.h>

using namespace BME680;

Core::StatusCode BSECSensor::setup()
{
    return Core::SUCCESS;
}

Core::StatusCode BSECSensor::halt()
{
    return Core::SUCCESS;
}

const char* BSECSensor::getName()
{
    return name;
}

std::unique_ptr<Core::Message> BSECSensor::handleMessage(
    std::unique_ptr<Core::Message>)
{
    throw Core::Exception::NotFound { "the requested message was not found" };
}

void BSECSensor::setValue(float _value)
{
    value = _value;
}

void BSECSensor::setValueAccuracy(SensorValueAccuracy _accuracy)
{
    accuracy = _accuracy;
}

std::unique_ptr<Core::Message> BSECSensor::generateMessage()
{
    auto msg      = messageFactory();
    msg->value    = value;
    msg->accuracy = accuracy;
    return msg;
}